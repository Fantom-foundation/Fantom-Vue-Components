<template>
    <div class="fdropdownlistbox">
        <slot name="top" v-bind="slotProps">
            <f-label v-if="label" :id="labeledById" :label="label" :required="required" />
        </slot>
        <button
            :id="buttonId"
            :disabled="disabled"
            type="button"
            aria-haspopup="listbox"
            :aria-labelledby="ariaLabeledByIds"
            :aria-describedby="ariaDescribedByIds"
            :aria-invalid="validationState.invalid"
            class="fdropdownlistbox_button"
            :class="[buttonClass]"
            @click="onButtonClick"
            @[keydownEvent]="onKeydown"
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
            correct-pos-on-scroll
            :with-header="false"
            :stay-in-viewport="false"
            :attach-to="`#${buttonId}`"
            attach-position="auto-vertical-exact"
            :animation-in="animationIn"
            :animation-out="animationOut"
            hide-on-document-mousedown
            class="fdropdownlistbox_fwindow"
            @window-hide="$emit('window-hide', $event)"
        >
            <f-listbox
                ref="listbox"
                v-bind="$props"
                label=""
                info-text=""
                :value="inputValue"
                :select-immediately="!selectOnMainAction"
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
        <slot name="bottom" v-bind="slotProps">
            <div v-if="validationState.errors.length > 0">
                <component
                    :is="
                        typeof errorMessagesComponent === 'object'
                            ? errorMessagesComponent.name
                            : errorMessagesComponent
                    "
                    :errors-cont-id="errorMsgId"
                    :errors="validationState.errors"
                    :input-cont-id="dInputContId"
                    v-bind="{ ...(typeof errorMessagesComponent === 'object' ? errorMessagesComponent.props : {}) }"
                />
            </div>
            <div v-else-if="infoText">
                <f-info-text :text="infoText" :info-text-id="infoTextId" />
            </div>
        </slot>
    </div>
</template>

<script>
import FListbox from '../FListbox/FListbox.vue';
import FWindow from '../FWindow/FWindow.vue';
import FSelect from '../FSelect/FSelect.vue';
import FLabel from '../FLabel/FLabel.vue';
import FErrorMessages from '../FErrorMessages/FErrorMessages.vue';
import FInfoText from '../FInfoText/FInfoText.vue';
import { cloneObject, defer, getUniqueId } from '../../utils/index.js';
import { formInputMixin } from '../../mixins/form-input.js';
import { isKey } from '../../utils/aria.js';
import { popoverAnimationMixin } from '../../mixins/popover-animation.js';

/**
 * Listbox component created according to WAI-ARIA rules and practices.
 */
