import { withA11y } from '@storybook/addon-a11y';

import FInfo from './FInfo.vue';

export default {
    title: 'FInfo',
    component: FInfo,
    decorators: [withA11y],
};

export const Default = () => ({
    components: { FInfo },
    template: `
        <div class="pat-5">
            Lorem ipsum
            <f-info>
                dolor sit amet, consectetur adipisicing elit. Aperiam ex fuga fugit inventore libero perspiciatis, suscipit veritatis voluptatum?
            </f-info>
        </div>
    `,
});

export const UsePopup = () => ({
    components: { FInfo },
    template: `
        <div class="pat-5">
            Lorem ipsum
            <f-info use-popup with-header :window-style="{ maxWidth: '480px' }">
                dolor sit amet, consectetur adipisicing elit. Aperiam ex fuga fugit inventore libero perspiciatis, suscipit veritatis voluptatum?
            </f-info>
        </div>
    `,
});

export const ButtonTitle = () => ({
    components: { FInfo },
    template: `
        <div class="pat-5">
            Lorem ipsum
            <f-info button-title="Button title">
                dolor sit amet, consectetur adipisicing elit. Aperiam ex fuga fugit inventore libero perspiciatis, suscipit veritatis voluptatum?
            </f-info>
        </div>
    `,
});

export const IconSize = () => ({
    components: { FInfo },
    template: `
        <div class="pat-5">
            Lorem ipsum
            <f-info icon-size="24px">
                dolor sit amet, consectetur adipisicing elit. Aperiam ex fuga fugit inventore libero perspiciatis, suscipit veritatis voluptatum?
            </f-info>
        </div>
    `,
});

export const ButtontSlot = () => ({
    components: { FInfo },
    template: `
        <div class="pat-5">
            <f-info button-id="fi1">
                <template #button><button id="fi1">Info</button></template>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam ex fuga fugit inventore libero perspiciatis, suscipit veritatis voluptatum?
            </f-info>
        </div>
    `,
});

export const ButtonContentSlot = () => ({
    components: { FInfo },
    template: `
        <div class="pat-5">
            <f-info>
                <template #button-content>
                    Info
                </template>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam ex fuga fugit inventore libero perspiciatis, suscipit veritatis voluptatum?
            </f-info>
        </div>
    `,
});

export const Variations = () => ({
    components: { FInfo },
    template: `
        <div class="pat-5">
            <f-info secondary :tertiary="false" :round="false">
                <template #button-content>
                    Info
                </template>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam ex fuga fugit inventore libero perspiciatis, suscipit veritatis voluptatum?
            </f-info>
            Lorem ipsum
            <f-info with-header title="Info">
                dolor sit amet, consectetur adipisicing elit. Aperiam ex fuga fugit inventore libero perspiciatis, suscipit veritatis voluptatum?
            </f-info>
            dolor sit amet, consectetur adipisicing elit. Aperiam ex fuga fugit inventore libero perspiciatis, suscipit veritatis voluptatum?
        </div>
    `,
});
