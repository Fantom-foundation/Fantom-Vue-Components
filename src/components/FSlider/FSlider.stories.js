import FSlider from './FSlider.vue';
import FButton from '@/components/FButton/FButton.vue';

export default {
    title: 'FSlider',
    component: FSlider,
};

export const Default = () => ({
    components: { FSlider },
    template: `
        <div>
            <p><f-slider label="Default" /></p>
            <p><f-slider label="min: 10, max: 20, step: 2, use-lower-fill-bar" min="10" max="20" step="2" use-lower-fill-bar /></p>
            <p><f-slider label="min: -30, max: 50, step: 2, use-upper-fill-bar" min="-30" max="30" step="2" use-upper-fill-bar /></p>
        </div>
    `,
});

export const Disabled = () => ({
    components: { FSlider },
    template: `
        <div>
            <p><f-slider disabled label="min: 10, max: 20, step: 2, use-lower-fill-bar" min="10" max="20" step="2" use-lower-fill-bar /></p>
        </div>
    `,
});

export const Invalid = () => ({
    components: { FSlider },
    template: `
        <div>
          <p><f-slider invalid label="min: 10, max: 20, step: 2, use-lower-fill-bar" min="10" max="20" step="2" use-lower-fill-bar /></p>
        </div>
    `,
});

export const Labels = () => ({
    components: { FSlider },
    template: `
        <div>
            <p><f-slider label="Slider with labels" :labels="labels" min="0" max="100" use-lower-fill-bar v-model="val1" /></p>
            <h3>{{ val1 }}</h3>
            <p><f-slider label="Slider with clickable labels" clickable-labels :labels="labels2" min="-50" max="50" use-lower-fill-bar v-model="val2" /></p>
            <h3>{{ val2 }}</h3>
        </div>
    `,
    data() {
        return {
            labels: ['0%', '50%', '100%'],
            labels2: ['0%', '25%', '50%', '75%', '100%'],
            val1: '50',
            val2: '0',
        };
    },
});

export const Validation = () => ({
    components: { FSlider, FButton },
    template: `
        <div>
            <form action="" @submit="onSubmit">
                <f-slider
                    ref="fslider"
                    :validator="validator"
                    :labels="labels"
                    min="0"
                    max="100"
                    validate-on-change
                    use-lower-fill-bar
                    clickable-labels
                    label="Validation"
                    name="sldr1"
                />
                <br /><br />
                <f-button type="submit" size="small">Submit</f-button>
            </form>
        </div>
    `,
    data() {
        return {
            labels: ['0%', '50%', '100%'],
        };
    },
    methods: {
        validator(_value) {
            return parseInt(_value) < 50 ? 'Value must be greater than 50' : '';
        },
        onSubmit(_event) {
            this.$refs.fslider.validate();

            _event.preventDefault();
        },
    },
});

export const Model = () => ({
    components: { FSlider },
    template: `
        <p>
            <input v-model="val" type="number" min="-30" max="30" step="2" aria-label="label" />
            <f-slider label="v-model" min="-30" max="30" step="2" use-lower-fill-bar v-model="val" />
            <br /><br />
            value: {{ val }}
        </p>
    `,
    data() {
        return { val: '-26' };
    },
});

export const Slots = () => ({
    components: { FSlider },
    template: `
        <p>
            <f-slider label="Default">
                <template #prefix><span>prefix</span></template>
                <template #suffix>
                    <span>suffix</span>
                </template>
                <template #bottom><span>bottom</span></template>
            </f-slider>
        </p>
    `,
});
