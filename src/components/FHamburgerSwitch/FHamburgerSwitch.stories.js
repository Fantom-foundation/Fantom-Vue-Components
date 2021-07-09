import FHamburgerSwitch from './FHamburgerSwitch.vue';

export default {
    title: 'FHamburgerSwitch',
    component: FHamburgerSwitch,
};

export const Default = () => ({
    components: { FHamburgerSwitch },
    template: `
        <div>
            <f-hamburger-switch />
        </div>
    `,
});

export const Thickness = () => ({
    components: { FHamburgerSwitch },
    template: `
        <div>
            <f-hamburger-switch thickness="1" />
            <f-hamburger-switch thickness="2" />
            <f-hamburger-switch thickness="3" />
        </div>
    `,
});

export const TwoLines = () => ({
    components: { FHamburgerSwitch },
    template: `
        <div>
            <f-hamburger-switch two-lines thickness="1" />
            <f-hamburger-switch two-lines thickness="2" />
            <f-hamburger-switch two-lines thickness="3" />
        </div>
    `,
});

export const MobileViewBreakpoint = () => ({
    components: { FHamburgerSwitch },
    template: `
        <div>
            <h3>Resize viewport under/above 800px</h3>
            <f-hamburger-switch mobile-view-breakpoint="800px" :on="on" thickness="2" />
        </div>
    `,
    data() {
        return {
            on: true,
        };
    },
    mounted() {
        setTimeout(() => {
            this.on = false;

            setTimeout(() => {
                this.on = true;
            }, 100);
        }, 100);
    },
});

export const Size = () => ({
    components: { FHamburgerSwitch },
    template: `
        <div>
            <f-hamburger-switch :style="bigSize" />
            <f-hamburger-switch :style="smallSize" />
        </div>
    `,
    data() {
        return {
            bigSize: {
                transform: 'scale(1.2, 1.2)',
            },
            smallSize: {
                transform: 'scale(0.5, 0.5)',
            },
        };
    },
});

export const Colors = () => ({
    components: { FHamburgerSwitch },
    template: `
        <div>
            <f-hamburger-switch :style="blueStyle" thickness="2" />
            <f-hamburger-switch :style="purpleStyle" thickness="2" />
        </div>
    `,
    data() {
        return {
            blueStyle: {
                '--fhamburgerswitch-color': '#08209e',
            },
            purpleStyle: {
                '--fhamburgerswitch-color': '#800E99',
            },
        };
    },
});
