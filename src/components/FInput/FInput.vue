<template>
    <span :id="id" class="finput" :class="classes" @click="onClick">
        <slot name="top" v-bind="slotProps">
            <f-label v-if="!noLabel" native :id="labeledById" :required="required">
                <slot name="label">{{ label }}</slot>
            </f-label>
        </slot>
        <template v-if="disabledAsText && disabled">
            {{ inputValue }}
        </template>
        <span v-else class="finput_inputcont" :class="inpClasses" :id="dInputContId">
            <slot name="prefix"></slot>
            <template v-if="isTextarea">
                <template v-if="autoResizableTextarea">
                    <span class="finput_textarea_wrapper">
                        <textarea
                            :id="labeledById"
                            ref="input"
                            class="inp-nostyle textarea"
                            :class="{ 'inp-nostyle-preservefocus': preserveFocus }"
                            v-bind="inputProps"
                            :value="inputValue"
                            :aria-invalid="validationState.invalid || invalid"
                            :aria-describedby="ariaDescribedByIds"
                            :aria-controls="controlsId || null"
                            :aria-activedescendant="ariaActivedescendant || null"
                            :aria-autocomplete="ariaAutocomplete || null"
                            :aria-label="ariaLabel"
                            @input="onInput"
                            @change="onChange"
                            @focus="onFocus"
                            @blur="onBlur"
                        ></textarea>
                    </span>
                    <span ref="ghost" class="inp-nostyle textarea finput_textarea_ghost" aria-hidden="true"></span>
                </template>
                <template v-else>
                    <textarea
                        :id="labeledById"
                        ref="input"
                        class="inp-nostyle textarea"
                        :class="{ 'inp-nostyle-preservefocus': preserveFocus }"
                        v-bind="inputProps"
                        :value="inputValue"
                        :aria-invalid="validationState.invalid || invalid"
                        :aria-describedby="ariaDescribedByIds"
                        :aria-controls="controlsId || null"
                        :aria-activedescendant="ariaActivedescendant || null"
                        :aria-autocomplete="ariaAutocomplete || null"
                        :aria-label="ariaLabel"
                        @input="onInput"
                        @change="onChange"
                        @focus="onFocus"
                        @blur="onBlur"
                    ></textarea>
                </template>
            </template>
            <template v-else>
                <input
                    :id="labeledById"
                    ref="input"
                    class="inp-nostyle"
                    :class="{ 'inp-nostyle-preservefocus': preserveFocus }"
                    v-bind="inputProps"
                    :value="inputValue"
                    :aria-invalid="validationState.invalid || invalid"
                    :aria-describedby="ariaDescribedByIds"
                    :aria-controls="controlsId || null"
                    :aria-activedescendant="ariaActivedescendant || null"
                    :aria-autocomplete="ariaAutocomplete || null"
                    :aria-label="ariaLabel"
                    @input="onInput"
                    @change="onChange"
                    @focus="onFocus"
                    @blur="onBlur"
                />
            </template>
            <slot name="suffix"></slot>
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
import { inputMixin } from '../../mixins/input.js';
import { helpersMixin } from '../../mixins/helpers.js';
import { formInputMixin } from '../../mixins/form-input.js';
import FLabel from '../FLabel/FLabel.vue';
import { debounce } from '../../utils/function.js';
import FErrorMessages from '../FErrorMessages/FErrorMessages.vue';
import FInfoText from '../FInfoText/FInfoText.vue';
import { clearElement } from '@/utils/dom2.js';

/**
 * Input field (input or textarea) with slots.
 */
export default {
    name: 'FInput',

    inheritAttrs: false,

    components: { FInfoText, FErrorMessages, FLabel },

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
        /** Set this value on the blur event if input's value is not valid */
        autoCorrection: {
            type: [String, Number, Object],
            default: null,
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
        noStyle: {
            type: Boolean,
            default: false,
        },
        /** Preserve focus when `noStyle` is `true` */
        preserveFocus: {
            type: Boolean,
            default: false,
        },
        /**  */
        autoResizableTextarea: {
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
                'finput-autoresizetextarea': this.autoResizableTextarea,
                'finput-noinputstyle': this.noStyle,
            };
        },

        inpClasses() {
            return {
                'inp-invalid': this.validationState.invalid || this.invalid,
                'inp-lg': this.fieldSize === 'large',
                'inp-sm': this.fieldSize === 'small',
                'inp-xs': this.fieldSize === 'mini',
                'inp-readonly': this.readonly,
                'inp-disabled': this.disabled,
                inp: !this.noStyle,
                // 'inp-cont': !this.noStyle,
                'inp-cont': !this.autoResizableTextarea,
                // 'textarea': this.isTextarea && !this.noStyle,
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
            return debounce(_event => this._onInput(_event), this.throttleInputInterval);
        },
    },

    watch: {
        value(_val) {
            const oldVal = this.inputValue;

            this.inputValue = this.formatIn(_val);

            if (this.validateOnInput && oldVal !== _val) {
                this.validate();
            }
        },
    },

    mounted() {
        this.setGhostHtml(this.inputValue);
    },

    methods: {
        focus() {
            const { input } = this.$refs;

            if (input) {
                input.focus();
            }
        },

        select() {
            const { input } = this.$refs;

            if (input) {
                input.select();
            }
        },

        activate() {
            this.focus();
            // this.select();
        },

        /**
         * Set ghost element's html if auto resizing of textarea is on.
         *
         * @param {string} text
         */
        setGhostHtml(text) {
            const { ghost } = this.$refs;

            if (this.autoResizableTextarea && ghost) {
                // const lastChar = text.charAt(text.length - 1);
                const sText = text.split(/\n|\r|\n\r|\r\n/);

                clearElement(ghost);

                sText.forEach(text => {
                    ghost.appendChild(document.createTextNode(text));
                    ghost.appendChild(document.createElement('br'));
                });
            }
        },

        /**
         * @param {Event} _event
         */
        onClick(_event) {
            const { input } = this.$refs;

            if (input && _event.target !== input) {
                input.focus();
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

            this.setGhostHtml(_event.target.value);
        },

        /**
         * @param {Event} _event
         */
        _onInput(_event) {
            this.inputValue = this.formatIn(_event.target.value);

            /**
             * Passthrough input event
             * @type {Event}
             */
            this.$emit('input', this.formatOut(_event.target.value));

            if (this.validateOnInput) {
                this.validate();
            }
        },

        onChange() {
            if (this.validateOnChange) {
                this.validate();
            }
        },

        onFocus(event) {
            this.$emit('focus', event);
        },

        onBlur(event) {
            this.$emit('blur', event);

            if (this.autoCorrection !== null && this.validationState.invalid) {
                this.inputValue = this.autoCorrection;
                this.$emit('input', this.inputValue);
                this.validate();
            }
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
