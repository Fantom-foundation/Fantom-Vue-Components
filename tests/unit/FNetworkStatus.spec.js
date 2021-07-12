import { mount } from '@vue/test-utils';
import FNetworkStatus from '@/components/FNetworkStatus/FNetworkStatus.vue';
import FWindow from '@/components/FWindow/FWindow.vue';

let wrapper = null;

function destroyWrapper(wrapper) {
    if (wrapper) {
        wrapper.destroy();
    }
}

function createWrapper() {
    return mount(FNetworkStatus, {
        attachTo: document.body,
    });
}

beforeEach(() => {
    wrapper = createWrapper();
});

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FNetworkStatus', () => {
    it('should add css class `offline` to the `html` element and show popover with message, if `FNetworkStatus.offline()` is called', async () => {
        const fWindow = wrapper.findComponent(FWindow);

        FNetworkStatus.offline();
        await wrapper.vm.$nextTick();

        expect(document.documentElement.classList.contains('offline')).toBeTruthy();
        expect(fWindow.vm.isVisible).toBe(true);
    });

    it('should remove css class `offline` from the `html` element and hide popover with message, if `FNetworkStatus.online()` is called', async () => {
        const fWindow = wrapper.findComponent(FWindow);

        FNetworkStatus.offline();
        await wrapper.vm.$nextTick();

        FNetworkStatus.online();
        await wrapper.vm.$nextTick();

        expect(document.documentElement.classList.contains('offline')).toBeFalsy();
        expect(fWindow.vm.isVisible).toBe(false);
    });
});
