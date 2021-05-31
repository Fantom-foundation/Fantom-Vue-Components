import { withA11y } from '@storybook/addon-a11y';

import FDropdownListbox from './FDropdownListbox.vue';
import FButton from '../FButton/FButton.vue';
import FAriaAlert from '../FAriaAlert/FAriaAlert.vue';

const data = [
    { label: 'item 1', value: '10' },
    { label: 'item 2', id: 'myid', value: '20' },
    { label: 'item 3 Lorem ipsum', value: '30' },
    { label: 'item 4', value: '40' },
    { label: 'item 5', value: '50' },
    { label: 'item 6', value: '60' },
];

const data2 = [];

for (let i = 1; i < 200; i++) {
    data2.push({
        label: i === 8 ? `Loooooooooooooooooooooooooooooooooooooong` : `item ${i}`,
        value: `${i * 10}`,
    });
}

const data3 = [
    { label: 'item 1', value: '10' },
    { label: 'item 2 Looooooooooooooooong', id: 'myid', value: '20' },
];

export default {
    title: 'FDropdownListbox',
    component: FDropdownListbox,
    decorators: [withA11y],
};

export const Default = () => ({
    components: { FDropdownListbox },
    template: `
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            <f-dropdown-listbox :data="data" @component-change="onListboxItemSelected" />
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
    components: { FDropdownListbox },
    template: `
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            <f-dropdown-listbox :data="data" />
            <button @click="data = [...newData]">new data</button>
        </div>
    `,
    data() {
        return {
            data: data.map((_item, _idx) => (_idx === 3 ? { ..._item, selected: true } : _item)),
            newData: [...data3],
        };
    },
    methods: {},
});

export const Value = () => ({
    components: { FDropdownListbox },
    template: `
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            <f-dropdown-listbox value="20" :data="data" />
        </div>
    `,
    data() {
        return {
            data: [...data],
        };
    },
    methods: {},
});

export const LotOfItems = () => ({
    components: { FDropdownListbox },
    template: `
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            <f-dropdown-listbox :data="data" labeled-by="fllbl1" />
        </div>
    `,
    data() {
        return {
            data: [...data2],
        };
    },
    methods: {},
});

export const Disabled = () => ({
    components: { FDropdownListbox },
    template: `
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            <f-dropdown-listbox disabled :data="data" />
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
    methods: {},
});

export const DisabledItems = () => ({
    components: { FDropdownListbox },
    template: `
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            <f-dropdown-listbox :data="data" />
        </div>
    `,
    data() {
        return {
            data: data.map((_item, _idx) =>
                _idx === 0 || _idx === 3 || _idx === 4 ? { ..._item, disabled: true } : _item
            ),
        };
    },
    methods: {},
});

export const SelectOnMainAction = () => ({
    components: { FDropdownListbox },
    template: `
        <div>
            Select an item only by pressing the 'Enter' key or by clicking on the item.
            <f-dropdown-listbox select-on-main-action :data="data" />
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
    methods: {},
});

export const VariableWidth = () => ({
    components: { FDropdownListbox },
    template: `
        <div>
            Width of the component will not be automatically adjusted according to the longest item.
            <f-dropdown-listbox variable-width :data="data" />
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
    methods: {},
});

export const CustomButtonLabelSlot = () => ({
    components: { FDropdownListbox },
    template: `
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            <f-dropdown-listbox :data="data">
                <template v-slot:buttonLabel="{ item }">
                    &#9733; <b>{{ item.label }}</b>
                </template>
            </f-dropdown-listbox>
        </div>
    `,
    data() {
        return {
            data: [...data],
        };
    },
    methods: {},
});

export const CustomItemSlot = () => ({
    components: { FDropdownListbox },
    template: `
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            <f-dropdown-listbox :data="data">
                <template v-slot:item="{ item }">
                    &#9733; <b>{{ item.label }}</b>
                </template>
            </f-dropdown-listbox>
        </div>
    `,
    data() {
        return {
            data: [...data],
        };
    },
    methods: {},
});

export const CustomButtonLabelAndItemSlot = () => ({
    components: { FDropdownListbox },
    template: `
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            <f-dropdown-listbox :data="data">
                <template v-slot:buttonLabel="{ item }">
                    &#9733; <b>{{ item.label }}</b>
                </template>
                <template v-slot:item="{ item }">
                    &#9733; <b>{{ item.label }}</b>
                </template>
            </f-dropdown-listbox>
        </div>
    `,
    data() {
        return {
            data: [...data],
        };
    },
    methods: {},
});

