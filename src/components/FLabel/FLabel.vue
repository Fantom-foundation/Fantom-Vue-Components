<template>
    <label v-if="native" :for="id" :class="classes">
        <slot>{{ label }}</slot>
        <span v-if="required" class="flabel_asterisk" :title="_('requiredField')" aria-hidden="true">
            <slot name="asterisk">&#x2217;</slot>
        </span>
    </label>
    <span v-else :id="id" :class="classes">
        <slot>{{ label }}</slot>
        <span v-if="required" class="flabel_asterisk" :title="_('requiredField')" aria-hidden="true">
            <slot name="asterisk">&#x2217;</slot>
        </span>
    </span>
</template>

<script>
import { translationsMixin } from '../../mixins/translations.js';

/**
 * Renders `label` or `span` element.
 */
export default {
    name: 'FLabel',

    mixins: [translationsMixin],

    props: {
        /** Id for `for` attribute of `label` element or id of `span` element */
        id: {
            type: String,
            default: '',
            required: true,
        },
        /** Text */
        label: {
            type: String,
            default: '',
        },
        /**
         * If `true`, component renders `label` element with `for` attribute,
         * otherwise `span` element with `id`
         */
        native: {
            type: Boolean,
            default: false,
        },
        /** If `true`, component will be visible just for screen readers */
        notVisible: {
            type: Boolean,
            default: false,
        },
        /** If `true`, asterisk will be shown */
        required: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        classes() {
            return {
                flabel: true,
                'flabel-notvisible': this.notVisible,
            };
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
