<template>
    <span class="foptiongroup" :class="classes">
        <slot name="top" v-bind="slotProps">
            <f-label v-if="label" :id="labeledById" :label="label" class="foptiongroup_label" />
        </slot>
        <span
            class="foptiongroup_options"
            role="group"
            :aria-labelledby="ariaLabeledByIds"
            :aria-describedby="ariaDescribedByIds"
            :aria-invalid="validationState.invalid"
        >
            <f-option
                v-for="item in foptions"
                :key="item.id"
                v-bind="{ ...$attrs, type, ...item }"
                :invalid="validationState.invalid"
                v-model="inputValue"
            />
        </span>
        <slot name="bottom" v-bind="slotProps">
            <div v-if="validationState.errors.length > 0">
                <component
                    :is="
                        typeof errorMessagesComponent === 'object'
                            ? errorMessagesComponent.name
                            : errorMessagesComponent
                    "
                    :errors-cont-id="errorMsgId"
                    :errors="validationState.errors"
                    :input-cont-id="dInputContId"
                    v-bind="{ ...(typeof errorMessagesComponent === 'object' ? errorMessagesComponent.props : {}) }"
                />
            </div>
            <div v-else-if="infoText">
                <f-info-text :text="infoText" :info-text-id="infoTextId" />
            </div>
        </slot>
    </span>
</template>

<script>
import { cloneObject, getUniqueId, isArray, isObject } from '../../utils/index.js';
import FOption from '../FOption/FOption.vue';
import FLabel from '../FLabel/FLabel.vue';
import FErrorMessages from '../FErrorMessages/FErrorMessages.vue';
import FInfoText from '../FInfoText/FInfoText.vue';
import { formInputMixin } from '../../mixins/form-input.js';

/**
 * Group of checkboxes or radio buttons.
 *
 * Has the same props as FOption.
 */
export default {
    name: 'FOptionGroup',

    components: { FLabel, FOption, FErrorMessages, FInfoText },

    mixins: [formInputMixin],

    inheritAttrs: false,

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
            foptions: [],
            inputValue: this.checked !== undefined ? this.checked : this.type === 'checkbox' ? [] : '',
            emptyValue: this.type === 'checkbox' ? [] : '',
        };
    },

    computed: {
        classes() {
            return {
                'foptiongroup-column': this.column,
                'foptiongroup-invalid': this.validationState.invalid,
            };
        },
    },

    watch: {
        inputValue(_value) {
            if (this.validateOnChange && !this._firstChange) {
                this.validate();
            }

            this.$emit('change', _value);

            this._firstChange = false;
        },

        data: {
            handler(_value, _oldValue) {
                if (JSON.stringify(_value) !== JSON.stringify(_oldValue)) {
                    this.foptions = this.getFOptionsProps();
                }
            },
            deep: true,
        },

        checked(_value) {
            this.inputValue = _value;
        },
    },

    created() {
        /** Signals first change of the component */
        this._firstChange = true;

        this.foptions = this.getFOptionsProps();
    },

    methods: {
        getFOptionsProps() {
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
    },
};
</script>

<style lang="scss">
@use "style";
</style>
