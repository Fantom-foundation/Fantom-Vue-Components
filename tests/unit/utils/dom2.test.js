/**
 * Utility functions related to DOM
 */

import { expect, fixture } from '@open-wc/testing';
import { clearElement, getElement, nextElemsCount, prevElemsCount } from '../../../src/utils/dom2.js';

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

    describe('#clearElement', () => {
        it('should clear given element', async () => {
            const elem = await fixture('<div id="foo"><span>Lorem <span>ipsum</span></span> dolor <b>sit</b></div>');

            clearElement(elem);

            expect(elem.childNodes.length).to.equal(0);
        });
    });

    describe('#nextElemsCount', () => {
        it('should return count of previous element siblings', async () => {
            const elem = await fixture('<div><span>1</span><span>2</span><span>3</span><span>4</span></div>');

            expect(nextElemsCount(elem.querySelector('span:first-child'))).to.equal(3);
            expect(nextElemsCount(elem.querySelector('span:nth-child(4)'))).to.equal(0);
            expect(nextElemsCount(elem.querySelector('span:nth-child(40)'))).to.equal(0);
        });
    });

    describe('#prevElemsCount', () => {
        it('should return count of previous element siblings', async () => {
            const elem = await fixture('<div><span>1</span><span>2</span><span>3</span><span>4</span></div>');

            expect(prevElemsCount(elem.querySelector('span:nth-child(3)'))).to.equal(2);
            expect(prevElemsCount(elem.querySelector('span:first-child'))).to.equal(0);
        });
    });
});
