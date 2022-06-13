const flexRegex = /^flex$/
const flexBasisRegex = /^flex-(\d*)/
const alignRegex = /^align(Top|Center|Bottom|Start|End|Baseline)$/
const justifyRegex =
  /^just(Top|Center|Bottom|Start|End|Baseline|Between|Around|Evenly|Stretch)$/
const centerRegex = /^center(X|Y)?$/
const flexDirectionRegex = /^(row|column)(Reverse)?$/

const applyFlex = (prop, o = {}) => {
  if (!flexRegex.test(prop)) return false

  o.display = ['-webkit-box', '-moz-box', '-ms-flexbox', '-webkit-flex', 'flex']
  return true
}

const applyBasis = (prop, o = {}) => {
  if (!flexBasisRegex.test(prop)) return false

  const matches = flexBasisRegex.exec(prop)
  o.flex = matches[1]
  return true
}

const applyAlignments = (prop, o = {}) => {
  if (!alignRegex.test(prop)) return false

  const matches = alignRegex.exec(prop)

  let cleanValue = matches[1].toLowerCase()

  if (['start', 'end'].includes(cleanValue)) cleanValue = 'flex-' + cleanValue

  o.alignItems = cleanValue
  return true
}

const applyJustifications = (prop, o = {}) => {
  if (!justifyRegex.test(prop)) return false

  const matches = justifyRegex.exec(prop)
  let cleanValue = matches[1].toLowerCase()

  if (['start', 'end'].includes(cleanValue)) cleanValue = 'flex-' + cleanValue

  if (['between', 'around', 'evenly'].includes(cleanValue))
    cleanValue = 'space-' + cleanValue

  switch (cleanValue) {
    case 'space-around': {
      o.WebkitJustifyContent = 'space-around'
      break
    }
    case 'space-evenly': {
      o.WebkitJustifyContent = 'space-evenly'
      break
    }
    case 'stretch': {
      o.WebkitJustifyContent = 'stretch'
      break
    }
  }

  o.justifyContent = cleanValue

  return true
}

const applyDirections = (prop, o = {}) => {
  if (!flexDirectionRegex.test(prop)) return false

  const matches = flexDirectionRegex.exec(prop)
  const direction = matches[1].toLowerCase()
  const reverse = matches[2] && matches[2].length && matches[2].toLowerCase()
  let cleanDirection = direction
  if (reverse) cleanDirection += '-reverse'

  o.flexDirection = cleanDirection
  o.WebkitBoxOrient = direction === 'row' ? 'horizontal' : 'vertical'
  o.WebkitBoxDirection = reverse ? 'reverse' : 'normal'
  return true
}

const applyCenter = (prop, o = {}) => {
  if (!centerRegex.test(prop)) return false

  const matches = centerRegex.exec(prop)

  if (matches[1] === undefined) {
    o.alignItems = 'center'
    o.justifyContent = 'center'
  }

  if (matches[1] === 'X') o.justifyContent = 'center'

  if (matches[1] === 'Y') o.alignItems = 'center'

  return true
}

/**
 * @name modsToStyle
 * @description convert given modifiers object of the form
 * {margin-10:true} into a style object => {margin:10} with an appended dimensionUnit (eg: "px")
 * @param {Object} mods Object of spacing modifiers
 * @returns result
 * @property result.style
 * @property result.santizedProps
 */
export function modsToStyle(mods) {
  const style = {}

  const sanitizedProps = { ...mods }

  for (const key of Object.keys(mods)) {
    if (
      !(
        applyFlex(key, style) ||
        applyBasis(key, style) ||
        applyAlignments(key, style) ||
        applyDirections(key, style) ||
        applyJustifications(key, style) ||
        applyCenter(key, style)
      )
    )
      continue

    delete sanitizedProps[key]
  }

  return { style, sanitizedProps }
}
