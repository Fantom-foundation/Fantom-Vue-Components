import FNetworkStatus from './FNetworkStatus.vue';
import FButton from '@/components/FButton/FButton.vue';

export default {
    title: 'FNetworkStatus',
    component: FNetworkStatus,
};

export const Default = () => ({
    components: { FNetworkStatus, FButton },
    template: `
        <div>
            <f-button label="offline" @click.native="offline()" />
            <f-button label="online" @click.native="online()" />
            <f-network-status />
        </div>
    `,
    methods: {
        offline() {
            FNetworkStatus.offline();
        },

        online() {
            FNetworkStatus.online();
        },
    },
});
