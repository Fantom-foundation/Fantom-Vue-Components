/**
 * Pagination state object
 * @typedef {Object} FPaginationState
 * @property {number} totalItems Total amount of items
 * @property {number} perPage Number of items per page
 * @property {number} currPage Current page (<1, n>)
 * @property {boolean} isFirstPage Specifies if current page is the first page
 * @property {boolean} isLastPage Specifies if current page is the last page
 * @property {number} numPages Amount of pages
 * @property {{from: number, to: number}} itemsIndices Indices of items of current page
 */
