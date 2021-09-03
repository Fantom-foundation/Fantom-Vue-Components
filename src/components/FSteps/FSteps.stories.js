import FSteps from './FSteps.vue';

export default {
    title: 'FSteps',
    component: FSteps,
};

export const Default = () => ({
    components: { FSteps },
    template: `
        <div>
            <f-steps :count="3" />
        </div>
    `,
});

export const Active = () => ({
    components: { FSteps },
    template: `
        <div>
            <f-steps :count="4" :active="2" />
            <f-steps :count="4" :active="20" />
            <f-steps :count="4" :active="0" />
        </div>
    `,
});

export const WithLabels = () => ({
    components: { FSteps },
    template: `
        <div>
            <f-steps :labels="labels" />
            <f-steps :labels="labels" :active="2" />
            <f-steps :labels="labels" :active="3" />
        </div>
    `,
    data() {
        return {
            labels: ['Step 1', 'Step 2', 'Step 3'],
        };
    },
});
