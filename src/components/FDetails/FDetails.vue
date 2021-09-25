<template>
    <details class="fdetails" :open="dOpened || undefined" :class="classes" @click="onClick">
        <summary @click.prevent="onSummaryClick">
            <span class="fdetails_label">
                <!-- @slot Default to `label` prop -->
                <slot name="label">
                    {{ label }}
                </slot>
            </span>
            <span class="fdetails_icon">
                <!-- @slot Default to `icon-angle-left` icon -->
                <slot name="icon">
                    <f-svg-icon size="16px" rotate="180deg" class="fsvgicon-rtl-mirror">
                        <icon-angle-left />
                    </f-svg-icon>
                </slot>
            </span>
        </summary>

        <f-height-transition @transition-end="onTransitionEnd" :disabled="!animate">
            <div v-show="opened" class="fdetails_content_wrap">
                <div class="fdetails_content">
                    <slot></slot>
                </div>
            </div>
        </f-height-transition>
    </details>
</template>

<script>
import FHeightTransition from '../FHeightTransition/FHeightTransition.vue';
import FSvgIcon from '../FSvgIcon/FSvgIcon.vue';
import IconAngleLeft from '../icons/IconAngleLeft.vue';

/**
 * Wrapper component for `<details>` element with support for open/close animation.
 */
export default {
    name: 'FDetails',

    components: { IconAngleLeft, FSvgIcon, FHeightTransition },

    props: {
        /** Specifies if component is collapsed or not */
        open: {
            type: Boolean,
            default: false,
        },
        /** Label */
        label: {
            type: String,
            default: '',
        },
        /** Use content and icon animation */
        animate: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            opened: this.open,
            dOpened: this.open,
        };
    },

    computed: {
        classes() {
            return {
                'fdetails-open': this.opened,
                'fdetails-animate': this.animate,
            };
        },
    },

    methods: {
        onSummaryClick() {
            this.opened = !this.opened;

            if (this.opened) {
                this.dOpened = true;
                /**
                 * Triggers when component changes open/close state
                 *
                 * @property {boolean} opened
                 */
                this.$emit('toggle', true);
            }
        },

        onTransitionEnd(type) {
            if (type === 'leave') {
                this.dOpened = false;
                /**
                 * Triggers when component changes open/close state
                 *
                 * @property {boolean} opened
                 */
                this.$emit('toggle', false);
            }
        },

        onClick(event) {
            // prevent default <details> behavior
            event.preventDefault();
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
