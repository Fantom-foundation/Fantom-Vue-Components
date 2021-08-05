<template>
    <section>
        <h1 class="h2">Data grid</h1>

        <h3>No data</h3>
        <f-data-grid :columns="[]" table-id="table0" />

        <h3>Columns, no data <button @click="grid1On = !grid1On">toggle grid</button></h3>
        <f-data-grid v-if="grid1On" :columns="grid1.columns" table-id="table1" />

        <h3>Editable grid <button @click="grid7On = !grid7On">toggle grid</button></h3>
        <div class="grid">
            <div class="md:col-9">
                <f-data-grid
                    v-if="grid7On"
                    edit-mode="row-edit"
                    v-model="grid7.items"
                    :columns="grid7.columns"
                    :use-pagination="false"
                    :empty-row-values="grid7.emptyRowValues"
                    :footer-items="footerItems"
                    no-header
                    table-id="table7"
                >
                    <template #editor-textinput="{ item }">
                        <f-input v-model="item.textinput" no-label />
                    </template>
                    <template #editor-numberinput="{ item }">
                        <!-- auto-correction - neni-li hodnota inputu validni pri opusteni inputu (blur), nastavi se tato hodnota -->
                        <f-input
                            v-model="item.numberinput"
                            type="number"
                            no-label
                            :validator="grid7.numberValidator"
                            :auto-correction="0"
                            error-messages-component="f-error-messages-popover"
                            validate-on-input
                        />
                    </template>
                    <template #editor-textarea="{ item }">
                        <f-input is-textarea auto-resizable-textarea v-model="item.textarea" no-label />
                    </template>
                    <template #editor-combobox="{ item }">
                        <f-combo-box
                            select-mode
                            :inline-autocomplete="false"
                            :data="grid7.comboboxEditorData"
                            v-model="item.combobox"
                            no-label
                        />
                    </template>
                    <template #editor-checkbox="{ item }">
                        <f-option type="checkbox" v-model="item.checkbox" />
                    </template>
                    <template #footercolumn-numberinput="{ item, value }">
                        Sum: <b>{{ value }}</b>
                    </template>
                </f-data-grid>
            </div>
            <pre class="md:col-3 tes-3" style="overflow: auto"
                >{{ grid7.items }}
            </pre>
        </div>

        <h3>Editable grid <button @click="grid6On = !grid6On">toggle grid</button></h3>
        <div class="grid">
            <div class="md:col-9">
                <f-data-grid
                    v-if="grid6On"
                    edit-mode="row"
                    v-model="grid6.items"
                    :columns="grid6.columns"
                    :use-pagination="false"
                    :empty-row-values="grid6.emptyRowValues"
                    no-header
                    table-id="table6"
                >
                    <template #editor-input="{ item }">
                        <f-input
                            v-model="item.input"
                            no-label
                            :validator="grid6.textValidator"
                            error-messages-component="f-error-messages-popover"
                            validate-on-input
                        />
                    </template>
                    <template #editor-textarea="{ item }">
                        <f-input is-textarea v-model="item.textarea" no-label />
                    </template>
                    <template #editor-combobox="{ item }">
                        <f-combo-box select-mode :data="grid6.comboboxEditorData" v-model="item.combobox" no-label />
                    </template>
                    <template #editor-checkbox="{ item }">
                        <f-option type="checkbox" v-model="item.checkbox" />
                    </template>
                </f-data-grid>
            </div>
            <pre class="md:col-3 tes-3" style="overflow: auto"
                >{{ grid6.items }}
            </pre>
        </div>

        <h3>Async data, strategy: 'remote' <button @click="grid5On = !grid5On">toggle grid</button></h3>
        <f-data-grid
            v-if="grid5On"
            strategy="remote"
            :columns="grid5.columns"
            :items="grid5.items"
            :total-items="grid5.totalItems"
            :per-page="grid5.perPage"
            sticky-head
            one-line-mode
            mobile-view-breakpoint="60em"
            table-id="table4"
            @change="onGrid5Change"
        />
        <pre
            >{{ table2State }}
        </pre>

        <h3>Async data, strategy: 'local' <button @click="grid4On = !grid4On">toggle grid</button></h3>
        <f-data-grid
            v-if="grid4On"
            :columns="grid4.columns"
            :items="grid4.items"
            :total-items="grid4.totalItems"
            :per-page="15"
            sticky-head
            one-line-mode
            mobile-view-breakpoint="60em"
            table-id="table4"
            @change="tableState = $event"
        />
        <pre
            >{{ tableState }}
        </pre>

        <h3>Columns, Data <button @click="grid2On = !grid2On">toggle grid</button></h3>
        <f-data-grid
            v-if="grid2On"
            :columns="grid2.columns"
            :items="grid2.items"
            :total-items="grid2.items.length"
            :per-page="15"
            sticky-head
            one-line-mode
            mobile-view-breakpoint="60em"
            table-id="table2"
        />

        <h3>Hidden columns <button @click="grid3On = !grid3On">toggle grid</button></h3>
        <f-data-grid
            v-if="grid3On"
            :columns="grid3.columns"
            :items="grid3.items"
            :total-items="grid3.items.length"
            :per-page="40"
            height="400px"
            sticky-head
            table-id="table3"
        />
    </section>
