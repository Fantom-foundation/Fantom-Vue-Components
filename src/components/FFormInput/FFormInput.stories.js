// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import { withA11y } from '@storybook/addon-a11y';

import FFormInput from './FFormInput.vue';
import FForm from '../FForm/FForm.vue';

export default {
    title: 'FFormInput',
    component: FFormInput,
    decorators: [withA11y],
};

export const Default = () => ({
    components: { FFormInput, FForm },
    template: `
        <f-form>
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
                <f-form-input type="passwordfield" label="passwordfield" name="passwordfield" />
            </div>
            <div class="mab-5">
                <f-form-input type="slider" label="slider" name="slider" use-lower-fill-bar step="10" />
            </div>
            <div class="mab-5">
                <f-form-input
                    type="select"
                    label="select"checkbox
                    name="select"
                    :data="[
                        { label: '---', value: '' },
                        { label: 'Option 1', value: 1 },
                        { label: 'Option 2', value: 2 },
                        { label: 'Option 3', value: 3 },
                    ]"
                />
                <f-form-input
                    type="dropdownlistbox"
                    label="dropdownlistbox"
                    name="dropdownlistbox"
                    :data="[
                        { label: '---', value: '' },
                        { label: 'Option 1', value: 1 },
                        { label: 'Option 2', value: 2 },
                        { label: 'Option 3', value: 3 },
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
                    column
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
                    column
                    :data="{ '10': 'Radio 1', '20': 'Radio 2', '30': 'Radio 3' }"
                />
            </div>
            <div class="mab-5">
                <f-form-input type="toggle" label="toggle" name="toggle" />
            </div>
            <div class="mab-5">
                <f-form-input
                    type="listbox"
                    name="listbox"
                    label="Listbox"
                    :data="[
                        { label: 'item 100', value: '100' },
                        { label: 'item 200', id: 'myid3', value: '200' },
                        { label: 'item 300 Lorem ipsum', value: '300' },
                    ]"
                />
            </div>
        </f-form>
    `,
});
