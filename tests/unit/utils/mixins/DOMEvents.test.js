/**
 * Class mixin with DOM event utilities
 */

// eslint-disable-next-line max-classes-per-file
import { spy } from 'sinon';
import { expect } from '@open-wc/testing';
import { DOMEvents } from '../../../../src/utils/mixins/DOMEvents.js';
import { dispatchMouseEvent } from '../../../../src/utils/dom-events.js';

class FooClass {
    constructor({ ...args } = {}) {
        this._args = args;
    }
}
class MixClass extends DOMEvents(FooClass) {
    _onClick() {}

    _onMouseup() {}
}

describe('DOMEvents mixin', () => {
    let elem = null;
    let mc = null;

    beforeEach(() => {
        elem = document.createElement('div');
        mc = new MixClass({ foo: 123 });
    });

    afterEach(() => {
        elem = null;
        mc = null;
    });

    describe('on initialization', () => {
        it('should pass arguments to parent class', () => {
            const mic = new MixClass({ foo: 123 });

            expect(mic._args).to.deep.equal({ foo: 123 });
        });
    });

    describe('#bindEvent', () => {
        it('should add event listener to given html element', () => {
            const spyAddEventListener = spy(elem, 'addEventListener');

            mc.bindEvent(elem, 'click', () => {});

            dispatchMouseEvent(elem, 'click');

            expect(spyAddEventListener).to.be.calledOnce;
        });

        it('should use method from mixed class in form `_onEventname` as an event listener if no event listener is provided', () => {
            const spyOnClick = spy(mc, '_onClick');

            mc.bindEvent(elem, 'click');

            dispatchMouseEvent(elem, 'click');

            expect(spyOnClick).to.be.calledOnce;
        });
    });

    describe('#bindEvents', () => {
        it('should bind events given by list of event names with methods from mixed class as listeners', () => {
            const spyOnClick = spy(mc, '_onClick');
            const spyOnMouseup = spy(mc, '_onMouseup');

            mc.bindEvents(elem, ['click', 'mouseup']);

            dispatchMouseEvent(elem, 'click');
            dispatchMouseEvent(elem, 'mouseup');

            expect(spyOnClick).to.be.calledOnce;
            expect(spyOnMouseup).to.be.calledOnce;
        });
    });

    describe('#unbindEventByName', () => {
        it('should remove stored event listener', () => {
            const spyOnClick = spy(mc, '_onClick');

            mc.bindEvent(elem, 'click');
            dispatchMouseEvent(elem, 'click');

            mc.unbindEventByName('click');
            dispatchMouseEvent(elem, 'click');

            expect(mc._DOMEvents).to.deep.equal({});
            expect(spyOnClick).to.be.calledOnce;
        });
    });

    describe('#unbindAllEvents', () => {
        it('should correctly unbind all events', () => {
            mc.bindEvents(elem, ['click', 'mouseup']);

            mc.unbindAllEvents();

            expect(mc._DOMEvents).to.deep.equal({});
        });
    });

    describe('#_getMethodAsEventListener', () => {
        it('should return a method from mixed class with the name `_onEventname` if the method exists', () => {
            expect(mc._getMethodAsEventListener('click')).to.be.a('function');
        });

        it('should throw an error if `_onEventName` listener does not exists', () => {
            expect(() => {
                mc._getMethodAsEventListener('mousedown');
            }).to.throw();
        });
    });

    describe('#_storeEventListener', () => {
        it('should store event listeners by name and html element', () => {
            const listener = () => {};

            mc._storeEventListener(elem, 'click', listener);

            expect(mc._DOMEvents).to.deep.equal({
                click: [{ elem, eventListener: listener }],
            });
        });
    });

    describe('#_removeEventListerner', () => {
        it('should remove stored event listener', () => {
            const listener = () => {};

            mc._storeEventListener(elem, 'click', listener);
            mc._removeEventListerner('click');

            expect(mc._DOMEvents).to.deep.equal({});
        });
    });
});
