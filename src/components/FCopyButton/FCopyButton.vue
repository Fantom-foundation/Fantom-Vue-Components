<template>
    <f-info
        :hide-after="hideAfter"
        :button-title="cButtonTitle"
        class="fcopybutton"
        v-bind="$attrs"
        @click="onClick"
        @window-hide="$emit('window-hide', $event)"
    >
        <template #button-content>
            <f-svg-icon :size="iconSize"><icon-copy /></f-svg-icon>
        </template>
        <!-- copy slots -->
        <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
            <slot :name="name" v-bind="data"></slot>
        </template>

        {{ cPopoverText }}
    </f-info>
</template>

<script>
import FInfo from '../FInfo/FInfo.vue';
import FSvgIcon from '../FSvgIcon/FSvgIcon.vue';
import IconCopy from '../icons/IconCopy.vue';
import { translationsMixin } from '../../mixins/translations.js';

/**
 * Component for copying texts. It shows a popover after copying a text.
 * The given attributes are also passed to the child components `f-button` and `f-popover`
 */
export default {
    name: 'FCopyButton',

    components: { FInfo, IconCopy, FSvgIcon },

    mixins: [translationsMixin],

    inheritAttrs: false,

    props: {
        /** Text to copy */
        text: {
            type: String,
            default: '',
            required: true,
        },
        /** Popover's text */
        popoverText: {
            type: String,
            default: '',
        },
        /** Button's title */
        buttonTitle: {
            type: String,
            default: '',
        },
        /** Size of default icon */
        iconSize: {
            type: String,
            default: '16px',
        },
        /** Hide window after this amout of milliseconds. 0 means no auto hiding */
        hideAfter: {
            type: Number,
            default: 1600,
        },
        /**  */
        showPopover: {
            type: Boolean,
            default: true,
        },
    },

    computed: {
        cButtonTitle() {
            return this.buttonTitle || this._('fcopybutton.copyToClipboard');
        },

        cPopoverText() {
            return this.popoverText || this._('fcopybutton.copiedToClipboard');
        },
    },

    methods: {
        async onClick(event, payload) {
            payload.preventDefault = !this.showPopover;

            await navigator.clipboard.writeText(this.text);

            /**
             * Triggers when text is copied
             *
             * @property {string} text Copied text
             */
            this.$emit('text-copied', this.text);
        },
    },
};
</script>
