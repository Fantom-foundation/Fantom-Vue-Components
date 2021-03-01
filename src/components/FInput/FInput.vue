<template>
    <span :id="id" class="finput" :class="classes" @click="onClick">
        <slot name="top" v-bind="slotProps">
            <f-label v-if="label" native :id="labeledById" :label="label" />
        </slot>
        <template v-if="disabledAsText && disabled">
            {{ inputValue }}
        </template>
        <span v-else class="finput_inputcont" :class="inpClasses">
            <slot name="prefix"></slot>
            <template v-if="isTextarea">
                <textarea
                    :id="labeledById"
                    ref="input"
                    class="inp-nostyle textarea"
                    :class="{ 'inp-nostyle-preservefocus': preserveFocus }"
                    v-bind="inputProps"
                    :value="inputValue"
                    :aria-invalid="validationState.invalid"
                    :aria-describedby="ariaDescribedByIds"
                    @input="onInput"
                    @change="onChange"
                ></textarea>
            </template>
            <template v-else>
                <input
                    :id="labeledById"
                    ref="input"
                    class="inp-nostyle"
                    :class="{ 'inp-nostyle-preservefocus': preserveFocus }"
                    v-bind="inputProps"
                    :value="inputValue"
                    :aria-invalid="validationState.invalid"
                    :aria-describedby="ariaDescribedByIds"
                    @input="onInput"
                    @change="onChange"
                />
            </template>
            <slot name="suffix"></slot>
        </span>
        <slot name="bottom" v-bind="slotProps">
            <div v-if="validationState.errors.length > 0" :id="errorMsgId" class="ferrormessages">
                <div
                    v-for="(msg, idx) in validationState.errors"
                    :key="`${errorMsgId}_${idx}_err`"
                    class="ferrormessages_message"
                >
                    {{ msg }}
                </div>
            </div>
            <div v-else-if="infoText" :id="infoTextId" class="finfotext">
                {{ infoText }}
            </div>
        </slot>
    </span>
</template>

<script>
import { inputMixin } from '../../mixins/input.js';
import { helpersMixin } from '../../mixins/helpers.js';
import { formInputMixin } from '../../mixins/form-input.js';
import FLabel from '../FLabel/FLabel.vue';
import { throttle } from '../../utils/index.js';

/**
 * Input field (input or textarea) with slots.
 */
export default {
    name: 'FInput',

    components: { FLabel },

    mixins: [inputMixin, formInputMixin, helpersMixin],

    props: {
        /** Use textarea instead of input element */
        isTextarea: {
            type: Boolean,
            default: false,
        },
        /** Input type */
        type: {
            type: String,
            default: 'text',
        },
        /** Size of input, 'large' | 'small' */
        fieldSize: {
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
        /** Show disabled input/textarea as plain text, not disabled input/textarea */
        disabledAsText: {
            type: Boolean,
            default: false,
        },
        /** Don't style f-input as input field */
        noInputStyle: {
            type: Boolean,
            default: false,
        },
        /** Preserve focus when `noInputStyle` is `true` */
        preserveFocus: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            errmsgslot: 'suffix',
            ariaDescribedBy: null,
        };
    },

    computed: {
        classes() {
            return {
                'finput-prefixslot': this.hasSlot('prefix'),
                'finput-suffixslot': this.hasSlot('suffix'),
                'finput-bottomslot': this.hasSlot('bottom'),
                'finput-textarea': this.isTextarea,
                'finput-noinputstyle': this.noInputStyle,
            };
        },

        inpClasses() {
            return {
                'inp-invalid': this.validationState.invalid,
                'inp-lg': this.fieldSize === 'large',
                'inp-sm': this.fieldSize === 'small',
                'inp-xs': this.fieldSize === 'mini',
                'inp-readonly': this.readonly,
                'inp-disabled': this.disabled,
                inp: !this.noInputStyle,
                // 'inp-cont': !this.noInputStyle,
                'inp-cont': true,
                // 'textarea': this.isTextarea && !this.noInputStyle,
            };
        },

        fInputProps() {
            return {
                ...this.inputProps,
                label: this.label,
                isTextarea: this.isTextarea,
                // validator: this.validator,
                fieldSize: this.fieldSize,
                validateOnInput: this.validateOnInput,
                hideInfoOnError: this.hideInfoOnError,
            };
        },

        throttledInput() {
            return throttle(_event => this._onInput(_event), this.throttleInputInterval, true);
        },
    },

    watch: {
        value(_val) {
            const oldVal = this.inputValue;

            this.inputValue = _val;

            if (this.validateOnInput && oldVal !== _val) {
                this.validate();
            }
        },
    },

    methods: {
        /**
         * @param {Event} _event
         */
        onClick(_event) {
            const eInput = this.$refs.input;

            if (eInput && _event.target !== eInput) {
                eInput.focus();
            }
        },

        /**
         * @param {Event} _event
         */
        onInput(_event) {
            if (this.throttleInputInterval > 0) {
                this.throttledInput(_event);
            } else {
                this._onInput(_event);
            }
        },

        /**
         * @param {Event} _event
         */
        _onInput(_event) {
            this.inputValue = _event.target.value;

            /**
             * Passthrough input event
             * @type {Event}
             */
            this.$emit('input', _event.target.value);

            if (this.validateOnInput) {
                this.validate();
            }
        },

        onChange() {
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
