import FChips from '@/components/FChips/FChips.vue';
import FButton from '@/components/FButton/FButton.vue';

export default {
    title: 'FChips',
    component: FChips,
};

export const Default = () => ({
    components: { FChips },
    //language=HTML
    template: `
        <div>
            <f-chips />
        </div>
    `,
});

export const Data = () => ({
    components: { FChips },
    //language=HTML
    template: `
        <div>
            <f-chips :data="data" />
        </div>
    `,
    data() {
        return {
            data: [{ label: 'chip 1' }, { label: 'chip 2' }, { label: 'chip 3' }],
        };
    },
});

export const Removable = () => ({
    components: { FChips },
    //language=HTML
    template: `
        <div>
            <f-chips removable :data="data" />
        </div>
    `,
    data() {
        return {
            data: [{ label: 'chip 1' }, { label: 'chip 2' }, { label: 'chip 3' }],
        };
    },
});

export const Size = () => ({
    components: { FChips },
    //language=HTML
    template: `
        <div>
            <h3>Large</h3>
            <f-chips size="large" removable :data="data" />
            <h3>Default</h3>
            <f-chips removable :data="data" />
            <h3>Small</h3>
            <f-chips size="small" removable :data="data" />
            <h3>Mini</h3>
            <f-chips size="mini" removable :data="data" />
        </div>
    `,
    data() {
        return {
            data: [{ label: 'chip 1' }, { label: 'chip 2' }, { label: 'chip 3' }],
        };
    },
});

export const Model = () => ({
    components: { FChips, FButton },
    //language=HTML
    template: `
        <div>
            <f-chips v-model="data" removable />
            <br />
            data: {{ data }} <br />
            <f-button secondary size="small" @click.native="data = [{ label: 'NEW CHIP'}]">Set data</f-button>
        </div>
    `,
    data() {
        return {
            data: [{ label: 'chip 1' }, { label: 'chip 2' }, { label: 'chip 3' }],
        };
    },
});
