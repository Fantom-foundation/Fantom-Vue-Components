<template>
    <div
        class="fcombobox"
        :class="classes"
        @[clickEvent]="onClick"
        role="combobox"
        aria-haspopup="listbox"
        :aria-owns="listboxId"
        :aria-expanded="popoverVisible ? 'true' : 'false'"
        :aria-invalid="validationState.invalid"
    >
        <component
            :is="inputComponent"
            v-model="iValue"
            ref="input"
            v-bind="$props"
            autocomplete="off"
            aria-autocomplete="list"
            :input-cont-id="dInputContId"
            :controls-id="popoverVisible ? listboxId : ''"
            :aria-activedescendant="activeDescendant"
            :readonly="readonly"
            :validator="null"
            :invalid="validationState.invalid"
            @keydown.native="onInputKeydown"
            @keyup.native="onInputKeyup"
            @focus="onInputFocus"
            @blur="onInputBlur"
            :aria-invalid="validationState.invalid"
            class="inp-withbutton"
        >
            <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
                <slot :name="name" v-bind="data"></slot>
            </template>

            <template #suffix="sProps">
                <span @click="onButtonClick">
                    <slot name="button" v-bind="{ ...sProps, ...slotProps, ...loading }">
                        <f-button
                            :size="buttonSize"
                            :disabled="disabled"
                            tertiary
                            round
                            :title="_('fcombobox.showOptions')"
                            :tabindex="selectMode ? '-1' : null"
                        >
                            <slot name="icon" v-bind="{ ...sProps, ...slotProps, ...loading }">
                                <f-svg-icon v-if="!loading" size="1em">
                                    <icon-chevron-down />
                                </f-svg-icon>
                                <span v-else><f-dots-loader size="var(--f-spacer-1, 3px)"/></span>
                            </slot>
                        </f-button>
                    </slot>
                </span>
            </template>
        </component>

        <f-popover
            v-if="popoverVisible"
            ref="popover"
            :attach-to="`#${dInputContId}`"
            :attach-position="attachPosition"
            :attach-margin="[0, 0, 0, 0]"
            :animation-in="animationIn"
            :animation-out="animationOut"
            :hide-on-document-scroll="hideOnDocumentScroll"
            :fit-height-to-viewport="fitHeightToViewport"
            __hide-on-document-mousedown
            width-as-attach
            class="fcombobox_fwindow"
            @window-hide="onPopoverHide"
        >
            <f-listbox
                ref="listbox"
                :listbox-id="listboxId"
                label=""
                info-text=""
                no-aria-activedescendant
                v-bind="$attrs"
                :strategy="strategy"
                :value="inputValue"
                :data="listboxData"
                :filter-text="listboxFilterText"
                :transform-data-func="transformDataFunc"
                :select-immediately="inlineAutocomplete"
                class="fcombobox_flistbox"
                @component-change="onListboxItemSelected"
                @page-change="$emit('page-change', $event)"
                @loading="onLoading"
                @item-focus="onListboxItemFocus"
            >
                <template v-slot="{ item }">
                    <slot name="item" :item="item">
                        {{ item.label }}
                    </slot>
                </template>
            </f-listbox>
        </f-popover>

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
// import FSelect from '../FSelect/FSelect.vue';
import FListbox from '../FListbox/FListbox.vue';
import { popoverAnimationMixin } from '../../mixins/popover-animation.js';
import { fieldWithButtonMixin } from '../../mixins/field-with-button.js';
import { translationsMixin } from '../../mixins/translations.js';
import { clone, defer, getUniqueId, isPromise } from '../../utils/index.js';
import FInput from '../FInput/FInput.vue';
import { isKey } from '../../utils/aria.js';
import FButton from '../FButton/FButton.vue';
import FSvgIcon from '../FSvgIcon/FSvgIcon.vue';
import IconChevronDown from '../icons/IconChevronDown.vue';
import FDotsLoader from '../FDotsLoader/FDotsLoader.vue';
import FErrorMessages from '../FErrorMessages/FErrorMessages.vue';
import FInfoText from '../FInfoText/FInfoText.vue';
import { selectMixin } from '../../mixins/select.js';
import { formInputMixin } from '../../mixins/form-input.js';
import { helpersMixin } from '../../mixins/helpers.js';
import FPopover from '../FPopover/FPopover.vue';

