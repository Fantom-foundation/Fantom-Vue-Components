/**
 * Used in components that display info texts.
 */
export const infoTextMixin = {
    props: {
        /**
         * Id of element that wraps info text. Used to inform assistive technology.
         */
        infoTextId: {
            type: String,
            default: '',
            required: true,
        },
        text: {
            type: String,
            default: '',
        },
    },
};
