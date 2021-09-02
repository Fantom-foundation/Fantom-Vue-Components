import { mount } from '@vue/test-utils';
import FCircleProgress from '@/components/FCircleProgress/FCircleProgress.vue';
import { disableErrorMessages } from '@/utils/test.js';
import { getCustomProperty } from '../../src/utils/css.js';

let wrapper = null;

function destroyWrapper(wrapper) {
    if (wrapper) {
        wrapper.destroy();
        wrapper = null;
    }
}

function createWrapper({ propsData = { value: 10, min: 0, max: 100 }, slots = {} } = {}) {
    return mount(FCircleProgress, {
        propsData,
        slots,
    });
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FCircleProgress', () => {
    it('should render correctly', () => {
        wrapper = createWrapper();

        expect(wrapper.element).toMatchSnapshot();
    });

    it('should throw an error if `min` is greater than `max`', () => {
        disableErrorMessages(function() {
            expect(() => {
                createWrapper({
                    propsData: {
                        min: 100,
                        max: 50,
                    },
                });
            }).toThrow();
        });
    });

    it('should clamp given value', async () => {
        wrapper = createWrapper({
            propsData: {
                value: -10,
            },
        });

        expect(wrapper.vm.cValue).toBe(0);

        await wrapper.setProps({ value: 200 });

        expect(wrapper.vm.cValue).toBe(100);
    });

    it('should not clamp max value if `canExceed` is set to `true`', async () => {
        wrapper = createWrapper({
            propsData: {
                value: -10,
                canExceed: true,
            },
        });

        expect(wrapper.vm.cValue).toBe(0);

        await wrapper.setProps({ value: 200 });

        expect(wrapper.vm.cValue).toBe(200);
    });

    it('should convert given value to percentages if `convertToPercentages` prop is `true`', () => {
        wrapper = createWrapper({
            propsData: {
                value: 60,
                min: 20,
                max: 100,
                convertToPercentages: true,
            },
        });

        expect(
            wrapper
                .find('.fcircleprogress_value')
                .text()
                .replace(/[ \n\r\t]/g, '')
        ).toBe('50%');
    });

    it('should apply css style to the text element if value is within given range and `styles` prop is given', async () => {
        wrapper = createWrapper({
            propsData: {
                styles: [
                    {
                        value: 0,
                        textStyle: { fill: 'red' },
                    },
                    {
                        value: 40,
                        textStyle: { fill: 'orange' },
                    },
                    {
                        value: 80,
                        textStyle: { fill: 'green' },
                    },
                ],
            },
        });

        const elem = wrapper.find('.fcircleprogress_value').element;

        expect(elem.style.fill).toBe('red');

        await wrapper.setProps({ value: 41 });
        expect(elem.style.fill).toBe('orange');

        await wrapper.setProps({ value: 80 });
        expect(elem.style.fill).toBe('green');
    });

    it('should apply color to the circle if value is within given range and `styles` prop is given', async () => {
        wrapper = createWrapper({
            propsData: {
                styles: [
                    {
                        value: 0,
                        color: 'red',
                    },
                    {
                        value: 40,
                        color: 'orange',
                    },
                    {
                        value: 80,
                        color: 'green',
                    },
                ],
            },
        });

        const elem = wrapper.element;

        expect(getCustomProperty('--fcircleprogress-circle-color', null, elem)).toBe('red');

        await wrapper.setProps({ value: 41 });
        expect(getCustomProperty('--fcircleprogress-circle-color', null, elem)).toBe('orange');

        await wrapper.setProps({ value: 80 });
        expect(getCustomProperty('--fcircleprogress-circle-color', null, elem)).toBe('green');
    });

    it('should draw colored dots at given value if `dots` prop is given', async () => {
        wrapper = createWrapper({
            propsData: {
                dots: [
                    {
                        value: 30,
                        color: 'green',
                    },
                    {
                        value: 75,
                        color: 'red',
                    },
                ],
            },
        });

        const eDots = wrapper.findAll('.fcircleprogress_dot');

        expect(eDots.length).toBe(2);
        expect(eDots.at(0).attributes('fill')).toBe('green');
        expect(eDots.at(1).attributes('fill')).toBe('red');
    });

    it('should set `stroke-width` attribute correctly if `strokeWidth` prop is set', async () => {
        wrapper = createWrapper({
            propsData: {
                strokeWidth: 10,
            },
        });

        expect(wrapper.find('.fcircleprogress_circle').attributes('stroke-width')).toBe('10');
    });
});
