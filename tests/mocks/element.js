/* eslint-disable no-undef */

/**
 * Mock a getter of html element.
 *
 * @param {HTMLElement} element
 * @param {string} getter
 * @param {*} value
 * @return {jest.SpyInstance<*, []>}
 */
export function spyElementGetter(element, getter, value) {
    return jest.spyOn(element, getter, 'get').mockImplementation(() => (typeof value === 'function' ? value() : value));
}

/* eslint-enable no-undef */
