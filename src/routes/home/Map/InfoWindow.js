import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { rem } from 'polished'
import { Flex } from 'components/Layout'
import { COLOR, FONT_SIZE, FONT_WEIGHT } from 'Theme'
import { convertMinutesToHours } from 'helpers'

const StyledFlex = styled(Flex)`
  align-items: center;
  justify-content: center;
  height: ${rem(20)};
`

const StyledText = styled('span')`
  font-size: ${FONT_SIZE.XXS};
  font-weight: ${FONT_WEIGHT.SEMI_BOLD};
  color: ${COLOR.WHITE};
`

const InfoWindow = ({ travelTimeInMinutes, isDirectionAvailable }) =>
  isDirectionAvailable ? (
    <StyledFlex width={rem(30)} bg={COLOR.EXPLORATION_GREEN}>
      <StyledText>
        {`${convertMinutesToHours(travelTimeInMinutes)} h`}
      </StyledText>
    </StyledFlex>
  ) : (
    <StyledFlex width={rem(16)} bg={COLOR.BLUEBERRY_SODA}>
      <StyledText>X</StyledText>
    </StyledFlex>
  )

InfoWindow.propTypes = {
  travelTimeInMinutes: PropTypes.number.isRequired,
  isDirectionAvailable: PropTypes.bool.isRequired,
}

export default InfoWindow