</template>

<script>
import FDataGrid from '@/components/FDataGrid/FDataGrid.vue';
import { rows, columns, rows2 } from './data.js';
import { clone } from '@/utils';
import { compareLocalizedStringProperty } from '@/utils/array-sorting.js';
import { fetchPagedRows, fetchRows } from './responses.js';
import FInput from '@/components/FInput/FInput.vue';
import FOption from '@/components/FOption/FOption.vue';

const hiddenColumns = clone(columns);
hiddenColumns[0].hidden = true;
hiddenColumns[hiddenColumns.length - 1].hidden = true;
hiddenColumns[hiddenColumns.length - 2].css = {
    textAlign: 'right',
};
/*hiddenColumns[1].css = {
    backgroundColor: 'red',
    textAlign: 'right',
};*/

const columns2 = clone(columns);
columns2[0].sortFunc = compareLocalizedStringProperty;
columns2[1].sortFunc = compareLocalizedStringProperty;
columns2[2].sortFunc = compareLocalizedStringProperty;
columns2[3].sortFunc = compareLocalizedStringProperty;

const columns4 = clone(columns);
columns4[0].sortFunc = compareLocalizedStringProperty;
columns4[1].sortFunc = compareLocalizedStringProperty;
columns4[2].sortFunc = compareLocalizedStringProperty;
columns4[3].sortFunc = compareLocalizedStringProperty;

function comboboxFormatter(value, data) {
    const option = data.find(item => item.value === value);

    return option ? option.label : '';
}

