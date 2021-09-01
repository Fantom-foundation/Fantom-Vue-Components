import { withA11y } from '@storybook/addon-a11y';

import FStyledNumberRange from './FStyledNumberRange.vue';

export default {
    title: 'FStyledNumberRange',
    component: FStyledNumberRange,
    decorators: [withA11y],
};

export const Default = () => ({
    components: { FStyledNumberRange },
    template: `
        <div>
            <f-styled-number-range :value="75" />
        </div>
    `,
});

export const ClampValue = () => ({
    components: { FStyledNumberRange },
    template: `
        <div>
            <f-styled-number-range :value="parseFloat(value)" />
            <br />
            <input type="number" v-model="value" class="mat-5" aria-label="value" />
        </div>
    `,
    data() {
        return {
            value: 10,
        };
    },
});

export const MinMax = () => ({
    components: { FStyledNumberRange },
    template: `
        <div>
            <f-styled-number-range :value="value" :min="0" :max="30" />
            <br />
            <input type="number" v-model="value" class="mat-5" aria-label="value" />
        </div>
    `,
    data() {
        return {
            value: 50,
        };
    },
});

export const ConvertToPercentages = () => ({
    components: { FStyledNumberRange },
    template: `
        <div>
            <f-styled-number-range convert-to-percentages :value="value" :min="-50" :max="50" />
            <br />
            <input type="number" v-model="value" class="mat-5" aria-label="value" />
        </div>
    `,
    data() {
        return {
            value: 0,
        };
    },
});

export const Styles = () => ({
    components: { FStyledNumberRange },
    template: `
        <div>
            <f-styled-number-range :styles="styles" :value="parseFloat(value)" />
            <br />
            <input type="number" v-model="value" class="mat-5" aria-label="value" />
        </div>
    `,
    data() {
        return {
            styles: [
                {
                    value: 0,
                    style: { color: 'red', fontWeight: 'bold' },
                },
                {
                    value: 40,
                    style: { color: '#4a5ef5' },
                },
                {
                    value: 80,
                    style: { color: 'green' },
                },
            ],
            value: 50,
        };
    },
});

export const Slot = () => ({
    components: { FStyledNumberRange },
    template: `
        <div>
            <f-styled-number-range :value="value">
                <template #default="{ value }"><strong class="fos-7">{{ value }}</strong><span class="co-grey-6">%</span></template>
            </f-styled-number-range>
            <br />
            <input type="number" v-model="value" class="mat-5" aria-label="value" />
        </div>
    `,
    data() {
        return {
            value: 0,
        };
    },
});
