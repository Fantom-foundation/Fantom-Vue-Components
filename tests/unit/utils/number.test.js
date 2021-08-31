/**
 * Utility functions related to Number
 */

import { expect } from '@open-wc/testing';
import { clamp, isNumber, isPositiveInt, randInt } from '../../../src/utils/number.js';

describe('Number utilities', () => {
    describe('#isNumber', () => {
        it('should return true if given argument is a number', () => {
            expect(isNumber(1)).to.be.true;
            expect(isNumber(1.1)).to.be.true;
        });

        it('should return false if given argument is not a number', () => {
            expect(isNumber()).to.be.false;
            expect(isNumber('string')).to.be.false;
            expect(isNumber([])).to.be.false;
            expect(isNumber(null)).to.be.false;
        });
    });

    describe('#isPositiveInt', () => {
        it('should return false if given argument is float', () => {
            expect(isPositiveInt(1.23)).to.be.false;
        });

        it('should return false if given argument is negative integer', () => {
            expect(isPositiveInt(-1)).to.be.false;
        });

        it('should return true if given argument is a positive integer', () => {
            expect(isPositiveInt(0)).to.be.true;
            expect(isPositiveInt(1)).to.be.true;
        });

        it('should return false if given argument is not a number', () => {
            expect(isPositiveInt()).to.be.false;
            expect(isPositiveInt('string')).to.be.false;
            expect(isPositiveInt([])).to.be.false;
            expect(isPositiveInt(null)).to.be.false;
        });
    });

    describe('#randInt', () => {
        it('should return number between 0 and n - 1 if positive integer n is given', () => {
            expect(randInt(10)).to.be.within(0, 10);
        });

        it('should return number between 0 and 1 if no argument is given', () => {
            expect(randInt()).to.be.within(0, 1);
        });

        it('should throw an error if given argument is not positive integer', () => {
            expect(() => randInt(-1)).to.throw();
            expect(() => randInt('string')).to.throw();
        });
    });

    describe('#clamp', () => {
        it('should clamp given number', () => {
            expect(clamp(10, -10, 100)).to.be.within(-10, 100);
            expect(clamp(-20, -10, 100)).to.be.within(-10, 100);
            expect(clamp(200, -10, 100)).to.be.within(-10, 100);
        });

        it('should throw an error if min > max', () => {
            expect(() => clamp(10, 100, -10)).to.throw();
        });

        it('should return `min` value if given number is not a number', () => {
            expect(clamp({}, -10, 100)).to.equal(-10);
        });
    });
});
