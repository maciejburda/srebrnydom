import React from "react"
import styled, { css } from "styled-components"
import { colors, typography } from "../tokens"
import { ms } from "../styles/helpers"

const DEFAULT_SPACING = '0.2px'

export const TextTag = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  span: "span",
  label: "label",
  p: "p",
  li: "li",
  a: "a",
}

export const TextStyle = {
  Heading1: "Heading1",
  Heading2: "Heading2",
  Body: "Body",
  LabelDefault: "LabelDefault",
}

export const TextAlign = {
  Left: "left",
  Center: "center",
  Right: "right",
  Justify: "justify",
}

const styleFonts = (props, defaults) => {
  return css`
    text-align: ${props.textAlign || TextAlign.Left};
    font-family: ${defaults.fontFamily || typography.fonts.default};
    font-size: ${ms(defaults.fontSizeStep)};
    line-height: ${defaults.lineHeightRatio};
    letter-spacing: ${defaults.spacing || DEFAULT_SPACING};
    font-weight: ${props.weight ||
    defaults.fontWeight ||
    typography.weights.regular};
  `
}

const getTextStyles = props => {
  const { textStyle } = props

  switch (textStyle) {
    case TextStyle.Heading1:
      return styleFonts(props, {
        fontSizeStep: 2,
        lineHeightRatio: 1.39,
        fontWeight: typography.weights.bold,
        fontFamily: typography.fonts.secondary
      })
    case TextStyle.Heading2:
      return styleFonts(props, {
        fontSizeStep: 1.125,
        lineHeightRatio: 1.39,
        fontWeight: typography.weights.bold,
        fontFamily: typography.fonts.secondary
      })

    case TextStyle.LabelDefault:
      return styleFonts(props, {
        fontSizeStep: -1,
        lineHeightRatio: 1.214,
        spacing: "1.5px",
        fontWeight: typography.weights.bold,
        fontFamily: typography.fonts.secondary
      })
    default:
    case TextStyle.Body:
      return styleFonts(props, {
        fontSizeStep: 0,
        lineHeightRatio: 1.75,
      })

  }
}

export const StyledText = styled.p`
  margin: 0;
  display: inline-block;
  color: ${props => props.color || colors.text};
  ${({ textStyle }) =>
    (textStyle === TextStyle.LabelDefault) &&
    "text-transform: uppercase"};
  ${props => getTextStyles(props)}
`

const Text = ({
  textTag = TextTag.span,
  textStyle = TextStyle.Body,
  className,
  children,
  ...restOfProps
}) => {
  return (
    <StyledText
      className={className}
      {...restOfProps}
      as={textTag}
      textTag={textTag}
      textStyle={textStyle}
    >
      {children}
    </StyledText>
  )
}

export default Text
