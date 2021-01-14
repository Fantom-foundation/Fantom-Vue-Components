// common props for custom inputs
export const buttonMixin = {
    props: {
        type: {
            type: String,
            default: 'button',
        },
        value: {
            type: [String, Number, Boolean, Object],
            default: null,
        },
        name: {
            type: String,
            default: null,
        },
        form: {
            type: String,
            default: null,
        },
        formaction: {
            type: String,
            default: null,
        },
        formenctype: {
            type: String,
            default: null,
        },
        formmethod: {
            type: String,
            default: null,
        },
        formtarget: {
            type: String,
            default: null,
        },
        formnovalidate: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        autofocus: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        buttonProps() {
            return {
                type: this.type,
                value: this.value,
                name: this.name,
                form: this.form,
                formaction: this.formaction,
                formenctype: this.formenctype,
                formmethod: this.formmethod,
                formtarget: this.formtarget,
                formnovalidate: this.formnovalidate,
                disabled: this.disabled,
                autofocus: this.autofocus,
            };
        },
    },
};
