import { nanoid } from 'nanoid';
import { toKebabCase } from './string.js';

const stripHTMLRE = /(<([^>]+)>)/gi;

/**
 * @return {string}
 */
export function getUniqueId() {
    return `i${nanoid(16)}`;
}

/**
 * @return {int}
 */
export function getRandomInt() {
    return window.crypto
        ? window.crypto.getRandomValues(new Uint32Array(1))[0] + 1
        : Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 1)) + 1;
}

/**
 * Stringify object, skip cyclic objects.
 *
 * @param {object} _obj
 * @param {array|object} [_except] Regular expression or array of attributes names, which shouldn't be serialized.
 * @param {bool} [_encode]
 * @return {string}
 */
export function serializeObject(_obj, _except, _encode) {
    let seen = [];
    let regExpUsed = false;
    let so = '';

    if (_except) {
        regExpUsed = _except instanceof RegExp;
    }

    so = JSON.stringify(_obj, (_key, _val) => {
        if (_except && (regExpUsed ? _except.test(_key) : inArray(_key, _except) >= 0)) {
            return;
        }
        if (typeof _val === 'object') {
            seen.push(_val);
        } else if (typeof _val === 'function') {
            return;
        }

        // eslint-disable-next-line consistent-return
        return _val;
    });

    if (_encode) {
        so = encodeURIComponent(so);
    }

    seen = null;

    // alert(so)

    return so;
}

/**
 * Clone object.
 *
 * @param {object} _obj
 * @param {array|object} [_except] Regular expression or array of attributes names to be skipped, when cloning.
 * @return {object}
 */
export function cloneObject(_obj, _except) {
    return _obj ? JSON.parse(serializeObject(_obj, _except)) : {};
}

/**
 * Clone string, number, object or array. Just simple values.
 *
 * @param {*} _val
 * @return {(number|string)|*|undefined}
 */
export function clone(_val) {
    if (_val instanceof Date) {
        return new Date(_val.getTime());
    }

    if (isObject(_val) || isArray(_val)) {
        return cloneObject(_val);
    }

    if (
        typeof _val === 'number' ||
        typeof _val === 'string' ||
        typeof _val === 'boolean' ||
        _val === undefined ||
        _val === null
    ) {
        return _val;
    }

    return undefined;
}

/**
 * @param {object} _obj
 * @return {boolean}
 */
export function isObjectEmpty(_obj) {
    return Object.keys(_obj).length === 0 && _obj.constructor === Object;
}

/**
 * Based on https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
 *
 * @param {*} _obj
 * @return {boolean}
 */
export function isObject(_obj) {
    return Object.prototype.toString.call(_obj) === '[object Object]';
}

/**
 * @param {*} _obj
 * @return {boolean}
 */
export function isArray(_obj) {
    return Array.isArray(_obj);
    // return Object.prototype.toString.call(_obj) === '[object Array]';
}

/**
 * @param {*} _obj
 * @return {boolean}
 */
export function isPromise(_obj) {
    return typeof _obj === 'object' && typeof _obj.then === 'function';
}

/**
 *
 * @param {int} _i
 * @param {Array} _ar
 * @return {boolean}
 */
export function isValidIndex(_i, _ar) {
    return isArray(_ar) && _i >= 0 && _i < _ar.length;
}

/**
 * Convert object, where keys are css properties, to string.
 *
 * @param {object} _cssObj
 * @return {string}
 */
export function obj2css(_cssObj) {
    let cssStr = '';

    Object.keys(_cssObj).forEach(_prop => {
        cssStr += `${toKebabCase(_prop)}:${_cssObj[_prop]};`;
    });

    return cssStr;
}

export function stripHTMLTags(_str) {
    return _str && typeof _str === 'string' ? _str.replace(stripHTMLRE, '') : '';
}

/**
 * Retuns index of the first founded item `_i` in array `_a`,
 * otherwise returns `-1`. No type checking.
 *
 * @param {*} _i
 * @param {array} _a
 * @param {boolean} [_deep]
 * @return {int}
 */
export function inArray(_i, _a, _deep) {
    let i = 0;
    let len = 0;
    let idx = -1;

    if (isArray(_a)) {
        len = _a.length;
        /* if (_a.indexOf) {
            idx = _a.indexOf(_i);
        } else { */
        for (i = 0; i < len; i += 1) {
            if (_deep) {
                // eslint-disable-next-line eqeqeq
                if (_i == _a[i]) {
                    idx = i;
                    break;
                }
                // eslint-disable-next-line eqeqeq
            } else if (_i == _a[i]) {
                idx = i;
                break;
            }
        }
    }

    return idx;
}

