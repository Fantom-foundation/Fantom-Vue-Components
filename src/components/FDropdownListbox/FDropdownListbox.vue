<template>
    <div class="fdropdownlistbox">
        <slot name="top" v-bind="slotProps">
            <label :for="id">{{ label }}</label>
        </slot>
        <button
            :id="buttonId"
            :disabled="disabled"
            aria-haspopup="listbox"
            class="fdropdownlistbox_button"
            type="button"
            :class="[buttonClass]"
            @click="onButtonClick"
        >
            <span class="fdropdownlistbox_button_label">
                <slot name="buttonLabel" :item="selectedItem">
                    {{ selectedItem.label || buttonInitLabel }}
                </slot>
            </span>
            <slot name="buttonArrow">
                <span class="fdropdownlistbox_button_arrow"></span>
            </slot>
        </button>
        <f-window
            v-if="showPopover"
            ref="popover"
            popover
            :with-header="false"
            :attach-to="`#${buttonId}`"
            attach-position="lt lb"
            :animation-in="animationIn"
            :animation-out="animationOut"
            hide-on-document-mousedown
            class="fdropdownlistbox_fwindow"
            @window-hide="$emit('window-hide', $event)"
        >
            <f-listbox
                ref="listbox"
                v-bind="$props"
                :value="val"
                :focus-item-on-focus="true"
                class="fdropdownlistbox_flistbox"
                @component-change="onListboxItemSelected"
            >
                <template v-slot="{ item }">
                    <slot name="item" :item="item">
                        {{ item.label }}
                    </slot>
                </template>
            </f-listbox>
        </f-window>
        <slot name="bottom" v-bind="slotProps"></slot>
    </div>
</template>

<script>
import FListbox from '../FListbox/FListbox.vue';
import FWindow from '../FWindow/FWindow.vue';
import FSelect from '../FSelect/FSelect.vue';
import { defer, getUniqueId } from '../../utils/index.js';

/**
 * Listbox component created according to WAI-ARIA rules and practices.
 */
export default {
    name: 'FDropdownListbox',

    components: { FWindow, FListbox },

    mixins: [FSelect, FListbox],

    props: {
        /** Initial button label */
        buttonInitLabel: {
            type: String,
            default: 'Select something',
        },
        /** CSS class(es) for button */
        buttonClass: {
            type: String,
            default: '',
        },
        /** Animation that starts when the popover is just about to show */
        animationIn: {
            type: String,
            default: 'scale-center-enter-active',
        },
        /** Animation that starts when the popover is just about to hide */
        animationOut: {
            type: String,
            default: 'scale-center-leave-active',
        },
        /** Animation that starts when the item is selected  */
        animationOutSuccess: {
            type: String,
            default: 'scale-center-forward-leave-active',
        },
    },

    data() {
        return {
            val: this.value,
            selectedItem: {},
            buttonLabel: this.buttonInitLabel,
            showPopover: false,
            buttonId: getUniqueId(),
        };
    },

    watch: {
        value(_val) {
            this.val = _val;
        },
    },

    mounted() {
        this.setSelected();
    },

    methods: {
        /**
         * Set selected item.
         */
        setSelected() {
            const { value } = this;
            const { data } = this;

            if (data.length === 0) {
                return;
            }

            let selectedItem = data.find(_item => !!_item.selected);

            if (!selectedItem && value) {
                selectedItem = data.find(_item => _item.value === value);
            }

            if (selectedItem) {
                this.selectedItem = selectedItem;
            } else {
                // select first item
                this.selectedItem = data[0];
            }

            this.val = this.selectedItem.value;
        },

        onButtonClick() {
            this.showPopover = true;

            this.$nextTick(() => {
                const { $refs } = this;

                $refs.popover.show();

                defer(() => {
                    $refs.listbox.focus();
                });
            });
        },

        onListboxItemSelected(_item) {
            this.selectedItem = _item;
            this.emitChangeEvent(_item);
            this.$refs.popover.hide(this.animationOutSuccess);
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
