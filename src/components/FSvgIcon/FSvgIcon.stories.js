import FSvgIcon from './FSvgIcon.vue';
import IconFantom from '../icons/IconFantom.vue';
import IconTimes from '../icons/IconTimes.vue';
import IconPresent from '../icons/IconPresent.vue';

export default {
    title: 'FSvgIcon',
    component: FSvgIcon,
};

export const Default = () => ({
    components: { FSvgIcon, IconTimes, IconPresent, IconFantom },
    template: `
        <div>
            <f-svg-icon><icon-fantom /></f-svg-icon>
            <f-svg-icon><icon-times /></f-svg-icon>
            <f-svg-icon><icon-present /></f-svg-icon>
        </div>
    `,
});

export const Size = () => ({
    components: { FSvgIcon, IconTimes, IconPresent, IconFantom },
    template: `
        <div>
            <f-svg-icon size="16px"><icon-fantom /></f-svg-icon>
            <f-svg-icon><icon-fantom /></f-svg-icon>
            <f-svg-icon style="--fsvgicon-width: 48px;--fsvgicon-height: 48px;"><icon-fantom /></f-svg-icon>
            <f-svg-icon width="64px" height="64px"><icon-fantom /></f-svg-icon>
        </div>
    `,
});

export const Color = () => ({
    components: { FSvgIcon, IconTimes, IconPresent, IconFantom },
    template: `
        <div>
            <f-svg-icon color="#00c"><icon-fantom /></f-svg-icon>
            <f-svg-icon color="#c00"><icon-times /></f-svg-icon>
            <f-svg-icon style="--fsvgicon-color: #0c0"><icon-present /></f-svg-icon>
        </div>
    `,
});

export const Original = () => ({
    components: { FSvgIcon, IconTimes, IconPresent, IconFantom },
    template: `
        <div>
            <f-svg-icon original><icon-fantom /></f-svg-icon>
            <f-svg-icon original><icon-times /></f-svg-icon>
            <f-svg-icon original><icon-present /></f-svg-icon>
        </div>
    `,
});

export const Rotate = () => ({
    components: { FSvgIcon, IconTimes, IconPresent, IconFantom },
    template: `
        <div>
            <f-svg-icon rotate="0deg" size="32px"><icon-fantom /></f-svg-icon>
            <f-svg-icon rotate="90deg" size="32px"><icon-fantom /></f-svg-icon>
            <f-svg-icon rotate="180deg" size="32px"><icon-fantom /></f-svg-icon>
            <f-svg-icon rotate="270deg" size="32px"><icon-fantom /></f-svg-icon>
        </div>
    `,
});
