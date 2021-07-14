import FNavigation from './FNavigation.vue';
import FButton from '@/components/FButton/FButton.vue';
import FIconset from '@/components/FIconset/FIconset.vue';

export default {
    title: 'FNavigation',
    component: FNavigation,
};

const baseDefault = '/?path=/story/fnavigation--default';
export const Default = () => ({
    components: { FNavigation },
    template: `
        <div style="max-width: 320px;">
            <f-navigation :navigation="navigation" />
        </div>
    `,
    data() {
        return {
            navigation: [
                {
                    label: 'Item 1',
                    _c: [
                        { label: 'Item 2.1 (target="_blank")', url: `${baseDefault}#url21`, blank: true },
                        {
                            label: 'Item 2.2',
                            // url: `${baseDefault}#url22`,
                            _c: [
                                { label: 'Item 3.1', url: `${baseDefault}#url31` },
                                { label: 'Item 3.2', url: `${baseDefault}#url32` },
                                { label: 'Item 3.3', url: `${baseDefault}#url33` },
                            ],
                        },
                    ],
                },
                { label: 'Item 2', url: `${baseDefault}#url2` },
            ],
        };
    },
});

const baseExpanded = '/?path=/story/fnavigation--expanded';
export const Expanded = () => ({
    components: { FNavigation },
    template: `
        <div>
            <f-navigation expanded :navigation="navigation" />
        </div>
    `,
    data() {
        return {
            navigation: [
                {
                    label: 'Item 1',
                    _c: [
                        { label: 'Item 2.1 (target="_blank")', url: `${baseExpanded}#url21`, blank: true },
                        {
                            label: 'Item 2.2',
                            _c: [
                                { label: 'Item 3.1', url: `${baseExpanded}#url31` },
                                { label: 'Item 3.2', url: `${baseExpanded}#url32` },
                                { label: 'Item 3.3', url: `${baseExpanded}#url33` },
                            ],
                        },
                    ],
                },
                { label: 'Item 2', url: `${baseExpanded}#url2` },
            ],
        };
    },
});

const baseActive = '/?path=/story/fnavigation--active';
export const Active = () => ({
    components: { FNavigation },
    template: `
        <div>
            <f-navigation expanded :navigation="navigation" />
        </div>
    `,
    data() {
        return {
            navigation: [
                {
                    label: 'Item 1',
                    active: true,
                    _c: [
                        { label: 'Item 2.1 (target="_blank")', url: `${baseActive}#url21`, blank: true },
                        {
                            label: 'Item 2.2',
                            active: true,
                            _c: [
                                { label: 'Item 3.1', url: `${baseActive}#url31` },
                                { label: 'Item 3.2', url: `${baseActive}#url32`, active: true },
                                { label: 'Item 3.3', url: `${baseActive}#url33` },
                            ],
                        },
                    ],
                },
                { label: 'Item 2', url: `${baseActive}#url2` },
            ],
        };
    },
});

const baseDontRender = '/?path=/story/fnavigation--dont-render-node';
export const DontRenderNode = () => ({
    components: { FNavigation },
    template: `
        <div>
            <f-navigation expanded :navigation="navigation" />
        </div>
    `,
    data() {
        return {
            navigation: [
                {
                    label: 'Item 1',
                    _c: [
                        { label: 'Item 2.1 (target="_blank")', url: `${baseDontRender}#url21`, blank: true },
                        {
                            label: 'Item 2.2',
                            _c: [
                                { label: 'Item 3.1', url: `${baseDontRender}#url31`, dontRender: true },
                                { label: 'Item 3.2', url: `${baseDontRender}#url32`, dontRender: true },
                                { label: 'Item 3.3', url: `${baseDontRender}#url33` },
                            ],
                        },
                    ],
                },
                { label: 'Item 2', url: `${baseDontRender}#url2`, dontRender: true },
            ],
        };
    },
});

