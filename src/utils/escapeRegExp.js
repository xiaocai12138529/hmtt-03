/**
 * 转义RegExp字符串中特殊的字符"^", "$", "\", ".", "*", "+", "?", "(", ")", "[", "]", "{", "}", "|"
 * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
 * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
 * @param {string} [string=''] The string to escape
 * @returns {string} Returns the escaped string
 * @example
 * escapeRegExp('[lodash](https://lodash.com/)')
 * // => '\[lodash\]\(https://lodash\.com/\)'
 */

import toString from './toString'

// Used to match `RegExp`
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g
var reHasRegExpChar = new RegExp(reRegExpChar.source)

function escapeRegExp (string) {
  string = toString(string)
  return string && reHasRegExpChar.test(string)
    ? string.replace(reRegExpChar, '\\$&')
    : string
}

export default escapeRegExp
