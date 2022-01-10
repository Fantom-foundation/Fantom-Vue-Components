import { mount } from '@vue/test-utils';
import FHiddenNavLink from '@/components/FHiddenNavLink/FHiddenNavLink.vue';

let wrapper = null;

function removeElementById(id) {
    const elem = document.getElementById(id);

    if (elem) {
        elem.remove();
    }
}

function createPlayground() {
    const eRoot = document.createElement('div');
    eRoot.id = 'root';
    document.body.appendChild(eRoot);

    const eBtn = document.createElement('button');
    eBtn.id = 'btn';
    document.body.appendChild(eBtn);

    const eContent = document.createElement('div');
    eContent.id = 'content';
    eContent.tabIndex = -1;
    document.body.appendChild(eContent);
}

function destroyPlayground() {
    removeElementById('root');
    removeElementById('btn');
    removeElementById('content');
}

function destroyWrapper(wrapper) {
    if (wrapper) {
        wrapper.destroy();
        destroyPlayground();
    }
}

function createWrapper({ propsData = { to: 'content' } } = {}) {
    createPlayground();

    return mount(FHiddenNavLink, {
        propsData,
        attachTo: '#root',
    });
}

beforeEach(() => {
    wrapper = createWrapper();
});

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FHiddenNavLink', () => {
    it('should set hash tag when `to` prop is set', async () => {
        expect(wrapper.attributes('href')).toBe('#content');
    });

    it('should set focus to an element with id given by `to` prop', async () => {
        wrapper.element.focus();

        await wrapper.trigger('click');

        expect(document.activeElement.id).toBe('content');
    });
});
