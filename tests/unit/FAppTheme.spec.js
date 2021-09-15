import { mount } from '@vue/test-utils';
import FAppTheme from '@/components/FAppTheme/FAppTheme.vue';
import { disableErrorMessages } from '@/utils/test.js';
import { delay } from '../../src/utils/function.js';

const THEMES = ['theme-default', 'theme-dark'];
let wrapper = null;

function destroyWrapper(wrapper) {
    if (wrapper) {
        wrapper.destroy();
        wrapper = null;
    }
}

function createWrapper({ propsData = { themes: THEMES }, slots = {} } = {}) {
    return mount(FAppTheme, {
        propsData,
        slots,
        // attachTo: document.body,
    });
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FAppTheme', () => {
    it('should add `theme` css class to the default container element when `theme` prop is given', async () => {
        wrapper = createWrapper({
            propsData: {
                themes: THEMES,
                theme: 'theme-dark',
            },
        });

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.eContainer.classList.contains('theme-dark')).toBeTruthy();
    });

    it('should add `theme` css class to the element specified by `container` selector when `theme` prop is given', async () => {
        const elem = document.createElement('div');
        elem.id = 'theme-container';
        document.body.appendChild(elem);

        wrapper = createWrapper({
            propsData: {
                container: '#theme-container',
                themes: THEMES,
                theme: 'theme-dark',
            },
        });

        expect(wrapper.vm.eContainer.classList.contains('theme-dark')).toBeTruthy();

        elem.remove();
    });

    it('should add `theme` css class to the container when `theme` prop is changed', async () => {
        wrapper = createWrapper();

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.eContainer.classList.contains('theme-default')).toBeTruthy();

        wrapper.setProps({ theme: 'theme-dark' });

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.eContainer.classList.contains('theme-dark')).toBeTruthy();
    });

    it('should set theme by calling static method `FAppTheme.setTheme`', async () => {
        wrapper = createWrapper();

        await wrapper.vm.$nextTick();

        FAppTheme.setTheme('theme-dark');

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.eContainer.classList.contains('theme-dark')).toBeTruthy();
    });

    it('should throw an error when the given theme is not in the `themes` array', async () => {
        disableErrorMessages(function() {
            expect(() => {
                wrapper = createWrapper({
                    propsData: {
                        theme: 'theme-foo',
                    },
                });
            }).toThrow();
        });

        await wrapper.vm.$nextTick();
    });

    it('should add `fapptheme-transition` css class to the container when `animate` prop is given', async () => {
        wrapper = createWrapper({
            propsData: {
                themes: THEMES,
                animate: true,
            },
        });

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.eContainer.classList.contains('fapptheme-transition')).toBeTruthy();
    });

    it('should remove `fappfapptheme-transition` css class after animation is done from the container when `animate` prop is given', async () => {
        wrapper = createWrapper({
            propsData: {
                themes: THEMES,
                animate: true,
            },
        });

        await wrapper.vm.$nextTick();

        wrapper.vm._removeTransitionClass(50);

        await delay(50);

        expect(wrapper.vm.eContainer.classList.contains('fapptheme-transition')).toBeFalsy();
    });

    /*
    xit('should emit `theme-set` event when static method `FAppTheme.setTheme` is called', async () => {
        wrapper = createWrapper();

        FAppTheme.setTheme('theme-dark');

        // await wrapper.vm.$nextTick();
        await delay(200);

        console.log('---');

        const emitted = wrapper.emitted('theme-set');

        console.log('!!', emitted);

        expect(emitted).toBeTruthy();
        expect(emitted[0]).toEqual('theme-dark');
    });
*/
});
