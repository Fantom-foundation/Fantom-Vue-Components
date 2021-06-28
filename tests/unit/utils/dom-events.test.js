/**
 * Utility functions related to DOM events
 */

import { expect, fixture } from '@open-wc/testing';
import { spy } from 'sinon';
import { dispatchMouseEvent } from '../../../src/utils/dom-events.js';

let eContainer = null;

async function createContainer() {
    eContainer = await fixture(`
        <div id="container">
            <div id="elem1" class="elem">elem1</div>
            <div id="elem2" class="elem">elem2</div>
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

function addContainerEventListener(eventName, callback) {
    if (eContainer) {
        eContainer.addEventListener(eventName, callback);
    }
}

function removeContainerEventListener(eventName, callback) {
    if (eContainer) {
        eContainer.removeEventListener(eventName, callback);
    }
}

describe('DOM event utilities', () => {
    beforeEach(async () => {
        await createContainer();
    });

    afterEach(() => {
        removeContainer();
    });

    describe('#dispatchMouseEvent', () => {
        it('should dispatch correct mouse event', () => {
            const spyAddEventListener = spy(() => {});

            addContainerEventListener('mousedown', spyAddEventListener);

            dispatchMouseEvent(document.getElementById('elem1'), 'mousedown');

            expect(spyAddEventListener).to.have.callCount(1);

            removeContainerEventListener('mousedown', spyAddEventListener);
        });
    });
});
