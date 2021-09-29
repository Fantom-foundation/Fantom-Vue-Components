<template>
    <div :id="id" class="flistbox" :class="classes">
        <slot name="top" v-bind="slotProps">
            <f-label v-if="label" :id="labeledById" :label="label" :required="required" />
        </slot>

        <ul
            ref="listbox"
            :id="listboxId || null"
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
                v-for="item in items"
                :id="item.id"
                :key="item.id"
                role="option"
                :aria-selected="isItemSelected(item)"
                :aria-disabled="!!item.disabled"
                class="flistbox_list_item"
                :class="{ 'flistbox_list_item-focus': item.id === focusedItem.id }"
            >
                <slot :item="item" :selected="isItemSelected(item)" :focused="item.id === focusedItem.id">
                    {{ item.label }}
                </slot>
            </li>
        </ul>
        <f-intersection-observer
            v-if="strategy === 'remote'"
            v-show="showLoader"
            :root="`#${id}`"
            @entry="onEntry"
            class="flistbox_list_item flistbox_list_item_loading"
        >
            <f-dots-loader />
        </f-intersection-observer>
        <div v-show="showNotFound" class="flistbox_list_item flistbox_list_item_notfound">
            {{ _('flistbox.notFound') }}
        </div>
        <f-pagination
            ref="pagination"
            :total-items="dTotalItems"
            :per-page="perPage"
            :curr-page="currPage"
            @page-change="onPageChange"
            style="display: none"
            hidden
        />
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
import FIntersectionObserver from '../FIntersectionObserver/FIntersectionObserver.vue';
import FDotsLoader from '../FDotsLoader/FDotsLoader.vue';
import FErrorMessages from '../FErrorMessages/FErrorMessages.vue';
import FInfoText from '../FInfoText/FInfoText.vue';
import { isArray } from '../../utils/array.js';

/**
 * FListbox item.
 * @typedef {Object} FListboxItem
 * @property {string|Object} [value] Specifies the value of listbox item
 * @property {string} [label] Specifies a label for an item
 * @property {boolean} [disabled] Specifies that an item should be disabled
 * @property {boolean} [selected] Specifies that an item should be pre-selected
 */

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

    components: { FDotsLoader, FIntersectionObserver, FPagination, FLabel, FErrorMessages, FInfoText },

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
            selectableItemSelector: '.flistbox_list_item:not([aria-disabled="true"])',
            loading: false,
            lastPage: false,
        };
    },

    computed: {
        classes() {
            return {
                'flistbox-horizontal': this.horizontal,
            };
        },

        showLoader() {
            return this.strategy === 'remote' && !(this.lastPage && !this.loading) && isPromise(this.data);
        },

        showNotFound() {
            return !this.loading && this.items.length === 0;
        },
    },

    watch: {
        value(_val) {
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
            }
        },

        data: {
            handler(_value, _oldValue) {
                if (isPromise(_value)) {
                    this.setItems(_value, true);
                } else if (JSON.stringify(_value) !== JSON.stringify(_oldValue)) {
                    // this.items = this.getItems();
                    this.setItems(_value);
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
            this.$emit('item-focus', cloneObject(_value));
        },
    },

    created() {
        this._firstKeyup = true;
        this._firstPageChange = true;
        // this._prevFilterText = this.filterText;
        this._prevFilterText = '';
        this._itemSelected = false;

        if (this.filterText || this.strategy === 'remote') {
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

                        if (this.currentPage() === 1) {
                            this.items = this.getItems(cloneObject(data.data));
                        } else {
                            this.items = this.items.concat(this.getItems(cloneObject(data.data)));
                            selectedItemValue = this.selectedItem.value;
                        }

                        this.loading = false;

                        this.lastPage = !!data.isLastPage;

                        if (!this.lastPage) {
                            this.$nextTick(() => {
                                const pagination = this.getPaginationState();
                                this.lastPage = !!pagination.isLastPage;

                                if (this.lastPage) {
                                    this._loadNextPage = false;
                                }

                                if (this._loadNextPage) {
                                    defer(() => {
                                        if (this._loadNextPage) {
                                            this.goToPage('next');

                                            this._loadNextPage = false;
                                        }
                                    }, 5); // ?
                                }

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
                        } else {
                            this._loadNextPage = false;
                        }
                    }
                } catch (_error) {
                    this.loading = false;
                    throw _error;
                }
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
            const { pagination } = this.$refs;
            const page = typeof _page === 'number' ? _page : this.currentPage() + 1;

            if (pagination) {
                pagination.goToPage(page);
            }
        },

        currentPage() {
            return this.getPaginationState().currPage || -1;
        },

        getPaginationState() {
            const { pagination } = this.$refs;

            if (pagination) {
                return pagination.state;
            }

            return {};
        },

        findItemByValue(value, key = 'id') {
            if (value === undefined || this.disabled) {
                return null;
            }

            const item = this.items.find(_item => this.valuesAreEqual(_item[key], value));

            return item && !item.disabled ? item : null;
        },

        selectItem({ item = null, emitEvent = '', value, key = 'id', focusItem = false }) {
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

                    this._itemSelected = true;
                }

                if (emitEvent) {
                    this.emitChangeEvent(cloneObject(itm), emitEvent);
                }

                this.selectedItem = removeSelectedItem ? {} : itm;

                if (focusItem && this.focusedItem.id !== this.selectedItem.id) {
                    this.focusItem({ item: itm });
                }

                this.$nextTick(() => {
                    this._itemSelected = false;
                });
            }
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
                if (!selectedItem && value) {
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

        valuesAreEqual(val1, val2) {
            if (isObject(val1) || isObject(val2)) {
                return objectEquals(val1, val2);
            } else {
                return val1 === val2;
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
                this.selectItem({ value: eItem.id, emitEvent: 'click', focusItem: true });
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

            if (!eItem && !focusedItem.id && (isKey('ArrowDown', _event) || isKey('ArrowUp', _event))) {
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
            if (this._firstPageChange) {
                this._firstPageChange = false;
                return;
            }

            // if ((!this.filterText && !this._prevFilterText) || this.filterText !== this._prevFilterText) {
            this.$emit('page-change', {
                filterText: this.value && this.filterText === this._prevFilterText ? '' : this.filterText,
                ..._state,
            });
            // } else {
            //     this.setItems(this.data, isPromise(this.data));
            // }
        },

        /**
         * @param {IntersectionObserverEntry} _entry
         */
        onEntry(_entry) {
            if (this.loading) {
                this._loadNextPage = _entry.isIntersecting;
            } else {
                this._loadNextPage = false;
            }

            if (!this.loading && _entry.isIntersecting) {
                this.goToPage('next');
                this._loadNextPage = false;
            }
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
