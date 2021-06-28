import { getElement } from './dom2.js';

/**
 * Controller for handling `mouseover` actions. Proxy for `mouseenter` and `mouseleave` events.
 */
export class MouseoverController {
    /**
     * @param {string|HTMLElement} container CSS selector or html element representing the wrapper element to which mouse events will be bound
     * @param {string} elemSelector CSS selector representing the tracked element(s)
     * @param {function} [onElemEnter] Function called when the mouse enters the tracked element
     * @param {function} [onElemLeave] Function called when the mouse leaves the tracked element
     */
    constructor({ container = '', elemSelector = '', onElemEnter = null, onElemLeave = null }) {
        /** Container element */
        this.eContainer = getElement(container);
        this.elemSelector = elemSelector;
        this.onElemEnter = onElemEnter;
        this.onElemLeave = onElemLeave;
        /** Currently hovered element */
        this._eCurrElem = null;
        /** `mouseover` event listener */
        this.__onMouseover = null;
        /** `mouseleave` event listener */
        this.__onMouseleave = null;

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
        this._unbindEvents();
    }

    /**
     * @param {HTMLElement} elem
     * @param {MouseEvent} event
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

        this.__onMouseover = event => {
            this._onMouseover(event);
        };
        this.__onMouseleave = event => {
            this._onMouseleave(event);
        };

        elem.addEventListener('mouseover', this.__onMouseover);
        elem.addEventListener('mouseleave', this.__onMouseleave);
    }

    /**
     * @param {HTMLElement} elem
     */
    _unbindEvents(elem = this.eContainer) {
        if (this.__onMouseover !== null) {
            elem.removeEventListener('mouseover', this.__onMouseover);
        }

        if (this.__onMouseleave !== null) {
            elem.removeEventListener('mouseleave', this.__onMouseleave);
        }
    }

    /**
     * @param {MouseEvent} event
     */
    _onMouseover(event) {
        this.testElem(event.target, event);
    }

    /**
     * @param {MouseEvent} event
     */
    _onMouseleave(event) {
        this._elemLeaved(event);
    }
}
