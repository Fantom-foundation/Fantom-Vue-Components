import FComboBox from '@/components/FComboBox/FComboBox.vue';
import FButton from '../FButton/FButton.vue';
import { clone } from '@/utils';
import FListbox from '@/components/FListbox/FListbox.vue';

const comboboxData = [
    {
        value: 2,
        label: 'Tani',
    },
    {
        value: 11,
        label: 'Fonsie',
    },
    {
        value: 5,
        label: 'Slade',
    },
    {
        value: 19,
        label: 'Elladine',
    },
    {
        value: 13,
        label: 'Shandie',
        // label: 'Shandie looooooooooooooooooooooooooooooooooooooooooooooooooong',
    },
    {
        value: 14,
        label: 'Noach',
    },
    {
        value: 9,
        label: 'Shela',
    },
    {
        value: 6,
        label: 'Lura',
    },
    {
        value: 12,
        label: 'Lia',
    },
    {
        value: 15,
        label: 'Frayda',
    },
];

const comboboxData2 = [
    { value: 1, label: '1 Armstrong' },
    { value: 2, label: '2 Laurene' },
    { value: 3, label: '3 Shelley' },
    { value: 4, label: '4 Sukey' },
    { value: 5, label: '5 Scarlett' },
    { value: 6, label: '6 Phyllida' },
    { value: 7, label: '7 Adara' },
    { value: 8, label: '8 Brandon' },
    { value: 9, label: '9 Hedwiga' },
    { value: 10, label: '10 Misha' },
    { value: 11, label: '11 Maurita' },
    { value: 12, label: '12 Jamill' },
    { value: 13, label: '13 Humfrid' },
    { value: 14, label: '14 Cleo' },
    { value: 15, label: '15 Beverly' },
    { value: 16, label: '16 Concordia' },
    { value: 17, label: '17 Brandi' },
    { value: 18, label: '18 Sebastien' },
    { value: 19, label: '19 Rosabelle' },
    { value: 20, label: '20 Rycca' },
    { value: 21, label: '21 Bevvy' },
    { value: 22, label: '22 Dorena' },
    { value: 23, label: '23 Goran' },
    { value: 24, label: '24 Fiann' },
    { value: 25, label: '25 Eva' },
    { value: 26, label: '26 Dionis' },
    { value: 27, label: '27 Terrence' },
    { value: 28, label: '28 Amalia' },
    { value: 29, label: '29 Ford' },
    { value: 30, label: '30 Tommy' },
];

const comboboxData3 = [
    {
        value: { id: 2 },
        label: 'Tani',
    },
    {
        value: { id: 11 },
        label: 'Fonsie',
    },
    {
        value: { id: 5 },
        label: 'Slade',
    },
    {
        value: { id: 19 },
        label: 'Elladine',
    },
    {
        value: { id: 13 },
        label: 'Shandie',
    },
    {
        value: { id: 14 },
        label: 'Noach',
    },
    {
        value: { id: 9 },
        label: 'Shela',
    },
    {
        value: { id: 6 },
        label: 'Lura',
    },
    {
        value: { id: 12 },
        label: 'Lia',
    },
    {
        value: { id: 15 },
        label: 'Frayda',
    },
];

function fetchPagedComboBoxData(_timeout = 1000, _pagination) {
    return new Promise(_resolve =>
        setTimeout(() => {
            let ldata = clone(comboboxData2);
            const filterText = _pagination.filterText.trim().toLowerCase();

            ldata = ldata.filter(_item => _item.label.toLowerCase().indexOf(filterText) > -1);

            _resolve({
                totalItems: ldata.length,
                items: ldata.slice(
                    (_pagination.currPage - 1) * _pagination.perPage,
                    _pagination.currPage * _pagination.perPage
                ),
            });
        }, _timeout)
    );
}

/**
 * Example of FComboBox wrapper.
 */
