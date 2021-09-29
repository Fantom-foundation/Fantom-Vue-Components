import FListbox from '@/components/FListbox/FListbox.vue';
import FButton from '@/components/FButton/FButton.vue';

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

export default {
    title: 'FListbox/Multiselect',
    // component: FListbox,
};

export const Value = () => ({
    components: { FListbox },
    template: `
        <div>
            <span id="fllbl22" class="not-visible">Listbox example</span>
            <f-listbox multiselect :value="['30', '50']" :data="data" labeled-by="fllbl22" @component-change="onListboxItemsSelected" />
            <br />
            Selected: {{ selectedItems }}
        </div>
    `,
    data() {
        return {
            data: [...data],
            selectedItems: [],
        };
    },
    methods: {
        onListboxItemsSelected(_items) {
            console.log(_items);
            this.selectedItems = _items;
        },
    },
});

export const Model = () => ({
    components: { FListbox, FButton },
    template: `
        <div>
        <span id="fllbl5" class="not-visible">Listbox example</span>
        <f-listbox v-model="value" multiselect :focus-item-on-focus="true" :data="data" labeled-by="fllbl5" />
        <br />
        Selected: {{ value }}
        <f-button secondary size="small" @click.native="onButtonClick">Set value to ['30', '50']</f-button>
        </div>
    `,
    data() {
        return {
            data: [...data],
            value: [],
        };
    },
    methods: {
        onButtonClick() {
            this.value = ['30', '50'];
        },
    },
});
