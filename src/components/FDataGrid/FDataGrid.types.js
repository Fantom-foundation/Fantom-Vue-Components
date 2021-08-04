/**
 * FDataGrid's column object
 * @typedef {Object} FDataGridColumn
 * @property {string} name Unique name of the column (required). Can be used as a data item property
 * @property {string} label Label of the column placed in the header of the table
 * @property {string} width Minimum width of the column
 * @property {string} itemProp Can be used to get data from nested data item property - `'prop1.prop2'` for example
 * @property {string} readValueFrom If there is no key `name` in data item object, read value from column with name `value`
 * @property {string} cssClass CSS class to be added to column
 * @property {function} formatter Apply this formatter to data item value
 * @property {function} sortFunc Function used for sorting
 * @property {('asc'|'desc')} sortDir Initial sort direction of the column
 * @property {string} sortItemProp Determines which item property to use for sorting. If not set, `itemProp` or `name` is used instead
 * @property {Object} css Style for whole column. Keys are css properties in camel case, values are valid css values
 * @property {Object} cellChildrenCss Style for column cells direct children. Keys are css properties in camel case, values are valid css values
 * @property {boolean} sortable Specifies if column will be sortable
 * @property {boolean} editable Specifies if column will be editable
 * @property {boolean} hidden Specifies if column will be hidden
 * @property {boolean} oneLineMode Specifies if line breaks are allowed in column's cells
 */
