import { mount } from '@vue/test-utils';
import FInfo from '@/components/FInfo/FInfo.vue';
import FButton from '@/components/FButton/FButton.vue';
import FPopover from '@/components/FPopover/FPopover.vue';
import FWindow from '@/components/FWindow/FWindow.vue';
import FSvgIcon from '../../src/components/FSvgIcon/FSvgIcon.vue';

let wrapper = null;

function destroyWrapper(wrapper) {
    if (wrapper) {
        wrapper.destroy();
        wrapper = null;
    }
}

function createWrapper({ propsData = {}, slots = {} } = {}) {
    return mount(FInfo, {
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

describe('FInfo', () => {
    it('should render correctly', () => {
        wrapper = createWrapper({
            propsData: {
                buttonId: 'buttonid',
            },
        });

        expect(wrapper.element).toMatchSnapshot();
    });

    it('should show the FWindow component instead of FPopover if `usePopup` prop is set to `true`', async () => {
        wrapper = createWrapper({
            propsData: {
                usePopup: true,
            },
        });

        await clickButton(wrapper);

        const fPopover = wrapper.findComponent(FPopover);
        const fWindow = wrapper.findComponent(FWindow);

        expect(fPopover.exists()).toBeFalsy();
        expect(fWindow.exists()).toBeTruthy();
    });

    it('should pass css class and style to the FPopover component if `windowClass` respective `windowStyle` prop is given', async () => {
        wrapper = createWrapper({
            propsData: {
                windowClass: 'wclass',
                windowStyle: { maxWidth: '480px' },
            },
        });

        await clickButton(wrapper);

        const fPopover = wrapper.findComponent(FPopover);

        expect(fPopover.classes()).toContain('wclass');
        expect(fPopover.element.style.maxWidth).toBe('480px');
    });

    it('should pass css class and style to the FWindow component if `windowClass` respective `windowStyle` prop is given', async () => {
        wrapper = createWrapper({
            propsData: {
                usePopup: true,
                windowClass: 'wclass',
                windowStyle: { maxWidth: '480px' },
            },
        });

        await clickButton(wrapper);

        const fWindow = wrapper.findComponent(FWindow);

        expect(fWindow.classes()).toContain('wclass');
        expect(fWindow.element.style.maxWidth).toBe('480px');
    });

    it('should set title on the default button if `buttonTitle` prop is given', () => {
        wrapper = createWrapper({
            propsData: {
                buttonTitle: 'button title',
            },
        });

        const fButton = wrapper.findComponent(FButton);

        expect(fButton.attributes('title')).toBe('button title');
    });

    it('should set size of the default icon if `iconSize` prop is given', () => {
        wrapper = createWrapper({
            propsData: {
                iconSize: '24px',
            },
        });

        const fSvgIcon = wrapper.findComponent(FSvgIcon);

        expect(fSvgIcon.props('size')).toBe('24px');
    });

    it('should not create FPopover component on init', () => {
        wrapper = createWrapper();

        const fPopover = wrapper.findComponent(FPopover);

        expect(fPopover.exists()).toBeFalsy();
    });

    it('should not create FWindow component on init', () => {
        wrapper = createWrapper({
            propsData: {
                usePopup: true,
            },
        });

        const fWindow = wrapper.findComponent(FWindow);

        expect(fWindow.exists()).toBeFalsy();
    });

    it('should pass attributes to the FButton components', () => {
        wrapper = createWrapper({
            propsData: {
                size: 'small',
            },
        });

        const fButton = wrapper.findComponent(FButton);

        expect(fButton.exists()).toBeTruthy();
        expect(fButton.props('size')).toBe('small');
    });

    it('should pass attributes to the FPopover components', async () => {
        wrapper = createWrapper({
            propsData: {
                attachPosition: 'bottom',
            },
        });

        await clickButton(wrapper);

        const fPopover = wrapper.findComponent(FPopover);

        expect(fPopover.exists()).toBeTruthy();
        expect(fPopover.props('attachPosition')).toBe('bottom');
    });

    it('should pass attributes to the FWindow components', async () => {
        wrapper = createWrapper({
            propsData: {
                usePopup: true,
                attachPosition: 'bottom',
            },
        });

        await clickButton(wrapper);

        const fWindow = wrapper.findComponent(FWindow);

        expect(fWindow.exists()).toBeTruthy();
        expect(fWindow.props('attachPosition')).toBe('bottom');
    });
});
