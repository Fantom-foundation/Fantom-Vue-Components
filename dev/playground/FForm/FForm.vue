<template>
    <section>
        <h1 class="h2">Form</h1>

        <f-form center-form @submit="onFormSubmit" @reset="onFormReset" class="grid">
            <fieldset class="col-8">
                <legend>Test form 2</legend>
                <div class="fform_fieldset_body">
                    <div class="fform_row fl">
                        <f-input label="Input 1" v-model="values.input1" validate-on-input :validator="inputValidator">
                            <template #bottom="sProps">
                                <f-message v-show="sProps.showErrorMessage" type="error" role="alert">
                                    Fill input 1
                                </f-message>
                            </template>
                        </f-input>
                        <f-input label="Input 2" v-model="values.input2" validate-on-input :validator="inputValidator">
                            <template #bottom="sProps">
                                <f-message v-show="sProps.showErrorMessage" type="error" role="alert">
                                    Fill input 2
                                </f-message>
                            </template>
                        </f-input>
                    </div>
                    <div class="fform_row fl-wrap">
                        <f-option type="checkbox" label="Checkbox 1" v-model="values.checkbox1" />
                        <f-option type="checkbox" label="Checkbox 2" v-model="values.checkbox2" />
                    </div>
                    <div class="fform_row fl-wrap">
                        <f-option type="checkbox" label="Checkbox multi 1" v-model="values.checkboxMulti" value="10" />
                        <f-option type="checkbox" label="Checkbox multi 2" v-model="values.checkboxMulti" value="20" />
                        <f-option type="checkbox" label="Checkbox multi 3" v-model="values.checkboxMulti" value="30" />
                    </div>
                    <div class="fform_row fl-center">
                        <f-option type="radio" v-model="values.radio1" label="yes" name="rad1" value="10" />
                        <f-option type="radio" v-model="values.radio1" label="no" name="rad1" value="20" />
                        <f-option type="radio" v-model="values.radio1" label="ok" name="rad1" value="30" />
                    </div>
                    <div class="fform_row">
                        <f-dropdown-listbox v-model="values.dropdown1" :data="data.dropdown" />
                    </div>
                    <div class="fform_row">
                        <f-listbox v-model="values.listbox1" :data="data.listbox" value="300" />
                    </div>
                    <div class="fform_row">
                        <f-select v-model="values.select1" label="Default" :data="data.select" />
                    </div>
                </div>
            </fieldset>
            <div>
                <f-button type="submit" label="Submit" />
                <f-button type="reset" label="Reset" />
            </div>
        </f-form>
    </section>
</template>

<script>
import FForm from '@/components/FForm/FForm.vue';
import FInput from '@/components/FInput/FInput.vue';
import FOption from '@/components/FOption/FOption.vue';
import FSelect from '@/components/FSelect/FSelect.vue';
import FButton from '@/components/FButton/FButton.vue';
import FDropdownListbox from '@/components/FDropdownListbox/FDropdownListbox.vue';
import FListbox from '@/components/FListbox/FListbox.vue';
import FMessage from '@/components/FMessage/FMessage.vue';

import { ffData, getValues, resetValues } from './data.js';

export default {
    name: 'FFormPlayground',

    components: { FMessage, FListbox, FDropdownListbox, FButton, FSelect, FOption, FInput, FForm },

    data() {
        return {
            data: {
                select: [
                    { label: 'Option 1', value: 1 },
                    { label: 'Option 2', value: 2 },
                    { label: 'Option 3', value: 3 },
                ],
                dropdown: [
                    { label: 'item 1', value: '10' },
                    { label: 'item 2', id: 'myid', value: '20' },
                    { label: 'item 3 Lorem ipsum', value: '30' },
                    { label: 'item 4', value: '40' },
                    { label: 'item 5', value: '50' },
                    { label: 'item 6', value: '60' },
                ],
                listbox: [
                    { label: 'item 100', value: '100' },
                    { label: 'item 200', id: 'myid', value: '200' },
                    { label: 'item 300 Lorem ipsum', value: '300' },
                ],
            },
            values: getValues(ffData()),
            /*
            values: {
                input1: 'value',
                input2: '',
                checkbox1: false,
                checkbox2: true,
                checkboxMulti: [],
                radio1: '10',
                dropdown1: '',
                listbox1: '300',
                select1: '',
            },
*/
        };
    },

    methods: {
        inputValidator(_value) {
            return !!_value.trim();
        },

        updateData() {
            const { values } = this;

            values.checkbox1 = true;
            values.checkboxMulti = ['10', '20'];
            values.dropdown1 = '40';
            values.listbox1 = '200';

            this.data.listbox[0].label = '123';
        },

        onFormSubmit() {
            console.log('onFormSubmit2', this.dt);
            this.updateData();
        },

        onFormReset() {
            resetValues(this.values, ffData());
        },

        onFormChange(_data) {
            console.log('onFormChange', _data);
            console.log(_data.eTarget.name);
        },
    },
};
</script>

<style lang="scss">
@use 'fform';
</style>
