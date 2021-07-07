/**
 * Utility functions related to Function
 */

import { isPositiveInt } from './number.js';

/**
 * @param {*} func
 * @return {boolean}
 */
export function isFunction(func) {
    return typeof func === 'function';
}

/**
 * @param {int} n Positive integer
 * @return {Promise<unknown>}
 */
export function delay(n) {
    if (!isPositiveInt(n)) {
        throw new TypeError('Passed argument is not a positive integer');
    }

    return new Promise(resolve => {
        setTimeout(resolve, n);
    });
}

/**
 * Throttle/debounce function call.
 *
 * @param {function} func Function to be throttle
 * @param {int} [wait] Wait this amount of time in milliseconds to perform another call of the function (if it is not dismissed)
 * @param {boolean} [trailing] Indicates function call after `wait` amount of time is passed
 * @param {boolean} [leading] Indicates function call at the start
 * @param {int} [maxWait] Wait maximum of this amount of time in milliseconds to perform another call of the function
 * @return {function(...[*]): void}
 */
export function debounce(func, wait = 250, trailing = true, leading = false, maxWait = 0) {
    if (!isFunction(func)) {
        throw new TypeError('Argument `func` is not a function');
    }

    if (!isPositiveInt(wait)) {
        throw new TypeError('Argument `wait` is not a positive integer');
    }

    if (!isPositiveInt(maxWait)) {
        throw new TypeError('Argument `maxWait` is not a positive integer');
    }

    let prevCallTime = -1;
    let prevIntervalCallTime = -1;
    let timeoutId = -1;

    return (...args) => {
        prevCallTime = performance.now();

        if (timeoutId > -1) {
            clearTimeout(timeoutId);
            timeoutId = -1;
        } else {
            if (maxWait > 0) {
                prevIntervalCallTime = performance.now();
            }

            if (leading) {
                func(...args);
            }
        }

        if (maxWait > 0 && performance.now() - prevIntervalCallTime >= maxWait) {
            func(...args);
            prevIntervalCallTime = performance.now();
        }

        if (wait > 0) {
            timeoutId = setTimeout(() => {
                timeoutId = -1;

                if (trailing && performance.now() - prevCallTime >= wait) {
                    func(...args);
                }
            }, wait);
        } else {
            func(...args);
        }
    };
}

/**
 * Throttle function call.
 *
 * @param {function} func Function to be throttle
 * @param {int} interval Wait this amount of time in milliseconds to perform another call of the function
 * @param {boolean} [leading] Indicates function call at the start of return function calling
 * @param {boolean} [trailing] Indicates a function call after `interval` amount of time is passed after repeated calling of returned function
 * @return {function(...[*]): void}
 */
export function throttle(func, interval = 250, leading = false, trailing = true) {
    return debounce(func, interval, trailing, leading, interval);
}
