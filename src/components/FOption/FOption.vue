<template>
    <label class="foption cr" :class="classes">
        <input
            v-bind="checkboxProps"
            :type="type"
            :checked="cChecked"
            :value="value"
            :aria-invalid="invalid"
            class="cr_input"
            @change="onChange"
        />
        <span class="cr_check"></span>
        <span class="cr_label">
            <slot v-bind="slotProps">{{ label }}</slot>
        </span>
    </label>
</template>

<script>
import { checkboxMixin } from '../../mixins/checkbox.js';
import { isArray } from '../../utils/index.js';

/**
 * Checkbox and radio button wrapper
 */
export default {
    name: 'FOption',

    mixins: [checkboxMixin],

    model: {
        prop: 'modelValue',
        event: 'change',
    },

    props: {
        /**
         * Type of option
         *
         * @type {('checkbox' | 'radio')}
         */
        type: {
            type: String,
            default: 'checkbox',
            validator: function(_value) {
                return ['checkbox', 'radio'].indexOf(_value) !== -1;
            },
        },
        modelValue: {
            default: '',
        },
        /**
         * Size of option
         *
         * @type {('large' | 'small' | 'mini')}
         */
        optionSize: {
            type: String,
            default: '',
            validator: function(_value) {
                return ['', 'large', 'small', 'mini'].indexOf(_value) !== -1;
            },
        },
        /**
         * Specifies, what value will return when checkbox is checked.
         */
        trueValue: {
            default: true,
        },
        /**
         * Specifies, what value will return when checkbox is unchecked.
         */
        falseValue: {
            default: false,
        },
    },

    data() {
        return {
            val: '',
        };
    },

    computed: {
        classes() {
            const { optionSize } = this;
            const { type } = this;

            return {
                'cr-checkbox': type === 'checkbox',
                'cr-radio': type === 'radio',
                'cr-lg': optionSize === 'large',
                'cr-sm': optionSize === 'small',
                'cr-xs': optionSize === 'mini',
                'cr-invalid': this.invalid,
            };
        },

        cChecked() {
            if (this.type === 'radio') {
                return this.checked || this.modelValue === this.value;
            } else {
                if (isArray(this.modelValue)) {
                    return this.modelValue.indexOf(this.value) > -1;
                }

                return this.checked || this.modelValue === this.trueValue;
            }
        },

        slotProps() {
            return {
                label: this.label,
            };
        },
    },

    methods: {
        onChange(_event) {
            const checked = _event.target.checked;

            if (this.type === 'radio') {
                this.$emit('change', this.value);
            } else {
                if (isArray(this.modelValue)) {
                    let value = [...this.modelValue];

                    if (checked) {
                        value.push(this.value);
                    } else {
                        value.splice(value.indexOf(this.value), 1);
                    }

                    this.$emit('change', value);
                } else {
                    this.$emit('change', checked ? this.trueValue : this.falseValue);
                }
            }
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
