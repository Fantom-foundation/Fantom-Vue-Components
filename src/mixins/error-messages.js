/**
 * Used in components that display error messages.
 */
export const errorMessagesMixin = {
    props: {
        /**
         * Id of element that wraps error messages. Used to inform assistive technology about errors.
         */
        errorsContId: {
            type: String,
            default: '',
            required: true,
        },
        /**
         * Array of error messages.
         */
        errors: {
            type: Array,
            default() {
                return [];
            },
        },
        inputContId: {
            type: String,
            default: '',
        },
    },
};
