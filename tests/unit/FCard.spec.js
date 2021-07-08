import { mount } from '@vue/test-utils';
import FCard from '@/components/FCard/FCard.vue';

let wrapper = null;

function destroyWrapper() {
    if (wrapper) {
        wrapper.destroy();
    }
}

function createWrapper({ propsData = {}, slots = {} } = {}) {
    destroyWrapper();

    wrapper = mount(FCard, {
        slots,
        propsData,
    });
}

describe('FCard', () => {
    it('should render correctly', () => {
        createWrapper();

        expect(wrapper.element).toMatchSnapshot();
    });

    it('should render content in default slot', () => {
        createWrapper({
            slots: {
                default: ['<span>content</span>'],
            },
        });

        expect(wrapper.html()).toContain('<span>content</span>');
    });
});
