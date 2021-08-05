import FDataGridRowEdit from '@/components/FDataGridRowEdit/FDataGridRowEdit.vue';
import FInput from '@/components/FInput/FInput.vue';
import FComboBox from '@/components/FComboBox/FComboBox.vue';
import FOption from '@/components/FOption/FOption.vue';
import { clone } from '@/utils';

function comboboxFormatter(value, data) {
    const option = data.find(item => item.value === value);

    return option ? option.label : '';
}

const comboboxEditorData = [
    {
        value: 1,
        label: 'Option 1',
    },
    {
        value: 2,
        label: 'Option 2',
    },
];

const columns = [
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
        // hidden: true,
    },
    {
        name: 'combobox',
        label: 'ComboBox',
        editable: true,
        defaultValue: 1,
    },
    {
        name: 'checkbox',
        label: 'Checkbox',
        editable: true,
        defaultValue: false,
        // hidden: true,
    },
];

const items = [
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
];

export default {
    title: 'FDataGridRowEdit',
    component: FDataGridRowEdit,
};

export const Default = () => ({
    components: { FDataGridRowEdit, FInput, FComboBox, FOption },
    template: `
        <div class="grid">
        <div class="md:col-9">
            <f-data-grid-row-edit
                edit-mode="row-edit"
                v-model="items"
                :columns="columns"
                :empty-row-values="emptyRowValues"
                :footer-items="footerItems"
                :use-pagination="false"
                no-header
            >
                <template #editor-textinput="{ item }">
                    <f-input v-model="item.textinput" no-label />
                </template>
                <template #editor-numberinput="{ item }">
                    <f-input
                        v-model="item.numberinput"
                        type="number"
                        no-label
                        :validator="numberValidator"
                        :auto-correction="0"
                        error-messages-component="f-error-messages-popover"
                        validate-on-input
                    />
                </template>
                <template #editor-textarea="{ item }">
                    <f-input is-textarea auto-resizable-textarea v-model="item.textarea" no-label />
                </template>
                <template #editor-combobox="{ item }">
                    <f-combo-box select-mode :data="comboboxEditorData" v-model="item.combobox" no-label />
                </template>
                <template #editor-checkbox="{ item }">
                    <f-option type="checkbox" v-model="item.checkbox" />
                </template>
                <template #footercolumn-numberinput="{ item, value }">
                    Sum: <b>{{ value }}</b>
                </template>
            </f-data-grid-row-edit>
        </div>
        <div class="md:col-3 tes-4 pat-3" style="overflow: auto">
            items:
            <pre>{{ items }}</pre>
        </div>
        </div>
    `,
    data() {
        return {
            items: clone(items),
            comboboxEditorData: clone(comboboxEditorData),
        };
    },
    computed: {
        columns() {
            const cols = clone(columns);

            cols[3].formatter = function(value) {
                return comboboxFormatter(value, comboboxEditorData);
            };

            return cols;
        },
        footerItems() {
            const { items } = this;

            return [
                {
                    numberinput: items.reduce((prev, curr) => {
                        const val = parseInt(curr.numberinput);

                        return prev + (!this.numberValidator(val) ? val : 0);
                    }, 0),
                },
            ];
        },
    },
    methods: {
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
        numberValidator(value) {
            const val = parseInt(value);

            if (isNaN(val)) {
                return 'Not a number';
            } else if (value < 0) {
                return 'Must be a positive number';
            }

            return '';
        },
    },
});

export const NoInputStyle = () => ({
    components: { FDataGridRowEdit, FInput, FComboBox, FOption },
    template: `
        <div class="grid">
        <div class="md:col-9">
            <f-data-grid-row-edit
                edit-mode="row-edit"
                v-model="items"
                :columns="columns"
                :empty-row-values="emptyRowValues"
                :footer-items="footerItems"
                :use-pagination="false"
                no-header
            >
                <template #editor-textinput="{ item }">
                    <f-input no-style v-model="item.textinput" no-label />
                </template>
                <template #editor-numberinput="{ item }">
                    <f-input
                        no-style
                        v-model="item.numberinput"
                        type="number"
                        no-label
                        :validator="numberValidator"
                        :auto-correction="0"
                        error-messages-component="f-error-messages-popover"
                        validate-on-input
                    />
                </template>
                <template #editor-textarea="{ item }">
                    <f-input no-style is-textarea auto-resizable-textarea v-model="item.textarea" no-label />
                </template>
                <template #editor-combobox="{ item }">
                    <f-combo-box no-style select-mode :data="comboboxEditorData" v-model="item.combobox" no-label />
                </template>
                <template #editor-checkbox="{ item }">
                    <f-option type="checkbox" v-model="item.checkbox" />
                </template>
                <template #footercolumn-numberinput="{ item, value }">
                    Sum: <b>{{ value }}</b>
                </template>
            </f-data-grid-row-edit>
        </div>
        <div class="md:col-3 tes-4 pat-3" style="overflow: auto">
            items:
            <pre>{{ items }}</pre>
        </div>
        </div>
    `,
    data() {
        return {
            items: clone(items),
            comboboxEditorData: clone(comboboxEditorData),
        };
    },
    computed: {
        columns() {
            const cols = clone(columns);

            cols[3].formatter = function(value) {
                return comboboxFormatter(value, comboboxEditorData);
            };

            return cols;
        },
        footerItems() {
            const { items } = this;

            return [
                {
                    numberinput: items.reduce((prev, curr) => {
                        const val = parseInt(curr.numberinput);

                        return prev + (!this.numberValidator(val) ? val : 0);
                    }, 0),
                },
            ];
        },
    },
    methods: {
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
        numberValidator(value) {
            const val = parseInt(value);

            if (isNaN(val)) {
                return 'Not a number';
            } else if (value < 0) {
                return 'Must be a positive number';
            }

            return '';
        },
    },
});
