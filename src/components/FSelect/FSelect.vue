<template>
    <span :id="id" class="fselect">
        <slot name="top" v-bind="slotProps">
            <f-label v-if="label" native :id="labeledById" :label="label" />
        </slot>
        <span class="sel" :class="selClasses">
            <select
                :id="labeledById"
                ref="select"
                v-bind="selectProps"
                :value="inputValue"
                class="inp"
                :aria-invalid="validationState.invalid"
                :aria-describedby="ariaDescribedByIds"
                :class="inpClasses"
                @change="onChange"
            >
                <option v-for="item in data" :key="item.value" :value="item.value" :disabled="!!item.disabled">
                    {{ item.label }}
                </option>
            </select>
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
import { helpersMixin } from '../../mixins/helpers.js';
import { selectMixin } from '../../mixins/select.js';
import { formInputMixin } from '../../mixins/form-input.js';
import FLabel from '../FLabel/FLabel.vue';
import FErrorMessages from '../FErrorMessages/FErrorMessages.vue';
import FInfoText from '../FInfoText/FInfoText.vue';

/**
 * Wrapper for `<select>` element
 */
export default {
    name: 'FSelect',

    components: { FLabel, FErrorMessages, FInfoText },

    mixins: [selectMixin, formInputMixin, helpersMixin],

    model: {
        prop: 'value',
        event: 'change',
    },

    props: {
        /**
         * Data for select element
         *
         * @type {[{value: string|number, label: string, disabled: boolean}]}
         */
        data: {
            type: Array,
            default() {
                return [];
            },
        },
        /**
         * Size of select
         *
         * @type {('large' | 'small' | 'mini')}
         */
        selectSize: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            errmsgslot: 'bottom',
            ariaDescribedBy: null,
        };
    },

    computed: {
        selClasses() {
            return {
                'sel-disabled': this.disabled,
                'sel-invalid': this.invalid,
                'sel-lg': this.selectSize === 'large',
                'sel-sm': this.selectSize === 'small',
                'sel-xs': this.selectSize === 'mini',
            };
        },

        inpClasses() {
            return {
                'inp-invalid': this.validationState.invalid,
                'inp-lg': this.selectSize === 'large',
                'inp-sm': this.selectSize === 'small',
                'inp-xs': this.selectSize === 'mini',
            };
        },
    },

    watch: {
        value(_value) {
            this.inputValue = _value;
        },

        data() {
            this.setSelected();
        },
    },

    mounted() {
        this.setSelected();
    },

    methods: {
        /**
         * Set selected item.
         */
        setSelected() {
            const { data } = this;

            if (data.length === 0) {
                return;
            }

            let selectedItem = null;

            for (let i = 0, len = data.length; i < len; i++) {
                if (data[i].selected) {
                    selectedItem = data[i];
                    break;
                }
            }

            if (!selectedItem && this.value === '') {
                selectedItem = data[0];
            }

            if (selectedItem) {
                this.inputValue = selectedItem.value;
                this.$emit('change', this.inputValue);
            }
        },

        /**
         * @param {Event} _event
         */
        onChange(_event) {
            this.inputValue = _event.target.value;

            this.$emit('change', this.inputValue);

            if (this.validateOnChange) {
                this.validate();
            }
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
