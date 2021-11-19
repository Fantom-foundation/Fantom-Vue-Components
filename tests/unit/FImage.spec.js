/* eslint-disable no-undef */

import { mount } from '@vue/test-utils';
import FImage from '@/components/FImage/FImage.vue';
import FPlaceholder from '@/components/FPlaceholder/FPlaceholder.vue';

let wrapper = null;

function destroyWrapper(wrapper) {
    if (wrapper) {
        wrapper.destroy();
        wrapper = null;
    }
}

function createWrapper({ propsData = {}, slots = {} } = {}) {
    return mount(FImage, {
        propsData,
        slots,
    });
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FImage', () => {
    /*it('should render correctly', () => {
        wrapper = createWrapper();

        expect(wrapper.element).toMatchSnapshot();
    });*/

    it('should show placeholder if the `src` prop is not set', () => {
        wrapper = createWrapper();

        expect(wrapper.findComponent(FPlaceholder).exists()).toBeTruthy();
    });

    it('should use `noImgSrc` as an image src if the `noImgSrc` prop is set and image is not loaded correctly', async () => {
        const noImgSrc = 'no-img-src';

        wrapper = createWrapper({ propsData: { noImgSrc } });

        wrapper.vm.onImgError();
        await wrapper.vm.$nextTick();

        const eImg = wrapper.find('img');
        expect(eImg.element.src).toBe(`http://localhost/${noImgSrc}`);
    });

    it('should add "fimage-noimage" css class to the container if image is not loaded correctly', async () => {
        wrapper = createWrapper();

        wrapper.vm.onImgError();
        await wrapper.vm.$nextTick();

        expect(wrapper.classes()).toContain('fimage-noimage');
    });

    it('should show placeholder if the `src` prop is set and image is not loaded yet', () => {
        wrapper = createWrapper({ propsData: { src: 'avatar.jpg' } });

        expect(wrapper.findComponent(FPlaceholder).exists()).toBeTruthy();
    });

    it('should hide placeholder and show image if `src` prop is set and image is loaded', async () => {
        wrapper = createWrapper({ propsData: { src: 'avatar.jpg' } });

        wrapper.vm.onImgLoad();
        await wrapper.vm.$nextTick();

        expect(wrapper.findComponent(FPlaceholder).exists()).toBeFalsy();
    });

    it('should set width and/or height if `width` and/or `height` props are given', async () => {
        wrapper = createWrapper({ propsData: { width: '100px' } });

        expect(wrapper.vm.$el.style.width).toBe('100px');

        await wrapper.setProps({ height: '50px' });

        expect(wrapper.vm.$el.style.height).toBe('50px');
    });

    it('should set width and height by the same value if `size` prop is set', async () => {
        wrapper = createWrapper({ propsData: { size: '100px' } });

        expect(wrapper.vm.$el.style.width).toBe('100px');
        expect(wrapper.vm.$el.style.height).toBe('100px');
    });

    it('should set `object-fit` css property on `img` element when `fit` prop is set', async () => {
        wrapper = createWrapper({ propsData: { fit: 'cover' } });

        const eImg = wrapper.find('img');

        expect(eImg.element.style.objectFit).toBe('cover');
    });
});

/* eslint-enable no-undef */
