<template>
    <div class="fdatagrid" :class="classes">
        <div v-if="!noHeader" class="fdatagrid_header">
            <slot name="header"></slot>
            <f-pagination
                v-if="usePagination && !infiniteScroll && totalItems > 0"
                v-show="totalItems > dItems.length && totalItems > perPage"
                ref="pagination"
                :type="paginationType"
                :total-items="totalItems"
                :per-page="perPage"
                :curr-page="currPage"
                :disabled="totalItems === 0"
                @page-change="onPageChange"
            />
        </div>

        <div class="fdatagrid_table" :style="style">
            <table
                :id="dTableId"
                role="grid"
                :aria-rowcount="ariaRowCount"
                :aria-colcount="ariaColCount"
                :aria-labelledby="labeledBy || undefined"
                :aria-label="label || undefined"
                :tabindex="editMode !== '' ? 0 : null"
                @click="onTableClick"
                @keydown="onTableKeydown"
                @focus="onTableFocus"
                @focusout="onTableFocusout"
            >
                <caption v-if="caption" :class="{ 'fdatagrid_caption-hidden': captionHidden }">
                    {{
                        caption
                    }}
                </caption>
                <thead class="fdatagrid_thead">
                    <tr @click="onHeaderClick" @keyup="onHeaderKeyup">
                        <th
                            v-for="(col, index) in cColumns"
                            :hidden="!!col.hidden"
                            :key="col.name"
                            :class="getColumnClass(index, col, true) + ' ' + getHeadingColumnClass(col)"
                            :aria-sort="getAriaSort(col)"
                            :tabindex="sortableColumnsNum > 0 && !col.sortable ? -1 : undefined"
                        >
                            <div
                                class="fdatagrid_thead_cellin"
                                :role="col.sortable ? 'button' : undefined"
                                :tabindex="sortableColumnsNum > 0 && col.sortable ? 0 : undefined"
                            >
                                {{ col.label }}
                            </div>
                        </th>
                    </tr>
                </thead>
                <f-infinite-scroll
                    v-if="!!dItems.length || infiniteScroll"
                    ref="tbody"
                    tag="tbody"
                    intersection-observer-tag="tr"
                    :loading="cLoading"
                    :disabled="!infiniteScroll"
                    :total-items="totalItems"
                    :per-page="perPage"
                    :curr-page="currPage"
                    :root="infiniteScrollRoot"
                    :root-margin="infiniteScrollRootMargin"
                    @page-change="onPageChange"
                >
                    <template #loader>
                        <td :colspan="visibleColumnsNum">
                            <slot name="infs-loader">
                                <div class="tea-center"><f-dots-loader /></div>
                            </slot>
                        </td>
                    </template>

                    <template v-for="(item, index) in dItems">
                        <tr
                            :key="item._id"
                            :data-fdg-id="item._id"
                            :style="item.css"
                            :class="item.cssClass"
                            :aria-rowindex="getAriaRowIndex(index)"
                        >
                            <td
                                v-for="(col, index) in cColumns"
                                :key="col.name"
                                :hidden="!!col.hidden"
                                :class="getColumnClass(index, col)"
                                :data-label="col.label"
                                tabindex="-1"
                            >
                                <div class="fdatagrid_cellin">
                                    <div v-if="edModeRowEdit && col.name === '__removerow__'" data-removerow>
                                        <slot name="remove-row">
                                            <f-button
                                                tertiary
                                                same-size
                                                :tabindex="!editing ? '-1' : null"
                                                :aria-label="_('fdatagrid.removeRow')"
                                            >
                                                <f-svg-icon size="16px"><icon-trash /></f-svg-icon>
                                            </f-button>
                                        </slot>
                                    </div>
                                    <!-- @slot Dynamic slot for cell editors -->
                                    <slot
                                        v-else-if="isCellEditorOn(item, col)"
                                        :name="`editor-${col.name}`"
                                        :value="getItemPropValue(item, col)"
                                        :item="item"
                                        :column="col"
                                    />
                                    <!-- @slot Dynamic slot for cells -->
                                    <slot
                                        v-else
                                        :name="`column-${col.name}`"
                                        :value="getItemPropValue(item, col)"
                                        :item="item"
                                        :column="col"
                                    >
                                        {{ getItemPropValue(item, col) }}
                                    </slot>
                                </div>
                            </td>
                        </tr>
                        <slot
                            name="subrow"
                            :item="item"
                            :columns="columns"
                            :visibleColumnsNum="visibleColumnsNum"
                            :ariaRowindex="getAriaRowIndex(index)"
                        ></slot>
                    </template>
                </f-infinite-scroll>

                <tbody v-else-if="!cLoading">
                    <tr>
                        <td :colspan="visibleColumnsNum">
                            <slot name="no-items">
                                <div class="fdatagrid_noitems">{{ _('fdatagrid.noItems') }}</div>
                            </slot>
                        </td>
                    </tr>
                </tbody>
                <tfoot v-if="!infiniteScroll && footerItems.length > 0">
                    <tr v-for="(item, index) in footerItems" :key="`${dTableId}_ft_${index}`" :style="item.css">
                        <td
                            v-for="(col, index) in cColumns"
                            :key="col.name"
                            :hidden="!!col.hidden"
                            :class="getColumnClass(index, col, true)"
                            tabindex="-1"
                        >
                            <div class="fdatagrid_cellin">
                                <!-- @slot Dynamic slot for cells -->
                                <slot
                                    :name="`footercolumn-${col.name}`"
                                    :value="getItemPropValue(item, col)"
                                    :item="item"
                                    :column="col"
                                >
                                    {{ getItemPropValue(item, col) }}
                                </slot>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>

            <slot name="loader" :loading="cLoading">
                <div v-if="!infiniteScroll && cLoading" class="fdatagrid_loader_wrap">
                    <div class="fdatagrid_loader">
                        Loading...
                    </div>
                </div>
            </slot>
        </div>

        <div class="fdatagrid_footer"></div>

        <f-head-style :css="columnsCSS"></f-head-style>
    </div>