const CustomComboBox = {
    components: { FComboBox },

    template: `
        <f-combo-box
            v-bind="{ ...$attrs, ...$props }"
            v-on="$listeners"
            select-mode
            strategy="remote"
            focus
            :per-page="5"
            :data="dData"
            :transform-data-func="onTransformData"
            :throttle-input-interval="250"
            @page-change="onPageChange"
            @change="$emit('input', $event)"
        >
            <!-- copy slots -->
            <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
                <slot :name="name" v-bind="data"></slot>
            </template>
        </f-combo-box>
    `,

    inheritAttrs: false,

    props: {
        /**
         * Listbox's items
         * @type {FListboxItem[]}
         */
        data: { ...FListbox.props.data },
    },

    data() {
        return {
            dData: this.data,
        };
    },

    watch: {
        data(_value) {
            this.dData = _value;
        },
    },

    /*mounted() {
        this.dData = fetchPagedComboBoxData(1000, {
            currPage: 1,
            perPage: 5,
            filterText: '',
        });
    },*/

    methods: {
        onPageChange(_event) {
            this.dData = fetchPagedComboBoxData(1000, _event);
        },

        onTransformData(_data) {
            return {
                totalItems: parseInt(_data.totalItems),
                data: _data.items,
            };
        },
    },
};

export default {
    title: 'FComboBox',
    component: FComboBox,
};

export const Default = () => ({
    components: { FComboBox },
    template: `
        <div>
            <f-combo-box :data="data" @change="value = $event" label="label" />
            value: {{ value }}
        </div>
    `,
    data() {
        return {
            data: clone(comboboxData),
            value: 0,
        };
    },
});

export const TextIsValue = () => ({
    components: { FComboBox },
    template: `
        <div>
            <f-combo-box text-is-value :data="data" @change="value = $event" label="label" />
            value: {{ value }}
        </div>
    `,
    data() {
        return {
            data: clone(comboboxData),
            value: 0,
        };
    },
});

export const ObjectIsValue = () => ({
    components: { FComboBox, FButton },
    template: `
        <div>
            <f-combo-box v-model="value" select-mode :data="data" label="label" />
            <f-button secondary size="small" @click.native="onButtonClick">Set value to 19</f-button>
            <br />
            selected: {{ value }}
        </div>
    `,
    data() {
        return {
            data: clone(comboboxData3),
            value: { id: 9 },
        };
    },
    methods: {
        onButtonClick() {
            this.value = { id: 19 };
        },
    },
});

export const SelectMode = () => ({
    components: { FComboBox },
    template: `
        <div>
            <f-combo-box select-mode :data="data" @change="value = $event" label="label" />
            value: {{ value }}
            <h4>readonly</h4>
            <f-combo-box select-mode readonly :data="data" @change="value2 = $event" label="label" />
            value: {{ value2 }}
        </div>
    `,
    data() {
        return {
            data: clone(comboboxData),
            value: 0,
            value2: 0,
        };
    },
});

export const RemoteData = () => ({
    components: { CustomComboBox },
    template: `
        <div>
            <custom-combo-box @change="value = $event" label="label" />
            value: {{ value }}
            <p class="mat-3 co-grey-5">See source code for FComboBox stories to see an example of FComboBox wrapper (CustomComboBox).</p>
        </div>
    `,
    data() {
        return {
            value: 0,
        };
    },
});

export const NoInlineAutocomplete = () => ({
    components: { FComboBox, CustomComboBox },
    template: `
        <div>
            <p>Selection is performed only by pressing 'Enter' key</p>

            <f-combo-box :inline-autocomplete="false" select-mode :data="data" @change="value = $event" label="label" />
            value: {{ value }}
            <h4>readonly</h4>
            <f-combo-box :inline-autocomplete="false" select-mode readonly :data="data" @change="value2 = $event" label="label" />
            value: {{ value2 }}
            <h4>remote (CustomComboBox)</h4>
            <custom-combo-box :inline-autocomplete="false" @change="value3 = $event" label="label" />
            value: {{ value3 }}
        </div>
    `,
    data() {
        return {
            data: clone(comboboxData),
            value: 0,
            value2: 0,
            value3: 0,
        };
    },
});

