import { isObject } from './index.js';

const lengthAndUnitRE = /([\d.]+)([\w%]*)/;

/**
 * Parse length of css property - like '200px', '50%', ...
 *
 * @param {string} _value
 * @return {{unit: string, len: number}}
 */
export function getLengthAndUnit(_value) {
    const match = typeof _value === 'string' ? lengthAndUnitRE.exec(_value) : null;
    const obj = { len: 0, unit: '' };

    if (match && match.length === 3) {
        obj.len = parseFloat(match[1]);
        // eslint-disable-next-line prefer-destructuring
        obj.unit = match[2];
    }

    return obj;
}

/**
 * @param {HTMLElement} _elem
 * @param {object} [_style]
 * @param {boolean} [_toFloat]
 * @return {object}
 */
export function getComputedStyle(_elem, _style, _toFloat) {
    let css = {};
    let cStyle;
    let val;
    let propVal = '';

    if (_elem) {
        cStyle = window.getComputedStyle(_elem);

        if (isObject(_style)) {
            for (const prop in _style) {
                if (prop in cStyle || (propVal = cStyle.getPropertyValue(prop)) !== '') {
                    // console.log('???', prop, prop.indexOf('--'));
                    if (propVal !== '') {
                        // css custom property
                        val = propVal;
                        propVal = '';
                    } else {
                        val = cStyle[prop];
                    }
                    // _style[prop] = cStyle[toKebabCase(prop)];
                    _style[prop] = val;

                    if (_toFloat) {
                        _style[prop] = parseFloat(_style[prop]);
                    }
                }
            }

            css = _style;
        } else {
            css = cStyle;
        }
    }

    return css;
}

export function getComputedCustomProperty(_customProperty, _cssProperty) {
    let elem = document.createElement('div');
    let value;

    if (_customProperty && _cssProperty) {
        elem.style[_cssProperty] = `var(${_customProperty})`;

        document.body.append(elem);

        value = window.getComputedStyle(elem)[_cssProperty];

        elem.remove();
    }

    elem = null;

    return value;
}

export function getCustomProperty(_customProperty = '', _computedCssProperty = '', _elem = document.documentElement) {
    let value = _customProperty ? window.getComputedStyle(_elem).getPropertyValue(_customProperty) : '';

    if (_computedCssProperty && value) {
        value = getComputedCustomProperty(_customProperty, _computedCssProperty);
    }

    return value;
}

export function getCustomProperties(
    _customProperties = [],
    _computedCssProperty = '',
    _elem = document.documentElement
) {
    const elemStyle = window.getComputedStyle(_elem);
    const values = [];

    if (elemStyle) {
        _customProperties.forEach(_customProperty => {
            let value = elemStyle.getPropertyValue(_customProperty);

            if (_computedCssProperty && value) {
                value = getComputedCustomProperty(_customProperty, _computedCssProperty);
            }

            values.push(value);
        });
    }

    return values;
}

export function setCustomProperty(_customProperty = '', _value = '', _elem = document.documentElement) {
    _elem.style.setProperty(_customProperty, _value);
}
