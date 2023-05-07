/**
 * Set Text of Column
 * @param {number} columnIndex
 * @param {string} col_text
 * @param {string} original_text
 * @returns new text
 */
const setTextOfColumn = (columnIndex: number, col_text: string, original_text: string) => {
  const col = columnIndex * 7
  const text = (col_text + '       ').slice(0, 7) // ensure to always clear a column

  // original_text must be the full width of the display when setting a column
  // so pad with spaces if it isn't
  let new_text = original_text.slice(0, 56)
  let length = new_text.length
  while (length++ < 56) {
    new_text = new_text.concat(' ')
  }

  new_text = new_text.substring(0, col) + text + new_text.substring(col + 7, new_text.length)

  return new_text
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

  // If to long shorten it by removing vowels and making it CamelCase to remove spaces
  const words = value.split(' ')
  let label = ''

  for (let i = 0, len = words.length; i < len; i++) {
    const currentStr = words[i]

    let tempStr = currentStr

    // convert first letter to upper case and remove all vowels after first letter
    tempStr = tempStr.substr(0, 1).toUpperCase() + tempStr.substr(1).replace(/[aeiou]/gi, '')

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
