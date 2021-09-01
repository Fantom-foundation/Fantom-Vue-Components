<template>
    <span class="fstylednumberrange" :style="cStyles">
        <slot :value="cValue" :percentage="percentage" :convertToPercentages="convertToPercentages">
            <template v-if="convertToPercentages"> {{ percentage }}% </template>
            <template v-else>
                {{ cValue }}
            </template>
        </slot>
    </span>
</template>

<script>
/**
 * Component for displaying a number styled according to the value from the given range
 */
import { clamp } from '../../utils/number.js';

export default {
    name: 'FStyledNumberRange',

    props: {
        /** Current value. */
        value: {
            type: [String, Number],
            default: 10,
        },
        /** Minimal value. */
        min: {
            type: Number,
            default: 0,
        },
        /** Maximal value. */
        max: {
            type: Number,
            default: 100,
        },
        /**
         * Css styles of number for given values.
         * If current value is bigger than value from `styles` array, css style from array will be used.
         * @type {{style: Object, value: number}[]}
         */
        styles: {
            type: Array,
            default() {
                return [];
            },
        },
        /** Convert value to percetnage */
        convertToPercentages: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            numberColor: '',
        };
    },

    computed: {
        cValue() {
            let value = this.value;

            value = clamp(value, this.min, this.max);

            return value;
        },

        percentage() {
            return Math.round(((this.cValue - this.min) / (this.max - this.min)) * 100);
        },

        cStyles() {
            const { styles } = this;
            const { cValue } = this;
            let style = {};

            for (let i = styles.length - 1; i >= 0; i--) {
                if (cValue >= styles[i].value) {
                    style = styles[i].style;
                    break;
                }
            }

            return style;
        },
    },

    created() {
        if (this.max < this.min) {
            throw new Error("'max' prop must be bigger than 'min'");
        }
    },
};
</script>
