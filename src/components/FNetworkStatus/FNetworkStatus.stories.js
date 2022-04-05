import FNetworkStatus from './FNetworkStatus.vue';
import FButton from '@/components/FButton/FButton.vue';
import FAriaAlert from '@/components/FAriaAlert/FAriaAlert.vue';

export default {
    title: 'FNetworkStatus',
    component: FNetworkStatus,
};

export const Default = () => ({
    components: { FNetworkStatus, FButton, FAriaAlert },
    template: `
        <div>
            <f-button label="offline" @click.native="offline()" />
            <f-button label="online" @click.native="online()" />
            <f-network-status />
            <f-aria-alert />
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
