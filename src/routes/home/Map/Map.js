import React from 'react'
import PropTypes from 'prop-types'
import OutsideClickHandler from 'react-outside-click-handler'
import {
  Marker,
  Polyline,
  GoogleMap,
  InfoWindow,
  withScriptjs,
  withGoogleMap,
} from 'react-google-maps'
import heartIcon from 'images/heart.png'
import locationIconActive from 'images/location-active.png'
import locationIconInactive from 'images/location-inactive.png'
import { MAP_SETTINGS } from 'constants/constants'
import mapStyles from './mapStyles.json'
import InfoWindowContent from './InfoWindow'

const {
  DEFAULT_ZOOM,
  DEFAULT_CENTER,
  DEFAULT_MAP_OPTIONS,
  MARKER_SIZE,
  PIXEL_OFFSET,
  POLYLINE_OPTIONS,
} = MAP_SETTINGS

const getLatLngForPolyline = ({ origin, destination }) => [
  { lat: origin.lat, lng: origin.lon },
  { lat: destination.lat, lng: destination.lon },
]
const getGeodesicLineCenter = ({ origin, destination }) =>
  window.google.maps.geometry.spherical.interpolate(
    new window.google.maps.LatLng(origin.lat, origin.lon),
    new window.google.maps.LatLng(destination.lat, destination.lon),
    0.5
  )

const MapContainer = ({ origins, destinations, hoveredOriginId }) => {
  const mapRef = React.useRef(null)

  const [selectedOriginId, setSelectedOriginId] = React.useState(null)
  const [isClickOutsideDisabled, setIsClickOutsideDisabled] = React.useState(
    false
  )

  React.useEffect(() => {
    const bounds = new window.google.maps.LatLngBounds()
    origins.forEach(({ coordinates: { lat, lon } }) => {
      bounds.extend(new window.google.maps.LatLng(lat, lon))
    })
    destinations.forEach(({ coordinates: { lat, lon } }) => {
      bounds.extend(new window.google.maps.LatLng(lat, lon))
    })
    mapRef.current.fitBounds(bounds)
  }, [destinations, origins])

  React.useEffect(() => {
    if (hoveredOriginId) {
      setSelectedOriginId(null)
    }
  }, [hoveredOriginId])

  const selectedOrigin = origins.find(
    ({ id }) => selectedOriginId === id || hoveredOriginId === id
  )

  return (
    <GoogleMap
      ref={mapRef}
      defaultZoom={DEFAULT_ZOOM}
      defaultCenter={DEFAULT_CENTER}
      defaultOptions={{ ...DEFAULT_MAP_OPTIONS, styles: mapStyles }}
      onDragStart={() => setIsClickOutsideDisabled(true)}
      onDragEnd={() => setIsClickOutsideDisabled(false)}
    >
      {origins.map(({ coordinates: { lat, lon: lng }, id }) => (
        <Marker
          key={id}
          position={{ lat, lng }}
          icon={{
            url:
              id === selectedOrigin?.id
                ? locationIconActive
                : locationIconInactive,
            scaledSize: new window.google.maps.Size(
              MARKER_SIZE.SMALL,
              MARKER_SIZE.SMALL
            ),
          }}
          onClick={() => {
            setSelectedOriginId(id)
          }}
        />
      ))}

      {destinations.map(({ coordinates: { lat, lon: lng }, id }) => (
        <Marker
          key={id}
          position={{ lat, lng }}
          icon={{
            url: heartIcon,
            scaledSize: new window.google.maps.Size(
              MARKER_SIZE.LARGE,
              MARKER_SIZE.LARGE
            ),
          }}
        />
      ))}

      {selectedOrigin &&
        destinations.map(({ id, coordinates }) => {
          const { isAvailable } = selectedOrigin.flights.find(
            (flight) => flight.id === id
          )
          return (
            <Polyline
              key={id}
              path={getLatLngForPolyline({
                origin: selectedOrigin.coordinates,
                destination: coordinates,
              })}
              options={
                isAvailable ? POLYLINE_OPTIONS.REGULAR : POLYLINE_OPTIONS.DASHED
              }
            />
          )
        })}

      {selectedOrigin &&
        destinations.map(({ id, coordinates }) => {
          const { flights } = selectedOrigin
          const { duration, isAvailable } = flights.find(
            (flight) => flight.id === id
          )
          return (
            <InfoWindow
              key={id}
              position={getGeodesicLineCenter({
                origin: selectedOrigin.coordinates,
                destination: coordinates,
              })}
              options={{
                pixelOffset: new window.google.maps.Size(
                  PIXEL_OFFSET.X,
                  PIXEL_OFFSET.Y
                ),
              }}
            >
              <OutsideClickHandler
                onOutsideClick={() => {
                  setSelectedOriginId(null)
                }}
                disabled={isClickOutsideDisabled}
              >
                <InfoWindowContent
                  flightDuration={duration}
                  isFlightAvailable={isAvailable}
                />
              </OutsideClickHandler>
            </InfoWindow>
          )
        })}
    </GoogleMap>
  )
}

MapContainer.propTypes = {
  origins: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      coordinates: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lon: PropTypes.number.isRequired,
      }).isRequired,
      flights: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          duration: PropTypes.number.isRequired,
          isAvailable: PropTypes.bool.isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired
  ).isRequired,
  destinations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      coordinates: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lon: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
  hoveredOriginId: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
}

export default withScriptjs(withGoogleMap(MapContainer))
