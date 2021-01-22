<template>
    <span class="foptiongroup" :class="classes">
        <slot name="top">
            <span v-if="label" class="foptiongroup_label">{{ label }}</span>
        </slot>
        <span class="foptiongroup_options">
            <f-option
                v-for="item in foptions"
                :key="item.id"
                v-bind="{ ...$attrs, type, ...item }"
                v-model="inputValue"
            />
        </span>
        <slot name="bottom"></slot>
    </span>
</template>

<script>
import { cloneObject, getUniqueId, isArray, isObject } from '../../utils/index.js';
import FOption from '@/components/FOption/FOption.vue';

/**
 * Group of checkboxes or radio buttons.
 *
 * Has the same props as FOption.
 */
export default {
    name: 'FOptionGroup',

    components: { FOption },

    // inheritAttrs: false,

    model: {
        prop: 'checked',
        event: 'change',
    },

    props: {
        /**
         * Type of option to be used in option group
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
        /**
         * Identifies which FOption will be checked. Array of values for checkboxes, string for radio buttons.
         * @model
         */
        checked: {
            type: [Array, String],
        },
        /**
         * Data for FOptions.
         * Object - key is FOption value, value is FOption label
         * Array - properties for each FOption, example: [{value: '10', label: 'Checkbox 1', id: 'myid'}, ...]
         */
        data: {
            type: [Object, Array],
            required: true,
            default() {
                return [];
            },
        },
        /** Label for option group */
        label: {
            type: String,
            default: '',
        },
        /** Display FOptions as column */
        column: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            inputValue: this.checked !== undefined ? this.checked : this.type === 'checkbox' ? [] : '',
        };
    },

    computed: {
        foptions() {
            let items = [];
            const { data } = this;

            if (isObject(data)) {
                Object.keys(data).forEach(_key => {
                    items.push({
                        value: _key,
                        label: data[_key],
                    });
                });
            } else if (isArray(data)) {
                items = cloneObject(data);
            }

            if (items.length === 0) {
                items.push({
                    // value: this.elements[this.name],
                    label: this.label,
                });
            }

            items.forEach(_item => {
                if (!_item.id) {
                    _item.id = getUniqueId();
                }
            });

            return items;
        },

        classes() {
            return {
                'foptiongroup-column': this.column,
            };
        },
    },

    watch: {
        inputValue(_value) {
            this.$emit('change', _value);
        },

        checked(_value) {
            this.inputValue = _value;
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
