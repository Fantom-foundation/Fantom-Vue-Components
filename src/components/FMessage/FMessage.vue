<template>
    <div class="fmessage" :class="[classes, typeClass]">
        <!-- @slot Default to `type` prop -->
        <slot name="prefix">
            <template v-if="withIcon">
                <!--
                <icon
                    v-if="type === 'success'"
                    data="@/assets/svg/message/check-circle.svg"
                    width="16"
                    height="16"
                    aria-hidden="true"
                />
                <icon
                    v-if="type === 'error' || type === 'warning'"
                    data="@/assets/svg/message/exclamation-circle.svg"
                    width="16"
                    height="16"
                    aria-hidden="true"
                />
                <icon
                    v-if="type === 'info'"
                    data="@/assets/svg/message/info-circle.svg"
                    width="16"
                    height="16"
                    aria-hidden="true"
                />
            -->
            </template>
        </slot>
        <span class="fmessage_body"><slot></slot></span>
        <slot name="suffix"></slot>
    </div>
</template>

<script>
import { helpersMixin } from '../../mixins/helpers.js';

/**
 * Component for displaying simple messages.
 */
export default {
    mixins: [helpersMixin],

    props: {
        /**
         * Type of message.
         *
         * @type {('success' | 'info' | 'warning' | 'error')}
         */
        type: {
            type: String,
            default: '',
            required: true,
            validator: function(_value) {
                return ['success', 'info', 'warning', 'error'].indexOf(_value) !== -1;
            },
        },
        /** Use icon with message. */
        withIcon: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        classes() {
            return {
                '-withicon': this.withIcon,
                '-prefixslot': this.hasSlot('prefix'),
                '-suffixslot': this.hasSlot('suffix'),
            };
        },

        typeClass() {
            return `fmessage-${this.type}`;
        },
    },

    methods: {
        getMessage() {
            return this.$slots.default ? this.$slots.default[0].text : '';
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
