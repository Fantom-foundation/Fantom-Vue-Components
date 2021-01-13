<template>
    <span :id="id" class="finput" :class="classes" @click="onClick">
        <slot name="top" v-bind="slotProps">
            <label :for="inputId">{{ label }}</label>
        </slot>
        <template v-if="disabledAsText && disabled">
            {{ val }}
        </template>
        <span v-else class="finput_inputcont" :class="inpClasses">
            <slot name="prefix"></slot>
            <template v-if="isTextarea">
                <textarea
                    :id="`${id}-f-inp`"
                    ref="input"
                    class="inp-nostyle textarea"
                    v-bind="inputProps"
                    :value="val"
                    :aria-invalid="isInvalid"
                    :aria-describedby="ariaDescribedBy"
                    @input="onInput"
                    @change="onChange"
                ></textarea>
            </template>
            <template v-else>
                <input
                    :id="inputId"
                    ref="input"
                    class="inp-nostyle"
                    v-bind="inputProps"
                    :value="val"
                    :aria-invalid="isInvalid"
                    :aria-describedby="ariaDescribedBy"
                    @input="onInput"
                    @change="onChange"
                />
            </template>
            <slot name="suffix"></slot>
        </span>
        <slot name="bottom" v-bind="slotProps"></slot>
    </span>
</template>

<script>
import { inputMixin } from '../../mixins/input.js';
import { helpersMixin } from '../../mixins/helpers.js';
import { getUniqueId } from '../../utils';
import { eventBusMixin } from '../../mixins/event-bus.js';

/**
 * Input field (input or textarea) with slots.
 */
export default {
    name: 'FInput',

    mixins: [inputMixin, helpersMixin, eventBusMixin],

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
        /** Custom validator function */
        validator: {
            type: Function,
            default: null,
        },
        /** Size of input, 'large' | 'small' */
        fieldSize: {
            type: String,
            default: '',
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
    },

    data() {
        return {
            val: this.value,
            isInvalid: this.invalid,
            errmsgslot: 'suffix',
            ariaDescribedBy: null,
            inputId: `${this.id}-f-inp`,
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
                'inp-invalid': this.isInvalid,
                'inp-lg': this.fieldSize === 'large',
                'inp-sm': this.fieldSize === 'small',
                'inp-xs': this.fieldSize === 'mini',
                'inp-readonly': this.readonly,
                'inp-disabled': this.disabled,
                inp: !this.noInputStyle,
                'inp-cont': !this.noInputStyle,
                // 'textarea': this.isTextarea && !this.noInputStyle,
            };
        },

        fInputProps() {
            return {
                ...this.inputProps,
                label: this.label,
                isTextarea: this.isTextarea,
                validator: this.validator,
                fieldSize: this.fieldSize,
                validateOnInput: this.validateOnInput,
                hideInfoOnError: this.hideInfoOnError,
            };
        },

        slotProps() {
            return {
                showErrorMessage: this.isInvalid,
                showInfoMessage: this.showInfoMessage,
                inputId: this.inputId,
                label: this.label,
            };
        },

        showInfoMessage() {
            return this.hideInfoOnError ? !this.isInvalid : true;
        },
    },

    watch: {
        value(_val) {
            const oldVal = this.val;

            this.val = _val;

            if (this.validateOnInput && oldVal !== _val) {
                this.validate();
            }
        },

        isInvalid() {
            this.setAriaDescribedBy();
        },
    },

    mounted() {
        this.setAriaDescribedBy();
    },

    methods: {
        /**
         * Set aria-describedby attribute according to `isInvalid` property if FMessage child component exists.
         */
        setAriaDescribedBy() {
            const eInput = this.$refs.input;
            let fMessage;

            if (this.isInvalid) {
                fMessage = this.getFMessage('error');
            } else {
                fMessage = this.getFMessage('info');
                // eInput.setCustomValidity('');
                // this.ariaDescribedBy = null;
            }

            if (fMessage) {
                if (eInput) {
                    // set custom error message
                    if (this.isInvalid) {
                        eInput.setCustomValidity(fMessage.getMessage());
                    } else {
                        eInput.setCustomValidity('');
                    }
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
            this.val = _event.target.value;

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
            this.validate();
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
