import { COLOR } from 'Theme'

export const GOOGLE_MAP_URL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.GATSBY_GOOGLE_KEY}`

export const MAP_SETTINGS = {
  DEFAULT_MAP_OPTIONS: {
    scrollwheel: false,
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
  },
  DEFAULT_CENTER: { lat: 57, lng: 20 },
  DEFAULT_ZOOM: 4,
  MARKER_SIZE: {
    SMALL: 18,
    LARGE: 25,
  },
  PIXEL_OFFSET: {
    X: 0,
    Y: 20,
  },
  POLYLINE_OPTIONS: {
    DASHED: {
      geodesic: true,
      strokeOpacity: 0,
      strokeWeight: 2,
      strokeColor: COLOR.OLYMPIC_BLUE,
      icons: [
        {
          icon: {
            path: 'M 0,0 0,1',
            strokeOpacity: 1,
            strokeWeight: 2,
            scale: 3,
          },
          repeat: '10px',
        },
      ],
    },
    REGULAR: {
      geodesic: true,
      strokeOpacity: 1,
      strokeWeight: 2,
      strokeColor: COLOR.YELLOW_STAGSHOR,
    },
  },
  POLYGON: {
    PATHS: [
      { lat: 44.337799, lng: 36.640032 },
      { lat: 44.337799, lng: 32.142806 },
      { lat: 46.070955, lng: 32.142806 },
      { lat: 46.070955, lng: 36.640032 },
    ],
    OPTIONS: {
      strokeWeight: 2,
      strokeOpacity: 0.8,
      strokeColor: COLOR.OLYMPIC_BLUE,
      fillOpacity: 0.35,
      fillColor: COLOR.YELLOW_STAGSHOR,
    },
  },
}
