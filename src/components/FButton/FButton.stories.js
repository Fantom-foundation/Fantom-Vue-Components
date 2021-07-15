// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import FButton from './FButton.vue';
import FSvgIcon from '../FSvgIcon/FSvgIcon.vue';
import IconTimes from '../icons/IconTimes.vue';

export default {
    title: 'FButton',
    component: FButton,
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
            <f-button round aria-label="round"><f-svg-icon><icon-times /></f-svg-icon></f-button>
            <f-button round secondary aria-label="round"><f-svg-icon><icon-times /></f-svg-icon></f-button>
            <f-button round tertiary aria-label="round"><f-svg-icon><icon-times /></f-svg-icon></f-button>
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
            <f-button disabled round aria-label="round"><f-svg-icon><icon-times /></f-svg-icon></f-button>
            <f-button disabled round secondary aria-label="round"><f-svg-icon><icon-times /></f-svg-icon></f-button>
            <f-button disabled round tertiary aria-label="round"><f-svg-icon><icon-times /></f-svg-icon></f-button>
        </div>
    `,
});

export const Variants = () => ({
    components: { FButton, FSvgIcon, IconTimes },
    template: `
        <div>
            <h3><code>.btn-red</code></h3>
            <f-button label="Default" class="btn-red" />
            <f-button secondary label="Default" class="btn-red" />
            <f-button tertiary label="Default" class="btn-red" />
            <br />
            <f-button disabled label="Default" class="btn-red" />
            <f-button disabled secondary label="Default" class="btn-red" />
            <f-button disabled tertiary label="Default" class="btn-red" />
            <h3><code>.btn-green</code></h3>
            <f-button label="Default" class="btn-green" />
            <f-button secondary label="Default" class="btn-green" />
            <f-button tertiary label="Default" class="btn-green" />
            <br />
            <f-button disabled label="Default" class="btn-green" />
            <f-button disabled secondary label="Default" class="btn-green" />
            <f-button disabled tertiary label="Default" class="btn-green" />
            <h3><code>.btn-orange</code></h3>
            <f-button label="Default" class="btn-orange" />
            <f-button secondary label="Default" class="btn-orange" />
            <f-button tertiary label="Default" class="btn-orange" />
            <br />
            <f-button disabled label="Default" class="btn-orange" />
            <f-button disabled secondary label="Default" class="btn-orange" />
            <f-button disabled tertiary label="Default" class="btn-orange" />
            <h3><code>.btn-grey</code></h3>
            <f-button label="Default" class="btn-grey" />
            <f-button secondary label="Default" class="btn-grey" />
            <f-button tertiary label="Default" class="btn-grey" />
            <br />
            <f-button disabled label="Default" class="btn-grey" />
            <f-button disabled secondary label="Default" class="btn-grey" />
            <f-button disabled tertiary label="Default" class="btn-grey" />
            <h3><code>.btn-light, .darktheme -> fbutton</code></h3>
            <div class="bac-grey-8 pa-5 darktheme">
                <f-button label="Default" />
                <f-button secondary label="Default" class="btn-light" />
                <f-button tertiary label="Default" class="btn-light" />
                <br />
                <f-button disabled label="Default" />
                <f-button disabled secondary label="Default" class="btn-light" />
                <f-button disabled tertiary label="Default" class="btn-light" />
            </div>
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
