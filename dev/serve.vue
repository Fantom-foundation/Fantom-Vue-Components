<template>
    <main id="appd" class="container">
        <h1>Playground</h1>
        <button @click="ltr = !ltr">{{ ltr ? 'rtl' : 'ltr' }}</button>

        <section hidden>
            <h1 class="h2">Tabs</h1>
            <f-tabs aria-label="Default tabs">
                <template #tab1-title><b>Bold</b></template>
                <template #tab2-title><i>Italic</i></template>
                <template #tab3-title><span>&#9742; With icon</span></template>

                <f-tab title-slot="tab1-title">
                    Tab 1 content
                </f-tab>
                <f-tab title-slot="tab2-title">
                    Tab 2 content
                </f-tab>
                <f-tab title-slot="tab3-title">
                    Tab 3 content
                </f-tab>
                <f-tab title="Tab 4">
                    Tab 4 content
                </f-tab>
            </f-tabs>
        </section>

        <f-data-grid-playground />

        <!--
        <f-navigation-playground />
        <f-form-playground2 />
        <f-tooltip-playground />

        <f-loader-playground />
        <f-dots-loader-playground />
        <translations-playground />
        <f-notifications-playground />

        -->
    </main>
</template>

<script>
import Vue from 'vue';
import FTabs from '@/components/FTabs/FTabs.vue';
import FTab from '@/components/FTabs/FTab.vue';
import FDataGridPlayground from './playground/FDataGrid/FDataGrid.vue';
/*
import FNavigationPlayground from './playground/FNavigation/FNavigationPlayground.vue';
import FFormPlayground2 from './playground/FForm/FForm2.vue';
import FNotificationsPlayground from './playground/FNotifications/FNotifications.vue';
import TranslationsPlayground from './playground/Translations/TranslationsPlayground.vue';
import FDotsLoaderPlayground from './playground/FDotsLoader/FDotsLoaderPlayground.vue';
import FLoaderPlayground from './playground/FLoader/FLoaderPlayground.vue';
import FTooltipPlayground from './playground/FTooltip/FTooltipPlayground.vue';
*/

import FErrorMessagesPopover from '@/components/FErrorMessagesPopover/FErrorMessagesPopover.vue';

Vue.component('FErrorMessagesPopover', FErrorMessagesPopover);

// import components from '../src/entry.js';
// components.install(Vue);

export default Vue.extend({
    name: 'ServeDev',

    components: {
        /*
        FTooltipPlayground,
        FLoaderPlayground,
        FDotsLoaderPlayground,
        TranslationsPlayground,
        FNotificationsPlayground,
        FFormPlayground2,
        FNavigationPlayground,
        */
        FDataGridPlayground,
        FTab,
        FTabs,
    },

    data() {
        return {
            ltr: true,
        };
    },

    watch: {
        ltr(_value) {
            /** @type {HTMLElement} */
            const eHtml = document.getElementsByTagName('html')[0];

            if (_value) {
                eHtml.removeAttribute('dir');
            } else {
                eHtml.setAttribute('dir', 'rtl');
            }
        },
    },
});
</script>

<style lang="scss">
@use '../src/assets/scss/demo';
</style>
