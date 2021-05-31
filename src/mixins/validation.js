import { getUniqueId } from '../utils/index.js';

/**
 * Common props and methods for inputs with validation
 */
export const validationMixin = {
    props: {
        /** Custom validator function */
        validator: {
            type: Function,
            default: null,
        },
    },

    data() {
        return {
            isInvalid: this.invalid,
            ariaDescribedBy: null,
        };
    },

    computed: {
        slotProps() {
            return {
                showErrorMessage: this.isInvalid,
                showInfoMessage: this.showInfoMessage,
            };
        },

        showInfoMessage() {
            return this.hideInfoOnError ? !this.isInvalid : true;
        },
    },

    watch: {
        isInvalid() {
            this.setAriaDescribedBy();
        },
    },

    mounted() {
        this.setAriaDescribedBy();
    },

    methods: {
        async validate(_setError) {
            if (this.validator) {
                const result = this.validator(this.val);

                if (result instanceof Promise) {
                    const value = await result;
                    this.isInvalid = !value;
                } else {
                    this.isInvalid = !result;
                }

                if (_setError) {
                    this.setAriaDescribedBy();
                }
            }
        },

        /**
         * Set aria-describedby attribute according to `isInvalid` property if FMessage child component exists.
         */
        setAriaDescribedBy() {
            const eSelect = this.$refs.select;
            let fMessage;

            if (this.isInvalid) {
                fMessage = this.getFMessage('error');
            } else {
                fMessage = this.getFMessage('info');
                // eSelect.setCustomValidity('');
                // this.ariaDescribedBy = null;
            }

            if (fMessage) {
                // set custom error message
                if (this.isInvalid) {
                    eSelect.setCustomValidity(fMessage.getMessage());
                } else {
                    eSelect.setCustomValidity('');
                }

                const id = getUniqueId();
                fMessage.$el.id = id;
                this.ariaDescribedBy = id;
            } else {
                this.ariaDescribedBy = null;
            }
        },

        /**
         * Get FMessage child component by type.
         *
         * @param {string} _type
         * @return {null|*|Vue}
         */
        getFMessage(_type) {
            const fMessages = this.findChildrenByName('f-message', true);
            let fMessage = null;

            for (let i = 0, len1 = fMessages.length; i < len1; i++) {
                fMessage = fMessages[i];
                if (fMessage && fMessage.$props.type === _type) {
                    break;
                }
            }

            return fMessage;
        },
    },
};
