// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import FTabs from './FTabs.vue';
import FTab from './FTab.vue';

export default {
    title: 'FTabs',
    component: FTabs,
};

export const Default = () => ({
    components: { FTabs, FTab },
    template: `
        <div>
            <f-tabs aria-label="Default tabs">
                <f-tab title="Tab 1">
                    First tab is active by default.
                </f-tab>
                <f-tab title="Tab 2">
                    Tab 2 content
                </f-tab>
                <f-tab title="Tab 3">
                    Tab 3 content
                </f-tab>
            </f-tabs>
        </div>
    `,
});

export const ActiveTab = () => ({
    components: { FTabs, FTab },
    template: `
        <div>
            <f-tabs aria-label="Default tabs">
                <f-tab title="Tab 1">
                    Tab 1 content
                </f-tab>
                <f-tab title="Tab 2" active>
                    Tab 2 content
                </f-tab>
                <f-tab title="Tab 3">
                    Tab 3 content
                </f-tab>
            </f-tabs>
        </div>
    `,
});

export const DisabledTab = () => ({
    components: { FTabs, FTab },
    template: `
        <div>
            <f-tabs aria-label="Default tabs">
                <f-tab title="Tab 1">
                    Tab 1 content
                </f-tab>
                <f-tab title="Tab 2" active>
                    Tab 2 content
                </f-tab>
                <f-tab title="Tab 3" disabled>
                    Tab 3 content
                </f-tab>
            </f-tabs>
        </div>
    `,
});

export const TitleSlot = () => ({
    components: { FTabs, FTab },
    template: `
        <div>
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
        </div>
    `,
});

export const ALotOfTabs = () => ({
    components: { FTabs, FTab },
    template: `
        <div>
            <f-tabs aria-label="Default tabs">
                <f-tab title="Tab 1">
                    Tab 1 content
                </f-tab>
                <f-tab title="Tab 2">
                    Tab 2 content
                </f-tab>
                <f-tab title="Tab 3">
                    Tab 3 content
                </f-tab>
                <f-tab title="Tab 4">
                    Tab 4 content
                </f-tab>
                <f-tab title="Tab 5">
                    Tab 5 content
                </f-tab>
                <f-tab title="Tab 6">
                    Tab 6 content
                </f-tab>
                <f-tab title="Tab 7">
                    Tab 7 content
                </f-tab>
                <f-tab title="Tab Loooooooooooooooong">
                    Tab 8 content
                </f-tab>
            </f-tabs>
        </div>
    `,
});
