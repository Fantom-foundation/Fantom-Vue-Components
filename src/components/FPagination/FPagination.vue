<template>
    <div class="fpagination" @click="onClick" :class="classes">
        <ul class="fpagination_body" :aria-label="ariaLabel || _('fpagination.paginationNavigation')">
            <li v-if="!hideFirstLast" data-item-type="first" class="fpagination_item">
                <!--
                    @slot Slot for buttons
                    @binding {string} label
                    @binding {string} title
                    @binding {boolean} disabled
                    @binding {('first'|'prev'|'next'|'last')} type
                -->
                <slot
                    name="button"
                    v-bind="{
                        label: firstLabel,
                        title: _('fpagination.firstPage'),
                        disabled: disablePrevBtns || disabled,
                        type: 'first',
                    }"
                >
                    <f-button
                        secondary
                        round
                        :label="firstLabel"
                        :disabled="disablePrevBtns || disabled"
                        :title="_('fpagination.firstPage')"
                    />
                </slot>
            </li>
            <li v-if="!hidePrevNext" data-item-type="prev" class="fpagination_item">
                <slot
                    name="button"
                    v-bind="{
                        label: prevLabel,
                        title: _('fpagination.prevPage'),
                        disabled: disablePrevBtns || disabled,
                        type: 'prev',
                    }"
                >
                    <f-button
                        secondary
                        round
                        :label="prevLabel"
                        :disabled="disablePrevBtns || disabled"
                        :title="_('fpagination.prevPage')"
                    />
                </slot>
            </li>
            <li class="fpagination_pages">
                <!--
                    @slot Pages info slot
                    @binding {FPaginationState} state
                -->
                <slot name="pages" v-bind="{ ...state }">
                    <span v-if="disablePrevBtns && disableNextBtns">-</span>
                    <span v-else-if="type === 'xofy'" :title="getRangeLabel()">
                        <span class="fpagination_pages_curr">{{ dCurrPage }}</span>
                        {{ _('fpagination.of') }} {{ numPages }}
                    </span>
                    <span v-else-if="type === 'range'" :title="getXOfYLabel()">
                        <span class="fpagination_pages_curr">
                            {{ itemsIndices.from + 1 }}-{{ itemsIndices.to + 1 }} </span
                        >/ {{ totalItems }}
                    </span>
                </slot>
            </li>
            <li v-if="!hidePrevNext" data-item-type="next" class="fpagination_item">
                <slot
                    name="button"
                    v-bind="{
                        label: nextLabel,
                        title: _('fpagination.nextPage'),
                        disabled: disableNextBtns || disabled,
                        type: 'next',
                    }"
                >
                    <f-button
                        secondary
                        round
                        :label="nextLabel"
                        :disabled="disableNextBtns || disabled"
                        :title="_('fpagination.nextPage')"
                    />
                </slot>
            </li>
            <li v-if="!hideFirstLast" data-item-type="last" class="fpagination_item">
                <slot
                    name="button"
                    v-bind="{
                        label: lastLabel,
                        title: _('fpagination.lastPage'),
                        disabled: disableNextBtns || disabled,
                        type: 'last',
                    }"
                >
                    <f-button
                        secondary
                        round
                        :label="lastLabel"
                        :disabled="disableNextBtns || disabled"
                        :title="_('fpagination.lastPage')"
                    />
                </slot>
            </li>
        </ul>
    </div>
</template>

<script>
import './FPagination.types.js';
import FButton from '../FButton/FButton.vue';
import { translationsMixin } from '../../mixins/translations.js';
import { getAttr } from '../../utils/DOM.js';

/**
 * Component for displaying various pagination
 */
