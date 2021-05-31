import { inputCommonMixin } from './input-common.js';
import FInput from '../components/FInput/FInput.vue';

export const fieldWithButtonMixin = {
    props: {
        /** Specifies if component is disabled */
        disabled: { ...inputCommonMixin.props.disabled },
        /** Size of input, 'large' | 'small' | '' */
        fieldSize: { ...FInput.props.fieldSize },
    },

    computed: {
        /**
         * Get button size according to field size.
         *
         * @returns {''|'mini'|'small'}
         */
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

        /**
         * Object passed to slots
         *
         * @returns {object}
         */
        slotProps() {
            return {
                buttonSize: this.buttonSize,
                buttonTitle: this.buttonTitle,
            };
        },
    },

    methods: {
        async validate() {
            await this.$refs.input.validate();
        },

        onInput(_value) {
            this.$emit('input', _value);
        },

        onValidationState(_validationState) {
            this.$emit('validation-state', _validationState);
        },
    },
};
