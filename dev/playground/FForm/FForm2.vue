<template>
    <section>
        <h1 class="h2">Form</h1>

        <f-input required label="Default" />
        <f-input required is-textarea cols="20" rows="5" label="Default" />

        <f-form v-model="values" @submit="onFormSubmit" @reset="onFormReset" class="grid" v-slot="fprops">
            <fieldset class="col-8">
                <legend>Test form</legend>
                <div class="fform_fieldset_body">
                    <h4>elementStates</h4>
                    <p>{{ fprops.elementStates }}</p>
                    <h4>lastChangedElement</h4>
                    <p>{{ fprops.lastChangedElement }}</p>

                    <div class="fform_row">
                        <f-form-input
                            type="combobox"
                            name="combobox"
                            :__throttle-input-interval="250"
                            label="combobox"
                            :data="data.combobox"
                        />
                        <f-form-input
                            type="combobox"
                            name="combobox2"
                            text-is-value
                            label="combobox - text-is-value"
                            :data="data.combobox2"
                        />
                        <f-form-input
                            type="combobox"
                            name="combobox3"
                            select-mode
                            label="combobox - select-mode"
                            :data="data.combobox3"
                        />
                    </div>

                    <div class="fform_row">
                        <f-form-input
                            type="combobox"
                            name="combobox4"
                            select-mode
                            label="cbx - select-mode, readonly"
                            readonly
                            :data="data.combobox4"
                        />
                        <f-form-input
                            type="custom-combo-box"
                            name="combobox5"
                            :per-page="15"
                            label="cbx - remote"
                            :data="combobox5Data"
                        >
                            <template v-slot:item="{ item }">
                                <div class="flex juc-space-between">
                                    {{ item.label }} <i class="co-grey-5">{{ item.value }}</i>
                                </div>
                            </template>
                        </f-form-input>
                    </div>

                    <f-form-input name="search" type="f-search-field" __placeholder="Search" />

                    <div class="fform_row">
                        <f-form-input required validate-on-input name="inputreq" label="required input" />
                        <f-form-input name="input1" label="input 1" validate-on-input :validator="inputValidator" />
                        <div>
                            <f-form-input v-if="c1 === true" key="fff" name="input2" placeholder="12345">
                                <template #top="props">
                                    <label :for="props.labeledById"><b>&#9742; Phone</b></label>
                                </template>
                                <!--                                <template #label="labelProps">
                                    <label :for="labelProps.id"><b>&#9742; Phone</b></label>
                                </template>-->
                            </f-form-input>
                        </div>
                    </div>

                    <div class="fform_row">
                        <f-form-input
                            type="dropdownlistbox"
                            name="dropdown1"
                            label="dropdownlistbox"
                            :select-immediately="true"
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
                        <f-form-input type="textarea" name="textarea1" label="Textarea" />
                    </div>
                    <div class="fform_row">
                        <f-form-input
                            auto-resizable-textarea
                            type="textarea"
                            name="textarea2"
                            label="Textarea - auto resizable"
                        />
                    </div>
                    <div class="fform_row">
                        <f-form-input
                            auto-resizable-textarea
                            type="textarea"
                            name="textarea3"
                            label="Textarea - auto resizable"
                        />
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
                        <f-form-input type="checkboxgroup" name="checkbox3" label="Multi checkboxes" :data="testos" />
                    </div>

                    <div class="fform_row">
                        <f-form-input
                            type="checkboxgroup"
                            label="Multi checkboxes"
                            v-model="c3"
                            :data="{ '10': 'c3 1', '20': 'c3 2' }"
                        />
                    </div>

                    <div class="fform_row">
                        <f-form-input
                            type="checkboxgroup"
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
                            type="radiogroup"
                            name="radio1"
                            label="Radio"
                            column
                            :data="{ '10': 'Radio 1', '20': 'Radio 2', '30': 'Radio 3' }"
                        />
                    </div>

                    <div class="fform_row">
                        <f-form-input
                            type="select"
                            name="select1"
                            label="Select"
                            :validator="_value => (!_value.trim() ? 'Required' : '')"
                            validate-on-change
                            :data="[
                                { label: '---', value: '' },
                                { label: 'Option 1', value: 1 },
                                { label: 'Option 2', value: 2 },
                                { label: 'Option 3', value: 3 },
                            ]"
                            __data="data.select"
                        />
                    </div>

                    <div class="fform_row">
                        <f-form-input
                            type="listbox"
                            name="listbox1"
                            label="Listbox"
                            :data="[
                                { label: 'item 100', value: '100' },
                                { label: 'item 200', id: 'myid3', value: '200' },
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
                {{ fprops.errorMessages }}
            </div>
            <div>
                <f-button
                    type="submit"
                    label="Submit"
                    :disabled="fprops.pendingValidation || fprops.errorMessages.length > 0"
                />
                <f-button
                    type="reset"
                    label="Reset"
                    :disabled="fprops.pendingValidation || fprops.errorMessages.length > 0"
                />
            </div>
        </f-form>
    </section>
