//https://stackoverflow.com/questions/7244246/generate-an-rfc-3339-timestamp-similar-to-google-tasks-api

/**
 * @param {number} _n
 * @returns {string|*}
 */
export function pad(_n) {
    return _n < 10 ? '0' + _n : _n;
}
