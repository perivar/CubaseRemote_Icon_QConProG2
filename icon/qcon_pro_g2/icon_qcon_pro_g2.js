/**
 * Script configuration – edit the following options to match your preferences
 */
var CONFIGURATION = {
    /**
     * If you have an extender unit, change this option to either `["extender", "main"]` (if your
     * extender is placed on the left side of the main unit) or `["main", "extender"]` (if the
     * extender is on the right side).
     *
     * You can also specify an arbitrary combination of "main" and "extender" devices here, including
     * multiple X-Touch ("main") and multiple X-Touch Extender ("extender") devices. The order of the
     * list below should match the order of the devices on your desk from left to right. The port
     * setup in the "Add MIDI Controller Surface" dialog reflects this order for input and output
     * ports, i.e., the first input and the first output port belong to the leftmost device while the
     * last input and the last output port belong to the rightmost device.
     */
    devices: ['main'],

    /**
     * Whether touching a channel's fader will select the channel ("Auto Select"). Replace `true` with
     * `false` below to disable auto selection.
     */
    enableAutoSelect: true,

    /**
     * If you don't use the Control Room or your version of Cubase doesn't have it, you'll likely want
     * the main fader to control the first output channel like in the default Mackie Control mapping.
     * You can achieve this by replacing `true` with `false` below.
     */
    mapMainFaderToControlRoom: true,
}

