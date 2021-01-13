// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import { withA11y } from '@storybook/addon-a11y';

import FMessage from './FMessage.vue';

export default {
    title: 'FMessage',
    component: FMessage,
    decorators: [withA11y],
};

function validator(_value) {
    return _value === 'yes';
}

export const Default = () => ({
    components: { FMessage },
    template: `
        <div>
            <f-message type="success"><b>Success</b> message</f-message>
            <f-message type="error"><b>Error</b> message</f-message>
            <f-message type="info"><b>Info</b> message</f-message>
            <f-message type="warning"><b>Warning</b> message</f-message>
        </div>
    `,
    methods: { validator },
});

export const Slots = () => ({
    components: { FMessage },
    template: `
        <div>
            <f-message type="success" with-icon>
                <template #prefix><span>prefix</span></template>
                <b>Success</b> message
                <template #suffix><span>suffix</span></template>
            </f-message>
        </div>
    `,
    methods: { validator },
});

export const WithIcon = () => ({
    components: { FMessage },
    template: `
        <div>
            <f-message type="success" with-icon><b>Success</b> message</f-message>
            <f-message type="error" with-icon><b>Error</b> message</f-message>
            <f-message type="info" with-icon><b>Info</b> message</f-message>
            <f-message type="warning" with-icon><b>Warning</b> message</f-message>
        </div>
    `,
    methods: { validator },
});
