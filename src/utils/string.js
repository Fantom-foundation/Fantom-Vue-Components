/**
 * Utility functions related to String
 */

const uppercaseCharsRE = /([A-Z])/;
const camelSplitRE = /[ _-]+/;
const kebabSplitRE = /([A-Z]|[ _-]+)/;

export function isString(str) {
    return typeof str === 'string';
}

/**
 * Uppercase first char of string `string`.
 *
 * @param {string} str
 * @return {string}
 */
export function uppercaseFirstChar(str) {
    if (str && isString(str)) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return '';
}

/**
 * Lowercase first char of string `string`.
 *
 * @param {string} str
 * @return {string}
 */
export function lowercaseFirstChar(str) {
    if (str && isString(str)) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    }

    return '';
}

/**
 * @param {string} str
 * @return {string}
 */
export function toCamelCase(str) {
    let spl;

    if (str && isString(str)) {
        spl = str.split(camelSplitRE);

        if (spl.length > 1) {
            spl = spl.filter(_val => _val !== '');

            spl[0] = lowercaseFirstChar(spl[0]);

            for (let i = 1, len1 = spl.length; i < len1; i += 1) {
                spl[i] = uppercaseFirstChar(spl[i]);
            }
        } else {
            return str.toLowerCase();
        }

        return spl.join('');
    }

    return '';
}

/**
 * @param {string} str
 * @return {string}
 */
export function toKebabCase(str) {
    let spl_;
    const spl = [];

    if (str && isString(str)) {
        spl_ = str.split(kebabSplitRE);

        if (spl_.length > 1) {
            spl_ = spl_.filter(_val => !camelSplitRE.test(_val));

            for (let i = 0, len1 = spl_.length; i < len1; i += 1) {
                if (i < len1 - 1 && uppercaseCharsRE.test(spl_[i])) {
                    spl.push(lowercaseFirstChar(spl_[i]) + spl_[i + 1]);
                    i += 1;
                } else if (spl_[i]) {
                    spl.push(lowercaseFirstChar(spl_[i]));
                }
            }
        } else {
            return str;
        }

        return spl.join('-');
    }

    return '';
}

/**
 * @param {string} _str
 */
export function toPascalCase(_str) {
    return uppercaseFirstChar(toCamelCase(_str));
}