export default {
    name: 'FPagination',

    components: { FButton },

    model: {
        prop: 'currPage',
        event: 'change',
    },

    mixins: [translationsMixin],

    props: {
        /**
         * Type of pagination
         * `'xofy'` - displays pages as `currPage/numPages`
         * `'range'` - displays pages as `from-to/totalItems`
         *
         * @type {('xofy' | 'range')}
         */
        type: {
            type: String,
            default: 'xofy',
            validator: function(_value) {
                return ['xofy', 'range'].indexOf(_value) !== -1;
            },
        },
        /** Total amount of items */
        totalItems: {
            type: Number,
            default: 0,
        },
        /** Number of items per page */
        perPage: {
            type: Number,
            default: 20,
        },
        /** Current page number */
        currPage: {
            type: Number,
            default: 1,
        },
        /** Pagination's aria-label */
        ariaLabel: {
            type: String,
            default: '',
        },
        /** First button label */
        firstLabel: {
            type: String,
            default: '«',
        },
        /** Last button label */
        lastLabel: {
            type: String,
            default: '»',
        },
        /** Previous button label */
        prevLabel: {
            type: String,
            default: '‹',
        },
        /** Next button label */
        nextLabel: {
            type: String,
            default: '›',
        },
        /** If set the pagination will be disabled */
        disabled: {
            type: Boolean,
            default: false,
        },
        /** Hide previous and next buttons */
        hidePrevNext: {
            type: Boolean,
            default: false,
        },
        /** Hide first and last buttons */
        hideFirstLast: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            /** Current page index. */
            dCurrPage: this.currPage,
        };
    },

    computed: {
        /**
         * @return {FPaginationState}
         */
        state() {
            return {
                totalItems: this.totalItems,
                perPage: this.perPage,
                currPage: this.dCurrPage,
                numPages: this.numPages,
                itemsIndices: this.itemsIndices,
            };
        },

        /**
         * Returns number of pages.
         *
         * @return {int}
         */
        numPages() {
            return Math.max(Math.ceil(this.totalItems / this.perPage), 1);
        },

        /**
         * Indices of items of current page
         *
         * @return {{from: number, to: number}}
         */
        itemsIndices() {
            const to = this.dCurrPage * this.perPage - 1;

            return {
                from: (this.dCurrPage - 1) * this.perPage,
                to: to > this.totalItems ? this.totalItems - 1 : to,
            };
        },

        /**
         * @return {boolean}
         */
        disablePrevBtns() {
            return this.dCurrPage <= 1;
        },

        /**
         * @return {boolean}
         */
        disableNextBtns() {
            return this.dCurrPage >= this.numPages;
        },

        classes() {
            return {
                'fpagination-disabled': this.disabled,
            };
        },
    },

    watch: {
        currPage: {
            handler(_value) {
                let value = parseInt(_value);

                if (isNaN(value) || value < 1) {
                    value = 1;
                } else if (value > this.numPages) {
                    value = this.numPages;
                }

                this.dCurrPage = value;
                this.goToPage(this.dCurrPage);
            },
            immediate: true,
        },
    },

    methods: {
        /**
         * @param {int} _pageNum
         */
        goToPage(_pageNum) {
            if (this.disabled) {
                return;
            }

            this.dCurrPage = Math.min(Math.max(_pageNum, 1), this.numPages);

            /**
             * Triggers when the page changes
             *
             * @property {FPaginationState} state
             */
            this.$emit('page-change', this.state);
            /**
             * Passthrough change event
             *
             * @property {number} currPage
             */
            this.$emit('change', this.dCurrPage);
        },

        /**
         * @return {string}
         */
        getXOfYLabel() {
            return `${this._('fpagination.page')} ${this.dCurrPage} ${this._('fpagination.of')} ${this.numPages}`;
        },

        /**
         * @return {string}
         */
        getRangeLabel() {
            return `${this.itemsIndices.from + 1}-${this.itemsIndices.to + 1}/${this.totalItems}`;
        },

        /**
         * @param {Event} _event
         */
        onClick(_event) {
            const itemType = getAttr(_event.target.closest('li'), 'data-item-type');

            if (itemType === 'next') {
                this.goToPage(this.dCurrPage + 1);
            } else if (itemType === 'prev') {
                this.goToPage(this.dCurrPage - 1);
            } else if (itemType === 'last') {
                this.goToPage(this.numPages);
            } else if (itemType === 'first') {
                this.goToPage(1);
            }
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
