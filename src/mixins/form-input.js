import { getUniqueId } from '../utils/index.js';

/**
 * Common props and methods for inputs with validation
 */
export const formInputMixin = {
    props: {
        /** Id of element that represents label for the component */
        labeledBy: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            labeledById: this.labeledBy || getUniqueId(),
        };
    },

    computed: {
        slotProps() {
            return {
                labeledById: this.labeledById,
                label: this.label,
            };
        },
    },
};