export default {
    name: 'FDropdownListbox',

    components: { FWindow, FListbox, FLabel, FErrorMessages, FInfoText },

    mixins: [FSelect, FListbox, formInputMixin, popoverAnimationMixin],

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
        /** If `true`, select an item only by pressing the 'Enter' key or by clicking on the item */
        selectOnMainAction: {
            type: Boolean,
            default: false,
        },
        /** If `true`, the width of the component will not be automatically adjusted according to the longest item */
        variableWidth: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            selectedItem: {},
            buttonLabel: this.buttonInitLabel,
            showPopover: false,
            buttonId: getUniqueId(),
        };
    },

    computed: {
        keydownEvent() {
            return !this.selectOnMainAction ? 'keydown' : null;
        },
    },

    watch: {
        value(_val) {
            this.inputValue = _val;

            // set selected item by new value
            this.$nextTick(() => {
                const value = this.inputValue;
                const selectedItem = this.data.find(_item => _item.value === value);

                if (selectedItem) {
                    this.selectedItem = selectedItem;
                    this.$emit('selected', cloneObject(selectedItem));
                }
            });
        },
        data() {
            if (!this.variableWidth) {
                this.$nextTick(() => {
                    this.setWidth(true);
                });
            }
        },
    },

    created() {
        this._elWidth = -1;

        if (!this.variableWidth) {
            this.setWidth();
        }
    },

    mounted() {
        if (!this.variableWidth) {
            this._setElWidth();
        }

        this.setSelected();
    },

    methods: {
        /**
         * Set selected item.
         *
         * @param {string|number} [_value]
         */
        setSelected(_value) {
            // const { value } = this;
            const value = _value || this.value;
            const { data } = this;

            if (data.length === 0) {
                return;
            }

            let selectedItem = data.find(_item => !!_item.selected);

            if ((!selectedItem || _value) && value !== undefined) {
                selectedItem = data.find(_item => _item.value === value);
            }

            if (selectedItem) {
                this.selectedItem = selectedItem;
            } else {
                // select first item
                this.selectedItem = data[0];
            }

            this.inputValue = this.selectedItem.value;
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

        /**
         * @param {FListboxItem} _item
         * @param {string} _selectionAction
         */
        onListboxItemSelected(_item, _selectionAction) {
            this.selectedItem = _item;

            if (this.selectOnMainAction || _selectionAction !== 'enterKey') {
                this.emitChangeEvent(_item, _selectionAction);
            }

            if (this.selectOnMainAction || _selectionAction === 'click' || _selectionAction === 'enterKey') {
                this.$refs.popover.hide(this.animationOutSuccess);
            }
        },

        /**
         * @param {('next' | 'prev' | 'first' | 'last')} _which
         */
        selectItem(_which) {
            const value = this.selectedItem.value;
            let sIdx = this.data.findIndex(_item => _item.value === value);
            let idx = 0;

            if (sIdx > -1) {
                if (_which === 'next') {
                    idx = sIdx + 1;
                } else if (_which === 'prev') {
                    idx = sIdx - 1;
                } else if (_which === 'last') {
                    idx = this.data.length - 1;
                } else if (_which === 'first') {
                    idx = 0;
                }

                if (sIdx != idx) {
                    const item = this.data[idx];
                    if (item) {
                        this.selectedItem = cloneObject(item);
                        this.emitChangeEvent(cloneObject(item), 'focus');
                    }
                }
            }
        },

        /**
         * Automatically adjust width of the component according to the longest item
         */
        setWidth(_dataChange) {
            const { $el } = this;
            const { data } = this;
            const { value } = this;
            let maxLen = 0;
            let maxIdx = 0;

            // find the item with the longest label
            data.forEach((_item, _idx) => {
                const labelLen = _item.label.length;

                if (labelLen > maxLen) {
                    maxLen = labelLen;
                    maxIdx = _idx;
                }
            });

            // reset components (inline) width
            if ($el && $el.style.width) {
                $el.style.width = '';
            }

            this.setSelected(data[maxIdx].value);

            if (!_dataChange) {
                this._setElWidth();
            }

            this.$nextTick(() => {
                const { $el } = this;
                if ($el) {
                    if (_dataChange) {
                        this._setElWidth();
                    }

                    if (this._elWidth > -1) {
                        $el.style.width = `${this._elWidth}px`;
                        this._elWidth = -1;
                    }
                }

                this.setSelected(value);
            });
        },

        /**
         * Get the component width and set `this._elWidth` property
         */
        _setElWidth() {
            const rect = this.$el ? this.$el.getBoundingClientRect() : null;

            if (rect) {
                this._elWidth = rect.width;
            }
        },

        /**
         * @param {KeyboardEvent} _event
         */
        onKeydown(_event) {
            if (isKey('ArrowDown', _event)) {
                this.selectItem('next');
                _event.preventDefault();
            } else if (isKey('ArrowUp', _event)) {
                this.selectItem('prev');
                _event.preventDefault();
            } else if (isKey('End', _event) || isKey('PageDown', _event)) {
                this.selectItem('last');
                _event.preventDefault();
            } else if (isKey('Home', _event) || isKey('PageUp', _event)) {
                this.selectItem('first');
                _event.preventDefault();
            }
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
