<template>
    <div class="fmessage" :class="[classes, typeClass]">
        <!-- @slot Default to `type` prop -->
        <slot name="prefix">
            <template v-if="withIcon">
                <f-svg-icon v-if="type === 'success'" size="16px" aria-hidden="true">
                    <icon-check-circle />
                </f-svg-icon>
                <f-svg-icon v-else-if="type === 'error' || type === 'warning'" size="16px" aria-hidden="true">
                    <icon-exclamation-circle />
                </f-svg-icon>
                <f-svg-icon v-else-if="type === 'info'" size="16px" aria-hidden="true">
                    <icon-info-circle />
                </f-svg-icon>
            </template>
        </slot>
        <span class="fmessage_body"><slot></slot></span>
        <slot name="suffix"></slot>
    </div>
</template>

<script>
import { helpersMixin } from '../../mixins/helpers.js';
import FSvgIcon from '../FSvgIcon/FSvgIcon.vue';
import IconCheckCircle from '@/components/icons/IconCheckCircle.vue';
import IconExclamationCircle from '@/components/icons/IconExclamationCircle.vue';
import IconInfoCircle from '../icons/IconInfoCircle.vue';

/**
 * Component for displaying simple messages.
 */
export default {
    components: { IconExclamationCircle, IconCheckCircle, FSvgIcon, IconInfoCircle },
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
                'fmessage-withicon': this.withIcon,
                'fmessage-prefixslot': this.hasSlot('prefix'),
                'fmessage-suffixslot': this.hasSlot('suffix'),
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
