<template>
    <div class="fimage" :class="{ 'fimage-loaded': loaded }" :style="styles">
        <div v-if="!loaded" class="fimage_placeholder">
            <slot name="placeholder">
                <f-placeholder block :animation="placeholderAnimation"></f-placeholder>
            </slot>
        </div>
        <img :src="src" :alt="alt" loading="lazy" @load="onImgLoad" @error="onImgError" />
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
    },

    computed: {
        loaded() {
            return !!this.src && !this.imgLoading;
        },

        styles() {
            const { size } = this;

            return {
                width: size || this.width,
                height: size || this.height,
            };
        },
    },

    data() {
        return {
            imgLoading: false,
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
            // this.imgLoading = false;
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
