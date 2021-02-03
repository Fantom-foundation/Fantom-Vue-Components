// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import { withA11y } from '@storybook/addon-a11y';

import FButton from './FButton.vue';
import FSvgIcon from '../FSvgIcon/FSvgIcon.vue';
import IconTimes from '../icons/IconTimes.vue';

export default {
    title: 'FButton',
    component: FButton,
    decorators: [withA11y],
};

export const Default = () => ({
    components: { FButton, FSvgIcon, IconTimes },
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
            <h3>Round</h3>
            <f-button round><f-svg-icon><icon-times /></f-svg-icon></f-button>
            <f-button round secondary><f-svg-icon><icon-times /></f-svg-icon></f-button>
            <f-button round tertiary><f-svg-icon><icon-times /></f-svg-icon></f-button>
        </div>
    `,
});

export const Disabled = () => ({
    components: { FButton, FSvgIcon, IconTimes },
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
            <h3>Round</h3>
            <f-button disabled round><f-svg-icon><icon-times /></f-svg-icon></f-button>
            <f-button disabled round secondary><f-svg-icon><icon-times /></f-svg-icon></f-button>
            <f-button disabled round tertiary><f-svg-icon><icon-times /></f-svg-icon></f-button>
        </div>
    `,
});

export const Slot = () => ({
    components: { FButton, FSvgIcon, IconTimes },
    template: `
        <div>
            <f-button><f-svg-icon size="16px"><icon-times /></f-svg-icon> <i>Primary</i></f-button>
            <f-button secondary><f-svg-icon size="16px"><icon-times /></f-svg-icon> <i>Secondary</i></f-button>
            <f-button tertiary><f-svg-icon size="16px"><icon-times /></f-svg-icon> <i>Tertiary</i></f-button>
        </div>
    `,
});
