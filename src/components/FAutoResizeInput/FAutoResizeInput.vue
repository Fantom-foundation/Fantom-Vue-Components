<template>
    <span class="fautoresizeinput">
        <slot></slot>
        <span ref="twin" class="fautoresizeinput_hiddentwin" aria-hidden="true"></span>
    </span>
</template>

<script>
import { clearElement } from '@/utils/dom2.js';

export default {
    name: 'FAutoResizeInput',

    props: {
        /** Minimal input width */
        minWidth: {
            type: String,
            default: '',
        },
        /** Add this number of pixels to the resulting width */
        extraWidth: {
            type: Number,
            default: 5,
        },
    },

    created() {
        /** @type {HTMLInputElement} */
        this._eInput = null;
    },

    mounted() {
        this.init();
    },

    beforeDestroy() {
        this.freeInput();
    },

    methods: {
        init() {
            this.setInput();

            const eInput = this._eInput;

            if (eInput) {
                this.update();

                if (eInput.placeholder) {
                    this.resizeInput(eInput.placeholder);
                }
            }
        },

        update() {
            this.setTwinStyle();
            this.resizeInput();
        },

        /**
         * @param {string} text
         */
        resizeInput(text = '') {
            const eInput = this._eInput;
            const eTwin = this.$refs.twin;

            if (eInput) {
                clearElement(eTwin);
                eTwin.appendChild(document.createTextNode(text || eInput.value));
                this._eInput.style.width = eTwin.offsetWidth + this.extraWidth + 'px';
            }
        },

        setTwinStyle() {
            const eTwin = this.$refs.twin;
            const eInputStyle = window.getComputedStyle(this._eInput);
            const props = [
                'paddingLeft',
                'paddingRight',
                'fontFamily',
                'fontSize',
                'fontStyle',
                'fontWeight',
                'letterSpacing',
                'textTransform',
            ];

            props.forEach(prop => (eTwin.style[prop] = eInputStyle[prop]));
        },

        setInput() {
            this.freeInput();

            const eInput = this.$el.querySelector('input');

            if (eInput) {
                eInput.addEventListener('input', this.onInput);
                eInput.addEventListener('change', this.onInput);

                eInput.style.boxSizing = 'border-box';
                if (this.minWidth) {
                    eInput.style.minWidth = this.minWidth;
                }

                this._eInput = eInput;
            }
        },

        freeInput() {
            if (this._eInput) {
                this._eInput.removeEventListener('input', this.onInput);
                this._eInput.removeEventListener('change', this.onInput);
                this._eInput = null;
            }
        },

        onInput() {
            this.resizeInput();
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
