<template>
    <f-navigation
        ref="nav"
        animate
        v-bind="$attrs"
        :navigation="navigation"
        v-on="$listeners"
        class="faccordionnavigation"
    >
        <template #node="node">
            <a
                v-if="node.url"
                :href="node.url"
                :target="node.blank ? '_blank' : undefined"
                :aria-expanded="node.parent ? (node.expanded ? `true` : `false`) : undefined"
                :aria-controls="node.parent ? node.childrenId : undefined"
                :data-node-id="node.id"
                :style="node.itemStyle"
                class="fnavigationnode_item"
            >
                <template v-if="node.icon && iconsetComponent">
                    <component :is="iconsetComponent" :icon="node.icon" class="fnavigationnode_item_icon" />
                </template>
                <span class="fnavigationnode_item_label">{{ node.label }}</span>
                <f-svg-icon
                    v-if="node.parent"
                    size="16px"
                    rotate="180deg"
                    class="fnavigationnode_item_parenticon fsvgicon-rtl-mirror"
                >
                    <icon-angle-left />
                </f-svg-icon>
            </a>
            <router-link
                v-else-if="node.route"
                :to="{ name: node.route }"
                :target="node.blank ? '_blank' : undefined"
                :aria-expanded="node.parent ? (node.expanded ? `true` : `false`) : undefined"
                :aria-controls="node.parent ? node.childrenId : undefined"
                :data-node-id="node.id"
                :style="node.itemStyle"
                class="fnavigationnode_item"
            >
                <template v-if="node.icon && iconsetComponent">
                    <component :is="iconsetComponent" :icon="node.icon" class="fnavigationnode_item_icon" />
                </template>
                <span class="fnavigationnode_item_label">{{ node.label }}</span>
                <f-svg-icon
                    v-if="node.parent"
                    size="16px"
                    rotate="180deg"
                    class="fnavigationnode_item_parenticon fsvgicon-rtl-mirror"
                >
                    <icon-angle-left />
                </f-svg-icon>
            </router-link>
            <button
                v-else
                :aria-expanded="node.parent ? (node.expanded ? `true` : `false`) : undefined"
                :aria-controls="node.parent ? node.childrenId : undefined"
                :data-node-id="node.id"
                :style="node.itemStyle"
                class="fnavigationnode_item"
            >
                <template v-if="node.icon && iconsetComponent">
                    <component :is="iconsetComponent" :icon="node.icon" class="fnavigationnode_item_icon" />
                </template>
                <span class="fnavigationnode_item_label">{{ node.label }}</span>
                <f-svg-icon
                    v-if="node.parent"
                    size="16px"
                    rotate="180deg"
                    class="fnavigationnode_item_parenticon fsvgicon-rtl-mirror"
                >
                    <icon-angle-left />
                </f-svg-icon>
            </button>
        </template>
    </f-navigation>
</template>

<script>
import './FAccordionNavigation.types.js';
import FNavigation from '../FNavigation/FNavigation.vue';
import FSvgIcon from '../FSvgIcon/FSvgIcon.vue';
import IconAngleLeft from '../icons/IconAngleLeft.vue';

/**
 * Styled FNavigation with support for `router-link` and iconsets
 */
export default {
    name: 'FAccordionNavigation',

    components: { IconAngleLeft, FSvgIcon, FNavigation },

    inheritAttrs: false,

    props: {
        /** @type {FAccordionNavigationNode[]} */
        navigation: {
            type: Array,
            default() {
                return [];
            },
        },
        /** Name of iconset. Must be installed as a global vue component */
        iconsetComponent: {
            type: String,
            default: '',
        },
    },

    watch: {
        $route(_route) {
            this.highlightPathByRouteName(_route);
        },
        navigation() {
            this.$nextTick(() => {
                this.highlightPathByRouteName(this.$route);
            });
        },
    },

    methods: {
        highlightPathByRouteName(_route) {
            if (_route && _route.name) {
                this.$refs.nav.highlightPath(_route.name, true);
            }
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
