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
                :value="val"
                class="inp"
                :aria-invalid="isInvalid"
                :aria-describedby="ariaDescribedBy"
                :class="inpClasses"
                @change="onChange"
            >
                <option v-for="item in data" :key="item.value" :value="item.value" :disabled="!!item.disabled">
                    {{ item.label }}
                </option>
            </select>
        </span>
        <slot name="bottom" v-bind="slotProps"></slot>
    </span>
</template>

<script>
import { helpersMixin } from '../../mixins/helpers.js';
import { selectMixin } from '../../mixins/select.js';
import { formInputMixin } from '../../mixins/form-input.js';
import { getUniqueId } from '../../utils';
import FLabel from '../FLabel/FLabel.vue';

export default {
    name: 'FSelect',

    components: { FLabel },

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
        /** Custom validator function */
        validator: {
            type: Function,
            default: null,
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
            val: this.value,
            isInvalid: this.invalid,
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
                'inp-invalid': this.isInvalid,
                'inp-lg': this.selectSize === 'large',
                'inp-sm': this.selectSize === 'small',
                'inp-xs': this.selectSize === 'mini',
            };
        },

        slotProps() {
            return {
                showErrorMessage: this.isInvalid,
                showInfoMessage: this.showInfoMessage,
                labeledById: this.labeledById,
            };
        },

        showInfoMessage() {
            return this.hideInfoOnError ? !this.isInvalid : true;
        },
    },

    watch: {
        value(_value) {
            this.val = _value;
        },

        data() {
            this.setSelected();
        },

        isInvalid() {
            this.setAriaDescribedBy();
        },
    },

    mounted() {
        this.setAriaDescribedBy();
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
                this.val = selectedItem.value;
                this.$emit('change', this.val);
            }
        },

        /**
         * Set aria-describedby attribute according to `isInvalid` property if FMessage child component exists.
         */
        setAriaDescribedBy() {
            const eSelect = this.$refs.select;
            let fMessage;

            if (this.isInvalid) {
                fMessage = this.getFMessage('error');
            } else {
                fMessage = this.getFMessage('info');
                // eSelect.setCustomValidity('');
                // this.ariaDescribedBy = null;
            }

            if (fMessage) {
                // set custom error message
                if (this.isInvalid) {
                    eSelect.setCustomValidity(fMessage.getMessage());
                } else {
                    eSelect.setCustomValidity('');
                }

                const id = getUniqueId();
                fMessage.$el.id = id;
                this.ariaDescribedBy = id;
            } else {
                this.ariaDescribedBy = null;
            }
        },

        async validate(_setError) {
            if (this.validator) {
                const result = this.validator(this.val);

                if (result instanceof Promise) {
                    const value = await result;
                    this.isInvalid = !value;
                } else {
                    this.isInvalid = !result;
                }

                if (_setError) {
                    this.setAriaDescribedBy();
                }
            }
        },

        /**
         * Get FMessage child component by type.
         *
         * @param {string} _type
         * @return {null|*|Vue}
         */
        getFMessage(_type) {
            const fMessages = this.findChildrenByName('f-message', true);
            let fMessage = null;

            for (let i = 0, len1 = fMessages.length; i < len1; i++) {
                fMessage = fMessages[i];
                if (fMessage && fMessage.$props.type === _type) {
                    break;
                }
            }

            return fMessage;
        },

        /**
         * @param {Event} _event
         */
        onChange(_event) {
            this.val = _event.target.value;

            this.$emit('change', this.val);

            this.validate();
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
