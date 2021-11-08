/* eslint-disable no-undef */

export function spyDateNow(date) {
    return jest.spyOn(Date, 'now').mockImplementation(() => (typeof date === 'function' ? date() : date));
}

/* eslint-enable no-undef */
