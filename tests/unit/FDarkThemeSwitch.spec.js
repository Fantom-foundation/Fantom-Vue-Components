import { mount } from '@vue/test-utils';
import FDarkThemeSwitch from '@/components/FDarkThemeSwitch/FDarkThemeSwitch.vue';

let wrapper = null;

function destroyWrapper() {
    if (wrapper) {
        wrapper.destroy();
    }
}

function createWrapper({ propsData = {} } = {}) {
    destroyWrapper();

    wrapper = mount(FDarkThemeSwitch, {
        propsData,
    });
}

describe('FDarkThemeSwitch', () => {
    it('should render correctly', () => {
        createWrapper({ propsData: { id: 'foo' } });

        expect(wrapper.element).toMatchSnapshot();
    });
});
