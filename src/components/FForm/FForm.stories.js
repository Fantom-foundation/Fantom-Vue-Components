// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import { withA11y } from '@storybook/addon-a11y';

import FForm from './FForm.vue';
import FFormInput from '../FFormInput/FFormInput.vue';
import FButton from '../FButton/FButton.vue';
import FAriaAlert from '../FAriaAlert/FAriaAlert.vue';

export default {
    title: 'FForm',
    component: FForm,
    decorators: [withA11y],
};

export const Default = () => ({
    components: { FForm, FFormInput, FButton },
    template: `
        <f-form class="grid" @submit="_data => { data = {..._data, event: undefined} }">
            <fieldset class="col-6">
                <legend>Default form</legend>
                <div>
                    <div class="mab-5">
                        <f-form-input type="text" label="text" name="text" />
                        <f-form-input type="email" label="email" name="email" />
                        <f-form-input type="number" label="number" name="number" />
                        <f-form-input type="date" label="date" name="date" />
                        <f-form-input type="time" label="time" name="time" />
                    </div>
                    <div class="mab-5">
                        <f-form-input type="textarea" label="textarea" name="textarea" />
                    </div>
                    <div class="mab-5">
                        <f-form-input
                            type="select"
                            label="select"
                            name="select"
                            :data="[
                                { label: '---', value: '' },
                                { label: 'Option 1', value: '10' },
                                { label: 'Option 2', value: '20' },
                                { label: 'Option 3', value: '30' },
                            ]"
                        />
                        <f-form-input
                            type="dropdownlistbox"
                            label="dropdownlistbox"
                            name="dropdownlistbox"
                            :data="[
                                { label: '---', value: '' },
                                { label: 'Option 1', value: '10' },
                                { label: 'Option 2', value: '20' },
                                { label: 'Option 3', value: '30' },
                            ]"
                        />
                    </div>
                    <div class="mab-5">
                        <f-form-input type="checkbox" label="checkbox" name="checkbox" />
                        <br />
                        <f-form-input
                            type="checkboxgroup"
                            label="checkboxgroup"
                            name="checkboxgroup"
                            :data="{ '10': 'Checkbox 1', '20': 'Checkbox 2' }"
                        />
                    </div>
                    <div class="mab-5">
                        <f-form-input type="radio" label="radio" value="10" name="radio" />
                        <f-form-input type="radio" label="Radio 2" value="20" name="radio" />
                        <br />
                        <f-form-input
                            type="radiogroup"
                            label="radiogroup"
                            name="radiogroup"
                            :data="{ '10': 'Radio 1', '20': 'Radio 2', '30': 'Radio 3' }"
                        />
                    </div>
                    <div class="mab-5">
                        <f-form-input
                            type="listbox"
                            name="listbox"
                            label="Listbox"
                            :data="[
                                { label: 'item 1', value: '10' },
                                { label: 'item 2', id: 'myid3', value: '20' },
                                { label: 'item 3 Lorem ipsum', value: '30' },
                            ]"
                        />
                    </div>
                    <div>
                        <f-button type="submit" label="Submit" />
                        <f-button type="reset" label="Reset" />
                    </div>
                </div>
            </fieldset>
            <pre class="col-6">
{{ data }}
            </pre>
        </f-form>
    `,
    data() {
        return {
            data: {},
        };
    },
});

