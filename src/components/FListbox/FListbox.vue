<template>
    <div :id="id" class="flistbox" :class="classes">
        <slot name="top" v-bind="slotProps">
            <f-label v-if="label" :id="labeledById" :label="label" :required="required" />
        </slot>

        <component
            v-if="searchable"
            :is="inputComponent"
            v-bind="$attrs"
            no-label
            :aria-label="searchFieldLabel"
            :aria-activedescendant="activeDescendant"
            :controls-id="id"
            @input="onSearch"
            class="flistbox_searchfield"
        />

        <f-infinite-scroll
            ref="iScroll"
            :loading="loading"
            :disabled="strategy !== 'remote'"
            :total-items="dTotalItems"
            :per-page="perPage"
            :curr-page="currPage"
            :root="infiniteScrollRoot || `#${id}`"
            :root-margin="infiniteScrollRootMargin"
            dont-check-total-items
            @page-change="onPageChange"
        >
            <template #loader>
                <div class="flistbox_list_item tea-center"><f-dots-loader /></div>
            </template>

            <ul
                ref="listbox"
                :id="listboxId || id"
                role="listbox"
                class="flistbox_list no-markers"
                :tabindex="disabled ? -1 : 0"
                :aria-activedescendant="!noAriaActivedescendant ? focusedItem.id : null"
                :aria-labelledby="ariaLabeledByIds"
                :aria-describedby="ariaDescribedByIds"
                :aria-disabled="disabled"
                :aria-invalid="validationState.invalid"
                :aria-label="ariaLabel || null"
                :aria-multiselectable="multiselect"
                @click="onClick"
                @mousedown.prevent
                @keydown="onKeydown"
                @keyup="onKeyup"
                @focus="onFocus"
            >
                <li
                    v-for="item in prependedItems"
                    :id="item.id"
                    :key="`${item.id}_f`"
                    role="option"
                    :aria-selected="isItemSelected(item)"
                    class="flistbox_list_item"
                    :class="{
                        'flistbox_list_item-focus': item.id === focusedItem.id,
                        'flistbox_list_item-removable': isItemRemovable(item),
                    }"
                >
                    <slot
                        :item="item"
                        :selected="isItemSelected(item)"
                        :focused="item.id === focusedItem.id"
                        :removable="isItemRemovable(item)"
                    >
                        {{ item.label }}
                        <template v-if="isItemRemovable(item)">
                            <slot name="remove-button">
                                <span
                                    class="flistbox_list_item_removebutton"
                                    aria-hidden="true"
                                    :title="_('flistbox.removeItem')"
                                >
                                    <f-svg-icon><icon-times /></f-svg-icon>
                                </span>
                            </slot>
                        </template>
                    </slot>
                </li>
                <li
                    v-for="item in items"
                    :id="item.id"
                    :key="item.id"
                    role="option"
                    :aria-selected="isItemSelected(item)"
                    :aria-disabled="!!item.disabled || item.__prepend"
                    :hidden="item.__prepend || null"
                    class="flistbox_list_item"
                    :class="{
                        'flistbox_list_item-focus': item.id === focusedItem.id,
                        'flistbox_list_item-removable': isItemRemovable(item),
                    }"
                >
                    <slot
                        :item="item"
                        :selected="isItemSelected(item)"
                        :focused="item.id === focusedItem.id"
                        :removable="isItemRemovable(item)"
                    >
                        {{ item.label }}
                        <template v-if="isItemRemovable(item)">
                            <slot name="remove-button">
                                <span
                                    class="flistbox_list_item_removebutton"
                                    aria-hidden="true"
                                    :title="_('flistbox.removeItem')"
                                >
                                    <f-svg-icon><icon-times /></f-svg-icon>
                                </span>
                            </slot>
                        </template>
                    </slot>
                </li>
            </ul>
        </f-infinite-scroll>

        <div v-show="showNotFound" class="flistbox_list_item flistbox_list_item_notfound">
            {{ _('flistbox.notFound') }}
        </div>

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
import './FListbox.types.js';
import { helpersMixin } from '../../mixins/helpers.js';
import { formInputMixin } from '../../mixins/form-input.js';
import { translationsMixin } from '../../mixins/translations.js';
import { cloneObject, defer, isObject, isPromise, objectEquals } from '../../utils';
import { isKey, keyboardNavigation } from '../../utils/aria.js';
import { selectMixin } from '../../mixins/select.js';
import FLabel from '../FLabel/FLabel.vue';
import FPagination from '../FPagination/FPagination.vue';
import FErrorMessages from '../FErrorMessages/FErrorMessages.vue';
import FInfoText from '../FInfoText/FInfoText.vue';
import FSearchField from '../FSearchField/FSearchField.vue';
import { isArray } from '../../utils/array.js';
import FSvgIcon from '../FSvgIcon/FSvgIcon.vue';
import IconTimes from '../icons/IconTimes.vue';
import FInfiniteScroll from '../FInfiniteScroll/FInfiniteScroll.vue';
import FDotsLoader from '../FDotsLoader/FDotsLoader.vue';

