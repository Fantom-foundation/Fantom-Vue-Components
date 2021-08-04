<template>
    <f-popover
        visible
        prevent-focus
        :attach-to="`#${inputContId}`"
        :attach-margin="[4, 4, 4, 4]"
        :with-header="false"
        preferred-attach-position="bottom"
        style="width: auto; max-width: 360px;"
        class="ferrormessagespopover"
    >
        <div :id="errorsContId">
            <div v-for="(msg, idx) in errors" :key="`${errorsContId}_${idx}_err`" class="ferrormessagespopover_message">
                {{ msg }}
            </div>
        </div>
    </f-popover>
</template>

<script>
import FPopover from '../FPopover/FPopover.vue';
import { errorMessagesMixin } from '../../mixins/error-messages.js';

/**
 * Component for displaying form element's error messages in popover window
 */
export default {
    name: 'FErrorMessagesPopover',

    components: { FPopover },

    mixins: [errorMessagesMixin],
};
</script>

<style lang="scss">
@use "style";
</style>
