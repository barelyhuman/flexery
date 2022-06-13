import React from 'react'

import { modsToStyle } from '../lib/mods-to-style.js'

export function withFlexery(Component) {
  return ({ style, ...props }) => {
    const { style: modifiersStyle, sanitizedProps } = modsToStyle(props)
    return (
      <Component style={{ ...modifiersStyle, ...style }} {...sanitizedProps} />
    )
  }
}
