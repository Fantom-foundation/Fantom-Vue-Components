<template>
    <button class="fbutton btn" v-bind="buttonProps" :class="classes">
        <slot>{{ label }}</slot>
    </button>
</template>

<script>
import { buttonMixin } from '../../mixins/button.js';

/**
 * Button wrapper
 */
export default {
    name: 'FButton',

    mixins: [buttonMixin],

    props: {
        /**
         * Size of the button
         *
         * @type {('large' | 'small' | 'mini')}
         */
        size: {
            type: String,
            default: '',
            validator: function(_value) {
                return ['', 'large', 'small', 'mini'].indexOf(_value) !== -1;
            },
        },
        /** Button's label */
        label: {
            type: String,
            default: '',
        },
        /** Specifies that button is styled as a secondary button */
        secondary: {
            type: Boolean,
            default: false,
        },
        /** Specifies that button is styled as a secondary button */
        tertiary: {
            type: Boolean,
            default: false,
        },
        /** Specifies that button have the same width and height and is rounded */
        round: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            val: this.value,
            isInvalid: this.invalid,
            errmsgslot: 'suffix',
            ariaDescribedBy: null,
            inputId: `${this.id}-f-inp`,
        };
    },

    computed: {
        classes() {
            const { size } = this;

            return {
                'btn-secondary': this.secondary,
                'btn-tertiary': this.tertiary,
                'btn-lg': size === 'large',
                'btn-sm': size === 'small',
                'btn-xs': size === 'mini',
                'btn-round btn-samesize': this.round,
            };
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
