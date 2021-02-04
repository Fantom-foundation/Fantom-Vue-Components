<template>
    <div class="fforminput">
        <div class="fforminput_input">
            <f-input
                v-if="_fInputTypes.includes(type)"
                ref="input"
                :is-textarea="type === 'textarea'"
                v-bind="{ ...$attrs, ...inputProps }"
                :type="type"
                :name="name"
                v-model="inputValue"
                @validation-state="onValidationState"
            >
                <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
                    <slot :name="name" v-bind="data"></slot>
                </template>
            </f-input>
            <template v-else-if="type === 'checkbox' || type === 'radio'">
                <f-option
                    ref="input"
                    :type="type"
                    v-bind="{ ...$attrs, ...inputProps }"
                    :name="name"
                    v-model="inputValue"
                />
            </template>
            <f-option-group
                v-else-if="type === 'checkboxgroup' || type === 'radiogroup'"
                ref="input"
                :type="type === 'checkboxgroup' ? 'checkbox' : 'radio'"
                v-bind="{ ...$attrs, ...inputProps }"
                :name="name"
                v-model="inputValue"
                @validation-state="onValidationState"
            >
                <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
                    <slot :name="name" v-bind="data"></slot>
                </template>
            </f-option-group>
            <component
                v-else
                :is="getComponentName(type)"
                ref="input"
                v-bind="{ ...$attrs, ...inputProps }"
                :name="name"
                v-model="inputValue"
                @validation-state="onValidationState"
            >
                <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
                    <slot :name="name" v-bind="data"></slot>
                </template>
            </component>
        </div>
    </div>
</template>

<script>
import FOption from '../FOption/FOption.vue';
import { clone, cloneObject } from '../../utils/index.js';
import FInput from '../FInput/FInput.vue';
import FDropdownListbox from '../FDropdownListbox/FDropdownListbox.vue';
import FSelect from '../FSelect/FSelect.vue';
import FListbox from '../FListbox/FListbox.vue';
import FOptionGroup from '../FOptionGroup/FOptionGroup.vue';
import FPasswordField from '../FPasswordField/FPasswordField.vue';

const fInputTypes = ['text', 'textarea', 'number', 'email', 'date', 'time'];
const types = [
    ...fInputTypes,
    'select',
    'dropdownlistbox',
    'checkbox',
    'checkboxgroup',
    'radio',
    'radiogroup',
    'listbox',
    'passwordfield',
];

/**
 * Wrapper for form inputs (based on form-input mixin) intended to be used in `FForm` component.
 */
export default {
    name: 'FFormInput',

    components: { FOptionGroup, FListbox, FSelect, FDropdownListbox, FInput, FOption, FPasswordField },

    model: {
        prop: 'modelValue',
        event: 'input',
    },

    // inheritAttrs: false,

    inject: ['elements', 'elementStates', 'lastChangedElement'],

    props: {
        /**
         * Type of input
         *
         * @type {('text' | 'textarea' | 'number' | 'email' | 'date' | 'time' | 'select' | 'dropdownlistbox' | 'checkbox' | 'checkboxgroup' | 'radio' | 'radiogroup' | 'listbox' | 'passwordfield')}
         */
        type: {
            type: String,
            default: 'text',
            validator: function(_value) {
                return types.indexOf(_value) !== -1;
            },
        },
        name: {
            type: String,
            default: '',
        },
        modelValue: {},
    },

    data() {
        return {
            inputValue: this.modelValue || this.getInitialValue(),

            inputProps: {},
        };
    },

    computed: {
        willValidate() {
            const { input } = this.$refs;

            return input ? typeof input.validate === 'function' : false;
        },
    },

    watch: {
        inputValue(_value, _oldValue) {
            this._oldInputValue = clone(_oldValue);
            this.$emit('input', _value);
            if (this.name) {
                this.elements[this.name] = _value;
            }
        },

        modelValue(_value) {
            this.inputValue = _value;
        },

        elements: {
            handler(_value) {
                const { name } = this;
                const { lastChangedElement } = this;

                if (_value && name in _value) {
                    if (JSON.stringify(_value[name]) !== JSON.stringify(this._oldInputValue)) {
                        if (!this._firstChange) {
                            lastChangedElement.name = name;
                            lastChangedElement.value = clone(_value[name]);
                            lastChangedElement.oldValue = clone(this._oldInputValue);

                            this._updateValidationState(cloneObject(lastChangedElement));
                        }

                        this.inputValue = clone(_value[name]);

                        this._firstChange = false;
                    }

                    this._oldInputValue = clone(_value[name]);
                }
            },
            deep: true,
        },
    },

    created() {
        /** Array of allowed types for f-input component */
        this._fInputTypes = fInputTypes;
        /** Previous value of the component */
        this._oldInputValue = '';
        /** Signals first change of the component */
        this._firstChange = true;

        if (this.name) {
            this.$set(this.elements, this.name, this.modelValue || this.getInitialValue());
            this.$set(this.elementStates, this.name, {});
        }
    },

    beforeDestroy() {
        if (this.name) {
            this.$delete(this.elements, this.name);
        }
    },

    methods: {
        /**
         * @return {Promise<null|*>}
         */
        async validate() {
            const { input } = this.$refs;

            return input && typeof input.validate === 'function' ? input.validate() : undefined;
        },

        /**
         * Get component name by type.
         *
         * @param {string} _type
         * @return {string}
         */
        getComponentName(_type) {
            switch (_type) {
                case 'select':
                    return 'f-select';
                case 'dropdownlistbox':
                    return 'f-dropdown-listbox';
                case 'listbox':
                    return 'f-listbox';
                case this._fInputTypes.indexOf(_type) > -1:
                case 'textarea':
                    return 'f-input';
                case 'checkbox':
                case 'radio':
                    return 'f-option';
                case 'checkboxgroup':
                case 'radiogroup':
                    return 'f-option-group';
                case 'passwordfield':
                    return 'f-password-field';
            }

            return '';
        },

        getValidationState() {
            const { input } = this.$refs;

            return input && input.validationState ? cloneObject(input.validationState) : {};
        },

        getEmptyValue() {
            switch (this.type) {
                case 'checkbox':
                case 'radio':
                    return false;
                case 'checkboxgroup':
                case 'radiogroup':
                    return [];
                default:
                    return '';
            }
        },

        getInitialValue() {
            return this.name in this.elements ? this.elements[this.name] : this.getEmptyValue();
        },

        _updateValidationState(_data) {
            this.elementStates[this.name] = {
                ...(this.elementStates[this.name] || {}),
                ..._data,
            };
        },

        onValidationState(_data) {
            this._updateValidationState(cloneObject(_data));
        },
    },
};
</script>

<style lang="scss">
@import 'style';
</style>
