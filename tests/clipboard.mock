/* eslint-disable no-undef */

Object.defineProperty(navigator, 'clipboard', {
    writable: true,
    value: {
        writeText: jest.fn(() => {
            return new Promise(resolve => {
                resolve();
            });
        }),
    },
});

/* eslint-enable no-undef */
