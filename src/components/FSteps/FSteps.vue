<template>
    <div class="fsteps" :class="{ 'labels-on': labels.length > 0 }">
        <div class="fsteps_cont">
            <div
                v-for="(step, index) in steps"
                :key="step.id"
                class="fsteps_step"
                :class="{ 'fsteps_step-active': index < cActive }"
            >
                <span class="fsteps_label" :class="{ 'fsteps_label-active': index < cActive }">
                    {{ step.label }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { getUniqueId } from '../../utils';

export default {
    name: 'FSteps',

    props: {
        /** Count of steps */
        count: {
            type: Number,
            default: 0,
        },
        /** Active step (`<1, count>`) */
        active: {
            type: Number,
            default: 1,
        },
        /** Step labels. */
        labels: {
            type: Array,
            default() {
                return [];
            },
        },
    },

    data() {
        return {
            /** */
            steps: [],
        };
    },

    computed: {
        /**
         * @return {number}
         */
        cActive() {
            const { stepsCount } = this;

            if (this.active < 1) {
                return 1;
            } else if (this.active > stepsCount) {
                return stepsCount;
            } else {
                return this.active;
            }
        },

        /**
         * @return {number}
         */
        stepsCount() {
            return this.labels.length > 0 ? this.labels.length : this.count;
        },
    },

    created() {
        this.prepareSteps();
    },

    methods: {
        prepareSteps() {
            const { stepsCount } = this;
            const { labels } = this;
            this.steps = [];

            for (let i = 0; i < stepsCount; i++) {
                this.steps.push({
                    id: getUniqueId(),
                    active: false,
                    label: labels.length > 0 ? labels[i] : '',
                });
            }
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
