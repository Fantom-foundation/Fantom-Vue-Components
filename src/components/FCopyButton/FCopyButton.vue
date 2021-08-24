<template>
    <span class="fcopybutton" @click="onClick">
        <!-- @slot Default to `f-button` -->
        <slot>
            <f-button v-bind="$attrs" :id="buttonId" :title="cButtonTitle">
                <!-- @slot Default to copy icon -->
                <slot name="button-content">
                    <f-svg-icon :size="iconSize"><icon-copy /></f-svg-icon>
                </slot>
            </f-button>
        </slot>

        <f-popover
            v-if="popoverCreated"
            ref="popover"
            v-bind="$attrs"
            :hide-after="hideAfter"
            :attach-to="`#${buttonId}`"
            @window-hide="$emit('window-hide', $event)"
        >
            <!-- @slot Default to `popoverText` prop -->
            <slot name="popover-content">{{ cPopoverText }}</slot>
        </f-popover>
    </span>
</template>

<script>
import { getUniqueId } from '../../utils';
import FButton from '../FButton/FButton.vue';
import FPopover from '../FPopover/FPopover.vue';
import FSvgIcon from '../FSvgIcon/FSvgIcon.vue';
import IconCopy from '../icons/IconCopy.vue';
import { translationsMixin } from '../../mixins/translations.js';

/**
 * Component for copying texts. It shows a popover after copying a text.
 * The given attributes are also passed to the child components `f-button` and `f-popover`
 */
export default {
    name: 'FCopyButton',

    components: { IconCopy, FSvgIcon, FPopover, FButton },

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
        /** Unique id */
        buttonId: {
            type: String,
            default: getUniqueId(),
        },
    },

    data() {
        return {
            popoverCreated: false,
        };
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
        async onClick() {
            await navigator.clipboard.writeText(this.text);

            /**
             * Triggers when text is copied
             *
             * @property {string} text Copied text
             */
            this.$emit('text-copied', this.text);

            if (this.showPopover) {
                if (!this.popoverCreated) {
                    this.popoverCreated = true;

                    this.$nextTick(() => {
                        this.$refs.popover.show();
                    });
                } else {
                    this.$refs.popover.show();
                }
            }
        },
    },
};
</script>
