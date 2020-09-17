require('core-js/es/symbol')

var nativeGetOwnPropertyNames = Object.getOwnPropertyNames

function getOwnPropertyNames (o) {
  var result = nativeGetOwnPropertyNames(o)
  if (typeof o === 'function') {
    var IEKeys = ['caller', 'arguments']
    // fix IE Object.getOwnPropertyNames returns caller and arguments in strict mode for function instance
    // https://github.com/zloirock/core-js/issues/825
    result = result.filter(function (k) {
      return IEKeys.indexOf(k) === -1
    })
  }
  return result
}

getOwnPropertyNames.toString = function () {
  return 'function getOwnPropertyNames() { [native code] }'
}

Object.defineProperty(Object, 'getOwnPropertyNames', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: getOwnPropertyNames
})
