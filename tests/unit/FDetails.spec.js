/* eslint-disable no-undef */

import { mount } from '@vue/test-utils';
import FDetails from '@/components/FDetails/FDetails.vue';

let wrapper = null;

function destroyWrapper(wrapper) {
    if (wrapper) {
        wrapper.destroy();
        wrapper = null;
    }
}

function createWrapper({ propsData = {}, slots = {} } = {}) {
    return mount(FDetails, {
        propsData,
        slots,
    });
}

function getContentElement(wrapper) {
    return wrapper.find('.fdetails_content_wrap');
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FDetails', () => {
    /*it('should render correctly', () => {
        wrapper = createWrapper();

        expect(wrapper.element).toMatchSnapshot();
    });*/

    it('should hide content by default', () => {
        wrapper = createWrapper();

        const eContent = getContentElement(wrapper);

        expect(eContent.isVisible()).toBeFalsy();
    });

    it('should show content when `open` prop is set to `true`', () => {
        wrapper = createWrapper({ propsData: { open: true } });

        const eContent = getContentElement(wrapper);

        expect(eContent.isVisible()).toBeTruthy();
    });

    it('should toggle content visibility when `<summary>` element is clicked', async () => {
        wrapper = createWrapper();

        const eSummary = wrapper.find('summary');
        await eSummary.trigger('click');

        const eContent = getContentElement(wrapper);

        expect(eContent.isVisible()).toBeTruthy();

        await eSummary.trigger('click');

        expect(eContent.isVisible()).toBeFalsy();
    });

    it('should emit event `toggle` when `<summary>` element is clicked', async () => {
        wrapper = createWrapper();

        const eSummary = wrapper.find('summary');
        await eSummary.trigger('click');

        let emitted = wrapper.emitted('toggle');

        expect(emitted).toBeTruthy();
        expect(emitted[0]).toEqual([true]);

        /*await eSummary.trigger('click');
        emitted = wrapper.emitted('toggle');

        expect(emitted).toBeTruthy();
        expect(emitted[0]).toEqual([false]);*/
    });

    // xit('should add `tabindex="0"` when component is in open state and `tabindex="-1"` when it is closed', () => {});
});

/* eslint-enable no-undef */
