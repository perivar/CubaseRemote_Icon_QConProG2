import helper from '../icon_helper'

const makeLabel = helper.display.makeLabel
const setTextOfColumn = helper.display.setTextOfColumn
const setTextOfLine = helper.display.setTextOfLine

// a column is 7 characters long and with 8 channels this is 56 total characters
test('setTextOfColumn', () => {
  expect(setTextOfColumn(2, '1234567', 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')).toStrictEqual(
    'abcdefghijklmn1234567vwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcd'
  )
})

// the total text cannot be longer than 56 characters long
test('setTextOfLine', () => {
  expect(setTextOfLine('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')).toStrictEqual(
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcd'
  )
})

test('makeLabel1', () => {
  expect(makeLabel('This is a sentence 1', 6)).toStrictEqual('ThsIsA')
})

test('makeLabel2', () => {
  expect(makeLabel('Audio 001', 6)).toStrictEqual('Ad001')
})