export const Values = () => ({
    components: { FForm, FFormInput, FButton },
    template: `
        <f-form :values="values" class="grid" @submit="onSubmit">
            <fieldset class="col-6">
                <legend>Initial values</legend>
                <div>
                    <div class="mab-5">
                        <f-form-input type="text" label="text" name="text" />
                        <f-form-input type="email" label="email" name="email" />
                        <f-form-input type="number" label="number" name="number" />
                        <f-form-input type="date" label="date" name="date" />
                        <f-form-input type="time" label="time" name="time" />
                    </div>
                    <div class="mab-5">
                        <f-form-input type="textarea" label="textarea" name="textarea" />
                    </div>
                    <div class="mab-5">
                        <f-form-input
                            type="select"
                            label="select"
                            name="select"
                            :data="[
                                { label: '---', value: '' },
                                { label: 'Option 1', value: '10' },
                                { label: 'Option 2', value: '20' },
                                { label: 'Option 3', value: '30' },
                            ]"
                        />
                        <f-form-input
                            type="dropdownlistbox"
                            label="dropdownlistbox"
                            name="dropdownlistbox"
                            :data="[
                                { label: '---', value: '' },
                                { label: 'Option 1', value: '10' },
                                { label: 'Option 2', value: '20' },
                                { label: 'Option 3', value: '30' },
                            ]"
                        />
                    </div>
                    <div class="mab-5">
                        <f-form-input type="checkbox" label="checkbox" name="checkbox" />
                        <br />
                        <f-form-input
                            type="checkboxgroup"
                            label="checkboxgroup"
                            name="checkboxgroup"
                            :data="{ '10': 'Checkbox 1', '20': 'Checkbox 2' }"
                        />
                    </div>
                    <div class="mab-5">
                        <f-form-input type="radio" label="radio" value="10" name="radio" />
                        <f-form-input type="radio" label="Radio 2" value="20" name="radio" />
                        <br />
                        <f-form-input
                            type="radiogroup"
                            label="radiogroup"
                            name="radiogroup"
                            :data="{ '10': 'Radio 1', '20': 'Radio 2', '30': 'Radio 3' }"
                        />
                    </div>
                    <div class="mab-5">
                        <f-form-input
                            type="listbox"
                            name="listbox"
                            label="Listbox"
                            :data="[
                                { label: 'item 1', value: '10' },
                                { label: 'item 2', id: 'myid3', value: '20' },
                                { label: 'item 3 Lorem ipsum', value: '30' },
                            ]"
                        />
                    </div>
                    <div>
                        <f-button type="submit" label="Submit" />
                        <f-button type="reset" label="Reset" />
                    </div>
                </div>
            </fieldset>
            <pre class="col-6">
{{ data }}
            </pre>
        </f-form>
    `,
    data() {
        return {
            values: {
                text: 'text',
                textarea: 'text',
                select: '20',
                dropdownlistbox: '10',
                checkbox: true,
                checkboxgroup: ['10', '20'],
                radio: '10',
                radiogroup: '30',
                listbox: '30',
            },
            data: {},
        };
    },
    methods: {
        onSubmit(_data) {
            this.data = { ..._data, event: undefined };
        },
    },
});

export const Model = () => ({
    components: { FForm, FFormInput, FButton },
    template: `
        <f-form v-model="values" class="grid" @submit="onSubmit">
            <fieldset class="col-6">
                <legend>Model</legend>
                <div>
                    <div class="mab-5">
                        <f-form-input type="text" label="text" name="text" />
                        <f-form-input type="email" label="email" name="email" />
                        <f-form-input type="number" label="number" name="number" />
                        <f-form-input type="date" label="date" name="date" />
                        <f-form-input type="time" label="time" name="time" />
                    </div>
                    <div class="mab-5">
                        <f-form-input type="textarea" label="textarea" name="textarea" />
                    </div>
                    <div class="mab-5">
                        <f-form-input
                            type="select"
                            label="select"
                            name="select"
                            :data="[
                                { label: '---', value: '' },
                                { label: 'Option 1', value: '10' },
                                { label: 'Option 2', value: '20' },
                                { label: 'Option 3', value: '30' },
                            ]"
                        />
                        <f-form-input
                            type="dropdownlistbox"
                            label="dropdownlistbox"
                            name="dropdownlistbox"
                            :data="[
                                { label: '---', value: '' },
                                { label: 'Option 1', value: '10' },
                                { label: 'Option 2', value: '20' },
                                { label: 'Option 3', value: '30' },
                            ]"
                        />
                    </div>
                    <div class="mab-5">
                        <f-form-input type="checkbox" label="checkbox" name="checkbox" />
                        <br />
                        <f-form-input
                            type="checkboxgroup"
                            label="checkboxgroup"
                            name="checkboxgroup"
                            :data="{ '10': 'Checkbox 1', '20': 'Checkbox 2' }"
                        />
                    </div>
                    <div class="mab-5">
                        <f-form-input type="radio" label="radio" value="10" name="radio" />
                        <f-form-input type="radio" label="Radio 2" value="20" name="radio" />
                        <br />
                        <f-form-input
                            type="radiogroup"
                            label="radiogroup"
                            name="radiogroup"
                            :data="{ '10': 'Radio 1', '20': 'Radio 2', '30': 'Radio 3' }"
                        />
                    </div>
                    <div class="mab-5">
                        <f-form-input
                            type="listbox"
                            name="listbox"
                            label="Listbox"
                            :data="[
                                { label: 'item 1', value: '10' },
                                { label: 'item 2', id: 'myid3', value: '20' },
                                { label: 'item 3 Lorem ipsum', value: '30' },
                            ]"
                        />
                    </div>
                    <div>
                        <f-button type="submit" label="Submit" />
                        <f-button type="reset" label="Reset" />
                    </div>
                </div>
            </fieldset>
            <pre class="col-6">
Values:
{{ values }}

On submit:
{{ data }}
            </pre>
        </f-form>
    `,
    data() {
        return {
            values: {
                dropdownlistbox: '10',
                checkbox: true,
                checkboxgroup: ['10'],
                radio: '10',
                radiogroup: '30',
                listbox: '10',
            },
            data: {},
        };
    },
    methods: {
        onSubmit(_data) {
            this.data = { ..._data, event: undefined };
        },
    },
});

