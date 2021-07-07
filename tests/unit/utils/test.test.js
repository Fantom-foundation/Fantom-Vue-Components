/**
 * Utility functions for testing
 */

import { expect } from '@open-wc/testing';
import { spy } from 'sinon';
import { callFunctionNTimes } from '../../../src/utils/test.js';

describe('Test utilities', () => {
    describe('#callFunctionNTimes', () => {
        it('should call given function `func` `n` times with `interval` time span between two calls', async () => {
            const spyFunc = spy(() => {});
            const t = performance.now();

            await callFunctionNTimes(spyFunc, 5, 20);

            expect(spyFunc).to.have.callCount(5);
            expect(performance.now() - t).is.greaterThan(6 * 20);
        });
    });
});
