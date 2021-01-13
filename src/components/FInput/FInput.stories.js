// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import { withA11y } from '@storybook/addon-a11y';

import FInput from './FInput.vue';
import FMessage from '../FMessage/FMessage.vue';

export default {
    title: 'FInput',
    component: FInput,
    decorators: [withA11y],
};

function validator(_value) {
    return _value === 'yes';
}

export const Default = () => ({
    components: { FInput },
    template: `
        <div>
            <h3>Input</h3>
            <f-input field-size="large" label="Large" />
            <f-input label="Default" placeholder="placehodler" />
            <f-input field-size="small" label="Small" value="value" />
            <f-input field-size="mini" label="Mini" value="value" />
            <h3>Textarea</h3>
            <f-input is-textarea cols="20" rows="5" field-size="large" label="Large" />
            <f-input is-textarea cols="20" rows="5" label="Default" placeholder="placehodler" />
            <f-input is-textarea cols="20" rows="5" field-size="small" label="Small" value="value" />
            <f-input is-textarea cols="20" rows="5" field-size="mini" label="Mini" value="value" />
        </div>
    `,
});

export const Readonly = () => ({
    components: { FInput },
    template: `
        <div>
            <h3>Input</h3>
            <f-input readonly field-size="large" label="Large" />
            <f-input readonly label="Default" placeholder="placehodler" />
            <f-input readonly field-size="small" label="Small" value="value" />
            <f-input readonly field-size="mini" label="Mini" value="value" />
            <h3>Textarea</h3>
            <f-input readonly is-textarea cols="20" rows="5" field-size="large" label="Large" />
            <f-input readonly is-textarea cols="20" rows="5" label="Default" placeholder="placehodler" />
            <f-input readonly is-textarea cols="20" rows="5" field-size="small" label="Small" value="value" />
            <f-input readonly is-textarea cols="20" rows="5" field-size="mini" label="Mini" value="value" />
        </div>
    `,
});

export const Disabled = () => ({
    components: { FInput },
    template: `
        <div>
            <h3>Input</h3>
            <f-input disabled field-size="large" label="Large" />
            <f-input disabled label="Default" placeholder="placehodler" />
            <f-input disabled field-size="small" label="Small" value="value" />
            <f-input disabled field-size="mini" label="Mini" value="value" />
            <h3>Textarea</h3>
            <f-input disabled is-textarea cols="20" rows="5" field-size="large" label="Large" />
            <f-input disabled is-textarea cols="20" rows="5" label="Default" placeholder="placehodler" />
            <f-input disabled is-textarea cols="20" rows="5" field-size="small" label="Small" value="value" />
            <f-input disabled is-textarea cols="20" rows="5" field-size="mini" label="Mini" value="value" />
        </div>
    `,
});

export const Invalid = () => ({
    components: { FInput },
    template: `
        <div>
            <h3>Input</h3>
            <f-input invalid field-size="large" label="Large" />
            <f-input invalid label="Default" placeholder="placehodler" />
            <f-input invalid field-size="small" label="Small" value="value" />
            <f-input invalid field-size="mini" label="Mini" value="value" />
            <h3>Textarea</h3>
            <f-input invalid is-textarea cols="20" rows="5" field-size="large" label="Large" />
            <f-input invalid is-textarea cols="20" rows="5" label="Default" placeholder="placehodler" />
            <f-input invalid is-textarea cols="20" rows="5" field-size="small" label="Small" value="value" />
            <f-input invalid is-textarea cols="20" rows="5" field-size="mini" label="Mini" value="value" />
        </div>
    `,
});

