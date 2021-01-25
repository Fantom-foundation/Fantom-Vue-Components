import { withA11y } from '@storybook/addon-a11y';

import FSelect from './FSelect.vue';
import FMessage from '../FMessage/FMessage.vue';
import FButton from '../FButton/FButton.vue';

function validator(_value) {
    return _value === '2';
}

const data = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
];

const data2 = [
    { label: 'Select an option', value: null, disabled: true },
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
];

const data3 = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2, selected: true },
    { label: 'Option 3', value: 3 },
];

export default {
    title: 'FSelect',
    component: FSelect,
    decorators: [withA11y],
};

export const Default = () => ({
    components: { FSelect },
    template: `
        <div>
            <f-select label="Large" select-size="large" :data="data2" />
            <f-select label="Default" :data="data" />
            <f-select label="Small" select-size="small" :data="data" />
            <f-select label="Mini" select-size="mini" :data="data" />
        </div>
    `,
    data() {
        return {
            data: [...data],
            data2: [...data2],
        };
    },
});

export const Disabled = () => ({
    components: { FSelect },
    template: `
        <div>
            <f-select disabled label="Large" select-size="large" :data="data2" />
            <f-select disabled label="Default" :data="data" />
            <f-select disabled label="Small" select-size="small" :data="data" />
            <f-select disabled label="Mini" select-size="mini" :data="data" />
        </div>
    `,
    data() {
        return {
            data: [...data],
            data2: [...data2],
        };
    },
});

export const Invalid = () => ({
    components: { FSelect },
    template: `
        <div>
            <f-select invalid label="Large" select-size="large" :data="data2" />
            <f-select invalid label="Default" :data="data" />
            <f-select invalid label="Small" select-size="small" :data="data" />
            <f-select invalid label="Mini" select-size="mini" :data="data" />
        </div>
    `,
    data() {
        return {
            data: [...data],
            data2: [...data2],
        };
    },
});

export const SelectedItem = () => ({
    components: { FSelect },
    template: `
        <div>
            <f-select :data="data" />
        </div>
    `,
    data() {
        return {
            data: [...data3],
        };
    },
});

export const Value = () => ({
    components: { FSelect },
    template: `
        <div>
            <f-select value="3" :data="data" />
        </div>
    `,
    data() {
        return {
            data: [...data],
        };
    },
});

export const Validator = () => ({
    components: { FSelect, FMessage },
    template: `
        <div>
            <f-select
                label="onchange validation"
                value="2"
                :validator="validator"
                :data="[{label: 'Option 1', value: 1}, {label: 'Option 2', value: 2}, {label: 'Option 3', value: 3}]"
            >
                <template #bottom="sProps">
                    <f-message v-if="sProps.showErrorMessage" type="error" with-icon>an error</f-message>
                    <f-message type="info" with-icon>Option 2 must be selected</f-message>
                </template>
            </f-select>
        </div>
    `,
    methods: { validator },
});

export const Model = () => ({
    components: { FSelect, FButton },
    template: `
        <div>
            <f-select
                name="bla"
                v-model="sel"
                :data="data"
            />
            Selected: {{ sel }}
            <f-button secondary size="small" @click.native="sel = '1'">Set value to '1'</f-button>
        </div>
    `,
    data() {
        return {
            sel: '3',
            data: [...data3],
        };
    },
});

export const Slots = () => ({
    components: { FSelect },
    template: `
        <div>
            <f-select value="3" :data="data">
                <template #top>Top</template>
                <template #bottom>Bottom</template>
            </f-select>
        </div>
    `,
    data() {
        return {
            data: [...data],
        };
    },
});
