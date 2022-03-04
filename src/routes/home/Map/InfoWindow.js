import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { rem } from 'polished'
import { Flex } from 'components/Layout'
import { COLOR, FONT_SIZE, FONT_WEIGHT, SPACE } from 'Theme'
import { Text } from 'components/Typography'

const Bubble = styled(Flex)`
  align-items: center;
  justify-content: center;
  height: ${rem(20)};
`

const StyledText = styled(Text)`
  font-size: ${FONT_SIZE.XXS};
  font-weight: ${FONT_WEIGHT.SEMI_BOLD};
`

const InfoWindow = ({ flightDuration, isFlightAvailable }) => (
  <Bubble
    bg={isFlightAvailable ? COLOR.YELLOW_STAGSHOR : COLOR.OLYMPIC_BLUE}
    p={SPACE.XS}
  >
    <StyledText color={isFlightAvailable ? COLOR.BLACK : COLOR.WHITE}>
      {isFlightAvailable ? `${flightDuration} m` : 'blocked'}
    </StyledText>
  </Bubble>
)

InfoWindow.propTypes = {
  flightDuration: PropTypes.number.isRequired,
  isFlightAvailable: PropTypes.bool.isRequired,
}

export default InfoWindow
