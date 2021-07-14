<template>
    <nav class="fnavigation" @click="onCLick">
        <ul v-if="navigation.length">
            <f-navigation-node
                v-for="node in cNavigation"
                :key="node.id"
                :node="node"
                :item-padding-inline-start="itemPaddingInlineStart"
                :animate="animate"
                :transition-length="transitionLength"
                :transition-func="transitionFunc"
            >
                <!-- copy slots -->
                <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
                    <slot :name="name" v-bind="data"></slot>
                </template>
            </f-navigation-node>
        </ul>
    </nav>
</template>

<script>
import FNavigationNode from '../FNavigationNode/FNavigationNode.vue';
import { setIds } from '../../utils/vue-helpers.js';
import { getAttr } from '../../utils/DOM.js';
import { clone } from '../../utils/index.js';
import { findNodeBy, isParent, walkTree } from '../../utils/simple-tree.js';

export default {
    name: 'FNavigation',

    components: { FNavigationNode },

    props: {
        /** @type {FNavigationNode[]} */
        navigation: {
            type: Array,
            default() {
                return [];
            },
        },
        /** Specifies if whole tree is expanded or not */
        expanded: {
            type: Boolean,
            default: false,
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
            itemPaddingInlineStart: '18px',
        };
    },

    computed: {
        cNavigation() {
            setIds(this.navigation);

            return this.navigation.filter(_node => !_node.dontRender);
        },
    },

    watch: {
        expanded(_value) {
            if (_value) {
                this.expand();
            } else {
                this.collapse();
            }
        },
    },

    created() {
        /** Highlighted node's id */
        this._highlighted = '';

        if (this.expanded) {
            this.expand();
        }
    },

    mounted() {
        const itemPaddingInlineStart = window
            .getComputedStyle(this.$el)
            .getPropertyValue('--fnavigation-item-padding-inline-start');

        if (itemPaddingInlineStart) {
            this.itemPaddingInlineStart = itemPaddingInlineStart;
        }
    },

    methods: {
        /**
         * Expand whole navigation
         */
        expand() {
            walkTree(this.navigation, _node => {
                if (isParent(_node)) {
                    this.$set(_node, 'expanded', true);
                }
            });
        },

        /**
         * Collapse whole navigation
         */
        collapse() {
            walkTree(this.navigation, _node => {
                if (isParent(_node)) {
                    this.$set(_node, 'expanded', false);
                }
            });
        },

        /**
         * Highlight node by id
         *
         * @param {string} _nodeId
         * @param {boolean} [_expandPath] Expand all parents of the node
         */
        highlightNode(_nodeId, _expandPath = false) {
            this._highlight(_nodeId, false, _expandPath);
        },

        /**
         * Highlight path (node and its parents) by node's id
         *
         * @param {string} _nodeId
         * @param {boolean} [_expandPath] Expand all parents of the node
         */
        highlightPath(_nodeId, _expandPath = false) {
            this._highlight(_nodeId, true, _expandPath);
        },

        /**
         * Highlight node or path
         *
         * @param {string} _nodeId
         * @param {boolean} [_path] Highlight path
         * @param {boolean} [_expandPath] Expand all parents of the node
         * @private
         */
        _highlight(_nodeId, _path = false, _expandPath = false) {
            const node = findNodeBy(this.navigation, _nodeId);

            if (node.node) {
                this.background();
                this._highlighted = _nodeId;

                this.$set(node.node, 'active', true);

                if (_path) {
                    node.parents.forEach(_node => {
                        this.$set(_node, 'active', true);
                    });
                }

                if (_expandPath) {
                    node.parents.forEach(_node => {
                        this.$set(_node, 'expanded', true);
                    });
                }
            }
        },

        /**
         * Background node and its parents
         *
         * @param {boolean} [_collpasePath] Collapse all parents of the node
         */
        background(_collpasePath = false) {
            let node;

            if (this._highlighted) {
                node = findNodeBy(this.navigation, this._highlighted);

                if (node.node) {
                    this.$set(node.node, 'active', false);

                    node.parents.forEach(_node => {
                        this.$set(_node, 'active', false);
                    });
                }

                if (_collpasePath) {
                    node.parents.forEach(_node => {
                        this.$set(_node, 'expanded', false);
                    });
                }

                this._highlighted = '';
            }
        },

        /**
         * @param {Event} _event
         */
        onCLick(_event) {
            const elem = _event.target.closest('[data-node-id]');

            if (elem) {
                const id = getAttr(elem, 'data-node-id');

                if (id) {
                    const node = findNodeBy(this.cNavigation, id).node;

                    if (node) {
                        const event = { preventDefault: false };

                        this.$emit('node-selected', clone(node), event);

                        if (!event.preventDefault && isParent(node)) {
                            this.$set(node, 'expanded', !node.expanded);
                        }
                    }
                }
            }
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
