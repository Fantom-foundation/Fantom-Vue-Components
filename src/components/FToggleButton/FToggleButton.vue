<template>
    <label class="ftogglebutton togglebtn togglebtn-v1" :class="classes">
        <input
            v-bind="checkboxProps"
            :checked="cChecked"
            :value="value"
            :aria-invalid="invalid"
            type="checkbox"
            class="togglebtn_input"
            @change="onChange"
        />
        <span class="togglebtn_btn"></span>
        <span class="togglebtn_label">
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
    name: 'FToggleButton',

    mixins: [checkboxMixin],

    model: {
        prop: 'modelValue',
        event: 'change',
    },

    props: {
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

            return {
                'togglebtn-lg': optionSize === 'large',
                'togglebtn-sm': optionSize === 'small',
                'togglebtn-xs': optionSize === 'mini',
                'togglebtn-invalid': this.invalid,
            };
        },

        cChecked() {
            if (isArray(this.modelValue)) {
                return this.modelValue.indexOf(this.value) > -1;
            }

            return this.checked || this.modelValue === this.trueValue;
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
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
