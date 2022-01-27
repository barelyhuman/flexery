import React from 'react'
import {modsToStyle} from '../lib/mods-to-style.js'

export const Flexery = ({children, style, ...props}) => {
	const {style: modifiersStyle, sanitizedProps} = modsToStyle(props)
	return (
		<div style={{...modifiersStyle, ...style}} {...sanitizedProps}>
			{children}
		</div>
	)
}