/**
 * @param {FListboxItem} _item
 * @param {string} _text
 * @return {boolean}
 */
function defaultListboxFilter(_item, _text) {
    return _item && _item.label.toLowerCase().indexOf(_text.toLowerCase()) > -1;
}

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
 * Listbox component created according to WAI-ARIA rules and practices.
 *
 * @mixes selectMixin
 */
export default {
    name: 'FListbox',

    inheritAttrs: false,

    components: {
        FDotsLoader,
        FInfiniteScroll,
        IconTimes,
        FSvgIcon,
        FLabel,
        FErrorMessages,
        FInfoText,
        FSearchField,
    },

    mixins: [selectMixin, formInputMixin, helpersMixin, translationsMixin],

    model: {
        prop: 'value',
        event: 'change',
    },

    props: {
        /**
         * Listbox's items
         * @type {FListboxItem[]}
         */
        data: {
            type: [Array, Promise],
            default() {
                return [];
            },
        },
        /** If `true`, `component-change` event will be fired right on item focus (keyboard movement, click) */
        selectImmediately: {
            type: Boolean,
            default: false,
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
        /** Used for transforming data from promise. Has to return object `{data: array, isLastPage?: boolean, totalItems?: number}` (isLastPage or totalItems) */
        transformDataFunc: {
            type: Function,
            default: defaultTransformDataFunc,
        },
        /** */
        filter: {
            type: Function,
            default: defaultListboxFilter,
        },
        /** */
        filterText: {
            type: String,
            default: '',
        },
        /** */
        listboxId: {
            type: String,
            default: '',
        },
        /** If `true`, first focusable item will be focused */
        focusItemOnFocus: {
            type: Boolean,
            default: false,
        },
        /** If `true`, keyboard navigation will be circular (last item -> first item, first item -> last item) */
        circularNavigation: {
            type: Boolean,
            default: false,
        },
        horizontal: {
            type: Boolean,
            default: false,
        },
        /** If `true`, hide atribute aria-activedescendant */
        noAriaActivedescendant: {
            type: Boolean,
            default: false,
        },
        /** If `true`, multiple values can be selected */
        multiselect: {
            type: Boolean,
            default: false,
        },
        /** If `true`, selected item(s) will be displayed before other items */
        prependSelectedItems: {
            type: Boolean,
            default: false,
        },
        /** If `true`, items will be removable from the list */
        removableItems: {
            type: Boolean,
            default: false,
        },
        /** List items can have focus but can't be selected */
        nonSelectable: {
            type: Boolean,
            default: false,
        },
        /** Don't show "Not found" message */
        hideNotFoundMessage: {
            type: Boolean,
            default: false,
        },
        /** Shows a search field */
        searchable: {
            type: Boolean,
            default: false,
        },
        /** Specifies component for search field */
        inputComponent: {
            type: String,
            default: 'f-search-field',
        },
        /** */
        searchFieldLabel: {
            type: String,
            default: 'search component',
        },
        /** Selector for root element */
        infiniteScrollRoot: {
            type: String,
            default: '',
        },
        /** Margin around the root */
        infiniteScrollRootMargin: {
            type: String,
            default: '120px 0px',
        },
        /** Total amount of items (FPagination prop) */
        totalItems: { ...FPagination.props.totalItems },
        /** Number of items per page (FPagination prop) */
        perPage: { ...FPagination.props.perPage },
        /** Current page number (FPagination prop) */
        currPage: { ...FPagination.props.currPage },
    },

    data() {
        return {
            items: [],
            dTotalItems: this.totalItems,
            selectedItem: {},
            focusedItem: {},
            selectedItems: [],
            prependedItems: [],
            selectableItemSelector: '.flistbox_list_item:not([aria-disabled="true"])',
            activeDescendant: '',
            dFilterText: '',
            loading: false,
        };
    },

    computed: {
        classes() {
            return {
                'flistbox-horizontal': this.horizontal,
            };
        },

        showNotFound() {
            return !this.hideNotFoundMessage && !this.loading && this.items.length === 0;
        },
    },

    watch: {
        value(_val) {
            this.onValueChange(_val);
        },

        data: {
            handler(_value, _oldValue) {
                if (isPromise(_value)) {
                    this.setItems(_value, true);
                } else if (JSON.stringify(_value) !== JSON.stringify(_oldValue)) {
                    // this.items = this.getItems();
                    this.setItems(_value);
                }

                if (this.inputValue) {
                    this.onValueChange(this.inputValue);
                }
            },
            deep: true,
        },

        items() {
            this.setSelected();
        },

        filterText(_value, _oldValue) {
            this._prevFilterText = _oldValue || '';
            // strategy local
            this.filterItems(_value);
        },

        loading(_value) {
            this.$emit('loading', _value);
        },

        focusedItem(_value) {
            this.activeDescendant = _value.id || '';

            this.$emit('item-focus', cloneObject(_value));
        },

        totalItems(value) {
            this.dTotalItems = value;
        },
    },

    created() {
        this._firstKeyup = true;
        // this._prevFilterText = this.filterText;
        this._prevFilterText = '';
        this._itemSelected = false;

        // if (this.filterText || this.strategy === 'remote') {
        if (this.filterText) {
            this.filterItems(this.filterText);
        } else {
            this.setItems(this.data, isPromise(this.data));
        }

        // console.log('flistbox', this._uid);
    },

    /*mounted() {
        this._prevFilterText = this.filterText;
    },*/

    beforeDestroy() {
        this.$emit('loading', false);
    },

    methods: {
        async setItems(_items, _itemsArePromise) {
            if (_itemsArePromise) {
                this.loading = true;
                if (this.currentPage() === 1) {
                    this.setItems([]);
                }

                try {
                    let data = await _items;
                    let selectedItemValue;

                    if (this.data === _items) {
                        data = this.transformDataFunc(data);

                        this.dTotalItems = parseInt(data.totalItems);

                        if (isNaN(this.dTotalItems)) {
                            this.dTotalItems = Number.MAX_SAFE_INTEGER;
                        }

                        this.$nextTick(() => {
                            const pagination = this.getPaginationState();

                            if (pagination.currPage === 1) {
                                this.items = this.getItems(cloneObject(data.data));
                            } else {
                                this.items = this.items.concat(this.getItems(cloneObject(data.data)));
                                selectedItemValue = this.selectedItem.value;
                            }

                            this.loading = false;

                            // this.lastPage = !!data.isLastPage;

                            if (!pagination.isLastPage) {
                                this.$nextTick(() => {
                                    // preserve focused item
                                    if (selectedItemValue) {
                                        const idx = this.items.findIndex(_item =>
                                            this.valuesAreEqual(_item.value, selectedItemValue)
                                        );

                                        // if currently focused item is near the bottom edge (trying to guess keyboard movement)
                                        if (this.items.length - pagination.perPage - 2 < idx) {
                                            this.focusItem({ value: selectedItemValue, key: 'value' });
                                        }
                                    }
                                });
                            }
                        });
                    }
                } catch (_error) {
                    this.loading = false;
                    throw _error;
                }
            } else if (this.strategy === 'remote') {
                this.$nextTick(() => {
                    const pagination = this.getPaginationState();

                    if (pagination.isFirstPage) {
                        this.items = this.getItems(cloneObject(_items));
                    } else {
                        this.items = this.items.concat(this.getItems(cloneObject(_items)));
                    }
                });
            } else {
                this.items = this.getItems(cloneObject(_items));
            }
        },

        getItems(_items) {
            const items = _items || cloneObject(this.data);

            this.setIds(items);

            return items;
        },

        filterItems(_text) {
            this.dFilterText = _text;

            if (this.strategy === 'local') {
                const text = _text ? _text.trim() : '';

                this.items = this.getItems().filter(_item => this.filter(_item, text));
            } else if (this.strategy === 'remote') {
                this.$nextTick(() => {
                    this.goToPage(1);
                });
            }
        },

        goToPage(_page) {
            const { iScroll } = this.$refs;

            if (iScroll) {
                if (_page === 1) {
                    iScroll.reset();
                }

                iScroll.getPagination().goToPage(_page);
            }
        },

        currentPage() {
            return this.getPaginationState().currPage || -1;
        },

        getPaginationState() {
            const { iScroll } = this.$refs;

            if (iScroll) {
                return iScroll.getPagination().state;
            }

            /*const { pagination } = this.$refs;

            if (pagination) {
                return pagination.state;
            }*/

            return {};
        },

        findItemByValue(value, key = 'id') {
            if (value === undefined || this.disabled) {
                return null;
            }

            const item = this.items.find(_item => this.valuesAreEqual(_item[key], value));

            return item && !item.disabled ? item : null;
        },

        /**
         * @param {Object|null} item
         * @param {number} [index] Index into `this.items` array
         */
        removeItem(item, index = -1) {
            if (!item) {
                return;
            }

            const { id } = item;
            let idx = index > -1 ? index : this.items.findIndex(_item => _item.id == id);

            if (idx > -1) {
                if (this.isItemSelected(item)) {
                    if (this.multiselect) {
                        const selectedItems = cloneObject(this.selectedItems);

                        selectedItems.splice(
                            selectedItems.findIndex(_item => _item.id === id),
                            1
                        );

                        this.selectedItems = selectedItems;
                    } else {
                        this.selectedItem = {};
                    }
                }

                this.items.splice(idx, 1);

                this.emitChangeEvent({ value: this.selectedItem.value });

                this.setSelected();

                this.$emit('item-remove', { item: cloneObject(item), index: idx });

                const itemsLen = this.items.length;

                if (itemsLen > 0) {
                    if (idx >= itemsLen) {
                        idx = itemsLen - 1;
                    }

                    this.$nextTick(() => {
                        this.focusItem({ item: this.items[idx] });
                    });
                }
            }
        },

        /**
         * @param {Element} eItem
         */
        removeItemByElement(eItem) {
            const { id } = eItem;

            this.removeItem(this.items.find(item => item.id == id));
        },

        selectItem({ item = null, emitEvent = '', value, key = 'id', focusItem = false }) {
            if (this.nonSelectable) {
                return;
            }

            const { selectedItems } = this;
            const itm = item || this.findItemByValue(value, key);
            let removeSelectedItem = false;

            if (itm) {
                if (this.multiselect) {
                    const idx = selectedItems.findIndex(_item => _item.id === itm.id);
                    if (idx > -1) {
                        selectedItems.splice(idx, 1);

                        removeSelectedItem = true;
                    } else {
                        selectedItems.push(itm);
                    }

                    if (this.prependSelectedItems) {
                        this.setPrependedItems(selectedItems);
                    }

                    this._itemSelected = true;
                }

                if (emitEvent) {
                    this.emitChangeEvent(cloneObject(itm), emitEvent);
                }

                this.selectedItem = removeSelectedItem ? {} : itm;

                if (this.prependSelectedItems && !this.multiselect) {
                    this.setPrependedItems([itm]);
                }

                if (focusItem && this.focusedItem.id !== this.selectedItem.id) {
                    this.focusItem({ item: itm });
                }

                this.$nextTick(() => {
                    this._itemSelected = false;
                });
            } else if (!this.multiselect) {
                this.selectedItem = {};
            } else {
                this.selectedItems = [];
            }
        },

        /**
         * @param {Array} items
         */
        setPrependedItems(items) {
            this.prependedItems.forEach(item => {
                delete item.__prepend;
            });

            items.forEach(item => {
                item.__prepend = true;
            });

            this.prependedItems = [...items].reverse();
        },

        /**
         * Select item by `_key`.
         *
         * @param {*} _value Item value.
         * @param {string} [_key] Name of item key.
         */
        focusItem({ item = null, value, key = 'id', dontSelectItem = false }) {
            const itm = item || this.findItemByValue(value, key);

            if (itm) {
                if (this.selectImmediately && !this.multiselect && !dontSelectItem) {
                    this.selectItem({
                        item: itm,
                        // emitEvent: this._prevFilterText === this.filterText && this.filterText !== '' ? 'focus' : '',
                        emitEvent: this._prevFilterText === this.filterText ? 'focus' : '',
                    });
                }

                if (this.selectImmediately && !this.multiselect) {
                    this._prevFilterText = this.filterText;
                }

                this.focusedItem = itm;

                this.scrollToFocusedItem();
            }
        },

        focus() {
            const eListbox = this.$refs.listbox;

            if (eListbox && !this.disabled) {
                eListbox.focus();
            }
        },

        /**
         * Set selected item.
         */
        setSelected() {
            const { value } = this;
            const { items } = this;
            let selectedItem = !this.multiselect
                ? items.find(_item => !!_item.selected)
                : items.filter(_item => !!_item.selected);

            if (!this.multiselect) {
                if (!selectedItem && value !== undefined) {
                    selectedItem = items.find(_item => this.valuesAreEqual(_item.value, value));
                }
            } else if (selectedItem.length === 0 && isArray(value)) {
                value.forEach(val => {
                    const item = items.find(_item => this.valuesAreEqual(_item.value, val));

                    if (item) {
                        if (!selectedItem) {
                            selectedItem = [];
                        }

                        selectedItem.push(item);
                    }
                });
            }

            this.selectedItem = {};

            if (selectedItem && this.strategy !== 'remote') {
                this.$nextTick(() => {
                    if (!isArray(selectedItem)) {
                        this.selectItem({ value: selectedItem.id, focusItem: true });
                    } else {
                        selectedItem.forEach(item => {
                            this.selectItem({ value: item.id });
                        });
                    }
                });
            }
        },

        scrollToFocusedItem() {
            const id = this.focusedItem.id;
            const { $el } = this;
            const listboxHeight = $el.clientHeight;
            let eItem;

            if (id && $el.scrollHeight > listboxHeight) {
                eItem = document.getElementById(id);
                if (eItem) {
                    const listboxScrollTop = $el.scrollTop;
                    const eItemOffsetTop = eItem.offsetTop;
                    const eItemBottom = eItemOffsetTop + eItem.offsetHeight;

                    if (eItemBottom > listboxScrollTop + listboxHeight) {
                        $el.scrollTop = eItemBottom - listboxHeight;
                    } else if (eItemOffsetTop < listboxScrollTop) {
                        $el.scrollTop = eItemOffsetTop;
                    }
                }
            }
        },

        /**
         * @param {FListboxItem} _item
         * @param {string} [_selectionAction]
         */
        emitChangeEvent(_item, _selectionAction = 'focus') {
            const { multiselect } = this;

            if (this.disabled) {
                return;
            }

            if (!multiselect) {
                this.inputValue = _item.value || '';
            } else {
                this.inputValue = this.selectedItems.map(item => item.value);
            }

            this.$emit('component-change', !multiselect ? _item : cloneObject(this.selectedItems), _selectionAction);
            this.$emit('change', this.inputValue);

            if (this.validateOnChange) {
                this.validate();
            }
        },

        /**
         * Focus first focusable item.
         */
        focusFirstItem() {
            if (this.disabled) {
                return;
            }

            const item = this.items.find(_item => !_item.disabled);

            if (item) {
                this.focusItem({ item, dontSelectItem: this._prevFilterText !== '' && this.filterText !== '' });
            }
        },

        /**
         * @param {Object} item
         * @return {boolean}
         */
        isItemSelected(item) {
            return !this.multiselect
                ? item.id === this.selectedItem.id
                : !!this.selectedItems.find(fi => item.id === fi.id);
        },

        /**
         * @param {Object} item
         * @return {boolean}
         */
        isItemRemovable(item) {
            return this.removableItems && !item.disabled;
        },

        valuesAreEqual(val1, val2) {
            if (isObject(val1) || isObject(val2)) {
                return objectEquals(val1, val2);
            } else {
                return val1 === val2;
            }
        },

        onValueChange(_val) {
            if (this.nonSelectable) {
                return;
            }

            this.inputValue = _val;

            if (!this.multiselect) {
                if (!this.valuesAreEqual(this.selectedItem.value, _val)) {
                    this.selectItem({ value: _val, key: 'value', focusItem: true });
                }
            } else if (isArray(_val) && !this._itemSelected) {
                const selectedItems = [];

                _val.forEach(val => {
                    const item = this.items.find(_item => this.valuesAreEqual(_item.value, val));

                    if (item) {
                        selectedItems.push(item);
                    }
                });

                this.selectedItems = selectedItems;

                if (this.prependSelectedItems) {
                    this.setPrependedItems(selectedItems);
                }
            }
        },

        /**
         * @param {Event} _event
         */
        onClick(_event) {
            if (this.disabled) {
                return;
            }

            const eItem = _event.target.closest(this.selectableItemSelector);

            if (eItem) {
                if (this.removableItems && _event.target.closest('.flistbox_list_item_removebutton')) {
                    this.removeItemByElement(eItem);
                } else {
                    this.selectItem({ value: eItem.id, emitEvent: 'click', focusItem: true });
                }
                // this.focusItem(eItem.id, true);
            }
        },

        /**
         * @param {KeyboardEvent} _event
         * @param {boolean} [_useHomeAndEnd]
         */
        onKeydown(_event, _useHomeAndEnd = true) {
            const { focusedItem } = this;

            if (this.disabled) {
                return;
            }

            let eItem = keyboardNavigation({
                _event,
                _selector: this.selectableItemSelector,
                _direction: 'both',
                _circular: this.circularNavigation,
                _target: document.getElementById(focusedItem.id),
                _focusElem: false,
                _useHomeAndEnd,
            });

            if (
                !eItem &&
                !focusedItem.id &&
                (isKey('ArrowDown', _event) || isKey('ArrowRight', _event) || isKey('ArrowUp', _event))
            ) {
                this.focusFirstItem();
                eItem = document.getElementById(focusedItem.id);
            }

            if (eItem) {
                _event.preventDefault();
                this.focusItem({ value: eItem.id });
            }
        },

        /**
         * @param {KeyboardEvent} _event
         */
        onKeyup(_event) {
            if (this.disabled) {
                return;
            }

            if (this.removableItems && isKey('Delete', _event)) {
                this.removeItem(this.focusedItem);
            }

            // if (!this.selectImmediately && this.selectedItem.id && isKey('Enter', _event) && !this._firstKeyup) {
            if (this.focusedItem.id && isKey('Enter', _event) && !this._firstKeyup) {
                this.selectItem({ value: this.focusedItem.id, emitEvent: 'enterKey' });
                // this.emitChangeEvent(cloneObject(this.selectedItem), 'enterKey');
            }

            this._firstKeyup = false;
        },

        onFocus() {
            if (this.disabled) {
                return;
            }

            this._firstKeyup = true;

            if (this.focusItemOnFocus && !this.focusedItem.id) {
                if (!this.value || (this.multiselect && this.value.length === 0)) {
                    this.focusFirstItem();
                } else {
                    this.focusItem({ value: this.value, key: 'value' });
                }
            }
        },

        /**
         * Triggered on `FPagination`'s `'page-change'` event.
         *
         * @param {FPaginationState} _state
         */
        onPageChange(_state) {
            // if ((!this.filterText && !this._prevFilterText) || this.filterText !== this._prevFilterText) {
            let filterText = '';

            if (this.searchable) {
                filterText = this.dFilterText;
            } else {
                filterText = this.value && this.filterText === this._prevFilterText ? '' : this.filterText;
            }

            this.$emit('page-change', { filterText, ..._state });
            // } else {
            //     this.setItems(this.data, isPromise(this.data));
            // }
        },

        onSearch(value) {
            this.filterItems(value);

            defer(() => {
                this.focusFirstItem();
            });
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
