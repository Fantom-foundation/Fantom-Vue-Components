/**
 * Class for handling css media queries programmatically
 */

import { expect } from '@open-wc/testing';
import { spy } from 'sinon';
import { setViewport } from '@web/test-runner-commands';
import { Breakpoints } from '../../../src/utils/Breakpoints.js';
import { delay } from '../../../src/utils/function.js';

let bp = null;

function callback() {}

function destroyBreakpoints() {
    if (bp) {
        bp.destroy();
        bp = null;
    }
}

function createBreakpoints(options) {
    destroyBreakpoints();

    bp = new Breakpoints(options);
}

afterEach(() => {
    destroyBreakpoints();
});

describe('Breakpoints', () => {
    it('should throw an error if no breakpoins or callback are passed', () => {
        expect(createBreakpoints).to.throw();
    });

    it('should throw an error if given breakpoint has no `value` property', () => {
        expect(() => {
            createBreakpoints({
                breakpoints: [{}],
                callback,
            });
        }).to.throw();
    });

    it('should set the default query for the `media` property if it is not specified', () => {
        createBreakpoints({
            breakpoints: [{ value: '48em' }],
            callback,
        });

        const breakpoints = bp._breakpoints;

        expect(breakpoints[0].media).to.equal('only screen and (max-width: 48em)');
        expect(breakpoints[0].value).to.equal('48em');
        expect(breakpoints[0].min).to.be.undefined;
        expect(breakpoints[0].code).to.be.undefined;
    });

    it('should call callback function if breakpoint is reached', async () => {
        const spyCallback = spy(callback);

        createBreakpoints({
            breakpoints: [{ value: '640px', min: true, code: 'breakpoint1' }],
            callback: spyCallback,
        });

        await delay(20);

        expect(spyCallback).to.have.been.calledWith({
            value: '640px',
            media: 'only screen and (min-width: 640px)',
            code: 'breakpoint1',
            matches: true,
        });

        await setViewport({ width: 500, height: 640 });

        await delay(20);

        expect(spyCallback).to.have.been.calledWith({
            value: '640px',
            media: 'only screen and (min-width: 640px)',
            code: 'breakpoint1',
            matches: false,
        });

        expect(spyCallback).to.be.calledTwice;
    });
});
