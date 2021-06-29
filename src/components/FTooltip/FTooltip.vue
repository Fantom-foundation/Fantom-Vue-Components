<template>
    <f-popover ref="popover" :attach-to="attach" class="ftooltip" v-bind="{ ...$attrs, ...$props }">
        {{ text }}
    </f-popover>
</template>

<script>
import FPopover from '../FPopover/FPopover.vue';
import { MouseoverController } from '../../utils/MouseoverController.js';

const elemIdAttr = 'data-ftooltip-id';

/**
 * Has the same props as `FPopover` component
 */
export default {
    name: 'FTooltip',

    components: { FPopover },

    props: {
        targetAttr: {
            type: String,
            default: 'data-tooltip',
        },
    },

    data() {
        return {
            text: '',
            attach: '',
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
            this.text = elem.getAttribute(this.targetAttr) || '';

            if (this.text) {
                elem.setAttribute(elemIdAttr, '');
                this.attach = `[${elemIdAttr}]`;
                this.$refs.popover.show();
            }
        },

        /**
         * @param {HTMLElement} elem
         */
        onTargetLeave(elem) {
            if (this.text) {
                elem.removeAttribute(elemIdAttr);
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
    },
};
</script>
