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

/**
 * @param {Element} elem
 */
export function nextElemsCount(elem, selector = '') {
    let count = 0;
    let el = elem;

    if (el && el.nextElementSibling) {
        el = el.nextElementSibling;
        while (el) {
            if (!selector || el.matches(selector)) {
                count += 1;
            }

            el = el.nextElementSibling;
        }
    }

    return count;
}

/**
 * @param {Element} elem
 */
export function prevElemsCount(elem, selector = '') {
    let count = 0;
    let el = elem;

    if (el && el.previousElementSibling) {
        el = el.previousElementSibling;
        while (el) {
            if (!selector || el.matches(selector)) {
                count += 1;
            }

            el = el.previousElementSibling;
        }
    }

    return count;
}
