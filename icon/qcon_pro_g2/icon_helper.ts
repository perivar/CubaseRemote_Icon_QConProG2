/**
 * Set Text of Column
 * @param {number} columnIndex
 * @param {string} columnText
 * @param {string} originalText
 * @returns new text
 */
const setTextOfColumn = (columnIndex: number, columnText: string, originalText: string) => {
  const col = columnIndex * 7
  const text = (columnText + '       ').slice(0, 7) // ensure to always clear a column

  // originalText must be the full width of the display when setting a column
  // so pad with spaces if it isn't
  let newText = originalText.slice(0, 56)
  let length = newText.length
  while (length++ < 56) {
    newText = newText.concat(' ')
  }

  newText = newText.substring(0, col) + text + newText.substring(col + 7, newText.length)

  return newText
}

/**
 * Set Text of line to 56 characters
 * @param {string} textString
 * @returns line of size 56 characters
 */
const setTextOfLine = (textString: string) => {
  const blank = Array(56).join(' ')
  const text = (textString + blank).slice(0, 56) // ensure to always clear the entire row

  return text
}

/**
 * Shorten Text to fit a label of length
 * @param {string} value
 * @param {number} length
 * @returns shortened label with given length
 */
const makeLabel = (value: string, length: number) => {
  // console.log("makeLabel:" + value)

  // Do nothing if the label is already short enough
  if (value.length <= length) {
    return value
  }

  // If too long shorten it by removing vowels and making it CamelCase to remove spaces
  const words = value.split(' ')
  let label = ''

  for (let i = 0, len = words.length; i < len; i++) {
    const currentStr = words[i]

    let tempStr = currentStr

    // convert first letter to upper case and remove all vowels after first letter
    tempStr = tempStr.charAt(0).toUpperCase() + tempStr.substring(1).replace(/[aeiou]/gi, '')

    label += tempStr
  }

  return label.slice(0, length) // Remove vowels and shorten to 6 char label
}

export = {
  display: {
    makeLabel,
    setTextOfColumn,
    setTextOfLine,
  },
}
