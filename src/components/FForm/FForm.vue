<template>
    <form ref="form" method="post" class="fform" novalidate @submit="onSubmit" @change="onChange">
        <slot></slot>
    </form>
</template>

<script>
import { eventBusMixin } from '../../mixins/event-bus.js';

export default {
    mixins: [eventBusMixin],

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
    },

    created() {
        /**
         * Reference to last changed form element
         * @type {HTMLElement}
         */
        this._lastChangedElem = null;
        this._submitAction = '';
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
                        // console.log(elem.name, elem.validity, elem.validationMessage);
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

        /**
         * Triggered when form element changes.
         *
         * @param {Event} _event
         */
        onChange(_event) {
            // this.getElementValue()
            this.$emit('component-change', {
                eTarget: _event.target,
                event: _event,
            });

            if (this.submitOnChange) {
                this._lastChangedElem = _event.target;

                this.submit();

                this._lastChangedElem = null;
            }
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
                    lastChangedElem: this._lastChangedElem || undefined,
                    event: _event,
                });
            } else {
                _event.preventDefault();

                this._submitAction = this.action;
            }
        },
    },
};
</script>

<style lang="scss">
@import 'style';
</style>
