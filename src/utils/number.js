/**
 * Utility functions related to Number
 */

/**
 * @param {number} num
 * @return {boolean}
 */
export function isNumber(num) {
    return typeof num === 'number';
}

/**
 * Checks if given number is an integer greater or equal to 0
 *
 * @param {number} num
 * @return {boolean}
 */
export function isPositiveInt(num) {
    return Number.isInteger(num) && num >= 0;
}

/**
 * Returns random positive integer between 0 and n - 1.
 *
 * @param {number} n Positive integer
 * @return {number}
 */
export function randInt(n = 1) {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(parseInt(n, 10)) || n < 0) {
        throw new Error('Not a positive integer');
    }

    return Math.floor(Math.random() * n);
}
