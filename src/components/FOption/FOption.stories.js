// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import FOption from './FOption.vue';
import FButton from '../FButton/FButton.vue';

export default {
    title: 'FOption',
    component: FOption,
};

export const Default = () => ({
    components: { FOption },
    template: `
        <div>
            <h3>Checkbox</h3>
            <f-option type="checkbox" option-size="large" label="Large" name="checkbox1_lg" />
            <f-option type="checkbox" label="default" name="checkbox1" />
            <f-option type="checkbox" option-size="small" label="Small" name="checkbox1_sm" />
            <f-option type="checkbox" option-size="mini" label="Mini" name="checkbox1_xs" />
            <h3>Radio button</h3>
            <div class="gridauto">
                <span class="par-4">
                    Large <br />
                    <f-option type="radio" label="123" option-size="large" name="radio1_lg" value="10" />
                    <f-option type="radio" option-size="large" name="radio1_lg" value="20" aria-label="label" /></span>
                <span class="par-4">
                    Default <br />
                    <f-option type="radio" name="radio1" value="10" aria-label="label" />
                    <f-option type="radio" name="radio1" value="20" aria-label="label" />
                </span>
                <span class="par-4">
                    Small <br />
                    <f-option type="radio" option-size="small" name="radio1_sm" value="10" aria-label="label" />
                    <f-option type="radio" option-size="small" name="radio1_sm" value="20" aria-label="label" />
                </span>
                <span class="par-4">
                    Mini <br />
                    <f-option type="radio" option-size="mini" name="radio1_xs" value="10" aria-label="label" />
                    <f-option type="radio" option-size="mini" name="radio1_xs" value="20" aria-label="label" />
                </span>
          </div>
        </div>
    `,
});

export const Checked = () => ({
    components: { FOption },
    template: `
        <div>
            <h3>Checkbox</h3>
            <f-option type="checkbox" checked option-size="large" label="Large" name="checkbox1_lg" />
            <f-option type="checkbox" checked label="default" name="checkbox1" />
            <f-option type="checkbox" checked option-size="small" label="Small" name="checkbox1_sm" />
            <f-option type="checkbox" checked option-size="mini" label="Mini" name="checkbox1_xs" />
            <h3>Radio button</h3>
            <div class="gridauto">
                <span class="par-4">
                    Large <br />
                    <f-option checked type="radio" label="123" option-size="large" name="radio1_lg" value="10" />
                    <f-option type="radio" option-size="large" name="radio1_lg" value="20" aria-label="label" />
                </span>
                <span class="par-4">
                    Default <br />
                    <f-option type="radio" name="radio1" value="10" aria-label="label" />
                    <f-option checked type="radio" name="radio1" value="20" aria-label="label" />
                </span>
                <span class="par-4">
                    Small <br />
                    <f-option checked type="radio" option-size="small" name="radio1_sm" value="10" aria-label="label" />
                    <f-option type="radio" option-size="small" name="radio1_sm" value="20" aria-label="label" />
                </span>
                <span class="par-4">
                    Mini <br />
                    <f-option type="radio" option-size="mini" name="radio1_xs" value="10" aria-label="label" />
                    <f-option checked type="radio" option-size="mini" name="radio1_xs" value="20" aria-label="label" />
                </span>
          </div>
        </div>
    `,
});

export const Disabled = () => ({
    components: { FOption },
    template: `
        <div>
            <h3>Checkbox</h3>
            <f-option type="checkbox" disabled option-size="large" label="Large" name="checkbox1_lg" />
            <f-option type="checkbox" disabled label="default" name="checkbox1" />
            <f-option type="checkbox" disabled option-size="small" label="Small" name="checkbox1_sm" />
            <f-option type="checkbox" disabled option-size="mini" label="Mini" name="checkbox1_xs" />
            <h3>Checkbox - checked</h3>
            <f-option type="checkbox" disabled checked option-size="large" label="Large" name="checkbox2_lg" />
            <f-option type="checkbox" disabled checked label="default" name="checkbox2" />
            <f-option type="checkbox" disabled checked option-size="small" label="Small" name="checkbox2_sm" />
            <f-option type="checkbox" disabled checked option-size="mini" label="Mini" name="checkbox2_xs" />
            <h3>Radio button</h3>
            <div class="gridauto">
                <span class="par-4">
                    Large <br />
                    <f-option disabled type="radio" label="123" option-size="large" name="radio1_lg" value="10" />
                    <f-option disabled type="radio" option-size="large" name="radio1_lg" value="20" aria-label="label" />
                </span>
                <span class="par-4">
                    Default <br />
                    <f-option disabled type="radio" name="radio1" value="10" aria-label="label" />
                    <f-option disabled type="radio" name="radio1" value="20" aria-label="label" />
                </span>
                <span class="par-4">
                    Small <br />
                    <f-option disabled type="radio" option-size="small" name="radio1_sm" value="10" aria-label="label" />
                    <f-option disabled type="radio" option-size="small" name="radio1_sm" value="20" aria-label="label" />
                </span>
                <span class="par-4">
                    Mini <br />
                    <f-option disabled type="radio" option-size="mini" name="radio1_xs" value="10" aria-label="label" />
                    <f-option disabled type="radio" option-size="mini" name="radio1_xs" value="20" aria-label="label" />
                </span>
          </div>
            <h3>Radio button - checked</h3>
            <div class="gridauto">
                <span class="par-4">
                    Large <br />
                    <f-option disabled checked type="radio" label="123" option-size="large" name="radio2_lg" value="10" />
                    <f-option disabled type="radio" option-size="large" name="radio2_lg" value="20" aria-label="label" />
                </span>
                <span class="par-4">
                    Default <br />
                    <f-option disabled type="radio" name="radio2" value="10" aria-label="label" />
                    <f-option disabled checked type="radio" name="radio2" value="20" aria-label="label" />
                </span>
                <span class="par-4">
                    Small <br />
                    <f-option disabled checked type="radio" option-size="small" name="radio2_sm" value="10" aria-label="label" />
                    <f-option disabled type="radio" option-size="small" name="radio2_sm" value="20" aria-label="label" />
                </span>
                <span class="par-4">
                    Mini <br />
                    <f-option disabled type="radio" option-size="mini" name="radio2_xs" value="10" aria-label="label" />
                    <f-option disabled checked type="radio" option-size="mini" name="radio2_xs" value="20" aria-label="label" />
                </span>
          </div>
        </div>
    `,
});

