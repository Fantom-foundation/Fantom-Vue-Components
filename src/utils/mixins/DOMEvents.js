// eslint-disable-next-line max-classes-per-file
import { uppercaseFirstChar } from '../../utils/string.js';

export const DOMEvents = BaseClass =>
    class extends (BaseClass || class {}) {
        constructor({ ...args } = {}) {
            super(args);

            /** Object used for storing event listeners. Keys are event names, values are objects { elem: HTMLElement, listener: function } */
            this._DOMEvents = {};
        }

        /**
         * @param {HTMLElement} elem
         * @param {string} eventName
         * @param {function} [eventListener]
         */
        bindEvent(elem, eventName, eventListener) {
            let listener = eventListener;

            if (!listener) {
                listener = this._getMethodAsEventListener(eventName);
            }

            const cListener = event => listener.call(this, event);

            elem.addEventListener(eventName, cListener);

            this._storeEventListener(elem, eventName, cListener);
        }

        /**
         * @param {HTMLElement} elem
         * @param {string[]} eventNames
         */
        bindEvents(elem, eventNames = []) {
            eventNames.forEach(eventName => {
                this.bindEvent(elem, eventName);
            });
        }

        /**
         * @param {string} eventName
         */
        unbindEventByName(eventName) {
            const bindings = this._DOMEvents[eventName];

            if (bindings) {
                bindings.forEach(binding => {
                    binding.elem.removeEventListener(eventName, binding.eventListener);
                });

                this._removeEventListerner(eventName);
            }
        }

        unbindAllEvents() {
            Object.keys(this._DOMEvents).forEach(eventName => {
                this.unbindEventByName(eventName);
            });
        }

        /**
         * Get method with name `onEventname` from mixed class
         *
         * @param {string} eventName
         * @return {function}
         * @private
         */
        _getMethodAsEventListener(eventName) {
            const methodName = `_on${uppercaseFirstChar(eventName)}`;
            const listener = this[methodName];

            if (!listener) {
                throw new Error(`No method ${methodName} defined`);
            }

            return listener;
        }

        /**
         * @param {HTMLElement} elem
         * @param {string} eventName
         * @param {function} eventListener
         * @private
         */
        _storeEventListener(elem, eventName, eventListener) {
            if (!(eventName in this._DOMEvents)) {
                this._DOMEvents[eventName] = [];
            }

            this._DOMEvents[eventName].push({ elem, eventListener });
        }

        /**
         * @param {string} eventName
         * @private
         */
        _removeEventListerner(eventName) {
            const bindings = this._DOMEvents[eventName];

            if (bindings) {
                bindings.forEach(binding => {
                    // eslint-disable-next-line no-param-reassign
                    delete binding.elem;
                    // eslint-disable-next-line no-param-reassign
                    delete binding.eventListener;
                });

                delete this._DOMEvents[eventName];
            }
        }
    };
