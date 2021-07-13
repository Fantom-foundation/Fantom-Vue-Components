import FIconset from './FIconset.vue';

export default {
    title: 'FIconset',
    component: FIconset,
};

const iconList = [
    'angle-left',
    'check-circle',
    'chevron-down',
    'exclamation-circle',
    'eye',
    'eye-slash',
    'fantom',
    'info-circle',
    'popover-arrow',
    'search',
    'times',
    'trash',
];

export const Default = () => ({
    components: { FIconset },
    template: `
        <div class="gridauto gridauto-miw-128">
            <div v-for="icon in iconList" class="flex flex-column ali-center">
                <f-iconset :icon="icon" size="32px" />
                <span class="fos-4 co-grey-6 pat-1">{{ icon }}</span>
            </div>
        </div>
    `,
    data() {
        return {
            iconList,
        };
    },
});