export const Colors = () => ({
    components: { FOption },
    template: `
        <div>
            <h3>Checkbox</h3>
            <f-option type="checkbox" invalid label="Invalid" name="checkbox" />
            <f-option type="checkbox" invalid checked label="Invalid" name="checkbox" />
            <f-option type="checkbox" :style="blueStyle" label="Custom color 1" name="checkbox" />
            <f-option type="checkbox" :style="blueStyle" checked label="Custom color 1" name="checkbox" />
            <f-option type="checkbox" :style="lightStyle" label="Custom color 2" name="checkbox" />
            <f-option type="checkbox" :style="lightStyle" checked label="Custom color 2" name="checkbox" />

            <h3>Radio button</h3>
            <f-option type="radio" invalid label="Invalid" name="radio1" />
            <f-option type="radio" invalid checked label="Invalid" name="radio1" />
            <f-option type="radio" :style="blueStyle" label="Custom color 1" name="radio2" />
            <f-option type="radio" :style="blueStyle" checked label="Custom color 1" name="radio2" />
            <f-option type="radio" :style="purpleStyle" label="Custom color 2" name="radio3" />
            <f-option type="radio" :style="purpleStyle" checked label="Custom color 2" name="radio3" />
        </div>
    `,
    data() {
        return {
            blueStyle: {
                '--f-cr-color': '#08209e',
                '--f-cr-color-hsl': '230, 90%, 33%',
            },
            lightStyle: {
                '--f-cr-color': '#ffdda1',
                '--f-cr-color-hsl': '38, 100%, 82%',
                '--f-cr-checkbox-check-color': '#333',
            },
            purpleStyle: {
                '--f-cr-color': '#800E99',
                '--f-cr-color-hsl': '289, 83%, 33%',
            },
        };
    },
});

export const Model = () => ({
    components: { FOption, FButton },
    template: `
        <div>
            <h3>Checkbox</h3>
            <f-option v-model="checkboxValue" type="checkbox" name="checkbox_m" aria-label="label" />
            <f-button secondary size="small" @click.native="checkboxValue = !checkboxValue">Toggle</f-button>
            <br />
            Value: {{ checkboxValue }}
            <h3>Checkbox - multiselect</h3>
            <f-option v-model="checkboxValue2" type="checkbox" name="checkbox_m2" value="10" aria-label="label" />
            <f-option v-model="checkboxValue2" type="checkbox" name="checkbox_m2" value="20" aria-label="label" />
            <f-option v-model="checkboxValue2" type="checkbox" name="checkbox_m2" value="30" aria-label="label" />
            <f-button secondary size="small" @click.native="checkboxValue2 = ['30']">Set value to 30</f-button>
            <br />
            Value: {{ checkboxValue2 }}
            <h3>Radio button</h3>
            <f-option v-model="radioValue" type="radio" name="radio_m" value="10" aria-label="label" />
            <f-option v-model="radioValue" type="radio" name="radio_m" value="20" aria-label="label" />
            <f-option v-model="radioValue" type="radio" name="radio_m" value="30" aria-label="label" />
            <f-button secondary size="small" @click.native="radioValue = '30'">Set value to 30</f-button>
            <br />
            Value: {{ radioValue }}
        </div>
    `,
    data() {
        return {
            checkboxValue: true,
            checkboxValue2: [],
            radioValue: '20',
        };
    },
});

export const Slots = () => ({
    components: { FOption },
    template: `
        <div>
            <f-option type="checkbox" name="checkbox1"><i>Checkbox</i> &#9733;</f-option>
            <br /><br />
            <f-option type="radio" name="radio1"><i>Radio 1</i> &#9733;</f-option>
            <f-option type="radio" name="radio1"><i>Radio 2</i> &#9733;</f-option>
        </div>
    `,
});