</template>

<script>
import FForm from '@/components/FForm/FForm.vue';
import FButton from '@/components/FButton/FButton.vue';

import FFormInput from '@/components/FFormInput/FFormInput.vue';
import FOption from '@/components/FOption/FOption.vue';
import { clone } from '@/utils';
import FInput from '@/components/FInput/FInput.vue';

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

export default {
    name: 'FFormPlayground2',

    components: { FInput, FOption, FFormInput, FButton, FForm },

    data() {
        return {
            testos: { '10': 'Checkbox multi 1', '20': 'Checkbox multi 2' },
            data: {
                /*select: [
                    { label: 'Option 1', value: 1 },
                    { label: 'Option 2', value: 2 },
                    { label: 'Option 3', value: 3 },
                ],*/
                select: [
                    { label: 'item 1', value: '10' },
                    { label: 'item 2', value: '20' },
                    { label: 'item 3 Lorem ipsum', value: '30' },
                    { label: 'item 4', value: '40' },
                    { label: 'item 5', value: '50' },
                    { label: 'item 6', value: '60' },
                ],
                dropdown: [
                    { label: 'item 1', value: '10' },
                    { label: 'item 2', id: 'myid', value: '20' },
                    { label: 'item 3 Lorem ipsum', value: '30' },
                    { label: 'item 4', value: '40' },
                    { label: 'item 5', value: '50' },
                    { label: 'item 6', value: '60' },
                ],
                combobox: clone(comboboxData),
                combobox2: clone(comboboxData),
                combobox3: clone(comboboxData),
                combobox4: clone(comboboxData),
                listbox: [
                    { label: 'item 100', value: '100' },
                    { label: 'item 200', id: 'myid2', value: '200' },
                    { label: 'item 300 Lorem ipsum', value: '300' },
                ],
            },
            combobox5Data: [],
            values: {
                input1: '',
                dropdown1: '',
                checkbox2: false,
                checkbox3: [],
                listbox1: '',
                radio1: '',
                search: '',
                textarea3: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            },
            /*values: {
                input1: 'default',
                dropdown1: '20',
                checkbox2: true,
                checkbox3: ['10'],
                combobox4: 5,
                combobox5: 3,
                listbox1: '200',
                radio1: '10',
                search: 'ww',
            },*/
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

    created() {
        setTimeout(() => {
            console.log('???');
            this.values = {
                input1: 'default',
                dropdown1: '20',
                checkbox2: true,
                checkbox3: ['10'],
                combobox4: 5,
                combobox5: 3,
                listbox1: '200',
                radio1: '30',
                search: 'ww',
            };

            /*Object.assign(this.values, {
                input1: 'default',
                dropdown1: '20',
                checkbox2: true,
                checkbox3: ['10'],
                combobox4: 5,
                combobox5: 3,
                listbox1: '200',
                radio1: '30',
                search: 'ww',
            });*/
        }, 1500);

        setTimeout(() => {
            this.combobox5Data = [
                {
                    value: 1,
                    label: 'Default',
                },
                {
                    value: 2,
                    label: 'Default 2',
                },
                {
                    value: 3,
                    label: 'Default 3',
                },
            ];
        }, 1400);
    },

    methods: {
        inputValidator(_value) {
            return new Promise((_resolve, _reject) =>
                setTimeout(() => {
                    if (Math.random() < 0.5) {
                        _reject('error!!');
                    } else {
                        _resolve(!_value.trim() ? 'Required' : '');
                    }
                }, 2000)
            );
            // return !_value.trim() ? 'Required' : '';
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
@use 'fform';
</style>