export const Validation = () => ({
    components: { FForm, FFormInput, FButton, FAriaAlert },
    template: `
        <f-form :values="values" class="grid" @submit="onSubmit" v-slot="fprops">
            <fieldset class="col-6">
                <legend>Initial values</legend>
                <div>
                    <div class="mab-5">
                        <f-form-input
                            :validator="_value => (!_value.trim() ? 'Required' : '')"
                            validate-on-input
                            type="text"
                            label="text"
                            name="text"
                        />
                        <f-form-input
                            :validator="asyncValidator"
                            validate-on-input
                            type="text"
                            label="async validator"
                            name="text2"
                        />
                        <f-form-input
                            :validator="numberValidator"
                            validate-on-input
                            type="number"
                            label="number"
                            name="number"
                        />
                    </div>
                    <div class="mab-5">
                        <f-form-input type="textarea" label="textarea" name="textarea" />
                    </div>
                    <div class="mab-5">
                        <f-form-input
                            :validator="_value => (!_value.trim() ? 'Required' : '')"
                            validate-on-change
                            type="select"
                            label="select"
                            name="select"
                            :data="[
                                { label: '---', value: '' },
                                { label: 'Option 1', value: '10' },
                                { label: 'Option 2', value: '20' },
                                { label: 'Option 3', value: '30' },
                            ]"
                        />
                        <f-form-input
                            :validator="_value => (!_value.trim() ? 'Required' : '')"
                            validate-on-change
                            type="dropdownlistbox"
                            label="dropdownlistbox"
                            name="dropdownlistbox"
                            :data="[
                                { label: '---', value: '' },
                                { label: 'Option 1', value: '10' },
                                { label: 'Option 2', value: '20' },
                                { label: 'Option 3', value: '30' },
                            ]"
                        />
                    </div>
                    <div class="mab-5">
                        <f-form-input
                            :validator="_value => (_value.length === 0 ? 'Required' : '')"
                            validate-on-change
                            type="checkboxgroup"
                            label="checkboxgroup"
                            name="checkboxgroup"
                            :data="{ '10': 'Checkbox 1', '20': 'Checkbox 2' }"
                        />
                    </div>
                    <div class="mab-5">
                        <f-form-input
                            :validator="_value => (_value.length === 0 ? 'Required' : '')"
                            validate-on-change
                            type="radiogroup"
                            label="radiogroup"
                            name="radiogroup"
                            :data="{ '10': 'Radio 1', '20': 'Radio 2', '30': 'Radio 3' }"
                        />
                    </div>
                    <div class="mab-5">
                        <f-form-input
                            :validator="_value => (!_value.trim() ? 'Required' : '')"
                            validate-on-change
                            type="listbox"
                            name="listbox"
                            label="Listbox"
                            :data="[
                                { label: '---', value: '' },
                                { label: 'Option 1', value: '10' },
                                { label: 'Option 2', value: '20' },
                                { label: 'Option 3', value: '30' },
                            ]"
                        />
                    </div>
                    <div>
                        <f-button type="submit" label="Submit" :disabled="fprops.pendingValidation || fprops.errorMessages.length > 0" />
                        <f-button type="reset" label="Reset" :disabled="fprops.pendingValidation || fprops.errorMessages.length > 0" />
                    </div>
                </div>
            </fieldset>
            <pre class="col-6">
pendingValidation
{{ fprops.pendingValidation }}

errorMessages
{{ fprops.errorMessages }}

elementStates
{{ fprops.elementStates }}

lastChangedElement
{{ fprops.lastChangedElement }}
            </pre>
            <f-aria-alert />
        </f-form>
    `,
    data() {
        return {
            values: {
                text: 'text',
                textarea: 'text',
                checkbox: true,
                radio: '10',
            },
            data: {},
        };
    },
    methods: {
        numberValidator(_value) {
            const value = parseFloat(_value);

            if (isNaN(value) || value < 3 || value > 10) {
                return 'Value must be between 3 and 10';
            }

            return '';
        },

        asyncValidator(_value) {
            return new Promise(_resolve =>
                setTimeout(() => {
                    _resolve(!_value.trim() ? 'Required' : '');
                }, 1500)
            );
        },

        onSubmit(_data) {
            this.data = { ..._data, event: undefined };
        },
    },
});
