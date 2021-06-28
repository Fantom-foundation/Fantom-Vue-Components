/**
 * Utility functions related to DOM
 */

import { expect, fixture } from '@open-wc/testing';
import { getElement } from '../../../src/utils/dom2.js';

describe('DOM utilities', () => {
    describe('#getElement', () => {
        it('should return found html element if given element is an css selector', async () => {
            const elem = await fixture('<div id="foo"></div>');

            document.body.appendChild(elem);

            expect(getElement('#foo')).to.equal(elem);

            elem.remove();
        });

        it('should return null if given element is an css selector and element is not found', () => {
            expect(getElement('#foo')).to.be.null;
        });

        it('should return null if given element is not an css selector or element', () => {
            expect(getElement()).to.be.null;
        });

        it('should return null if given element is an empty string', () => {
            expect(getElement('')).to.be.null;
        });

        it('should return the same element if given element is an html element', async () => {
            const elem = await fixture('<div id="foo"></div>');

            expect(getElement(elem)).to.equal(elem);
        });
    });
});
