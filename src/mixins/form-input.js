import { getUniqueId } from '../utils/index.js';

/**
 * Common props and methods for inputs with validation
 */
export const formInputMixin = {
    props: {
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
            // inputValue: '',
            labeledById: this.labeledBy || getUniqueId(),
            infoTextId: getUniqueId(),
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

            return ids.length > 0 ? ids.join(' ') : null;
        },
    },
};