export default {
    name: 'FDataGridPlayground',

    components: { FOption, FInput, FDataGrid },

    data() {
        return {
            grid1: {
                columns: clone(columns),
                items: clone(rows),
            },
            grid2: {
                columns: columns2,
                items: clone(rows),
            },
            grid3: {
                columns: hiddenColumns,
                items: clone(rows),
            },
            grid4: {
                columns: columns4,
                items: [],
                totalItems: 0,
            },
            grid5: {
                columns: clone(columns4),
                items: [],
                totalItems: 0,
                perPage: 10,
            },
            grid6: {
                columns: [
                    /*{
                        name: 'id',
                        defaultValue: null,
                        hidden: true,
                    },*/
                    {
                        name: 'input',
                        label: 'Text Input',
                        editable: true,
                    },
                    {
                        name: 'textarea',
                        label: 'Textarea',
                        editable: true,
                        // hidden: true,
                    },
                    {
                        name: 'combobox',
                        label: 'ComboBox',
                        editable: true,
                        defaultValue: 1,
                        formatter: value => {
                            return comboboxFormatter(value, this.grid6.comboboxEditorData);
                        },
                    },
                    {
                        name: 'checkbox',
                        label: 'Checkbox',
                        editable: true,
                        defaultValue: false,
                        // hidden: true,
                    },
                ],
                items: clone(rows2.slice(2, 5)),
                textValidator(value) {
                    return !value ? 'required' : false;
                },
                emptyRowValues() {
                    return {
                        id: null,
                        input: '',
                        textarea: '',
                        combobox: 1,
                        checkbox: false,
                    };
                },
                comboboxEditorData: [
                    {
                        value: 1,
                        label: 'Option 1',
                    },
                    {
                        value: 2,
                        label: 'Option 2',
                    },
                ],
            },
            grid7: {
                columns: [
                    {
                        name: 'textinput',
                        label: 'Text Input',
                        editable: true,
                    },
                    {
                        name: 'numberinput',
                        label: 'Number Input',
                        editable: true,
                    },
                    {
                        name: 'textarea',
                        label: 'Textarea',
                        editable: true,
                        hidden: true,
                    },
                    {
                        name: 'combobox',
                        label: 'ComboBox',
                        editable: true,
                        defaultValue: 1,
                        formatter: value => {
                            return comboboxFormatter(value, this.grid7.comboboxEditorData);
                        },
                    },
                    {
                        name: 'checkbox',
                        label: 'Checkbox',
                        editable: true,
                        defaultValue: false,
                        // hidden: true,
                    },
                ],
                items: [
                    {
                        id: 1,
                        textinput: 'Justine',
                        numberinput: 0,
                        textarea: 'Morbi sem mauris, laoreet ut',
                        combobox: 1,
                        checkbox: false,
                    },
                    {
                        id: 2,
                        textinput: '',
                        numberinput: 0,
                        textarea: 'rhoncus aliquet, pulvinar sed',
                        combobox: 1,
                        checkbox: false,
                    },
                ],
                numberValidator(value) {
                    const val = parseInt(value);

                    if (isNaN(val)) {
                        return 'Not a number';
                    } else if (value < 0) {
                        return 'Must be a positive number';
                    }

                    return '';
                },
                emptyRowValues() {
                    return {
                        id: null,
                        textinput: '',
                        numberinput: 0,
                        textarea: '',
                        combobox: 1,
                        checkbox: false,
                    };
                },
                comboboxEditorData: [
                    {
                        value: 1,
                        label: 'Option 1',
                    },
                    {
                        value: 2,
                        label: 'Option 2',
                    },
                ],
            },

            grid1On: true,
            grid2On: true,
            grid3On: true,
            grid4On: true,
            grid5On: true,
            grid6On: true,
            grid7On: true,

            totalItems4: 0,

            tableState: {},
            table2State: {},
        };
    },

    computed: {
        test() {
            const { items } = this.grid6;
            let str = [];

            items.forEach(item => {
                str.push(item.input);
            });

            return str.join(', ');
        },

        footerItems() {
            const { items } = this.grid7;

            return [
                {
                    numberinput: items.reduce((prev, curr) => {
                        const val = parseInt(curr.numberinput);

                        return prev + (!this.grid7.numberValidator(val) ? val : 0);
                    }, 0),
                },
            ];
        },
    },

    /*watch: {
        'grid6.items': {
            handler(value) {
                console.log('eee', value);
            },
        },
    },*/

    created() {
        this.grid4.items = this.fetchGrid4Rows();
        this.grid5.items = this.fetchGrid5Rows(1, this.grid5.perPage);
    },

    methods: {
        onGrid5Change(_data) {
            this.table2State = { ..._data };

            this.grid5.items = this.fetchGrid5Rows(_data.currPage, _data.perPage, _data.sortBy, _data.sortDir);
        },

        async fetchGrid4Rows() {
            const data = await fetchRows(2000);

            // this.grid4.items = data.rows;
            this.grid4.totalItems = data.totalItems;

            return data.rows;
        },

        async fetchGrid5Rows(_page, _perPage, _sortBy, _sortDir) {
            const data = await fetchPagedRows(1500, _page, _perPage, _sortBy, _sortDir);

            // this.grid4.items = data.rows;
            this.grid5.totalItems = data.totalItems;

            return data.rows;
        },

        clone,
    },
};
</script>
