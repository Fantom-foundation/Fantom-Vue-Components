<template>
    <div class="ferrormessages" :id="errorsContId" role="alert" aria-atomic="true">
        <div v-for="(msg, idx) in errors" :key="`${errorsContId}_${idx}_err`" class="ferrormessages_message">
            {{ msg }}
        </div>
    </div>
</template>

<script>
import { errorMessagesMixin } from '../../mixins/error-messages.js';

/**
 * Component for displaying form element's error messages
 */
export default {
    name: 'FErrorMessages',

    mixins: [errorMessagesMixin],
};
</script>

<style lang="scss">
@use "style";
</style>
