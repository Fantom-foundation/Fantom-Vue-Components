<template>
    <span class="fdatetimefield">
        <slot name="top" v-bind="slotProps">
            <f-label v-if="label" native :id="labeledById" :label="label" :required="required" />
        </slot>
        <span class="fdatetimefield_cont" :class="inpClasses">
            <input
                ref="date"
                :id="labeledById"
                type="date"
                v-bind="inputProps"
                :value="dateInputValue"
                @input="onDateInput"
                class="inp-nostyle fdatetimefield_date"
            />
            <input
                ref="time"
                type="time"
                v-bind="inputProps"
                :value="timeInputValue"
                @input="onTimeInput"
                class="inp-nostyle fdatetimefield_time"
                :aria-label="label"
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
import { formInputMixin } from '../../mixins/form-input.js';
import FLabel from '../FLabel/FLabel.vue';
import FErrorMessages from '../FErrorMessages/FErrorMessages.vue';
import FInfoText from '../FInfoText/FInfoText.vue';

export default {
    name: 'FDatetimeField',

    components: { FInfoText, FErrorMessages, FLabel },

    inheritAttrs: false,

    mixins: [formInputMixin],

    props: {
        value: {
            type: [String, Number, Boolean, Object, Date, Array],
            default: '',
        },
        /** Size of input, 'large' | 'small' */
        fieldSize: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
        /** Throttle onInput callback interval in milliseconds */
        throttleInputInterval: {
            type: Number,
            default: 0,
        },
        /** Validate on input event as well */
        validateOnInput: {
            type: Boolean,
            default: false,
        },
        /** Don't style f-input as input field */
        noStyle: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        invalid: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            inputValue: '',
            dateInputValue: '',
            timeInputValue: '',
        };
    },

    computed: {
        inpClasses() {
            return {
                'inp-invalid': this.validationState.invalid || this.invalid,
                'inp-lg': this.fieldSize === 'large',
                'inp-sm': this.fieldSize === 'small',
                'inp-xs': this.fieldSize === 'mini',
                'inp-readonly': this.readonly,
                'inp-disabled': this.disabled,
                inp: !this.noStyle,
                'inp-cont': true,
            };
        },

        inputProps() {
            return {
                disabled: this.disabled,
                invalid: this.invalid,
                validateOnInput: this.validateOnInput,
                hideInfoOnError: this.hideInfoOnError,
            };
        },
    },

    watch: {
        value: {
            handler(value) {
                const oldValue = this.inputValue;

                this.inputValue = this.formatIn(value);

                if (this.inputValue) {
                    const spl = this.inputValue.trim().split('T');

                    if (spl.length === 2) {
                        this.dateInputValue = spl[0];
                        this.timeInputValue = spl[1];
                    }
                }

                if (this.validateOnInput && oldValue !== value) {
                    this.validate();
                }
            },
            immediate: true,
        },

        inputValue(value) {
            this.$emit('input', this.formatOut(value));
        },
    },

    methods: {
        setValue() {
            const { $refs } = this;
            const date = $refs.date.value;
            const time = $refs.time.value;

            if (date && time) {
                this.inputValue = this.formatIn(`${date}T${time}`);

                if (this.validateOnChange || this.validateOnInput) {
                    this.validate();
                }
            }
        },

        onDateInput() {
            this.setValue();
        },

        onTimeInput() {
            this.setValue();
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
