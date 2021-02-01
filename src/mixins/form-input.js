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
            validationState: {
                valid: !this.invalid,
                invalid: !!this.invalid,
                pending: false,
                validated: false,
                errors: [],
            },
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
                validationState: this.validationState,
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

            if (this.validationState.errors.length > 0) {
                ids.push(this.errorMsgId);
            }

            return ids.length > 0 ? ids.join(' ') : null;
        },
    },

    created() {
        this._pendingValidation = null;
    },

    methods: {
        async validate(_validator) {
            const validator = _validator || this.validator;

            if (typeof validator === 'function') {
                if (this._pendingValidation) {
                    return this._pendingValidation;
                }

                let result = validator(this.inputValue);
                const validationState = { ...this.validationState };

                if (result instanceof Promise) {
                    this._pendingValidation = result;
                    validationState.pending = true;

                    this.changeValidationState(validationState);

                    try {
                        result = await result;
                    } catch (_error) {
                        this._pendingValidation = null;
                        validationState.pending = false;
                        validationState.errors = [_error];

                        this.changeValidationState(validationState);

                        throw _error;
                    }
                }

                const invalid = isArray(result) ? result.length > 0 : !!result;
                let errorMsgs = [];

                if (isArray(result)) {
                    errorMsgs = result;
                } else if (typeof result === 'string') {
                    errorMsgs = result ? [result] : [];
                } else {
                    errorMsgs = invalid ? [this.errorMessage] : [];
                }

                validationState.errors = [...errorMsgs];
                validationState.invalid = invalid;
                validationState.valid = !invalid;
                validationState.pending = false;
                validationState.validated = true;

                this._pendingValidation = null;

                this.changeValidationState(validationState);
            }
        },

        changeValidationState(_validationState) {
            this.validationState = { ..._validationState };
            this.$emit('validation-state', _validationState);
        },
    },
};
