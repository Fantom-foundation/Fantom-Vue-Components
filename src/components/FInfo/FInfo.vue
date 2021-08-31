<template>
    <span class="finfo" @click="onClick">
        <!-- @slot Default to `f-button` -->
        <slot name="button">
            <f-button :tertiary="tertiary" :round="round" v-bind="$attrs" :id="dButtonId" :title="cButtonTitle">
                <!-- @slot Default to info icon -->
                <slot name="button-content">
                    <f-svg-icon :size="iconSize"><icon-info-circle /></f-svg-icon>
                </slot>
            </f-button>
        </slot>

        <template v-if="!usePopup">
            <f-popover
                v-if="windowCreated"
                ref="window"
                :hide-on-document-mousedown="hideOnDocumentMousedown"
                v-bind="$attrs"
                :attach-to="`#${dButtonId}`"
                :class="windowClass"
                :style="windowStyle"
                @window-hide="$emit('window-hide', $event)"
            >
                <!-- @slot Default to popover content -->
                <slot></slot>
            </f-popover>
        </template>
        <template v-else>
            <f-window
                v-if="windowCreated"
                ref="window"
                v-bind="$attrs"
                :class="windowClass"
                :style="windowStyle"
                @window-hide="$emit('window-hide', $event)"
            >
                <!-- @slot Default to window content -->
                <slot></slot>
            </f-window>
        </template>
    </span>
</template>

<script>
import { getUniqueId } from '../../utils';
import FButton from '../FButton/FButton.vue';
import FPopover from '../FPopover/FPopover.vue';
import FSvgIcon from '../FSvgIcon/FSvgIcon.vue';
import { translationsMixin } from '../../mixins/translations.js';
import IconInfoCircle from '../icons/IconInfoCircle.vue';
import FWindow from '../FWindow/FWindow.vue';

/**
 * Component for showing info text.
 * The given attributes are also passed to the child components `f-button` and `f-popover` or `f-window`
 */
export default {
    name: 'FInfo',

    components: { FWindow, IconInfoCircle, FSvgIcon, FPopover, FButton },

    mixins: [translationsMixin],

    inheritAttrs: false,

    props: {
        /** Use popup window instead of popover. */
        usePopup: {
            type: Boolean,
            default: false,
        },
        /** Css class added to FPopover or FWindow component */
        windowClass: {
            type: String,
            default: '',
        },
        /** Style added to FPopover or FWindow component */
        windowStyle: {
            type: Object,
            default() {
                return {};
            },
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
        /**  */
        showPopover: {
            type: Boolean,
            default: true,
        },
        /** Unique id */
        buttonId: {
            type: String,
            default: '',
        },

        /** Hide window on browser window mousedown. */
        hideOnDocumentMousedown: {
            type: Boolean,
            default: true,
        },
        /** Specifies that button is styled as a secondary button */
        tertiary: {
            type: Boolean,
            default: true,
        },
        /** Specifies that the button has the same width and height and is rounded */
        round: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            windowCreated: false,
            dButtonId: this.buttonId || getUniqueId(),
        };
    },

    computed: {
        cButtonTitle() {
            return this.buttonTitle || this._('finfo.moreInfo');
        },
    },

    methods: {
        async onClick(event) {
            const payload = { preventDefault: false };

            this.$emit('click', event, payload);

            if (!payload.preventDefault) {
                if (!this.windowCreated) {
                    this.windowCreated = true;

                    this.$nextTick(() => {
                        this.$refs.window.show();
                    });
                } else {
                    this.$refs.window.show();
                }
            }
        },
    },
};
</script>
