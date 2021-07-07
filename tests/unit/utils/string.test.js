/**
 * Utility functions related to String
 */

import { expect } from '@open-wc/testing';
import {
    isString,
    uppercaseFirstChar,
    lowercaseFirstChar,
    toCamelCase,
    toKebabCase,
    toPascalCase,
} from '../../../src/utils/string.js';

describe('String utilities', () => {
    describe('#isString', () => {
        it('should return true if given argument is a string', () => {
            expect(isString('')).to.be.true;
            expect(isString('foo')).to.be.true;
        });

        it('should return false if given argument is not a number', () => {
            expect(isString()).to.be.false;
            expect(isString(1)).to.be.false;
            expect(isString([])).to.be.false;
            expect(isString(null)).to.be.false;
        });
    });

    describe('#uppercaseFirstChar', () => {
        it('should return string with first letter capitalized', () => {
            expect(uppercaseFirstChar('foo')).to.equal('Foo');
            expect(uppercaseFirstChar('život')).to.equal('Život');
        });

        it('should return empty string, if no argument is given', () => {
            expect(uppercaseFirstChar()).to.equal('');
        });

        it('should return empty string, if non string argument is given', () => {
            expect(uppercaseFirstChar(1)).to.equal('');
            expect(uppercaseFirstChar([])).to.equal('');
            expect(uppercaseFirstChar(null)).to.equal('');
        });
    });

    describe('#lowercaseFirstChar', () => {
        it('should return string with first letter lowercased', () => {
            expect(lowercaseFirstChar('Foo')).to.equal('foo');
            expect(lowercaseFirstChar('Život')).to.equal('život');
        });

        it('should return empty string, if non string argument is given', () => {
            expect(lowercaseFirstChar()).to.equal('');
            expect(lowercaseFirstChar(1)).to.equal('');
        });
    });

    describe('#toCamelCase', () => {
        it('should return string in camel case', () => {
            expect(toCamelCase('Foo-Boo-coo')).to.equal('fooBooCoo');
            expect(toCamelCase('Foo  boo__coo ')).to.equal('fooBooCoo');
            expect(toCamelCase('-Foo_boo Coo')).to.equal('fooBooCoo');
            expect(toCamelCase('foo')).to.equal('foo');
            expect(toCamelCase('Foo')).to.equal('foo');
        });

        it('should return lowercase character if string of length 1 is given', () => {
            expect(toCamelCase('f')).to.equal('f');
            expect(toCamelCase('F')).to.equal('f');
        });

        it('should return empty string, if non string argument is given', () => {
            expect(toCamelCase()).to.equal('');
            expect(toCamelCase(1)).to.equal('');
            expect(toCamelCase([])).to.equal('');
            expect(toCamelCase(null)).to.equal('');
        });
    });

    describe('#toKebabCase', () => {
        it('should return string in kebab case', () => {
            expect(toKebabCase('fooBooCoo')).to.equal('foo-boo-coo');
            expect(toKebabCase('Foo  boo__COO')).to.equal('foo-boo-c-o-o');
            expect(toKebabCase('--Foo_boo Coo')).to.equal('foo-boo-coo');
            expect(toKebabCase('foo')).to.equal('foo');
            expect(toKebabCase('Foo')).to.equal('foo');
        });

        it('should return lowercase character if string of length 1 is given', () => {
            expect(toKebabCase('f')).to.equal('f');
            expect(toKebabCase('F')).to.equal('f');
        });

        it('should return empty string, if non string argument is given', () => {
            expect(toKebabCase()).to.equal('');
            expect(toKebabCase(1)).to.equal('');
            expect(toKebabCase([])).to.equal('');
            expect(toKebabCase(null)).to.equal('');
        });
    });

    describe('#toPascalCase', () => {
        it('should return string in pascal case', () => {
            expect(toPascalCase('fooBooCoo')).to.equal('Fooboocoo');
            expect(toPascalCase('foo-boo-coo')).to.equal('FooBooCoo');
            expect(toPascalCase('Foo  boo__COO')).to.equal('FooBooCOO');
            expect(toPascalCase('--Foo_boo Coo')).to.equal('FooBooCoo');
            expect(toPascalCase('foo')).to.equal('Foo');
            expect(toPascalCase('Foo')).to.equal('Foo');
        });

        it('should return lowercase character if string of length 1 is given', () => {
            expect(toPascalCase('f')).to.equal('F');
            expect(toPascalCase('F')).to.equal('F');
        });

        it('should return empty string, if non string argument is given', () => {
            expect(toPascalCase()).to.equal('');
            expect(toPascalCase(1)).to.equal('');
            expect(toPascalCase([])).to.equal('');
            expect(toPascalCase(null)).to.equal('');
        });
    });
});
