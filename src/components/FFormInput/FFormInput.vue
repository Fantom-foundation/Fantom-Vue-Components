<template>
    <div class="fforminput">
        <slot v-if="useLabel" name="label" v-bind="{ id: `${id}-f-inp`, label: label }">
            <label v-if="type !== 'checkbox' && type !== 'radio'" :for="`${id}-f-inp`" class="fforminput_label">
                {{ label }}
            </label>
            <span v-else class="fforminput_label">{{ label }}</span>
        </slot>
        <div class="fforminput_input">
            <f-input
                v-if="_fInputTypes.includes(type)"
                :is-textarea="type === 'textarea'"
                v-bind="{ ...$attrs, ...inputProps }"
                v-model="inputValue"
            >
                <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
                    <slot :name="name" v-bind="data"></slot>
                </template>
            </f-input>
            <template v-else-if="type === 'checkbox' || type === 'radio'">
                <f-option
                    v-for="item in foptions"
                    :key="item.id"
                    :type="type"
                    v-bind="{ ...$attrs, ...inputProps, ...item }"
                    v-model="inputValue"
                />
            </template>
            <f-select
                v-else-if="type === 'select'"
                v-bind="{ ...$attrs, ...inputProps }"
                v-model="inputValue"
                :data="data"
            >
                <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
                    <slot :name="name" v-bind="data"></slot>
                </template>
            </f-select>
            <f-dropdown-listbox
                v-else-if="type === 'dropdownlistbox'"
                v-bind="{ ...$attrs, ...inputProps }"
                v-model="inputValue"
                :data="data"
            >
                <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
                    <slot :name="name" v-bind="data"></slot>
                </template>
            </f-dropdown-listbox>
            <f-listbox
                v-else-if="type === 'listbox'"
                v-bind="{ ...$attrs, ...inputProps }"
                v-model="inputValue"
                :data="data"
            >
                <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
                    <slot :name="name" v-bind="data"></slot>
                </template>
            </f-listbox>
        </div>
    </div>
</template>

<script>
import { inputMixin } from '../../mixins/input.js';
import FOption from '../FOption/FOption.vue';
import { clone, cloneObject, getUniqueId, isArray, isObject } from '../../utils/index.js';
import FInput from '../FInput/FInput.vue';
import FDropdownListbox from '../FDropdownListbox/FDropdownListbox.vue';
import FSelect from '../FSelect/FSelect.vue';
import FListbox from '../FListbox/FListbox.vue';

/*
Bude emitovat 'change' a 'input', FForm se potom musi nabindovat na tyto udalosti u kazdeho FFormInputu.
 */

export default {
    name: 'FFormInput',

    components: { FListbox, FSelect, FDropdownListbox, FInput, FOption },

    mixins: [inputMixin],

    model: {
        prop: 'modelValue',
        event: 'input',
    },

    inheritAttrs: false,

    inject: ['elements', 'lastChangedElement'],

    props: {
        type: {
            type: String,
            default: 'text',
        },
        modelValue: {},
        data: {},
    },

    data() {
        return {
            foptions: [],
            inputValue: this.modelValue || this.getInitialValue(),
        };
    },

    computed: {
        useLabel() {
            switch (this.type) {
                case 'checkbox':
                case 'radio':
                    return this.foptions.length > 1;
                default:
                    return true;
            }
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

        data: {
            handler(_value, _oldValue) {
                if (JSON.stringify(_value) !== JSON.stringify(_oldValue)) {
                    this.foptions = this.getFOptionsProps();
                }
            },
            deep: true,
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
        this._fInputTypes = ['text', 'textarea', 'number', 'email', 'date', 'time'];
        /** Previous value of the component */
        this._oldInputValue = '';
        /** Signals first change of the component */
        this._firstChange = true;

        if (this.type === 'checkbox' || this.type === 'radio') {
            this.foptions = this.getFOptionsProps();
        }

        if (this.name) {
            this.$set(this.elements, this.name, this.modelValue || this.getInitialValue());
        }
    },

    beforeDestroy() {
        if (this.name) {
            this.$delete(this.elements, this.name);
        }
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

        getDefaultValue() {
            const { data } = this;

            switch (this.type) {
                case 'checkbox':
                case 'radio':
                    return data && ('length' in data || Object.keys(data).length > 1) ? [] : false;
                default:
                    return '';
            }
        },

        getInitialValue() {
            return this.name in this.elements ? this.elements[this.name] : this.getDefaultValue();
        },
    },
};
</script>

<style lang="scss">
@import 'style';
</style>
