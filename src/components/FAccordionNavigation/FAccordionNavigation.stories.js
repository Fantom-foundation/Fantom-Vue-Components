import FAccordionNavigation from './FAccordionNavigation.vue';
import Vue from 'vue';
import FIconset from '@/components/FIconset/FIconset.vue';

Vue.component('FIconset', FIconset);

export default {
    title: 'FAccordionNavigation',
    component: FAccordionNavigation,
};

const baseDefault = '/?path=/story/faccordionnavigation--default';
export const Default = () => ({
    components: { FAccordionNavigation },
    template: `
        <div style="max-width: 320px;">
            <f-accordion-navigation :navigation="navigation" />
        </div>
    `,
    data() {
        return {
            navigation: [
                {
                    label: 'Item 1',
                    _c: [
                        { label: 'Item 2.1 (target="_blank")', url: `${baseDefault}#url21`, blank: true },
                        {
                            label: 'Item 2.2',
                            // url: `${baseDefault}#url22`,
                            _c: [
                                { label: 'Item 3.1', url: `${baseDefault}#url31` },
                                { id: 'id1', label: 'Item 3.2', url: `${baseDefault}#url32` },
                                { label: 'Item 3.3', url: `${baseDefault}#url33` },
                            ],
                        },
                    ],
                },
                { label: 'Item 2', url: `${baseDefault}#url2` },
            ],
        };
    },
});

const baseWithIcons = '/?path=/story/faccordionnavigation--with-icons';
export const WithIcons = () => ({
    components: { FAccordionNavigation },
    template: `
        <div style="max-width: 320px;">
            <f-accordion-navigation iconset-component="f-iconset" :navigation="navigation" />
        </div>
    `,
    data() {
        return {
            navigation: [
                {
                    label: 'Item 1',
                    icon: 'fantom',
                    _c: [
                        { label: 'Item 2.1 (target="_blank")', url: `${baseWithIcons}#url21`, blank: true },
                        {
                            label: 'Item 2.2',
                            // url: `${baseWithIcons}#url22`,
                            _c: [
                                { label: 'Item 3.1', url: `${baseWithIcons}#url31` },
                                { id: 'id1', label: 'Item 3.2', url: `${baseWithIcons}#url32` },
                                { label: 'Item 3.3', url: `${baseWithIcons}#url33` },
                            ],
                        },
                    ],
                },
                { label: 'Item 2', url: `${baseWithIcons}#url2`, icon: 'info-circle' },
            ],
        };
    },
});

const baseExpanded = '/?path=/story/faccordionnavigation--expanded';
export const Expanded = () => ({
    components: { FAccordionNavigation },
    template: `
        <div style="max-width: 320px;">
            <f-accordion-navigation expanded :navigation="navigation" />
        </div>
    `,
    data() {
        return {
            navigation: [
                {
                    label: 'Item 1',
                    _c: [
                        { label: 'Item 2.1 (target="_blank")', url: `${baseExpanded}#url21`, blank: true },
                        {
                            label: 'Item 2.2',
                            // url: `${baseExpanded}#url22`,
                            _c: [
                                { label: 'Item 3.1', url: `${baseExpanded}#url31` },
                                { id: 'id1', label: 'Item 3.2', url: `${baseExpanded}#url32` },
                                { label: 'Item 3.3', url: `${baseExpanded}#url33` },
                            ],
                        },
                    ],
                },
                { label: 'Item 2', url: `${baseExpanded}#url2` },
            ],
        };
    },
});

const baseActive = '/?path=/story/faccordionnavigation--active';
export const Active = () => ({
    components: { FAccordionNavigation },
    template: `
        <div style="max-width: 320px;">
            <f-accordion-navigation expanded :navigation="navigation" />
        </div>
    `,
    data() {
        return {
            navigation: [
                {
                    label: 'Item 1',
                    active: true,
                    _c: [
                        { label: 'Item 2.1 (target="_blank")', url: `${baseActive}#url21`, blank: true },
                        {
                            label: 'Item 2.2',
                            active: true,
                            _c: [
                                { label: 'Item 3.1', url: `${baseActive}#url31` },
                                { id: 'id1', label: 'Item 3.2', url: `${baseActive}#url32` },
                                { label: 'Item 3.3', url: `${baseActive}#url33`, active: true },
                            ],
                        },
                    ],
                },
                { label: 'Item 2', url: `${baseActive}#url2` },
            ],
        };
    },
});
