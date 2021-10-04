/**
 * Utility functions for testing
 */

import { toKebabCase } from './string.js';

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

/**
 * Disable console error messages.
 *
 * @param {function} func
 */
export function disableErrorMessages(func) {
    const originalConsoleError = console.error;
    console.error = () => {};

    func();

    console.error = originalConsoleError;
}

/**
 * Playground for testing v-model of a Vue component.
 *
 * @param {Vue} component
 * @param {Object} data
 * @return {{dValue}|{template: `<${string} v-model="dValue" ${string} />`, components: {}, data(): {dValue: *}, props: string[]}}
 */
export function getVModelComponent(component, data = {}) {
    const componentName = component.name;
    let attributes = [];

    Object.keys(data).forEach(key => {
        attributes.push(`:${key}="${key}"`);
    });

    return {
        components: { [componentName]: component },
        template: `<${toKebabCase(componentName)} v-model="dValue" ${attributes.join(' ')} />`,
        props: ['value'],
        data() {
            return {
                dValue: this.value,
                ...data,
            };
        },
    };
}

/**
 * @param {Object} wrapper
 */
export function destroyWrapper(wrapper) {
    if (wrapper) {
        wrapper.destroy();
        wrapper = null;
    }
}
