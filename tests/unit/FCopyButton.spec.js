import '../clipboard.mock';
import { mount } from '@vue/test-utils';
import FCopyButton from '@/components/FCopyButton/FCopyButton.vue';
import FButton from '@/components/FButton/FButton.vue';
import FPopover from '@/components/FPopover/FPopover.vue';
import FSvgIcon from '../../src/components/FSvgIcon/FSvgIcon.vue';

const COPY_TEXT = 'copy text';
let wrapper = null;

function destroyWrapper(wrapper) {
    if (wrapper) {
        wrapper.destroy();
        wrapper = null;
    }
}

function createWrapper({ propsData = { text: COPY_TEXT }, slots = {} } = {}) {
    return mount(FCopyButton, {
        propsData,
        slots,
        // attachTo: document.body,
    });
}

async function clickButton(wrapper) {
    const eButton = wrapper.find('button');

    return eButton.trigger('click');
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FCopyButton', () => {
    it('should render correctly', () => {
        wrapper = createWrapper({
            propsData: {
                text: COPY_TEXT,
                buttonId: 'buttonid',
            },
        });

        expect(wrapper.element).toMatchSnapshot();
    });

    it('should copy given text by clicking on the button', async () => {
        wrapper = createWrapper();

        const spy = jest.spyOn(navigator.clipboard, 'writeText');

        await clickButton(wrapper);

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(wrapper.props('text'));

        spy.mockRestore();
    });

    it('should emit `text-copied` event if text is copied', async () => {
        wrapper = createWrapper();

        await clickButton(wrapper);

        const emitted = wrapper.emitted('text-copied');

        expect(emitted).toBeTruthy();
        expect(emitted[0]).toEqual([COPY_TEXT]);
    });

    it('should set popover text if `popoverText` prop is given', async () => {
        wrapper = createWrapper({
            propsData: {
                text: COPY_TEXT,
                popoverText: 'popover text',
            },
        });

        await clickButton(wrapper);

        const ePopoverBody = wrapper.findComponent(FPopover).find('.fwindow_body');

        expect(ePopoverBody.text()).toBe('popover text');
    });

    it('should set title on the default button if `buttonTitle` prop is given', () => {
        wrapper = createWrapper({
            propsData: {
                text: COPY_TEXT,
                buttonTitle: 'button title',
            },
        });

        const fButton = wrapper.findComponent(FButton);

        expect(fButton.attributes('title')).toBe('button title');
    });

    it('should set size of the default icon if `iconSize` prop is given', () => {
        wrapper = createWrapper({
            propsData: {
                text: COPY_TEXT,
                iconSize: '24px',
            },
        });

        const fSvgIcon = wrapper.findComponent(FSvgIcon);

        expect(fSvgIcon.props('size')).toBe('24px');
    });

    it('should not show the popover if `showPopover` prop is set to `false`', async () => {
        wrapper = createWrapper({
            propsData: {
                text: COPY_TEXT,
                showPopover: false,
            },
        });

        await clickButton(wrapper);

        const fPopover = wrapper.findComponent(FPopover);

        expect(fPopover.exists()).toBeFalsy();
    });

    it('should not create FPopover component on init', () => {
        wrapper = createWrapper();

        const fPopover = wrapper.findComponent(FPopover);

        expect(fPopover.exists()).toBeFalsy();
    });
});
