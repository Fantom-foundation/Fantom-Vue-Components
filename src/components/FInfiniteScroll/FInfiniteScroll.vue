<template>
    <div class="finfinitescroll">
        <f-intersection-observer
            v-show="showTopLoader"
            :root="root"
            :root-margin="rootMargin"
            :ignore-first-entry="ignoreFirstEntry"
            @entry="onTopLoaderEntry"
        >
            <slot name="loader">
                <div class="finfinitescroll_loader"><f-dots-loader /></div>
            </slot>
        </f-intersection-observer>

        <slot></slot>

        <f-intersection-observer
            v-show="showBottomLoader"
            :root="root"
            :root-margin="rootMargin"
            :ignore-first-entry="ignoreFirstEntry"
            @entry="onBottomLoaderEntry"
        >
            <slot name="loader">
                <div class="finfinitescroll_loader"><f-dots-loader /></div>
            </slot>
        </f-intersection-observer>

        <f-pagination
            ref="pagination"
            :total-items="dTotalItems"
            :per-page="perPage"
            :curr-page="currPage"
            @page-change="onPageChange"
            style="display: none"
            hidden
        />
    </div>
</template>

<script>
import FIntersectionObserver from '../FIntersectionObserver/FIntersectionObserver.vue';
import FDotsLoader from '../FDotsLoader/FDotsLoader.vue';
import FPagination from '../FPagination/FPagination.vue';
import { clone, defer } from '../../utils/index.js';

export default {
    name: 'FInfiniteScroll',

    components: { FPagination, FDotsLoader, FIntersectionObserver },

    props: {
        loading: {
            type: Boolean,
            default: false,
        },
        ignoreFirstPageChange: {
            type: Boolean,
            default: false,
        },
        /** Total amount of items (FPagination prop) */
        totalItems: { ...FPagination.props.totalItems },
        /** Number of items per page (FPagination prop) */
        perPage: { ...FPagination.props.perPage },
        /** Current page number (FPagination prop) */
        currPage: { ...FPagination.props.currPage },
        ...FIntersectionObserver.props,
    },

    data() {
        return {
            pagination: {},
            firstPage: false,
            topIntersection: false,
            bottomIntersection: false,
            prevScrollHeight: 0,
            lastTopPage: this.currPage,
            lastBottomPage: this.currPage,
            eRoot: null,
            firstChange: true,
            dTotalItems: this.totalItems,
            dIgnoreFirstPageChange: this.ignoreFirstPageChange,
        };
    },

    computed: {
        showTopLoader() {
            return !this.firstChange && !(this.firstPage && !this.loading) && !this.bottomIntersection;
        },

        showBottomLoader() {
            let pagination = this.getPaginationState();

            if (pagination.numPages === undefined) {
                pagination = this.pagination;
            }

            return !((pagination.isLastPage || this.lastBottomPage >= pagination.numPages) && !this.loading);
        },
    },

    watch: {
        loading(value) {
            if (!value) {
                if (this.topIntersection) {
                    defer(() => {
                        this.scrollTo(this.eRoot.scrollHeight - this.prevScrollHeight);
                    });
                }

                defer(() => {
                    defer(() => {
                        if (this.bottomIntersection && this.showBottomLoader) {
                            this.goToPage('next');
                        }
                    });
                });
            } else {
                this.prevScrollHeight = this.eRoot.scrollHeight;
            }
        },

        totalItems(value) {
            this.dTotalItems = value;
        },
    },

    mounted() {
        this.eRoot = this.root ? document.querySelector(this.root) : document.documentElement;

        if (!this.eRoot) {
            throw new Error("Can't find root element");
        }

        this.setScrollTop();
    },

    methods: {
        /**
         * @param {number|'next'|'prev'} page
         */
        goToPage(page) {
            const { pagination } = this.$refs;
            let p = 0;

            if (typeof page === 'number') {
                this.lastTopPage = page;
                this.lastBottomPage = page;
                p = page;
            } else if (page === 'next') {
                this.lastBottomPage += 1;
                p = this.lastBottomPage;
            } else {
                // prev
                this.lastTopPage -= 1;
                p = this.lastTopPage;
            }

            if (pagination) {
                pagination.goToPage(p);
            }
        },

        getPaginationState() {
            const { pagination } = this.$refs;

            if (pagination) {
                return pagination.state;
            }

            return {};
        },

        /**
         * @param {number} scrollTop
         */
        scrollTo(scrollTop) {
            this.eRoot.scrollTop = scrollTop;
        },

        setScrollTop() {
            this.prevScrollHeight = this.eRoot.scrollHeight;
        },

        /**
         * Triggered on `FPagination`'s `'page-change'` event.
         *
         * @param {FPaginationState} state
         */
        onPageChange(state) {
            const pagination = clone(state);

            if (pagination.totalItems <= 0) {
                return;
            }

            if (!this.firstPage && (pagination.isFirstPage || pagination.prevPage === 1)) {
                this.firstPage = true;
            }

            if (!this.dIgnoreFirstPageChange) {
                this.pagination = pagination;

                if (this.firstChange) {
                    this.firstChange = false;
                }

                this.$emit('page-change', { ...pagination });
            } else {
                this.dIgnoreFirstPageChange = false;
            }
        },

        onTopLoaderEntry(entry) {
            this.topIntersection = entry.isIntersecting;

            if (!this.loading && this.topIntersection) {
                this.goToPage('prev');
            }
        },

        onBottomLoaderEntry(entry) {
            this.bottomIntersection = entry.isIntersecting;

            if (!this.loading && this.bottomIntersection) {
                this.goToPage('next');
            }
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
