/* eslint-disable no-async-promise-executor */

/**
 * Class for operating movement in the grid using the arrow keys
 */

import { expect, fixture } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { GridKeyboardNavigation } from '../../../src/utils/GridKeyboardNavigation.js';

/**
 * @param {function} [onTableKeydown]
 * @return {Promise<HTMLElement>}
 */
async function getTable(onTableKeydown) {
    //language=HTML
    const eTable = await fixture(`
        <table>
            <tr id="first_row">
                <td tabindex="-1" id="r1c1">11</td>
                <td tabindex="-1" id="r1c2">12</td>
                <td tabindex="-1" id="r1c3"><button>13</button></td>
                <td tabindex="-1" id="r1c4"><a href="#">14</a></td>
            </tr>
            <tr id="second_row">
                <td tabindex="-1" id="r2c1">11</td>
                <td tabindex="-1" id="r2c2">12</td>
                <td tabindex="-1" id="r2c3"><button>13</button></td>
                <td tabindex="-1" id="r2c4"><a href="#">14</a></td>
            </tr>
        </table>
    `);

    document.body.appendChild(eTable);

    if (onTableKeydown) {
        eTable.addEventListener('keydown', onTableKeydown);
    }

    return eTable;
}

function getGKNInstance({
    rowSelector = 'tr',
    cellSelector = 'tr > td',
    ...args
    // circular = false,
    // focusElem = true,
} = {}) {
    return new GridKeyboardNavigation({ rowSelector, cellSelector, ...args });
}

/**
 * @param {HTMLElement} elem
 * @param {Object} info
 */
function isActive(elem, info) {
    expect(info.row).not.to.be.null;
    expect(info.cell).not.to.be.null;
    expect(info.row.classList.contains('activerow')).to.be.true;
    expect(info.cell.classList.contains('activecell')).to.be.true;
    expect(info.cell === elem).to.be.true;
}

