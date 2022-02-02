<template>
    <div class="fforminput" :class="`fforminput_${type}`">
        <f-input
            v-if="_fInputTypes.includes(type)"
            ref="input"
            :is-textarea="type === 'textarea'"
            v-bind="{ ...$attrs, ...inputProps }"
            :type="type"
            :name="name"
            v-model="inputValue"
            v-on="$listeners"
            @validation-state="onValidationState"
        >
            <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
                <slot :name="name" v-bind="data"></slot>
            </template>
        </f-input>
        <template v-else-if="type === 'checkbox' || type === 'radio'">
            <f-option ref="input" :type="type" v-bind="{ ...$attrs, ...inputProps }" :name="name" v-model="inputValue">
                <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
                    <slot :name="name" v-bind="data"></slot>
                </template>
            </f-option>
        </template>
        <f-option-group
            v-else-if="type === 'checkboxgroup' || type === 'radiogroup'"
            ref="input"
            :type="type === 'checkboxgroup' ? 'checkbox' : 'radio'"
            v-bind="{ ...$attrs, ...inputProps }"
            :name="name"
            v-model="inputValue"
            v-on="$listeners"
            ignore-first-change
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
            v-on="$listeners"
            @validation-state="onValidationState"
        >
            <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
                <slot :name="name" v-bind="data"></slot>
            </template>
        </component>
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
import FSlider from '../FSlider/FSlider.vue';
import FToggleButton from '../FToggleButton/FToggleButton.vue';
import FComboBox from '../FComboBox/FComboBox.vue';
import FDatetimeField from '../FDatetimeField/FDatetimeField.vue';

const fInputTypes = ['text', 'textarea', 'number', 'email', 'date', 'datetime-local', 'time', 'search'];
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
    'slider',
    'toggle',
    'combobox',
    'datetime',
];

/**
 * Wrapper for form inputs (based on form-input mixin) intended to be used in `FForm` component.
 */
export default {
    name: 'FFormInput',

    components: {
        FSlider,
        FOptionGroup,
        FListbox,
        FSelect,
        FDropdownListbox,
        FInput,
        FOption,
        FPasswordField,
        FToggleButton,
        FComboBox,
        FDatetimeField,
    },

    model: {
        prop: 'modelValue',
        event: 'input',
    },

    inheritAttrs: false,

    inject: ['elements', 'elementStates', 'lastChangedElement'],

    props: {
        /**
         * Type of input. Can also be a name of a global component.
         *
         * @type {('text' | 'textarea' | 'number' | 'email' | 'date' | 'time' | 'select' | 'dropdownlistbox' | 'checkbox' | 'checkboxgroup' | 'radio' | 'radiogroup' | 'listbox' | 'passwordfield' | 'slider' | 'toggle')}
         */
        type: {
            type: String,
            default: 'text',
            validator: function(_value) {
                return types.indexOf(_value) !== -1 || !!_value;
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
            this._firstChange = false;

            this._oldInputValue = clone(_oldValue);
            this.$emit('input', _value);
            if (this.name && this.elements.elements) {
                this.elements.elements[this.name] = _value;
            }
        },

        modelValue(_value) {
            this.inputValue = _value;
        },

        'elements.reset': function(_value) {
            if (_value && this.name) {
                this._setElementValue();
            }
        },

        'elements.elements': {
            handler(_value) {
                const { name } = this;
                const { lastChangedElement } = this;

                if (_value && name && name in _value) {
                    const valStr = JSON.stringify(_value[name]);

                    if (valStr !== JSON.stringify(this._oldInputValue) || valStr !== JSON.stringify(this.inputValue)) {
                        // if (JSON.stringify(_value[name]) !== JSON.stringify(this._oldInputValue)) {
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
            this._setElementValue();
            this.$set(this.elementStates, this.name, {});
        }
    },

    beforeDestroy() {
        if (this.name) {
            this.$delete(this.elements.elements, this.name);
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
                case 'combobox':
                    return 'f-combo-box';
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
                case 'datetime':
                    return 'f-datetime-field';
                case 'slider':
                    return 'f-slider';
                case 'toggle':
                    return 'f-toggle-button';
            }

            return _type;
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
            return this.name in this.elements.elements ? this.elements.elements[this.name] : this.getEmptyValue();
        },

        _updateValidationState(_data) {
            this.elementStates[this.name] = {
                ...(this.elementStates[this.name] || {}),
                ..._data,
            };
        },

        _setElementValue() {
            let value = this.modelValue;

            if (value === undefined) {
                value = this.getInitialValue();
            }

            if (!value && value !== null) {
                value = this.inputValue;
            }

            // this.$set(this.elements.elements, this.name, this.modelValue || this.getInitialValue());
            // this.$set(this.elements.elements, this.name, this.modelValue || this.getInitialValue() || this.inputValue);
            this.$set(this.elements.elements, this.name, value);
        },

        onValidationState(_data) {
            this._updateValidationState(cloneObject(_data));
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
