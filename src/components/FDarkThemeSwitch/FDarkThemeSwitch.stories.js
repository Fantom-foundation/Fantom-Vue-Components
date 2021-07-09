import FDarkThemeSwitch from './FDarkThemeSwitch.vue';

export default {
    title: 'FDarkThemeSwitch',
    component: FDarkThemeSwitch,
};

export const Default = () => ({
    components: { FDarkThemeSwitch },
    template: `
        <div>
            <f-dark-theme-switch />
            <f-dark-theme-switch label="with label" />
        </div>
    `,
});

export const Size = () => ({
    components: { FDarkThemeSwitch },
    template: `
        <div>
            <f-dark-theme-switch option-size="large" />
            <f-dark-theme-switch />
            <f-dark-theme-switch option-size="small" />
            <f-dark-theme-switch option-size="mini" />
        </div>
    `,
});

export const Colors = () => ({
    components: { FDarkThemeSwitch },
    template: `
        <div>
            <f-dark-theme-switch :style="blueStyle" />
            <f-dark-theme-switch :style="purpleStyle" />
        </div>
    `,
    data() {
        return {
            blueStyle: {
                '--fdarkthemeswitch-color': '#08209e',
                '--fdarkthemeswitch-color-hsl': '230, 90%, 33%',
            },
            purpleStyle: {
                '--fdarkthemeswitch-color': '#800E99',
                '--fdarkthemeswitch-color-hsl': '289, 83%, 33%',
            },
        };
    },
});