const baseAnimate = '/?path=/story/fnavigation--animate';
export const Animate = () => ({
    components: { FNavigation },
    template: `
        <div>
            <f-navigation animate :navigation="navigation" />
        </div>
    `,
    data() {
        return {
            navigation: [
                {
                    label: 'Item 1',
                    _c: [
                        { label: 'Item 2.1 (target="_blank")', url: `${baseAnimate}#url21`, blank: true },
                        {
                            label: 'Item 2.2',
                            _c: [
                                { label: 'Item 3.1', url: `${baseAnimate}#url31` },
                                { label: 'Item 3.2', url: `${baseAnimate}#url32` },
                                { label: 'Item 3.3', url: `${baseAnimate}#url33` },
                            ],
                        },
                    ],
                },
                { label: 'Item 2', url: `${baseAnimate}#url2` },
            ],
        };
    },
});

const baseTransitionOptions = '/?path=/story/fnavigation--transition-options';
export const TransitionOptions = () => ({
    components: { FNavigation },
    template: `
        <div>
            <f-navigation animate transition-length="1s" transition-func="ease-in-out" :navigation="navigation" />
        </div>
    `,
    data() {
        return {
            navigation: [
                {
                    label: 'Item 1',
                    _c: [
                        { label: 'Item 2.1 (target="_blank")', url: `${baseTransitionOptions}#url21`, blank: true },
                        {
                            label: 'Item 2.2',
                            _c: [
                                { label: 'Item 3.1', url: `${baseTransitionOptions}#url31` },
                                { label: 'Item 3.2', url: `${baseTransitionOptions}#url32` },
                                { label: 'Item 3.3', url: `${baseTransitionOptions}#url33` },
                            ],
                        },
                    ],
                },
                { label: 'Item 2', url: `${baseTransitionOptions}#url2` },
            ],
        };
    },
});

const baseNodeSlot = '/?path=/story/fnavigation--node-slot';
export const NodeSlot = () => ({
    components: { FNavigation },
    template: `
        <div>
            <f-navigation animate :navigation="navigation">
                <template #node="node">
                    <button
                        :aria-expanded="node.parent ? (node.expanded ? \`true\` : \`false\`) : undefined"
                        :aria-controls="node.parent ? node.childrenId : undefined"
                        :data-node-id="node.id"
                        :style="node.itemStyle"
                        class="fnavigationnode_item"
                    >
                        <b>{{ node.label }}</b>
                        <template v-if="node.parent"> ({{ node.expanded ? 'expanded' : 'collapsed' }})</template>
                    </button>
                </template>
            </f-navigation>
        </div>
    `,
    data() {
        return {
            navigation: [
                {
                    label: 'Item 1',
                    _c: [
                        { label: 'Item 2.1 (target="_blank")', url: `${baseNodeSlot}#url21`, blank: true },
                        {
                            label: 'Item 2.2',
                            _c: [
                                { label: 'Item 3.1', url: `${baseNodeSlot}#url31` },
                                { label: 'Item 3.2', url: `${baseNodeSlot}#url32` },
                                { label: 'Item 3.3', url: `${baseNodeSlot}#url33` },
                            ],
                        },
                    ],
                },
                { label: 'Item 2', url: `${baseNodeSlot}#url2` },
            ],
        };
    },
});

const baseIconSlot = '/?path=/story/fnavigation--icon-slot';
export const IconSlot = () => ({
    components: { FNavigation, FIconset },
    template: `
        <div>
            <f-navigation animate :navigation="navigation">
                <template #icon="node">
                    <f-iconset v-if="node.icon" :icon="node.icon" />
                </template>
            </f-navigation>
        </div>
    `,
    data() {
        return {
            navigation: [
                {
                    icon: 'fantom',
                    label: 'Item 1',
                    _c: [
                        { icon: 'eye', label: 'Item 2.1 (target="_blank")', url: `${baseIconSlot}#url21`, blank: true },
                        {
                            label: 'Item 2.2',
                            _c: [
                                { label: 'Item 3.1', url: `${baseIconSlot}#url31` },
                                { label: 'Item 3.2', url: `${baseIconSlot}#url32` },
                                { label: 'Item 3.3', url: `${baseIconSlot}#url33` },
                            ],
                        },
                    ],
                },
                { label: 'Item 2', url: `${baseIconSlot}#url2` },
            ],
        };
    },
});

