<template>
    <form ref="form" method="post" class="fform" novalidate @submit="onSubmit" @reset="onReset">
        <slot></slot>
    </form>
</template>

<script>
import { eventBusMixin } from '../../mixins/event-bus.js';
import { cloneObject } from '../../utils/index.js';

export default {
    mixins: [eventBusMixin],

    model: {
        prop: 'formValues',
        event: 'input',
    },

    props: {
        /** Submit form when an element is changed */
        submitOnChange: {
            type: Boolean,
            default: false,
        },
        /** Call preventDefault() on form submit event. */
        cancelSubmit: {
            type: Boolean,
            default: true,
        },
        values: {
            type: Object,
            default() {
                return {};
            },
        },
        formValues: {
            type: Object,
            default() {
                return null;
            },
        },
    },

    provide() {
        return {
            elements: this.elements,
            lastChangedElement: this.lastChangedElement,
        };
    },

    data() {
        return {
            elements: this.formValues || { ...this.values },
            lastChangedElement: {
                name: '',
                value: '',
                oldValue: '',
            },
        };
    },

    watch: {
        lastChangedElement: {
            handler(_value) {
                this.onElementChange(_value);
            },
            deep: true,
        },
    },

    created() {
        /** Initial values */
        this._initValues = {};
    },

    mounted() {
        this._initValues = cloneObject(this.elements);
        // this.getFFormInputs();
    },

    methods: {
        /**
         * Submit form.
         */
        submit(_buttonSelector) {
            const buttonSelector = _buttonSelector || '[type="submit"]';
            const eSubmitBtn = this.$refs.form.querySelector(buttonSelector);

            if (eSubmitBtn) {
                eSubmitBtn.click();
            }
        },

        /**
         * Reset form.
         */
        reset() {
            this.$refs.form.reset();
        },

        /**
         * @return {string[]}
         */
        getErrorMessages() {
            const errorMessages = [];
            const elements = this.$refs.form.elements;
            let elem;

            if (elements) {
                for (let i = 0, len1 = elements.length; i < len1; i++) {
                    elem = elements[i];
                    if (elem.name && elem.willValidate && !elem.checkValidity()) {
                        errorMessages.push(elem.validationMessage);
                    }
                }
            }

            return errorMessages;
        },

        /**
         * Check form validity.
         *
         * @return {Boolean}
         */
        async checkValidity() {
            const children = this.$children;
            let valid = true;
            let child;

            if (this.$refs.form) {
                for (let i = 0, len1 = children.length; i < len1; i++) {
                    child = children[i];
                    if (typeof child.validate === 'function') {
                        await child.validate(true);
                    }
                }

                valid = this.$refs.form.checkValidity();
                if (!valid) {
                    const errorMessages = this.getErrorMessages();

                    if (errorMessages.length > 0) {
                        this._eventBus.emit('aria-alert-replace', errorMessages.join(''));
                    }

                    this.$emit('not-valid');
                }

                return valid;
            }

            return valid;
        },

        onElementChange(_value) {
            this.$emit('element-change', cloneObject(_value));
        },

        /**
         * Triggered on form submit.
         *
         * @param {Event} _event
         */
        async onSubmit(_event) {
            if (this.cancelSubmit) {
                _event.preventDefault();
            }

            const valid = await this.checkValidity();

            if (valid) {
                this.$emit('submit', {
                    values: cloneObject(this.elements),
                    lastChangedElem: cloneObject(this.lastChangedElement),
                    event: _event,
                });
            } else {
                _event.preventDefault();
            }
        },

        /**
         * Triggered when form is about to reset.
         *
         * @param {Event} _event
         */
        onReset(_event) {
            const initValues = cloneObject(this._initValues);
            const { elements } = this;

            _event.preventDefault();

            Object.keys(elements).forEach(_key => {
                if (_key in initValues) {
                    elements[_key] = initValues[_key];
                } else {
                    // TODO: default value according to type
                    elements[_key] = '';
                }
            });

            this.$emit('reset', {
                values: cloneObject(initValues),
                event: _event,
            });
        },
    },
};
</script>

<style lang="scss">
@import 'style';
</style>
