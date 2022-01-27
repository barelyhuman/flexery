const flexRegex = /^flex$/
const flexBasisRegex = /^flex-(\d*)/
const alignRegex = /^align(Top|Center|Bottom|Start|End|Baseline)$/
const justifyRegex =
	/^just(Top|Center|Bottom|Start|End|Baseline|Between|Around|Evenly|Stretch)$/
const centerRegex = /^center(X|Y)?$/
const flexDirectionRegex = /^(row|column)(Reverse)?$/

/**
 * @name modsToStyle
 * @description convert given modifiers object of the form
 * {margin-10:true} into a style object => {margin:10} with an appended dimensionUnit (eg: "px")
 * @param {Object} mods Object of spacing modifiers
 * @returns result
 * @returns result.style
 * @returns result.santizedProps
 */
export function modsToStyle(mods) {
	const style = {}

	const sanitizedProps = {...mods}

	for (const key of Object.keys(mods)) {
		let usedKey = false
		if (flexRegex.test(key)) {
			usedKey = true
			style.display = 'flex'
		}

		if (flexBasisRegex.test(key)) {
			usedKey = true
			const matches = flexBasisRegex.exec(key)
			style.flex = matches[1]
		}

		if (alignRegex.test(key)) {
			usedKey = true
			const matches = alignRegex.exec(key)

			let cleanValue = matches[1].toLowerCase()

			if (['start', 'end'].includes(cleanValue)) {
				cleanValue = 'flex-' + cleanValue
			}

			style.alignItems = cleanValue
		}

		if (flexDirectionRegex.test(key)) {
			usedKey = true
			const matches = flexDirectionRegex.exec(key)
			let cleanDirection = matches[1].toLowerCase()
			let reverse = matches[2] && matches[2].length && matches[2].toLowerCase()
			if (reverse) {
				cleanDirection += '-reverse'
			}
			style.flexDirection = cleanDirection
		}

		if (justifyRegex.test(key)) {
			usedKey = true
			const matches = justifyRegex.exec(key)
			let cleanValue = matches[1].toLowerCase()

			if (['start', 'end'].includes(cleanValue)) {
				cleanValue = 'flex-' + cleanValue
			}

			if (['between', 'around', 'evenly'].includes(cleanValue)) {
				cleanValue = 'space-' + cleanValue
			}

			style.justifyContent = cleanValue
		}

		if (centerRegex.test(key)) {
			usedKey = true
			const matches = centerRegex.exec(key)

			if (matches[1] === undefined) {
				style.alignItems = 'center'
				style.justifyContent = 'center'
			}

			if (matches[1] === 'X') {
				style.justifyContent = 'center'
			}

			if (matches[1] === 'Y') {
				style.alignItems = 'center'
			}
		}

		if (usedKey) {
			delete sanitizedProps[key]
		}
	}

	return {style, sanitizedProps}
}
