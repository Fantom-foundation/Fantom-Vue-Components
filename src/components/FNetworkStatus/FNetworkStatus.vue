<template>
    <div class="fnetworkstatus not-visible">
        <f-popover ref="popover" class="fnetworkstatus_window">
            {{ _('fnetworkstatus.message') }}
        </f-popover>
    </div>
</template>

<script>
import { translationsMixin } from '../../mixins/translations.js';
import FPopover from '../FPopover/FPopover.vue';
import Vue from 'vue';

/** Global state for FNetworkStatus */
const networkStatusState = new Vue({
    data: {
        offline: false,
    },
});

/**
 * Shows popover window and adds css class `.offline` on the `<html>` element if `NetworkStatus.offline()` is called.
 */
export default {
    name: 'FNetworkStatus',

    mixins: [translationsMixin],

    components: { FPopover },

    computed: {
        isOffline() {
            return networkStatusState.offline;
        },
    },

    watch: {
        isOffline(value) {
            const eHtml = document.documentElement;
            const popover = this.$refs.popover;

            if (value) {
                popover.show();
                eHtml.classList.add('offline');
            } else {
                popover.hide();
                eHtml.classList.remove('offline');
            }
        },
    },

    offline() {
        networkStatusState.offline = true;
    },

    online() {
        networkStatusState.offline = false;
    },
};
</script>

<style lang="scss">
@import 'style';
</style>