const baseParentIconSlot = '/?path=/story/fnavigation--parent-icon-slot';
export const ParentIconSlot = () => ({
    components: { FNavigation },
    template: `
        <div>
            <f-navigation animate :navigation="navigation">
                <template #parent-icon="{ parent }">
                    <span v-if="parent" class="fnavigationnode_item_parenticon rtl-mirror">
                        <svg style="width: 16px; height: 16px; transform: rotate(90deg)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"/></svg>
                    </span>
                </template>
            </f-navigation>
        </div>
    `,
    data() {
        return {
            navigation: [
                {
                    label: 'Item 1',
                    _c: [
                        { label: 'Item 2.1 (target="_blank")', url: `${baseParentIconSlot}#url21`, blank: true },
                        {
                            label: 'Item 2.2',
                            _c: [
                                { label: 'Item 3.1', url: `${baseParentIconSlot}#url31` },
                                { label: 'Item 3.2', url: `${baseParentIconSlot}#url32` },
                                { label: 'Item 3.3', url: `${baseParentIconSlot}#url33` },
                            ],
                        },
                    ],
                },
                { label: 'Item 2', url: `${baseParentIconSlot}#url2` },
            ],
        };
    },
});

const baseActions = '/?path=/story/fnavigation--actions';
export const Actions = () => ({
    components: { FNavigation, FButton },
    template: `
        <div>
            <div class="pab-2">
                <f-button @click.native="$refs.nav.expand()" size="small">
                    <code><b>expand()</b></code>
                </f-button>
                <f-button @click.native="$refs.nav.collapse()" size="small">
                    <code><b>collapse()</b></code>
                </f-button>
            </div>
            <div class="pab-2">
                <f-button @click.native="$refs.nav.highlightNode('node33')" size="small">
                    <code><b>highlightNode('node33')</b></code>
                </f-button>
                <f-button @click.native="$refs.nav.highlightNode('node33', true)" size="small">
                    <code><b>highlightNode('node33', true)</b> - highlight and expand</code>
                </f-button>
            </div>
            <div class="pab-2">
                <f-button @click.native="$refs.nav.highlightPath('node32')" size="small">
                    <code><b>highlightPath('node32')</b> - highlight node and its parents</code>
                </f-button>
                <f-button @click.native="$refs.nav.highlightPath('node32', true)" size="small">
                    <code><b>highlightPath('node41', true)</b> - highlight and expand</code>
                </f-button>
            </div>
            <div class="pab-5">
                <f-button @click.native="$refs.nav.background()" size="small">
                    <code><b>background()</b> - background highlighted node</code>
                </f-button>
                <f-button @click.native="$refs.nav.background(true)" size="small">
                    <code><b>background(true)</b> - background highlighted node and collapse</code>
                </f-button>
            </div>
            <f-navigation ref="nav" :navigation="navigation" />
        </div>
    `,
    data() {
        return {
            navigation: [
                {
                    label: 'Item 1',
                    _c: [
                        { label: 'Item 2.1 (target="_blank")', url: `${baseActions}#url21`, blank: true },
                        {
                            label: 'Item 2.2',
                            _c: [
                                { label: 'Item 3.1', url: `${baseActions}#url31` },
                                {
                                    id: 'node32',
                                    label: 'Item 3.2',
                                    url: `${baseActions}#url32`,
                                    _c: [{ id: 'node41', dontRender: true }],
                                },
                                { id: 'node33', label: 'Item 3.3', url: `${baseActions}#url33` },
                            ],
                        },
                    ],
                },
                { label: 'Item 2', url: `${baseActions}#url2` },
            ],
        };
    },
});
