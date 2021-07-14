import { mount } from '@vue/test-utils';
import FNavigationNode from '@/components/FNavigationNode/FNavigationNode.vue';
import Vue from 'vue';

let wrapper = null;

function destroyWrapper() {
    if (wrapper) {
        wrapper.destroy();
        wrapper = null;
    }
}

function createWrapper({ propsData } = {}) {
    wrapper = mount(FNavigationNode, {
        propsData,
    });
}

afterEach(() => {
    destroyWrapper();
});

describe('FNavigationNode', () => {
    it('should render link element if `node.url` is non-empty string', () => {
        createWrapper({
            propsData: {
                node: { url: '#foo' },
            },
        });

        expect(wrapper.find('a').exists()).toBe(true);
    });

    it('should render button element if `node.url` is not defined', () => {
        createWrapper();

        expect(wrapper.find('button').exists()).toBe(true);
    });

    it('should render child elements if child nodes (`node._c`) exists and `node.expanded` is true', () => {
        createWrapper({
            propsData: {
                node: {
                    _c: [{}],
                },
            },
        });

        expect(wrapper.findAllComponents(FNavigationNode).length).toBeGreaterThan(1);
    });

    it('should render an icon if child nodes exist', () => {
        createWrapper({
            propsData: {
                node: {
                    _c: [{}],
                },
            },
        });

        expect(wrapper.findComponent({ name: 'f-svg-icon' }).exists()).toBe(true);
    });

    it('should expand/collapse child nodes if `expanded` property on the node prop is true/false', async () => {
        const node = {
            _c: [{}],
        };

        createWrapper({
            propsData: {
                node,
            },
        });

        Vue.set(node, 'expanded', true);

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.expanded).toBe(true);
    });

    it('should activate/deactivate (highlight/background) child nodes if `active` property on the node prop is true/false', async () => {
        const node = {
            _c: [{}],
        };

        createWrapper({
            propsData: {
                node,
            },
        });

        Vue.set(node, 'active', true);

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.active).toBe(true);
    });

    it('should pass `level` greater by one to child nodes', () => {
        createWrapper({
            propsData: {
                node: {
                    _c: [{}],
                },
            },
        });
        const child = wrapper.findAllComponents(FNavigationNode).at(1);

        expect(child.props('level')).toBe(wrapper.vm.level + 1);
    });

    it('should add correct start (left) padding to each node', () => {
        createWrapper({
            propsData: {
                node: {
                    _c: [{}],
                },
            },
        });

        const child = wrapper.findAllComponents(FNavigationNode).at(1);

        expect(wrapper.vm.itemStyle).toEqual({ paddingInlineStart: 'calc(1 * 18px)' });
        expect(child.vm.itemStyle).toEqual({ paddingInlineStart: 'calc(2 * 18px)' });
    });
});
