<template>
    <li class="fnavigationnode" :class="[classes, `fnavigationnode-level${level}`]" :style="style">
        <slot name="node" v-bind="slotProps">
            <a
                v-if="node.url"
                :href="node.url"
                :target="node.blank ? '_blank' : undefined"
                :aria-expanded="slotProps.parent ? (expanded ? `true` : `false`) : undefined"
                :aria-controls="slotProps.parent ? id : undefined"
                :data-node-id="node.id"
                :style="itemStyle"
                class="fnavigationnode_item"
            >
                <slot name="icon" v-bind="slotProps"></slot>
                <span class="fnavigationnode_item_label">{{ node.label }}</span>
                <slot name="parent-icon">
                    <f-svg-icon
                        v-if="cChildren.length"
                        size="16px"
                        rotate="180deg"
                        class="fnavigationnode_item_parenticon"
                    >
                        <icon-angle-left />
                    </f-svg-icon>
                </slot>
            </a>
            <button
                v-else
                :aria-expanded="slotProps.parent ? (expanded ? `true` : `false`) : undefined"
                :aria-controls="slotProps.parent ? id : undefined"
                :data-node-id="node.id"
                :style="itemStyle"
                class="fnavigationnode_item"
            >
                <slot name="icon" v-bind="slotProps"></slot>
                <span class="fnavigationnode_item_label">{{ node.label }}</span>
                <slot name="parent-icon" :parent="slotProps.parent">
                    <f-svg-icon
                        v-if="slotProps.parent"
                        size="16px"
                        rotate="180deg"
                        class="fnavigationnode_item_parenticon fsvgicon-rtl-mirror"
                    >
                        <icon-angle-left />
                    </f-svg-icon>
                </slot>
            </button>
        </slot>
        <template v-if="slotProps.parent">
            <f-height-transition
                :disabled="!animate"
                :transition-length="transitionLength"
                :transition-func="transitionFunc"
            >
                <ul ref="ul" v-show="slotProps.parent && expanded" :id="id">
                    <f-navigation-node
                        v-for="child in cChildren"
                        :key="child.id"
                        :node="child"
                        :level="level + 1"
                        :item-padding-inline-start="itemPaddingInlineStart"
                        :animate="animate"
                        :transition-length="transitionLength"
                        :transition-func="transitionFunc"
                    >
                        <!-- copy f-navigation-node slots -->
                        <template v-for="(index, name) in $scopedSlots" v-slot:[name]="_data">
                            <slot :name="name" v-bind="_data"></slot>
                        </template>
                    </f-navigation-node>
                </ul>
            </f-height-transition>
        </template>
    </li>
</template>

<script>
import './FNavigationNode.types.js';
import { setIds } from '../../utils/vue-helpers.js';
import { getUniqueId } from '../../utils/index.js';
import FSvgIcon from '../FSvgIcon/FSvgIcon.vue';
import IconAngleLeft from '../icons/IconAngleLeft.vue';
import FHeightTransition from '@/components/FHeightTransition/FHeightTransition.vue';
import { setCustomProperty } from '@/utils/css.js';

/**
 *
 */
export default {
    name: 'FNavigationNode',

    components: { FHeightTransition, IconAngleLeft, FSvgIcon },

    props: {
        /** @type {FNavigationNode} */
        node: {
            type: Object,
            default() {
                return {};
            },
        },
        /** Node's level */
        level: {
            type: Number,
            default: 1,
        },
        /** Left padding */
        itemPaddingInlineStart: {
            type: String,
            default: '18px',
        },
        /** Specifies if node expansion will be animated or not */
        animate: {
            type: Boolean,
            default: false,
        },
        /** Transition length for height transition and arrow icon animation */
        transitionLength: {
            type: String,
            default: '',
        },
        /** Transition func for height transition and arrow icon animation */
        transitionFunc: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            id: getUniqueId(),
            expanded: !!this.node.expanded,
            active: !!this.node.active,
            style: {},
        };
    },

    computed: {
        cChildren() {
            const children = this.node._c;

            if (children && children.length > 0) {
                setIds(children);
                return children.filter(_node => !_node.dontRender);
            }

            return [];
        },

        slotProps() {
            return {
                ...this.node,
                childrenId: this.id,
                parent: this.cChildren.length > 0,
                _c: undefined,
                expanded: this.expanded,
                active: this.active,
                itemStyle: this.itemStyle,
                level: this.level,
            };
        },

        classes() {
            return {
                'fnavigationnode-isparent': this.cChildren.length > 0,
                'fnavigationnode-expanded': this.expanded,
                'fnavigationnode-active': this.active,
                'fnavigationnode-animate': this.animate,
            };
        },

        itemStyle() {
            return { paddingInlineStart: `calc(${this.level} * ${this.itemPaddingInlineStart})` };
        },
    },

    watch: {
        'node.expanded': function(_value) {
            this.expanded = _value;
        },
        'node.active': function(_value) {
            this.active = _value;
        },
    },

    mounted() {
        this.setTransitionOptions(this.$el);
    },

    methods: {
        setTransitionOptions(elem) {
            if (this.transitionLength) {
                setCustomProperty('--fnavigationnode-transition-length', this.transitionLength, elem);
            }

            if (this.transitionFunc) {
                setCustomProperty('--fnavigationnode-transition-func', this.transitionFunc, elem);
            }
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
