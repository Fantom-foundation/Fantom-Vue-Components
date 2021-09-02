<template>
    <div class="fcircleprogress" :class="classes">
        <svg viewBox="-50 -50 100 100">
            <circle :r="r" cx="0" cy="0" fill="none" :stroke-width="strokeWidth" class="fcircleprogress_bgcircle" />
            <circle
                v-if="dashoffset < 1"
                ref="circle"
                :r="r"
                cx="0"
                cy="0"
                fill="none"
                :stroke-width="strokeWidth"
                stroke-dasharray="1"
                :stroke-dashoffset="dashoffset"
                transform="rotate(-90 0 0)"
                pathLength="1"
                class="fcircleprogress_circle"
            />
            <circle
                v-for="(dot, index) in dots"
                :key="dot[idSymbol]"
                :r="strokeWidth / 3"
                :cx="dotCx(index)"
                :cy="dotCy(index)"
                :fill="dot.color"
                class="fcircleprogress_dot"
            />
            <text text-anchor="middle" dominant-baseline="central" class="fcircleprogress_value" :style="textStyle">
                <slot :value="cValue" :percentage="percentage" :convertToPercentages="convertToPercentages">
                    <slot
                        name="value"
                        :value="cValue"
                        :percentage="percentage"
                        :convertToPercentages="convertToPercentages"
                    >
                        <tspan>{{ convertToPercentages ? percentage : cValue }}</tspan>
                    </slot>
                    <tspan
                        v-if="convertToPercentages"
                        dominant-baseline="central"
                        class="fcircleprogress_value_percentage"
                        dx="-5"
                    >
                        %
                    </tspan>
                </slot>
            </text>
        </svg>
    </div>
</template>

<script>
import { clamp } from '../../utils/number.js';
import { setCustomProperty } from '../../utils/css.js';
import { setIds } from '../../utils/vue-helpers.js';

/**
 *
 */
export default {
    name: 'FCircleProgress',

    props: {
        /** Current value. */
        value: {
            type: [Number, String],
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
         * Css styles of text and circle's color for given values.
         * If current value is bigger than value from `styles` array, css styles from array will be used.
         * @type {{textStyle: Object, color: string, value: number}[]}
         */
        styles: {
            type: Array,
            default() {
                return [];
            },
        },
        /**
         * Dots displayed on circle at positions given by values.
         * @type {{color: string, value: number}[]}
         */
        dots: {
            type: Array,
            default() {
                return [];
            },
        },
        /** Width of circle stroke. */
        strokeWidth: {
            type: Number,
            default: 5,
        },
        /** Animate progress circle. */
        animate: {
            type: Boolean,
            default: false,
        },
        /** Show percentage rather than value. */
        convertToPercentages: {
            type: Boolean,
            default: false,
        },
        /** Can exceed `max` value. */
        canExceed: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            r: 50 - this.strokeWidth / 2,
            idSymbol: Symbol(),
        };
    },

    computed: {
        cValue() {
            let value = this.value;

            value = clamp(value, this.min, this.max);

            if (this.canExceed && value === this.max) {
                value = this.value;
            }

            this.setCircleStrokeColor(value);

            return value;
        },

        percentage() {
            return this.getPercentage(this.cValue);
        },

        textStyle() {
            return this.getStyleByValue(this.cValue, this.styles, 'textStyle');
        },

        dashoffset() {
            const percentage = this.percentage > 100 ? 100 : this.percentage;

            return 1 - percentage / 100;
        },

        classes() {
            return {
                'fcircleprogress-animate': this.animate,
            };
        },
    },

    created() {
        if (this.max < this.min) {
            throw new Error("'max' must be bigger than 'min'");
        }

        setIds(this.dots, this.idSymbol);
    },

    mounted() {
        this.setCircleStrokeColor(this.cValue);
    },

    methods: {
        /**
         * @param {number} _index Index into `dots` array.
         */
        dotCx(_index) {
            return Math.cos(this.getDotX(_index)) * this.r;
        },

        /**
         * @param {number} _index Index into `dots` array.
         */
        dotCy(_index) {
            return Math.sin(this.getDotX(_index)) * this.r;
        },

        /**
         * @param {number} _index Index into `dots` array.
         */
        getDotX(_index) {
            const PI = Math.PI;
            let percentage = this.getPercentage(this.dots[_index].value);

            if (percentage > 100) {
                percentage = 100;
            }

            return 2 * PI * (percentage / 100) - PI / 2;
        },

        /**
         * @param {number} value
         */
        getPercentage(value) {
            return Math.round(((value - this.min) / (this.max - this.min)) * 100);
        },

        /**
         * @param {number} value
         * @param {array} styles
         * @param {string} prop
         */
        getStyleByValue(value, styles, prop) {
            let style = {};

            for (let i = styles.length - 1; i >= 0; i--) {
                if (value >= styles[i].value) {
                    if (prop === 'color') {
                        style = { color: styles[i].color };
                    } else {
                        style = styles[i][prop];
                    }
                    break;
                }
            }

            return style;
        },

        /**
         * Set circle stroke color according to current value and `this.colors` array.
         *
         * @param {number} value
         */
        setCircleStrokeColor(value) {
            const { $el } = this;
            const { styles } = this;

            if (!$el || styles.length === 0) {
                return;
            }

            const style = this.getStyleByValue(value, styles, 'color');

            if (style.color) {
                setCustomProperty('--fcircleprogress-circle-color', style.color, $el);
            } else {
                setCustomProperty('--fcircleprogress-circle-color', '', $el);
            }
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
