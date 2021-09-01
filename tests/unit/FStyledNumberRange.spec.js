import { mount } from '@vue/test-utils';
import FStyledNumberRange from '@/components/FStyledNumberRange/FStyledNumberRange.vue';
import { disableErrorMessages } from '@/utils/test.js';

let wrapper = null;

function destroyWrapper(wrapper) {
    if (wrapper) {
        wrapper.destroy();
        wrapper = null;
    }
}

function createWrapper({ propsData = { value: 10, min: 0, max: 100 }, slots = {} } = {}) {
    return mount(FStyledNumberRange, {
        propsData,
        slots,
    });
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FStyledNumberRange', () => {
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

    it('should convert given value to percentages if `convertToPercentages` prop is `true`', () => {
        wrapper = createWrapper({
            propsData: {
                value: 60,
                min: 20,
                max: 100,
                convertToPercentages: true,
            },
        });

        expect(wrapper.text()).toBe('50%');
    });

    it('should apply css style to the component if value is within given range', async () => {
        wrapper = createWrapper({
            propsData: {
                styles: [
                    {
                        value: 0,
                        style: { color: 'red' },
                    },
                    {
                        value: 40,
                        style: { color: 'orange' },
                    },
                    {
                        value: 80,
                        style: { color: 'green' },
                    },
                ],
            },
        });

        expect(wrapper.element.style.color).toBe('red');

        await wrapper.setProps({ value: 41 });
        expect(wrapper.element.style.color).toBe('orange');

        await wrapper.setProps({ value: 80 });
        expect(wrapper.element.style.color).toBe('green');
    });
});
