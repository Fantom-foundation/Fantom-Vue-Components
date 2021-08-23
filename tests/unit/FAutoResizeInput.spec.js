import { mount } from '@vue/test-utils';
import FAutoResizeInput from '@/components/FAutoResizeInput/FAutoResizeInput.vue';

let wrapper = null;

function destroyWrapper(wrapper) {
    if (wrapper) {
        wrapper.destroy();
        wrapper = null;
    }
}

function createWrapper({ propsData = {}, slots = { default: '<input type="text" />' } } = {}) {
    return mount(FAutoResizeInput, {
        propsData,
        slots,
        // attachTo: document.body,
    });
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FAutoResizeInput', () => {
    it('should render correctly', () => {
        wrapper = createWrapper({ slots: {} });

        expect(wrapper.element).toMatchSnapshot();
    });

    // offsetWidth doesn't work properly in this test enviroment :(
    /* it('should resize input element properly while typing', async () => {
        wrapper = createWrapper({ slots: { default: '<input type="text" />' } });

        const eInput = wrapper.find('input');

        await eInput.setValue('eee');
    });*/

    it('should set minimal width of the input element if `minWidth` prop is specified', () => {
        wrapper = createWrapper({ propsData: { minWidth: '20px' } });

        const eInput = wrapper.find('input');

        expect(eInput.element.style.minWidth).toBe('20px');
    });

    it('should add an additional width to the resulting width if the number of pixels `extraWidth` is specified', () => {
        wrapper = createWrapper({ propsData: { extraWidth: 10 } });

        const eInput = wrapper.find('input');

        expect(eInput.element.style.width).toBe('10px');
    });
});