export const Text = () => ({
    components: { FDropdownListbox, FButton },
    template: `
        <div style="max-width: 400px; margin: 0 auto">
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aut dolorum et inventore quidem unde, vitae? Aliquid, cupiditate error eveniet impedit iste maiores nemo porro provident quasi quod totam voluptate?</div><div>Asperiores consequatur culpa deserunt doloremque eius excepturi exercitationem iusto molestias, nihil officiis perferendis possimus, quo, sapiente sequi ut. Ad blanditiis consectetur ea exercitationem fugiat laborum maiores maxime, nostrum numquam! Molestias?</div><div>Ab alias, amet at deleniti fugit ipsa laboriosam laudantium libero maxime modi molestias natus nihil, odio officiis repudiandae sapiente sequi, sint suscipit vitae voluptatem! Assumenda consectetur eius eligendi nulla velit?</div><div>Architecto cum error provident quae repudiandae soluta vero. Ad aliquid asperiores assumenda distinctio dolor ex facere illum libero magni natus neque, officia officiis perspiciatis possimus quia sapiente veritatis vitae voluptate.</div>
            <f-dropdown-listbox v-model="value" :focus-item-on-focus="true" :data="data" />
            <f-button secondary size="small" @click.native="onButtonClick">Set value to '30'</f-button>
            <br />
            Selected: {{ value }}
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa cumque ipsum iusto voluptatum? Consectetur cumque cupiditate debitis dicta dolore enim exercitationem facilis fuga impedit, laboriosam laborum obcaecati odit praesentium reiciendis.</div><div>Ab commodi dolor, harum incidunt ipsa ipsam odio provident veniam? Eaque eum laudantium totam! A, aliquam aperiam, beatae, debitis delectus eaque fuga modi numquam perspiciatis possimus quo quos! Quasi, voluptate!</div><div>Ab aliquam autem corporis eligendi ex, harum incidunt libero maiores molestias necessitatibus neque perferendis possimus quae quasi repudiandae. Asperiores, deleniti dolores ipsam mollitia nulla omnis reprehenderit. Delectus dicta illo maiores?</div><div>At blanditiis delectus dolorem explicabo ipsum maiores officiis repellat. Alias aperiam architecto aut, consectetur deleniti earum ex exercitationem hic illum in labore laborum laudantium molestias quos recusandae tenetur voluptate! Distinctio.</div><div>A aliquam aliquid animi aspernatur aut autem dolores doloribus exercitationem explicabo facilis hic laboriosam laborum maiores minima necessitatibus nemo non omnis praesentium, rem suscipit temporibus voluptatem voluptates. Nesciunt, provident, vero?</div>
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
    },
});

export const Validation = () => ({
    components: { FDropdownListbox, FButton, FAriaAlert },
    template: `
        <div>
            <form action="" @submit="onSubmit">
                <f-dropdown-listbox
                    :validator="validator"
                    validate-on-change
                    @validation-state="_state => submitDisabled = _state.invalid "
                    ref="dropdownlistbox"
                    :focus-item-on-focus="true"
                    :data="data"
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
        validator(_value) {
            if (!_value) {
                return 'Select an option';
            } else if (_value === '20') {
                return 'Select another option';
            }

            return '';
        },
        onSubmit(_event) {
            this.$refs.dropdownlistbox.validate();

            _event.preventDefault();
        },
    },
});

export const Model = () => ({
    components: { FDropdownListbox, FButton },
    template: `
        <div>
            <f-dropdown-listbox v-model="value" :focus-item-on-focus="true" :data="data" />
            <f-button secondary size="small" @click.native="onButtonClick">Set value to '30'</f-button>
            <br />
            Selected: {{ value }}
        </div>
    `,
    data() {
        return {
            data: [...data],
            value: '40',
        };
    },
    methods: {
        onButtonClick() {
            this.value = '30';
        },
    },
});

export const Slots = () => ({
    components: { FDropdownListbox },
    template: `
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            <f-dropdown-listbox :data="data">
                <template #top>Top</template>
                <template #bottom>Bottom</template>
            </f-dropdown-listbox>
        </div>
    `,
    data() {
        return {
            data: [...data],
        };
    },
});

export const InfoText = () => ({
    components: { FDropdownListbox },
    template: `
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            <f-dropdown-listbox :data="data" info-text="Info text" label="Label" />
        </div>
    `,
    data() {
        return {
            data: [...data],
        };
    },
});