describe('GridKeyboardNavigation', () => {
    let eTable = null;
    let gkn = null;

    afterEach(() => {
        gkn = null;

        if (eTable) {
            eTable.remove();
            eTable = null;
        }
    });

    it('should throw an error if `rowSelector` and/or `cellSelector` is not specified', () => {
        expect(() => {
            gkn = getGKNInstance({ rowSelector: '', cellSelector: '' });
        }).to.throw();
    });

    it('should activate cell and row by cell element', async () => {
        eTable = await getTable();

        const eCell = eTable.querySelector('#r1c2');

        gkn = getGKNInstance();
        const info = gkn.activateCellByElem(eCell);

        expect(info.cell === eCell).to.be.true;
        expect(info.row === eCell.parentElement).to.be.true;
    });

    it('should activate cell and row by row index and cell index', async () => {
        eTable = await getTable();

        gkn = getGKNInstance();

        let info = gkn.activateCellByIndices(1, 1, eTable);
        let eCell = eTable.querySelector('#r1c1');
        expect(info.cell === eCell).to.be.true;
        expect(info.row === eCell.parentElement).to.be.true;

        info = gkn.activateCellByIndices(1, 3, eTable);
        eCell = eTable.querySelector('#r1c3');
        expect(info.cell === eCell).to.be.true;
        expect(info.row === eCell.parentElement).to.be.true;

        info = gkn.activateCellByIndices(2, 2, eTable);
        eCell = eTable.querySelector('#r2c2');
        expect(info.cell === eCell).to.be.true;
        expect(info.row === eCell.parentElement).to.be.true;
    });

    it('should deactivate previously activated cell and row if cell is activated', async () => {
        eTable = await getTable();

        gkn = getGKNInstance();

        let info = gkn.activateCellByIndices(1, 1, eTable);
        gkn.activateCellByIndices(2, 2, eTable);

        expect(info.row.classList.contains('activerow')).to.be.false;
        expect(info.cell.classList.contains('activecell')).to.be.false;
    });

    it('should add css class to active row and/or cell if `activeRowClass` and/or `activeCellClass` are given', async () => {
        eTable = await getTable();

        const firstCell = eTable.querySelector('#r1c1');

        gkn = getGKNInstance();
        gkn.activateCellByElem(firstCell);

        expect(firstCell.classList.contains('activecell')).to.be.true;
        expect(firstCell.parentElement.classList.contains('activerow')).to.be.true;
    });

    it('should focus active cell if `focusCell` is `true`', async () => {
        eTable = await getTable();

        gkn = getGKNInstance({ focusCell: true });

        let info = gkn.activateCellByIndices(1, 1, eTable);

        expect(document.activeElement === info.cell).to.be.true;
    });

    it('should set `tabindex` attribute of active cell to `0` and `tabindex` attribute of deactivated cell to `-1` if `setTabIndex` is `true`', async () => {
        eTable = await getTable();

        gkn = getGKNInstance({ setTabIndex: true });

        let info1 = gkn.activateCellByIndices(1, 1, eTable);
        expect(info1.cell.getAttribute('tabindex')).to.equal('0');

        let info2 = gkn.activateCellByIndices(1, 2, eTable);
        expect(info2.cell.getAttribute('tabindex')).to.equal('0');
        expect(info1.cell.getAttribute('tabindex')).to.equal('-1');
    });

    it('should focus focusable element inside active cell if `focusElemInsideCell` is `true`', async () => {
        eTable = await getTable();

        gkn = getGKNInstance({ focusElemInsideCell: true, focusCell: true });

        let elem = eTable.querySelector('#r1c3 button');
        gkn.activateCellByIndices(1, 3, eTable);
        expect(document.activeElement === elem).to.be.true;

        elem = eTable.querySelector('#r2c4 a');
        gkn.activateCellByIndices(2, 4, eTable);
        expect(document.activeElement === elem).to.be.true;
    });

    it('should set `tabindex` attribute of focusable element inside active cell to `0` and `tabindex` attribute of focusable element inside deactivated cell to `-1` if `focusCell`, `focusElemInsideCell` and `setTabIndex` are `true`', async () => {
        eTable = await getTable();

        gkn = getGKNInstance({ setTabIndex: true, focusElemInsideCell: true, focusCell: true });

        const elem = eTable.querySelector('#r1c3 button');
        gkn.activateCellByIndices(1, 3, eTable);
        expect(elem.getAttribute('tabindex')).to.equal('0');

        const elem2 = eTable.querySelector('#r2c4 a');
        gkn.activateCellByIndices(2, 4, eTable);
        expect(elem2.getAttribute('tabindex')).to.equal('0');
        expect(elem.getAttribute('tabindex')).to.equal('-1');
    });

    it('should activate cell next to the active cell if `ArrowRight` key is pressed', async () => {
        return new Promise(async resolve => {
            eTable = await getTable(function(event) {
                const info = gkn.navigate(event);

                isActive(eTable.querySelector('#r1c2'), info);

                resolve();
            });

            gkn = getGKNInstance({ focusCell: true });
            gkn.activateCellByIndices(1, 1, eTable);

            await sendKeys({ press: 'ArrowRight' });
        });
    });

    it('should activate cell previous to the active cell if `ArrowLeft` key is pressed', async () => {
        return new Promise(async resolve => {
            eTable = await getTable(function(event) {
                const info = gkn.navigate(event);

                isActive(eTable.querySelector('#r1c1'), info);

                resolve();
            });

            gkn = getGKNInstance({ focusCell: true });
            gkn.activateCellByIndices(1, 2, eTable);

            await sendKeys({ press: 'ArrowLeft' });
        });
    });

    it('should activate the row below the active row and the cell at the same index as the active cell if `ArrowDown` key is pressed', async () => {
        return new Promise(async resolve => {
            eTable = await getTable(function(event) {
                const info = gkn.navigate(event);

                isActive(eTable.querySelector('#r2c2'), info);

                resolve();
            });

            gkn = getGKNInstance({ focusCell: true });
            gkn.activateCellByIndices(1, 2, eTable);

            await sendKeys({ press: 'ArrowDown' });
        });
    });

    it('should activate the row above the active row and the cell at the same index as the active cell if `ArrowUp` key is pressed', async () => {
        return new Promise(async resolve => {
            eTable = await getTable(function(event) {
                const info = gkn.navigate(event);

                isActive(eTable.querySelector('#r1c2'), info);

                resolve();
            });

            gkn = getGKNInstance({ focusCell: true });
            gkn.activateCellByIndices(2, 2, eTable);

            await sendKeys({ press: 'ArrowUp' });
        });
    });

    it('should activate the first cell of the next row if the `ArrowRight` key is pressed and the current cell is the last cell of the row', async () => {
        return new Promise(async resolve => {
            eTable = await getTable(function(event) {
                const info = gkn.navigate(event);

                isActive(eTable.querySelector('#r2c1'), info);

                resolve();
            });

            gkn = getGKNInstance({ focusCell: true });
            gkn.activateCellByIndices(1, 4, eTable);

            await sendKeys({ press: 'ArrowRight' });
        });
    });

    it('should activate the last cell of the previous row if the `ArrowLeft` key is pressed and the current cell is the first cell of the row', async () => {
        return new Promise(async resolve => {
            eTable = await getTable(function(event) {
                const info = gkn.navigate(event);

                isActive(eTable.querySelector('#r1c4'), info);

                resolve();
            });

            gkn = getGKNInstance({ focusCell: true });
            gkn.activateCellByIndices(2, 1, eTable);

            await sendKeys({ press: 'ArrowLeft' });
        });
    });

    it('should return `isFirstCell: true` if the `ArrowLeft` key is pressed and the current cell is the first cell of the grid', async () => {
        return new Promise(async resolve => {
            eTable = await getTable(function(event) {
                const info = gkn.navigate(event);

                expect(info.isFirstCell).to.be.true;
                isActive(eTable.querySelector('#r1c1'), info);

                resolve();
            });

            gkn = getGKNInstance({ focusCell: true });
            gkn.activateCellByIndices(1, 1, eTable);

            await sendKeys({ press: 'ArrowLeft' });
        });
    });

    it('should return `isLastCell: true` if the `ArrowRight` key is pressed and the current cell is the last cell of the grid', async () => {
        return new Promise(async resolve => {
            eTable = await getTable(function(event) {
                const info = gkn.navigate(event);

                expect(info.isLastCell).to.be.true;
                isActive(eTable.querySelector('#r2c4'), info);

                resolve();
            });

            gkn = getGKNInstance({ focusCell: true });
            gkn.activateCellByIndices(2, 4, eTable);

            await sendKeys({ press: 'ArrowRight' });
        });
    });

    it('should return `isLastRow: true` if the `ArrowDown` key is pressed and the current row is the last row of the grid', async () => {
        return new Promise(async resolve => {
            eTable = await getTable(function(event) {
                const info = gkn.navigate(event);

                expect(info.isLastRow).to.be.true;
                isActive(eTable.querySelector('#r2c3'), info);

                resolve();
            });

            gkn = getGKNInstance({ focusCell: true });
            gkn.activateCellByIndices(2, 3, eTable);

            await sendKeys({ press: 'ArrowDown' });
        });
    });

    it('should return `isFirstRow: true` if the `ArrowUp` key is pressed and the current row is the first row of the grid', async () => {
        return new Promise(async resolve => {
            eTable = await getTable(function(event) {
                const info = gkn.navigate(event);

                expect(info.isFirstRow).to.be.true;
                isActive(eTable.querySelector('#r1c3'), info);

                resolve();
            });

            gkn = getGKNInstance({ focusCell: true });
            gkn.activateCellByIndices(1, 3, eTable);

            await sendKeys({ press: 'ArrowUp' });
        });
    });
});

/* eslint-enable no-async-promise-executor */
