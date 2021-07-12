/**
 * @param {[]} array
 * @return {boolean}
 */
export function isArray(array) {
    return Array.isArray(array);
}

/**
 * @param {[]} array
 * @return {boolean}
 */
export function isNonEmptyArray(array) {
    return Array.isArray(array) && array.length > 0;
}

export function shuffle(_array) {
    for (let i = _array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

        [_array[i], _array[j]] = [_array[j], _array[i]];
    }
}

/**
 * @param {array} _array1
 * @param {array} _array2
 * @return {boolean}
 */
export function arrayEquals(_array1, _array2) {
    return (
        isArray(_array1) &&
        isArray(_array2) &&
        _array1.length === _array2.length &&
        _array1.every((_val, _index) => _val === _array2[_index])
    );
}
