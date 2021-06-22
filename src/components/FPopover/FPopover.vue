<template>
    <f-window
        ref="popover"
        popover
        :attach-position="attachPosition"
        :preferred-attach-position="preferredAttachPosition"
        :attach-margin="attachMargin"
        :with-header="withHeader"
        :stay-in-viewport="stayInViewport"
        :prevent-focus="preventFocus"
        animation-in="scale-center-enter-active"
        animation-out="scale-center-leave-active"
        v-bind="{ ...$attrs, ...$props }"
        v-on="$listeners"
        :class="cssClass"
    >
        <template #controls>
            <f-button
                v-if="!noCloseButton"
                tertiary
                same-size
                :size="buttonSize"
                v-fwindow-hide
                :title="_('fwindow.closeWindow')"
            >
                <f-svg-icon size="1.2em"><icon-times /></f-svg-icon>
            </f-button>
        </template>

        <!-- copy slots -->
        <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
            <slot :name="name" v-bind="data"></slot>
        </template>
    </f-window>
</template>

<script>
import FWindow from '../FWindow/FWindow.vue';
import { copyProps, copyMethods } from '../../utils/vue-helpers.js';
import FSvgIcon from '../FSvgIcon/FSvgIcon.vue';
import IconTimes from '../icons/IconTimes.vue';
import { translationsMixin } from '../../mixins/translations.js';
import FButton from '../FButton/FButton.vue';

/**
 * FWindow wrapper with popover settings
 */
export default {
    name: 'FPopover',

    inheritAttrs: false,

    components: { FButton, IconTimes, FSvgIcon, FWindow },

    mixins: [translationsMixin],

    props: {
        ...copyProps(FWindow, {
            attachPosition: 'auto',
            preferredAttachPosition: 'top',
            withHeader: false,
            stayInViewport: false,
            preventFocus: true,
            attachMargin: function() {
                return [4, 4, 4, 4];
            },
        }),

        /**
         * Size of the button
         *
         * @type {('big' | 'small')}
         */
        size: {
            type: String,
            default: '',
            validator: function(_value) {
                return ['', 'big', 'small'].indexOf(_value) !== -1;
            },
        },
        noCloseButton: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        cssClass() {
            return {
                fpopover: true,
                'fpopover-big': this.size === 'big',
                'fpopover-small': this.size === 'small',
            };
        },

        buttonSize() {
            const { size } = this;

            if (size === 'big') {
                return '';
            }

            return 'small';
        },
    },

    methods: {
        ...copyMethods(FWindow, ['show', 'hide', 'toggle'], 'popover'),
    },
};
</script>

<style lang="scss">
@use "style";
</style>
