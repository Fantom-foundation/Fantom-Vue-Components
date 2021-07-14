import { mount } from '@vue/test-utils';
import FNavigation from '@/components/FNavigation/FNavigation.vue';
import { clone } from '@/utils';
import { findNodeBy } from '@/utils/simple-tree.js';

let wrapper = null;

const navigation = [
    {
        id: 'node1',
        label: 'Item 1',
        _c: [
            { id: 'node21', label: 'Item 2.1', url: `#url21` },
            {
                id: 'node22',
                label: 'Item 2.2',
                _c: [
                    { id: 'node31', label: 'Item 3.1', url: `#url31` },
                    { id: 'node32', label: 'Item 3.2', url: `#url32` },
                    { id: 'node33', label: 'Item 3.3', url: `#url33` },
                ],
            },
        ],
    },
    { id: 'node2', label: 'Item 2', url: `#url2` },
    { id: 'node3', dontRender: true, label: 'Item 3', url: `#url3` },
];

function destroyWrapper() {
    if (wrapper) {
        wrapper.destroy();
        wrapper = null;
    }
}

function createWrapper() {
    destroyWrapper();

    wrapper = mount(FNavigation, {
        propsData: {
            navigation: clone(navigation),
        },
    });
}

beforeEach(() => {
    createWrapper();
});

afterEach(() => {
    destroyWrapper();
});

describe('FNavigation', () => {
    it('should not render nodes with `dontRender: true` property', () => {
        expect(wrapper.vm.cNavigation.length).toBe(2);
    });

    it('should expand all nodes by calling `expand()` method', () => {
        const { parents } = findNodeBy(wrapper.vm.cNavigation, 'node31');

        wrapper.vm.expand();

        parents.forEach(parent => {
            expect(parent.expanded).toBe(true);
        });
    });

    it('should collapse all nodes by calling `collapse()` method', () => {
        const { parents } = findNodeBy(wrapper.vm.cNavigation, 'node31');

        wrapper.vm.expand();
        wrapper.vm.collapse();

        parents.forEach(parent => {
            expect(parent.expanded).toBeFalsy();
        });
    });

    it('should highlight node by calling `highlightNode(nodeId)` method', () => {
        const { node, parents } = findNodeBy(wrapper.vm.cNavigation, 'node31');

        wrapper.vm.highlightNode('node31');

        expect(node.active).toBe(true);
        parents.forEach(parent => {
            expect(parent.active).toBeFalsy();
        });
    });

    it('should highlight node and expand its parents by calling `highlightNode(nodeId, true)` method', () => {
        const { node, parents } = findNodeBy(wrapper.vm.cNavigation, 'node31');

        wrapper.vm.highlightNode('node31', true);

        expect(node.active).toBe(true);
        parents.forEach(parent => {
            expect(parent.expanded).toBe(true);
            expect(parent.active).toBeFalsy();
        });
    });

    it('should highlight node and its parents by calling `highlightPath(nodeId)` method', () => {
        const { node, parents } = findNodeBy(wrapper.vm.cNavigation, 'node31');

        wrapper.vm.highlightPath('node31');

        expect(node.active).toBe(true);
        parents.forEach(parent => {
            expect(parent.active).toBe(true);
        });
    });

    it('should highlight node and its parents and expand its parents by calling `highlightPath(nodeId, true)` method', () => {
        const { node, parents } = findNodeBy(wrapper.vm.cNavigation, 'node31');

        wrapper.vm.highlightPath('node31', true);

        expect(node.active).toBe(true);
        parents.forEach(parent => {
            expect(parent.active).toBe(true);
            expect(parent.expanded).toBe(true);
        });
    });

    it('should background highlighted node and its parents by calling `background()` method', () => {
        const { node, parents } = findNodeBy(wrapper.vm.cNavigation, 'node31');

        wrapper.vm.highlightPath('node31');
        wrapper.vm.background();

        expect(node.active).toBeFalsy();
        parents.forEach(parent => {
            expect(parent.active).toBeFalsy();
        });
    });

    it('should background highlighted node and its parents and collapse path by calling `background(true)` method', () => {
        const { node, parents } = findNodeBy(wrapper.vm.cNavigation, 'node31');

        wrapper.vm.highlightPath('node31', true);
        wrapper.vm.background(true);

        expect(node.active).toBeFalsy();
        parents.forEach(parent => {
            expect(parent.active).toBeFalsy();
            expect(parent.expanded).toBeFalsy();
        });
    });
});
