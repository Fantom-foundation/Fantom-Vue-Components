<template>
    <transition :enter-active-class="dAnimationIn" :leave-active-class="dAnimationOut" @after-leave="onAfterLeave">
        <div
            v-if="isVisible"
            :role="alert ? 'alert' : null"
            class="fmessage"
            :class="[classes, typeClass]"
            @click="onClick"
        >
            <!-- @slot Default to `type` prop -->
            <slot name="prefix">
                <template v-if="withIcon">
                    <f-svg-icon v-if="type === 'success'" class="fmessage_icon">
                        <icon-check-circle />
                    </f-svg-icon>
                    <f-svg-icon v-else-if="type === 'error' || type === 'warning'" class="fmessage_icon">
                        <icon-exclamation-circle />
                    </f-svg-icon>
                    <f-svg-icon v-else-if="type === 'info'" class="fmessage_icon">
                        <icon-info-circle />
                    </f-svg-icon>
                </template>
            </slot>
            <span class="fmessage_body"><slot></slot></span>
            <slot name="suffix"></slot>
            <template v-if="hideOnCloseButton">
                <slot name="close_button">
                    <f-button @click.native="hide()" size="small" round class="fmessage_closebtn">
                        <f-svg-icon size="12px"><icon-times /></f-svg-icon>
                    </f-button>
                </slot>
            </template>
        </div>
    </transition>
</template>

<script>
import { helpersMixin } from '../../mixins/helpers.js';
import FSvgIcon from '../FSvgIcon/FSvgIcon.vue';
import IconCheckCircle from '../icons/IconCheckCircle.vue';
import IconExclamationCircle from '../icons/IconExclamationCircle.vue';
import IconInfoCircle from '../icons/IconInfoCircle.vue';
import { getUniqueId } from '../../utils/index.js';
import IconTimes from '../icons/IconTimes.vue';
import FButton from '../FButton/FButton.vue';
// import { returnFocus, setReceiveFocusFromAttr } from '@/utils/aria.js';
// import { getComputedStyle } from '@/utils/css.js';

/**
 * Component for displaying simple messages.
 */
export default {
    components: { FButton, IconTimes, IconExclamationCircle, IconCheckCircle, FSvgIcon, IconInfoCircle },
    mixins: [helpersMixin],

    props: {
        id: {
            type: String,
            default: getUniqueId(),
        },
        /**
         * Type of message.
         *
         * @type {('success' | 'info' | 'warning' | 'error')}
         */
        type: {
            type: String,
            default: '',
            required: true,
            validator: function(_value) {
                return ['success', 'info', 'warning', 'error'].indexOf(_value) !== -1;
            },
        },
        /** Signals that message is an alert message (has role="alert" attribute) */
        alert: {
            type: Boolean,
            default: false,
        },
        /** Use icon with message. */
        withIcon: {
            type: Boolean,
            default: false,
        },
        /** Message will be hidden by clicking on it */
        hideOnClick: {
            type: Boolean,
            default: false,
        },
        /** Message will be hidden by clicking on 'close' button */
        hideOnCloseButton: {
            type: Boolean,
            default: false,
        },
        /** Signals using of animations on show/hide */
        animate: {
            type: Boolean,
            default: false,
        },
        /** Animation that starts when the message is just about to show */
        animationIn: {
            type: String,
            default: 'fade-enter-active',
        },
        /** Animation that starts when the message is just about to hide */
        animationOut: {
            type: String,
            default: 'fade-leave-active',
        },
        /** Hide message after this amout of milliseconds. 0 means no auto hiding */
        hideAfter: {
            type: Number,
            default: 0,
        },
    },

    data() {
        return {
            isVisible: !this.animate,
            dAnimationIn: this.animationIn,
            dAnimationOut: this.animationOut,
        };
    },

    computed: {
        classes() {
            return {
                'fmessage-withicon': this.withIcon,
                'fmessage-prefixslot': this.hasSlot('prefix'),
                'fmessage-suffixslot': this.hasSlot('suffix'),
            };
        },

        typeClass() {
            return `fmessage-${this.type}`;
        },
    },

    created() {
        /** `hideAfter` timeout id. */
        this._hideAfterId = -1;

        if (this.animate) {
            this.show();
        }
    },

    beforeDestroy() {
        if (this.isVisible) {
            this.hide();
        }
    },

    methods: {
        show(_animationIn) {
            if (!this.isVisible) {
                if (this.animate) {
                    if (_animationIn) {
                        this.dAnimationIn = _animationIn;
                    } else {
                        this.dAnimationIn = this.animationIn;
                    }

                    this.$nextTick(() => {
                        this.isVisible = true;
                    });
                } else {
                    this.isVisible = true;
                }

                this.startHideAfterTimeout();
            }
        },

        hide(_animationOut) {
            if (this.isVisible) {
                if (this.animate) {
                    if (_animationOut) {
                        this.dAnimationOut = _animationOut;
                    } else {
                        this.dAnimationOut = this.animationOut;
                    }

                    this.$nextTick(() => {
                        this.isVisible = false;
                    });
                } else {
                    this.isVisible = false;
                }
            }
        },

        toggle() {
            if (!this.isVisible) {
                this.show();
            } else {
                this.hide();
            }
        },

        startHideAfterTimeout() {
            if (this.hideAfter > 0) {
                this.clearHideAfterTimeout();

                this._hideAfterId = setTimeout(() => {
                    this.hide();
                }, this.hideAfter);
            }
        },

        clearHideAfterTimeout() {
            if (this._hideAfterId > -1) {
                clearTimeout(this._hideAfterId);
            }
        },

        getMessage() {
            return this.$slots.default ? this.$slots.default[0].text : '';
        },

        onClick() {
            if (this.hideOnClick && !this.hideOnCloseButton) {
                this.hide();
            }
        },

        onAfterLeave() {
            this.$emit('message-hidden', this.id);
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