</template>

<script>
import './FDataGrid.types.js';
import {
    cloneObject,
    getNestedProp,
    isObjectEmpty,
    obj2css,
    clone,
    getUniqueId,
    isPromise,
    defer,
    objectEquals,
    objectEqualsProp,
} from '../../utils/index.js';
import { findChildrenByName, findComponentById, setIds } from '../../utils/vue-helpers.js';
import { translationsMixin } from '../../mixins/translations.js';
import { breakpointsMixin } from '../../mixins/breakpoints.js';
import FPagination from '../FPagination/FPagination.vue';
import FHeadStyle from '../FHeadStyle/FHeadStyle.vue';
import { findFirstFocusableDescendant, findLastFocusableDescendant, isAriaAction, isKey } from '../../utils/aria.js';
import { getAttr, setAttr } from '../../utils/DOM.js';
import FButton from '../FButton/FButton.vue';
import FSvgIcon from '../FSvgIcon/FSvgIcon.vue';
import IconTrash from '../icons/IconTrash.vue';
import { GridKeyboardNavigation } from '../../utils/GridKeyboardNavigation.js';
import { prevElemsCount } from '../../utils/dom2.js';
import FInfiniteScroll from '../FInfiniteScroll/FInfiniteScroll.vue';
import FDotsLoader from '../FDotsLoader/FDotsLoader.vue';

const HELPER_PROPS_RE = /^_/;

/**
 * FDataGrid displays and processes tabular data
 */
