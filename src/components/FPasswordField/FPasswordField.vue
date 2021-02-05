<template>
    <span class="fpasswordfield" :class="classes">
        <f-input
            ref="input"
            v-bind="$attrs"
            :type="dType"
            :field-size="fieldSize"
            :disabled="disabled"
            :invalid="invalid"
            @input="onInput"
            @validation-state="onValidationState"
        >
            <template #top="sProps">
                <slot name="top" v-bind="sProps"></slot>
            </template>
            <template #prefix="sProps">
                <slot name="prefix" v-bind="sProps"></slot>
            </template>
            <template #suffix="sProps">
                <span @click="onEyeButtonClick">
                    <slot name="button" v-bind="{ ...sProps, ...slotProps }">
                        <f-button :size="buttonSize" :disabled="disabled" tertiary round :title="buttonTitle">
                            <slot name="icon" v-bind="{ ...sProps, ...slotProps }">
                                <f-svg-icon v-if="dType === 'password'" size="1em"><icon-eye /></f-svg-icon>
                                <f-svg-icon v-else-if="dType === 'text'" size="1em"><icon-eye-slash /></f-svg-icon>
                            </slot>
                        </f-button>
                    </slot>
                </span>
            </template>
            <template #bottom="sProps">
                <slot name="bottom" v-bind="sProps"></slot>
            </template>
        </f-input>
    </span>
</template>

<script>
import FInput from '../FInput/FInput.vue';
import FButton from '../FButton/FButton.vue';
import FSvgIcon from '../FSvgIcon/FSvgIcon.vue';
import IconEye from '../icons/IconEye.vue';
import IconEyeSlash from '../icons/IconEyeSlash.vue';
import { inputCommonMixin } from '../../mixins/input-common.js';
import { translationsMixin } from '../../mixins/translations.js';

/**
 * Has the same props as FInput.
 */
export default {
    components: { IconEyeSlash, IconEye, FSvgIcon, FButton, FInput },

    mixins: [translationsMixin],

    props: {
        /** Specifies if component is disabled */
        disabled: { ...inputCommonMixin.props.disabled },
        /** Specifies if component is invalid */
        invalid: { ...inputCommonMixin.props.invalid },
        /** Size of input, 'large' | 'small' | '' */
        fieldSize: { ...FInput.props.fieldSize },
    },

    data() {
        return {
            dType: 'password',
            dInvalid: this.invalid,
        };
    },

    computed: {
        buttonSize() {
            const { fieldSize } = this;

            if (fieldSize === 'large') {
                return '';
            } else if (fieldSize === 'small') {
                return 'mini';
            } else {
                return 'small';
            }
        },

        buttonTitle() {
            return this.dType === 'password'
                ? this._('fpasswordfield.showPassword')
                : this._('fpasswordfield.hidePassword');
        },

        /**
         * Object passed to slots
         *
         * @returns {object}
         */
        slotProps() {
            return {
                type: this.dType,
                buttonSize: this.buttonSize,
                buttonTitle: this.buttonTitle,
            };
        },

        classes() {
            return {
                'fpasswordfield-invalid': this.dInvalid,
            };
        },
    },

    methods: {
        async validate() {
            await this.$refs.input.validate();
        },

        onEyeButtonClick() {
            if (!this.disabled) {
                if (this.dType === 'password') {
                    this.dType = 'text';
                } else {
                    this.dType = 'password';
                }
            }
        },

        onInput(_value) {
            this.$emit('input', _value);
        },

        onValidationState(_validationState) {
            this.dInvalid = _validationState.invalid;

            this.$emit('validation-state', _validationState);
        },
    },
};
</script>

<style lang="scss">
@import 'style';
</style>
