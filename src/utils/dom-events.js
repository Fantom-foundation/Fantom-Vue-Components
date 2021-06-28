/**
 * Utility functions related to DOM events
 */

const defaultEventInitDict = {
    bubbles: true,
    cancelable: true,
    view: window,
};

export function dispatchMouseEvent(elem, eventName, options = defaultEventInitDict) {
    elem.dispatchEvent(new MouseEvent(eventName, options));
}
