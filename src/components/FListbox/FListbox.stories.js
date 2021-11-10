import FListbox from './FListbox.vue';
import FButton from '../FButton/FButton.vue';
import FAriaAlert from '../FAriaAlert/FAriaAlert.vue';
import { clone } from '@/utils';

const data = [
    { label: 'item 1', value: '10' },
    { label: 'item 2', id: 'myid', value: '20' },
    { label: 'item 3', value: '30' },
    { label: 'item 4', value: '40' },
    { label: 'item 5', value: '50' },
    { label: 'item 6', value: '60' },
];

const data2 = [];

for (let i = 1; i < 200; i++) {
    data2.push({
        label: `item ${i}`,
        value: `${i * 10}`,
    });
}

const data3 = [
    { label: 'item 1', value: { id: '10' } },
    { label: 'item 2', id: 'myid', value: { id: '20' } },
    { label: 'item 3', value: { id: '30' } },
    { label: 'item 4', value: { id: '40' } },
    { label: 'item 5', value: { id: '50' } },
    { label: 'item 6', value: { id: '60' } },
];

const data4 = [
    { value: 1, label: 'Armstrong' },
    { value: 2, label: 'Laurene' },
    { value: 3, label: 'Shelley' },
    { value: 4, label: 'Sukey' },
    { value: 5, label: 'Scarlett' },
    { value: 6, label: 'Phyllida' },
    { value: 7, label: 'Adara' },
    { value: 8, label: 'Brandon' },
    { value: 9, label: 'Hedwiga' },
    { value: 10, label: 'Misha' },
    { value: 11, label: 'Maurita' },
    { value: 12, label: 'Jamill' },
    { value: 13, label: 'Humfrid' },
    { value: 14, label: 'Cleo' },
    { value: 15, label: 'Beverly' },
    { value: 16, label: 'Concordia' },
    { value: 17, label: 'Brandi' },
    { value: 18, label: 'Sebastien' },
    { value: 19, label: 'Rosabelle' },
    { value: 20, label: 'Rycca' },
    { value: 21, label: 'Bevvy' },
    { value: 22, label: 'Dorena' },
    { value: 23, label: 'Goran' },
    { value: 24, label: 'Fiann' },
    { value: 25, label: 'Eva' },
    { value: 26, label: 'Dionis' },
    { value: 27, label: 'Terrence' },
    { value: 28, label: 'Amalia' },
    { value: 29, label: 'Ford' },
    { value: 30, label: 'Tommy' },
];

