import { findFirstFocusableDescendant, isKey } from './aria.js';
import { prevElemsCount } from '../utils/dom2.js';

const KEY_EVENTS = {
    keyup: null,
    keydown: null,
};

/**
 * Class for operating movement in the grid using the arrow keys
 */
export class GridKeyboardNavigation {
    constructor({
        rowSelector = '',
        cellSelector = '',
        activeRowClass = 'activerow',
        activeCellClass = 'activecell',
        focusCell = false,
        focusElemInsideCell = false,
        setTabIndex = false,
        useHomeEndKeys = true,
        // circular = false,
    } = {}) {
        this.rowSelector = rowSelector;
        this.cellSelector = cellSelector;
        this.activeRowClass = activeRowClass;
        this.activeCellClass = activeCellClass;
        this.focusCell = focusCell;
        this.focusElemInsideCell = focusElemInsideCell;
        this.setTabIndex = setTabIndex;
        this.useHomeEndKeys = useHomeEndKeys;

        if (!rowSelector || !cellSelector) {
            throw new Error('`Selector(s) is not specified');
        }
    }

    /**
     *
     * @param {KeyboardEvent} event
     * @returns {{isLastCell: boolean, isFirstRow: boolean, isLastRow: boolean, row: Element|null, isFirstCell: boolean, cell: Element|null}|null}
     */
    navigate(event) {
        if (!event || !(event.type in KEY_EVENTS)) {
            return null;
        }

        const { cellSelector } = this;
        const { rowSelector } = this;
        let eCell = event.target.closest(cellSelector);
        let eRow = eCell ? eCell.closest(rowSelector) : null;
        // let elem = null;
        let move = '';
        let isFirstCell = false;
        let isLastCell = false;
        let isFirstRow = false;
        let isLastRow = false;
        let hElem = null;

        if (eRow && eCell) {
            if (isKey('ArrowRight', event)) {
                move = 'next';
            } else if (isKey('ArrowDown', event)) {
                move = 'down';
            } else if (isKey('ArrowLeft', event)) {
                move = 'prev';
            } else if (isKey('ArrowUp', event)) {
                move = 'up';
            }

            if (move === 'next') {
                // move focus to the next cell

                hElem = eCell;

                eCell = eCell.nextElementSibling;
                while (eCell && !eCell.matches(cellSelector)) {
                    eCell = eCell.nextElementSibling;
                }

                if (eCell === null) {
                    if (eRow.nextElementSibling) {
                        eRow = eRow.nextElementSibling;
                        eCell = eRow.querySelector(`${cellSelector}:first-child`);
                    } else {
                        eCell = hElem;
                        isLastCell = true;
                    }
                }
            } else if (move === 'prev') {
                // move focus to the previous cell

                hElem = eCell;

                eCell = eCell.previousElementSibling;
                while (eCell && !eCell.matches(cellSelector)) {
                    eCell = eCell.previousElementSibling;
                }

                if (eCell === null) {
                    if (eRow.previousElementSibling) {
                        eRow = eRow.previousElementSibling;
                        eCell = eRow.querySelector(`${cellSelector}:last-child`);
                    } else {
                        eCell = hElem;
                        isFirstCell = true;
                    }
                }
            } else if (move === 'down' || move === 'up') {
                // move focus to the next/previous row

                hElem = eRow;

                if (move === 'down') {
                    eRow = eRow.nextElementSibling;
                    while (eRow && !eRow.matches(rowSelector)) {
                        eRow = eRow.nextElementSibling;
                    }
                } else {
                    // up
                    eRow = eRow.previousElementSibling;
                    while (eRow && !eRow.matches(rowSelector)) {
                        eRow = eRow.previousElementSibling;
                    }
                }

                if (eRow === null) {
                    eRow = hElem;

                    if (move === 'down') {
                        isLastRow = true;
                    } else {
                        isFirstRow = true;
                    }
                } else {
                    let prevElsCount = prevElemsCount(eCell, cellSelector);

                    eCell = eRow.querySelector(`${cellSelector}:nth-child(${prevElsCount + 1})`);
                    if (eCell === null) {
                        eCell = eRow.querySelector(`${cellSelector}:first-child`);
                    }
                }
            }

            if (this.useHomeEndKeys) {
                if (isKey('Home', event)) {
                    move = 'home';
                } else if (isKey('End', event)) {
                    move = 'end';
                }

                if (move === 'home') {
                    // move focus to the first cell in the row

                    if (!eCell.previousElementSibling && !eRow.previousElementSibling) {
                        isFirstCell = true;
                    } else {
                        eCell = eCell.previousElementSibling;
                        while (eCell && eCell.matches(cellSelector)) {
                            hElem = eCell;
                            eCell = eCell.previousElementSibling;
                        }

                        eCell = hElem;
                    }

                    event.preventDefault();
                } else if (move === 'end') {
                    // activate the last cell in the row

                    if (!eCell.nextElementSibling && !eRow.nextElementSibling) {
                        isLastCell = true;
                    } else {
                        eCell = eCell.nextElementSibling;
                        while (eCell && eCell.matches(cellSelector)) {
                            hElem = eCell;
                            eCell = eCell.nextElementSibling;
                        }

                        eCell = hElem;
                    }

                    event.preventDefault();
                }
            }

            if (move) {
                this._activateCellAndRow(eCell, eRow);
            }
        }

        return {
            row: eRow,
            cell: eCell,
            isFirstCell,
            isLastCell,
            isFirstRow,
            isLastRow,
        };
    }

