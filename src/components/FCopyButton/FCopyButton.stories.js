import { withA11y } from '@storybook/addon-a11y';

import FCopyButton from './FCopyButton.vue';

export default {
    title: 'FCopyButton',
    component: FCopyButton,
    decorators: [withA11y],
};

export const Default = () => ({
    components: { FCopyButton },
    template: `
        <div>
            <f-copy-button text="copied!" />
        </div>
    `,
});

export const PopoverText = () => ({
    components: { FCopyButton },
    template: `
        <div>
            <f-copy-button popover-text="Popover text" text="copied!" />
        </div>
    `,
});

export const ButtonTitle = () => ({
    components: { FCopyButton },
    template: `
        <div>
            <f-copy-button button-title="Button title" text="copied!" />
        </div>
    `,
});

export const IconSize = () => ({
    components: { FCopyButton },
    template: `
        <div>
            <f-copy-button icon-size="24px" text="copied!" />
        </div>
    `,
});

export const HideAfter = () => ({
    components: { FCopyButton },
    template: `
        <div>
            <f-copy-button :hide-after="3000" text="copied!" />
        </div>
    `,
});

export const DefaultSlot = () => ({
    components: { FCopyButton },
    template: `
        <div>
            <f-copy-button button-id="fcb1" text="copied!">
                <b>Popover</b> <i>text</i>
            </f-copy-button>
        </div>
    `,
});

export const ButtonSlot = () => ({
    components: { FCopyButton },
    template: `
        <div>
            <f-copy-button button-id="fcb1" text="copied!">
                <template #button><button id="fcb1">Copy</button></template>
            </f-copy-button>
        </div>
    `,
});

export const ButtonContentSlot = () => ({
    components: { FCopyButton },
    template: `
        <div>
            <f-copy-button :round="false" text="copied!">
                <template #button-content>
                    Copy
                </template>
            </f-copy-button>
        </div>
    `,
});

export const Variations = () => ({
    components: { FCopyButton },
    template: `
        <div>
            <f-copy-button :tertiary="false" :round="false" attach-position="bottom" text="copied!" />
        </div>
    `,
});
