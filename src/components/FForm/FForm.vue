<template>
    <form ref="form" method="post" class="fform" novalidate @submit="onSubmit" @reset="onReset">
        <slot v-bind="slotProps"></slot>
    </form>
</template>

<script>
import { eventBusMixin } from '../../mixins/event-bus.js';
import { cloneObject, objectEquals } from '../../utils/index.js';
import { findChildrenByName } from '../../utils/vue-helpers.js';

/**
 * The component is intended to work only with the `FFormInput` components.
 */
export default {
    mixins: [eventBusMixin],

    model: {
        prop: 'formValues',
        event: 'input',
    },

    props: {
        /**
         * Text used before error list on form submit, if any form element error exist.
         * Text is invisible and read by screen readers.
         * `%n` will be replaced by actual number of error messages
         */
        formErrorText: {
            type: String,
            default: '%n form errors:',
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
        /** Submit form when an element is changed */
        submitOnChange: {
            type: Boolean,
            default: false,
        },
        /** Call preventDefault() on form submit event */
        cancelSubmit: {
            type: Boolean,
            default: true,
        },
        /** Method `isChanged` returns always `false` */
        noChangeCheck: {
            type: Boolean,
            default: false,
        },
        /** Submit form only if form has been changed */
        submitIfChanged: {
            type: Boolean,
            default: false,
        },
    },

    provide() {
        return {
            elements: this.elements,
            // elements: this.elements,
            elementStates: this.elementStates,
            lastChangedElement: this.lastChangedElement,
        };
    },

    data() {
        return {
            // elements: this.formValues || { ...this.values },
            elements: {
                elements: this.formValues || { ...this.values },
                reset: false,
            },
            elementStates: {},
            errorMessages: [],
            pendingValidation: false,
            lastChangedElement: {
                name: '',
                value: '',
                oldValue: '',
            },
        };
    },

    computed: {
        slotProps() {
            return {
                lastChangedElement: this.lastChangedElement,
                elementStates: this.elementStates,
                pendingValidation: this.pendingValidation,
                errorMessages: this.errorMessages,
            };
        },
    },

    watch: {
        lastChangedElement: {
            handler(_value) {
                this.onElementChange(_value);
            },
            deep: true,
        },

        elementStates: {
            handler(_value) {
                const states = cloneObject(_value);

                this.pendingValidation = this.pendingValidationExists(states);
                this.errorMessages = this.collectErrors(states);
            },
            deep: true,
        },

        formValues(_value, _oldValue) {
            if (_value === _oldValue) {
                return;
            }

            if (_value) {
                this.elements.reset = false;

                this.$nextTick(() => {
                    this.elements.reset = true;
                    this.elements.elements = _value;

                    this.$nextTick(() => {
                        this.refreshInitValues();
                    });
                });
            } else {
                this.refreshInitValues();
            }
        },
    },

    created() {
        /** Initial values */
        this._initValues = {};
    },

    mounted() {
        this.$nextTick(() => {
            this.refreshInitValues();
        });
    },

    methods: {
        /**
         * Submit form.
         */
        submit() {
            let eSubmitBtn = this.$refs.form.querySelector('[type="submit"]');

            if (!eSubmitBtn) {
                eSubmitBtn = this.createSubmitButton();
                this.$refs.form.appendChild(eSubmitBtn);
            }

            eSubmitBtn.click();
        },

        createSubmitButton() {
            const elem = document.createElement('button');

            elem.type = 'submit';
            elem.style.display = 'none';

            return elem;
        },

        /**
         * Reset form.
         */
        reset() {
            this.$refs.form.reset();
        },

        /**
         * Collect validation error messages from elements.
         *
         * @param {object} _elementStates
         * @return {array}
         */
        collectErrors(_elementStates) {
            let errors = [];

            Object.keys(_elementStates).forEach(_key => {
                const elementState = _elementStates[_key];

                if (elementState.invalid) {
                    errors = errors.concat(elementState.errors);
                }
            });

            return errors;
        },

        /**
         * Check if a pending validation exits.
         *
         * @param {object} _elementStates
         * @return {boolean}
         */
        pendingValidationExists(_elementStates) {
            const keys = Object.keys(_elementStates);

            for (let i = 0, len1 = keys.length; i < len1; i++) {
                if (_elementStates[keys[i]].pending) {
                    return true;
                }
            }

            return false;
        },

        /**
         * Check form validity.
         *
         * @return {Boolean}
         */
        async checkValidity() {
            const inputs = findChildrenByName(this.$children, 'f-form-input');
            const validationPromises = [];

            // this.pendingValidation = true;

            // collect promises from validation functions
            inputs.forEach(_input => {
                if (_input.willValidate) {
                    validationPromises.push(_input.validate());
                }
            });

            try {
                // await for all promises to settle
                await Promise.all(validationPromises);

                // this.pendingValidation = false;

                this.errorMessages = this.collectErrors(this.elementStates);

                this.ariaReportErrors(this.errorMessages);

                return this.errorMessages.length === 0;
            } catch (_error) {
                this.pendingValidation = false;
                this.errorMessages.push(_error);
                console.error(_error);
                return false;
            }
        },

        ariaReportErrors(_errors = []) {
            const eventBus = this._eventBus;

            if (_errors.length > 0) {
                eventBus.emit(
                    'aria-alert-replace',
                    `${this.formErrorText.replace('%n', _errors.length)} ${_errors.join(' ')}`
                );
            }
        },

        isChanged() {
            // return this.noChangeCheck ? false : !objectEquals(this._initValues, this.elements);
            return this.noChangeCheck ? false : !objectEquals(this._initValues, this.elements.elements);
        },

        getElements() {
            return cloneObject(this.elements.elements);
        },

        getLastChangedElement() {
            return cloneObject(this.lastChangedElement);
        },

        refreshInitValues() {
            this._initValues = this.getElements();
        },

        onElementChange(_value) {
            this.$emit('element-change', cloneObject(_value));

            if (this.submitOnChange) {
                this.submit();
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

            if (this.submitIfChanged && !this.isChanged()) {
                return;
            }

            try {
                const valid = await this.checkValidity();

                if (valid) {
                    const payload = {
                        values: this.getElements(),
                        lastChangedElem: this.getLastChangedElement(),
                        event: _event,
                        form: this,
                    };

                    this.$emit('submit', payload);
                } else {
                    _event.preventDefault();
                }
            } catch (_error) {
                _event.preventDefault();
                throw _error;
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
