<template>
    <span class="fpasswordfield">
        <f-input
            ref="input"
            v-bind="$attrs"
            :type="dType"
            :field-size="fieldSize"
            :disabled="disabled"
            @input="onInput"
            @validation-state="onValidationState"
            class="inp-withbutton"
        >
            <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
                <slot :name="name" v-bind="data"></slot>
            </template>

            <template #suffix="sProps">
                <span @click="onEyeButtonClick">
                    <slot name="button" v-bind="{ ...sProps, ...slotProps }">
                        <f-button :size="buttonSize" :disabled="disabled" tertiary round :title="buttonTitle">
                            <slot name="icon" v-bind="{ ...sProps, ...slotProps }">
                                <f-svg-icon v-if="dType === 'password'" size="1.2em"><icon-eye /></f-svg-icon>
                                <f-svg-icon v-else-if="dType === 'text'" size="1.2em"><icon-eye-slash /></f-svg-icon>
                            </slot>
                        </f-button>
                    </slot>
                </span>
            </template>
        </f-input>
    </span>
</template>

<script>
import FInput from '../FInput/FInput.vue';
import FButton from '../FButton/FButton.vue';
import FSvgIcon from '../FSvgIcon/FSvgIcon.vue';
import IconEye from '../icons/IconEye.vue';
import IconEyeSlash from '../icons/IconEyeSlash.vue';
import { translationsMixin } from '../../mixins/translations.js';
import { fieldWithButtonMixin } from '../../mixins/field-with-button.js';

/**
 * Has the same props as FInput.
 */
export default {
    components: { IconEyeSlash, IconEye, FSvgIcon, FButton, FInput },

    mixins: [translationsMixin, fieldWithButtonMixin],

    data() {
        return {
            dType: 'password',
        };
    },

    computed: {
        buttonTitle() {
            return this.dType === 'password'
                ? this._('fpasswordfield.showPassword')
                : this._('fpasswordfield.hidePassword');
        },

        /**
         * Object passed to slots
         *
         * @returns {object}
         */
        slotProps() {
            return {
                type: this.dType,
                ...fieldWithButtonMixin.computed.slotProps.call(this),
            };
        },
    },

    methods: {
        onEyeButtonClick() {
            if (!this.disabled) {
                if (this.dType === 'password') {
                    this.dType = 'text';
                } else {
                    this.dType = 'password';
                }
            }
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
