import { mount } from '@vue/test-utils';
import FPlaceholder from '@/components/FPlaceholder/FPlaceholder.vue';

const REPLACEMENT_TEXT = 'Replacement text';
const DEFAULT_SLOT_TEXT = '123456';
let wrapper = null;

function destroyWrapper(wrapper) {
    if (wrapper) {
        wrapper.destroy();
        wrapper = null;
    }
}

function createWrapper({ propsData = {}, slots = { default: DEFAULT_SLOT_TEXT } } = {}) {
    return mount(FPlaceholder, {
        propsData,
        slots,
        // attachTo: document.body,
    });
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FPlaceholder', () => {
    it('should render correctly', () => {
        wrapper = createWrapper({ slots: {} });

        expect(wrapper.element).toMatchSnapshot();
    });

    it('should set `replacementText` as a replacement content if `contentLoaded` is `false` and then content from default slot if `contentLoaded` is `true`', async () => {
        wrapper = createWrapper({ propsData: { replacementText: REPLACEMENT_TEXT } });

        expect(wrapper.find('.fplaceholder_replacementtwin').text()).toBe(REPLACEMENT_TEXT);

        await wrapper.setProps({ contentLoaded: true });

        expect(wrapper.text()).toBe(DEFAULT_SLOT_TEXT);
    });

    it('should extract a `replacementNumChars` number of characters of "Lorem ipsum ..." as a replacement text', () => {
        wrapper = createWrapper({ propsData: { replacementNumChars: 11 } });

        expect(wrapper.find('.fplaceholder_replacementtwin').text()).toBe('Lorem ipsum');
    });

    it('should set given animation class if content is loading and `animation` prop is specified', () => {
        wrapper = createWrapper({ propsData: { animation: 'anim' } });

        expect(wrapper.classes()).toContain('anim');
    });

    it('should not set given animation class if content is loading and `useAnimation` is set to `false`', () => {
        wrapper = createWrapper({ propsData: { useAnimation: false } });

        expect(wrapper.classes()).not.toContain(wrapper.props('animation'));
    });
});
