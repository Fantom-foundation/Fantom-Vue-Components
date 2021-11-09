<template>
    <span class="fsearchfield">
        <f-input
            ref="input"
            v-bind="$attrs"
            type="search"
            :field-size="fieldSize"
            :disabled="disabled"
            :value="dValue"
            @input="onInput"
            @validation-state="onValidationState"
            class="inp-withbutton"
        >
            <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
                <slot :name="name" v-bind="data"></slot>
            </template>

            <template #prefix>
                <slot name="magnifier">
                    <f-svg-icon width="2.3em" height="1em" class="fsearchfield_searchicon"><icon-search /></f-svg-icon>
                </slot>
            </template>

            <template #suffix="sProps">
                <span @click="onButtonClick">
                    <slot name="button" v-bind="{ ...sProps, ...slotProps }">
                        <f-button
                            :size="buttonSize"
                            :disabled="disabled"
                            tertiary
                            round
                            :title="_('fsearchfield.deleteInputText')"
                            :style="{ visibility: dValue ? 'visible' : 'hidden' }"
                        >
                            <slot name="icon" v-bind="{ ...sProps, ...slotProps }">
                                <f-svg-icon size="1.2em"><icon-times /></f-svg-icon>
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
import IconTimes from '../icons/IconTimes.vue';
import IconSearch from '../icons/IconSearch.vue';
import { translationsMixin } from '../../mixins/translations.js';
import { fieldWithButtonMixin } from '../../mixins/field-with-button.js';

/**
 * Has the same props as FInput.
 */
export default {
    components: { IconTimes, IconSearch, FSvgIcon, FButton, FInput },

    mixins: [translationsMixin, fieldWithButtonMixin],

    props: {
        value: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            dValue: this.value,
        };
    },

    computed: {
        /**
         * Object passed to slots
         *
         * @returns {object}
         */
        slotProps() {
            return {
                value: this.dValue,
                ...fieldWithButtonMixin.computed.slotProps.call(this),
            };
        },
    },

    watch: {
        value(_value) {
            this.dValue = _value;
        },
    },

    methods: {
        onButtonClick() {
            if (this.dValue && !this.disabled) {
                this.dValue = '';
                this.$emit('input', this.dValue);
            }
        },

        onInput(_value) {
            this.dValue = _value;

            this.$emit('input', _value);
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