;('use strict')
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]
    return arr2
}
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr)
}
function _assertThisInitialized(self1) {
    if (self1 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
    }
    return self1
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function')
    }
}
function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i]
        descriptor.enumerable = descriptor.enumerable || false
        descriptor.configurable = true
        if ('value' in descriptor) descriptor.writable = true
        Object.defineProperty(target, descriptor.key, descriptor)
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps)
    if (staticProps) _defineProperties(Constructor, staticProps)
    return Constructor
}
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true,
        })
    } else {
        obj[key] = value
    }
    return obj
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function _getPrototypeOf(o) {
              return o.__proto__ || Object.getPrototypeOf(o)
          }
    return _getPrototypeOf(o)
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function')
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true,
        },
    })
    if (superClass) _setPrototypeOf(subClass, superClass)
}
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== 'undefined' && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left)
    } else {
        return left instanceof right
    }
}
function _iterableToArray(iter) {
    if (
        (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) ||
        iter['@@iterator'] != null
    )
        return Array.from(iter)
}
function _iterableToArrayLimit(arr, i) {
    var _i =
        arr == null
            ? null
            : (typeof Symbol !== 'undefined' && arr[Symbol.iterator]) || arr['@@iterator']
    if (_i == null) return
    var _arr = []
    var _n = true
    var _d = false
    var _s, _e
    try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value)
            if (i && _arr.length === i) break
        }
    } catch (err) {
        _d = true
        _e = err
    } finally {
        try {
            if (!_n && _i['return'] != null) _i['return']()
        } finally {
            if (_d) throw _e
        }
    }
    return _arr
}
function _nonIterableRest() {
    throw new TypeError(
        'Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    )
}
function _nonIterableSpread() {
    throw new TypeError(
        'Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    )
}
function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {}
        var ownKeys = Object.keys(source)
        if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(
                Object.getOwnPropertySymbols(source).filter(function (sym) {
                    return Object.getOwnPropertyDescriptor(source, sym).enumerable
                })
            )
        }
        ownKeys.forEach(function (key) {
            _defineProperty(target, key, source[key])
        })
    }
    return target
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object)
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object)
        if (enumerableOnly) {
            symbols = symbols.filter(function (sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable
            })
        }
        keys.push.apply(keys, symbols)
    }
    return keys
}
function _objectSpreadProps(target, source) {
    source = source != null ? source : {}
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
    } else {
        ownKeys(Object(source)).forEach(function (key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
        })
    }
    return target
}
function _possibleConstructorReturn(self1, call) {
    if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
        return call
    }
    return _assertThisInitialized(self1)
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf =
        Object.setPrototypeOf ||
        function _setPrototypeOf(o, p) {
            o.__proto__ = p
            return o
        }
    return _setPrototypeOf(o, p)
}
function _slicedToArray(arr, i) {
    return (
        _arrayWithHoles(arr) ||
        _iterableToArrayLimit(arr, i) ||
        _unsupportedIterableToArray(arr, i) ||
        _nonIterableRest()
    )
}
function _toConsumableArray(arr) {
    return (
        _arrayWithoutHoles(arr) ||
        _iterableToArray(arr) ||
        _unsupportedIterableToArray(arr) ||
        _nonIterableSpread()
    )
}
var _typeof = function (obj) {
    '@swc/helpers - typeof'
    return obj && typeof Symbol !== 'undefined' && obj.constructor === Symbol
        ? 'symbol'
        : typeof obj
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return
    if (typeof o === 'string') return _arrayLikeToArray(o, minLen)
    var n = Object.prototype.toString.call(o).slice(8, -1)
    if (n === 'Object' && o.constructor) n = o.constructor.name
    if (n === 'Map' || n === 'Set') return Array.from(n)
    if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen)
}
function _isNativeReflectConstruct() {
    if (typeof Reflect === 'undefined' || !Reflect.construct) return false
    if (Reflect.construct.sham) return false
    if (typeof Proxy === 'function') return true
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}))
        return true
    } catch (e) {
        return false
    }
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct()
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived),
            result
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor
            result = Reflect.construct(Super, arguments, NewTarget)
        } else {
            result = Super.apply(this, arguments)
        }
        return _possibleConstructorReturn(this, result)
    }
}
var __create = Object.create
var __defProp = Object.defineProperty
var __getOwnPropDesc = Object.getOwnPropertyDescriptor
var __getOwnPropNames = Object.getOwnPropertyNames
var __getProtoOf = Object.getPrototypeOf
var __hasOwnProp = Object.prototype.hasOwnProperty
var __commonJS = function (cb, mod) {
    return function __require() {
        return (
            mod ||
                (0, cb[__getOwnPropNames(cb)[0]])(
                    (mod = {
                        exports: {},
                    }).exports,
                    mod
                ),
            mod.exports
        )
    }
}
var __copyProps = function (to, from, except, desc) {
    if ((from && typeof from === 'object') || typeof from === 'function') {
        var _iteratorNormalCompletion = true,
            _didIteratorError = false,
            _iteratorError = undefined
        try {
            var _loop = function () {
                var key = _step.value
                if (!__hasOwnProp.call(to, key) && key !== except)
                    __defProp(to, key, {
                        get: function () {
                            return from[key]
                        },
                        enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
                    })
            }
            for (
                var _iterator = __getOwnPropNames(from)[Symbol.iterator](), _step;
                !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
                _iteratorNormalCompletion = true
            )
                _loop()
        } catch (err) {
            _didIteratorError = true
            _iteratorError = err
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return()
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError
                }
            }
        }
    }
    return to
}
var __toESM = function (mod, isNodeMode, target) {
    return (
        (target = mod != null ? __create(__getProtoOf(mod)) : {}),
        __copyProps(
            // If the importer is in node compatibility mode or this is not an ESM
            // file that has been converted to a CommonJS file using a Babel-
            // compatible transform (i.e. "__esModule" has not been set), then set
            // "default" to the CommonJS "module.exports" for node compatibility.
            isNodeMode || !mod || !mod.__esModule
                ? __defProp(target, 'default', {
                      value: mod,
                      enumerable: true,
                  })
                : target,
            mod
        )
    )
}
// node_modules/core-js/internals/fails.js
var require_fails = __commonJS({
    'node_modules/core-js/internals/fails.js': function (exports, module2) {
        module2.exports = function (exec) {
            try {
                return !!exec()
            } catch (error) {
                return true
            }
        }
    },
})
// node_modules/core-js/internals/function-bind-native.js
var require_function_bind_native = __commonJS({
    'node_modules/core-js/internals/function-bind-native.js': function (exports, module2) {
        var fails = require_fails()
        module2.exports = !fails(function () {
            var test = function () {}.bind()
            return typeof test != 'function' || test.hasOwnProperty('prototype')
        })
    },
})
// node_modules/core-js/internals/function-uncurry-this.js
var require_function_uncurry_this = __commonJS({
    'node_modules/core-js/internals/function-uncurry-this.js': function (exports, module2) {
        var NATIVE_BIND = require_function_bind_native()
        var FunctionPrototype = Function.prototype
        var call = FunctionPrototype.call
        var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call)
        module2.exports = NATIVE_BIND
            ? uncurryThisWithBind
            : function (fn) {
                  return function () {
                      return call.apply(fn, arguments)
                  }
              }
    },
})
// node_modules/core-js/internals/classof-raw.js
var require_classof_raw = __commonJS({
    'node_modules/core-js/internals/classof-raw.js': function (exports, module2) {
        var uncurryThis = require_function_uncurry_this()
        var toString = uncurryThis({}.toString)
        var stringSlice = uncurryThis(''.slice)
        module2.exports = function (it) {
            return stringSlice(toString(it), 8, -1)
        }
    },
})
// node_modules/core-js/internals/indexed-object.js
var require_indexed_object = __commonJS({
    'node_modules/core-js/internals/indexed-object.js': function (exports, module2) {
        var uncurryThis = require_function_uncurry_this()
        var fails = require_fails()
        var classof = require_classof_raw()
        var $Object = Object
        var split = uncurryThis(''.split)
        module2.exports = fails(function () {
            return !$Object('z').propertyIsEnumerable(0)
        })
            ? function (it) {
                  return classof(it) == 'String' ? split(it, '') : $Object(it)
              }
            : $Object
    },
})
// node_modules/core-js/internals/is-null-or-undefined.js
var require_is_null_or_undefined = __commonJS({
    'node_modules/core-js/internals/is-null-or-undefined.js': function (exports, module2) {
        module2.exports = function (it) {
            return it === null || it === void 0
        }
    },
})
// node_modules/core-js/internals/require-object-coercible.js
var require_require_object_coercible = __commonJS({
    'node_modules/core-js/internals/require-object-coercible.js': function (exports, module2) {
        var isNullOrUndefined = require_is_null_or_undefined()
        var $TypeError = TypeError
        module2.exports = function (it) {
            if (isNullOrUndefined(it)) throw $TypeError("Can't call method on " + it)
            return it
        }
    },
})
// node_modules/core-js/internals/to-indexed-object.js
var require_to_indexed_object = __commonJS({
    'node_modules/core-js/internals/to-indexed-object.js': function (exports, module2) {
        var IndexedObject = require_indexed_object()
        var requireObjectCoercible = require_require_object_coercible()
        module2.exports = function (it) {
            return IndexedObject(requireObjectCoercible(it))
        }
    },
})
// node_modules/core-js/internals/global.js
var require_global = __commonJS({
    'node_modules/core-js/internals/global.js': function (exports, module2) {
        var check = function check(it) {
            return it && it.Math == Math && it
        }
        module2.exports =
            check(typeof globalThis == 'object' && globalThis) ||
            check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
            check(typeof self == 'object' && self) ||
            check(typeof global == 'object' && global) || // eslint-disable-next-line no-new-func -- fallback
            (function () {
                return this
            })() ||
            Function('return this')()
    },
})
// node_modules/core-js/internals/is-pure.js
var require_is_pure = __commonJS({
    'node_modules/core-js/internals/is-pure.js': function (exports, module2) {
        module2.exports = false
    },
})
// node_modules/core-js/internals/define-global-property.js
var require_define_global_property = __commonJS({
    'node_modules/core-js/internals/define-global-property.js': function (exports, module2) {
        var global2 = require_global()
        var defineProperty = Object.defineProperty
        module2.exports = function (key, value) {
            try {
                defineProperty(global2, key, {
                    value: value,
                    configurable: true,
                    writable: true,
                })
            } catch (error) {
                global2[key] = value
            }
            return value
        }
    },
})
// node_modules/core-js/internals/shared-store.js
var require_shared_store = __commonJS({
    'node_modules/core-js/internals/shared-store.js': function (exports, module2) {
        var global2 = require_global()
        var defineGlobalProperty = require_define_global_property()
        var SHARED = '__core-js_shared__'
        var store = global2[SHARED] || defineGlobalProperty(SHARED, {})
        module2.exports = store
    },
})
// node_modules/core-js/internals/shared.js
var require_shared = __commonJS({
    'node_modules/core-js/internals/shared.js': function (exports, module2) {
        var IS_PURE = require_is_pure()
        var store = require_shared_store()
        ;(module2.exports = function (key, value) {
            return store[key] || (store[key] = value !== void 0 ? value : {})
        })('versions', []).push({
            version: '3.28.0',
            mode: IS_PURE ? 'pure' : 'global',
            copyright: '\xa9 2014-2023 Denis Pushkarev (zloirock.ru)',
            license: 'https://github.com/zloirock/core-js/blob/v3.28.0/LICENSE',
            source: 'https://github.com/zloirock/core-js',
        })
    },
})
// node_modules/core-js/internals/to-object.js
var require_to_object = __commonJS({
    'node_modules/core-js/internals/to-object.js': function (exports, module2) {
        var requireObjectCoercible = require_require_object_coercible()
        var $Object = Object
        module2.exports = function (argument) {
            return $Object(requireObjectCoercible(argument))
        }
    },
})
// node_modules/core-js/internals/has-own-property.js
var require_has_own_property = __commonJS({
    'node_modules/core-js/internals/has-own-property.js': function (exports, module2) {
        var uncurryThis = require_function_uncurry_this()
        var toObject = require_to_object()
        var hasOwnProperty = uncurryThis({}.hasOwnProperty)
        module2.exports =
            Object.hasOwn ||
            function hasOwn(it, key) {
                return hasOwnProperty(toObject(it), key)
            }
    },
})
// node_modules/core-js/internals/uid.js
var require_uid = __commonJS({
    'node_modules/core-js/internals/uid.js': function (exports, module2) {
        var uncurryThis = require_function_uncurry_this()
        var id = 0
        var postfix = Math.random()
        var toString = uncurryThis((1).toString)
        module2.exports = function (key) {
            return 'Symbol(' + (key === void 0 ? '' : key) + ')_' + toString(++id + postfix, 36)
        }
    },
})
// node_modules/core-js/internals/engine-user-agent.js
var require_engine_user_agent = __commonJS({
    'node_modules/core-js/internals/engine-user-agent.js': function (exports, module2) {
        module2.exports = (typeof navigator != 'undefined' && String(navigator.userAgent)) || ''
    },
})
// node_modules/core-js/internals/engine-v8-version.js
var require_engine_v8_version = __commonJS({
    'node_modules/core-js/internals/engine-v8-version.js': function (exports, module2) {
        var global2 = require_global()
        var userAgent = require_engine_user_agent()
        var process = global2.process
        var Deno = global2.Deno
        var versions = (process && process.versions) || (Deno && Deno.version)
        var v8 = versions && versions.v8
        var match
        var version
        if (v8) {
            match = v8.split('.')
            version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1])
        }
        if (!version && userAgent) {
            match = userAgent.match(/Edge\/(\d+)/)
            if (!match || match[1] >= 74) {
                match = userAgent.match(/Chrome\/(\d+)/)
                if (match) version = +match[1]
            }
        }
        module2.exports = version
    },
})
// node_modules/core-js/internals/symbol-constructor-detection.js
var require_symbol_constructor_detection = __commonJS({
    'node_modules/core-js/internals/symbol-constructor-detection.js': function (exports, module2) {
        var V8_VERSION = require_engine_v8_version()
        var fails = require_fails()
        module2.exports =
            !!Object.getOwnPropertySymbols &&
            !fails(function () {
                var symbol = Symbol()
                return (
                    !String(symbol) ||
                    !_instanceof(Object(symbol), Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
                    (!Symbol.sham && V8_VERSION && V8_VERSION < 41)
                )
            })
    },
})
// node_modules/core-js/internals/use-symbol-as-uid.js
var require_use_symbol_as_uid = __commonJS({
    'node_modules/core-js/internals/use-symbol-as-uid.js': function (exports, module2) {
        var NATIVE_SYMBOL = require_symbol_constructor_detection()
        module2.exports = NATIVE_SYMBOL && !Symbol.sham && _typeof(Symbol.iterator) == 'symbol'
    },
})
// node_modules/core-js/internals/well-known-symbol.js
var require_well_known_symbol = __commonJS({
    'node_modules/core-js/internals/well-known-symbol.js': function (exports, module2) {
        var global2 = require_global()
        var shared = require_shared()
        var hasOwn = require_has_own_property()
        var uid = require_uid()
        var NATIVE_SYMBOL = require_symbol_constructor_detection()
        var USE_SYMBOL_AS_UID = require_use_symbol_as_uid()
        var Symbol2 = global2.Symbol
        var WellKnownSymbolsStore = shared('wks')
        var createWellKnownSymbol = USE_SYMBOL_AS_UID
            ? Symbol2['for'] || Symbol2
            : (Symbol2 && Symbol2.withoutSetter) || uid
        module2.exports = function (name) {
            if (!hasOwn(WellKnownSymbolsStore, name)) {
                WellKnownSymbolsStore[name] =
                    NATIVE_SYMBOL && hasOwn(Symbol2, name)
                        ? Symbol2[name]
                        : createWellKnownSymbol('Symbol.' + name)
            }
            return WellKnownSymbolsStore[name]
        }
    },
})
// node_modules/core-js/internals/document-all.js
var require_document_all = __commonJS({
    'node_modules/core-js/internals/document-all.js': function (exports, module2) {
        var documentAll = typeof document == 'object' && document.all
        var IS_HTMLDDA = typeof documentAll == 'undefined' && documentAll !== void 0
        module2.exports = {
            all: documentAll,
            IS_HTMLDDA: IS_HTMLDDA,
        }
    },
})
// node_modules/core-js/internals/is-callable.js
var require_is_callable = __commonJS({
    'node_modules/core-js/internals/is-callable.js': function (exports, module2) {
        var $documentAll = require_document_all()
        var documentAll = $documentAll.all
        module2.exports = $documentAll.IS_HTMLDDA
            ? function (argument) {
                  return typeof argument == 'function' || argument === documentAll
              }
            : function (argument) {
                  return typeof argument == 'function'
              }
    },
})
// node_modules/core-js/internals/is-object.js
var require_is_object = __commonJS({
    'node_modules/core-js/internals/is-object.js': function (exports, module2) {
        var isCallable = require_is_callable()
        var $documentAll = require_document_all()
        var documentAll = $documentAll.all
        module2.exports = $documentAll.IS_HTMLDDA
            ? function (it) {
                  return typeof it == 'object' ? it !== null : isCallable(it) || it === documentAll
              }
            : function (it) {
                  return typeof it == 'object' ? it !== null : isCallable(it)
              }
    },
})
// node_modules/core-js/internals/an-object.js
var require_an_object = __commonJS({
    'node_modules/core-js/internals/an-object.js': function (exports, module2) {
        var isObject = require_is_object()
        var $String = String
        var $TypeError = TypeError
        module2.exports = function (argument) {
            if (isObject(argument)) return argument
            throw $TypeError($String(argument) + ' is not an object')
        }
    },
})
// node_modules/core-js/internals/descriptors.js
var require_descriptors = __commonJS({
    'node_modules/core-js/internals/descriptors.js': function (exports, module2) {
        var fails = require_fails()
        module2.exports = !fails(function () {
            return (
                Object.defineProperty({}, 1, {
                    get: function get() {
                        return 7
                    },
                })[1] != 7
            )
        })
    },
})
// node_modules/core-js/internals/v8-prototype-define-bug.js
var require_v8_prototype_define_bug = __commonJS({
    'node_modules/core-js/internals/v8-prototype-define-bug.js': function (exports, module2) {
        var DESCRIPTORS = require_descriptors()
        var fails = require_fails()
        module2.exports =
            DESCRIPTORS &&
            fails(function () {
                return (
                    Object.defineProperty(function () {}, 'prototype', {
                        value: 42,
                        writable: false,
                    }).prototype != 42
                )
            })
    },
})
// node_modules/core-js/internals/document-create-element.js
var require_document_create_element = __commonJS({
    'node_modules/core-js/internals/document-create-element.js': function (exports, module2) {
        var global2 = require_global()
        var isObject = require_is_object()
        var document2 = global2.document
        var EXISTS = isObject(document2) && isObject(document2.createElement)
        module2.exports = function (it) {
            return EXISTS ? document2.createElement(it) : {}
        }
    },
})
// node_modules/core-js/internals/ie8-dom-define.js
var require_ie8_dom_define = __commonJS({
    'node_modules/core-js/internals/ie8-dom-define.js': function (exports, module2) {
        var DESCRIPTORS = require_descriptors()
        var fails = require_fails()
        var createElement = require_document_create_element()
        module2.exports =
            !DESCRIPTORS &&
            !fails(function () {
                return (
                    Object.defineProperty(createElement('div'), 'a', {
                        get: function get() {
                            return 7
                        },
                    }).a != 7
                )
            })
    },
})
// node_modules/core-js/internals/function-call.js
var require_function_call = __commonJS({
    'node_modules/core-js/internals/function-call.js': function (exports, module2) {
        var NATIVE_BIND = require_function_bind_native()
        var call = Function.prototype.call
        module2.exports = NATIVE_BIND
            ? call.bind(call)
            : function () {
                  return call.apply(call, arguments)
              }
    },
})
// node_modules/core-js/internals/get-built-in.js
var require_get_built_in = __commonJS({
    'node_modules/core-js/internals/get-built-in.js': function (exports, module2) {
        var global2 = require_global()
        var isCallable = require_is_callable()
        var aFunction = function aFunction(argument) {
            return isCallable(argument) ? argument : void 0
        }
        module2.exports = function (namespace, method) {
            return arguments.length < 2
                ? aFunction(global2[namespace])
                : global2[namespace] && global2[namespace][method]
        }
    },
})
// node_modules/core-js/internals/object-is-prototype-of.js
var require_object_is_prototype_of = __commonJS({
    'node_modules/core-js/internals/object-is-prototype-of.js': function (exports, module2) {
        var uncurryThis = require_function_uncurry_this()
        module2.exports = uncurryThis({}.isPrototypeOf)
    },
})
// node_modules/core-js/internals/is-symbol.js
var require_is_symbol = __commonJS({
    'node_modules/core-js/internals/is-symbol.js': function (exports, module2) {
        var getBuiltIn = require_get_built_in()
        var isCallable = require_is_callable()
        var isPrototypeOf = require_object_is_prototype_of()
        var USE_SYMBOL_AS_UID = require_use_symbol_as_uid()
        var $Object = Object
        module2.exports = USE_SYMBOL_AS_UID
            ? function (it) {
                  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol'
              }
            : function (it) {
                  var $Symbol = getBuiltIn('Symbol')
                  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it))
              }
    },
})
// node_modules/core-js/internals/try-to-string.js
var require_try_to_string = __commonJS({
    'node_modules/core-js/internals/try-to-string.js': function (exports, module2) {
        var $String = String
        module2.exports = function (argument) {
            try {
                return $String(argument)
            } catch (error) {
                return 'Object'
            }
        }
    },
})
// node_modules/core-js/internals/a-callable.js
var require_a_callable = __commonJS({
    'node_modules/core-js/internals/a-callable.js': function (exports, module2) {
        var isCallable = require_is_callable()
        var tryToString = require_try_to_string()
        var $TypeError = TypeError
        module2.exports = function (argument) {
            if (isCallable(argument)) return argument
            throw $TypeError(tryToString(argument) + ' is not a function')
        }
    },
})
// node_modules/core-js/internals/get-method.js
var require_get_method = __commonJS({
    'node_modules/core-js/internals/get-method.js': function (exports, module2) {
        var aCallable = require_a_callable()
        var isNullOrUndefined = require_is_null_or_undefined()
        module2.exports = function (V, P) {
            var func = V[P]
            return isNullOrUndefined(func) ? void 0 : aCallable(func)
        }
    },
})
// node_modules/core-js/internals/ordinary-to-primitive.js
var require_ordinary_to_primitive = __commonJS({
    'node_modules/core-js/internals/ordinary-to-primitive.js': function (exports, module2) {
        var call = require_function_call()
        var isCallable = require_is_callable()
        var isObject = require_is_object()
        var $TypeError = TypeError
        module2.exports = function (input, pref) {
            var fn, val
            if (
                pref === 'string' &&
                isCallable((fn = input.toString)) &&
                !isObject((val = call(fn, input)))
            )
                return val
            if (isCallable((fn = input.valueOf)) && !isObject((val = call(fn, input)))) return val
            if (
                pref !== 'string' &&
                isCallable((fn = input.toString)) &&
                !isObject((val = call(fn, input)))
            )
                return val
            throw $TypeError("Can't convert object to primitive value")
        }
    },
})
// node_modules/core-js/internals/to-primitive.js
var require_to_primitive = __commonJS({
    'node_modules/core-js/internals/to-primitive.js': function (exports, module2) {
        var call = require_function_call()
        var isObject = require_is_object()
        var isSymbol = require_is_symbol()
        var getMethod = require_get_method()
        var ordinaryToPrimitive = require_ordinary_to_primitive()
        var wellKnownSymbol = require_well_known_symbol()
        var $TypeError = TypeError
        var TO_PRIMITIVE = wellKnownSymbol('toPrimitive')
        module2.exports = function (input, pref) {
            if (!isObject(input) || isSymbol(input)) return input
            var exoticToPrim = getMethod(input, TO_PRIMITIVE)
            var result
            if (exoticToPrim) {
                if (pref === void 0) pref = 'default'
                result = call(exoticToPrim, input, pref)
                if (!isObject(result) || isSymbol(result)) return result
                throw $TypeError("Can't convert object to primitive value")
            }
            if (pref === void 0) pref = 'number'
            return ordinaryToPrimitive(input, pref)
        }
    },
})
// node_modules/core-js/internals/to-property-key.js
var require_to_property_key = __commonJS({
    'node_modules/core-js/internals/to-property-key.js': function (exports, module2) {
        var toPrimitive = require_to_primitive()
        var isSymbol = require_is_symbol()
        module2.exports = function (argument) {
            var key = toPrimitive(argument, 'string')
            return isSymbol(key) ? key : key + ''
        }
    },
})
// node_modules/core-js/internals/object-define-property.js
var require_object_define_property = __commonJS({
    'node_modules/core-js/internals/object-define-property.js': function (exports) {
        var DESCRIPTORS = require_descriptors()
        var IE8_DOM_DEFINE = require_ie8_dom_define()
        var V8_PROTOTYPE_DEFINE_BUG = require_v8_prototype_define_bug()
        var anObject = require_an_object()
        var toPropertyKey = require_to_property_key()
        var $TypeError = TypeError
        var $defineProperty = Object.defineProperty
        var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor
        var ENUMERABLE = 'enumerable'
        var CONFIGURABLE = 'configurable'
        var WRITABLE = 'writable'
        exports.f = DESCRIPTORS
            ? V8_PROTOTYPE_DEFINE_BUG
                ? function defineProperty(O, P, Attributes) {
                      anObject(O)
                      P = toPropertyKey(P)
                      anObject(Attributes)
                      if (
                          typeof O === 'function' &&
                          P === 'prototype' &&
                          'value' in Attributes &&
                          WRITABLE in Attributes &&
                          !Attributes[WRITABLE]
                      ) {
                          var current = $getOwnPropertyDescriptor(O, P)
                          if (current && current[WRITABLE]) {
                              O[P] = Attributes.value
                              Attributes = {
                                  configurable:
                                      CONFIGURABLE in Attributes
                                          ? Attributes[CONFIGURABLE]
                                          : current[CONFIGURABLE],
                                  enumerable:
                                      ENUMERABLE in Attributes
                                          ? Attributes[ENUMERABLE]
                                          : current[ENUMERABLE],
                                  writable: false,
                              }
                          }
                      }
                      return $defineProperty(O, P, Attributes)
                  }
                : $defineProperty
            : function defineProperty(O, P, Attributes) {
                  anObject(O)
                  P = toPropertyKey(P)
                  anObject(Attributes)
                  if (IE8_DOM_DEFINE)
                      try {
                          return $defineProperty(O, P, Attributes)
                      } catch (error) {}
                  if ('get' in Attributes || 'set' in Attributes)
                      throw $TypeError('Accessors not supported')
                  if ('value' in Attributes) O[P] = Attributes.value
                  return O
              }
    },
})
// node_modules/core-js/internals/math-trunc.js
var require_math_trunc = __commonJS({
    'node_modules/core-js/internals/math-trunc.js': function (exports, module2) {
        var ceil = Math.ceil
        var floor = Math.floor
        module2.exports =
            Math.trunc ||
            function trunc(x) {
                var n = +x
                return (n > 0 ? floor : ceil)(n)
            }
    },
})
// node_modules/core-js/internals/to-integer-or-infinity.js
var require_to_integer_or_infinity = __commonJS({
    'node_modules/core-js/internals/to-integer-or-infinity.js': function (exports, module2) {
        var trunc = require_math_trunc()
        module2.exports = function (argument) {
            var number = +argument
            return number !== number || number === 0 ? 0 : trunc(number)
        }
    },
})
// node_modules/core-js/internals/to-absolute-index.js
var require_to_absolute_index = __commonJS({
    'node_modules/core-js/internals/to-absolute-index.js': function (exports, module2) {
        var toIntegerOrInfinity = require_to_integer_or_infinity()
        var max = Math.max
        var min = Math.min
        module2.exports = function (index, length) {
            var integer = toIntegerOrInfinity(index)
            return integer < 0 ? max(integer + length, 0) : min(integer, length)
        }
    },
})
// node_modules/core-js/internals/to-length.js
var require_to_length = __commonJS({
    'node_modules/core-js/internals/to-length.js': function (exports, module2) {
        var toIntegerOrInfinity = require_to_integer_or_infinity()
        var min = Math.min
        module2.exports = function (argument) {
            return argument > 0 ? min(toIntegerOrInfinity(argument), 9007199254740991) : 0
        }
    },
})
// node_modules/core-js/internals/length-of-array-like.js
var require_length_of_array_like = __commonJS({
    'node_modules/core-js/internals/length-of-array-like.js': function (exports, module2) {
        var toLength = require_to_length()
        module2.exports = function (obj) {
            return toLength(obj.length)
        }
    },
})
// node_modules/core-js/internals/array-includes.js
var require_array_includes = __commonJS({
    'node_modules/core-js/internals/array-includes.js': function (exports, module2) {
        var toIndexedObject = require_to_indexed_object()
        var toAbsoluteIndex = require_to_absolute_index()
        var lengthOfArrayLike = require_length_of_array_like()
        var createMethod = function createMethod(IS_INCLUDES) {
            return function ($this, el, fromIndex) {
                var O = toIndexedObject($this)
                var length = lengthOfArrayLike(O)
                var index = toAbsoluteIndex(fromIndex, length)
                var value
                if (IS_INCLUDES && el != el)
                    while (length > index) {
                        value = O[index++]
                        if (value != value) return true
                    }
                else
                    for (; length > index; index++) {
                        if ((IS_INCLUDES || index in O) && O[index] === el)
                            return IS_INCLUDES || index || 0
                    }
                return !IS_INCLUDES && -1
            }
        }
        module2.exports = {
            // `Array.prototype.includes` method
            // https://tc39.es/ecma262/#sec-array.prototype.includes
            includes: createMethod(true),
            // `Array.prototype.indexOf` method
            // https://tc39.es/ecma262/#sec-array.prototype.indexof
            indexOf: createMethod(false),
        }
    },
})
// node_modules/core-js/internals/hidden-keys.js
var require_hidden_keys = __commonJS({
    'node_modules/core-js/internals/hidden-keys.js': function (exports, module2) {
        module2.exports = {}
    },
})
// node_modules/core-js/internals/object-keys-internal.js
var require_object_keys_internal = __commonJS({
    'node_modules/core-js/internals/object-keys-internal.js': function (exports, module2) {
        var uncurryThis = require_function_uncurry_this()
        var hasOwn = require_has_own_property()
        var toIndexedObject = require_to_indexed_object()
        var indexOf = require_array_includes().indexOf
        var hiddenKeys = require_hidden_keys()
        var push = uncurryThis([].push)
        module2.exports = function (object, names) {
            var O = toIndexedObject(object)
            var i = 0
            var result = []
            var key
            for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key)
            while (names.length > i)
                if (hasOwn(O, (key = names[i++]))) {
                    ~indexOf(result, key) || push(result, key)
                }
            return result
        }
    },
})
// node_modules/core-js/internals/enum-bug-keys.js
var require_enum_bug_keys = __commonJS({
    'node_modules/core-js/internals/enum-bug-keys.js': function (exports, module2) {
        module2.exports = [
            'constructor',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'toLocaleString',
            'toString',
            'valueOf',
        ]
    },
})
// node_modules/core-js/internals/object-keys.js
var require_object_keys = __commonJS({
    'node_modules/core-js/internals/object-keys.js': function (exports, module2) {
        var internalObjectKeys = require_object_keys_internal()
        var enumBugKeys = require_enum_bug_keys()
        module2.exports =
            Object.keys ||
            function keys(O) {
                return internalObjectKeys(O, enumBugKeys)
            }
    },
})
// node_modules/core-js/internals/object-define-properties.js
var require_object_define_properties = __commonJS({
    'node_modules/core-js/internals/object-define-properties.js': function (exports) {
        var DESCRIPTORS = require_descriptors()
        var V8_PROTOTYPE_DEFINE_BUG = require_v8_prototype_define_bug()
        var definePropertyModule = require_object_define_property()
        var anObject = require_an_object()
        var toIndexedObject = require_to_indexed_object()
        var objectKeys = require_object_keys()
        exports.f =
            DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG
                ? Object.defineProperties
                : function defineProperties(O, Properties) {
                      anObject(O)
                      var props = toIndexedObject(Properties)
                      var keys = objectKeys(Properties)
                      var length = keys.length
                      var index = 0
                      var key
                      while (length > index)
                          definePropertyModule.f(O, (key = keys[index++]), props[key])
                      return O
                  }
    },
})
// node_modules/core-js/internals/html.js
var require_html = __commonJS({
    'node_modules/core-js/internals/html.js': function (exports, module2) {
        var getBuiltIn = require_get_built_in()
        module2.exports = getBuiltIn('document', 'documentElement')
    },
})
// node_modules/core-js/internals/shared-key.js
var require_shared_key = __commonJS({
    'node_modules/core-js/internals/shared-key.js': function (exports, module2) {
        var shared = require_shared()
        var uid = require_uid()
        var keys = shared('keys')
        module2.exports = function (key) {
            return keys[key] || (keys[key] = uid(key))
        }
    },
})
// node_modules/core-js/internals/object-create.js
var require_object_create = __commonJS({
    'node_modules/core-js/internals/object-create.js': function (exports, module2) {
        var anObject = require_an_object()
        var definePropertiesModule = require_object_define_properties()
        var enumBugKeys = require_enum_bug_keys()
        var hiddenKeys = require_hidden_keys()
        var html = require_html()
        var documentCreateElement = require_document_create_element()
        var sharedKey = require_shared_key()
        var GT = '>'
        var LT = '<'
        var PROTOTYPE = 'prototype'
        var SCRIPT = 'script'
        var IE_PROTO = sharedKey('IE_PROTO')
        var EmptyConstructor = function EmptyConstructor() {}
        var scriptTag = function scriptTag(content) {
            return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT
        }
        var NullProtoObjectViaActiveX = function NullProtoObjectViaActiveX(activeXDocument2) {
            activeXDocument2.write(scriptTag(''))
            activeXDocument2.close()
            var temp = activeXDocument2.parentWindow.Object
            activeXDocument2 = null
            return temp
        }
        var NullProtoObjectViaIFrame = function NullProtoObjectViaIFrame() {
            var iframe = documentCreateElement('iframe')
            var JS = 'java' + SCRIPT + ':'
            var iframeDocument
            iframe.style.display = 'none'
            html.appendChild(iframe)
            iframe.src = String(JS)
            iframeDocument = iframe.contentWindow.document
            iframeDocument.open()
            iframeDocument.write(scriptTag('document.F=Object'))
            iframeDocument.close()
            return iframeDocument.F
        }
        var activeXDocument
        var NullProtoObject = function NullProtoObject1() {
            try {
                activeXDocument = new ActiveXObject('htmlfile')
            } catch (error) {}
            NullProtoObject =
                typeof document != 'undefined'
                    ? document.domain && activeXDocument
                        ? NullProtoObjectViaActiveX(activeXDocument)
                        : NullProtoObjectViaIFrame()
                    : NullProtoObjectViaActiveX(activeXDocument)
            var length = enumBugKeys.length
            while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]]
            return NullProtoObject()
        }
        hiddenKeys[IE_PROTO] = true
        module2.exports =
            Object.create ||
            function create(O, Properties) {
                var result
                if (O !== null) {
                    EmptyConstructor[PROTOTYPE] = anObject(O)
                    result = new EmptyConstructor()
                    EmptyConstructor[PROTOTYPE] = null
                    result[IE_PROTO] = O
                } else result = NullProtoObject()
                return Properties === void 0 ? result : definePropertiesModule.f(result, Properties)
            }
    },
})
// node_modules/core-js/internals/add-to-unscopables.js
var require_add_to_unscopables = __commonJS({
    'node_modules/core-js/internals/add-to-unscopables.js': function (exports, module2) {
        var wellKnownSymbol = require_well_known_symbol()
        var create = require_object_create()
        var defineProperty = require_object_define_property().f
        var UNSCOPABLES = wellKnownSymbol('unscopables')
        var ArrayPrototype = Array.prototype
        if (ArrayPrototype[UNSCOPABLES] == void 0) {
            defineProperty(ArrayPrototype, UNSCOPABLES, {
                configurable: true,
                value: create(null),
            })
        }
        module2.exports = function (key) {
            ArrayPrototype[UNSCOPABLES][key] = true
        }
    },
})
// node_modules/core-js/internals/iterators.js
var require_iterators = __commonJS({
    'node_modules/core-js/internals/iterators.js': function (exports, module2) {
        module2.exports = {}
    },
})
// node_modules/core-js/internals/weak-map-basic-detection.js
var require_weak_map_basic_detection = __commonJS({
    'node_modules/core-js/internals/weak-map-basic-detection.js': function (exports, module2) {
        var global2 = require_global()
        var isCallable = require_is_callable()
        var WeakMap = global2.WeakMap
        module2.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap))
    },
})
// node_modules/core-js/internals/create-property-descriptor.js
var require_create_property_descriptor = __commonJS({
    'node_modules/core-js/internals/create-property-descriptor.js': function (exports, module2) {
        module2.exports = function (bitmap, value) {
            return {
                enumerable: !(bitmap & 1),
                configurable: !(bitmap & 2),
                writable: !(bitmap & 4),
                value: value,
            }
        }
    },
})
// node_modules/core-js/internals/create-non-enumerable-property.js
var require_create_non_enumerable_property = __commonJS({
    'node_modules/core-js/internals/create-non-enumerable-property.js': function (
        exports,
        module2
    ) {
        var DESCRIPTORS = require_descriptors()
        var definePropertyModule = require_object_define_property()
        var createPropertyDescriptor = require_create_property_descriptor()
        module2.exports = DESCRIPTORS
            ? function (object, key, value) {
                  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value))
              }
            : function (object, key, value) {
                  object[key] = value
                  return object
              }
    },
})
// node_modules/core-js/internals/internal-state.js
var require_internal_state = __commonJS({
    'node_modules/core-js/internals/internal-state.js': function (exports, module2) {
        var NATIVE_WEAK_MAP = require_weak_map_basic_detection()
        var global2 = require_global()
        var isObject = require_is_object()
        var createNonEnumerableProperty = require_create_non_enumerable_property()
        var hasOwn = require_has_own_property()
        var shared = require_shared_store()
        var sharedKey = require_shared_key()
        var hiddenKeys = require_hidden_keys()
        var OBJECT_ALREADY_INITIALIZED = 'Object already initialized'
        var TypeError2 = global2.TypeError
        var WeakMap = global2.WeakMap
        var set
        var get
        var has
        var enforce = function enforce(it) {
            return has(it) ? get(it) : set(it, {})
        }
        var getterFor = function getterFor(TYPE) {
            return function (it) {
                var state
                if (!isObject(it) || (state = get(it)).type !== TYPE) {
                    throw TypeError2('Incompatible receiver, ' + TYPE + ' required')
                }
                return state
            }
        }
        if (NATIVE_WEAK_MAP || shared.state) {
            store = shared.state || (shared.state = new WeakMap())
            store.get = store.get
            store.has = store.has
            store.set = store.set
            set = function set(it, metadata) {
                if (store.has(it)) throw TypeError2(OBJECT_ALREADY_INITIALIZED)
                metadata.facade = it
                store.set(it, metadata)
                return metadata
            }
            get = function get(it) {
                return store.get(it) || {}
            }
            has = function has(it) {
                return store.has(it)
            }
        } else {
            STATE = sharedKey('state')
            hiddenKeys[STATE] = true
            set = function set(it, metadata) {
                if (hasOwn(it, STATE)) throw TypeError2(OBJECT_ALREADY_INITIALIZED)
                metadata.facade = it
                createNonEnumerableProperty(it, STATE, metadata)
                return metadata
            }
            get = function get(it) {
                return hasOwn(it, STATE) ? it[STATE] : {}
            }
            has = function has(it) {
                return hasOwn(it, STATE)
            }
        }
        var store
        var STATE
        module2.exports = {
            set: set,
            get: get,
            has: has,
            enforce: enforce,
            getterFor: getterFor,
        }
    },
})
// node_modules/core-js/internals/object-property-is-enumerable.js
var require_object_property_is_enumerable = __commonJS({
    'node_modules/core-js/internals/object-property-is-enumerable.js': function (exports) {
        'use strict'
        var $propertyIsEnumerable = {}.propertyIsEnumerable
        var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor
        var NASHORN_BUG =
            getOwnPropertyDescriptor &&
            !$propertyIsEnumerable.call(
                {
                    1: 2,
                },
                1
            )
        exports.f = NASHORN_BUG
            ? function propertyIsEnumerable(V) {
                  var descriptor = getOwnPropertyDescriptor(this, V)
                  return !!descriptor && descriptor.enumerable
              }
            : $propertyIsEnumerable
    },
})
// node_modules/core-js/internals/object-get-own-property-descriptor.js
var require_object_get_own_property_descriptor = __commonJS({
    'node_modules/core-js/internals/object-get-own-property-descriptor.js': function (exports) {
        var DESCRIPTORS = require_descriptors()
        var call = require_function_call()
        var propertyIsEnumerableModule = require_object_property_is_enumerable()
        var createPropertyDescriptor = require_create_property_descriptor()
        var toIndexedObject = require_to_indexed_object()
        var toPropertyKey = require_to_property_key()
        var hasOwn = require_has_own_property()
        var IE8_DOM_DEFINE = require_ie8_dom_define()
        var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor
        exports.f = DESCRIPTORS
            ? $getOwnPropertyDescriptor
            : function getOwnPropertyDescriptor(O, P) {
                  O = toIndexedObject(O)
                  P = toPropertyKey(P)
                  if (IE8_DOM_DEFINE)
                      try {
                          return $getOwnPropertyDescriptor(O, P)
                      } catch (error) {}
                  if (hasOwn(O, P))
                      return createPropertyDescriptor(
                          !call(propertyIsEnumerableModule.f, O, P),
                          O[P]
                      )
              }
    },
})
// node_modules/core-js/internals/function-name.js
var require_function_name = __commonJS({
    'node_modules/core-js/internals/function-name.js': function (exports, module2) {
        var DESCRIPTORS = require_descriptors()
        var hasOwn = require_has_own_property()
        var FunctionPrototype = Function.prototype
        var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor
        var EXISTS = hasOwn(FunctionPrototype, 'name')
        var PROPER = EXISTS && function something() {}.name === 'something'
        var CONFIGURABLE =
            EXISTS &&
            (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable))
        module2.exports = {
            EXISTS: EXISTS,
            PROPER: PROPER,
            CONFIGURABLE: CONFIGURABLE,
        }
    },
})
// node_modules/core-js/internals/inspect-source.js
var require_inspect_source = __commonJS({
    'node_modules/core-js/internals/inspect-source.js': function (exports, module2) {
        var uncurryThis = require_function_uncurry_this()
        var isCallable = require_is_callable()
        var store = require_shared_store()
        var functionToString = uncurryThis(Function.toString)
        if (!isCallable(store.inspectSource)) {
            store.inspectSource = function (it) {
                return functionToString(it)
            }
        }
        module2.exports = store.inspectSource
    },
})
// node_modules/core-js/internals/make-built-in.js
var require_make_built_in = __commonJS({
    'node_modules/core-js/internals/make-built-in.js': function (exports, module2) {
        var uncurryThis = require_function_uncurry_this()
        var fails = require_fails()
        var isCallable = require_is_callable()
        var hasOwn = require_has_own_property()
        var DESCRIPTORS = require_descriptors()
        var CONFIGURABLE_FUNCTION_NAME = require_function_name().CONFIGURABLE
        var inspectSource = require_inspect_source()
        var InternalStateModule = require_internal_state()
        var enforceInternalState = InternalStateModule.enforce
        var getInternalState = InternalStateModule.get
        var $String = String
        var defineProperty = Object.defineProperty
        var stringSlice = uncurryThis(''.slice)
        var replace = uncurryThis(''.replace)
        var join = uncurryThis([].join)
        var CONFIGURABLE_LENGTH =
            DESCRIPTORS &&
            !fails(function () {
                return (
                    defineProperty(function () {}, 'length', {
                        value: 8,
                    }).length !== 8
                )
            })
        var TEMPLATE = String(String).split('String')
        var makeBuiltIn = (module2.exports = function makeBuiltIn(value, name, options) {
            if (stringSlice($String(name), 0, 7) === 'Symbol(') {
                name = '[' + replace($String(name), /^Symbol\(([^)]*)\)/, '$1') + ']'
            }
            if (options && options.getter) name = 'get ' + name
            if (options && options.setter) name = 'set ' + name
            if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
                if (DESCRIPTORS)
                    defineProperty(value, 'name', {
                        value: name,
                        configurable: true,
                    })
                else value.name = name
            }
            if (
                CONFIGURABLE_LENGTH &&
                options &&
                hasOwn(options, 'arity') &&
                value.length !== options.arity
            ) {
                defineProperty(value, 'length', {
                    value: options.arity,
                })
            }
            try {
                if (options && hasOwn(options, 'constructor') && options.constructor) {
                    if (DESCRIPTORS)
                        defineProperty(value, 'prototype', {
                            writable: false,
                        })
                } else if (value.prototype) value.prototype = void 0
            } catch (error) {}
            var state = enforceInternalState(value)
            if (!hasOwn(state, 'source')) {
                state.source = join(TEMPLATE, typeof name == 'string' ? name : '')
            }
            return value
        })
        Function.prototype.toString = makeBuiltIn(function toString() {
            return (isCallable(this) && getInternalState(this).source) || inspectSource(this)
        }, 'toString')
    },
})
// node_modules/core-js/internals/define-built-in.js
var require_define_built_in = __commonJS({
    'node_modules/core-js/internals/define-built-in.js': function (exports, module2) {
        var isCallable = require_is_callable()
        var definePropertyModule = require_object_define_property()
        var makeBuiltIn = require_make_built_in()
        var defineGlobalProperty = require_define_global_property()
        module2.exports = function (O, key, value, options) {
            if (!options) options = {}
            var simple = options.enumerable
            var name = options.name !== void 0 ? options.name : key
            if (isCallable(value)) makeBuiltIn(value, name, options)
            if (options.global) {
                if (simple) O[key] = value
                else defineGlobalProperty(key, value)
            } else {
                try {
                    if (!options.unsafe) delete O[key]
                    else if (O[key]) simple = true
                } catch (error) {}
                if (simple) O[key] = value
                else
                    definePropertyModule.f(O, key, {
                        value: value,
                        enumerable: false,
                        configurable: !options.nonConfigurable,
                        writable: !options.nonWritable,
                    })
            }
            return O
        }
    },
})
// node_modules/core-js/internals/object-get-own-property-names.js
var require_object_get_own_property_names = __commonJS({
    'node_modules/core-js/internals/object-get-own-property-names.js': function (exports) {
        var internalObjectKeys = require_object_keys_internal()
        var enumBugKeys = require_enum_bug_keys()
        var hiddenKeys = enumBugKeys.concat('length', 'prototype')
        exports.f =
            Object.getOwnPropertyNames ||
            function getOwnPropertyNames(O) {
                return internalObjectKeys(O, hiddenKeys)
            }
    },
})
// node_modules/core-js/internals/object-get-own-property-symbols.js
var require_object_get_own_property_symbols = __commonJS({
    'node_modules/core-js/internals/object-get-own-property-symbols.js': function (exports) {
        exports.f = Object.getOwnPropertySymbols
    },
})
// node_modules/core-js/internals/own-keys.js
var require_own_keys = __commonJS({
    'node_modules/core-js/internals/own-keys.js': function (exports, module2) {
        var getBuiltIn = require_get_built_in()
        var uncurryThis = require_function_uncurry_this()
        var getOwnPropertyNamesModule = require_object_get_own_property_names()
        var getOwnPropertySymbolsModule = require_object_get_own_property_symbols()
        var anObject = require_an_object()
        var concat = uncurryThis([].concat)
        module2.exports =
            getBuiltIn('Reflect', 'ownKeys') ||
            function ownKeys(it) {
                var keys = getOwnPropertyNamesModule.f(anObject(it))
                var getOwnPropertySymbols = getOwnPropertySymbolsModule.f
                return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys
            }
    },
})
// node_modules/core-js/internals/copy-constructor-properties.js
var require_copy_constructor_properties = __commonJS({
    'node_modules/core-js/internals/copy-constructor-properties.js': function (exports, module2) {
        var hasOwn = require_has_own_property()
        var ownKeys = require_own_keys()
        var getOwnPropertyDescriptorModule = require_object_get_own_property_descriptor()
        var definePropertyModule = require_object_define_property()
        module2.exports = function (target, source, exceptions) {
            var keys = ownKeys(source)
            var defineProperty = definePropertyModule.f
            var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i]
                if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
                    defineProperty(target, key, getOwnPropertyDescriptor(source, key))
                }
            }
        }
    },
})
// node_modules/core-js/internals/is-forced.js
var require_is_forced = __commonJS({
    'node_modules/core-js/internals/is-forced.js': function (exports, module2) {
        var fails = require_fails()
        var isCallable = require_is_callable()
        var replacement = /#|\.prototype\./
        var isForced = function isForced(feature, detection) {
            var value = data[normalize(feature)]
            return value == POLYFILL
                ? true
                : value == NATIVE
                ? false
                : isCallable(detection)
                ? fails(detection)
                : !!detection
        }
        var normalize = (isForced.normalize = function normalize(string) {
            return String(string).replace(replacement, '.').toLowerCase()
        })
        var data = (isForced.data = {})
        var NATIVE = (isForced.NATIVE = 'N')
        var POLYFILL = (isForced.POLYFILL = 'P')
        module2.exports = isForced
    },
})
// node_modules/core-js/internals/export.js
var require_export = __commonJS({
    'node_modules/core-js/internals/export.js': function (exports, module2) {
        var global2 = require_global()
        var getOwnPropertyDescriptor = require_object_get_own_property_descriptor().f
        var createNonEnumerableProperty = require_create_non_enumerable_property()
        var defineBuiltIn = require_define_built_in()
        var defineGlobalProperty = require_define_global_property()
        var copyConstructorProperties = require_copy_constructor_properties()
        var isForced = require_is_forced()
        module2.exports = function (options, source) {
            var TARGET = options.target
            var GLOBAL = options.global
            var STATIC = options.stat
            var FORCED, target, key, targetProperty, sourceProperty, descriptor
            if (GLOBAL) {
                target = global2
            } else if (STATIC) {
                target = global2[TARGET] || defineGlobalProperty(TARGET, {})
            } else {
                target = (global2[TARGET] || {}).prototype
            }
            if (target)
                for (key in source) {
                    sourceProperty = source[key]
                    if (options.dontCallGetSet) {
                        descriptor = getOwnPropertyDescriptor(target, key)
                        targetProperty = descriptor && descriptor.value
                    } else targetProperty = target[key]
                    FORCED = isForced(
                        GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key,
                        options.forced
                    )
                    if (!FORCED && targetProperty !== void 0) {
                        if (
                            (typeof sourceProperty === 'undefined'
                                ? 'undefined'
                                : _typeof(sourceProperty)) ==
                            (typeof targetProperty === 'undefined'
                                ? 'undefined'
                                : _typeof(targetProperty))
                        )
                            continue
                        copyConstructorProperties(sourceProperty, targetProperty)
                    }
                    if (options.sham || (targetProperty && targetProperty.sham)) {
                        createNonEnumerableProperty(sourceProperty, 'sham', true)
                    }
                    defineBuiltIn(target, key, sourceProperty, options)
                }
        }
    },
})
// node_modules/core-js/internals/correct-prototype-getter.js
var require_correct_prototype_getter = __commonJS({
    'node_modules/core-js/internals/correct-prototype-getter.js': function (exports, module2) {
        var fails = require_fails()
        module2.exports = !fails(function () {
            var F = function F() {}
            F.prototype.constructor = null
            return Object.getPrototypeOf(new F()) !== F.prototype
        })
    },
})
// node_modules/core-js/internals/object-get-prototype-of.js
var require_object_get_prototype_of = __commonJS({
    'node_modules/core-js/internals/object-get-prototype-of.js': function (exports, module2) {
        var hasOwn = require_has_own_property()
        var isCallable = require_is_callable()
        var toObject = require_to_object()
        var sharedKey = require_shared_key()
        var CORRECT_PROTOTYPE_GETTER = require_correct_prototype_getter()
        var IE_PROTO = sharedKey('IE_PROTO')
        var $Object = Object
        var ObjectPrototype = $Object.prototype
        module2.exports = CORRECT_PROTOTYPE_GETTER
            ? $Object.getPrototypeOf
            : function (O) {
                  var object = toObject(O)
                  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO]
                  var constructor = object.constructor
                  if (isCallable(constructor) && _instanceof(object, constructor)) {
                      return constructor.prototype
                  }
                  return _instanceof(object, $Object) ? ObjectPrototype : null
              }
    },
})
// node_modules/core-js/internals/iterators-core.js
var require_iterators_core = __commonJS({
    'node_modules/core-js/internals/iterators-core.js': function (exports, module2) {
        'use strict'
        var fails = require_fails()
        var isCallable = require_is_callable()
        var isObject = require_is_object()
        var create = require_object_create()
        var getPrototypeOf = require_object_get_prototype_of()
        var defineBuiltIn = require_define_built_in()
        var wellKnownSymbol = require_well_known_symbol()
        var IS_PURE = require_is_pure()
        var ITERATOR = wellKnownSymbol('iterator')
        var BUGGY_SAFARI_ITERATORS = false
        var IteratorPrototype
        var PrototypeOfArrayIteratorPrototype
        var arrayIterator
        if ([].keys) {
            arrayIterator = [].keys()
            if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true
            else {
                PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator))
                if (PrototypeOfArrayIteratorPrototype !== Object.prototype)
                    IteratorPrototype = PrototypeOfArrayIteratorPrototype
            }
        }
        var NEW_ITERATOR_PROTOTYPE =
            !isObject(IteratorPrototype) ||
            fails(function () {
                var test = {}
                return IteratorPrototype[ITERATOR].call(test) !== test
            })
        if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {}
        else if (IS_PURE) IteratorPrototype = create(IteratorPrototype)
        if (!isCallable(IteratorPrototype[ITERATOR])) {
            defineBuiltIn(IteratorPrototype, ITERATOR, function () {
                return this
            })
        }
        module2.exports = {
            IteratorPrototype: IteratorPrototype,
            BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS,
        }
    },
})
// node_modules/core-js/internals/set-to-string-tag.js
var require_set_to_string_tag = __commonJS({
    'node_modules/core-js/internals/set-to-string-tag.js': function (exports, module2) {
        var defineProperty = require_object_define_property().f
        var hasOwn = require_has_own_property()
        var wellKnownSymbol = require_well_known_symbol()
        var TO_STRING_TAG = wellKnownSymbol('toStringTag')
        module2.exports = function (target, TAG, STATIC) {
            if (target && !STATIC) target = target.prototype
            if (target && !hasOwn(target, TO_STRING_TAG)) {
                defineProperty(target, TO_STRING_TAG, {
                    configurable: true,
                    value: TAG,
                })
            }
        }
    },
})
// node_modules/core-js/internals/iterator-create-constructor.js
var require_iterator_create_constructor = __commonJS({
    'node_modules/core-js/internals/iterator-create-constructor.js': function (exports, module2) {
        'use strict'
        var IteratorPrototype = require_iterators_core().IteratorPrototype
        var create = require_object_create()
        var createPropertyDescriptor = require_create_property_descriptor()
        var setToStringTag = require_set_to_string_tag()
        var Iterators = require_iterators()
        var returnThis = function returnThis() {
            return this
        }
        module2.exports = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
            var TO_STRING_TAG = NAME + ' Iterator'
            IteratorConstructor.prototype = create(IteratorPrototype, {
                next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next),
            })
            setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true)
            Iterators[TO_STRING_TAG] = returnThis
            return IteratorConstructor
        }
    },
})
// node_modules/core-js/internals/function-uncurry-this-accessor.js
var require_function_uncurry_this_accessor = __commonJS({
    'node_modules/core-js/internals/function-uncurry-this-accessor.js': function (
        exports,
        module2
    ) {
        var uncurryThis = require_function_uncurry_this()
        var aCallable = require_a_callable()
        module2.exports = function (object, key, method) {
            try {
                return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]))
            } catch (error) {}
        }
    },
})
// node_modules/core-js/internals/a-possible-prototype.js
var require_a_possible_prototype = __commonJS({
    'node_modules/core-js/internals/a-possible-prototype.js': function (exports, module2) {
        var isCallable = require_is_callable()
        var $String = String
        var $TypeError = TypeError
        module2.exports = function (argument) {
            if (typeof argument == 'object' || isCallable(argument)) return argument
            throw $TypeError("Can't set " + $String(argument) + ' as a prototype')
        }
    },
})
// node_modules/core-js/internals/object-set-prototype-of.js
var require_object_set_prototype_of = __commonJS({
    'node_modules/core-js/internals/object-set-prototype-of.js': function (exports, module2) {
        var uncurryThisAccessor = require_function_uncurry_this_accessor()
        var anObject = require_an_object()
        var aPossiblePrototype = require_a_possible_prototype()
        module2.exports =
            Object.setPrototypeOf ||
            ('__proto__' in {}
                ? (function () {
                      var CORRECT_SETTER = false
                      var test = {}
                      var setter
                      try {
                          setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set')
                          setter(test, [])
                          CORRECT_SETTER = _instanceof(test, Array)
                      } catch (error) {}
                      return function setPrototypeOf(O, proto) {
                          anObject(O)
                          aPossiblePrototype(proto)
                          if (CORRECT_SETTER) setter(O, proto)
                          else O.__proto__ = proto
                          return O
                      }
                  })()
                : void 0)
    },
})
// node_modules/core-js/internals/iterator-define.js
var require_iterator_define = __commonJS({
    'node_modules/core-js/internals/iterator-define.js': function (exports, module2) {
        'use strict'
        var $ = require_export()
        var call = require_function_call()
        var IS_PURE = require_is_pure()
        var FunctionName = require_function_name()
        var isCallable = require_is_callable()
        var createIteratorConstructor = require_iterator_create_constructor()
        var getPrototypeOf = require_object_get_prototype_of()
        var setPrototypeOf = require_object_set_prototype_of()
        var setToStringTag = require_set_to_string_tag()
        var createNonEnumerableProperty = require_create_non_enumerable_property()
        var defineBuiltIn = require_define_built_in()
        var wellKnownSymbol = require_well_known_symbol()
        var Iterators = require_iterators()
        var IteratorsCore = require_iterators_core()
        var PROPER_FUNCTION_NAME = FunctionName.PROPER
        var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE
        var IteratorPrototype = IteratorsCore.IteratorPrototype
        var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS
        var ITERATOR = wellKnownSymbol('iterator')
        var KEYS = 'keys'
        var VALUES = 'values'
        var ENTRIES = 'entries'
        var returnThis = function returnThis() {
            return this
        }
        module2.exports = function (
            Iterable,
            NAME,
            IteratorConstructor,
            next,
            DEFAULT,
            IS_SET,
            FORCED
        ) {
            createIteratorConstructor(IteratorConstructor, NAME, next)
            var getIterationMethod = function getIterationMethod(KIND) {
                if (KIND === DEFAULT && defaultIterator) return defaultIterator
                if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype)
                    return IterablePrototype[KIND]
                switch (KIND) {
                    case KEYS:
                        return function keys() {
                            return new IteratorConstructor(this, KIND)
                        }
                    case VALUES:
                        return function values() {
                            return new IteratorConstructor(this, KIND)
                        }
                    case ENTRIES:
                        return function entries() {
                            return new IteratorConstructor(this, KIND)
                        }
                }
                return function () {
                    return new IteratorConstructor(this)
                }
            }
            var TO_STRING_TAG = NAME + ' Iterator'
            var INCORRECT_VALUES_NAME = false
            var IterablePrototype = Iterable.prototype
            var nativeIterator =
                IterablePrototype[ITERATOR] ||
                IterablePrototype['@@iterator'] ||
                (DEFAULT && IterablePrototype[DEFAULT])
            var defaultIterator =
                (!BUGGY_SAFARI_ITERATORS && nativeIterator) || getIterationMethod(DEFAULT)
            var anyNativeIterator =
                NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator
            var CurrentIteratorPrototype, methods, KEY
            if (anyNativeIterator) {
                CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()))
                if (
                    CurrentIteratorPrototype !== Object.prototype &&
                    CurrentIteratorPrototype.next
                ) {
                    if (
                        !IS_PURE &&
                        getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype
                    ) {
                        if (setPrototypeOf) {
                            setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype)
                        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
                            defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis)
                        }
                    }
                    setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true)
                    if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis
                }
            }
            if (
                PROPER_FUNCTION_NAME &&
                DEFAULT == VALUES &&
                nativeIterator &&
                nativeIterator.name !== VALUES
            ) {
                if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
                    createNonEnumerableProperty(IterablePrototype, 'name', VALUES)
                } else {
                    INCORRECT_VALUES_NAME = true
                    defaultIterator = function values() {
                        return call(nativeIterator, this)
                    }
                }
            }
            if (DEFAULT) {
                methods = {
                    values: getIterationMethod(VALUES),
                    keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
                    entries: getIterationMethod(ENTRIES),
                }
                if (FORCED)
                    for (KEY in methods) {
                        if (
                            BUGGY_SAFARI_ITERATORS ||
                            INCORRECT_VALUES_NAME ||
                            !(KEY in IterablePrototype)
                        ) {
                            defineBuiltIn(IterablePrototype, KEY, methods[KEY])
                        }
                    }
                else
                    $(
                        {
                            target: NAME,
                            proto: true,
                            forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME,
                        },
                        methods
                    )
            }
            if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
                defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, {
                    name: DEFAULT,
                })
            }
            Iterators[NAME] = defaultIterator
            return methods
        }
    },
})
// node_modules/core-js/internals/create-iter-result-object.js
var require_create_iter_result_object = __commonJS({
    'node_modules/core-js/internals/create-iter-result-object.js': function (exports, module2) {
        module2.exports = function (value, done) {
            return {
                value: value,
                done: done,
            }
        }
    },
})
// node_modules/core-js/modules/es.array.iterator.js
var require_es_array_iterator = __commonJS({
    'node_modules/core-js/modules/es.array.iterator.js': function (exports, module2) {
        'use strict'
        var toIndexedObject = require_to_indexed_object()
        var addToUnscopables = require_add_to_unscopables()
        var Iterators = require_iterators()
        var InternalStateModule = require_internal_state()
        var defineProperty = require_object_define_property().f
        var defineIterator = require_iterator_define()
        var createIterResultObject = require_create_iter_result_object()
        var IS_PURE = require_is_pure()
        var DESCRIPTORS = require_descriptors()
        var ARRAY_ITERATOR = 'Array Iterator'
        var setInternalState = InternalStateModule.set
        var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR)
        module2.exports = defineIterator(
            Array,
            'Array',
            function (iterated, kind) {
                setInternalState(this, {
                    type: ARRAY_ITERATOR,
                    target: toIndexedObject(iterated),
                    // target
                    index: 0,
                    // next index
                    kind: kind,
                })
            },
            function () {
                var state = getInternalState(this)
                var target = state.target
                var kind = state.kind
                var index = state.index++
                if (!target || index >= target.length) {
                    state.target = void 0
                    return createIterResultObject(void 0, true)
                }
                if (kind == 'keys') return createIterResultObject(index, false)
                if (kind == 'values') return createIterResultObject(target[index], false)
                return createIterResultObject([index, target[index]], false)
            },
            'values'
        )
        var values = (Iterators.Arguments = Iterators.Array)
        addToUnscopables('keys')
        addToUnscopables('values')
        addToUnscopables('entries')
        if (!IS_PURE && DESCRIPTORS && values.name !== 'values')
            try {
                defineProperty(values, 'name', {
                    value: 'values',
                })
            } catch (error) {}
    },
})
// node_modules/core-js/internals/to-string-tag-support.js
var require_to_string_tag_support = __commonJS({
    'node_modules/core-js/internals/to-string-tag-support.js': function (exports, module2) {
        var wellKnownSymbol = require_well_known_symbol()
        var TO_STRING_TAG = wellKnownSymbol('toStringTag')
        var test = {}
        test[TO_STRING_TAG] = 'z'
        module2.exports = String(test) === '[object z]'
    },
})
// node_modules/core-js/internals/classof.js
var require_classof = __commonJS({
    'node_modules/core-js/internals/classof.js': function (exports, module2) {
        var TO_STRING_TAG_SUPPORT = require_to_string_tag_support()
        var isCallable = require_is_callable()
        var classofRaw = require_classof_raw()
        var wellKnownSymbol = require_well_known_symbol()
        var TO_STRING_TAG = wellKnownSymbol('toStringTag')
        var $Object = Object
        var CORRECT_ARGUMENTS =
            classofRaw(
                (function () {
                    return arguments
                })()
            ) == 'Arguments'
        var tryGet = function tryGet(it, key) {
            try {
                return it[key]
            } catch (error) {}
        }
        module2.exports = TO_STRING_TAG_SUPPORT
            ? classofRaw
            : function (it) {
                  var O, tag, result
                  return it === void 0
                      ? 'Undefined'
                      : it === null
                      ? 'Null'
                      : typeof (tag = tryGet((O = $Object(it)), TO_STRING_TAG)) == 'string'
                      ? tag
                      : CORRECT_ARGUMENTS
                      ? classofRaw(O)
                      : (result = classofRaw(O)) == 'Object' && isCallable(O.callee)
                      ? 'Arguments'
                      : result
              }
    },
})
// node_modules/core-js/internals/object-to-string.js
var require_object_to_string = __commonJS({
    'node_modules/core-js/internals/object-to-string.js': function (exports, module2) {
        'use strict'
        var TO_STRING_TAG_SUPPORT = require_to_string_tag_support()
        var classof = require_classof()
        module2.exports = TO_STRING_TAG_SUPPORT
            ? {}.toString
            : function toString() {
                  return '[object ' + classof(this) + ']'
              }
    },
})
// node_modules/core-js/modules/es.object.to-string.js
var require_es_object_to_string = __commonJS({
    'node_modules/core-js/modules/es.object.to-string.js': function () {
        var TO_STRING_TAG_SUPPORT = require_to_string_tag_support()
        var defineBuiltIn = require_define_built_in()
        var toString = require_object_to_string()
        if (!TO_STRING_TAG_SUPPORT) {
            defineBuiltIn(Object.prototype, 'toString', toString, {
                unsafe: true,
            })
        }
    },
})
// node_modules/core-js/internals/entry-unbind.js
var require_entry_unbind = __commonJS({
    'node_modules/core-js/internals/entry-unbind.js': function (exports, module2) {
        var global2 = require_global()
        var uncurryThis = require_function_uncurry_this()
        module2.exports = function (CONSTRUCTOR, METHOD) {
            return uncurryThis(global2[CONSTRUCTOR].prototype[METHOD])
        }
    },
})
// node_modules/core-js/es/array/iterator.js
var require_iterator = __commonJS({
    'node_modules/core-js/es/array/iterator.js': function (exports, module2) {
        require_es_array_iterator()
        require_es_object_to_string()
        var entryUnbind = require_entry_unbind()
        module2.exports = entryUnbind('Array', 'values')
    },
})
// node_modules/core-js/internals/to-string.js
var require_to_string = __commonJS({
    'node_modules/core-js/internals/to-string.js': function (exports, module2) {
        var classof = require_classof()
        var $String = String
        module2.exports = function (argument) {
            if (classof(argument) === 'Symbol')
                throw TypeError('Cannot convert a Symbol value to a string')
            return $String(argument)
        }
    },
})
// node_modules/core-js/internals/string-multibyte.js
var require_string_multibyte = __commonJS({
    'node_modules/core-js/internals/string-multibyte.js': function (exports, module2) {
        var uncurryThis = require_function_uncurry_this()
        var toIntegerOrInfinity = require_to_integer_or_infinity()
        var toString = require_to_string()
        var requireObjectCoercible = require_require_object_coercible()
        var charAt = uncurryThis(''.charAt)
        var charCodeAt = uncurryThis(''.charCodeAt)
        var stringSlice = uncurryThis(''.slice)
        var createMethod = function createMethod(CONVERT_TO_STRING) {
            return function ($this, pos) {
                var S = toString(requireObjectCoercible($this))
                var position = toIntegerOrInfinity(pos)
                var size = S.length
                var first, second
                if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : void 0
                first = charCodeAt(S, position)
                return first < 55296 ||
                    first > 56319 ||
                    position + 1 === size ||
                    (second = charCodeAt(S, position + 1)) < 56320 ||
                    second > 57343
                    ? CONVERT_TO_STRING
                        ? charAt(S, position)
                        : first
                    : CONVERT_TO_STRING
                    ? stringSlice(S, position, position + 2)
                    : ((first - 55296) << 10) + (second - 56320) + 65536
            }
        }
        module2.exports = {
            // `String.prototype.codePointAt` method
            // https://tc39.es/ecma262/#sec-string.prototype.codepointat
            codeAt: createMethod(false),
            // `String.prototype.at` method
            // https://github.com/mathiasbynens/String.prototype.at
            charAt: createMethod(true),
        }
    },
})
// node_modules/core-js/modules/es.string.iterator.js
var require_es_string_iterator = __commonJS({
    'node_modules/core-js/modules/es.string.iterator.js': function () {
        'use strict'
        var charAt = require_string_multibyte().charAt
        var toString = require_to_string()
        var InternalStateModule = require_internal_state()
        var defineIterator = require_iterator_define()
        var createIterResultObject = require_create_iter_result_object()
        var STRING_ITERATOR = 'String Iterator'
        var setInternalState = InternalStateModule.set
        var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR)
        defineIterator(
            String,
            'String',
            function (iterated) {
                setInternalState(this, {
                    type: STRING_ITERATOR,
                    string: toString(iterated),
                    index: 0,
                })
            },
            function next() {
                var state = getInternalState(this)
                var string = state.string
                var index = state.index
                var point
                if (index >= string.length) return createIterResultObject(void 0, true)
                point = charAt(string, index)
                state.index += point.length
                return createIterResultObject(point, false)
            }
        )
    },
})
// node_modules/core-js/internals/function-uncurry-this-clause.js
var require_function_uncurry_this_clause = __commonJS({
    'node_modules/core-js/internals/function-uncurry-this-clause.js': function (exports, module2) {
        var classofRaw = require_classof_raw()
        var uncurryThis = require_function_uncurry_this()
        module2.exports = function (fn) {
            if (classofRaw(fn) === 'Function') return uncurryThis(fn)
        }
    },
})
// node_modules/core-js/internals/function-bind-context.js
var require_function_bind_context = __commonJS({
    'node_modules/core-js/internals/function-bind-context.js': function (exports, module2) {
        var uncurryThis = require_function_uncurry_this_clause()
        var aCallable = require_a_callable()
        var NATIVE_BIND = require_function_bind_native()
        var bind = uncurryThis(uncurryThis.bind)
        module2.exports = function (fn, that) {
            aCallable(fn)
            return that === void 0
                ? fn
                : NATIVE_BIND
                ? bind(fn, that)
                : function () {
                      return fn.apply(that, arguments)
                  }
        }
    },
})
// node_modules/core-js/internals/iterator-close.js
var require_iterator_close = __commonJS({
    'node_modules/core-js/internals/iterator-close.js': function (exports, module2) {
        var call = require_function_call()
        var anObject = require_an_object()
        var getMethod = require_get_method()
        module2.exports = function (iterator, kind, value) {
            var innerResult, innerError
            anObject(iterator)
            try {
                innerResult = getMethod(iterator, 'return')
                if (!innerResult) {
                    if (kind === 'throw') throw value
                    return value
                }
                innerResult = call(innerResult, iterator)
            } catch (error) {
                innerError = true
                innerResult = error
            }
            if (kind === 'throw') throw value
            if (innerError) throw innerResult
            anObject(innerResult)
            return value
        }
    },
})
// node_modules/core-js/internals/call-with-safe-iteration-closing.js
var require_call_with_safe_iteration_closing = __commonJS({
    'node_modules/core-js/internals/call-with-safe-iteration-closing.js': function (
        exports,
        module2
    ) {
        var anObject = require_an_object()
        var iteratorClose = require_iterator_close()
        module2.exports = function (iterator, fn, value, ENTRIES) {
            try {
                return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value)
            } catch (error) {
                iteratorClose(iterator, 'throw', error)
            }
        }
    },
})
// node_modules/core-js/internals/is-array-iterator-method.js
var require_is_array_iterator_method = __commonJS({
    'node_modules/core-js/internals/is-array-iterator-method.js': function (exports, module2) {
        var wellKnownSymbol = require_well_known_symbol()
        var Iterators = require_iterators()
        var ITERATOR = wellKnownSymbol('iterator')
        var ArrayPrototype = Array.prototype
        module2.exports = function (it) {
            return it !== void 0 && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it)
        }
    },
})
// node_modules/core-js/internals/is-constructor.js
var require_is_constructor = __commonJS({
    'node_modules/core-js/internals/is-constructor.js': function (exports, module2) {
        var uncurryThis = require_function_uncurry_this()
        var fails = require_fails()
        var isCallable = require_is_callable()
        var classof = require_classof()
        var getBuiltIn = require_get_built_in()
        var inspectSource = require_inspect_source()
        var noop = function noop() {}
        var empty = []
        var construct = getBuiltIn('Reflect', 'construct')
        var constructorRegExp = /^\s*(?:class|function)\b/
        var exec = uncurryThis(constructorRegExp.exec)
        var INCORRECT_TO_STRING = !constructorRegExp.exec(noop)
        var isConstructorModern = function isConstructor(argument) {
            if (!isCallable(argument)) return false
            try {
                construct(noop, empty, argument)
                return true
            } catch (error) {
                return false
            }
        }
        var isConstructorLegacy = function isConstructor(argument) {
            if (!isCallable(argument)) return false
            switch (classof(argument)) {
                case 'AsyncFunction':
                case 'GeneratorFunction':
                case 'AsyncGeneratorFunction':
                    return false
            }
            try {
                return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument))
            } catch (error) {
                return true
            }
        }
        isConstructorLegacy.sham = true
        module2.exports =
            !construct ||
            fails(function () {
                var called
                return (
                    isConstructorModern(isConstructorModern.call) ||
                    !isConstructorModern(Object) ||
                    !isConstructorModern(function () {
                        called = true
                    }) ||
                    called
                )
            })
                ? isConstructorLegacy
                : isConstructorModern
    },
})
// node_modules/core-js/internals/create-property.js
var require_create_property = __commonJS({
    'node_modules/core-js/internals/create-property.js': function (exports, module2) {
        'use strict'
        var toPropertyKey = require_to_property_key()
        var definePropertyModule = require_object_define_property()
        var createPropertyDescriptor = require_create_property_descriptor()
        module2.exports = function (object, key, value) {
            var propertyKey = toPropertyKey(key)
            if (propertyKey in object)
                definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value))
            else object[propertyKey] = value
        }
    },
})
// node_modules/core-js/internals/get-iterator-method.js
var require_get_iterator_method = __commonJS({
    'node_modules/core-js/internals/get-iterator-method.js': function (exports, module2) {
        var classof = require_classof()
        var getMethod = require_get_method()
        var isNullOrUndefined = require_is_null_or_undefined()
        var Iterators = require_iterators()
        var wellKnownSymbol = require_well_known_symbol()
        var ITERATOR = wellKnownSymbol('iterator')
        module2.exports = function (it) {
            if (!isNullOrUndefined(it))
                return (
                    getMethod(it, ITERATOR) || getMethod(it, '@@iterator') || Iterators[classof(it)]
                )
        }
    },
})
// node_modules/core-js/internals/get-iterator.js
var require_get_iterator = __commonJS({
    'node_modules/core-js/internals/get-iterator.js': function (exports, module2) {
        var call = require_function_call()
        var aCallable = require_a_callable()
        var anObject = require_an_object()
        var tryToString = require_try_to_string()
        var getIteratorMethod = require_get_iterator_method()
        var $TypeError = TypeError
        module2.exports = function (argument, usingIterator) {
            var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator
            if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument))
            throw $TypeError(tryToString(argument) + ' is not iterable')
        }
    },
})
// node_modules/core-js/internals/array-from.js
var require_array_from = __commonJS({
    'node_modules/core-js/internals/array-from.js': function (exports, module2) {
        'use strict'
        var bind = require_function_bind_context()
        var call = require_function_call()
        var toObject = require_to_object()
        var callWithSafeIterationClosing = require_call_with_safe_iteration_closing()
        var isArrayIteratorMethod = require_is_array_iterator_method()
        var isConstructor = require_is_constructor()
        var lengthOfArrayLike = require_length_of_array_like()
        var createProperty = require_create_property()
        var getIterator = require_get_iterator()
        var getIteratorMethod = require_get_iterator_method()
        var $Array = Array
        module2.exports = function from(arrayLike) {
            var O = toObject(arrayLike)
            var IS_CONSTRUCTOR = isConstructor(this)
            var argumentsLength = arguments.length
            var mapfn = argumentsLength > 1 ? arguments[1] : void 0
            var mapping = mapfn !== void 0
            if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : void 0)
            var iteratorMethod = getIteratorMethod(O)
            var index = 0
            var length, result, step, iterator, next, value
            if (iteratorMethod && !(this === $Array && isArrayIteratorMethod(iteratorMethod))) {
                iterator = getIterator(O, iteratorMethod)
                next = iterator.next
                result = IS_CONSTRUCTOR ? new this() : []
                for (; !(step = call(next, iterator)).done; index++) {
                    value = mapping
                        ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true)
                        : step.value
                    createProperty(result, index, value)
                }
            } else {
                length = lengthOfArrayLike(O)
                result = IS_CONSTRUCTOR ? new this(length) : $Array(length)
                for (; length > index; index++) {
                    value = mapping ? mapfn(O[index], index) : O[index]
                    createProperty(result, index, value)
                }
            }
            result.length = index
            return result
        }
    },
})
// node_modules/core-js/internals/check-correctness-of-iteration.js
var require_check_correctness_of_iteration = __commonJS({
    'node_modules/core-js/internals/check-correctness-of-iteration.js': function (
        exports,
        module2
    ) {
        var wellKnownSymbol = require_well_known_symbol()
        var ITERATOR = wellKnownSymbol('iterator')
        var SAFE_CLOSING = false
        try {
            called = 0
            iteratorWithReturn = {
                next: function next() {
                    return {
                        done: !!called++,
                    }
                },
                return: function () {
                    SAFE_CLOSING = true
                },
            }
            iteratorWithReturn[ITERATOR] = function () {
                return this
            }
            Array.from(iteratorWithReturn, function () {
                throw 2
            })
        } catch (error) {}
        var called
        var iteratorWithReturn
        module2.exports = function (exec, SKIP_CLOSING) {
            if (!SKIP_CLOSING && !SAFE_CLOSING) return false
            var ITERATION_SUPPORT = false
            try {
                var object = {}
                object[ITERATOR] = function () {
                    return {
                        next: function next() {
                            return {
                                done: (ITERATION_SUPPORT = true),
                            }
                        },
                    }
                }
                exec(object)
            } catch (error) {}
            return ITERATION_SUPPORT
        }
    },
})
// node_modules/core-js/modules/es.array.from.js
var require_es_array_from = __commonJS({
    'node_modules/core-js/modules/es.array.from.js': function () {
        var $ = require_export()
        var from = require_array_from()
        var checkCorrectnessOfIteration = require_check_correctness_of_iteration()
        var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
            Array.from(iterable)
        })
        $(
            {
                target: 'Array',
                stat: true,
                forced: INCORRECT_ITERATION,
            },
            {
                from: from,
            }
        )
    },
})
// node_modules/core-js/internals/path.js
var require_path = __commonJS({
    'node_modules/core-js/internals/path.js': function (exports, module2) {
        var global2 = require_global()
        module2.exports = global2
    },
})
// node_modules/core-js/es/array/from.js
var require_from = __commonJS({
    'node_modules/core-js/es/array/from.js': function (exports, module2) {
        require_es_string_iterator()
        require_es_array_from()
        var path = require_path()
        module2.exports = path.Array.from
    },
})
// node_modules/core-js/internals/is-array.js
var require_is_array = __commonJS({
    'node_modules/core-js/internals/is-array.js': function (exports, module2) {
        var classof = require_classof_raw()
        module2.exports =
            Array.isArray ||
            function isArray(argument) {
                return classof(argument) == 'Array'
            }
    },
})
// node_modules/core-js/modules/es.array.reverse.js
var require_es_array_reverse = __commonJS({
    'node_modules/core-js/modules/es.array.reverse.js': function () {
        'use strict'
        var $ = require_export()
        var uncurryThis = require_function_uncurry_this()
        var isArray = require_is_array()
        var nativeReverse = uncurryThis([].reverse)
        var test = [1, 2]
        $(
            {
                target: 'Array',
                proto: true,
                forced: String(test) === String(test.reverse()),
            },
            {
                reverse: function reverse() {
                    if (isArray(this)) this.length = this.length
                    return nativeReverse(this)
                },
            }
        )
    },
})
// node_modules/core-js/es/array/reverse.js
var require_reverse = __commonJS({
    'node_modules/core-js/es/array/reverse.js': function (exports, module2) {
        require_es_array_reverse()
        var entryUnbind = require_entry_unbind()
        module2.exports = entryUnbind('Array', 'reverse')
    },
})
// node_modules/core-js/internals/does-not-exceed-safe-integer.js
var require_does_not_exceed_safe_integer = __commonJS({
    'node_modules/core-js/internals/does-not-exceed-safe-integer.js': function (exports, module2) {
        var $TypeError = TypeError
        var MAX_SAFE_INTEGER = 9007199254740991
        module2.exports = function (it) {
            if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded')
            return it
        }
    },
})
// node_modules/core-js/internals/flatten-into-array.js
var require_flatten_into_array = __commonJS({
    'node_modules/core-js/internals/flatten-into-array.js': function (exports, module2) {
        'use strict'
        var isArray = require_is_array()
        var lengthOfArrayLike = require_length_of_array_like()
        var doesNotExceedSafeInteger = require_does_not_exceed_safe_integer()
        var bind = require_function_bind_context()
        var flattenIntoArray = function flattenIntoArray1(
            target,
            original,
            source,
            sourceLen,
            start,
            depth,
            mapper,
            thisArg
        ) {
            var targetIndex = start
            var sourceIndex = 0
            var mapFn = mapper ? bind(mapper, thisArg) : false
            var element, elementLen
            while (sourceIndex < sourceLen) {
                if (sourceIndex in source) {
                    element = mapFn
                        ? mapFn(source[sourceIndex], sourceIndex, original)
                        : source[sourceIndex]
                    if (depth > 0 && isArray(element)) {
                        elementLen = lengthOfArrayLike(element)
                        targetIndex =
                            flattenIntoArray(
                                target,
                                original,
                                element,
                                elementLen,
                                targetIndex,
                                depth - 1
                            ) - 1
                    } else {
                        doesNotExceedSafeInteger(targetIndex + 1)
                        target[targetIndex] = element
                    }
                    targetIndex++
                }
                sourceIndex++
            }
            return targetIndex
        }
        module2.exports = flattenIntoArray
    },
})
// node_modules/core-js/internals/array-species-constructor.js
var require_array_species_constructor = __commonJS({
    'node_modules/core-js/internals/array-species-constructor.js': function (exports, module2) {
        var isArray = require_is_array()
        var isConstructor = require_is_constructor()
        var isObject = require_is_object()
        var wellKnownSymbol = require_well_known_symbol()
        var SPECIES = wellKnownSymbol('species')
        var $Array = Array
        module2.exports = function (originalArray) {
            var C
            if (isArray(originalArray)) {
                C = originalArray.constructor
                if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = void 0
                else if (isObject(C)) {
                    C = C[SPECIES]
                    if (C === null) C = void 0
                }
            }
            return C === void 0 ? $Array : C
        }
    },
})
// node_modules/core-js/internals/array-species-create.js
var require_array_species_create = __commonJS({
    'node_modules/core-js/internals/array-species-create.js': function (exports, module2) {
        var arraySpeciesConstructor = require_array_species_constructor()
        module2.exports = function (originalArray, length) {
            return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length)
        }
    },
})
// node_modules/core-js/modules/es.array.flat-map.js
var require_es_array_flat_map = __commonJS({
    'node_modules/core-js/modules/es.array.flat-map.js': function () {
        'use strict'
        var $ = require_export()
        var flattenIntoArray = require_flatten_into_array()
        var aCallable = require_a_callable()
        var toObject = require_to_object()
        var lengthOfArrayLike = require_length_of_array_like()
        var arraySpeciesCreate = require_array_species_create()
        $(
            {
                target: 'Array',
                proto: true,
            },
            {
                flatMap: function flatMap(callbackfn) {
                    var O = toObject(this)
                    var sourceLen = lengthOfArrayLike(O)
                    var A
                    aCallable(callbackfn)
                    A = arraySpeciesCreate(O, 0)
                    A.length = flattenIntoArray(
                        A,
                        O,
                        O,
                        sourceLen,
                        0,
                        1,
                        callbackfn,
                        arguments.length > 1 ? arguments[1] : void 0
                    )
                    return A
                },
            }
        )
    },
})
// node_modules/core-js/modules/es.array.unscopables.flat-map.js
var require_es_array_unscopables_flat_map = __commonJS({
    'node_modules/core-js/modules/es.array.unscopables.flat-map.js': function () {
        var addToUnscopables = require_add_to_unscopables()
        addToUnscopables('flatMap')
    },
})
// node_modules/core-js/es/array/flat-map.js
var require_flat_map = __commonJS({
    'node_modules/core-js/es/array/flat-map.js': function (exports, module2) {
        require_es_array_flat_map()
        require_es_array_unscopables_flat_map()
        var entryUnbind = require_entry_unbind()
        module2.exports = entryUnbind('Array', 'flatMap')
    },
})
// node_modules/core-js/internals/string-repeat.js
var require_string_repeat = __commonJS({
    'node_modules/core-js/internals/string-repeat.js': function (exports, module2) {
        'use strict'
        var toIntegerOrInfinity = require_to_integer_or_infinity()
        var toString = require_to_string()
        var requireObjectCoercible = require_require_object_coercible()
        var $RangeError = RangeError
        module2.exports = function repeat(count) {
            var str = toString(requireObjectCoercible(this))
            var result = ''
            var n = toIntegerOrInfinity(count)
            if (n < 0 || n == Infinity) throw $RangeError('Wrong number of repetitions')
            for (; n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str
            return result
        }
    },
})
// node_modules/core-js/internals/string-pad.js
var require_string_pad = __commonJS({
    'node_modules/core-js/internals/string-pad.js': function (exports, module2) {
        var uncurryThis = require_function_uncurry_this()
        var toLength = require_to_length()
        var toString = require_to_string()
        var $repeat = require_string_repeat()
        var requireObjectCoercible = require_require_object_coercible()
        var repeat = uncurryThis($repeat)
        var stringSlice = uncurryThis(''.slice)
        var ceil = Math.ceil
        var createMethod = function createMethod(IS_END) {
            return function ($this, maxLength, fillString) {
                var S = toString(requireObjectCoercible($this))
                var intMaxLength = toLength(maxLength)
                var stringLength = S.length
                var fillStr = fillString === void 0 ? ' ' : toString(fillString)
                var fillLen, stringFiller
                if (intMaxLength <= stringLength || fillStr == '') return S
                fillLen = intMaxLength - stringLength
                stringFiller = repeat(fillStr, ceil(fillLen / fillStr.length))
                if (stringFiller.length > fillLen)
                    stringFiller = stringSlice(stringFiller, 0, fillLen)
                return IS_END ? S + stringFiller : stringFiller + S
            }
        }
        module2.exports = {
            // `String.prototype.padStart` method
            // https://tc39.es/ecma262/#sec-string.prototype.padstart
            start: createMethod(false),
            // `String.prototype.padEnd` method
            // https://tc39.es/ecma262/#sec-string.prototype.padend
            end: createMethod(true),
        }
    },
})
// node_modules/core-js/internals/string-pad-webkit-bug.js
var require_string_pad_webkit_bug = __commonJS({
    'node_modules/core-js/internals/string-pad-webkit-bug.js': function (exports, module2) {
        var userAgent = require_engine_user_agent()
        module2.exports = /Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(
            userAgent
        )
    },
})
// node_modules/core-js/modules/es.string.pad-start.js
var require_es_string_pad_start = __commonJS({
    'node_modules/core-js/modules/es.string.pad-start.js': function () {
        'use strict'
        var $ = require_export()
        var $padStart = require_string_pad().start
        var WEBKIT_BUG = require_string_pad_webkit_bug()
        $(
            {
                target: 'String',
                proto: true,
                forced: WEBKIT_BUG,
            },
            {
                padStart: function padStart(maxLength) {
                    return $padStart(this, maxLength, arguments.length > 1 ? arguments[1] : void 0)
                },
            }
        )
    },
})
// node_modules/core-js/es/string/pad-start.js
var require_pad_start = __commonJS({
    'node_modules/core-js/es/string/pad-start.js': function (exports, module2) {
        require_es_string_pad_start()
        var entryUnbind = require_entry_unbind()
        module2.exports = entryUnbind('String', 'padStart')
    },
})
// node_modules/core-js/internals/regexp-flags.js
var require_regexp_flags = __commonJS({
    'node_modules/core-js/internals/regexp-flags.js': function (exports, module2) {
        'use strict'
        var anObject = require_an_object()
        module2.exports = function () {
            var that = anObject(this)
            var result = ''
            if (that.hasIndices) result += 'd'
            if (that.global) result += 'g'
            if (that.ignoreCase) result += 'i'
            if (that.multiline) result += 'm'
            if (that.dotAll) result += 's'
            if (that.unicode) result += 'u'
            if (that.unicodeSets) result += 'v'
            if (that.sticky) result += 'y'
            return result
        }
    },
})
// node_modules/core-js/internals/regexp-sticky-helpers.js
var require_regexp_sticky_helpers = __commonJS({
    'node_modules/core-js/internals/regexp-sticky-helpers.js': function (exports, module2) {
        var fails = require_fails()
        var global2 = require_global()
        var $RegExp = global2.RegExp
        var UNSUPPORTED_Y = fails(function () {
            var re = $RegExp('a', 'y')
            re.lastIndex = 2
            return re.exec('abcd') != null
        })
        var MISSED_STICKY =
            UNSUPPORTED_Y ||
            fails(function () {
                return !$RegExp('a', 'y').sticky
            })
        var BROKEN_CARET =
            UNSUPPORTED_Y ||
            fails(function () {
                var re = $RegExp('^r', 'gy')
                re.lastIndex = 2
                return re.exec('str') != null
            })
        module2.exports = {
            BROKEN_CARET: BROKEN_CARET,
            MISSED_STICKY: MISSED_STICKY,
            UNSUPPORTED_Y: UNSUPPORTED_Y,
        }
    },
})
// node_modules/core-js/internals/regexp-unsupported-dot-all.js
var require_regexp_unsupported_dot_all = __commonJS({
    'node_modules/core-js/internals/regexp-unsupported-dot-all.js': function (exports, module2) {
        var fails = require_fails()
        var global2 = require_global()
        var $RegExp = global2.RegExp
        module2.exports = fails(function () {
            var re = $RegExp('.', 's')
            return !(re.dotAll && re.exec('\n') && re.flags === 's')
        })
    },
})
// node_modules/core-js/internals/regexp-unsupported-ncg.js
var require_regexp_unsupported_ncg = __commonJS({
    'node_modules/core-js/internals/regexp-unsupported-ncg.js': function (exports, module2) {
        var fails = require_fails()
        var global2 = require_global()
        var $RegExp = global2.RegExp
        module2.exports = fails(function () {
            var re = $RegExp('(?<a>b)', 'g')
            return re.exec('b').groups.a !== 'b' || 'b'.replace(re, '$<a>c') !== 'bc'
        })
    },
})
// node_modules/core-js/internals/regexp-exec.js
var require_regexp_exec = __commonJS({
    'node_modules/core-js/internals/regexp-exec.js': function (exports, module2) {
        'use strict'
        var call = require_function_call()
        var uncurryThis = require_function_uncurry_this()
        var toString = require_to_string()
        var regexpFlags = require_regexp_flags()
        var stickyHelpers = require_regexp_sticky_helpers()
        var shared = require_shared()
        var create = require_object_create()
        var getInternalState = require_internal_state().get
        var UNSUPPORTED_DOT_ALL = require_regexp_unsupported_dot_all()
        var UNSUPPORTED_NCG = require_regexp_unsupported_ncg()
        var nativeReplace = shared('native-string-replace', String.prototype.replace)
        var nativeExec = RegExp.prototype.exec
        var patchedExec = nativeExec
        var charAt = uncurryThis(''.charAt)
        var indexOf = uncurryThis(''.indexOf)
        var replace = uncurryThis(''.replace)
        var stringSlice = uncurryThis(''.slice)
        var UPDATES_LAST_INDEX_WRONG = (function () {
            var re1 = /a/
            var re2 = /b*/g
            call(nativeExec, re1, 'a')
            call(nativeExec, re2, 'a')
            return re1.lastIndex !== 0 || re2.lastIndex !== 0
        })()
        var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET
        var NPCG_INCLUDED = /()??/.exec('')[1] !== void 0
        var PATCH =
            UPDATES_LAST_INDEX_WRONG ||
            NPCG_INCLUDED ||
            UNSUPPORTED_Y ||
            UNSUPPORTED_DOT_ALL ||
            UNSUPPORTED_NCG
        if (PATCH) {
            patchedExec = function exec(string) {
                var re = this
                var state = getInternalState(re)
                var str = toString(string)
                var raw = state.raw
                var result, reCopy, lastIndex, match, i, object, group
                if (raw) {
                    raw.lastIndex = re.lastIndex
                    result = call(patchedExec, raw, str)
                    re.lastIndex = raw.lastIndex
                    return result
                }
                var groups = state.groups
                var sticky = UNSUPPORTED_Y && re.sticky
                var flags = call(regexpFlags, re)
                var source = re.source
                var charsAdded = 0
                var strCopy = str
                if (sticky) {
                    flags = replace(flags, 'y', '')
                    if (indexOf(flags, 'g') === -1) {
                        flags += 'g'
                    }
                    strCopy = stringSlice(str, re.lastIndex)
                    if (
                        re.lastIndex > 0 &&
                        (!re.multiline || (re.multiline && charAt(str, re.lastIndex - 1) !== '\n'))
                    ) {
                        source = '(?: ' + source + ')'
                        strCopy = ' ' + strCopy
                        charsAdded++
                    }
                    reCopy = new RegExp('^(?:' + source + ')', flags)
                }
                if (NPCG_INCLUDED) {
                    reCopy = new RegExp('^' + source + '$(?!\\s)', flags)
                }
                if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex
                match = call(nativeExec, sticky ? reCopy : re, strCopy)
                if (sticky) {
                    if (match) {
                        match.input = stringSlice(match.input, charsAdded)
                        match[0] = stringSlice(match[0], charsAdded)
                        match.index = re.lastIndex
                        re.lastIndex += match[0].length
                    } else re.lastIndex = 0
                } else if (UPDATES_LAST_INDEX_WRONG && match) {
                    re.lastIndex = re.global ? match.index + match[0].length : lastIndex
                }
                if (NPCG_INCLUDED && match && match.length > 1) {
                    call(nativeReplace, match[0], reCopy, function () {
                        for (i = 1; i < arguments.length - 2; i++) {
                            if (arguments[i] === void 0) match[i] = void 0
                        }
                    })
                }
                if (match && groups) {
                    match.groups = object = create(null)
                    for (i = 0; i < groups.length; i++) {
                        group = groups[i]
                        object[group[0]] = match[group[1]]
                    }
                }
                return match
            }
        }
        module2.exports = patchedExec
    },
})
// node_modules/core-js/modules/es.regexp.exec.js
var require_es_regexp_exec = __commonJS({
    'node_modules/core-js/modules/es.regexp.exec.js': function () {
        'use strict'
        var $ = require_export()
        var exec = require_regexp_exec()
        $(
            {
                target: 'RegExp',
                proto: true,
                forced: /./.exec !== exec,
            },
            {
                exec: exec,
            }
        )
    },
})
// node_modules/core-js/internals/function-apply.js
var require_function_apply = __commonJS({
    'node_modules/core-js/internals/function-apply.js': function (exports, module2) {
        var NATIVE_BIND = require_function_bind_native()
        var FunctionPrototype = Function.prototype
        var apply = FunctionPrototype.apply
        var call = FunctionPrototype.call
        module2.exports =
            (typeof Reflect == 'object' && Reflect.apply) ||
            (NATIVE_BIND
                ? call.bind(apply)
                : function () {
                      return call.apply(apply, arguments)
                  })
    },
})
// node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js
var require_fix_regexp_well_known_symbol_logic = __commonJS({
    'node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js': function (
        exports,
        module2
    ) {
        'use strict'
        require_es_regexp_exec()
        var uncurryThis = require_function_uncurry_this_clause()
        var defineBuiltIn = require_define_built_in()
        var regexpExec = require_regexp_exec()
        var fails = require_fails()
        var wellKnownSymbol = require_well_known_symbol()
        var createNonEnumerableProperty = require_create_non_enumerable_property()
        var SPECIES = wellKnownSymbol('species')
        var RegExpPrototype = RegExp.prototype
        module2.exports = function (KEY, exec, FORCED, SHAM) {
            var SYMBOL = wellKnownSymbol(KEY)
            var DELEGATES_TO_SYMBOL = !fails(function () {
                var O = {}
                O[SYMBOL] = function () {
                    return 7
                }
                return ''[KEY](O) != 7
            })
            var DELEGATES_TO_EXEC =
                DELEGATES_TO_SYMBOL &&
                !fails(function () {
                    var execCalled = false
                    var re = /a/
                    if (KEY === 'split') {
                        re = {}
                        re.constructor = {}
                        re.constructor[SPECIES] = function () {
                            return re
                        }
                        re.flags = ''
                        re[SYMBOL] = /./[SYMBOL]
                    }
                    re.exec = function () {
                        execCalled = true
                        return null
                    }
                    re[SYMBOL]('')
                    return !execCalled
                })
            if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || FORCED) {
                var uncurriedNativeRegExpMethod = uncurryThis(/./[SYMBOL])
                var methods = exec(
                    SYMBOL,
                    ''[KEY],
                    function (nativeMethod, regexp, str, arg2, forceStringMethod) {
                        var uncurriedNativeMethod = uncurryThis(nativeMethod)
                        var $exec = regexp.exec
                        if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
                            if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
                                return {
                                    done: true,
                                    value: uncurriedNativeRegExpMethod(regexp, str, arg2),
                                }
                            }
                            return {
                                done: true,
                                value: uncurriedNativeMethod(str, regexp, arg2),
                            }
                        }
                        return {
                            done: false,
                        }
                    }
                )
                defineBuiltIn(String.prototype, KEY, methods[0])
                defineBuiltIn(RegExpPrototype, SYMBOL, methods[1])
            }
            if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true)
        }
    },
})
// node_modules/core-js/internals/advance-string-index.js
var require_advance_string_index = __commonJS({
    'node_modules/core-js/internals/advance-string-index.js': function (exports, module2) {
        'use strict'
        var charAt = require_string_multibyte().charAt
        module2.exports = function (S, index, unicode) {
            return index + (unicode ? charAt(S, index).length : 1)
        }
    },
})
// node_modules/core-js/internals/get-substitution.js
var require_get_substitution = __commonJS({
    'node_modules/core-js/internals/get-substitution.js': function (exports, module2) {
        var uncurryThis = require_function_uncurry_this()
        var toObject = require_to_object()
        var floor = Math.floor
        var charAt = uncurryThis(''.charAt)
        var replace = uncurryThis(''.replace)
        var stringSlice = uncurryThis(''.slice)
        var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g
        var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g
        module2.exports = function (matched, str, position, captures, namedCaptures, replacement) {
            var tailPos = position + matched.length
            var m = captures.length
            var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED
            if (namedCaptures !== void 0) {
                namedCaptures = toObject(namedCaptures)
                symbols = SUBSTITUTION_SYMBOLS
            }
            return replace(replacement, symbols, function (match, ch) {
                var capture
                switch (charAt(ch, 0)) {
                    case '$':
                        return '$'
                    case '&':
                        return matched
                    case '`':
                        return stringSlice(str, 0, position)
                    case "'":
                        return stringSlice(str, tailPos)
                    case '<':
                        capture = namedCaptures[stringSlice(ch, 1, -1)]
                        break
                    default:
                        var n = +ch
                        if (n === 0) return match
                        if (n > m) {
                            var f = floor(n / 10)
                            if (f === 0) return match
                            if (f <= m)
                                return captures[f - 1] === void 0
                                    ? charAt(ch, 1)
                                    : captures[f - 1] + charAt(ch, 1)
                            return match
                        }
                        capture = captures[n - 1]
                }
                return capture === void 0 ? '' : capture
            })
        }
    },
})
// node_modules/core-js/internals/regexp-exec-abstract.js
var require_regexp_exec_abstract = __commonJS({
    'node_modules/core-js/internals/regexp-exec-abstract.js': function (exports, module2) {
        var call = require_function_call()
        var anObject = require_an_object()
        var isCallable = require_is_callable()
        var classof = require_classof_raw()
        var regexpExec = require_regexp_exec()
        var $TypeError = TypeError
        module2.exports = function (R, S) {
            var exec = R.exec
            if (isCallable(exec)) {
                var result = call(exec, R, S)
                if (result !== null) anObject(result)
                return result
            }
            if (classof(R) === 'RegExp') return call(regexpExec, R, S)
            throw $TypeError('RegExp#exec called on incompatible receiver')
        }
    },
})
// node_modules/core-js/modules/es.string.replace.js
var require_es_string_replace = __commonJS({
    'node_modules/core-js/modules/es.string.replace.js': function () {
        'use strict'
        var apply = require_function_apply()
        var call = require_function_call()
        var uncurryThis = require_function_uncurry_this()
        var fixRegExpWellKnownSymbolLogic = require_fix_regexp_well_known_symbol_logic()
        var fails = require_fails()
        var anObject = require_an_object()
        var isCallable = require_is_callable()
        var isNullOrUndefined = require_is_null_or_undefined()
        var toIntegerOrInfinity = require_to_integer_or_infinity()
        var toLength = require_to_length()
        var toString = require_to_string()
        var requireObjectCoercible = require_require_object_coercible()
        var advanceStringIndex = require_advance_string_index()
        var getMethod = require_get_method()
        var getSubstitution = require_get_substitution()
        var regExpExec = require_regexp_exec_abstract()
        var wellKnownSymbol = require_well_known_symbol()
        var REPLACE = wellKnownSymbol('replace')
        var max = Math.max
        var min = Math.min
        var concat = uncurryThis([].concat)
        var push = uncurryThis([].push)
        var stringIndexOf = uncurryThis(''.indexOf)
        var stringSlice = uncurryThis(''.slice)
        var maybeToString = function maybeToString(it) {
            return it === void 0 ? it : String(it)
        }
        var REPLACE_KEEPS_$0 = (function () {
            return 'a'.replace(/./, '$0') === '$0'
        })()
        var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
            if (/./[REPLACE]) {
                return /./[REPLACE]('a', '$0') === ''
            }
            return false
        })()
        var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
            var re = /./
            re.exec = function () {
                var result = []
                result.groups = {
                    a: '7',
                }
                return result
            }
            return ''.replace(re, '$<a>') !== '7'
        })
        fixRegExpWellKnownSymbolLogic(
            'replace',
            function (_, nativeReplace, maybeCallNative) {
                var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0'
                return [
                    // `String.prototype.replace` method
                    // https://tc39.es/ecma262/#sec-string.prototype.replace
                    function replace(searchValue, replaceValue) {
                        var O = requireObjectCoercible(this)
                        var replacer = isNullOrUndefined(searchValue)
                            ? void 0
                            : getMethod(searchValue, REPLACE)
                        return replacer
                            ? call(replacer, searchValue, O, replaceValue)
                            : call(nativeReplace, toString(O), searchValue, replaceValue)
                    },
                    // `RegExp.prototype[@@replace]` method
                    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
                    function (string, replaceValue) {
                        var rx = anObject(this)
                        var S = toString(string)
                        if (
                            typeof replaceValue == 'string' &&
                            stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
                            stringIndexOf(replaceValue, '$<') === -1
                        ) {
                            var res = maybeCallNative(nativeReplace, rx, S, replaceValue)
                            if (res.done) return res.value
                        }
                        var functionalReplace = isCallable(replaceValue)
                        if (!functionalReplace) replaceValue = toString(replaceValue)
                        var global2 = rx.global
                        if (global2) {
                            var fullUnicode = rx.unicode
                            rx.lastIndex = 0
                        }
                        var results = []
                        while (true) {
                            var result = regExpExec(rx, S)
                            if (result === null) break
                            push(results, result)
                            if (!global2) break
                            var matchStr = toString(result[0])
                            if (matchStr === '')
                                rx.lastIndex = advanceStringIndex(
                                    S,
                                    toLength(rx.lastIndex),
                                    fullUnicode
                                )
                        }
                        var accumulatedResult = ''
                        var nextSourcePosition = 0
                        for (var i = 0; i < results.length; i++) {
                            result = results[i]
                            var matched = toString(result[0])
                            var position = max(min(toIntegerOrInfinity(result.index), S.length), 0)
                            var captures = []
                            for (var j = 1; j < result.length; j++)
                                push(captures, maybeToString(result[j]))
                            var namedCaptures = result.groups
                            if (functionalReplace) {
                                var replacerArgs = concat([matched], captures, position, S)
                                if (namedCaptures !== void 0) push(replacerArgs, namedCaptures)
                                var replacement = toString(
                                    apply(replaceValue, void 0, replacerArgs)
                                )
                            } else {
                                replacement = getSubstitution(
                                    matched,
                                    S,
                                    position,
                                    captures,
                                    namedCaptures,
                                    replaceValue
                                )
                            }
                            if (position >= nextSourcePosition) {
                                accumulatedResult +=
                                    stringSlice(S, nextSourcePosition, position) + replacement
                                nextSourcePosition = position + matched.length
                            }
                        }
                        return accumulatedResult + stringSlice(S, nextSourcePosition)
                    },
                ]
            },
            !REPLACE_SUPPORTS_NAMED_GROUPS ||
                !REPLACE_KEEPS_$0 ||
                REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
        )
    },
})
// node_modules/core-js/internals/is-regexp.js
var require_is_regexp = __commonJS({
    'node_modules/core-js/internals/is-regexp.js': function (exports, module2) {
        var isObject = require_is_object()
        var classof = require_classof_raw()
        var wellKnownSymbol = require_well_known_symbol()
        var MATCH = wellKnownSymbol('match')
        module2.exports = function (it) {
            var isRegExp
            return (
                isObject(it) &&
                ((isRegExp = it[MATCH]) !== void 0 ? !!isRegExp : classof(it) == 'RegExp')
            )
        }
    },
})
// node_modules/core-js/internals/regexp-get-flags.js
var require_regexp_get_flags = __commonJS({
    'node_modules/core-js/internals/regexp-get-flags.js': function (exports, module2) {
        var call = require_function_call()
        var hasOwn = require_has_own_property()
        var isPrototypeOf = require_object_is_prototype_of()
        var regExpFlags = require_regexp_flags()
        var RegExpPrototype = RegExp.prototype
        module2.exports = function (R) {
            var flags = R.flags
            return flags === void 0 &&
                !('flags' in RegExpPrototype) &&
                !hasOwn(R, 'flags') &&
                isPrototypeOf(RegExpPrototype, R)
                ? call(regExpFlags, R)
                : flags
        }
    },
})
// node_modules/core-js/modules/es.string.replace-all.js
var require_es_string_replace_all = __commonJS({
    'node_modules/core-js/modules/es.string.replace-all.js': function () {
        'use strict'
        var $ = require_export()
        var call = require_function_call()
        var uncurryThis = require_function_uncurry_this()
        var requireObjectCoercible = require_require_object_coercible()
        var isCallable = require_is_callable()
        var isNullOrUndefined = require_is_null_or_undefined()
        var isRegExp = require_is_regexp()
        var toString = require_to_string()
        var getMethod = require_get_method()
        var getRegExpFlags = require_regexp_get_flags()
        var getSubstitution = require_get_substitution()
        var wellKnownSymbol = require_well_known_symbol()
        var IS_PURE = require_is_pure()
        var REPLACE = wellKnownSymbol('replace')
        var $TypeError = TypeError
        var indexOf = uncurryThis(''.indexOf)
        var replace = uncurryThis(''.replace)
        var stringSlice = uncurryThis(''.slice)
        var max = Math.max
        var stringIndexOf = function stringIndexOf(string, searchValue, fromIndex) {
            if (fromIndex > string.length) return -1
            if (searchValue === '') return fromIndex
            return indexOf(string, searchValue, fromIndex)
        }
        $(
            {
                target: 'String',
                proto: true,
            },
            {
                replaceAll: function replaceAll(searchValue, replaceValue) {
                    var O = requireObjectCoercible(this)
                    var IS_REG_EXP,
                        flags,
                        replacer,
                        string,
                        searchString,
                        functionalReplace,
                        searchLength,
                        advanceBy,
                        replacement
                    var position = 0
                    var endOfLastMatch = 0
                    var result = ''
                    if (!isNullOrUndefined(searchValue)) {
                        IS_REG_EXP = isRegExp(searchValue)
                        if (IS_REG_EXP) {
                            flags = toString(requireObjectCoercible(getRegExpFlags(searchValue)))
                            if (!~indexOf(flags, 'g'))
                                throw $TypeError('`.replaceAll` does not allow non-global regexes')
                        }
                        replacer = getMethod(searchValue, REPLACE)
                        if (replacer) {
                            return call(replacer, searchValue, O, replaceValue)
                        } else if (IS_PURE && IS_REG_EXP) {
                            return replace(toString(O), searchValue, replaceValue)
                        }
                    }
                    string = toString(O)
                    searchString = toString(searchValue)
                    functionalReplace = isCallable(replaceValue)
                    if (!functionalReplace) replaceValue = toString(replaceValue)
                    searchLength = searchString.length
                    advanceBy = max(1, searchLength)
                    position = stringIndexOf(string, searchString, 0)
                    while (position !== -1) {
                        replacement = functionalReplace
                            ? toString(replaceValue(searchString, position, string))
                            : getSubstitution(
                                  searchString,
                                  string,
                                  position,
                                  [],
                                  void 0,
                                  replaceValue
                              )
                        result += stringSlice(string, endOfLastMatch, position) + replacement
                        endOfLastMatch = position + searchLength
                        position = stringIndexOf(string, searchString, position + advanceBy)
                    }
                    if (endOfLastMatch < string.length) {
                        result += stringSlice(string, endOfLastMatch)
                    }
                    return result
                },
            }
        )
    },
})
// node_modules/core-js/es/string/replace-all.js
var require_replace_all = __commonJS({
    'node_modules/core-js/es/string/replace-all.js': function (exports, module2) {
        require_es_regexp_exec()
        require_es_string_replace()
        require_es_string_replace_all()
        var entryUnbind = require_entry_unbind()
        module2.exports = entryUnbind('String', 'replaceAll')
    },
})
// node_modules/core-js/internals/object-to-array.js
var require_object_to_array = __commonJS({
    'node_modules/core-js/internals/object-to-array.js': function (exports, module2) {
        var DESCRIPTORS = require_descriptors()
        var uncurryThis = require_function_uncurry_this()
        var objectKeys = require_object_keys()
        var toIndexedObject = require_to_indexed_object()
        var $propertyIsEnumerable = require_object_property_is_enumerable().f
        var propertyIsEnumerable = uncurryThis($propertyIsEnumerable)
        var push = uncurryThis([].push)
        var createMethod = function createMethod(TO_ENTRIES) {
            return function (it) {
                var O = toIndexedObject(it)
                var keys = objectKeys(O)
                var length = keys.length
                var i = 0
                var result = []
                var key
                while (length > i) {
                    key = keys[i++]
                    if (!DESCRIPTORS || propertyIsEnumerable(O, key)) {
                        push(result, TO_ENTRIES ? [key, O[key]] : O[key])
                    }
                }
                return result
            }
        }
        module2.exports = {
            // `Object.entries` method
            // https://tc39.es/ecma262/#sec-object.entries
            entries: createMethod(true),
            // `Object.values` method
            // https://tc39.es/ecma262/#sec-object.values
            values: createMethod(false),
        }
    },
})
// node_modules/core-js/modules/es.object.entries.js
var require_es_object_entries = __commonJS({
    'node_modules/core-js/modules/es.object.entries.js': function () {
        var $ = require_export()
        var $entries = require_object_to_array().entries
        $(
            {
                target: 'Object',
                stat: true,
            },
            {
                entries: function entries(O) {
                    return $entries(O)
                },
            }
        )
    },
})
// node_modules/core-js/es/object/entries.js
var require_entries = __commonJS({
    'node_modules/core-js/es/object/entries.js': function (exports, module2) {
        require_es_object_entries()
        var path = require_path()
        module2.exports = path.Object.entries
    },
})
// node_modules/core-js/internals/array-slice.js
var require_array_slice = __commonJS({
    'node_modules/core-js/internals/array-slice.js': function (exports, module2) {
        var uncurryThis = require_function_uncurry_this()
        module2.exports = uncurryThis([].slice)
    },
})
// node_modules/core-js/internals/function-bind.js
var require_function_bind = __commonJS({
    'node_modules/core-js/internals/function-bind.js': function (exports, module2) {
        'use strict'
        var uncurryThis = require_function_uncurry_this()
        var aCallable = require_a_callable()
        var isObject = require_is_object()
        var hasOwn = require_has_own_property()
        var arraySlice = require_array_slice()
        var NATIVE_BIND = require_function_bind_native()
        var $Function = Function
        var concat = uncurryThis([].concat)
        var join = uncurryThis([].join)
        var factories = {}
        var construct = function construct(C, argsLength, args) {
            if (!hasOwn(factories, argsLength)) {
                for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']'
                factories[argsLength] = $Function('C,a', 'return new C(' + join(list, ',') + ')')
            }
            return factories[argsLength](C, args)
        }
        module2.exports = NATIVE_BIND
            ? $Function.bind
            : function bind(that) {
                  var F = aCallable(this)
                  var Prototype = F.prototype
                  var partArgs = arraySlice(arguments, 1)
                  var boundFunction = function bound() {
                      var args = concat(partArgs, arraySlice(arguments))
                      return _instanceof(this, boundFunction)
                          ? construct(F, args.length, args)
                          : F.apply(that, args)
                  }
                  if (isObject(Prototype)) boundFunction.prototype = Prototype
                  return boundFunction
              }
    },
})
// node_modules/core-js/internals/a-constructor.js
var require_a_constructor = __commonJS({
    'node_modules/core-js/internals/a-constructor.js': function (exports, module2) {
        var isConstructor = require_is_constructor()
        var tryToString = require_try_to_string()
        var $TypeError = TypeError
        module2.exports = function (argument) {
            if (isConstructor(argument)) return argument
            throw $TypeError(tryToString(argument) + ' is not a constructor')
        }
    },
})
// node_modules/core-js/modules/es.reflect.construct.js
var require_es_reflect_construct = __commonJS({
    'node_modules/core-js/modules/es.reflect.construct.js': function () {
        var $ = require_export()
        var getBuiltIn = require_get_built_in()
        var apply = require_function_apply()
        var bind = require_function_bind()
        var aConstructor = require_a_constructor()
        var anObject = require_an_object()
        var isObject = require_is_object()
        var create = require_object_create()
        var fails = require_fails()
        var nativeConstruct = getBuiltIn('Reflect', 'construct')
        var ObjectPrototype = Object.prototype
        var push = [].push
        var NEW_TARGET_BUG = fails(function () {
            var F = function F() {}
            return !_instanceof(
                nativeConstruct(function () {}, [], F),
                F
            )
        })
        var ARGS_BUG = !fails(function () {
            nativeConstruct(function () {})
        })
        var FORCED = NEW_TARGET_BUG || ARGS_BUG
        $(
            {
                target: 'Reflect',
                stat: true,
                forced: FORCED,
                sham: FORCED,
            },
            {
                construct: function construct(Target, args) {
                    aConstructor(Target)
                    anObject(args)
                    var newTarget = arguments.length < 3 ? Target : aConstructor(arguments[2])
                    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget)
                    if (Target == newTarget) {
                        switch (args.length) {
                            case 0:
                                return new Target()
                            case 1:
                                return new Target(args[0])
                            case 2:
                                return new Target(args[0], args[1])
                            case 3:
                                return new Target(args[0], args[1], args[2])
                            case 4:
                                return new Target(args[0], args[1], args[2], args[3])
                        }
                        var $args = [null]
                        apply(push, $args, args)
                        return new (apply(bind, Target, $args))()
                    }
                    var proto = newTarget.prototype
                    var instance = create(isObject(proto) ? proto : ObjectPrototype)
                    var result = apply(Target, instance, args)
                    return isObject(result) ? result : instance
                },
            }
        )
    },
})
// node_modules/core-js/es/reflect/construct.js
var require_construct = __commonJS({
    'node_modules/core-js/es/reflect/construct.js': function (exports, module2) {
        require_es_reflect_construct()
        var path = require_path()
        module2.exports = path.Reflect.construct
    },
})
// node_modules/color-diff/lib/diff.js
var require_diff = __commonJS({
    'node_modules/color-diff/lib/diff.js': function (exports) {
        var ciede2000 = function ciede2000(c1, c2) {
            var L1 = c1.L
            var a1 = c1.a
            var b1 = c1.b
            var L2 = c2.L
            var a2 = c2.a
            var b2 = c2.b
            var kL = 1
            var kC = 1
            var kH = 1
            var C1 = sqrt(pow(a1, 2) + pow(b1, 2))
            var C2 = sqrt(pow(a2, 2) + pow(b2, 2))
            var a_C1_C2 = (C1 + C2) / 2
            var G = 0.5 * (1 - sqrt(pow(a_C1_C2, 7) / (pow(a_C1_C2, 7) + pow(25, 7))))
            var a1p = (1 + G) * a1
            var a2p = (1 + G) * a2
            var C1p = sqrt(pow(a1p, 2) + pow(b1, 2))
            var C2p = sqrt(pow(a2p, 2) + pow(b2, 2))
            var h1p = hp_f(b1, a1p)
            var h2p = hp_f(b2, a2p)
            var dLp = L2 - L1
            var dCp = C2p - C1p
            var dhp = dhp_f(C1, C2, h1p, h2p)
            var dHp = 2 * sqrt(C1p * C2p) * sin(radians(dhp) / 2)
            var a_L = (L1 + L2) / 2
            var a_Cp = (C1p + C2p) / 2
            var a_hp = a_hp_f(C1, C2, h1p, h2p)
            var T =
                1 -
                0.17 * cos(radians(a_hp - 30)) +
                0.24 * cos(radians(2 * a_hp)) +
                0.32 * cos(radians(3 * a_hp + 6)) -
                0.2 * cos(radians(4 * a_hp - 63))
            var d_ro = 30 * exp(-pow((a_hp - 275) / 25, 2))
            var RC = sqrt(pow(a_Cp, 7) / (pow(a_Cp, 7) + pow(25, 7)))
            var SL = 1 + (0.015 * pow(a_L - 50, 2)) / sqrt(20 + pow(a_L - 50, 2))
            var SC = 1 + 0.045 * a_Cp
            var SH = 1 + 0.015 * a_Cp * T
            var RT = -2 * RC * sin(radians(2 * d_ro))
            var dE = sqrt(
                pow(dLp / (SL * kL), 2) +
                    pow(dCp / (SC * kC), 2) +
                    pow(dHp / (SH * kH), 2) +
                    RT * (dCp / (SC * kC)) * (dHp / (SH * kH))
            )
            return dE
        }
        var degrees = function degrees(n) {
            return n * (180 / PI)
        }
        var radians = function radians(n) {
            return n * (PI / 180)
        }
        var hp_f = function hp_f(x, y) {
            if (x === 0 && y === 0) return 0
            else {
                var tmphp = degrees(atan2(x, y))
                if (tmphp >= 0) return tmphp
                else return tmphp + 360
            }
        }
        var dhp_f = function dhp_f(C1, C2, h1p, h2p) {
            if (C1 * C2 === 0) return 0
            else if (abs(h2p - h1p) <= 180) return h2p - h1p
            else if (h2p - h1p > 180) return h2p - h1p - 360
            else if (h2p - h1p < -180) return h2p - h1p + 360
            else throw new Error()
        }
        var a_hp_f = function a_hp_f(C1, C2, h1p, h2p) {
            if (C1 * C2 === 0) return h1p + h2p
            else if (abs(h1p - h2p) <= 180) return (h1p + h2p) / 2
            else if (abs(h1p - h2p) > 180 && h1p + h2p < 360) return (h1p + h2p + 360) / 2
            else if (abs(h1p - h2p) > 180 && h1p + h2p >= 360) return (h1p + h2p - 360) / 2
            else throw new Error()
        }
        exports.ciede2000 = ciede2000
        var sqrt = Math.sqrt
        var pow = Math.pow
        var cos = Math.cos
        var atan2 = Math.atan2
        var sin = Math.sin
        var abs = Math.abs
        var exp = Math.exp
        var PI = Math.PI
    },
})
// node_modules/color-diff/lib/convert.js
var require_convert = __commonJS({
    'node_modules/color-diff/lib/convert.js': function (exports) {
        var rgba_to_lab = function rgba_to_lab(c, bc) {
            c = normalize_rgb(c)
            var bc =
                typeof bc !== 'undefined'
                    ? normalize_rgb(bc)
                    : {
                          R: 255,
                          G: 255,
                          B: 255,
                      }
            var new_c = {
                R: bc.R + (c.R - bc.R) * c.A,
                G: bc.G + (c.G - bc.G) * c.A,
                B: bc.B + (c.B - bc.B) * c.A,
            }
            return rgb_to_lab(new_c)
        }
        var rgb_to_lab = function rgb_to_lab(c) {
            return xyz_to_lab(rgb_to_xyz(c))
        }
        var rgb_to_xyz = function rgb_to_xyz(c) {
            c = normalize_rgb(c)
            var R = c.R / 255
            var G = c.G / 255
            var B = c.B / 255
            if (R > 0.04045) R = pow((R + 0.055) / 1.055, 2.4)
            else R = R / 12.92
            if (G > 0.04045) G = pow((G + 0.055) / 1.055, 2.4)
            else G = G / 12.92
            if (B > 0.04045) B = pow((B + 0.055) / 1.055, 2.4)
            else B = B / 12.92
            R *= 100
            G *= 100
            B *= 100
            var X = R * 0.4124 + G * 0.3576 + B * 0.1805
            var Y = R * 0.2126 + G * 0.7152 + B * 0.0722
            var Z = R * 0.0193 + G * 0.1192 + B * 0.9505
            return {
                X: X,
                Y: Y,
                Z: Z,
            }
        }
        var xyz_to_lab = function xyz_to_lab(c) {
            var ref_Y = 100
            var ref_Z = 108.883
            var ref_X = 95.047
            var Y = c.Y / ref_Y
            var Z = c.Z / ref_Z
            var X = c.X / ref_X
            if (X > 8856e-6) X = pow(X, 1 / 3)
            else X = 7.787 * X + 16 / 116
            if (Y > 8856e-6) Y = pow(Y, 1 / 3)
            else Y = 7.787 * Y + 16 / 116
            if (Z > 8856e-6) Z = pow(Z, 1 / 3)
            else Z = 7.787 * Z + 16 / 116
            var L = 116 * Y - 16
            var a = 500 * (X - Y)
            var b = 200 * (Y - Z)
            return {
                L: L,
                a: a,
                b: b,
            }
        }
        var normalize_rgb = function normalize_rgb(c) {
            var new_c = {
                R: c.R || c.r || 0,
                G: c.G || c.g || 0,
                B: c.B || c.b || 0,
            }
            if (typeof c.a !== 'undefined' || typeof c.A !== 'undefined') {
                new_c.A = c.A || c.a || 0
            }
            return new_c
        }
        exports.rgb_to_lab = rgb_to_lab
        exports.rgba_to_lab = rgba_to_lab
        exports.normalize_rgb = normalize_rgb
        var pow = Math.pow
    },
})
// node_modules/color-diff/lib/palette.js
var require_palette = __commonJS({
    'node_modules/color-diff/lib/palette.js': function (exports) {
        var palette_map_key = function palette_map_key(c) {
            c = color_convert.normalize_rgb(c)
            var s = 'R' + c.R + 'B' + c.B + 'G' + c.G
            if ('A' in c) {
                s = s + 'A' + c.A
            }
            return s
        }
        var lab_palette_map_key = function lab_palette_map_key(c) {
            return 'L' + c.L + 'a' + c.a + 'b' + c.b
        }
        var map_palette = function map_palette(a, b, type, bc) {
            var c = {}
            bc =
                typeof bc !== 'undefined'
                    ? bc
                    : {
                          R: 255,
                          G: 255,
                          B: 255,
                      }
            type = type || 'closest'
            for (var idx1 = 0; idx1 < a.length; idx1 += 1) {
                var color1 = a[idx1]
                var best_color = void 0
                var best_color_diff = void 0
                for (var idx2 = 0; idx2 < b.length; idx2 += 1) {
                    var color2 = b[idx2]
                    var current_color_diff = diff(color1, color2, bc)
                    if (
                        best_color == void 0 ||
                        (type === 'closest' && current_color_diff < best_color_diff)
                    ) {
                        best_color = color2
                        best_color_diff = current_color_diff
                        continue
                    }
                    if (type === 'furthest' && current_color_diff > best_color_diff) {
                        best_color = color2
                        best_color_diff = current_color_diff
                        continue
                    }
                }
                c[palette_map_key(color1)] = best_color
            }
            return c
        }
        var match_palette_lab = function match_palette_lab(target_color, palette, find_furthest) {
            var color2, current_color_diff
            var best_color = palette[0]
            var best_color_diff = ciede2000(target_color, best_color)
            for (var idx2 = 1, l = palette.length; idx2 < l; idx2 += 1) {
                color2 = palette[idx2]
                current_color_diff = ciede2000(target_color, color2)
                if (
                    (!find_furthest && current_color_diff < best_color_diff) ||
                    (find_furthest && current_color_diff > best_color_diff)
                ) {
                    best_color = color2
                    best_color_diff = current_color_diff
                }
            }
            return best_color
        }
        var map_palette_lab = function map_palette_lab(a, b, type) {
            var c = {}
            var find_furthest = type === 'furthest'
            for (var idx1 = 0; idx1 < a.length; idx1 += 1) {
                var color1 = a[idx1]
                c[lab_palette_map_key(color1)] = match_palette_lab(color1, b, find_furthest)
            }
            return c
        }
        var diff = function diff(c1, c2, bc) {
            var conv_c1 = color_convert.rgb_to_lab
            var conv_c2 = color_convert.rgb_to_lab
            var rgba_conv = function rgba_conv(x) {
                return color_convert.rgba_to_lab(x, bc)
            }
            if ('A' in c1) {
                conv_c1 = rgba_conv
            }
            if ('A' in c2) {
                conv_c2 = rgba_conv
            }
            c1 = conv_c1(c1)
            c2 = conv_c2(c2)
            return ciede2000(c1, c2)
        }
        exports.map_palette = map_palette
        exports.map_palette_lab = map_palette_lab
        exports.match_palette_lab = match_palette_lab
        exports.palette_map_key = palette_map_key
        exports.lab_palette_map_key = lab_palette_map_key
        var ciede2000 = require_diff().ciede2000
        var color_convert = require_convert()
    },
})
// node_modules/color-diff/lib/index.js
var require_lib = __commonJS({
    'node_modules/color-diff/lib/index.js': function (exports, module2) {
        'use strict'
        var diff = require_diff()
        var convert = require_convert()
        var palette = require_palette()
        var color = (module2.exports = {})
        color.diff = diff.ciede2000
        color.rgb_to_lab = convert.rgb_to_lab
        color.rgba_to_lab = convert.rgba_to_lab
        color.map_palette = palette.map_palette
        color.palette_map_key = palette.palette_map_key
        color.map_palette_lab = palette.map_palette_lab
        color.lab_palette_map_key = palette.lab_palette_map_key
        color.match_palette_lab = palette.match_palette_lab
        color.closest = function (target, relative, bc) {
            var key = color.palette_map_key(target)
            bc =
                typeof bc !== 'undefined'
                    ? bc
                    : {
                          R: 255,
                          G: 255,
                          B: 255,
                      }
            var result = color.map_palette([target], relative, 'closest', bc)
            return result[key]
        }
        color.furthest = function (target, relative, bc) {
            var key = color.palette_map_key(target)
            bc =
                typeof bc !== 'undefined'
                    ? bc
                    : {
                          R: 255,
                          G: 255,
                          B: 255,
                      }
            var result = color.map_palette([target], relative, 'furthest', bc)
            return result[key]
        }
        color.closest_lab = function (target, relative) {
            return color.match_palette_lab(target, relative, false)
        }
        color.furthest_lab = function (target, relative) {
            return color.match_palette_lab(target, relative, true)
        }
    },
})
// node_modules/abbreviate/lib/index.js
var require_lib2 = __commonJS({
    'node_modules/abbreviate/lib/index.js': function (exports, module2) {
        ;(function () {
            var diblends, digraphs, regexes, triblends, trigraphs
            regexes = [/[\s\-_,]/, /[\W]/, /[aieouäöü]/, /[a-z]/, /[AIEOUÄÖÜ]/, /[A-Z0-9]/]
            digraphs = ['ch', 'gh', 'gn', 'kn', 'ph', 'qu', 'sh', 'th', 'wh', 'wr']
            diblends = [
                'bl',
                'br',
                'cl',
                'cr',
                'fl',
                'fr',
                'gl',
                'gr',
                'pl',
                'pr',
                'sc',
                'sl',
                'sm',
                'sn',
                'sp',
                'st',
            ]
            trigraphs = ['chr', 'sch']
            triblends = ['shr', 'spl', 'spr', 'squ', 'str', 'thr']
            module2.exports = function (str, arg) {
                var chars,
                    di,
                    found,
                    i,
                    j,
                    k,
                    keepSeparators,
                    l,
                    len,
                    len1,
                    length,
                    newWord,
                    order,
                    orderedCount,
                    pos,
                    ref,
                    ref1,
                    sep,
                    should,
                    strict,
                    tri,
                    unfinished,
                    word,
                    words
                ;(length = arg.length), (keepSeparators = arg.keepSeparators), (strict = arg.strict)
                if (length == null) {
                    length = 3
                }
                if (keepSeparators == null) {
                    keepSeparators = false
                }
                if (strict == null) {
                    strict = true
                }
                if (length <= 0 && strict) {
                    return ''
                }
                if (length >= str.length) {
                    return str
                }
                str = str.replace(/^[\s\-_,]+/, '').replace(/[\s\-_,]+$/, '')
                if (length >= str.length) {
                    return str
                }
                chars = str.split('')
                pos = 1
                order = [pos]
                orderedCount = 1
                word = 1
                words = [1]
                sep = 0
                newWord = false
                found
                i = 1
                while (i < chars.length) {
                    order.push(0)
                    if (chars[i].search(regexes[0]) > -1) {
                        words.push(0)
                        newWord = true
                        sep++
                    } else {
                        if (newWord) {
                            newWord = false
                            word++
                            pos++
                            order[i] = pos
                            orderedCount++
                            if (i < chars.length - 2) {
                                ref = trigraphs.concat(triblends)
                                for (k = 0, len = ref.length; k < len; k++) {
                                    tri = ref[k]
                                    if (
                                        tri[0] === chars[i].toLowerCase() &&
                                        tri[1] === chars[i + 1].toLowerCase() &&
                                        tri[2] === chars[i + 2].toLowerCase()
                                    ) {
                                        found = true
                                        break
                                    }
                                }
                            }
                            if (found) {
                                found = false
                                pos++
                                order.push(pos)
                                orderedCount++
                                pos++
                                order.push(pos)
                                orderedCount++
                                words.push(word)
                                words.push(word)
                                i++
                                i++
                            } else if (i < chars.length - 1) {
                                ref1 = digraphs.concat(diblends)
                                for (l = 0, len1 = ref1.length; l < len1; l++) {
                                    di = ref1[l]
                                    if (
                                        di[0] === chars[i].toLowerCase() &&
                                        di[1] === chars[i + 1].toLowerCase()
                                    ) {
                                        found = true
                                        break
                                    }
                                }
                                if (found) {
                                    found = false
                                    pos++
                                    order.push(pos)
                                    orderedCount++
                                    words.push(word)
                                    i++
                                }
                            }
                        }
                        words.push(word)
                    }
                    i++
                }
                if (!strict) {
                    should = word
                    if (keepSeparators) {
                        should += sep
                    }
                    if (length < should) {
                        length = should
                    }
                }
                if (keepSeparators) {
                    i = 0
                    while (i < chars.length) {
                        if (words[i] === 0) {
                            order[i] = pos
                            orderedCount++
                            pos++
                        }
                        i++
                    }
                    pos = chars.length
                } else {
                    pos = chars.length
                    i = chars.length
                    while (i > 0) {
                        i--
                        if (words[i] === 0) {
                            order[i] = pos
                            orderedCount++
                            pos--
                        }
                    }
                }
                j = 1
                unfinished = true
                while (j < regexes.length && unfinished) {
                    i = chars.length
                    while (i > 0) {
                        i--
                        if (!(order[i] > 0)) {
                            if (chars[i].search(regexes[j]) > -1) {
                                order[i] = pos
                                orderedCount++
                                pos--
                                if (orderedCount === chars.length) {
                                    unfinished = false
                                    break
                                }
                            }
                        }
                    }
                    j++
                }
                chars = chars.map(function (val, i2) {
                    if (order[i2] <= length) {
                        return val
                    } else {
                        return ''
                    }
                })
                return chars.join('')
            }
        }).call(exports)
    },
})
// src/index.ts
var import_iterator = __toESM(require_iterator())
var import_from = __toESM(require_from())
var import_reverse = __toESM(require_reverse())
var import_flat_map = __toESM(require_flat_map())
var import_pad_start = __toESM(require_pad_start())
var import_replace_all = __toESM(require_replace_all())
var import_entries = __toESM(require_entries())
var import_construct = __toESM(require_construct())
var import_midiremote_api_v12 = __toESM(require('midiremote_api_v1'))
// src/decorators/page.ts
function decoratePage(page2, surface2) {
    var enhancedPage = page2
    enhancedPage.mCustom.makeSettableHostValueVariable = function (name) {
        var hostValue = page2.mCustom.makeHostValueVariable(name)
        var surfaceValue = surface2.makeCustomValueVariable(''.concat(name, 'SurfaceValue'))
        page2.makeValueBinding(surfaceValue, hostValue)
        hostValue.setProcessValue = function (activeDevice, value) {
            return surfaceValue.setProcessValue(activeDevice, value)
        }
        return hostValue
    }
    return enhancedPage
}
// src/util.ts
function createElements(count, factoryFunction) {
    var elements = []
    for (var index = 0; index < count; index++) {
        elements.push(factoryFunction(index))
    }
    return elements
}
function makeCallbackCollection(object, callbackName) {
    var callbacks = []
    var callbackCollection = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }
        var _iteratorNormalCompletion = true,
            _didIteratorError = false,
            _iteratorError = undefined
        try {
            for (
                var _iterator = callbacks[Symbol.iterator](), _step;
                !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
                _iteratorNormalCompletion = true
            ) {
                var callback = _step.value
                callback.apply(void 0, _toConsumableArray(args))
            }
        } catch (err) {
            _didIteratorError = true
            _iteratorError = err
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return()
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError
                }
            }
        }
    }
    callbackCollection.addCallback = function (callback) {
        callbacks.push(callback)
    }
    object[callbackName] = callbackCollection
    return callbackCollection
}
var isTimerTicking = false
var timeouts = {}
function makeTimerUtils(page2, surface2) {
    var timerPage = page2.makeSubPageArea('Timer').makeSubPage('Timer Page')
    var triggerVariable = surface2.makeCustomValueVariable('timerTrigger')
    page2.makeActionBinding(triggerVariable, timerPage.mAction.mActivate).makeRepeating(1, 1)
    var setTimeout = function (context, timeoutId, callback, timeout) {
        if (!isTimerTicking) {
            triggerVariable.setProcessValue(context, 1)
        }
        timeouts[timeoutId] = {
            scheduledExecutionTime: performance.now() + timeout * 1e3,
            callback: callback,
        }
    }
    timerPage.mOnActivate = function (context) {
        var _iteratorNormalCompletion = true,
            _didIteratorError = false,
            _iteratorError = undefined
        try {
            for (
                var _iterator = Object.entries(timeouts)[Symbol.iterator](), _step;
                !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
                _iteratorNormalCompletion = true
            ) {
                var _step_value = _slicedToArray(_step.value, 2),
                    timeoutId = _step_value[0],
                    _step_value_ = _step_value[1],
                    scheduledExecutionTime = _step_value_.scheduledExecutionTime,
                    callback = _step_value_.callback
                if (performance.now() >= scheduledExecutionTime) {
                    callback(context)
                    delete timeouts[timeoutId]
                }
            }
        } catch (err) {
            _didIteratorError = true
            _iteratorError = err
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return()
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError
                }
            }
        }
        if (Object.keys(timeouts).length === 0) {
            isTimerTicking = false
            triggerVariable.setProcessValue(context, 0)
        }
    }
    return {
        setTimeout: setTimeout,
    }
}
var _ContextStateVariable = /*#__PURE__*/ (function () {
    function _ContextStateVariable1(initialValue) {
        var name =
            arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : 'contextStateVariable'.concat(_ContextStateVariable.nextVariableId++)
        _classCallCheck(this, _ContextStateVariable1)
        this.initialValue = initialValue
        this.name = name
    }
    _createClass(_ContextStateVariable1, [
        {
            key: 'set',
            value: function set(context, value) {
                context.setState(this.name, JSON.stringify(value))
            },
        },
        {
            key: 'get',
            value: function get(context) {
                var state = context.getState(this.name)
                return state === '' ? this.initialValue : JSON.parse(state)
            },
        },
    ])
    return _ContextStateVariable1
})()
var ContextStateVariable = _ContextStateVariable
ContextStateVariable.nextVariableId = 0
var _GlobalBooleanVariable = /*#__PURE__*/ (function () {
    function _GlobalBooleanVariable1(surface2) {
        var _this = this
        _classCallCheck(this, _GlobalBooleanVariable1)
        this.onChangeCallbacks = []
        this.surfaceVariable = surface2.makeCustomValueVariable(
            'globalBooleanVariable'.concat(_GlobalBooleanVariable.nextVariableId++)
        )
        this.surfaceVariable.mOnProcessValueChange = function (context, value) {
            _this.invokeCallbacks(context, Boolean(value))
        }
    }
    _createClass(_GlobalBooleanVariable1, [
        {
            key: 'invokeCallbacks',
            value: function invokeCallbacks(context, value) {
                var _iteratorNormalCompletion = true,
                    _didIteratorError = false,
                    _iteratorError = undefined
                try {
                    for (
                        var _iterator = this.onChangeCallbacks[Symbol.iterator](), _step;
                        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
                        _iteratorNormalCompletion = true
                    ) {
                        var callback = _step.value
                        callback(context, value)
                    }
                } catch (err) {
                    _didIteratorError = true
                    _iteratorError = err
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return()
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError
                        }
                    }
                }
            },
        },
        {
            key: 'addOnChangeCallback',
            value: function addOnChangeCallback(callback) {
                this.onChangeCallbacks.push(callback)
            },
        },
        {
            key: 'set',
            value: function set(context, value) {
                var runCallbacksInstantly =
                    arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false
                this.surfaceVariable.setProcessValue(context, +value)
                if (runCallbacksInstantly) {
                    this.invokeCallbacks(context, value)
                }
            },
        },
        {
            key: 'get',
            value: function get(context) {
                return Boolean(this.surfaceVariable.getProcessValue(context))
            },
        },
        {
            key: 'toggle',
            value: function toggle(context) {
                var runCallbacksInstantly =
                    arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false
                this.set(context, !this.get(context), runCallbacksInstantly)
            },
        },
    ])
    return _GlobalBooleanVariable1
})()
var GlobalBooleanVariable = _GlobalBooleanVariable
GlobalBooleanVariable.nextVariableId = 0
// src/decorators/button.ts
function enhanceButtonToLedButton(originalButton, surface2) {
    var button = originalButton
    button.onSurfaceValueChange = makeCallbackCollection(
        button.mSurfaceValue,
        'mOnProcessValueChange'
    )
    button.mLedValue = surface2.makeCustomValueVariable('LedButtonLed')
    var shadowValue = surface2.makeCustomValueVariable('LedButtonProxy')
    button.bindToNote = function (ports, note) {
        var isChannelButton = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false
        var currentSurfaceValue = new ContextStateVariable(0)
        button.mSurfaceValue.mMidiBinding.setInputPort(ports.input).bindToNote(0, note)
        button.onSurfaceValueChange.addCallback(function (context, newValue) {
            currentSurfaceValue.set(context, newValue)
            ports.output.sendNoteOn(context, note, newValue || currentLedValue.get(context))
        })
        var currentLedValue = new ContextStateVariable(0)
        button.mLedValue.mOnProcessValueChange = function (context, newValue) {
            currentLedValue.set(context, newValue)
            ports.output.sendNoteOn(context, note, newValue)
        }
        shadowValue.mMidiBinding.setInputPort(ports.input).bindToNote(0, note)
        shadowValue.mOnProcessValueChange = function (context, newValue) {
            ports.output.sendNoteOn(
                context,
                note,
                newValue || currentSurfaceValue.get(context) || currentLedValue.get(context)
            )
        }
        if (isChannelButton) {
            button.mSurfaceValue.mOnTitleChange = function (context, title) {
                if (title === '') {
                    ports.output.sendNoteOn(context, note, 0)
                }
            }
        }
    }
    return button
}
// src/decorators/surface.ts
function decorateSurface(surface2) {
    var _surface2
    var decoratedSurface = surface2
    decoratedSurface.makeLedButton = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }
        return enhanceButtonToLedButton(
            (_surface2 = surface2).makeButton.apply(_surface2, _toConsumableArray(args)),
            surface2
        )
    }
    decoratedSurface.makeHiddenLedButton = function () {
        return enhanceButtonToLedButton(
            {
                mSurfaceValue: surface2.makeCustomValueVariable('HiddenLedButton'),
            },
            surface2
        )
    }
    decoratedSurface.makeHiddenLedButtons = function (numberOfButtons) {
        return createElements(numberOfButtons, function () {
            return decoratedSurface.makeHiddenLedButton()
        })
    }
    decoratedSurface.makeLedPushEncoder = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }
        var _surface2
        var encoder = (_surface2 = surface2).makePushEncoder.apply(
            _surface2,
            _toConsumableArray(args)
        )
        encoder.mDisplayModeValue = surface2.makeCustomValueVariable('encoderDisplayMode')
        return encoder
    }
    decoratedSurface.makeTouchSensitiveFader = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }
        var _surface2
        var fader = (_surface2 = surface2).makeFader.apply(_surface2, _toConsumableArray(args))
        fader.mTouchedValue = surface2.makeCustomValueVariable('faderTouched')
        fader.mTouchedValueInternal = surface2.makeCustomValueVariable('faderTouchedInternal')
        return fader
    }
    decoratedSurface.makeJogWheel = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }
        var _surface2
        var jogWheel = (_surface2 = surface2).makeKnob.apply(_surface2, _toConsumableArray(args))
        var mProxyValue = surface2.makeCustomValueVariable('jogWheelProxy')
        jogWheel.mKnobModeEnabledValue = surface2.makeCustomValueVariable('jogWheelKnobModeEnabled')
        jogWheel.mJogRightValue = surface2.makeCustomValueVariable('jogWheelJogRight')
        jogWheel.mJogLeftValue = surface2.makeCustomValueVariable('jogWheelJogLeft')
        jogWheel.bindToControlChange = function (input, controlChangeNumber) {
            mProxyValue.mMidiBinding
                .setInputPort(input)
                .bindToControlChange(0, controlChangeNumber)
                .setTypeRelativeSignedBit()
            mProxyValue.mOnProcessValueChange = function (context, value, difference) {
                var jumpOffset = 0.4
                if (value < 0.5 - jumpOffset) {
                    mProxyValue.setProcessValue(context, value + jumpOffset)
                } else if (value > 0.5 + jumpOffset) {
                    mProxyValue.setProcessValue(context, value - jumpOffset)
                }
                if (Math.abs(difference) >= jumpOffset - 0.1) {
                    if (difference > 0) {
                        difference -= jumpOffset
                    } else {
                        difference += jumpOffset
                    }
                }
                if (jogWheel.mKnobModeEnabledValue.getProcessValue(context)) {
                    jogWheel.mSurfaceValue.setProcessValue(
                        context,
                        Math.max(
                            0,
                            Math.min(
                                1,
                                jogWheel.mSurfaceValue.getProcessValue(context) + difference
                            )
                        )
                    )
                } else {
                    if (difference !== 0) {
                        if (difference < 0) {
                            jogWheel.mJogLeftValue.setProcessValue(context, 1)
                        } else {
                            jogWheel.mJogRightValue.setProcessValue(context, 1)
                        }
                    }
                }
            }
        }
        return jogWheel
    }
    decoratedSurface.makeDecoratedLamp = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }
        var _decoratedSurface
        var lamp = (_decoratedSurface = decoratedSurface).makeLamp.apply(
            _decoratedSurface,
            _toConsumableArray(args)
        )
        lamp.bindToNote = function (output, note) {
            lamp.mSurfaceValue.mOnProcessValueChange = function (context, value) {
                output.sendNoteOn(context, note, value)
            }
        }
        return lamp
    }
    return decoratedSurface
}
// src/devices/icon_qcon-pro-g2.ts
var channelWidth = 3.75
var channelElementsWidth = 4 + 8 * channelWidth
var surfaceHeight = 39.5
var buttonRowHeight = 2.35
var buttonDistance = 2.55
function makeSquareButton(surface2, x, y) {
    return surface2.makeLedButton(x, y, 1.8, 1.5)
}
function makeChannelElements(surface2, x) {
    return createElements(8, function (index) {
        var currentChannelXPosition = x + index * channelWidth
        var encoder = surface2.makeLedPushEncoder(3.1 + currentChannelXPosition, 8.8, 3.6, 3.6)
        return {
            index: index,
            encoder: encoder,
            scribbleStrip: {
                encoderLabel: surface2
                    .makeLabelField(3.1 + currentChannelXPosition, 3, 3.75, 2)
                    .relateTo(encoder),
                trackTitle: surface2.makeCustomValueVariable('scribbleStripTrackTitle'),
            },
            vuMeter: surface2.makeCustomValueVariable('vuMeter'),
            buttons: {
                record: makeSquareButton(surface2, 4 + currentChannelXPosition, 13),
                solo: makeSquareButton(surface2, 4 + currentChannelXPosition, 13 + buttonRowHeight),
                mute: makeSquareButton(
                    surface2,
                    4 + currentChannelXPosition,
                    13 + buttonRowHeight * 2
                ),
                select: makeSquareButton(
                    surface2,
                    4 + currentChannelXPosition,
                    13 + buttonRowHeight * 3
                ),
            },
            fader: surface2.makeTouchSensitiveFader(4 + currentChannelXPosition, 24.4, 1.8, 12),
        }
    })
}
var deviceConfig = {
    createExtenderSurface: function createExtenderSurface(surface2, x) {
        var surfaceWidth = channelElementsWidth + 3.1
        surface2.makeBlindPanel(x, 0, surfaceWidth, surfaceHeight)
        surface2.makeBlindPanel(x + 1.5, 1.5, surfaceWidth - 3, 5)
        return {
            width: surfaceWidth,
            channelElements: makeChannelElements(surface2, x),
        }
    },
    createMainSurface: function createMainSurface(surface2, x) {
        var surfaceWidth = channelElementsWidth + 20
        surface2.makeBlindPanel(x, 0, surfaceWidth, surfaceHeight)
        surface2.makeBlindPanel(x + 1.5, 1.5, channelElementsWidth + 17.5, 5)
        var channelElements = makeChannelElements(surface2, x)
        x += channelElementsWidth
        surface2.makeBlindPanel(x + 6, 3, 12, 2)
        var upperControlButtons = createElements(5, function (index) {
            return makeSquareButton(
                surface2,
                x + 3.5 + (index + 1) * buttonDistance,
                13 - buttonRowHeight * 2
            )
        })
        var lowerControlButtons = createElements(12, function (index) {
            return makeSquareButton(
                surface2,
                x + 3.5 + (index % 6) * buttonDistance,
                23.5 + buttonRowHeight * Math.floor(index / 6)
            )
        })
        var getLowerControlButtons = function (indices) {
            return indices.map(function (index) {
                return lowerControlButtons[index]
            })
        }
        return {
            width: surfaceWidth,
            channelElements: channelElements,
            controlSectionElements: {
                mainFader: surface2.makeTouchSensitiveFader(x, 24.4, 1.8, 12),
                jogWheel: surface2.makeJogWheel(x + 12.75, 30, 6, 6),
                buttons: {
                    display: upperControlButtons[0],
                    timeMode: upperControlButtons[1],
                    edit: surface2.makeLedButton(
                        x + 3.5 + 5 * buttonDistance,
                        13 + buttonRowHeight * 1.5 - 0.5,
                        1.8,
                        0.75
                    ),
                    flip: makeSquareButton(surface2, x, 13 - buttonRowHeight),
                    scrub: makeSquareButton(surface2, x + 11.2, 28.75),
                    encoderAssign: createElements(6, function (index) {
                        return makeSquareButton(
                            surface2,
                            x + 3.5 + index * buttonDistance,
                            13 + buttonRowHeight * 2
                        )
                    }),
                    number: surface2.makeHiddenLedButtons(8),
                    function: createElements(8, function (index) {
                        return makeSquareButton(
                            surface2,
                            x + 3.5 + ((index % 4) + 2) * buttonDistance,
                            13 + buttonRowHeight * (Math.floor(index / 4) - 0.5)
                        )
                    }),
                    modify: _toConsumableArray(upperControlButtons.slice(2, 5)).concat([
                        surface2.makeHiddenLedButton(),
                    ]),
                    automation: createElements(6, function (index) {
                        return makeSquareButton(
                            surface2,
                            x + 3.5 + index * buttonDistance,
                            13 + buttonRowHeight * 3
                        )
                    }),
                    utility: _toConsumableArray(lowerControlButtons.slice(0, 2)).concat([
                        lowerControlButtons[8],
                        lowerControlButtons[2],
                    ]),
                    transport: _toConsumableArray(getLowerControlButtons([6, 7, 4])).concat(
                        [surface2.makeHiddenLedButton()], //Cycle
                        _toConsumableArray(
                            createElements(3, function (index) {
                                return surface2.makeLedButton(
                                    x + 3.5 + index * buttonDistance,
                                    23.5 + buttonRowHeight * 2 - 0.5,
                                    1.8,
                                    0.75
                                )
                            })
                        ),
                        _toConsumableArray(getLowerControlButtons([3, 5, 11, 10, 9]))
                    ),
                    navigation: {
                        channel: {
                            left: makeSquareButton(surface2, x, 13),
                            right: makeSquareButton(surface2, x, 13 + buttonRowHeight),
                        },
                        bank: {
                            left: makeSquareButton(surface2, x, 13 + buttonRowHeight * 2),
                            right: makeSquareButton(surface2, x, 13 + buttonRowHeight * 3),
                        },
                        directions: {
                            left: makeSquareButton(surface2, x + 4.75, 31.8),
                            right: makeSquareButton(surface2, x + 9.75, 31.8),
                            up: makeSquareButton(surface2, x + 7.25, 29.5),
                            center: makeSquareButton(surface2, x + 7.25, 31.8),
                            down: makeSquareButton(surface2, x + 7.25, 34.1),
                        },
                    },
                },
                displayLeds: {
                    smpte: surface2.makeDecoratedLamp(x + 5.25, 3.25, 0.75, 0.5),
                    beats: surface2.makeDecoratedLamp(x + 5.25, 4.25, 0.75, 0.5),
                    solo: surface2.makeDecoratedLamp(x + 18, 3.75, 0.75, 0.5),
                },
                expressionPedal: {
                    mSurfaceValue: surface2.makeCustomValueVariable('ExpressionPedal'),
                },
                footSwitches: createElements(2, function (index) {
                    return surface2.makeButton(x + 6 + index * 2, 0.875, 1.5, 1.5).setShapeCircle()
                }),
            },
        }
    },
}
// src/config.ts
var deviceConfig2 = deviceConfig
var config = CONFIGURATION
var CONFIGURATION = {
    /**
     * If you have an extender unit, change this option to either `["extender", "main"]` (if your
     * extender is placed on the left side of the main unit) or `["main", "extender"]` (if the
     * extender is on the right side).
     *
     * You can also specify an arbitrary combination of "main" and "extender" devices here, including
     * multiple X-Touch ("main") and multiple X-Touch Extender ("extender") devices. The order of the
     * list below should match the order of the devices on your desk from left to right. The port
     * setup in the "Add MIDI Controller Surface" dialog reflects this order for input and output
     * ports, i.e., the first input and the first output port belong to the leftmost device while the
     * last input and the last output port belong to the rightmost device.
     */ devices: ['main'],
    /**
     * Whether touching a channel's fader will select the channel ("Auto Select"). Replace `true` with
     * `false` below to disable auto selection.
     */ enableAutoSelect: true,
    /**
     * If you don't use the Control Room or your version of Cubase doesn't have it, you'll likely want
     * the main fader to control the first output channel like in the default Mackie Control mapping.
     * You can achieve this by replacing `true` with `false` below.
     */ mapMainFaderToControlRoom: true,
}
// src/midi/managers/ColorManager.ts
var import_color_diff = __toESM(require_lib())
// src/midi/managers/LcdManager.ts
var import_abbreviate = __toESM(require_lib2())
var _LcdManager = /*#__PURE__*/ (function () {
    function _LcdManager1(device) {
        _classCallCheck(this, _LcdManager1)
        this.device = device
    }
    _createClass(
        _LcdManager1,
        [
            {
                key: 'sendText',
                value: function sendText(context, startIndex, text) {
                    var chars = _LcdManager.asciiStringToCharArray(text.slice(0, 112))
                    this.device.ports.output.sendSysex(
                        context,
                        [18, startIndex].concat(_toConsumableArray(chars))
                    )
                },
            },
            {
                key: 'setChannelText',
                value: function setChannelText(context, row, channelIndex, text) {
                    while (text.length < _LcdManager.channelWidth) {
                        text += ' '
                    }
                    this.sendText(context, row * 56 + (channelIndex % 8) * 7, text)
                },
            },
            {
                key: 'clearDisplays',
                value: function clearDisplays(context) {
                    this.sendText(context, 0, _LcdManager.makeSpaces(112))
                },
            },
        ],
        [
            {
                key: 'stripNonAsciiCharacters',
                value: /**
                 * Strips any non-ASCII character from the provided string, since devices only support ASCII.
                 **/ function stripNonAsciiCharacters(input) {
                    return input.replace(/[^\x00-\x7F]/g, '')
                },
            },
            {
                key: 'centerString',
                value: /**
                 * Given a <= `LcdManager.channelWidth` characters long string, returns a left-padded version of
                 * it that appears centered on a `LcdManager.channelWidth`-character display.
                 */ function centerString(input) {
                    if (input.length >= _LcdManager.channelWidth) {
                        return input
                    }
                    return (
                        _LcdManager.makeSpaces(
                            Math.floor((_LcdManager.channelWidth - input.length) / 2)
                        ) + input
                    )
                },
            },
            {
                key: 'abbreviateString',
                value: /**
                 * Given a string, returns an abbreviated version of it consisting of at most
                 * `LcdManager.channelWidth` characters.
                 */ function abbreviateString(input) {
                    if (input.length < _LcdManager.channelWidth) {
                        return input
                    }
                    return (0, import_abbreviate.default)(input, {
                        length: _LcdManager.channelWidth,
                    })
                },
            },
            {
                key: 'asciiStringToCharArray',
                value: function asciiStringToCharArray(input) {
                    var chars = []
                    for (var i = 0; i < input.length; i++) {
                        chars.push(input.charCodeAt(i))
                    }
                    return chars
                },
            },
            {
                key: 'makeSpaces',
                value: function makeSpaces(length) {
                    return Array(length + 1).join(' ')
                },
            },
        ]
    )
    return _LcdManager1
})()
var LcdManager = _LcdManager
LcdManager.channelWidth = false ? 7 : 6
// src/midi/PortPair.ts
var nextPortPairIndex = 1
function makePortPair(driver2, isExtender) {
    var name = isExtender ? 'Extender' : 'Main'
    var portPairIndex = nextPortPairIndex++
    var input = driver2.mPorts.makeMidiInput('Input '.concat(portPairIndex, ' - ').concat(name))
    var output = driver2.mPorts.makeMidiOutput('Output '.concat(portPairIndex, ' - ').concat(name))
    output.sendSysex = function (context, messageBody) {
        output.sendMidi(
            context,
            [240, 0, 0, 102, 20 + +isExtender].concat(_toConsumableArray(messageBody), [247])
        )
    }
    output.sendNoteOn = function (context, pitch, velocity) {
        output.sendMidi(context, [144, pitch, +Boolean(velocity) * 255])
    }
    return {
        input: input,
        output: output,
    }
}
// src/Devices.ts
var Device = function Device(driver2, firstChannelIndex, deviceSurface, isExtender) {
    _classCallCheck(this, Device)
    this.firstChannelIndex = firstChannelIndex
    this.surfaceWidth = deviceSurface.width
    this.channelElements = deviceSurface.channelElements
    this.ports = makePortPair(driver2, isExtender)
    this.lcdManager = new LcdManager(this)
    if (false) {
        this.colorManager = new ColorManager(this)
    }
}
var MainDevice = /*#__PURE__*/ (function (Device) {
    _inherits(MainDevice, Device)
    var _super = _createSuper(MainDevice)
    function MainDevice(driver2, surface2, firstChannelIndex, surfaceXPosition) {
        _classCallCheck(this, MainDevice)
        var _this
        var deviceSurface = deviceConfig2.createMainSurface(surface2, surfaceXPosition)
        _this = _super.call(this, driver2, firstChannelIndex, deviceSurface, false)
        _this.controlSectionElements = deviceSurface.controlSectionElements
        return _this
    }
    return MainDevice
})(Device)
var ExtenderDevice = /*#__PURE__*/ (function (Device) {
    _inherits(ExtenderDevice, Device)
    var _super = _createSuper(ExtenderDevice)
    function ExtenderDevice(driver2, surface2, firstChannelIndex, surfaceXPosition) {
        _classCallCheck(this, ExtenderDevice)
        var deviceSurface = deviceConfig2.createExtenderSurface(surface2, surfaceXPosition)
        return _super.call(this, driver2, firstChannelIndex, deviceSurface, true)
    }
    return ExtenderDevice
})(Device)
var Devices = /*#__PURE__*/ (function () {
    function Devices(driver2, surface2) {
        var _this_devices
        _classCallCheck(this, Devices)
        this.devices = []
        this.forEach = this.devices.forEach.bind(this.devices)
        this.map = this.devices.map.bind(this.devices)
        this.flatMap = this.devices.flatMap.bind(this.devices)
        this.filter = this.devices.filter.bind(this.devices)
        var deviceClasses = config.devices.map(function (deviceType) {
            return deviceType === 'main' ? MainDevice : ExtenderDevice
        })
        var nextDeviceXPosition = 0
        ;(_this_devices = this.devices).push.apply(
            _this_devices,
            _toConsumableArray(
                deviceClasses.map(function (deviceClass, deviceIndex) {
                    var device = new deviceClass(
                        driver2,
                        surface2,
                        deviceIndex * 8,
                        nextDeviceXPosition
                    )
                    nextDeviceXPosition += device.surfaceWidth
                    return device
                })
            )
        )
        if (this.devices.length === 1) {
            driver2
                .makeDetectionUnit()
                .detectPortPair(this.devices[0].ports.input, this.devices[0].ports.output)
                .expectInputNameContains('iCON QCON Pro G2')
                .expectOutputNameContains('iCON QCON Pro G2')
        }
    }
    _createClass(Devices, [
        {
            key: 'getDeviceByChannelIndex',
            value: function getDeviceByChannelIndex(channelIndex) {
                return this.devices[Math.floor(channelIndex / 8)]
            },
        },
    ])
    return Devices
})()
// src/midi/managers/SegmentDisplayManager.ts
var SegmentDisplayManager = /*#__PURE__*/ (function () {
    function SegmentDisplayManager(devices2) {
        _classCallCheck(this, SegmentDisplayManager)
        this.devices = devices2
        this.segmentValues = createElements(12, function () {
            return new ContextStateVariable(0)
        })
        this.lastTimeFormat = new ContextStateVariable('')
    }
    _createClass(SegmentDisplayManager, [
        {
            key: 'updateSegment',
            value: function updateSegment(context, segmentId, digit) {
                var hasDot = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false
                var value = 48 + (digit !== null && digit !== void 0 ? digit : -16)
                if (hasDot) {
                    value += 64
                }
                if (value !== this.segmentValues[segmentId].get(context)) {
                    this.segmentValues[segmentId].set(context, value)
                    this.devices.forEach(function (device) {
                        if (_instanceof(device, MainDevice)) {
                            device.ports.output.sendMidi(context, [176, 64 + segmentId, value])
                        }
                    })
                }
            },
        },
        {
            key: 'updateSegmentsByString',
            value: function updateSegmentsByString(context, lastSegmentId, string) {
                var currentSegmentId = lastSegmentId
                var hasCurrentSegmentDot = false
                var _iteratorNormalCompletion = true,
                    _didIteratorError = false,
                    _iteratorError = undefined
                try {
                    for (
                        var _iterator = Array.from(string).reverse()[Symbol.iterator](), _step;
                        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
                        _iteratorNormalCompletion = true
                    ) {
                        var char = _step.value
                        if (char === '.' || char === ':') {
                            hasCurrentSegmentDot = true
                        } else {
                            this.updateSegment(
                                context,
                                currentSegmentId,
                                char === ' ' ? null : parseInt(char, 10),
                                hasCurrentSegmentDot
                            )
                            currentSegmentId++
                            hasCurrentSegmentDot = false
                        }
                    }
                } catch (err) {
                    _didIteratorError = true
                    _iteratorError = err
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return()
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError
                        }
                    }
                }
            },
        },
        {
            /**
             * Update the 7-segment displays to show the provided `time` string – a string consisting of
             * numbers, spaces, dots, and colons.
             */ key: 'updateTime',
            value: function updateTime(context, time, timeFormat) {
                if (timeFormat !== this.lastTimeFormat.get(context)) {
                    this.lastTimeFormat.set(context, timeFormat)
                    this.devices.forEach(function (device) {
                        if (_instanceof(device, MainDevice)) {
                            var _device_controlSectionElements_displayLeds =
                                    device.controlSectionElements.displayLeds,
                                smpteLed = _device_controlSectionElements_displayLeds.smpte,
                                beatsLed = _device_controlSectionElements_displayLeds.beats
                            smpteLed.mSurfaceValue.setProcessValue(
                                context,
                                +/^(?:[\d]+\:){3}[\d]+$/.test(time)
                            )
                            beatsLed.mSurfaceValue.setProcessValue(
                                context,
                                +/^(?:[ \d]+\.){2} \d\.[\d ]+$/.test(time)
                            )
                        }
                    })
                }
                var match = /^([\d ]+[\.\:])([\d ]+)([\.\:])([\d ]+)([\.\:])([\d ]+)$/.exec(time)
                if (match) {
                    time =
                        match[1] +
                        match[2].padStart(2, ' ') +
                        match[3] +
                        match[4].padStart(2, ' ') +
                        match[5] +
                        match[6].padStart(3, ' ')
                }
                this.updateSegmentsByString(
                    context,
                    0,
                    time.padStart(10 + time.replaceAll(/[^\.\:]/g, '').length, ' ')
                )
            },
        },
        {
            key: 'setAssignment',
            value: function setAssignment(context, assignment) {
                this.updateSegmentsByString(context, 10, assignment)
            },
        },
        {
            key: 'clearAssignment',
            value: function clearAssignment(context) {
                for (var i = this.segmentValues.length - 2; i < this.segmentValues.length; i++) {
                    this.updateSegment(context, i, null)
                }
            },
        },
        {
            key: 'clearTime',
            value: function clearTime(context) {
                for (var i = 0; i < this.segmentValues.length - 2; i++) {
                    this.updateSegment(context, i, null)
                }
            },
        },
    ])
    return SegmentDisplayManager
})()
// src/midi/connection.ts
function setupDeviceConnection(driver2, devices2) {
    var activationCallbacks2 = makeCallbackCollection(driver2, 'mOnActivate')
    var segmentDisplayManager2 = new SegmentDisplayManager(devices2)
    driver2.mOnDeactivate = function (context) {
        segmentDisplayManager2.clearAssignment(context)
        segmentDisplayManager2.clearTime(context)
        devices2.forEach(function (device) {
            var _device_colorManager
            ;(_device_colorManager = device.colorManager) === null ||
            _device_colorManager === void 0
                ? void 0
                : _device_colorManager.resetColors(context)
            device.lcdManager.clearDisplays(context)
            var output = device.ports.output
            for (var faderIndex = 0; faderIndex < 9; faderIndex++) {
                output.sendMidi(context, [224 + faderIndex, 0, 0])
            }
            for (var note = 0; note < 118; note++) {
                output.sendNoteOn(context, note, 0)
            }
            for (var encoderIndex = 0; encoderIndex < 8; encoderIndex++) {
                output.sendMidi(context, [176, 48 + encoderIndex, 0])
            }
        })
    }
    return {
        activationCallbacks: activationCallbacks2,
        segmentDisplayManager: segmentDisplayManager2,
    }
}
// src/midi/index.ts
var makeGlobalBooleanVariables = function (surface2) {
    return {
        areMotorsActive: new GlobalBooleanVariable(surface2),
        isValueDisplayModeActive: new GlobalBooleanVariable(surface2),
        isEncoderAssignmentActive: createElements(6, function () {
            return new GlobalBooleanVariable(surface2)
        }),
        isFlipModeActive: new GlobalBooleanVariable(surface2),
    }
}
function bindDeviceToMidi(device, globalBooleanVariables2, activationCallbacks2, param) {
    var setTimeout = param.setTimeout
    var bindFader = function bindFader(ports2, fader, faderIndex) {
        fader.mSurfaceValue.mMidiBinding.setInputPort(ports2.input).bindToPitchBend(faderIndex)
        fader.mTouchedValue.mMidiBinding.setInputPort(ports2.input).bindToNote(0, 104 + faderIndex)
        fader.mTouchedValueInternal.mMidiBinding
            .setInputPort(ports2.input)
            .bindToNote(0, 104 + faderIndex)
        var sendValue = function (context, value) {
            value *= 16383
            ports2.output.sendMidi(context, [224 + faderIndex, value & 127, value >> 7])
        }
        var isFaderTouched = new ContextStateVariable(false)
        fader.mTouchedValueInternal.mOnProcessValueChange = function (context, value) {
            var isFaderTouchedValue = Boolean(value)
            isFaderTouched.set(context, isFaderTouchedValue)
            if (!isFaderTouchedValue) {
                sendValue(context, lastFaderValue.get(context))
            }
        }
        var forceUpdate = new ContextStateVariable(true)
        var lastFaderValue = new ContextStateVariable(0)
        fader.mSurfaceValue.mOnProcessValueChange = function (context, newValue, difference) {
            if (
                globalBooleanVariables2.areMotorsActive.get(context) &&
                !isFaderTouched.get(context) &&
                (difference !== 0 || lastFaderValue.get(context) === 0 || forceUpdate.get(context))
            ) {
                forceUpdate.set(context, false)
                sendValue(context, newValue)
            }
            lastFaderValue.set(context, newValue)
        }
        fader.mSurfaceValue.mOnTitleChange = function (context, title) {
            if (title === '') {
                forceUpdate.set(context, true)
                fader.mSurfaceValue.setProcessValue(context, 0)
                lastFaderValue.set(context, 0)
                if (globalBooleanVariables2.areMotorsActive.get(context)) {
                    forceUpdate.set(context, false)
                    sendValue(context, 0)
                }
            }
        }
        globalBooleanVariables2.areMotorsActive.addOnChangeCallback(function (
            context,
            areMotorsActive
        ) {
            if (areMotorsActive) {
                sendValue(context, lastFaderValue.get(context))
            }
        })
    }
    var ports = device.ports
    var _iteratorNormalCompletion = true,
        _didIteratorError = false,
        _iteratorError = undefined
    try {
        var _loop = function () {
            var _step_value = _slicedToArray(_step.value, 2),
                channelIndex = _step_value[0],
                channel = _step_value[1]
            channel.encoder.mEncoderValue.mMidiBinding
                .setInputPort(ports.input)
                .bindToControlChange(0, 16 + channelIndex)
                .setTypeRelativeSignedBit()
            channel.encoder.mPushValue.mMidiBinding
                .setInputPort(ports.input)
                .bindToNote(0, 32 + channelIndex)
            channel.encoder.mEncoderValue.mOnProcessValueChange = function (context, newValue) {
                var displayMode = channel.encoder.mDisplayModeValue.getProcessValue(context)
                var isCenterLedOn = newValue === (displayMode === 3 /* Spread */ ? 0 : 0.5)
                var position = 1 + Math.round(newValue * (displayMode === 3 /* Spread */ ? 5 : 10))
                ports.output.sendMidi(context, [
                    176,
                    48 + channelIndex,
                    (+isCenterLedOn << 6) + (displayMode << 4) + position,
                ])
            }
            if (false) {
                var encoderColor = new ContextStateVariable({
                    isAssigned: false,
                    r: 0,
                    g: 0,
                    b: 0,
                })
                channel.encoder.mEncoderValue.mOnColorChange = function (
                    context,
                    r,
                    g,
                    b,
                    _a,
                    isAssigned
                ) {
                    encoderColor.set(context, {
                        isAssigned: isAssigned,
                        r: r,
                        g: g,
                        b: b,
                    })
                    updateColor(context)
                }
                var channelColor = new ContextStateVariable({
                    isAssigned: false,
                    r: 0,
                    g: 0,
                    b: 0,
                })
                channel.buttons.select.mSurfaceValue.mOnColorChange = function (
                    context,
                    r,
                    g,
                    b,
                    _a,
                    isAssigned
                ) {
                    channelColor.set(context, {
                        isAssigned: isAssigned,
                        r: r,
                        g: g,
                        b: b,
                    })
                    updateColor(context)
                }
                var updateColor = function (context) {
                    var _device_colorManager
                    var currentEncoderColor = encoderColor.get(context)
                    ;(_device_colorManager = device.colorManager) === null ||
                    _device_colorManager === void 0
                        ? void 0
                        : _device_colorManager.setChannelColorRgb(
                              context,
                              channelIndex, // Fall back to channel color if encoder is not assigned
                              currentEncoderColor.isAssigned
                                  ? currentEncoderColor
                                  : channelColor.get(context)
                          )
                }
            }
            var currentParameterName = new ContextStateVariable('')
            var currentDisplayValue = new ContextStateVariable('')
            var isLocalValueModeActive = new ContextStateVariable(false)
            var updateDisplay = function (context) {
                device.lcdManager.setChannelText(
                    context,
                    0,
                    channelIndex,
                    isLocalValueModeActive.get(context) ||
                        globalBooleanVariables2.isValueDisplayModeActive.get(context)
                        ? currentDisplayValue.get(context)
                        : currentParameterName.get(context)
                )
            }
            channel.encoder.mEncoderValue.mOnDisplayValueChange = function (context, value) {
                var _value
                value =
                    (_value = {
                        // French
                        Éteint: 'Eteint',
                        // Japanese
                        オン: 'On',
                        オフ: 'Off',
                        // Russian
                        'Вкл.': 'On',
                        'Выкл.': 'Off',
                        // Chinese
                        开: 'On',
                        关: 'Off',
                    }[value]) !== null && _value !== void 0
                        ? _value
                        : value
                currentDisplayValue.set(
                    context,
                    LcdManager.centerString(
                        LcdManager.abbreviateString(LcdManager.stripNonAsciiCharacters(value))
                    )
                )
                isLocalValueModeActive.set(context, true)
                updateDisplay(context)
                setTimeout(
                    context,
                    'updateDisplay'.concat(channelIndex),
                    function (context2) {
                        isLocalValueModeActive.set(context2, false)
                        updateDisplay(context2)
                    },
                    1
                )
            }
            channel.encoder.mEncoderValue.mOnTitleChange = function (context, title1, title2) {
                if (title1 === '') {
                    ports.output.sendMidi(context, [176, 48 + channelIndex, 0])
                }
                isLocalValueModeActive.set(context, false)
                var _title2
                title2 =
                    (_title2 = {
                        // English
                        'Pan Left-Right': 'Pan',
                        // German
                        'Pan links/rechts': 'Pan',
                        // Spanish
                        'Pan izquierda-derecha': 'Pan',
                        // French
                        'Pan gauche-droit': 'Pan',
                        'Pr\xe9/Post': 'PrePost',
                        // Italian
                        'Pan sinistra-destra': 'Pan',
                        Monitoraggio: 'Monitor',
                        // Japanese
                        左右パン: 'Pan',
                        モニタリング: 'Monitor',
                        レベル: 'Level',
                        // Portuguese
                        'Pan Esquerda-Direita': 'Pan',
                        Nível: 'Nivel',
                        'Pr\xe9/P\xf3s': 'PrePost',
                        // Russian
                        'Панорама Лево-Право': 'Pan',
                        Монитор: 'Monitor',
                        Уровень: 'Level',
                        'Пре/Пост': 'PrePost',
                        // Chinese
                        '声像 左-右': 'Pan',
                        监听: 'Monitor',
                        电平: 'Level',
                        '前置/后置': 'PrePost',
                    }[title2]) !== null && _title2 !== void 0
                        ? _title2
                        : title2
                currentParameterName.set(
                    context,
                    LcdManager.centerString(
                        LcdManager.abbreviateString(LcdManager.stripNonAsciiCharacters(title2))
                    )
                )
                updateDisplay(context)
            }
            globalBooleanVariables2.isValueDisplayModeActive.addOnChangeCallback(updateDisplay)
            channel.scribbleStrip.trackTitle.mOnTitleChange = function (context, title) {
                device.lcdManager.setChannelText(
                    context,
                    1,
                    channelIndex,
                    LcdManager.abbreviateString(LcdManager.stripNonAsciiCharacters(title))
                )
            }
            var lastMeterUpdateTime = 0
            channel.vuMeter.mOnProcessValueChange = function (context, newValue) {
                var now = performance.now()
                if (now - lastMeterUpdateTime > 125) {
                    newValue = 1 + Math.log10(0.1 + 0.9 * (1 + Math.log10(0.1 + 0.9 * newValue)))
                    lastMeterUpdateTime = now
                    ports.output.sendMidi(context, [
                        208,
                        (channelIndex << 4) + Math.ceil(newValue * 14 - 0.25),
                    ])
                }
            }
            var buttons = channel.buttons
            var _iteratorNormalCompletion = true,
                _didIteratorError = false,
                _iteratorError = undefined
            try {
                for (
                    var _iterator = [buttons.record, buttons.solo, buttons.mute, buttons.select]
                            .entries()
                            [Symbol.iterator](),
                        _step1;
                    !(_iteratorNormalCompletion = (_step1 = _iterator.next()).done);
                    _iteratorNormalCompletion = true
                ) {
                    var _step_value1 = _slicedToArray(_step1.value, 2),
                        row = _step_value1[0],
                        button = _step_value1[1]
                    button.bindToNote(ports, row * 8 + channelIndex, true)
                }
            } catch (err) {
                _didIteratorError = true
                _iteratorError = err
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return()
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError
                    }
                }
            }
            bindFader(ports, channel.fader, channelIndex)
        }
        for (
            var _iterator = device.channelElements.entries()[Symbol.iterator](), _step;
            !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
            _iteratorNormalCompletion = true
        )
            _loop()
    } catch (err) {
        _didIteratorError = true
        _iteratorError = err
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return()
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError
            }
        }
    }
    if (_instanceof(device, MainDevice)) {
        var elements = device.controlSectionElements
        var buttons = elements.buttons
        var motorButton = buttons.automation[5]
        motorButton.onSurfaceValueChange.addCallback(function (context, value) {
            if (value === 1) {
                globalBooleanVariables2.areMotorsActive.toggle(context)
            }
        })
        globalBooleanVariables2.areMotorsActive.addOnChangeCallback(function (context, value) {
            motorButton.mLedValue.setProcessValue(context, +value)
        })
        activationCallbacks2.addCallback(function (context) {
            ports.output.sendNoteOn(context, 79, 1)
            ports.output.sendNoteOn(context, 42, 1)
            for (var _i = 0, _iter = [40, 41, 43, 44, 45]; _i < _iter.length; _i++) {
                var note = _iter[_i]
                ports.output.sendNoteOn(context, note, 0)
            }
        })
        bindFader(ports, elements.mainFader, 8)
        buttons.display.onSurfaceValueChange.addCallback(function (context, value) {
            if (value === 1) {
                globalBooleanVariables2.isValueDisplayModeActive.toggle(context)
            }
        })
        globalBooleanVariables2.isFlipModeActive.addOnChangeCallback(function (context, value) {
            buttons.flip.mLedValue.setProcessValue(context, +value)
        })
        var _iteratorNormalCompletion1 = true,
            _didIteratorError1 = false,
            _iteratorError1 = undefined
        try {
            var _loop1 = function () {
                var _step_value = _slicedToArray(_step1.value, 2),
                    buttonIndex = _step_value[0],
                    isActive = _step_value[1]
                isActive.addOnChangeCallback(function (context, value) {
                    buttons.encoderAssign[buttonIndex].mLedValue.setProcessValue(context, +value)
                })
            }
            for (
                var _iterator1 = globalBooleanVariables2.isEncoderAssignmentActive
                        .entries()
                        [Symbol.iterator](),
                    _step1;
                !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done);
                _iteratorNormalCompletion1 = true
            )
                _loop1()
        } catch (err) {
            _didIteratorError1 = true
            _iteratorError1 = err
        } finally {
            try {
                if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                    _iterator1.return()
                }
            } finally {
                if (_didIteratorError1) {
                    throw _iteratorError1
                }
            }
        }
        var _iteratorNormalCompletion2 = true,
            _didIteratorError2 = false,
            _iteratorError2 = undefined
        try {
            for (
                var _iterator2 = _toConsumableArray(
                        [0, 3, 1, 4, 2, 5].map(function (index2) {
                            return buttons.encoderAssign[index2]
                        })
                    )
                        .concat(
                            [
                                buttons.navigation.bank.left,
                                buttons.navigation.bank.right,
                                buttons.navigation.channel.left,
                                buttons.navigation.channel.right,
                                buttons.flip,
                                buttons.edit,
                                buttons.display,
                                buttons.timeMode,
                            ],
                            _toConsumableArray(buttons.function),
                            _toConsumableArray(buttons.number),
                            _toConsumableArray(buttons.modify),
                            _toConsumableArray(buttons.automation),
                            _toConsumableArray(buttons.utility),
                            _toConsumableArray(buttons.transport),
                            [
                                buttons.navigation.directions.up,
                                buttons.navigation.directions.down,
                                buttons.navigation.directions.left,
                                buttons.navigation.directions.right,
                                buttons.navigation.directions.center,
                                buttons.scrub,
                            ]
                        )
                        .entries()
                        [Symbol.iterator](),
                    _step2;
                !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
                _iteratorNormalCompletion2 = true
            ) {
                var _step_value = _slicedToArray(_step2.value, 2),
                    index = _step_value[0],
                    button = _step_value[1]
                button.bindToNote(ports, 40 + index)
            }
        } catch (err) {
            _didIteratorError2 = true
            _iteratorError2 = err
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                    _iterator2.return()
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2
                }
            }
        }
        var _elements_displayLeds = elements.displayLeds,
            smpte = _elements_displayLeds.smpte,
            beats = _elements_displayLeds.beats,
            solo = _elements_displayLeds.solo
        ;[smpte, beats, solo].forEach(function (lamp, index) {
            lamp.bindToNote(ports.output, 113 + index)
        })
        elements.jogWheel.bindToControlChange(ports.input, 60)
        var _iteratorNormalCompletion3 = true,
            _didIteratorError3 = false,
            _iteratorError3 = undefined
        try {
            for (
                var _iterator3 = elements.footSwitches.entries()[Symbol.iterator](), _step3;
                !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done);
                _iteratorNormalCompletion3 = true
            ) {
                var _step_value1 = _slicedToArray(_step3.value, 2),
                    index1 = _step_value1[0],
                    footSwitch = _step_value1[1]
                footSwitch.mSurfaceValue.mMidiBinding
                    .setInputPort(ports.input)
                    .bindToNote(0, 102 + index1)
            }
        } catch (err) {
            _didIteratorError3 = true
            _iteratorError3 = err
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                    _iterator3.return()
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3
                }
            }
        }
        elements.expressionPedal.mSurfaceValue.mMidiBinding
            .setInputPort(ports.input)
            .bindToControlChange(0, 46)
            .setTypeAbsolute()
    }
}
// src/mapping/control.ts
function setShiftableButtonsLedValues(controlSectionElements, context, value) {
    var buttons = controlSectionElements.buttons
    for (
        var _i = 0,
            _iter = [
                buttons.edit,
                buttons.modify[0],
                buttons.modify[2],
                buttons.utility[2],
                buttons.transport[0],
                buttons.transport[1],
            ];
        _i < _iter.length;
        _i++
    ) {
        var button = _iter[_i]
        button.mLedValue.setProcessValue(context, value)
    }
}
function bindCursorValueControlButton(page2, button, encoder, jogWheel) {
    var subPageArea = page2.makeSubPageArea('Cursor Value Control')
    var inactiveSubpage = subPageArea.makeSubPage('Cursor Value Control Inactive')
    var activeSubpage = subPageArea.makeSubPage('Cursor Value Control Active')
    var encoderDisplayMode = page2.mCustom.makeSettableHostValueVariable(
        'cursorValueControlEncoderDisplayMode'
    )
    activeSubpage.mOnActivate = function (context) {
        encoderDisplayMode.setProcessValue(context, 0 /* SingleDot */)
        button.mLedValue.setProcessValue(context, 1)
        jogWheel.mKnobModeEnabledValue.setProcessValue(context, 1)
    }
    inactiveSubpage.mOnActivate = function (context) {
        button.mLedValue.setProcessValue(context, 0)
        jogWheel.mKnobModeEnabledValue.setProcessValue(context, 0)
    }
    page2
        .makeActionBinding(button.mSurfaceValue, activeSubpage.mAction.mActivate)
        .setSubPage(inactiveSubpage)
    page2
        .makeActionBinding(button.mSurfaceValue, inactiveSubpage.mAction.mActivate)
        .setSubPage(activeSubpage)
    page2
        .makeValueBinding(encoder.mEncoderValue, page2.mHostAccess.mMouseCursor.mValueUnderMouse)
        .setSubPage(activeSubpage)
    page2.makeValueBinding(encoder.mDisplayModeValue, encoderDisplayMode).setSubPage(activeSubpage)
    var dummyHostVariable = page2.mCustom.makeHostValueVariable('dummy')
    page2.makeValueBinding(jogWheel.mSurfaceValue, dummyHostVariable).setSubPage(inactiveSubpage)
    page2
        .makeValueBinding(jogWheel.mSurfaceValue, page2.mHostAccess.mMouseCursor.mValueUnderMouse)
        .setSubPage(activeSubpage)
}
function bindControlButtons(page2, controlSectionElements, channelElements, mixerBankZone) {
    var host = page2.mHostAccess
    var buttons = controlSectionElements.buttons
    var buttonsSubPageArea = page2.makeSubPageArea('Control Buttons')
    var regularSubPage = buttonsSubPageArea.makeSubPage('Regular')
    var shiftSubPage = buttonsSubPageArea.makeSubPage('Shift')
    buttons.number.forEach(function (button, buttonIndex) {
        page2.makeCommandBinding(
            button.mSurfaceValue,
            'Channel & Track Visibility',
            'Channel and Rack Configuration '.concat(buttonIndex + 1)
        )
    })
    var _iteratorNormalCompletion = true,
        _didIteratorError = false,
        _iteratorError = undefined
    try {
        for (
            var _iterator = buttons.function[Symbol.iterator](), _step;
            !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
            _iteratorNormalCompletion = true
        ) {
            var button = _step.value
            page2.makeCommandBinding(
                button.mSurfaceValue,
                'MIDI Remote',
                'Open MIDI Remote Mapping Assistant'
            )
        }
    } catch (err) {
        _didIteratorError = true
        _iteratorError = err
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return()
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError
            }
        }
    }
    page2
        .makeCommandBinding(buttons.edit.mSurfaceValue, 'Edit', 'Edit Channel Settings')
        .setSubPage(regularSubPage)
    page2
        .makeCommandBinding(buttons.edit.mSurfaceValue, 'Windows', 'Close All Plug-in Windows')
        .setSubPage(shiftSubPage)
    page2
        .makeCommandBinding(buttons.modify[0].mSurfaceValue, 'Edit', 'Undo')
        .setSubPage(regularSubPage)
    page2
        .makeCommandBinding(buttons.modify[0].mSurfaceValue, 'Edit', 'History')
        .setSubPage(shiftSubPage)
    page2.makeCommandBinding(buttons.modify[1].mSurfaceValue, 'Edit', 'Redo')
    page2
        .makeCommandBinding(buttons.modify[2].mSurfaceValue, 'File', 'Save')
        .setSubPage(regularSubPage)
    page2
        .makeCommandBinding(buttons.modify[2].mSurfaceValue, 'File', 'Save New Version')
        .setSubPage(shiftSubPage)
    page2.makeCommandBinding(buttons.modify[3].mSurfaceValue, 'File', 'Revert')
    page2
        .makeValueBinding(
            buttons.automation[0].mSurfaceValue,
            host.mTrackSelection.mMixerChannel.mValue.mAutomationRead
        )
        .setTypeToggle()
    page2
        .makeValueBinding(
            buttons.automation[1].mSurfaceValue,
            host.mTrackSelection.mMixerChannel.mValue.mAutomationWrite
        )
        .setTypeToggle()
    bindCursorValueControlButton(
        page2,
        buttons.automation[2],
        channelElements[7].encoder,
        controlSectionElements.jogWheel
    )
    page2.makeCommandBinding(buttons.automation[3].mSurfaceValue, 'Project', 'Bring To Front')
    page2.makeCommandBinding(buttons.automation[4].mSurfaceValue, 'Devices', 'Mixer')
    page2.makeCommandBinding(
        buttons.utility[0].mSurfaceValue,
        'MixConsole History',
        'Undo MixConsole Step'
    )
    page2.makeCommandBinding(
        buttons.utility[1].mSurfaceValue,
        'MixConsole History',
        'Redo MixConsole Step'
    )
    page2
        .makeCommandBinding(buttons.utility[2].mSurfaceValue, 'Edit', 'Deactivate All Solo')
        .setSubPage(regularSubPage)
    page2
        .makeCommandBinding(buttons.utility[2].mSurfaceValue, 'Edit', 'Unmute All')
        .setSubPage(shiftSubPage)
    page2.makeActionBinding(
        buttons.utility[3].mSurfaceValue,
        shiftSubPage.mAction.mActivate
    ).mOnValueChange = function (context, mapping, value) {
        if (value) {
            shiftSubPage.mAction.mActivate.trigger(mapping)
            setShiftableButtonsLedValues(controlSectionElements, context, 1)
        } else {
            regularSubPage.mAction.mActivate.trigger(mapping)
            setShiftableButtonsLedValues(controlSectionElements, context, 0)
        }
    }
    var mTransport = host.mTransport
    page2
        .makeCommandBinding(buttons.transport[0].mSurfaceValue, 'Transport', 'To Left Locator')
        .setSubPage(regularSubPage)
    page2
        .makeCommandBinding(buttons.transport[0].mSurfaceValue, 'Transport', 'Set Left Locator')
        .setSubPage(shiftSubPage)
    page2
        .makeCommandBinding(buttons.transport[1].mSurfaceValue, 'Transport', 'To Right Locator')
        .setSubPage(regularSubPage)
    page2
        .makeCommandBinding(buttons.transport[1].mSurfaceValue, 'Transport', 'Set Right Locator')
        .setSubPage(shiftSubPage)
    page2
        .makeValueBinding(buttons.transport[2].mSurfaceValue, mTransport.mValue.mCycleActive)
        .setTypeToggle()
    page2.makeCommandBinding(buttons.transport[3].mSurfaceValue, 'Transport', 'Auto Punch In')
    page2.makeCommandBinding(
        buttons.transport[4].mSurfaceValue,
        'Transport',
        'Locate Previous Marker'
    )
    page2.makeCommandBinding(buttons.transport[5].mSurfaceValue, 'Transport', 'Insert Marker')
    page2.makeCommandBinding(buttons.transport[6].mSurfaceValue, 'Transport', 'Locate Next Marker')
    page2.makeValueBinding(buttons.transport[7].mSurfaceValue, mTransport.mValue.mRewind)
    page2.makeValueBinding(buttons.transport[8].mSurfaceValue, mTransport.mValue.mForward)
    page2
        .makeValueBinding(buttons.transport[9].mSurfaceValue, mTransport.mValue.mStop)
        .setTypeToggle()
    page2
        .makeValueBinding(buttons.transport[10].mSurfaceValue, mTransport.mValue.mStart)
        .setTypeToggle()
    page2
        .makeValueBinding(buttons.transport[11].mSurfaceValue, mTransport.mValue.mRecord)
        .setTypeToggle()
    var _buttons_navigation = buttons.navigation,
        bank = _buttons_navigation.bank,
        channel = _buttons_navigation.channel
    page2.makeActionBinding(bank.left.mSurfaceValue, mixerBankZone.mAction.mPrevBank)
    page2.makeActionBinding(bank.right.mSurfaceValue, mixerBankZone.mAction.mNextBank)
    page2.makeActionBinding(channel.left.mSurfaceValue, mixerBankZone.mAction.mShiftLeft)
    page2.makeActionBinding(channel.right.mSurfaceValue, mixerBankZone.mAction.mShiftRight)
}
function bindJogWheelSection(page2, controlSectionElements) {
    var jogWheelSubPageArea = page2.makeSubPageArea('jogWeel')
    var scrubSubPage = jogWheelSubPageArea.makeSubPage('scrub')
    var jogSubPage = jogWheelSubPageArea.makeSubPage('jog')
    var scrubButton = controlSectionElements.buttons.scrub
    page2.makeActionBinding(scrubButton.mSurfaceValue, jogWheelSubPageArea.mAction.mNext)
    jogSubPage.mOnActivate = function (context) {
        scrubButton.mLedValue.setProcessValue(context, 1)
    }
    scrubSubPage.mOnActivate = function (context) {
        scrubButton.mLedValue.setProcessValue(context, 0)
    }
    var _controlSectionElements_jogWheel = controlSectionElements.jogWheel,
        jogLeft = _controlSectionElements_jogWheel.mJogLeftValue,
        jogRight = _controlSectionElements_jogWheel.mJogRightValue
    page2.makeCommandBinding(jogLeft, 'Transport', 'Jog Left').setSubPage(jogSubPage)
    page2.makeCommandBinding(jogRight, 'Transport', 'Jog Right').setSubPage(jogSubPage)
    page2.makeCommandBinding(jogLeft, 'Transport', 'Nudge Cursor Left').setSubPage(scrubSubPage)
    page2.makeCommandBinding(jogRight, 'Transport', 'Nudge Cursor Right').setSubPage(scrubSubPage)
}
function bindSegmentDisplaySection(page2, controlSectionElements) {
    page2.makeCommandBinding(
        controlSectionElements.buttons.timeMode.mSurfaceValue,
        'Transport',
        'Exchange Time Formats'
    )
}
function bindDirectionButtons(page2, controlSectionElements) {
    var buttons = controlSectionElements.buttons
    var subPageArea = page2.makeSubPageArea('Direction Buttons')
    var navigateSubPage = subPageArea.makeSubPage('Navigate')
    var zoomSubPage = subPageArea.makeSubPage('Zoom')
    zoomSubPage.mOnActivate = function (context) {
        buttons.navigation.directions.center.mLedValue.setProcessValue(context, 1)
    }
    navigateSubPage.mOnActivate = function (context) {
        buttons.navigation.directions.center.mLedValue.setProcessValue(context, 0)
    }
    var directions = buttons.navigation.directions
    page2
        .makeCommandBinding(directions.up.mSurfaceValue, 'Navigate', 'Up')
        .setSubPage(navigateSubPage)
    page2
        .makeCommandBinding(directions.up.mSurfaceValue, 'Zoom', 'Zoom Out Vertically')
        .setSubPage(zoomSubPage)
    page2
        .makeCommandBinding(directions.down.mSurfaceValue, 'Navigate', 'Down')
        .setSubPage(navigateSubPage)
    page2
        .makeCommandBinding(directions.down.mSurfaceValue, 'Zoom', 'Zoom In Vertically')
        .setSubPage(zoomSubPage)
    page2
        .makeCommandBinding(directions.left.mSurfaceValue, 'Navigate', 'Left')
        .setSubPage(navigateSubPage)
    page2
        .makeCommandBinding(directions.left.mSurfaceValue, 'Zoom', 'Zoom Out')
        .setSubPage(zoomSubPage)
    page2
        .makeCommandBinding(directions.right.mSurfaceValue, 'Navigate', 'Right')
        .setSubPage(navigateSubPage)
    page2
        .makeCommandBinding(directions.right.mSurfaceValue, 'Zoom', 'Zoom In')
        .setSubPage(zoomSubPage)
    page2.makeActionBinding(directions.center.mSurfaceValue, subPageArea.mAction.mNext)
}
function bindFootControl(page2, controlSectionElements) {
    var _iteratorNormalCompletion = true,
        _didIteratorError = false,
        _iteratorError = undefined
    try {
        for (
            var _iterator = controlSectionElements.footSwitches[Symbol.iterator](), _step;
            !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
            _iteratorNormalCompletion = true
        ) {
            var footSwitch = _step.value
            page2.makeCommandBinding(
                footSwitch.mSurfaceValue,
                'MIDI Remote',
                'Open MIDI Remote Mapping Assistant'
            )
        }
    } catch (err) {
        _didIteratorError = true
        _iteratorError = err
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return()
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError
            }
        }
    }
}
// src/mapping/encoders.ts
var import_midiremote_api_v1 = require('midiremote_api_v1')
function bindEncoders(
    page2,
    devices2,
    mixerBankChannels,
    segmentDisplayManager2,
    globalBooleanVariables2
) {
    var channelElements = devices2.flatMap(function (device) {
        return device.channelElements
    })
    var deviceButtons = devices2
        .filter(function (device) {
            return _instanceof(device, MainDevice)
        })
        .flatMap(function (device) {
            return device.controlSectionElements.buttons
        })
    var channelEncoderDisplayModeHostValues = channelElements.map(function (channel, channelIndex) {
        var hostValue = page2.mCustom.makeSettableHostValueVariable(
            'encoderDisplayMode'.concat(channelIndex)
        )
        page2.makeValueBinding(channel.encoder.mDisplayModeValue, hostValue)
        return hostValue
    })
    var subPageArea = page2.makeSubPageArea('Encoders')
    var bindEncoderAssignments = function (assignmentButtonId, pages) {
        var encoderPageSize = channelElements.length
        pages = pages.flatMap(function (page3) {
            var assignments = page3.assignments
            if (Array.isArray(assignments) && assignments.length > encoderPageSize) {
                var chunks = []
                for (var i = 0; i < assignments.length / encoderPageSize; i++) {
                    chunks.push(assignments.slice(i * encoderPageSize, (i + 1) * encoderPageSize))
                }
                return chunks.map(function (chunk) {
                    return _objectSpreadProps(_objectSpread({}, page3), {
                        assignments: chunk,
                    })
                })
            }
            return page3
        })
        var createdSubPages = pages.map(function (param, encoderPageIndex) {
            var pageName = param.name,
                assignmentsConfig = param.assignments,
                areAssignmentsChannelRelated = param.areAssignmentsChannelRelated
            var subPageName = ''.concat(pageName, ' ').concat(encoderPageIndex + 1)
            var subPage = subPageArea.makeSubPage(subPageName)
            var flipSubPage = subPageArea.makeSubPage(''.concat(subPageName, ' Flip'))
            var _iteratorNormalCompletion = true,
                _didIteratorError = false,
                _iteratorError = undefined
            try {
                for (
                    var _iterator = deviceButtons[Symbol.iterator](), _step;
                    !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
                    _iteratorNormalCompletion = true
                ) {
                    var _step_value = _step.value,
                        flipButton = _step_value.flip
                    page2
                        .makeActionBinding(flipButton.mSurfaceValue, flipSubPage.mAction.mActivate)
                        .setSubPage(subPage)
                    page2
                        .makeActionBinding(flipButton.mSurfaceValue, subPage.mAction.mActivate)
                        .setSubPage(flipSubPage)
                }
            } catch (err) {
                _didIteratorError = true
                _iteratorError = err
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return()
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError
                    }
                }
            }
            var onSubPageActivate = makeCallbackCollection(subPage, 'mOnActivate')
            onSubPageActivate.addCallback(function (context) {
                segmentDisplayManager2.setAssignment(
                    context,
                    pages.length === 1
                        ? '  '
                        : ''.concat(encoderPageIndex + 1, '.').concat(pages.length)
                )
                var _iteratorNormalCompletion = true,
                    _didIteratorError = false,
                    _iteratorError = undefined
                try {
                    for (
                        var _iterator = globalBooleanVariables2.isEncoderAssignmentActive
                                .entries()
                                [Symbol.iterator](),
                            _step;
                        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
                        _iteratorNormalCompletion = true
                    ) {
                        var _step_value = _slicedToArray(_step.value, 2),
                            assignmentId = _step_value[0],
                            isActive = _step_value[1]
                        isActive.set(context, assignmentButtonId === assignmentId, true)
                    }
                } catch (err) {
                    _didIteratorError = true
                    _iteratorError = err
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return()
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError
                        }
                    }
                }
                globalBooleanVariables2.isFlipModeActive.set(context, false)
                globalBooleanVariables2.isValueDisplayModeActive.set(context, false)
            })
            flipSubPage.mOnActivate = function (context) {
                globalBooleanVariables2.isFlipModeActive.set(context, true, true)
            }
            var assignments =
                typeof assignmentsConfig === 'function'
                    ? mixerBankChannels.map(function (channel, channelIndex) {
                          return assignmentsConfig(channel, channelIndex)
                      })
                    : assignmentsConfig
            var _iteratorNormalCompletion1 = true,
                _didIteratorError1 = false,
                _iteratorError1 = undefined
            try {
                var _loop = function () {
                    var _step_value = _slicedToArray(_step1.value, 2),
                        channelIndex = _step_value[0],
                        _step_value_ = _step_value[1],
                        encoder = _step_value_.encoder,
                        fader = _step_value_.fader
                    var assignment = _objectSpread(
                        {
                            // @ts-expect-error `assignments[channelIndex]` may be undefined, but TS doesn't
                            // consider that
                            displayMode: 0 /* SingleDot */,
                            // @ts-expect-error
                            encoderValue:
                                page2.mCustom.makeHostValueVariable('unassignedEncoderValue'),
                            pushToggleValue: page2.mCustom.makeHostValueVariable(
                                'unassignedEncoderPushValue'
                            ),
                        },
                        assignments[channelIndex]
                    )
                    page2
                        .makeValueBinding(encoder.mEncoderValue, assignment.encoderValue)
                        .setSubPage(subPage)
                    if (config.enableAutoSelect) {
                        page2
                            .makeValueBinding(
                                fader.mTouchedValue,
                                mixerBankChannels[channelIndex].mValue.mSelected
                            )
                            .filterByValue(1)
                            .setSubPage(subPage)
                    }
                    if (assignment.pushToggleValue) {
                        page2
                            .makeValueBinding(encoder.mPushValue, assignment.pushToggleValue)
                            .setTypeToggle()
                            .setSubPage(subPage)
                    }
                    page2
                        .makeValueBinding(fader.mSurfaceValue, assignment.encoderValue)
                        .setSubPage(flipSubPage)
                    if (config.enableAutoSelect) {
                        page2
                            .makeValueBinding(
                                fader.mTouchedValue,
                                mixerBankChannels[channelIndex].mValue.mSelected
                            )
                            .filterByValue(+areAssignmentsChannelRelated)
                            .setSubPage(flipSubPage)
                    }
                    onSubPageActivate.addCallback(function (context) {
                        encoder.mDisplayModeValue.setProcessValue(context, assignment.displayMode)
                    })
                }
                for (
                    var _iterator1 = channelElements.entries()[Symbol.iterator](), _step1;
                    !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done);
                    _iteratorNormalCompletion1 = true
                )
                    _loop()
            } catch (err) {
                _didIteratorError1 = true
                _iteratorError1 = err
            } finally {
                try {
                    if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                        _iterator1.return()
                    }
                } finally {
                    if (_didIteratorError1) {
                        throw _iteratorError1
                    }
                }
            }
            return {
                subPage: subPage,
                flipSubPage: flipSubPage,
            }
        })
        var _iteratorNormalCompletion = true,
            _didIteratorError = false,
            _iteratorError = undefined
        try {
            for (
                var _iterator = deviceButtons[Symbol.iterator](), _step;
                !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
                _iteratorNormalCompletion = true
            ) {
                var buttons = _step.value
                var encoderAssignButtonValue =
                    buttons.encoderAssign[assignmentButtonId].mSurfaceValue
                page2.makeActionBinding(
                    encoderAssignButtonValue,
                    createdSubPages[0].subPage.mAction.mActivate
                )
                var previousSubPages = createdSubPages[0]
                var _iteratorNormalCompletion1 = true,
                    _didIteratorError1 = false,
                    _iteratorError1 = undefined
                try {
                    for (
                        var _iterator1 = createdSubPages[Symbol.iterator](), _step1;
                        !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done);
                        _iteratorNormalCompletion1 = true
                    ) {
                        var currentSubPages = _step1.value
                        page2
                            .makeActionBinding(
                                encoderAssignButtonValue,
                                currentSubPages.subPage.mAction.mActivate
                            )
                            .setSubPage(previousSubPages.subPage)
                        page2
                            .makeActionBinding(
                                encoderAssignButtonValue,
                                currentSubPages.subPage.mAction.mActivate
                            )
                            .setSubPage(previousSubPages.flipSubPage)
                        previousSubPages = currentSubPages
                    }
                } catch (err) {
                    _didIteratorError1 = true
                    _iteratorError1 = err
                } finally {
                    try {
                        if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                            _iterator1.return()
                        }
                    } finally {
                        if (_didIteratorError1) {
                            throw _iteratorError1
                        }
                    }
                }
            }
        } catch (err) {
            _didIteratorError = true
            _iteratorError = err
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return()
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError
                }
            }
        }
        return createdSubPages
    }
    bindEncoderAssignments(1, [
        {
            name: 'Pan',
            assignments: function (mixerBankChannel) {
                return {
                    displayMode: 1 /* BoostOrCut */,
                    encoderValue: mixerBankChannel.mValue.mPan,
                    pushToggleValue: mixerBankChannel.mValue.mMonitorEnable,
                }
            },
            areAssignmentsChannelRelated: true,
        },
    ])
    bindEncoderAssignments(0, [
        {
            name: 'Monitor',
            assignments: function (mixerBankChannel) {
                return {
                    displayMode: 2 /* Wrap */,
                    encoderValue: mixerBankChannel.mValue.mMonitorEnable,
                    pushToggleValue: mixerBankChannel.mValue.mMonitorEnable,
                }
            },
            areAssignmentsChannelRelated: true,
        },
        {
            name: 'Input Gain',
            assignments: function (mixerBankChannel) {
                return {
                    displayMode: 1 /* BoostOrCut */,
                    encoderValue: mixerBankChannel.mPreFilter.mGain,
                }
            },
            areAssignmentsChannelRelated: true,
        },
        {
            name: 'Input Phase',
            assignments: function (mixerBankChannel) {
                return {
                    displayMode: 2 /* Wrap */,
                    encoderValue: mixerBankChannel.mPreFilter.mPhaseSwitch,
                }
            },
            areAssignmentsChannelRelated: true,
        },
    ])
    var mChannelEQ = page2.mHostAccess.mTrackSelection.mMixerChannel.mChannelEQ
    bindEncoderAssignments(2, [
        {
            name: 'EQ',
            assignments: [
                mChannelEQ.mBand1,
                mChannelEQ.mBand2,
                mChannelEQ.mBand3,
                mChannelEQ.mBand4,
            ].flatMap(function (band) {
                return [
                    {
                        displayMode: 0 /* SingleDot */,
                        encoderValue: band.mFreq,
                        pushToggleValue: band.mOn,
                    },
                    {
                        displayMode: 1 /* BoostOrCut */,
                        encoderValue: band.mGain,
                        pushToggleValue: band.mOn,
                    },
                    {
                        displayMode: 0 /* SingleDot */,
                        encoderValue: band.mQ,
                        pushToggleValue: band.mOn,
                    },
                    {
                        displayMode: 0 /* SingleDot */,
                        encoderValue: band.mFilterType,
                        pushToggleValue: band.mOn,
                    },
                ]
            }),
            areAssignmentsChannelRelated: false,
        },
    ])
    var mSends = page2.mHostAccess.mTrackSelection.mMixerChannel.mSends
    var sendSlotsCount = import_midiremote_api_v1.mDefaults.getNumberOfSendSlots()
    bindEncoderAssignments(3, [
        {
            name: 'Sends',
            assignments: _toConsumableArray(
                createElements(sendSlotsCount, function (slotIndex) {
                    var sendSlot = mSends.getByIndex(slotIndex)
                    return {
                        encoderValue: sendSlot.mLevel,
                        displayMode: 0 /* SingleDot */,
                        pushToggleValue: sendSlot.mOn,
                    }
                })
            ).concat(
                _toConsumableArray(
                    createElements(sendSlotsCount, function (slotIndex) {
                        var sendSlot = mSends.getByIndex(slotIndex)
                        return {
                            encoderValue: sendSlot.mPrePost,
                            displayMode: 2 /* Wrap */,
                            pushToggleValue: sendSlot.mPrePost,
                        }
                    })
                )
            ),
            areAssignmentsChannelRelated: false,
        },
    ])
    var effectsViewer = page2.mHostAccess.mTrackSelection.mMixerChannel.mInsertAndStripEffects
        .makeInsertEffectViewer('Inserts')
        .followPluginWindowInFocus()
    var parameterBankZone = effectsViewer.mParameterBankZone
    var _bindEncoderAssignments = _slicedToArray(
            bindEncoderAssignments(4, [
                {
                    name: 'Plugin',
                    assignments: function () {
                        var parameterValue = parameterBankZone.makeParameterValue()
                        return {
                            encoderValue: parameterValue,
                            displayMode: 0 /* SingleDot */,
                        }
                    },
                    areAssignmentsChannelRelated: false,
                },
            ]),
            1
        ),
        pluginSubPages = _bindEncoderAssignments[0]
    var _iteratorNormalCompletion = true,
        _didIteratorError = false,
        _iteratorError = undefined
    try {
        for (
            var _iterator = deviceButtons[Symbol.iterator](), _step;
            !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
            _iteratorNormalCompletion = true
        ) {
            var buttons = _step.value
            for (
                var _i = 0, _iter = [pluginSubPages.subPage, pluginSubPages.flipSubPage];
                _i < _iter.length;
                _i++
            ) {
                var subPage = _iter[_i]
                page2
                    .makeActionBinding(
                        buttons.encoderAssign[4].mSurfaceValue,
                        parameterBankZone.mAction.mNextBank
                    )
                    .setSubPage(subPage)
            }
        }
    } catch (err) {
        _didIteratorError = true
        _iteratorError = err
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return()
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError
            }
        }
    }
    var mQuickControls = page2.mHostAccess.mTrackSelection.mMixerChannel.mQuickControls
    var mStripEffects =
        page2.mHostAccess.mTrackSelection.mMixerChannel.mInsertAndStripEffects.mStripEffects
    bindEncoderAssignments(5, [
        {
            name: 'Quick Controls',
            assignments: function (mixerBankChannel, channelIndex) {
                return {
                    encoderValue: mQuickControls.getByIndex(channelIndex),
                    displayMode: 0 /* SingleDot */,
                }
            },
            areAssignmentsChannelRelated: false,
        },
        {
            name: 'Channel Strip',
            assignments: [
                mStripEffects.mGate,
                mStripEffects.mCompressor,
                mStripEffects.mTools,
                mStripEffects.mSaturator,
                mStripEffects.mLimiter,
            ].flatMap(function (stripEffect) {
                return createElements(8, function () {
                    var parameterValue = stripEffect.mParameterBankZone.makeParameterValue()
                    return {
                        encoderValue: parameterValue,
                        displayMode: 0 /* SingleDot */,
                        pushToggleValue: stripEffect.mBypass,
                    }
                })
            }),
            areAssignmentsChannelRelated: false,
        },
    ])
}
// src/mapping/index.ts
function makeHostMapping(
    page2,
    devices2,
    segmentDisplayManager2,
    globalBooleanVariables2,
    activationCallbacks2
) {
    var mixerBankZone = page2.mHostAccess.mMixConsole
        .makeMixerBankZone()
        .excludeInputChannels()
        .excludeOutputChannels()
        .setFollowVisibility(true)
    var mixerBankChannels = devices2
        .flatMap(function (device) {
            return device.channelElements
        })
        .map(function (channelElements) {
            var channel = mixerBankZone.makeMixerBankChannel()
            page2.makeValueBinding(
                channelElements.scribbleStrip.trackTitle,
                channel.mValue.mSelected
            )
            page2.makeValueBinding(channelElements.vuMeter, channel.mValue.mVUMeter)
            var buttons = channelElements.buttons
            page2
                .makeValueBinding(buttons.record.mSurfaceValue, channel.mValue.mRecordEnable)
                .setTypeToggle()
            page2.makeValueBinding(buttons.solo.mSurfaceValue, channel.mValue.mSolo).setTypeToggle()
            page2.makeValueBinding(buttons.mute.mSurfaceValue, channel.mValue.mMute).setTypeToggle()
            page2
                .makeValueBinding(buttons.select.mSurfaceValue, channel.mValue.mSelected)
                .setTypeToggle()
            page2.makeValueBinding(channelElements.fader.mSurfaceValue, channel.mValue.mVolume)
            return channel
        })
    bindEncoders(
        page2,
        devices2,
        mixerBankChannels,
        segmentDisplayManager2,
        globalBooleanVariables2
    )
    devices2.forEach(function (device) {
        if (_instanceof(device, MainDevice)) {
            var controlSectionElements = device.controlSectionElements
            bindSegmentDisplaySection(page2, controlSectionElements)
            page2.makeValueBinding(
                controlSectionElements.mainFader.mSurfaceValue,
                config.mapMainFaderToControlRoom
                    ? page2.mHostAccess.mControlRoom.mMainChannel.mLevelValue
                    : page2.mHostAccess.mMixConsole
                          .makeMixerBankZone()
                          .includeOutputChannels()
                          .makeMixerBankChannel().mValue.mVolume
            )
            bindControlButtons(page2, controlSectionElements, device.channelElements, mixerBankZone)
            bindDirectionButtons(page2, controlSectionElements)
            bindJogWheelSection(page2, controlSectionElements)
            bindFootControl(page2, controlSectionElements)
        }
    })
    var isDriverActivated = new ContextStateVariable(false)
    var initialTransportLocatorPosition = new ContextStateVariable({
        time: '',
        timeFormat: '',
    })
    activationCallbacks2.addCallback(function (context) {
        isDriverActivated.set(context, true)
        var _initialTransportLocatorPosition_get = initialTransportLocatorPosition.get(context),
            time = _initialTransportLocatorPosition_get.time,
            timeFormat = _initialTransportLocatorPosition_get.timeFormat
        segmentDisplayManager2.updateTime(context, time, timeFormat)
        devices2.forEach(function (device) {
            if (_instanceof(device, MainDevice)) {
                var output = device.ports.output
                output.sendNoteOn(context, 113, +/^(?:[\d]+\:){3}[\d]+$/.test(time))
                output.sendNoteOn(context, 114, +/^(?:[ \d]+\.){2} \d\.[\d ]+$/.test(time))
            }
        })
    })
    page2.mHostAccess.mTransport.mTimeDisplay.mPrimary.mTransportLocator.mOnChange = function (
        context,
        mapping,
        time,
        timeFormat
    ) {
        if (!isDriverActivated.get(context)) {
            initialTransportLocatorPosition.set(context, {
                time: time,
                timeFormat: timeFormat,
            })
        } else {
            segmentDisplayManager2.updateTime(context, time, timeFormat)
        }
    }
}
// src/index.ts
Reflect.get = void 0
var driver = import_midiremote_api_v12.default.makeDeviceDriver(
    'iCON',
    'QCon Pro G2',
    'github.com/bjoluc'
)
var surface = decorateSurface(driver.mSurface)
var devices = new Devices(driver, surface)
var _setupDeviceConnection = setupDeviceConnection(driver, devices),
    activationCallbacks = _setupDeviceConnection.activationCallbacks,
    segmentDisplayManager = _setupDeviceConnection.segmentDisplayManager