/**
 * Call function asynchronously.
 *
 * @param {function} _callback
 * @param {int} [_timeout]
 */
export function defer(_callback, _timeout = 0) {
    // setTimeout(_callback, _timeout);

    // setTimeout(_callback, _timeout || 0);

    if (_timeout > 0) {
        setTimeout(_callback, _timeout);
    } else {
        requestAnimationFrame(_callback);
    }
    // return new Promise(_resolve => setTimeout(() => {_func(); _resolve();}, _timeout || 0));
}

/**
 * Get object's nested property value.
 *
 * @param {object} _obj
 * @param {string} _path Property names, separated by `.`
 * @return {*|null}
 */
export function getNestedProp(_obj, _path) {
    const path = _path ? _path.split('.') : [];
    const pathLen = path.length;
    let value = null;

    if (_obj && pathLen > 0) {
        if (pathLen === 1) {
            value = _obj[path[0]];
        } else {
            value = _obj;
            for (let i = 0; i < pathLen; i++) {
                value = value[path[i]];
                if (value === null || value === undefined) {
                    value = null;
                    break;
                }
            }
        }
    }

    return value;
}

/**
 * Deep extend an object.
 *
 * @param {Object} _out
 * @param [_args]
 * @return {*|{}}
 */
export function deepExtend(_out, ..._args) {
    const out = _out || {};
    let obj;

    for (let i = 0, len = _args.length; i < len; i += 1) {
        obj = _args[i];

        if (!isObject(obj)) {
            // eslint-disable-next-line no-continue
            continue;
        }

        // eslint-disable-next-line no-restricted-syntax
        for (const key in obj) {
            // eslint-disable-next-line no-prototype-builtins
            if (!obj.hasOwnProperty(key)) {
                // || (typeof obj[key] === 'function')) {
                // eslint-disable-next-line no-continue
                continue;
            }

            // console.log("TYPeOF", typeof obj[key]);

            // if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
            if (isObject(obj[key])) {
                out[key] = deepExtend(out[key], obj[key]);
                // eslint-disable-next-line no-continue
                continue;
            }

            out[key] = obj[key];
        }
    }

    return out;
}

export function objectEquals(_obj1 = {}, _obj2 = {}) {
    const keys1 = Object.keys(_obj1);
    let bothAreObjects = false;
    let prop = null;
    let val1;
    let val2;

    if (keys1.length !== Object.keys(_obj2).length) {
        return false;
    }

    for (let i = 0, len = keys1.length; i < len; i++) {
        prop = keys1[i];
        val1 = _obj1[prop];
        val2 = _obj2[prop];

        bothAreObjects = typeof val1 === 'object' && typeof val2 === 'object';

        if (bothAreObjects && (val1 === null || val2 === null)) {
            bothAreObjects = false;
        }

        if ((!bothAreObjects && val1 != val2) || (bothAreObjects && !objectEquals(val1, val2))) {
            return false;
        }
    }

    return true;
}

/**
 * Check if two objects are equal and return first diff prop.
 *
 * @param {Object} _obj1
 * @param {Object} _obj2
 * @return {boolean}
 */
export function objectEqualsProp(_obj1 = {}, _obj2 = {}) {
    const keys1 = Object.keys(_obj1);
    let bothAreObjects = false;
    let prop = null;
    let val1;
    let val2;
    let ret = null;

    for (let i = 0, len = keys1.length; i < len; i++) {
        ret = null;

        prop = keys1[i];
        val1 = _obj1[prop];
        val2 = _obj2[prop];

        bothAreObjects = typeof val1 === 'object' && typeof val2 === 'object';

        if (bothAreObjects && (val1 === null || val2 === null)) {
            bothAreObjects = false;
        }

        if (!bothAreObjects && val1 != val2) {
            return {
                equals: false,
                prop,
            };
        } else if (bothAreObjects && !(ret = objectEqualsProp(val1, val2)).equals) {
            return ret;
        }
    }

    return {
        equals: true,
        prop: '',
    };
}

/**
 * Extend methods of a component.
 *
 * @param {*} _component Source component.
 * @param {array} _methods Array of method names to be extended.
 * @param {string} _refName Reference name ($refs.name) of source component.
 * @returns {{}}
 */
export function extendMethods(_component, _methods, _refName) {
    const compMethods = _component ? _component.methods : null;
    const methods = {};

    if (compMethods && _methods && _methods.length > 0 && _refName) {
        _methods.forEach(_methodName => {
            const method = compMethods[_methodName];

            if (method) {
                methods[_methodName] = function(..._args) {
                    const ref = this.$refs[_refName];

                    if (ref) {
                        return ref[_methodName](..._args);
                    }
                };
            }
        });
    }

    return methods;
}
