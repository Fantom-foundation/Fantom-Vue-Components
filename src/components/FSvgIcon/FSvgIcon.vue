<template>
    <span class="fsvgicon" :class="classes" :style="styles">
        <span class="fsvgicon-icon" :style="iconStyles"><slot /></span>
    </span>
</template>

<script>
/**
 * Simple SVG wrapper
 */
export default {
    name: 'FSvgIcon',

    props: {
        /** Color of svg icon. By default color is inherited */
        color: {
            type: String,
            default: '',
        },
        /** Preserve original colors of svg */
        original: {
            type: Boolean,
            default: false,
        },
        /** Size of icon. Sets width and height by the same value */
        size: {
            type: [String, Number],
            default: '',
        },
        /** Width of icon */
        width: {
            type: [String, Number],
            default: '',
        },
        /** Height of icon */
        height: {
            type: [String, Number],
            default: '',
        },
        /** Rotate icon by `rotate` degrees. For example `'90deg'` */
        rotate: {
            type: String,
            default: '',
        },
    },

    data() {
        return {};
    },

    computed: {
        classes() {
            return {
                'fsvgicon-original': this.original,
            };
        },

        styles() {
            const { size } = this;

            return {
                color: this.color,
                width: size || this.width,
                height: size || this.height,
            };
        },

        iconStyles() {
            return {
                transform: `rotate(${this.rotate})`,
            };
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