/**
 * @param {Object} _data
 * @return {{data: array, isLastPage?: boolean, totalItems?: number}}
 */
function defaultTransformDataFunc(_data) {
    return {
        totalItems: parseInt(_data.totalItems),
        data: _data.data,
    };
}

/**
 * Combobox component following wai-aria practicess
 */
export default {
    name: 'FComboBox',

    inheritAttrs: false,

    components: {
        FPopover,
        FDotsLoader,
        IconChevronDown,
        FSvgIcon,
        FButton,
        FInput,
        FListbox,
        FErrorMessages,
        FInfoText,
    },

    // mixins: [popoverAnimationMixin, translationsMixin, fieldWithButtonMixin, selectMixin, formInputMixin, helpersMixin],
    mixins: [popoverAnimationMixin, translationsMixin, selectMixin, formInputMixin, helpersMixin],

    model: {
        prop: 'value',
        event: 'change',
    },

    props: {
        ...FInput.props,
        // ...FListbox.props,
        /**
         * Listbox's items
         * @type {FListboxItem[]}
         */
        data: { ...FListbox.props.data },
        /** Used for transforming data from promise. Has to return object `{data: array, isLastPage?: boolean, totalItems?: number}` (isLastPage or totalItems) */
        transformDataFunc: {
            type: Function,
            default: defaultTransformDataFunc,
        },
        /**
         * Strategy for handling filtering
         * `'local'` - use local filtering
         * `'remote'` - just fire 'page-change' event with info about pagination
         *
         * @type {('local')}
         */
        strategy: {
            type: String,
            default: 'local',
            validator: function(_value) {
                return ['local', 'remote'].indexOf(_value) !== -1;
            },
        },
        /** Specifies component for input */
        inputComponent: {
            type: String,
            default: 'f-input',
        },
        attachPosition: {
            type: String,
            default: 'auto-vertical-exact',
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        /** Value is one of the listbox items. Same behaviour as native select element */
        selectMode: {
            type: Boolean,
            default: false,
        },
        textIsValue: {
            type: Boolean,
            default: false,
        },
        /** If `true`, select an item only by pressing the 'Enter' key or by clicking on the item */
        inlineAutocomplete: {
            type: Boolean,
            default: true,
        },
        /** Hide popover on browser window is scrolled */
        hideOnDocumentScroll: {
            type: Boolean,
            default: false,
        },
        fitHeightToViewport: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            listboxData: [],
            selectedItem: {},
            listboxId: getUniqueId(),
            iValue: '',
            listboxFilterText: '',
            activeDescendant: '',
            popoverVisible: false,
            hasFocus: false,
            loading: false,
        };
    },

    computed: {
        ...fieldWithButtonMixin.computed,

        clickEvent() {
            return this.selectMode ? 'click' : null;
        },

        classes() {
            return {
                'fcombobox-selectmode': this.selectMode,
                'fcombobox-disabled': this.disabled,
            };
        },
    },

    watch: {
        value(_value) {
            this.inputValue = _value;

            this.validate();

            if (!isPromise(this.data)) {
                const selectedItem = this.data.find(_item => this.valuesAreEqual(_item.value, _value));

                if (selectedItem && !this.valuesAreEqual(selectedItem.value, this.selectedItem.value)) {
                    this.selectedItem = selectedItem;
                    this.iValue = this.selectedItem.label;
                }
            }
        },

        selectedItem(_value) {
            this.$nextTick(() => {
                this.$emit('selected', clone(_value));
                this.$emit('change', this.textIsValue ? _value.label : clone(_value.value));
            });
        },

        data: {
            handler(_value, _oldValue) {
                const valueIsPromise = isPromise(_value);

                if (!valueIsPromise && isPromise(_oldValue) && this._firstPromise) {
                    this._firstPromise = false;
                    return;
                }

                this.listboxData = _value;

                if (this.selectMode && !valueIsPromise) {
                    this.setSelectedItem();
                }
            },
            immediate: true,
        },

        iValue(_value) {
            if (this.hasFocus) {
                if (this.textIsValue) {
                    this.$emit('change', _value);
                }

                if (!this._listboxItemSelected) {
                    this.filterData(_value);
                } else if (!this.readonly && !this.inlineAutocomplete) {
                    this.$nextTick(() => {
                        this.listboxFilterText = _value;
                    });
                }
            } else if (this.textIsValue) {
                this.$emit('change', _value);
            }
        },
    },

    created() {
        this._listboxItemSelected = false;
        this._firstPromise = true;

        /*if (this.selectMode) {
            this.setSelectedItem();
        }*/
    },

    methods: {
        activate() {
            this.onButtonClick();
        },

        async setSelectedItem() {
            const data = isPromise(this.data) ? this.transformDataFunc(await this.data).data : this.data;
            const { value } = this;
            let selectedItem = data.find(_item => !!_item.selected);

            if (!selectedItem && value !== '') {
                selectedItem = data.find(_item => this.valuesAreEqual(_item.value, value));
            }

            if (!selectedItem) {
                selectedItem = clone(data[0]);
            }

            this.selectedItem = selectedItem || {};

            this.iValue = this.selectedItem.label;
        },

        filterData(_text) {
            this.showPopover();

            this.listboxFilterText = _text;
            // this.listboxData = this.data.filter(_item => _item.label.indexOf(_text) > -1);

            defer(this.focusFirstListboxItem);
        },

        focusFirstListboxItem() {
            const { listbox } = this.$refs;

            if (listbox) {
                listbox.focusFirstItem();
            }
        },

        showPopover() {
            if (this.popoverVisible) {
                return;
            }

            this.popoverVisible = true;

            this.$nextTick(() => {
                const { popover } = this.$refs;

                if (popover) {
                    popover.show();
                    // defer(this.focusFirstListboxItem);
                }
            });
        },

        /**
         * @param {string} [animation]
         */
        hidePopover(animation = '') {
            const { popover } = this.$refs;

            if (popover && this.popoverVisible) {
                popover.hide(animation);
            }
        },

        valuesAreEqual(val1, val2) {
            return FListbox.methods.valuesAreEqual(val1, val2);
        },

        onPopoverHide(_event) {
            this.$emit('window-hide', _event);

            this.$nextTick(() => {
                this.popoverVisible = false;
            });
        },

        /**
         * @param {FListboxItem} _item
         * @param {string} _selectionAction
         */
        onListboxItemSelected(_item, _selectionAction) {
            this._listboxItemSelected = true;
            this.iValue = _item.label;
            this.selectedItem = _item;

            this.inputValue = this.textIsValue ? _item.label : _item.value;

            if (this.validateOnChange) {
                this.validate();
            }

            // this.$emit('input', this.inputValue);
            /*if (!this.inlineAutocomplete || _selectionAction !== 'enterKey') {
                this.emitChangeEvent(_item, _selectionAction);
            }*/

            if (!this.inlineAutocomplete || _selectionAction === 'click' || _selectionAction === 'enterKey') {
                this.hidePopover('scale-center-forward-leave-active');
            }

            this.$nextTick(() => {
                this._listboxItemSelected = false;
            });
        },

        /**
         * @param {FListboxItem} _item
         */
        onListboxItemFocus(_item) {
            this.activeDescendant = _item.id || '';
        },

        onLoading(_loading) {
            this.loading = _loading;
        },

        onInputKeydown(_event) {
            const { listbox } = this.$refs;

            // console.log(_event.key);
            if (isKey('ArrowDown', _event)) {
                /*if (this.readonly) {
                    this.listboxData = clone(this.data);
                }*/

                this.showPopover();
            }
            if (isKey('Enter', _event)) {
                if (this.popoverVisible) {
                    _event.preventDefault();
                }
            } else if (isKey('Escape', _event)) {
                this.hidePopover();

                if (this.selectMode) {
                    this.iValue = this.selectedItem.label;
                } else {
                    this.iValue = '';
                }
            }

            if (listbox) {
                listbox.onKeydown(_event, this.readonly);
            }
        },

        onInputKeyup(_event) {
            const { listbox } = this.$refs;

            if (listbox) {
                listbox.onKeyup(_event);
            }
        },

        onClick() {
            this.onButtonClick();
        },

        onButtonClick() {
            // const { input } = this.$refs;

            if (this.disabled) {
                return;
            }

            // if always show
            this.listboxData = isPromise(this.data) ? this.data : clone(this.data);

            this.showPopover();

            /* if (input && !this.readonly) {
                input.select();
            } */
        },

        onInputFocus() {
            this.hasFocus = true;
        },

        onInputBlur() {
            if (this.selectMode) {
                this.iValue = this.selectedItem.label;
            }

            this.hidePopover();
            this.hasFocus = false;
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