activationCallbacks.addCallback(function () {
    console.log('Activating cubase-mcu-midiremote v1.5.0')
    console.log(
        'A newer version may be available at https://github.com/bjoluc/cubase-mcu-midiremote/releases'
    )
})
var globalBooleanVariables = makeGlobalBooleanVariables(surface)
activationCallbacks.addCallback(function (context) {
    globalBooleanVariables.areMotorsActive.set(context, true, true)
})
var page = decoratePage(driver.mMapping.makePage('Mixer'), surface)
var timerUtils = makeTimerUtils(page, surface)
devices.forEach(function (device) {
    bindDeviceToMidi(device, globalBooleanVariables, activationCallbacks, timerUtils)
})
makeHostMapping(
    page,
    devices,
    segmentDisplayManager,
    globalBooleanVariables,
    activationCallbacks
) /*! Bundled license information:
  
  color-diff/lib/diff.js:
    (**
     * @author Markus Ekholm
     * @copyright 2012-2016 (c) Markus Ekholm <markus at botten dot org >
     * @license Copyright (c) 2012-2016, Markus Ekholm
     * All rights reserved.
     * Redistribution and use in source and binary forms, with or without
     * modification, are permitted provided that the following conditions are met:
     *    * Redistributions of source code must retain the above copyright
     *      notice, this list of conditions and the following disclaimer.
     *    * Redistributions in binary form must reproduce the above copyright
     *      notice, this list of conditions and the following disclaimer in the
     *      documentation and/or other materials provided with the distribution.
     *    * Neither the name of the author nor the
     *      names of its contributors may be used to endorse or promote products
     *      derived from this software without specific prior written permission.
     *
     * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
     * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
     * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
     * DISCLAIMED. IN NO EVENT SHALL MARKUS EKHOLM BE LIABLE FOR ANY
     * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
     * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
     * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
     * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
     * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
     * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
     *)
  
  color-diff/lib/convert.js:
    (**
     * @author Markus Ekholm
     * @copyright 2012-2016 (c) Markus Ekholm <markus at botten dot org >
     * @license Copyright (c) 2012-2016, Markus Ekholm
     * All rights reserved.
     * Redistribution and use in source and binary forms, with or without
     * modification, are permitted provided that the following conditions are met:
     *    * Redistributions of source code must retain the above copyright
     *      notice, this list of conditions and the following disclaimer.
     *    * Redistributions in binary form must reproduce the above copyright
     *      notice, this list of conditions and the following disclaimer in the
     *      documentation and/or other materials provided with the distribution.
     *    * Neither the name of the author nor the
     *      names of its contributors may be used to endorse or promote products
     *      derived from this software without specific prior written permission.
     *
     * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
     * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
     * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
     * DISCLAIMED. IN NO EVENT SHALL MARKUS EKHOLM BE LIABLE FOR ANY
     * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
     * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
     * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
     * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
     * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
     * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
     *)
  
  color-diff/lib/palette.js:
    (**
     * @author Markus Ekholm
     * @copyright 2012-2016 (c) Markus Ekholm <markus at botten dot org >
     * @license Copyright (c) 2012-2016, Markus Ekholm
     * All rights reserved.
     * Redistribution and use in source and binary forms, with or without
     * modification, are permitted provided that the following conditions are met:
     *    * Redistributions of source code must retain the above copyright
     *      notice, this list of conditions and the following disclaimer.
     *    * Redistributions in binary form must reproduce the above copyright
     *      notice, this list of conditions and the following disclaimer in the
     *      documentation and/or other materials provided with the distribution.
     *    * Neither the name of the author nor the
     *      names of its contributors may be used to endorse or promote products
     *      derived from this software without specific prior written permission.
     *
     * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
     * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
     * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
     * DISCLAIMED. IN NO EVENT SHALL MARKUS EKHOLM BE LIABLE FOR ANY
     * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
     * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
     * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
     * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
     * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
     * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
     *)
  */