export const Slots = () => ({
    components: { FInput },
    template: `
        <div>
            <h3>Input</h3>
            <f-input label="Large" field-size="large">
                <template #bottom><span>bottom</span></template>
                <template #prefix><span>prefix</span></template>
                <template #suffix><span>suffix</span></template>
            </f-input>
            <f-input label="Default">
                <template #bottom><span>bottom</span></template>
                <template #prefix><span>prefix</span></template>
                <template #suffix><span>suffix</span></template>
            </f-input>
            <f-input label="Small" field-size="small">
                <template #bottom><span>bottom</span></template>
                <template #prefix><span>prefix</span></template>
                <template #suffix><span>suffix</span></template>
            </f-input>
            <f-input label="Mini" field-size="mini">
                <template #bottom><span>bottom</span></template>
                <template #prefix><span>prefix</span></template>
                <template #suffix><span>suffix</span></template>
            </f-input>
            <h3>Textarea</h3>
            <f-input is-textarea label="Large" field-size="large">
                <template #bottom><span>bottom</span></template>
                <template #prefix><span>prefix</span></template>
                <template #suffix><span>suffix</span></template>
            </f-input>
            <f-input is-textarea label="Default">
                <template #bottom><span>bottom</span></template>
                <template #prefix><span>prefix</span></template>
                <template #suffix><span>suffix</span></template>
            </f-input>
            <f-input is-textarea label="Small" field-size="small">
                <template #bottom><span>bottom</span></template>
                <template #prefix><span>prefix</span></template>
                <template #suffix><span>suffix</span></template>
            </f-input>
            <f-input is-textarea label="Mini" field-size="mini">
                <template #bottom><span>bottom</span></template>
                <template #prefix><span>prefix</span></template>
                <template #suffix><span>suffix</span></template>
            </f-input>
            <h3>Variations</h3>
            <f-input label="Large" field-size="large">
                <template #prefix><span style="text-align: center">&#9742;</span></template>
                <template #suffix><span>&#9742;</span></template>
            </f-input>
            <f-input label="Large" field-size="large">
                <template #prefix><span>&#9742;</span></template>
            </f-input>
            <f-input label="Large" field-size="large">
                <template #suffix><span>&#9742;</span></template>
            </f-input>
            <br />
            <f-input label="Large" field-size="large" />
            <br /><br />
            <f-input label="Default">
                <template #prefix><span style="text-align: center">&#9742;</span></template>
                <template #suffix><span>&#9742;</span></template>
            </f-input>
            <f-input label="Default">
                <template #prefix><span>&#9742;</span></template>
            </f-input>
            <f-input label="Default">
                <template #suffix><span>&#9742;</span></template>
            </f-input>
            <br /><br />
            <f-input label="Small" field-size="small">
                <template #prefix><span style="text-align: center">&#9742;</span></template>
                <template #suffix><span>&#9742;</span></template>
            </f-input>
            <f-input label="Small" field-size="small">
                <template #prefix><span>&#9742;</span></template>
            </f-input>
            <f-input label="Small" field-size="small">
                <template #suffix><span>&#9742;</span></template>
            </f-input>
        </div>
    `,
});

export const Validator = () => ({
    components: { FInput, FMessage },
    template: `
        <div class="vertical-align-top">
            <f-input :validator="validator" label="input 1">
                <template #bottom="sProps">
                    <f-message v-if="sProps.showErrorMessage" type="error">
                        an error
                        <template #prefix>error: </template>
                    </f-message>
                    <f-message type="info">type 'yes'</f-message>
                </template>
            </f-input>
            <f-input :validator="validator" validate-on-input label="oninput validation">
                <template #bottom="sProps">
                    <f-message v-if="sProps.showErrorMessage" type="error">an error</f-message>
                    <f-message type="info">type 'yes'</f-message>
                </template>
            </f-input>
            <f-input :validator="validator" validate-on-input label="hide info message on error">
                <template #bottom="sProps">
                    <f-message v-if="sProps.showErrorMessage" type="error">an error</f-message>
                    <f-message v-if="!sProps.showErrorMessage" type="info">type 'yes'</f-message>
                </template>
            </f-input>
        </div>
    `,
    methods: { validator },
});

/*
export const Pattern = () => ({
    components: { FInput },
    template: `
        <div>
            <f-input error-message="je to blbe" pattern="" label="input 1" />
        </div>
    `,
    methods: { validator },
});
*/

export const Model = () => ({
    components: { FInput },
    template: `
        <div>
            <f-input v-model="value" />
            <br />
            <button @click="onButtonClick">set value to '222'</button>
            <span>value: {{ value }}</span>
        </div>
    `,
    data() {
        return { value: '111' };
    },
    methods: {
        onButtonClick() {
            this.value = '222';
        },
    },
});
