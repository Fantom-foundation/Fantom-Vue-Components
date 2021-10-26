/* eslint-disable no-undef */

import { mount } from '@vue/test-utils';
import FDetails from '@/components/FDetails/FDetails.vue';
import { delay } from '@/utils/function.js';

let wrapper = null;

function destroyWrapper(wrapper) {
    if (wrapper) {
        wrapper.destroy();
        wrapper = null;
    }
}

function createWrapper({ propsData = {}, slots = { default: '<span id="content">foo</span>' } } = {}) {
    return mount(FDetails, {
        propsData,
        slots,
    });
}

function getContentElement(wrapper) {
    return wrapper.find('#content');
}

function getContentWrapElement(wrapper) {
    return wrapper.find('[data-test-id="content_wrap"]');
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

        const eContentWrap = getContentWrapElement(wrapper);

        expect(eContentWrap.isVisible()).toBeFalsy();
    });

    it('should show content when `open` prop is set to `true`', () => {
        wrapper = createWrapper({ propsData: { open: true } });

        const eContentWrap = getContentWrapElement(wrapper);

        expect(eContentWrap.isVisible()).toBeTruthy();
    });

    xit('should toggle content visibility when `<summary>` element is clicked', async () => {
        wrapper = createWrapper();

        const eSummary = wrapper.find('summary');
        await eSummary.trigger('click');

        const eContentWrap = getContentWrapElement(wrapper);

        expect(eContentWrap.isVisible()).toBeTruthy();

        await eSummary.trigger('click');

        expect(eContentWrap.isVisible()).toBeFalsy();
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

    it('should render content if strategy is "render"', async () => {
        wrapper = createWrapper();

        const eContent = getContentElement(wrapper);

        expect(eContent.exists()).toBeTruthy();

        const eSummary = wrapper.find('summary');
        await eSummary.trigger('click');

        expect(eContent.exists()).toBeTruthy();
    });

    it('should render content only after the first opening if strategy is "create"', async () => {
        wrapper = createWrapper({ propsData: { strategy: 'create' } });

        let eContent = getContentElement(wrapper);

        expect(eContent.exists()).toBeFalsy();

        const eSummary = wrapper.find('summary');
        await eSummary.trigger('click');

        eContent = getContentElement(wrapper);

        expect(eContent.exists()).toBeTruthy();
    });

    it('should render content only on open and should destroy content on close if strategy is "create-destroy"', async () => {
        wrapper = createWrapper({ propsData: { strategy: 'create-destroy' } });

        let eContent = getContentElement(wrapper);

        expect(eContent.exists()).toBeFalsy();

        let eSummary = wrapper.find('summary');
        await eSummary.trigger('click');

        eContent = getContentElement(wrapper);

        expect(eContent.exists()).toBeTruthy();

        await eSummary.trigger('click');

        eContent = getContentElement(wrapper);

        // ???
        // expect(eContent.exists()).toBeFalsy();
    });

    // xit('should add `tabindex="0"` when component is in open state and `tabindex="-1"` when it is closed', () => {});
});

/* eslint-enable no-undef */
