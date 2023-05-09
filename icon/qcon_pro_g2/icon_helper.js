/**
 * Set Text of Column
 * @param {number} columnIndex
 * @param {string} columnText
 * @param {string} originalText
 * @returns new text
 */
var setTextOfColumn = function (columnIndex, columnText, originalText) {
    var col = columnIndex * 7
    var text = (columnText + '       ').slice(0, 7) // ensure to always clear a column
    // originalText must be the full width of the display when setting a column
    // so pad with spaces if it isn't
    var newText = originalText.slice(0, 56)
    var length = newText.length
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
var setTextOfLine = function (textString) {
    var blank = Array(56).join(' ')
    var text = (textString + blank).slice(0, 56) // ensure to always clear the entire row
    return text
}
/**
 * Shorten Text to fit a label of length
 * @param {string} value
 * @param {number} length
 * @returns shortened label with given length
 */
var makeLabel = function (value, length) {
    // console.log("makeLabel:" + value)
    // Do nothing if the label is already short enough
    if (value.length <= length) {
        return value
    }
    // If too long shorten it by removing vowels and making it CamelCase to remove spaces
    var words = value.split(' ')
    var label = ''
    for (var i = 0, len = words.length; i < len; i++) {
        var currentStr = words[i]
        var tempStr = currentStr
        // convert first letter to upper case and remove all vowels after first letter
        tempStr = tempStr.charAt(0).toUpperCase() + tempStr.substring(1).replace(/[aeiou]/gi, '')
        label += tempStr
    }
    return label.slice(0, length) // Remove vowels and shorten to 6 char label
}
module.exports = {
    display: {
        makeLabel: makeLabel,
        setTextOfColumn: setTextOfColumn,
        setTextOfLine: setTextOfLine,
    },
}
