<template>
    <section>
        <h1 class="h2">Form</h1>

        <f-form v-model="values" @submit="onFormSubmit" @reset="onFormReset" class="grid">
            <fieldset class="col-8">
                <legend>Test form</legend>
                <div class="fform_fieldset_body">
                    <div class="fform_row">
                        <f-form-input name="input1" label="input 1" validate-on-input :validator="inputValidator">
                            <template #bottom="sProps">
                                <f-message v-show="sProps.showErrorMessage" type="error" role="alert">
                                    Fill input 1
                                </f-message>
                            </template>
                        </f-form-input>
                        <div>
                            <f-form-input v-if="c1 === true" key="fff" name="input2" placeholder="12345">
                                <template #label="labelProps">
                                    <label :for="labelProps.id"><b>&#9742; Phone</b></label>
                                </template>
                            </f-form-input>
                        </div>
                    </div>

                    <div class="fform_row">
                        <f-form-input type="textarea" name="textarea1" label="Textarea" />
                    </div>

                    <div class="fform_row">
                        <f-form-input type="checkbox" name="checkbox1" label="Checkbox 1" />
                        <f-form-input type="checkbox" name="checkbox2" label="Checkbox 2" />
                    </div>

                    <div class="fform_row">
                        <f-form-input type="checkbox" name="c1" label="c1" v-model="c1" />
                        <f-form-input type="checkbox" label="c2" v-model="c2" />
                        <button @click="c2 = true">
                            bla
                        </button>
                    </div>

                    <div class="fform_row">
                        <f-form-input type="checkbox" name="checkbox3" label="Multi checkboxes" :data="testos" />
                    </div>

                    <div class="fform_row">
                        <f-form-input
                            type="checkbox"
                            label="Multi checkboxes"
                            v-model="c3"
                            :data="{ '10': 'c3 1', '20': 'c3 2' }"
                        />
                    </div>

                    <div class="fform_row">
                        <f-form-input
                            type="checkbox"
                            name="checkbox4"
                            label="Multi checkboxes 2"
                            :data="[
                                { label: 'Checkbox multi 1', value: '10' },
                                { label: 'Checkbox multi 2', value: '20' },
                            ]"
                        />
                    </div>

                    <div class="fform_row">
                        <f-form-input
                            type="radio"
                            name="radio1"
                            label="Radio"
                            class="fforminput-column"
                            :data="{ '10': 'Radio 1', '20': 'Radio 2', '30': 'Radio 3' }"
                        />
                    </div>

                    <div class="fform_row">
                        <f-form-input
                            type="select"
                            name="select1"
                            label="Select"
                            :data="[
                                { label: 'Option 1', value: 1 },
                                { label: 'Option 2', value: 2 },
                                { label: 'Option 3', value: 3 },
                            ]"
                        />
                    </div>

                    <div class="fform_row">
                        <f-form-input
                            type="dropdownlistbox"
                            name="dropdown1"
                            label="dropdownlistbox"
                            :data="data.dropdown"
                        >
                            <template v-slot:buttonLabel="{ item }">
                                &#9733; <b>{{ item.label }}</b>
                            </template>
                            <template v-slot:item="{ item }">
                                &#9733; <b>{{ item.label }}</b>
                            </template>
                        </f-form-input>
                    </div>

                    <div class="fform_row">
                        <f-form-input
                            type="listbox"
                            name="listbox1"
                            label="Listbox"
                            :data="[
                                { label: 'item 100', value: '100' },
                                { label: 'item 200', id: 'myid', value: '200' },
                                { label: 'item 300 Lorem ipsum', value: '300' },
                            ]"
                        />
                    </div>

                    <div class="fform_row">
                        <div class="fforminput">
                            <f-option type="checkbox" label="Checkbox 1" v-model="chk" />
                            {{ chk }}
                        </div>
                    </div>
                </div>
            </fieldset>
            <div class="col-4">
                <pre>
c1: {{ c1 }}, c2: {{ c2 }}, c3: {{ c3 }} <br />
{{ values }}
</pre>
            </div>
            <div>
                <f-button type="submit" label="Submit" />
                <f-button type="reset" label="Reset" />
            </div>
        </f-form>
    </section>
</template>

<script>
import FForm from '@/components/FForm/FForm.vue';
import FButton from '@/components/FButton/FButton.vue';

import FFormInput from '@/components/FFormInput/FFormInput.vue';
import FOption from '@/components/FOption/FOption.vue';
import FMessage from '@/components/FMessage/FMessage.vue';

export default {
    name: 'FFormPlayground2',

    components: { FMessage, FOption, FFormInput, FButton, FForm },

    data() {
        return {
            testos: { '10': 'Checkbox multi 1', '20': 'Checkbox multi 2' },
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
            values: {
                input1: 'default',
                dropdown1: '20',
                checkbox2: true,
                checkbox3: ['10'],
                listbox1: '200',
                radio1: '10',
            },
            c1: false,
            c2: false,
            c3: [],
            chk: false,
            // values: getValues(ffData()),
            fff: false,
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

        updateTestos() {
            // this.testos = { '10': 'Checkbox multi 1', '20': 'ssss' };
            this.testos = { '10': 'BITCH' };
            // this.$set(this.testos, '20', 'ssssssss');
            console.log('!@#');
        },

        /*
        updateData() {
            const { values } = this;

            values.checkbox1 = true;
            values.checkboxMulti = ['10', '20'];
            values.dropdown1 = '40';
            values.listbox1 = '200';

            this.data.listbox[0].label = '123';
        },
        */

        onFormSubmit(_data) {
            this.fff = true;
            console.log(_data.values);
            console.log(_data.lastChangedElem);
            // console.log('onFormSubmit2', this.dt);
            // this.updateData();
        },

        onFormReset(_data) {
            console.log('onFormReset', _data.values);
        },

        onFormChange(_data) {
            console.log('onFormChange', _data);
            console.log(_data.eTarget.name);
        },
    },
};
</script>

<style lang="scss">
@import 'fform';
</style>
