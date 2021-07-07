/**
 * Controller for handling `mouseover` actions. Proxy for `mouseover` and `mouseleave` events.
 */

import { expect, fixture } from '@open-wc/testing';
import { spy, stub } from 'sinon';
import { MouseoverController } from '../../../src/utils/MouseoverController.js';
import { dispatchMouseEvent } from '../../../src/utils/dom-events.js';
import { callFunctionNTimes } from '../../../src/utils/test.js';

let mouseoverController = null;
let eContainer = null;

function createMouseoverController(
    options = {
        container: document.body,
        elemSelector: '.mouseover',
        onElemEnter() {},
        onElemLeave() {},
    },
    throttleInterval
) {
    if (throttleInterval) {
        // eslint-disable-next-line no-param-reassign
        options.throttleInterval = throttleInterval;
    }

    mouseoverController = new MouseoverController(options);
}

function destroyMouseoverController() {
    if (mouseoverController) {
        mouseoverController.destroy();
        mouseoverController = null;
    }
}

async function createContainer() {
    eContainer = await fixture(`
        <div id="container">
            <div id="elem1" class="mouseover"><i>elem1</i></div>
            <div id="elem2" class="mouseover"><i>elem2</i></div>
            <div id="notElemSelector"><i>notElemSelector</i></div>
        </div>
    `);

    document.body.appendChild(eContainer);
}

function removeContainer() {
    if (eContainer) {
        eContainer.remove();
        eContainer = null;
    }
}

describe('MouseoverController', () => {
    beforeEach(async () => {
        await createContainer();
    });

    afterEach(() => {
        destroyMouseoverController();
        removeContainer();
    });

    describe('on initialization', () => {
        it('should throw an exception if `container` element is not found or given', () => {
            const errorMessage = 'No container element found';

            expect(() => {
                createMouseoverController({});
            }).to.throw(errorMessage);

            destroyMouseoverController();

            expect(() => {
                createMouseoverController({ container: '#foo' });
            }).to.throw(errorMessage);

            destroyMouseoverController();

            expect(() => {
                createMouseoverController({ container: '#container' });
            }).not.to.throw(errorMessage);
        });

        it('should throw an exception if `elemSelector` is not given', () => {
            expect(() => {
                createMouseoverController({ container: '#container' });
            }).to.throw('No `elemSelector` given');
        });

        it('should throw an exception if neither `onElemEnter` nor `onElemLeave` is given', () => {
            expect(() => {
                createMouseoverController({ container: '#container', elemSelector: '#container' });
            }).to.throw('Neither `onElemEnter` nor `onElemLeave` is given');
        });

        it('should bind events on the container element', () => {
            const stubBindEvents = stub(MouseoverController.prototype, '_bindEvents');

            createMouseoverController();

            stubBindEvents.restore();
            expect(stubBindEvents).to.be.calledOnce;
        });
    });

    describe('throttling', () => {
        it('should throttle mouseover event if `throttleInterval` parameter is passed', async () => {
            createMouseoverController(undefined, 50);

            const spyOnMouseover = spy(mouseoverController, '_onMouseover');
            const eElem1 = eContainer.querySelector('#elem1');

            await callFunctionNTimes(
                () => {
                    dispatchMouseEvent(eElem1, 'mouseover');
                },
                21,
                10
            );

            expect(spyOnMouseover).to.have.callCount(4);
        });
    });

    describe('#destroy', () => {
        it('should remove all event listeners from the container element', () => {
            createMouseoverController();

            mouseoverController.destroy();

            expect(mouseoverController._DOMEvents).to.deep.equal({});
        });
    });

    describe('#testElem', () => {
        it('should call `onElemEnter` method if given element is `elemSelector` or child of `elemSelector` and different from currently hovered element', () => {
            createMouseoverController();

            const spyOnElemEnter = spy(mouseoverController, 'onElemEnter');

            mouseoverController.testElem(eContainer.querySelector('#elem1'));
            mouseoverController.testElem(eContainer.querySelector('#elem1 i'));
            mouseoverController.testElem(eContainer.querySelector('#elem2 i'));

            expect(spyOnElemEnter).to.be.calledTwice;
        });

        it('should call `onElemLeave` method if given element is not `elemSelector` or child of `elemSelector` and hovered element exists', () => {
            createMouseoverController();

            const spyOnElemLeave = spy(mouseoverController, 'onElemLeave');

            mouseoverController.testElem(eContainer.querySelector('#elem1'));
            mouseoverController.testElem(eContainer.querySelector('#notElemSelector'));

            expect(spyOnElemLeave).to.be.calledOnce;
        });

        it('should call `onElemLeave` method on previous element and then `onElemEnter` on new element', () => {
            createMouseoverController();

            const spyOnElemEnter = spy(mouseoverController, 'onElemEnter');
            const spyOnElemLeave = spy(mouseoverController, 'onElemLeave');

            mouseoverController.testElem(eContainer.querySelector('#elem1'));
            mouseoverController.testElem(eContainer.querySelector('#elem2'));

            expect(spyOnElemEnter).to.be.calledTwice;
            expect(spyOnElemLeave).to.be.calledOnce;
        });
    });

    describe('#_bindEvents', () => {
        it('should add the correct event listeners to given element', () => {
            createMouseoverController();

            const spyAddEventListener = spy(eContainer, 'addEventListener');

            mouseoverController._bindEvents(eContainer);

            expect(spyAddEventListener).to.have.calledWith('mouseover');
            expect(spyAddEventListener).to.have.calledWith('mouseenter');
            expect(spyAddEventListener).to.have.calledWith('mouseleave');
        });
    });

    describe('#_onMouseover', () => {
        it('should test given target element', () => {
            createMouseoverController();

            const spyTestElem = spy(mouseoverController, 'testElem');

            dispatchMouseEvent(eContainer, 'mouseenter');
            dispatchMouseEvent(eContainer.querySelector('#elem1 i'), 'mouseover');
            dispatchMouseEvent(eContainer.querySelector('#notElemSelector'), 'mouseover');

            expect(spyTestElem).to.be.calledTwice;
        });
    });

    describe('#_onMouseleave', () => {
        it('should call `onElemLeave` when element is hovered and mouse is leaving container', () => {
            createMouseoverController();

            const spyOnElemLeave = spy(mouseoverController, 'onElemLeave');

            dispatchMouseEvent(eContainer, 'mouseenter');
            dispatchMouseEvent(eContainer.querySelector('#elem1'), 'mouseover');
            dispatchMouseEvent(eContainer, 'mouseleave');

            expect(spyOnElemLeave).to.be.calledOnce;
        });
    });
});
