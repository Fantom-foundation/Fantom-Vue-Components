import { getElement } from './dom2.js';
import { throttle } from './function.js';
import { DOMEvents } from './mixins/DOMEvents.js';

/**
 * Controller for handling `mouseover` actions. Proxy for `mouseenter` and `mouseleave` events.
 */
export class MouseoverController extends DOMEvents() {
    /**
     * @param {string|HTMLElement} container CSS selector or html element representing the wrapper element to which mouse events will be bound
     * @param {string} elemSelector CSS selector representing the tracked element(s)
     * @param {int} throttleInterval Interval in milliseconds for throttling mouseover event listener
     * @param {function} [onElemEnter] Function called when the mouse enters the tracked element
     * @param {function} [onElemLeave] Function called when the mouse leaves the tracked element
     */
    constructor({ container = '', elemSelector = '', throttleInterval = 0, onElemEnter = null, onElemLeave = null }) {
        super();

        /** Container element */
        this.eContainer = getElement(container);
        this.elemSelector = elemSelector;
        this.throttleInterval = throttleInterval;
        this.onElemEnter = onElemEnter;
        this.onElemLeave = onElemLeave;
        /** Currently hovered element */
        this._eCurrElem = null;
        /** Indicates that the mouse has entered the container */
        this._entered = false;

        if (!this.eContainer) {
            throw new Error('No container element found');
        }

        if (!this.elemSelector) {
            throw new Error('No `elemSelector` given');
        }

        if (!this.onElemEnter && !this.onElemLeave) {
            throw new Error('Neither `onElemEnter` nor `onElemLeave` is given');
        }

        this._bindEvents();
    }

    /**
     * Call before MouseoverController instance is destroyed
     */
    destroy() {
        this.unbindAllEvents();
    }

    /**
     * @param {HTMLElement} elem
     * @param {MouseEvent} [event]
     */
    testElem(elem, event) {
        const el = elem.closest(this.elemSelector);

        if (!el) {
            this._elemLeaved(event);
        }

        if (el) {
            if (el !== this._eCurrElem) {
                this._elemLeaved(event);
                this._elemEntered(el, event);
            }
        }
    }

    /**
     * @param {HTMLElement} elem
     * @param {MouseEvent} event
     */
    _elemEntered(elem, event) {
        const { onElemEnter } = this;

        this._eCurrElem = elem;

        if (onElemEnter && typeof onElemEnter === 'function') {
            onElemEnter(elem, event);
        }
    }

    /**
     * @param {MouseEvent} event
     */
    _elemLeaved(event) {
        const { onElemLeave } = this;

        if (this._eCurrElem !== null) {
            if (onElemLeave && typeof onElemLeave === 'function') {
                onElemLeave(this._eCurrElem, event);
            }

            this._eCurrElem = null;
        }
    }

    /**
     * @param {HTMLElement} elem
     */
    _bindEvents(elem = this.eContainer) {
        if (!elem) {
            return;
        }

        if (this.throttleInterval > 0) {
            this.bindEvent(
                elem,
                'mouseover',
                throttle(
                    event => {
                        this._onMouseover(event);
                    },
                    this.throttleInterval,
                    true
                )
            );
        } else {
            this.bindEvent(elem, 'mouseover');
        }

        this.bindEvents(elem, ['mouseenter', 'mouseleave']);
    }

    /**
     * @param {MouseEvent} event
     */
    _onMouseover(event) {
        if (this._entered) {
            this.testElem(event.target, event);
        }
    }

    _onMouseenter() {
        this._entered = true;
    }

    /**
     * @param {MouseEvent} event
     */
    _onMouseleave(event) {
        this._entered = false;
        this._elemLeaved(event);
    }
}