function fetchPagedListboxData(_timeout = 1000, _pagination) {
    return new Promise(_resolve =>
        setTimeout(() => {
            let ldata = clone(data4);
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

export default {
    title: 'FListbox',
    component: FListbox,
};

export const Default = () => ({
    components: { FListbox },
    template: `
        <div>
            <f-listbox :data="data" label="Listbox label" @component-change="onListboxItemSelected" />
            <br />
            Selected: {{ selectedItem }}
        </div>
    `,
    data() {
        return {
            data: [...data],
            selectedItem: '',
        };
    },
    methods: {
        onListboxItemSelected(_item) {
            this.selectedItem = _item.label;
        },
    },
});

export const SelectedItem = () => ({
    components: { FListbox },
    template: `
        <div>
            <span id="fllbl22" class="not-visible">Listbox example</span>
            <f-listbox :data="data" labeled-by="fllbl22" @component-change="onListboxItemSelected" />
            <br />
            Selected: {{ selectedItem }}
        </div>
    `,
    data() {
        return {
            data: data.map((_item, _idx) => (_idx === 3 ? { ..._item, selected: true } : _item)),
            selectedItem: '',
        };
    },
    methods: {
        onListboxItemSelected(_item) {
            this.selectedItem = _item.label;
        },
    },
});

export const Value = () => ({
    components: { FListbox },
    template: `
        <div>
            <span id="fllbl22" class="not-visible">Listbox example</span>
            <f-listbox value="30" :data="data" labeled-by="fllbl22" @component-change="onListboxItemSelected" />
            <br />
            Selected: {{ selectedItem }}
        </div>
    `,
    data() {
        return {
            data: [...data],
            selectedItem: '',
        };
    },
    methods: {
        onListboxItemSelected(_item) {
            this.selectedItem = _item.label;
        },
    },
});

export const ObjectIsValue = () => ({
    components: { FListbox, FButton },
    template: `
        <div>
            <span id="fllbl5" class="not-visible">Listbox example</span>
            <f-listbox v-model="value" :focus-item-on-focus="true" :data="data" labeled-by="fllbl5" @component-change="onListboxItemSelected" />
            <br />
            Selected: {{ value }}
            <f-button secondary size="small" @click.native="onButtonClick">Set value to '30'</f-button>
        </div>
    `,
    data() {
        return {
            data: [...data3],
            value: { id: '10' },
        };
    },
    methods: {
        onButtonClick() {
            this.value = { id: '30' };
        },
        onListboxItemSelected(_item) {
            this.selectedItem = _item.label;
        },
    },
});

export const CircularKeyboardNavigation = () => ({
    components: { FListbox },
    template: `
        <div>
            <span id="fllbl22" class="not-visible">Listbox example</span>
            <f-listbox :circular-navigation="true" :data="data" labeled-by="fllbl22" @component-change="onListboxItemSelected" />
            <br />
            Selected: {{ selectedItem }}
        </div>
    `,
    data() {
        return {
            data: [...data],
            selectedItem: '',
        };
    },
    methods: {
        onListboxItemSelected(_item) {
            this.selectedItem = _item.label;
        },
    },
});

export const RemoteData = () => ({
    components: { FListbox },
    template: `
        <div>
        <span id="fllbl22b" class="not-visible">Listbox example</span>
        <f-listbox
            strategy="remote"
            :per-page="5"
            :data="data"
            :transform-data-func="onTransformData"
            labeled-by="fllbl22b"
            @component-change="onListboxItemSelected"
            @page-change="onPageChange"
            style="max-height: 200px; overflow: auto;"
        >
            <template v-slot="{ item }">
                <i class="co-grey-4">{{ item.value }}</i> &nbsp; {{ item.label }}
            </template>
        </f-listbox>
        <br />
        Selected: {{ selectedItem }}
        </div>
    `,
    data() {
        return {
            data: [],
            selectedItem: '',
        };
    },
    /*mounted() {
        this.data = fetchPagedListboxData(1000, {
            currPage: 1,
            perPage: 5,
            filterText: '',
        });
    },*/
    methods: {
        onPageChange(event) {
            console.log('?QWEQWE', event);
            this.data = fetchPagedListboxData(1000, event);
        },

        onTransformData(data) {
            return {
                totalItems: parseInt(data.totalItems),
                data: data.items,
            };
        },

        onListboxItemSelected(_item) {
            this.selectedItem = _item.label;
        },
    },
});

export const Searchable = () => ({
    components: { FListbox },
    template: `
        <div>
            <span id="fllbl23" class="not-visible">Listbox example</span>
            <f-listbox searchable :throttle-input-interval="500" field-size="large" :data="data" :circular-navigation="true" labeled-by="fllbl23" @component-change="onListboxItemSelected" />
            <br />
            Selected: {{ selectedItem }}
        </div>
    `,
    data() {
        return {
            data: [...data],
            selectedItem: '',
        };
    },
    methods: {
        onListboxItemSelected(_item) {
            this.selectedItem = _item.label;
        },
    },
});

export const Disabled = () => ({
    components: { FListbox },
    template: `
        <div>
            <span id="fllbl23" class="not-visible">Listbox example</span>
            <f-listbox disabled :data="data" :circular-navigation="true" labeled-by="fllbl23" @component-change="onListboxItemSelected" />
            <br />
            Selected: {{ selectedItem }}
        </div>
    `,
    data() {
        return {
            data: [...data],
            selectedItem: '',
        };
    },
    methods: {
        onListboxItemSelected(_item) {
            this.selectedItem = _item.label;
        },
    },
});

export const DisabledItems = () => ({
    components: { FListbox },
    template: `
        <div>
            <span id="fllbl2" class="not-visible">Listbox example</span>
            <f-listbox :data="data" :circular-navigation="true" labeled-by="fllbl2" @component-change="onListboxItemSelected" />
            <br />
            Selected: {{ selectedItem }}
        </div>
    `,
    data() {
        return {
            data: data.map((_item, _idx) =>
                _idx === 0 || _idx === 3 || _idx === 4 ? { ..._item, disabled: true } : _item
            ),
            selectedItem: '',
        };
    },
    methods: {
        onListboxItemSelected(_item) {
            this.selectedItem = _item.label;
        },
    },
});

export const CustomSlot = () => ({
    components: { FListbox },
    template: `
        <div>
            <span id="fllbl3" class="not-visible">Listbox example</span>
            <f-listbox :data="data" labeled-by="fllbl3" @component-change="onListboxItemSelected">
                <template v-slot="{ item, selected, focused }">
                    &#9733; <b>{{ item.label }}</b> selected: <b>{{ selected }}</b>, focused: <b>{{ focused }}</b>
                </template>
            </f-listbox>
            <br />
            Selected: {{ selectedItem }}
        </div>
    `,
    data() {
        return {
            data: [...data],
            selectedItem: '',
        };
    },
    methods: {
        onListboxItemSelected(_item) {
            this.selectedItem = _item.label;
        },
    },
});

export const SelectImmediately = () => ({
    components: { FListbox },
    template: `
        <div>
            <span id="fllbl4" class="not-visible">Listbox example</span>
            <f-listbox :select-immediately="true" :data="data" labeled-by="fllbl4" @component-change="onListboxItemSelected" />
            <br />
            Selected: {{ selectedItem }}
        </div>
    `,
    data() {
        return {
            data: [...data],
            selectedItem: '',
        };
    },
    methods: {
        onListboxItemSelected(_item) {
            this.selectedItem = _item.label;
        },
    },
});

export const FocusItem = () => ({
    components: { FListbox },
    template: `
        <div>
            <span id="fllbl4" class="not-visible">Listbox example</span>
            <f-listbox :focus-item-on-focus="true" :data="data" labeled-by="fllbl4" @component-change="onListboxItemSelected" />
            <br />
            Selected: {{ selectedItem }}
        </div>
    `,
    data() {
        return {
            data: [...data],
            selectedItem: '',
        };
    },
    methods: {
        onListboxItemSelected(_item) {
            this.selectedItem = _item.label;
        },
    },
});

export const Scrollable = () => ({
    components: { FListbox },
    template: `
        <div>
            <span id="fllbl4" class="not-visible">Listbox example</span>
            <f-listbox :data="data" :focus-item-on-focus="true" labeled-by="fllbl4" @component-change="onListboxItemSelected" style="max-height: 300px; overflow: auto;" />
            <br />
            Selected: {{ selectedItem }}
        </div>
    `,
    data() {
        return {
            data: [...data2],
            selectedItem: '',
        };
    },
    methods: {
        onListboxItemSelected(_item) {
            this.selectedItem = _item.label;
        },
    },
});

export const Required = () => ({
    components: { FListbox, FButton, FAriaAlert },
    template: `
        <div>
            <form action="" @submit="onSubmit">
                <f-listbox
                    required
                    validate-on-change
                    @validation-state="_state => submitDisabled = _state.invalid "
                    ref="listbox"
                    :data="data"
                    aria-label="label"
                />
                <br /><br />
                <f-button type="submit" size="small" :disabled="submitDisabled">Submit</f-button>
            </form>

            <f-aria-alert />
        </div>
    `,
    data() {
        return {
            data: [{ label: '---', value: '' }, ...data],
            submitDisabled: false,
        };
    },
    methods: {
        onSubmit(_event) {
            this.$refs.listbox.validate();

            _event.preventDefault();
        },
    },
});

export const Validation = () => ({
    components: { FListbox, FButton, FAriaAlert },
    template: `
        <div>
            <form action="" @submit="onSubmit">
                <f-listbox
                    :validator="validator"
                    validate-on-change
                    @validation-state="_state => submitDisabled = _state.invalid "
                    ref="listbox"
                    :data="data"
                    aria-label="label"
                />
                <br /><br />
                <f-button type="submit" size="small" :disabled="submitDisabled">Submit</f-button>
            </form>

            <f-aria-alert />
        </div>
    `,
    data() {
        return {
            data: [...data],
            submitDisabled: false,
        };
    },
    methods: {
        validator(_value) {
            if (!_value) {
                return 'Select an option';
            } else if (_value === '20') {
                return 'Select another option';
            }

            return '';
        },
        onSubmit(_event) {
            this.$refs.listbox.validate();

            _event.preventDefault();
        },
    },
});

export const Model = () => ({
    components: { FListbox, FButton },
    template: `
        <div>
            <span id="fllbl5" class="not-visible">Listbox example</span>
            <f-listbox v-model="value" :focus-item-on-focus="true" :data="data" labeled-by="fllbl5" @component-change="onListboxItemSelected" />
            <br />
            Selected: {{ value }}
            <f-button secondary size="small" @click.native="onButtonClick">Set value to '30'</f-button>
        </div>
    `,
    data() {
        return {
            data: [...data],
            value: '',
        };
    },
    methods: {
        onButtonClick() {
            this.value = '30';
        },
        onListboxItemSelected(_item) {
            this.selectedItem = _item.label;
        },
    },
});

export const PrependSelectedItem = () => ({
    components: { FListbox, FButton },
    template: `
        <div>
            <span id="fllbl5" class="not-visible">Listbox example</span>
            <f-listbox prepend-selected-items v-model="value" :focus-item-on-focus="true" :data="data" labeled-by="fllbl5" @component-change="onListboxItemSelected" />
            <br />
            Selected: {{ value }}
            <f-button secondary size="small" @click.native="onButtonClick">Set value to '30'</f-button>
        </div>
    `,
    data() {
        return {
            data: [...data],
            value: '',
        };
    },
    methods: {
        onButtonClick() {
            this.value = '30';
        },
        onListboxItemSelected(_item) {
            this.selectedItem = _item.label;
        },
    },
});

export const RemovableItems = () => ({
    components: { FListbox, FButton },
    template: `
        <div>
            <span id="fllbl5" class="not-visible">Listbox example</span>
            <f-listbox removable-items v-model="value" :focus-item-on-focus="true" :data="data" labeled-by="fllbl5" @component-change="onListboxItemSelected" />
            <br />
            Selected: {{ value }}
            <f-button secondary size="small" @click.native="onButtonClick">Set value to '30'</f-button>
        </div>
    `,
    data() {
        return {
            data: [...data],
            value: '',
        };
    },
    methods: {
        onButtonClick() {
            this.value = '30';
        },
        onListboxItemSelected(_item) {
            this.selectedItem = _item.label;
        },
    },
});

export const NonSelectable = () => ({
    components: { FListbox, FButton },
    template: `
        <div>
            <span id="fllbl5" class="not-visible">Listbox example</span>
            <f-listbox non-selectable v-model="value" :focus-item-on-focus="true" :data="data" labeled-by="fllbl5" @component-change="onListboxItemSelected" />
            <br />
            Selected: {{ value }}
            <f-button secondary size="small" @click.native="onButtonClick">Set value to '30'</f-button>
        </div>
    `,
    data() {
        return {
            data: [...data],
            value: '',
        };
    },
    methods: {
        onButtonClick() {
            this.value = '30';
        },
        onListboxItemSelected(_item) {
            this.selectedItem = _item.label;
        },
    },
});

export const Slots = () => ({
    components: { FListbox },
    template: `
        <div>
            <f-listbox :data="data" :focus-item-on-focus="true" aria-label="label">
                <template #top>Top</template>
                <template #bottom>Bottom</template>
            </f-listbox>
        </div>
    `,
    data() {
        return {
            data: [...data],
        };
    },
});

export const InfoText = () => ({
    components: { FListbox },
    template: `
        <div>
            <f-listbox info-text="Info text" label="Label" :data="data" :focus-item-on-focus="true" />
        </div>
    `,
    data() {
        return {
            data: [...data],
        };
    },
});
