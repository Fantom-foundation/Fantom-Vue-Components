// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import { withA11y } from '@storybook/addon-a11y';

import FAriaAlert from './FAriaAlert.vue';
import FButton from '../FButton/FButton.vue';
import { eventBusMixin } from '../../mixins/event-bus.js';

export default {
    title: 'FAriaAlert',
    component: FAriaAlert,
    decorators: [withA11y],
};

export const Default = () => ({
    components: { FAriaAlert, FButton },
    mixins: [eventBusMixin],
    template: `
        <div>
            <!-- main contnent -->
            <div>
                <f-button label="Append message" @click.native="onAppend" />
                <f-button label="Replace messages" @click.native="onReplace" />
                <f-button label="Clear messages" @click.native="onClear" />
            </div>

            <f-aria-alert />
        </div>
    `,
    data() {
        return {
            msgsCount: 1,
        };
    },
    methods: {
        onAppend() {
            this._eventBus.emit('aria-alert-append', `Message <b>${this.msgsCount++}</b>`);
        },
        onReplace() {
            this._eventBus.emit('aria-alert-replace', 'Replace message');
        },
        onClear() {
            this._eventBus.emit('aria-alert-clear');
        },
    },
});
