<template>
    <form ref="form" method="post" class="fform" novalidate @submit="onSubmit" @reset="onReset">
        <slot v-bind="slotProps"></slot>
    </form>
</template>

<script>
import { eventBusMixin } from '../../mixins/event-bus.js';
import { cloneObject } from '../../utils/index.js';
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
            elementStates: this.elementStates,
            lastChangedElement: this.lastChangedElement,
        };
    },

    data() {
        return {
            elements: this.formValues || { ...this.values },
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

                return this.errorMessages.length === 0;
            } catch (_error) {
                this.pendingValidation = false;
                this.errorMessages.push(_error);
                console.error(_error);
                return false;
            }
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

            try {
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
