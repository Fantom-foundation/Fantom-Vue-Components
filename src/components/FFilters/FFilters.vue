<template>
    <f-form
        ref="form"
        class="ffilters fform-elemsautowidth"
        submit-on-change
        __submit-if-changed
        no-change-check
        v-bind="$attrs"
        v-on="$listeners"
        @submit="$emit('submit', $event)"
        v-slot="slotProps"
    >
        <slot v-bind="slotProps"></slot>
    </f-form>
</template>

<script>
import FForm from '../FForm/FForm.vue';
import { copyMethods } from '@/utils/vue-helpers.js';

/**
 * FForm with inputs displayed side by side
 */
export default {
    name: 'FFilters',

    components: { FForm },

    model: {
        prop: 'formValues',
        event: 'input',
    },

    methods: {
        ...copyMethods(FForm, ['getLastChangedElement'], 'form'),

        getValues() {
            return this.$refs.form.getElements();
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