    /**
     *
     * @param {Element} elem
     * @return {{row, cell: Element|null}}
     */
    activateCellByElem(elem) {
        let eCell = elem.closest(this.cellSelector);
        let eRow = eCell ? eCell.closest(this.rowSelector) : null;

        this._activateCellAndRow(eCell, eRow);

        return {
            row: eRow,
            cell: eCell,
        };
    }

    /**
     * @param {integer|'first'|'last'} rowIdx
     * @param {integer|'first'|'last'} cellIdx
     * @param {Element} eContainer
     * @return {{row, cell: Element|null}}
     */
    activateCellByIndices(rowIdx, cellIdx, eContainer) {
        let eRow =
            eContainer && eContainer.querySelector
                ? eContainer.querySelector(`${this.rowSelector}${this._getNthChildSelector(rowIdx)}`)
                : null;
        let eCell = eRow ? eRow.querySelector(`${this.cellSelector}${this._getNthChildSelector(cellIdx)}`) : null;

        this._activateCellAndRow(eCell, eRow);

        return {
            row: eRow,
            cell: eCell,
        };
    }

    /**
     * Deactivate cell and row by row element.
     *
     * @param {Element} eRow
     * @private
     */
    _deactivateByRowElem(eRow) {
        const { activeRowClass } = this;
        const { activeCellClass } = this;
        let focusableElem = null;
        let elem = eRow.parentElement.querySelector(`.${activeRowClass}`);

        // row
        if (elem) {
            elem.classList.remove(activeRowClass);
        }

        // cell
        elem = eRow.parentElement.querySelector(`.${activeCellClass}`);
        if (elem) {
            if (this.setTabIndex) {
                if (this.focusElemInsideCell) {
                    focusableElem = findFirstFocusableDescendant(elem);
                }

                if (focusableElem) {
                    focusableElem.setAttribute('tabindex', -1);
                } else {
                    elem.setAttribute('tabindex', -1);
                }
            }

            elem.classList.remove(activeCellClass);
        }
    }

    /**
     * @param {Element} eCell
     * @param {Element} eRow
     * @private
     */
    _activateCellAndRow(eCell, eRow) {
        let focusableElem = null;

        if (eCell && eRow) {
            this._deactivateByRowElem(eRow);

            eCell.classList.add(this.activeCellClass);
            eRow.classList.add(this.activeRowClass);

            if (this.focusCell) {
                if (this.focusElemInsideCell) {
                    focusableElem = findFirstFocusableDescendant(eCell);
                }

                if (focusableElem) {
                    focusableElem.focus();
                } else {
                    eCell.focus();
                }
            }

            if (this.setTabIndex) {
                if (focusableElem) {
                    focusableElem.setAttribute('tabindex', 0);
                } else {
                    eCell.setAttribute('tabindex', 0);
                }
            }
        }
    }

    /**
     * @param {integer|'first'|'last'} idx
     * @return {string}
     * @private
     */
    _getNthChildSelector(idx) {
        if (idx === 'first') {
            return ':first-child';
        } else if (idx === 'last') {
            return ':last-child';
        }

        return `:nth-child(${idx})`;
    }
}
