import { withA11y } from '@storybook/addon-a11y';

import FCircleProgress from './FCircleProgress.vue';

export default {
    title: 'FCircleProgress',
    component: FCircleProgress,
    decorators: [withA11y],
};

export const Default = () => ({
    components: { FCircleProgress },
    template: `
        <div>
            <f-circle-progress :value="75" />
        </div>
    `,
});

export const ClampValue = () => ({
    components: { FCircleProgress },
    template: `
        <div>
            <f-circle-progress :value="parseFloat(value)" />
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

export const ConvertToPercentages = () => ({
    components: { FCircleProgress },
    template: `
        <div>
            <f-circle-progress convert-to-percentages :value="value" :min="-50" :max="50" />
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

export const CanExceed = () => ({
    components: { FCircleProgress },
    template: `
        <div>
            <f-circle-progress can-exceed :value="value" :min="0" :max="50" />
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

export const StrokeWidth = () => ({
    components: { FCircleProgress },
    template: `
        <div>
            <f-circle-progress :stroke-width="10" :value="value" />
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

export const Animate = () => ({
    components: { FCircleProgress },
    template: `
        <div>
            <f-circle-progress animate :value="value" />
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

export const Styles = () => ({
    components: { FCircleProgress },
    template: `
        <div>
            <f-circle-progress :styles="styles" convert-to-percentages :value="parseFloat(value)" />
            <br />
            <input type="number" v-model="value" class="mat-5" aria-label="value" />
        </div>
    `,
    data() {
        return {
            value: 30,
            styles: [
                {
                    value: 0,
                    color: 'red',
                    textStyle: { fill: 'red' },
                },
                {
                    value: 40,
                    color: '#4a5ef5',
                    textStyle: { fill: '#4a5ef5' },
                },
                {
                    value: 80,
                    color: 'green',
                    textStyle: { fill: 'green' },
                },
            ],
        };
    },
});

export const Dots = () => ({
    components: { FCircleProgress },
    template: `
        <div>
            <f-circle-progress :dots="dots" convert-to-percentages :styles="styles" :value="parseFloat(value)" />
            <br />
            <input type="number" v-model="value" class="mat-5" aria-label="value" />
        </div>
    `,
    data() {
        return {
            value: 50,
            dots: [
                {
                    value: 30,
                    color: 'green',
                },
                {
                    value: 75,
                    color: 'red',
                },
            ],
            styles: [
                {
                    value: 30,
                    color: 'green',
                },
                {
                    value: 75,
                    color: 'red',
                },
            ],
        };
    },
});

export const Slot = () => ({
    components: { FCircleProgress },
    template: `
        <div>
            <f-circle-progress :value="value">
                <template #default="{ value }">{{ value }}..</template>
            </f-circle-progress>
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

export const Variations = () => ({
    components: { FCircleProgress },
    template: `
        <div>
            <f-circle-progress :value="80" :style="s100" />
        </div>
    `,
    data() {
        return {
            s100: {
                '--fcircleprogress-width': 'calc(100vh - 32px)',
                '--fcircleprogress-height': 'calc(100vh - 32px)',
                '--fcircleprogress-circle-color': 'blueviolet',
                '--fcircleprogress-color': 'blueviolet',
            },
        };
    },
});
