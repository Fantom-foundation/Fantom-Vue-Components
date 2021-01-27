import { getUniqueId, isArray } from '../utils/index.js';

/**
 * Common props and methods for inputs with validation
 */
export const formInputMixin = {
    props: {
        /**
         * Custom validator function.
         * If return value is `true`, `errorMessage` will be displayed.
         * If returns non-empty string, the string will be displayed as an error message.
         * If returns non-empty array, all error messages in the array will be displayed.
         * @param {*} _value
         */
        validator: {
            type: Function,
            default: null,
        },
        /** Validate on change or input event */
        validateOnChange: {
            type: Boolean,
            default: false,
        },
        /** Error message to be displayed when validation fails */
        errorMessage: {
            type: String,
            default: '',
        },
        /** Additional information text besides label */
        infoText: {
            type: String,
            default: '',
        },
        /** Id (or ids separated by space) of element(s) that represents label for the component */
        labeledBy: {
            type: String,
            default: '',
        },
        /**
         * Id (or ids separated by space) of element(s) that represents description (besided label) for the component
         */
        describedBy: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            /** Represents current value of form input component */
            inputValue: this.value || '',
            /** Identifies what represents empty value of form input component */
            emptyValue: '',
            /** Identifies, if component is invalid or not */
            isInvalid: !!this.invalid,
            /** Current error messages */
            errorMsgs: [],
            labeledById: this.labeledBy || getUniqueId(),
            infoTextId: getUniqueId(),
            errorMsgId: getUniqueId(),
        };
    },

    computed: {
        /**
         * Object passed to slots
         *
         * @returns {{labeledById: (String|string), label: formInputMixin.computed.label}}
         */
        slotProps() {
            return {
                labeledById: this.labeledById,
                label: this.label,
                infoText: this.infoText,
                errorMsgs: this.errorMsgs,
            };
        },

        /**
         * Use in component's `aria-describedby` attribute
         *
         * @returns {string|null}
         */
        ariaLabeledByIds() {
            const ids = [];

            if (this.label) {
                ids.push(this.labeledById);
            }

            return ids.length > 0 ? ids.join(' ') : null;
        },

        /**
         * Use in component's `aria-describedby` attribute
         *
         * @returns {string|null}
         */
        ariaDescribedByIds() {
            const ids = [];

            if (this.describedBy) {
                ids.push(this.describedBy);
            }

            if (this.infoText) {
                ids.push(this.infoTextId);
            }

            if (this.errorMsgs.length > 0) {
                ids.push(this.errorMsgId);
            }

            return ids.length > 0 ? ids.join(' ') : null;
        },
    },

    methods: {
        async validate(_validator) {
            const validator = _validator || this.validator;

            if (typeof validator === 'function') {
                let result = validator(this.inputValue);

                if (result instanceof Promise) {
                    result = await result;
                }

                const invalid = isArray(result) ? result.length > 0 : !!result;

                if (isArray(result)) {
                    this.errorMsgs = result;
                } else if (typeof result === 'string') {
                    this.errorMsgs = result ? [result] : [];
                } else {
                    this.errorMsgs = invalid ? [this.errorMessage] : [];
                }

                // fire events only if isInvalid state changes
                if (this.isInvalid !== invalid) {
                    if (invalid) {
                        this.$emit('invalid', this.errorMsgs);
                    } else {
                        this.$emit('valid');
                    }
                }

                this.isInvalid = invalid;
            }
        },
    },
};
