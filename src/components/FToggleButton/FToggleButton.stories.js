import FToggleButton from './FToggleButton.vue';
import FButton from '../FButton/FButton.vue';

export default {
    title: 'FToggleButton',
    component: FToggleButton,
};

export const Default = () => ({
    components: { FToggleButton },
    template: `
        <div>
            <f-toggle-button option-size="large" label="Large" name="tgl1_lg" />
            <f-toggle-button label="default" name="tgl1" />
            <f-toggle-button option-size="small" label="Small" name="tgl1_sm" />
            <f-toggle-button option-size="mini" label="Mini" name="tgl1_xs" />
        </div>
    `,
});

export const Checked = () => ({
    components: { FToggleButton },
    template: `
        <div>
            <f-toggle-button checked option-size="large" label="Large" name="tgl1_lg" />
            <f-toggle-button checked label="default" name="tgl1" />
            <f-toggle-button checked option-size="small" label="Small" name="tgl1_sm" />
            <f-toggle-button checked option-size="mini" label="Mini" name="tgl1_xs" />
        </div>
    `,
});

export const Disabled = () => ({
    components: { FToggleButton },
    template: `
        <div>
            <f-toggle-button disabled option-size="large" label="Large" name="tgl1_lg" />
            <f-toggle-button disabled label="default" name="tgl1" />
            <f-toggle-button disabled option-size="small" label="Small" name="tgl1_sm" />
            <f-toggle-button disabled option-size="mini" label="Mini" name="tgl1_xs" />
            <h3>Checked</h3>
            <f-toggle-button disabled checked option-size="large" label="Large" name="tgl2_lg" />
            <f-toggle-button disabled checked label="default" name="tgl2" />
            <f-toggle-button disabled checked option-size="small" label="Small" name="tgl2_sm" />
            <f-toggle-button disabled checked option-size="mini" label="Mini" name="tgl2_xs" />
        </div>
    `,
});

export const Colors = () => ({
    components: { FToggleButton },
    template: `
        <div>
            <f-toggle-button invalid label="Invalid" name="tgl" />
            <f-toggle-button invalid checked label="Invalid" name="tgl" />
            <f-toggle-button :style="blueStyle" label="Custom color 1" name="tgl" />
            <f-toggle-button :style="blueStyle" checked label="Custom color 1" name="tgl" />
            <f-toggle-button :style="lightStyle" label="Custom color 2" name="tgl" />
            <f-toggle-button :style="lightStyle" checked label="Custom color 2" name="tgl" />
        </div>
    `,
    data() {
        return {
            blueStyle: {
                '--f-togglebtn-theme-color': '#08209e',
                '--f-togglebtn-theme-color-hsl': '230, 90%, 33%',
            },
            lightStyle: {
                '--f-togglebtn-theme-color': '#ffdda1',
                '--f-togglebtn-theme-color-hsl': '38, 100%, 82%',
                '--f-togglebtn-tgl-check-color': '#333',
            },
            purpleStyle: {
                '--f-togglebtn-theme-color': '#800E99',
                '--f-togglebtn-theme-color-hsl': '289, 83%, 33%',
            },
        };
    },
});

export const Model = () => ({
    components: { FToggleButton, FButton },
    template: `
        <div>
            <f-toggle-button v-model="tglValue" name="tgl_m" aria-label="label" />
            <f-button secondary size="small" @click.native="tglValue = !tglValue">Toggle</f-button>
            <br />
            Value: {{ tglValue }}
            <h3>Multiselect</h3>
            <f-toggle-button v-model="tglValue2" name="tgl_m2" value="10" aria-label="label" />
            <f-toggle-button v-model="tglValue2" name="tgl_m2" value="20" aria-label="label" />
            <f-toggle-button v-model="tglValue2" name="tgl_m2" value="30" aria-label="label" />
            <f-button secondary size="small" @click.native="tglValue2 = ['30']">Set value to 30</f-button>
            <br />
            Value: {{ tglValue2 }}
        </div>
    `,
    data() {
        return {
            tglValue: true,
            tglValue2: [],
            radioValue: '20',
        };
    },
});

export const Slots = () => ({
    components: { FToggleButton },
    template: `
        <div>
            <f-toggle-button name="tgl1"><i>Checkbox</i> &#9733;</f-toggle-button>
        </div>
    `,
});