export default {
    name: 'FDataGrid',

    components: { FDotsLoader, FInfiniteScroll, IconTrash, FSvgIcon, FButton, FHeadStyle, FPagination },

    model: {
        prop: 'items',
        event: 'data-change',
    },

    mixins: [translationsMixin, breakpointsMixin],

    props: {
        /**
         * Strategy for handling data items, pagination and sorting
         * `'local'` - use local pagination and sorting, given `items` are final and complete
         * `'remote'` - just fire 'change' event with info about pagination and sorting
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
        /**
         * Array of column descriptions
         *
         * @type {FDataGridColumn[]}
         */
        columns: {
            type: Array,
            required: true,
            default() {
                return [];
            },
        },
        /**
         * Array of table rows. If `items` prop is promise, loading state is set to `true` until promise is resolved/rejected.
         *
         * One item is an object, where keys are column names.
         * Reserved keys are:
         * `css` {object} - style for whole row. Keys are css properties in camel case, values are valid css values.
         * `cssClass` {string|Array|Object} - the class name (or array of class names or object with class names as the keys) that will be applied to the row element
         */
        items: {
            type: [Array, Promise],
            default() {
                return [];
            },
        },
        /**
         * Array of footer rows.
         *
         * One item is an object, where keys are column names.
         * Reserved keys are:
         * `css` {object} - style for whole row. Keys are css properties in camel case, values are valid css values.
         * `cssClass` {string|Array|Object} - the class name (or array of class names or object with class names as the keys) that will be applied to the row element
         */
        footerItems: {
            type: Array,
            default() {
                return [];
            },
        },
        /**
         * To turn on grid editation:
         * 1. a column must have attribute `editable: true`
         * 2. an editor must be specified in a slot with the name #editor-columnname
         * 3. `editMode` prop must be set to:
         * 'row' - whole row is editable
         * 'row-edit' - as 'row' mode plus row can be removed or new one is inserted after last row
         * If `editMode` is 'row' or 'row-edit', `strategy` must be set to 'local' and `usePagination` must be false
         */
        editMode: {
            type: String,
            default: '',
            validator: function(_value) {
                return ['', 'row', 'row-edit'].indexOf(_value) !== -1;
            },
        },
        /**
         * Used in 'row-edit' mode as a data for new/empty row.
         * Must return an object, where keys are column names and values are default values.
         */
        emptyRowValues: {
            type: Function,
            default: null,
        },
        /** Id of `<table>` element */
        tableId: {
            type: String,
            default: '',
        },
        /** Height of data table */
        height: {
            type: String,
            default: 'auto',
        },
        /** Maximal height of data table */
        maxHeight: {
            type: String,
            default: 'auto',
        },
        /** Minimal height of data table */
        minHeight: {
            type: String,
            default: 'auto',
        },
        /** Minimum width for switching to mobile view */
        mobileViewBreakpoint: {
            type: String,
            default: '48em',
        },
        /** Name of filters component in kebab case */
        filtersCompName: {
            type: String,
            default: 'f-filters',
        },
        /** Make table head sticky */
        stickyHead: {
            type: Boolean,
            default: false,
        },
        /** Use f-pagination component */
        usePagination: {
            type: Boolean,
            default: true,
        },
        /** Use f-filters component */
        useFilters: {
            type: Boolean,
            default: false,
        },
        /** Display loading message */
        loading: {
            type: Boolean,
            default: false,
        },
        /** Specifies the delay (in milliseconds) after which a loading message is displayed (if loading state is `true` still) */
        loaderDelay: {
            type: Number,
            default: 0,
        },
        /** If `true`, no line breaks are allowed in table cells */
        oneLineMode: {
            type: Boolean,
            default: false,
        },
        /** If `true`, header will be hidden */
        noHeader: {
            type: Boolean,
            default: false,
        },
        /** Method `isChanged` returns always `false` */
        noChangeCheck: {
            type: Boolean,
            default: true,
        },
        /** Used in 'row-edit' mode. If `false` is set, empty rows after the last filled rows will be removed */
        removeAllEmptyRows: {
            type: Boolean,
            default: true,
        },
        /** Use infinite scrolling  */
        infiniteScroll: {
            type: Boolean,
            default: false,
        },
        /** Selector for root element. Default is document */
        infiniteScrollRoot: {
            type: String,
            default: '',
        },
        /** Margin around the root */
        infiniteScrollRootMargin: {
            type: String,
            default: '',
        },
        /** Label for table */
        label: {
            type: String,
            default: '',
        },
        /** Id (or ids separated by space) of element(s) that represents label for the component */
        labeledBy: {
            type: String,
            default: '',
        },
        /** Table's caption */
        caption: {
            type: String,
            default: '',
        },
        /** Table's caption is hidden */
        captionHidden: {
            type: Boolean,
            default: true,
        },
        /** Total amount of items (FPagination prop) */
        totalItems: { ...FPagination.props.totalItems },
        /** Number of items per page (FPagination prop) */
        perPage: { ...FPagination.props.perPage },
        /** Current page number (FPagination prop) */
        currPage: { ...FPagination.props.currPage },
        /** Type of pagination (FPagination prop) */
        paginationType: { ...FPagination.props.type },
    },

    data() {
        return {
            dItems: [],
            dTableId: this.tableId,
            dLoading: this.loading,
            /** @type {FPaginationState} */
            paginationState: {},
            visibleColumnsNum: 0,
            sortableColumnsNum: 0,
            sortByCol: { _index: -1 },
            columnsCSS: '',
            breakpoints: [],
            /** Render data table in mobile view */
            mobileView: false,
            editedRowId: '',
        };
    },

    computed: {
        /**
         * Calculates max-height of data table.
         */
        cHeight() {
            if (this.maxHeight === 'auto') {
                return '';
            }

            return `max-height: ${this.maxHeight}`;
        },

        cColumns() {
            return this.columns.filter(column => !column.hidden);
        },

        cLoading() {
            return this.dLoading || this.loading;
        },

        sortingState() {
            const column = this.sortByCol._index > -1 ? this.sortByCol : {};

            return { sortBy: column.name, sortDir: column.sortDir };
        },

        ariaRowCount() {
            const { totalItems } = this;

            return this.dItems.length < totalItems ? totalItems : undefined;
            // return this.strategy === 'local' ? undefined : this.totalItems;
        },

        ariaColCount() {
            const columnsLen = this.cColumns.length;

            return this.visibleColumnsNum < columnsLen ? columnsLen : undefined;
        },

        classes() {
            return {
                'fdatagrid-mobileview': this.mobileView,
                'fdatagrid-stickyheader': this.stickyHead,
                'fdatagrid-heightset': this.height !== 'auto' || this.maxHeight !== 'auto',
                'fdatagrid-loading': this.dLoading,
                'fdatagrid-infinitescrollon': this.infiniteScroll,
                'fdatagrid-rowedit': this.editMode === 'row-edit',
                'fdatagrid-noheader': this.noHeader,
            };
        },

        style() {
            return {
                height: this.height !== 'auto' ? this.height : undefined,
                maxHeight: this.maxHeight !== 'auto' ? this.maxHeight : undefined,
                minHeight: this.minHeight !== 'auto' ? this.minHeight : undefined,
            };
        },

        edModeRow() {
            const { editMode } = this;

            return editMode === 'row' || editMode === 'row-edit';
        },

        edModeRowEdit() {
            return this.editMode === 'row-edit';
        },

        editing() {
            return this.editMode !== '' && this.editedRowId !== '';
        },

        checkChange() {
            return !this.noChangeCheck && (this.edModeRow || this.edModeRowEdit);
        },
    },

    watch: {
        items: {
            handler(_value) {
                if (!this._modelChanged) {
                    this.setItems(_value);
                }

                this._modelChanged = false;
            },
            immediate: true,
        },
    },

    created() {
        if (this.mobileViewBreakpoint) {
            this.breakpoints = [{ value: this.mobileViewBreakpoint }];
        }

        this._initialSort = true;
        this._colClassRE = /\s*_c(\d)\s*/;
        this._filtersRef = null;
        this._modelChanged = false;
        this._emptyRow = {};
        this._initItems = [];
        this._editedItem = null;
        this._editedKey = '';
        this._keyboardNav = new GridKeyboardNavigation({
            rowSelector: 'tr',
            // cellSelector: '[tabindex]',
            cellSelector: 'td',
            focusCell: true,
            focusElemInsideCell: true,
            setTabIndex: true,
        });
        this._RCIdxs = null;
        this._reload = false;

        if (!this.tableId) {
            this.dTableId = getUniqueId();
        }

        this.prepareColumns();

        if (this.edModeRow) {
            const listenItemChange = 'item-change' in this.$listeners;

            this.$watch(
                'dItems',
                () => {
                    const { editedRowId } = this;

                    this._modelChanged = true;

                    if (this._editedItem && listenItemChange) {
                        const item = this.dItems.find(item => item._id === editedRowId);

                        if (item) {
                            const ret = objectEqualsProp(this._editedItem, item);

                            if (!ret.equals) {
                                this._editedKey = ret.prop;
                                this._editedItem = clone(item);

                                this.$nextTick(() => {
                                    this.$emit('item-change', {
                                        item: clone(item),
                                        prop: this._editedKey,
                                    });
                                });
                            }
                        }
                    }

                    this.$emit('data-change', this.getItems());
                },
                { deep: true }
            );

            this.$watch('editedRowId', (value, oldValue) => {
                this.hbRowById(value);
                this.hbRowById(oldValue, true);

                if (listenItemChange) {
                    if (value) {
                        this._editedItem = clone(this.dItems.find(item => item._id === value));
                    } else {
                        this._editedItem = null;
                        this._editedKey = '';
                    }
                }
            });
        }
    },

    mounted() {
        if (this.useFilters) {
            const filters = findChildrenByName(this.$children, this.filtersCompName);

            if (filters.length > 0) {
                this._filtersRef = filters[0];
                this._filtersRef.$on('submit', _event => {
                    this.onFiltersChange(_event);
                });
            }
        }
    },

    beforeDestroy() {
        this._filtersRef = null;
        this.stopEditing();
    },

    methods: {
        /**
         * Set items (rows). If pagination is used, return proper slice of items.
         */
        async setItems(_items = this.items) {
            const { strategy } = this;
            let items = [];
            const itemsArePromise = isPromise(_items);
            let pending = false;

            if (itemsArePromise) {
                pending = true;

                // postpone loading notification a bit
                setTimeout(() => {
                    if (pending) {
                        this.dLoading = true;
                    }
                }, this.loaderDelay);

                try {
                    items = clone(await _items);
                    this.dLoading = false;
                    pending = false;
                } catch (_error) {
                    this.dLoading = false;
                    pending = false;
                    throw _error;
                }
            } else {
                items = clone(_items || []);
            }

            if (this.edModeRowEdit) {
                items.push(this.getEmptyRow());
            }

            setIds(items, '_id');

            // console.log(strategy, this.usePagination, itemsIndices);

            if (items && items.length > 0) {
                this.initialSort();
            }

            if (strategy === 'local' && this.usePagination) {
                this.$nextTick(() => {
                    const { itemsIndices } = this.getPaginationState();
                    this.dItems = itemsIndices && items ? items.slice(itemsIndices.from, itemsIndices.to + 1) : [];
                });
            } else if (items) {
                const pState = this.getPaginationState();

                if (this.infiniteScroll && 'currPage' in pState && !this._reload) {
                    if (pState.currPage < pState.prevPage) {
                        this.dItems = items.concat(this.dItems);
                    } else {
                        this.dItems = this.dItems.concat(items);
                    }
                } else {
                    this.dItems = items;
                }

                this._reload = false;
            }

            if (this.checkChange) {
                this.$nextTick(() => {
                    this.refreshInitItems();
                });
            }

            defer(() => {
                const RCIdxs = this._RCIdxs;

                if (RCIdxs && this._keyboardNav) {
                    this._keyboardNav.activateCellByIndices(RCIdxs.rowIdx, RCIdxs.cellIdx, this.$refs.tbody);
                } else if (!this.editMode && !this.$el.querySelector('td[tabindex="0"]')) {
                    const elem = this.$el.querySelector('td[tabindex="-1"]');

                    if (elem) {
                        setAttr(elem, 'tabindex', 0);
                    }
                }
            });
        },

        /**
         * Return cloned and cleaned `this.dItems`
         *
         * @return {Object[]}
         */
        getItems() {
            const items = this.dItems.map(item => {
                return cloneObject(item, HELPER_PROPS_RE);
            });

            for (let i = items.length - 1; i >= 0; i--) {
                if (this.isEmptyRow(items[i])) {
                    items.splice(i, 1);
                } else if (!this.removeAllEmptyRows) {
                    break;
                }
            }

            return items;

            /*return this.dItems.map(item => {
                return cloneObject(item, HELPER_PROPS_RE);
            });*/
        },

        refreshInitItems() {
            this._initItems = this.getItems();
        },

        /**
         * Set columns css, ...
         */
        prepareColumns() {
            // const { columns } = this;
            const columns = this.cColumns;
            const firstCellClass = 'fdatagrid_firstcell';
            const lastCellClass = 'fdatagrid_lastcell';
            let cssStr = '';
            let visibleColumnsNum = 0;
            let sortableColumnsNum = 0;
            let firstVisible = false;

            if (this.edModeRowEdit) {
                if (!columns.find(column => column.name === '__removerow__')) {
                    columns.push({
                        name: '__removerow__',
                        width: '60px',
                    });
                }

                this.prepareEmptyRow();
            }

            columns.forEach((_column, _index) => {
                const css = {};
                const cellChildrenCss = {};

                _column._index = _index;
                if (!_column.cssClass) {
                    _column.cssClass = '';
                }

                if (!('sortable' in _column) && !!_column.sortFunc) {
                    _column.sortable = true;
                }

                if (_column.sortable) {
                    sortableColumnsNum++;
                }

                if (_column.sortDir) {
                    this.sortByCol = clone(_column);
                }

                if (!_column.hidden) {
                    visibleColumnsNum++;

                    if (!firstVisible) {
                        firstVisible = true;

                        if (_column.cssClass.indexOf(firstCellClass) === -1) {
                            _column.cssClass = `${_column.cssClass || ''} ${firstCellClass}`;
                        }
                    }
                }

                if (_column.width) {
                    css.width = _column.width;
                    css.minWidth = css.width;
                } else if (_column.minWidth) {
                    css.minWidth = _column.minWidth;
                }

                if (_column.css) {
                    Object.assign(css, _column.css);
                }

                if (_column.cellChildrenCss) {
                    Object.assign(cellChildrenCss, _column.cellChildrenCss);
                }

                if (this.oneLineMode || _column.oneLineMode) {
                    const threeDots = {
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    };

                    Object.assign(cellChildrenCss, threeDots);
                    // Object.assign(cellChildrenCss, threeDots);
                }

                if (!isObjectEmpty(css)) {
                    cssStr += `#${this.dTableId} .${this.getColumnClass(_index)} {${obj2css(css)}}`;
                }

                if (!isObjectEmpty(cellChildrenCss)) {
                    cssStr += `#${this.dTableId} .${this.getColumnClass(_index)} > * {${obj2css(cellChildrenCss)}}`;
                }
            });

            for (let i = columns.length - 1; i >= 0; i--) {
                if (!columns[i].hidden) {
                    columns[i].cssClass = `${columns[i].cssClass || ''} ${lastCellClass}`;
                    break;
                }
            }

            if (cssStr) {
                this.columnsCSS = cssStr;
            }

            if (visibleColumnsNum > 0) {
                this.visibleColumnsNum = visibleColumnsNum;
            }

            if (sortableColumnsNum > 0) {
                this.sortableColumnsNum = sortableColumnsNum;
            }
        },

        /**
         * Get column's css class.
         *
         * @param {int} _index
         * @param {FDataGridColumn} [_column]
         * @param {boolean} [_headerCell]
         * @return {string}
         */
        getColumnClass(_index, _column, _headerCell) {
            let clas = `_c${_index}`;

            if (_column) {
                if (_column.editable && !_headerCell) {
                    clas += ' fdatagrid_cell-editable';
                }

                if (_column.cssClass) {
                    clas += ` ${_column.cssClass}`;
                }
            }

            return clas;
        },

        /**
         * Get column's `aria-sort` attribute.
         *
         * @param {FDataGridColumn} [_column]
         * @return {string|undefined}
         */
        getAriaSort(_column) {
            let sortDir = '';

            if (_column.sortDir) {
                sortDir = _column.sortDir === 'asc' ? 'ascending' : 'descending';
            }

            return _column.sortable ? sortDir || 'none' : undefined;
        },

        /**
         * Get heading column's css classes.
         *
         * @param {object} [_column]
         * @return {string}
         */
        getHeadingColumnClass(_column) {
            if (_column.sortable) {
                return `fdatagrid_thead_sortablecol ${_column.sortDir || ''}`;
            }

            return '';
        },

        /**
         * Get column by its css class.
         *
         * @param {string} _class
         * @return {FDataGridColumn|null}
         */
        getColumnByClass(_class) {
            const match = this._colClassRE.exec(_class);
            let column = null;

            if (match && match.length === 2) {
                column = this.cColumns[parseInt(match[1])] || null;
            }

            return column;
        },

        /**
         * @param {Event} event
         * @param {string} [selector]
         * @return {{column: FDataGridColumn|null, elem: HTMLElement|null}}
         */
        getCellByEvent(event, selector = 'td') {
            const elem = event.target.closest(selector);
            const cell = {
                column: null,
                elem: null,
            };

            if (elem) {
                cell.column = this.getColumnByClass(elem.className);
                cell.elem = elem;
            }

            return cell;
        },

        /**
         * Get data item value.
         *
         * @param {object} _item
         * @param {object} _col
         * @return {*}
         */
        getItemPropValue(_item, _col) {
            let value;

            if (_col.itemProp) {
                value = getNestedProp(_item, _col.itemProp);
            } else if (_col.readValueFrom) {
                value = _item[_col.readValueFrom];
            } else {
                value = _item[_col.name];
            }

            if (_col.formatter && !_col.hidden) {
                value = _col.formatter(value, _item);
            }

            return value;
        },

        prepareEmptyRow() {
            const { cColumns } = this;

            cColumns.forEach(column => {
                if (column.name !== '__removerow__') {
                    this._emptyRow[column.name] = '';
                }
            });
        },

        isCellEditorOn(item, col) {
            return col.editable && item._id === this.editedRowId;
        },

        initialSort() {
            if (this._initialSort) {
                this._initialSort = false;

                if (this.strategy === 'local') {
                    setTimeout(() => {
                        if (this.sortByCol._index > -1) {
                            const column = this.cColumns[this.sortByCol._index];
                            this.sortByColumn(column, column.sortDir);
                        }
                    }, 10);
                }
            }
        },

        /**
         * Sort table by column.
         *
         * @param {Object} _column
         * @param {String} [_sortDir] 'asc'|'desc'
         */
        async sortByColumn(_column, _sortDir) {
            const { strategy } = this;
            const pagination = this.getPaginationRef();

            if (_column && _column.sortable) {
                const sortByCol = this.sortByCol;

                if (sortByCol._index > -1 && sortByCol._index !== _column._index) {
                    this.cColumns[sortByCol._index].sortDir = '';
                }

                if (_sortDir) {
                    _column.sortDir = _sortDir;
                } else {
                    // default sort on column header click is 'desc'
                    if (_column.sortDir === 'desc') {
                        _column.sortDir = 'asc';
                    } else {
                        _column.sortDir = 'desc';
                    }
                }

                this.sortByCol = clone(_column);

                if (pagination) {
                    pagination.goToPage(1);
                }

                this.emitChangeEvent('sorting');

                if (strategy === 'local') {
                    if (_column.sortFunc) {
                        if (isPromise(this.items)) {
                            /** @type {Array} */
                            const items = await this.items;
                            items.sort(_column.sortFunc(_column.itemProp || _column.name, _column.sortDir));
                            this.setItems(items);
                        } else {
                            this.items.sort(_column.sortFunc(_column.itemProp || _column.name, _column.sortDir));
                        }
                    }
                }
            }
        },

        /**
         * Sort table by column.
         *
         * @param {number} _columnIndex
         */
        sortByColumnIndex(_columnIndex) {
            const column = this.cColumns[_columnIndex];

            if (column) {
                this.sortByColumn(column, column.sortDir);
            }
        },

        emitChangeEvent(_type, _data = {}) {
            if (_type === 'reload') {
                this._reload = true;
            }

            this.$emit('change', {
                type: _type,
                filters: this.getFilters(),
                ...this.getPaginationState(),
                ...this.sortingState,
                ..._data,
            });
        },

        getPaginationState() {
            /*if (this.infiniteScroll) {
                return this.$refs.tbody.getPaginationState();
            }*/
            const pagination = this.getPaginationRef();

            return pagination ? pagination.state : this.paginationState;
        },

        getFilters() {
            return this._filtersRef
                ? { values: this._filtersRef.getValues(), lastChangedElement: this._filtersRef.getLastChangedElement() }
                : {};
        },

        isChanged() {
            return this.noChangeCheck || !(this.edModeRow || this.edModeRowEdit)
                ? false
                : !objectEquals(this._initItems, this.getItems());
        },

        reload() {
            this.emitChangeEvent('reload');
        },

        getEmptyRowValues() {
            if (typeof this.emptyRowValues === 'function') {
                return this.emptyRowValues();
            }

            return clone(this._emptyRow);
        },

        getEmptyRow() {
            return {
                _id: getUniqueId(),
                ...this.getEmptyRowValues(),
            };
        },

        isEmptyRow(item) {
            return objectEquals(item, this.getEmptyRowValues());
        },

        /**
         * Add empty rows at the end.
         *
         * @param {int} numRows
         */
        addEmptyRow(numRows = 1) {
            for (let i = 0; i < numRows; i++) {
                this.dItems.push(this.getEmptyRow());
            }
        },

        /**
         * @param {object} _data
         * @param {string|number} _value
         * @param {string} [_key]
         * @return {boolean} `true` if item was found.
         */
        updateRowBy(_data, _value, _key = 'id') {
            const idx = this.dItems.findIndex(_item => _item[_key] == _value);

            if (idx > -1) {
                const item = clone(_data);

                item._id = getUniqueId();

                this.$set(this.dItems, idx, item);

                return true;
            }

            return false;
        },

        /**
         * @param {string|number} _value
         * @param {string} [_key]
         * @return {number} Number of items left.
         */
        removeRowBy(_value, _key = 'id') {
            const idx = this.dItems.findIndex(_item => _item[_key] == _value);

            if (idx > -1) {
                this.dItems.splice(idx, 1);
            }

            return this.dItems.length;
        },

        /**
         * @param {*} _data
         * @param {string} _colName
         * @param {string|number} _value
         * @param {string} [_key]
         * @return {boolean}
         */
        updateCellBy(_data, _colName, _value, _key = 'id') {
            const idx = this.dItems.findIndex(_item => _item[_key] == _value);

            if (idx > -1) {
                this.$set(this.dItems[idx], _colName, clone(_data));

                return true;
            }

            return false;
        },

        /**
         * @param {string|int} index Index into `this.dItems` or string 'next' (next row) or 'prev' (previous row)
         * @param {boolean} [activateFirstCell]
         */
        editRow(index, activateFirstCell) {
            const { editedRowId } = this;
            let idx = typeof index === 'number' ? index : -1;

            if (index === 'next' || index === 'prev') {
                idx = this.dItems.findIndex(item => item._id === editedRowId);

                if (index === 'next') {
                    if (idx + 1 < this.dItems.length) {
                        idx += 1;
                    }
                } else {
                    if (idx - 1 >= 0) {
                        idx -= 1;
                    }
                }
            }

            if (idx > -1) {
                if (this.edModeRowEdit && idx === this.dItems.length - 1) {
                    this.addEmptyRow();
                }

                this.editedRowId = this.dItems[idx]._id;

                if (activateFirstCell) {
                    this.$nextTick(() => {
                        this.activateCell(this.cColumns.find(column => column.editable));
                    });
                }
            }
        },

        /**
         * @param {FDataGridColumn} column
         * @param {HTMLElement} [cellElem]
         */
        activateCell(column, cellElem) {
            if (column && column.editable) {
                let eCell = cellElem;

                if (!eCell) {
                    const eRow = this.getRowElemById(this.editedRowId);

                    if (eRow) {
                        eCell = eRow.querySelector(`._c${column._index}`);
                    }
                }

                if (eCell) {
                    const elem = eCell.querySelector('[id]');

                    if (elem) {
                        const id = getAttr(elem, 'id');

                        if (id) {
                            const comp = findComponentById(this, id);

                            if (comp && typeof comp.activate === 'function') {
                                comp.activate();
                            }
                        }
                    }
                }
            }
        },

        /**
         * @param {boolean} [blurActiveElement]
         */
        stopEditing(blurActiveElement = false) {
            if (blurActiveElement) {
                const { activeElement } = document;

                if (activeElement && typeof activeElement.blur === 'function') {
                    activeElement.blur();
                }
            }

            this.editedRowId = '';
            this._editedItem = null;
            this._editedKey = '';
        },

        /**
         * @param {string} id
         * @return {HTMLElement|null}
         */
        getRowElemById(id) {
            return this.$el.querySelector(`[data-fdg-id="${id}"]`);
        },

        /**
         * @param {number} rowIndex
         * @return {number}
         */
        getAriaRowIndex(rowIndex) {
            const pagination = this.getPaginationRef();

            if (pagination) {
                return pagination.itemsIndices.from + rowIndex + 1;
            }

            return rowIndex + 1;
        },

        /**
         * Highlight or background row by id
         *
         * @param {string} id
         * @param {boolean} [background]
         */
        hbRowById(id, background = false) {
            const eRow = this.getRowElemById(id);
            const highlightClass = 'fdatagrid_row-active';

            if (eRow) {
                if (!background) {
                    eRow.classList.add(highlightClass);
                } else {
                    eRow.classList.remove(highlightClass);
                }
            }
        },

        /**
         * Event target is the last focusable element on the row.
         *
         * @param {Event} event
         * @param {string} [selector]
         * @return {boolean}
         */
        isLastFocusableElement(event, selector = 'tr') {
            const eRow = event.target.closest(selector);

            if (eRow) {
                const eLastFocused = findLastFocusableDescendant(eRow);

                if (event.target === eLastFocused) {
                    return true;
                }
            }

            return false;
        },

        /**
         * Event target is the first focusable element on the row.
         *
         * @param {Event} event
         * @param {string} [selector]
         * @return {boolean}
         */
        isFirstFocusableElement(event, selector = 'tr') {
            const eRow = event.target.closest(selector);

            if (eRow) {
                const eFirstFocused = findFirstFocusableDescendant(eRow);

                if (event.target === eFirstFocused) {
                    return true;
                }
            }

            return false;
        },

        getPaginationRef() {
            const { $refs } = this;

            return this.infiniteScroll && $refs.tbody ? $refs.tbody.getPagination() : $refs.pagination;
        },

        clearItems() {
            this.dItems = [];
        },

        /**
         * @param {number} pageNum
         */
        goToPageNum(pageNum) {
            const pagination = this.infiniteScroll ? this.$refs.tbody : this.$refs.pagination;

            if (pagination) {
                this.paginationState = {};
                this.clearItems();

                this.$nextTick(() => {
                    pagination.goToPage(pageNum);
                });
            }
        },

        goToPage({ direction = 'next', column = 'keep', navInfo, event }) {
            const pagination = this.getPaginationRef();
            const eTbody = this.$refs.tbody;
            const keyboardNav = this._keyboardNav;
            let rowIdx = direction === 'next' ? 'first' : 'last';
            const cellIdx = column === 'keep' ? prevElemsCount(navInfo.cell) + 1 : column;
            let activateCell = false;

            // console.log('go to page:', direction, rowIdx, cellIdx, navInfo);

            if (pagination) {
                if (direction === 'prev') {
                    if (!pagination.state.isFirstPage) {
                        pagination.goToPage('prev');
                        event.preventDefault();
                    } else {
                        rowIdx = 'first';
                        activateCell = true;
                    }
                } else {
                    if (!pagination.state.isLastPage) {
                        pagination.goToPage('next');
                        event.preventDefault();
                    } else {
                        rowIdx = 'last';
                        activateCell = true;
                    }
                }

                if (
                    !(
                        (pagination.state.isFirstPage &&
                            direction === 'prev' &&
                            rowIdx === 'first' &&
                            cellIdx === 'last') ||
                        (pagination.state.isLastPage &&
                            direction === 'next' &&
                            rowIdx === 'last' &&
                            cellIdx === 'first')
                    )
                ) {
                    if (this.strategy === 'local' || activateCell) {
                        defer(() => {
                            keyboardNav.activateCellByIndices(rowIdx, cellIdx, eTbody);
                        });
                    } else {
                        // save indices for later
                        this._RCIdxs = { rowIdx, cellIdx };
                    }
                }
            }
        },

        /**
         * @param {Event} _event
         */
        onHeaderClick(_event) {
            this.sortByColumn(this.getCellByEvent(_event, 'th').column);
        },

        /**
         * @param {Event} _event
         */
        onHeaderKeyup(_event) {
            if (isAriaAction(_event)) {
                this.onHeaderClick(_event);
            }
        },

        /**
         * @param {Event} _event
         */
        onTableClick(_event) {
            /** @type {HTMLElement} */
            const elem = _event.target.closest('[data-fdg-id]');

            if (elem) {
                const id = elem.getAttribute('data-fdg-id');
                const idx = this.dItems.findIndex(_item => _item._id == id);

                if (idx > -1) {
                    this.onRowClick(elem, this.dItems[idx], idx, _event);
                }
            }
        },

        /**
         * @param {HTMLElement} eRow
         * @param {Object} item
         * @param {int} rowIndex
         * @param {Event} event
         */
        onRowClick(eRow, item, rowIndex, event) {
            const cell = this.getCellByEvent(event);

            this.$emit('row-click', { ...item }, event);

            if (this.edModeRow) {
                // remove row
                if (this.edModeRowEdit && event.target.closest('[data-removerow]')) {
                    const { dItems } = this;

                    this.stopEditing();

                    dItems.splice(rowIndex, 1);

                    if (dItems.length === 0) {
                        this.addEmptyRow();
                    }

                    /*if (this.editedRowId === id) {
                        this.editRow(rowIndex, true);
                    }*/

                    return;
                }

                if (this.editedRowId !== item._id) {
                    this.editRow(rowIndex, cell.elem && !cell.column.editable);
                }
            }

            if (cell.elem && cell.column) {
                this.onCellClick(cell, item, event);
            }
        },

        onCellClick(cell) {
            if (this.edModeRow) {
                this.$nextTick(() => {
                    this.activateCell(cell.column, cell.elem);
                });
            }
        },

        /**
         * @param {KeyboardEvent} event
         */
        onTableKeydown(event) {
            if (this.edModeRow) {
                if (isKey('Shift+Tab', event)) {
                    if (this.isFirstFocusableElement(event)) {
                        // event.preventDefault();
                        this.editRow('prev');
                    }
                } else if (isKey('Tab', event)) {
                    if (this.isLastFocusableElement(event)) {
                        // event.preventDefault();
                        this.editRow('next');
                    }
                } else if (isKey('Escape', event)) {
                    this.stopEditing(true);
                }
            } else {
                const info = this._keyboardNav.navigate(event, true);

                if (info.cell) {
                    if (info.isFirstRow || info.isFirstCell) {
                        this.goToPage({
                            direction: 'prev',
                            column: info.isFirstCell ? 'last' : 'keep',
                            navInfo: info,
                            event,
                        });
                    } else if (info.isLastRow || info.isLastCell) {
                        this.goToPage({
                            direction: 'next',
                            column: info.isLastCell ? 'first' : 'keep',
                            navInfo: info,
                            event,
                        });
                    } else if (isKey('PageDown', event)) {
                        this.goToPage({
                            direction: 'next',
                            column: 'keep',
                            navInfo: info,
                            event,
                        });
                    } else if (isKey('PageUp', event)) {
                        this.goToPage({
                            direction: 'prev',
                            column: 'keep',
                            navInfo: info,
                            event,
                        });
                    }
                }
            }
        },

        /**
         * @param {FocusEvent} event
         */
        onTableFocus() {
            const { dItems } = this;

            // if ((this.edModeRowEdit || this.edModeRow) && dItems.length > 0 && !this.editing && event.relatedTarget) {
            if ((this.edModeRowEdit || this.edModeRow) && dItems.length > 0 && !this.editing) {
                this.editRow(0, true);
            }
        },

        onTableFocusout() {
            if (this.editMode) {
                defer(() => {
                    const { activeElement } = document;

                    if (activeElement && activeElement.closest(`#${this.dTableId}`) === null) {
                        this.stopEditing();
                    }
                });
            }
        },

        /**
         * Triggered on `FPagination`'s `'page-change'` event.
         *
         * @param {FPaginationState} _state
         */
        onPageChange(_state) {
            const initialChange = isObjectEmpty(this.paginationState);

            this.paginationState = cloneObject(_state);

            if (this.strategy === 'local') {
                this.setItems();
            }

            if (!initialChange || this.infiniteScroll) {
                this.emitChangeEvent('pagination');

                /**
                 * Passthrough event
                 *
                 * @property {FPaginationState} state
                 */
                this.$emit('page-change', _state);
            }
        },

        onFiltersChange() {
            const pagination = this.getPaginationRef();

            if (pagination) {
                pagination.goToPage(1);
            }

            this.emitChangeEvent('filters');
        },

        /**
         * @param {{code: string, media: string, value: string, matches: []}} _breakpoint
         */
        onBreakpointChange(_breakpoint) {
            this.mobileView = _breakpoint.matches;
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
