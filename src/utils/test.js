/**
 * Utility functions for testing
 */

/**
 * @param {function} func Function to be called
 * @param {int} [n] Number of calls
 * @param {int} [interval] Time span between two calls in milliseconds
 * @return {Promise<unknown>}
 */
export function callFunctionNTimes(func, n = 3, interval = 25) {
    return new Promise(resolve => {
        let counter = n;
        const intervalId = setInterval(() => {
            if (counter-- <= 0) {
                clearInterval(intervalId);
                resolve();
            } else {
                func();
            }
        }, interval);
    });
}
