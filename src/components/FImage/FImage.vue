<template>
    <div class="fimage" :class="classes" :style="styles">
        <div v-if="!loaded" class="fimage_placeholder">
            <slot name="placeholder">
                <f-placeholder block :animation="placeholderAnimation"></f-placeholder>
            </slot>
        </div>
        <img
            :src="cSrc"
            :alt="alt"
            :loading="lazyLoading ? 'lazy' : null"
            @load="onImgLoad"
            @error="onImgError"
            :style="{ objectFit: fit }"
        />
    </div>
</template>

<script>
import FPlaceholder from '../FPlaceholder/FPlaceholder.vue';

/**
 * Component for displaying image and a placeholder, while image is loading
 */
export default {
    name: 'FImage',

    components: { FPlaceholder },

    props: {
        /** Image's `src` attribute */
        src: {
            type: String,
            default: '',
        },
        /** Image's `alt` attribute */
        alt: {
            type: String,
            default: '',
        },
        /** Size of the component. Sets width and height by the same value */
        size: {
            type: [String, Number],
            default: '',
        },
        /** Width of the component */
        width: {
            type: [String, Number],
            default: '',
        },
        /** Height of the component */
        height: {
            type: [String, Number],
            default: '',
        },
        /** Name of the animation to be used on `f-placeholder` */
        placeholderAnimation: {
            type: String,
            default: 'fplaceholder-pulsebganim',
        },
        /** Value of `object-fit` css property used on img elmement */
        fit: {
            type: String,
            default: 'contain',
        },
        /** Src used when image src is not provided or correct */
        noImgSrc: {
            type: String,
            default: '',
        },
        /***/
        lazyLoading: {
            type: Boolean,
            default: true,
        },
    },

    computed: {
        loaded() {
            return !!this.cSrc && !this.imgLoading;
        },

        cSrc() {
            return this.error && this.noImgSrc ? this.noImgSrc : this.src;
        },

        styles() {
            const { size } = this;

            return {
                width: size || this.width,
                height: size || this.height,
            };
        },

        classes() {
            return {
                'fimage-loaded': this.loaded,
                'fimage-noimage': this.error,
            };
        },
    },

    data() {
        return {
            imgLoading: false,
            error: false,
        };
    },

    watch: {
        src: {
            handler(value) {
                if (value) {
                    this.imgLoading = true;
                }
            },
            immediate: true,
        },
    },

    methods: {
        onImgLoad() {
            this.imgLoading = false;
        },

        onImgError() {
            this.error = true;
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
