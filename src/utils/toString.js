/**
 * Converts `value` to a string. An empty string is returned for `null` and `undefined` values.
 * The sign of `-0` is preserved.
 * 转换`value`成字符串，`null`和`undefined`返回空字符串，`-0`转成'-0'
 * @param {*} value The value to convert
 * @retuens {string} Returns the converted string
 * @example
 * toString(null)
 * // => ''
 * toString(-0)
 * // => '-0'
 * toString([1, 2, 3])
 * // => '1, 2, 3'
 * toString({a: 1})
 * // => [object Object]
 */

const symbolTag = '[object Symbol]'

function isObjectLike (value) {
  return typeof value === 'object' && value !== null
}

function isSymbol (value) {
  return (
    typeof value === 'symbol' ||
    (isObjectLike(value) && Object.prototype.toString.call(value) === symbolTag)
  )
}

function arrayMap (array, iteratee) {
  var index = -1
  var length = array == null ? 0 : array.length
  var result = Array(length)

  while (++index < length) {
    result[index] = iteratee(array[index], index, array)
  }
  return result
}

function baseToString (value) {
  if (typeof value === 'string') {
    return value
  }
  if (Array.isArray(value)) {
    return arrayMap(value, baseToString) + ''
  }
  if (isSymbol(value)) {
    return Symbol.prototype.toString
      ? Symbol.prototype.toString.call(value)
      : ''
  }
  var result = value + ''
  // eslint-disable-next-line eqeqeq
  return result == '0' && 1 / value == -Infinity ? '-0' : result
}

function toString (value) {
  return value == null ? '' : baseToString(value)
}

export default toString
