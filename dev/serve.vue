<template>
    <main id="app" class="container">
        <h1>Playground</h1>

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

        <f-form-playground />
    </main>
</template>

<script>
import Vue from 'vue';
import FTabs from '@/components/FTabs/FTabs.vue';
import FTab from '@/components/FTabs/FTab.vue';
import FFormPlayground from './playground/FForm/FForm.vue';

// import components from '../src/entry.js';
// components.install(Vue);

export default Vue.extend({
    name: 'ServeDev',

    components: { FFormPlayground, FTab, FTabs },
});
</script>

<style lang="scss">
@import '../src/assets/scss/demo';
</style>
