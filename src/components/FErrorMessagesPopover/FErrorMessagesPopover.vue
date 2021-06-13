<template>
    <f-window
        popover
        visible
        prevent-focus
        :attach-to="`#${inputContId}`"
        :attach-margin="[4, 4, 4, 4]"
        :with-header="false"
        style="width: auto; max-width: 360px;"
        class="ferrormessagespopover"
    >
        <div :id="errorsContId">
            <div v-for="(msg, idx) in errors" :key="`${errorsContId}_${idx}_err`" class="ferrormessagespopover_message">
                {{ msg }}
            </div>
        </div>
    </f-window>
</template>

<script>
import FWindow from '../FWindow/FWindow.vue';
import { errorMessagesMixin } from '../../mixins/error-messages.js';

/**
 * Component for displaying form element's error messages in popover window
 */
export default {
    name: 'FErrorMessagesPopover',

    components: { FWindow },

    mixins: [errorMessagesMixin],
};
</script>

<style lang="scss">
@use "style";
</style>
