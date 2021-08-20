/**
 * Get element by selector.
 *
 * @param {string|Element} selector CSS selector or html element
 * @return {Element|null}
 */
export function getElement(selector) {
    if (typeof selector === 'string' && selector !== '') {
        return document.querySelector(selector);
    }

    return selector || null;
}

/**
 * @param {Element} elem
 */
export function clearElement(elem) {
    while (elem && elem.hasChildNodes()) {
        elem.removeChild(elem.firstChild);
    }
}