export const Model = () => ({
    components: { FComboBox, FButton },
    template: `
        <div>
            <f-combo-box v-model="value" select-mode :data="data" label="label" />
            <f-button secondary size="small" @click.native="onButtonClick">Set value to 19</f-button>
            <br />
            selected: {{ value }}
        </div>
    `,
    data() {
        return {
            data: clone(comboboxData),
            value: 9,
        };
    },
    methods: {
        onButtonClick() {
            this.value = 19;
        },
    },
});

export const FieldSize = () => ({
    components: { FComboBox },
    template: `
        <div>
            <f-combo-box field-size="large" :data="data" label="label" />
            <f-combo-box :data="data" label="label" />
            <f-combo-box field-size="small" :data="data" label="label" />
        </div>
    `,
    data() {
        return {
            data: clone(comboboxData),
        };
    },
});

export const Disabled = () => ({
    components: { FComboBox },
    template: `
        <div>
            <f-combo-box disabled field-size="large" :data="data" label="label" />
            <f-combo-box disabled select-mode :data="data" label="label" />
            <f-combo-box disabled field-size="small" :data="data" label="label" />
        </div>
    `,
    data() {
        return {
            data: clone(comboboxData),
        };
    },
});

export const Invalid = () => ({
    components: { FComboBox },
    template: `
        <div>
            <f-combo-box invalid field-size="large" :data="data" label="label" />
            <f-combo-box invalid :data="data" label="label" />
            <f-combo-box invalid field-size="small" :data="data" label="label" />
        </div>
    `,
    data() {
        return {
            data: clone(comboboxData),
        };
    },
});

export const Required = () => ({
    components: { FComboBox, FButton },
    template: `
        <div>
            <form action="" @submit="onSubmit">
                <f-combo-box ref="combobox" required validate-on-change select-mode :data="data" label="Required combobox" />
                <br /><br />
                <f-button type="submit" size="small">Submit</f-button>
            </form>
        </div>
    `,
    data() {
        return {
            data: [...[{ label: '---', value: '' }], ...clone(comboboxData)],
        };
    },
    methods: {
        onSubmit(_event) {
            this.$refs.combobox.validate();

            _event.preventDefault();
        },
    },
});

export const Validation = () => ({
    components: { FComboBox, FButton },
    template: `
        <div>
            <form action="" @submit="onSubmit">
                <f-combo-box ref="combobox" :validator="validator" validate-on-change select-mode :data="data" label="label" />
                <br /><br />
                <f-button type="submit" size="small">Submit</f-button>
            </form>
        </div>
    `,
    data() {
        return {
            data: clone(comboboxData),
        };
    },
    methods: {
        validator(_value) {
            if (_value !== 11) {
                return 'Fonsie must be selected';
            }

            return '';
        },
        onSubmit(_event) {
            this.$refs.combobox.validate();

            _event.preventDefault();
        },
    },
});

export const Slot = () => ({
    components: { FComboBox },
    template: `
        <div>
            <f-combo-box select-mode :data="data" label="label">
                <template v-slot:item="{ item }">
                    <div class="flex juc-space-between">
                        {{ item.label }} <i>{{ item.value }}</i>
                    </div>
                </template>
            </f-combo-box>
        </div>
    `,
    data() {
        return {
            data: clone(comboboxData),
        };
    },
});

export const InputComponent = () => ({
    components: { FComboBox },
    template: `
        <div>
            <f-combo-box input-component="f-search-field" text-is-value :inline-autocomplete="false" :data="data" @change="value = $event" label="label" />
            value: {{ value }}
        </div>
    `,
    data() {
        return {
            data: clone(comboboxData),
            value: 0,
        };
    },
});
