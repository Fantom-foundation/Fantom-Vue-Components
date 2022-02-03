<template>
    <div class="finfotext" :id="infoTextId">
        <slot>{{ text }}</slot>
    </div>
</template>

<script>
import { infoTextMixin } from '../../mixins/info-text.js';

/**
 * Component for displaying form element's info text
 */
export default {
    name: 'FInfoText',

    mixins: [infoTextMixin],
};
</script>

<style lang="scss">
@use "style";
</style>
