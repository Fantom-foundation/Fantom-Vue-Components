// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import { withA11y } from '@storybook/addon-a11y';

import FButton from './FButton.vue';

export default {
    title: 'FButton',
    component: FButton,
    decorators: [withA11y],
};

export const Default = () => ({
    components: { FButton },
    template: `
        <div>
            <h3>Primary (default)</h3>
            <f-button size="large" label="Large" />
            <f-button label="Default" />
            <f-button size="small" label="Small" />
            <f-button size="mini" label="Mini" />
            <h3>Secondary</h3>
            <f-button secondary size="large" label="Large" />
            <f-button secondary label="Default" />
            <f-button secondary size="small" label="Small" />
            <f-button secondary size="mini" label="Mini" />
            <h3>Tertiary</h3>
            <f-button tertiary size="large" label="Large" />
            <f-button tertiary label="Default" />
            <f-button tertiary size="small" label="Small" />
            <f-button tertiary size="mini" label="Mini" />
        </div>
    `,
});

export const Disabled = () => ({
    components: { FButton },
    template: `
        <div>
            <h3>Primary (default)</h3>
            <f-button disabled size="large" label="Large" />
            <f-button disabled label="Default" />
            <f-button disabled size="small" label="Small" />
            <f-button disabled size="mini" label="Mini" />
            <h3>Secondary</h3>
            <f-button disabled secondary size="large" label="Large" />
            <f-button disabled secondary label="Default" />
            <f-button disabled secondary size="small" label="Small" />
            <f-button disabled secondary size="mini" label="Mini" />
            <h3>Tertiary</h3>
            <f-button disabled tertiary size="large" label="Large" />
            <f-button disabled tertiary label="Default" />
            <f-button disabled tertiary size="small" label="Small" />
            <f-button disabled tertiary size="mini" label="Mini" />
        </div>
    `,
});

export const Slot = () => ({
    components: { FButton },
    template: `
        <div>
            <f-button>&#9742; <i>Primary</i></f-button>
            <f-button secondary>&#9742; <i>Secondary</i></f-button>
            <f-button tertiary>&#9742; <i>Tertiary</i></f-button>
        </div>
    `,
});
