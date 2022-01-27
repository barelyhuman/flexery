import React from 'react'
import {modsToStyle} from '../lib/mods-to-style.js'

export const Flexery = ({children, ...props}) => {
	const {style: modifiersStyle, sanitizedProps} = modsToStyle(props)
	return (
		<div style={modifiersStyle} {...sanitizedProps}>
			{children}
		</div>
	)
}
