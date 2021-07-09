import { mount } from '@vue/test-utils';
import FHamburgerSwitch from '@/components/FHamburgerSwitch/FHamburgerSwitch.vue';

let wrapper = null;

function destroyWrapper(wrapper) {
    if (wrapper) {
        wrapper.destroy();
    }
}

function createWrapper({ propsData = {}, attachTo } = {}) {
    return mount(FHamburgerSwitch, {
        propsData,
        attachTo,
    });
}

beforeEach(() => {
    wrapper = createWrapper();
});

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FHamburgerSwitch', () => {
    it('should render correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    it('should have `on` prop default to `false`', () => {
        expect(wrapper.props().on).toBe(false);
    });

    it('should have `twoLines` prop default to `false`', () => {
        expect(wrapper.props().twoLines).toBe(false);
    });

    it("should have `mobileViewBreakpoint` prop default to `''`", () => {
        expect(wrapper.props().mobileViewBreakpoint).toBe('');
    });

    it("should have `thickness` prop default to '1'", () => {
        expect(wrapper.props().thickness).toBe('1');
    });

    it('should turn the switch on if `on` prop is set to `true`', () => {
        destroyWrapper(wrapper);
        wrapper = createWrapper({ propsData: { on: true } });

        expect(wrapper.classes('fhamburgerswitch-on')).toBe(true);
    });

    it('should add correct `fhamburgerswitch-thickness` css class if `thickness` prop is set', () => {
        // default
        expect(wrapper.classes('fhamburgerswitch-thickness1')).toBe(true);

        destroyWrapper(wrapper);
        wrapper = createWrapper({ propsData: { thickness: '2' } });

        expect(wrapper.classes('fhamburgerswitch-thickness2')).toBe(true);
    });

    it('should toggle the switch by changing `on` prop', async () => {
        await wrapper.setProps({ on: true });

        expect(wrapper.classes('fhamburgerswitch-on')).toBe(true);

        await wrapper.setProps({ on: false });

        expect(wrapper.classes('fhamburgerswitch-on')).toBe(false);
    });

    it('should toggle the switch by clicking on it', async () => {
        expect(wrapper.classes('fhamburgerswitch-on')).toBe(false);

        await wrapper.trigger('click');

        expect(wrapper.classes('fhamburgerswitch-on')).toBe(true);
    });

    it('should turn the switch on by calling static method `FHamburgerSwitch.on()`', async () => {
        FHamburgerSwitch.on();

        await wrapper.vm.$nextTick();

        expect(wrapper.classes('fhamburgerswitch-on')).toBe(true);
    });

    it('should turn the switch off by calling static method `FHamburgerSwitch.off()`', async () => {
        await wrapper.trigger('click');

        FHamburgerSwitch.off();

        await wrapper.vm.$nextTick();

        expect(wrapper.classes('fhamburgerswitch-on')).toBe(false);
    });

    it('should turn the switch off if `mobileViewBreakpoint` is set and reached', async () => {
        /*destroyWrapper(wrapper);
        wrapper = createWrapper({
            propsData: { mobileViewBreakpoint: '40em' },
            attachTo: document.body,
        });*/

        await wrapper.trigger('click');

        wrapper.vm.onBreakpointChange();

        await wrapper.vm.$nextTick();

        expect(wrapper.classes('fhamburgerswitch-on')).toBe(false);
    });

    it('should emit `hamburger-switch-on` and `hamburger-switch-off` events by toggling the switch', async () => {
        await wrapper.trigger('click');
        await wrapper.trigger('click');

        expect(wrapper.emitted()['hamburger-switch-on']).toBeTruthy();
        expect(wrapper.emitted()['hamburger-switch-on'].length).toBe(1);
        expect(wrapper.emitted()['hamburger-switch-off']).toBeTruthy();
        expect(wrapper.emitted()['hamburger-switch-off'].length).toBe(1);
    });

    it('should add/remove css class `fhamburgerswitch-on` to/from the `body` element by toggling the switch', async () => {
        await wrapper.trigger('click');

        expect(document.body.classList.contains('fhamburgerswitch-on')).toBe(true);

        await wrapper.trigger('click');

        expect(document.body.classList.contains('fhamburgerswitch-on')).toBe(false);
    });
});
