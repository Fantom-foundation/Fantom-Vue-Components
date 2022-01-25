<template>
    <f-popover ref="popover" :attach-to="attach" class="ftooltip" v-bind="{ ...$attrs, ...$props, ...dProps }">
        {{ text }}
    </f-popover>
</template>

<script>
import FPopover from '../FPopover/FPopover.vue';
import { MouseoverController } from '../../utils/MouseoverController.js';

export const fTooltipElemIdAttr = 'data-ftooltip-id';

/**
 * Tooltip shown when mouse hover target element or when target element has focus.
 * Has the same props as `FPopover` component
 */
export default {
    name: 'FTooltip',

    components: { FPopover },

    props: {
        /** Attribute with tooltip text. HTML elements with this attribute becomes target elements (tooltip will be shown) */
        targetAttr: {
            type: String,
            default: 'data-tooltip',
        },
        /** Mouseover event listener throttling. In milliseconds */
        throttleInterval: {
            type: Number,
            default: 200,
        },
        /** Mouseover event listener throttling. In milliseconds */
        onlyIfNeeded: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            text: '',
            attach: '',
            dOnlyIfNeeded: this.onlyIfNeeded,
            dProps: {},
        };
    },

    created() {
        /** @type {MouseoverController} */
        this._moc = null;
    },

    beforeDestroy() {
        this.destroyMouseoverController();
        this.unbindEvents();
    },

    mounted() {
        this.createMouseoverController();
        this.bindEvents();
    },

    methods: {
        createMouseoverController() {
            this._moc = new MouseoverController({
                container: document.body,
                elemSelector: `[${this.targetAttr}]`,
                throttleInterval: this.throttleInterval,
                onElemEnter: (elem, event) => {
                    this.onTargetEnter(elem, event);
                },
                onElemLeave: (elem, event) => {
                    this.onTargetLeave(elem, event);
                },
            });
        },

        destroyMouseoverController() {
            if (this._moc) {
                this._moc.destroy();
                this._moc = null;
            }
        },

        bindEvents() {
            const eContainer = document.body;

            eContainer.addEventListener('focusin', this.onFocusin, false);
            eContainer.addEventListener('focusout', this.onFocusout, false);
        },

        unbindEvents() {
            const eContainer = document.body;

            eContainer.removeEventListener('focusin', this.onFocusin);
            eContainer.removeEventListener('focusout', this.onFocusout);
        },

        /**
         * @param {HTMLElement} elem
         */
        onTargetEnter(elem) {
            this.dProps = {};

            const options = this._processTargetAttr(elem);

            this.text = options.text;
            this.dOnlyIfNeeded = options.onlyIfNeeded;

            if (this.text) {
                if (!this.dOnlyIfNeeded || elem.scrollWidth > elem.offsetWidth) {
                    elem.setAttribute(fTooltipElemIdAttr, '');
                    this.attach = `[${fTooltipElemIdAttr}]`;
                    this.$refs.popover.show();
                }
            }
        },

        /**
         * @param {HTMLElement} elem
         */
        onTargetLeave(elem) {
            if (this.text) {
                elem.removeAttribute(fTooltipElemIdAttr);
                this.attach = '';
                this.$refs.popover.hide();
            }
        },

        /**
         * @param {FocusEvent} event
         */
        onFocusin(event) {
            this._moc.testElem(event.target, event);
        },

        /**
         * @param {FocusEvent} event
         */
        onFocusout(event) {
            this._moc._elemLeaved(event);
        },

        /**
         * @param {HTMLElement} elem
         */
        _processTargetAttr(elem) {
            const attr = elem.getAttribute(this.targetAttr) || '';
            let text = '';
            let onlyIfNeeded = this.onlyIfNeeded;

            if (attr) {
                try {
                    const options = JSON.parse(attr);

                    text = options.text;
                    onlyIfNeeded = options.onlyIfNeeded;

                    delete options.text;
                    delete options.onlyIfNeeded;

                    this.dProps = options;
                } catch (error) {
                    text = attr;
                }
            }

            return { text, onlyIfNeeded };
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
