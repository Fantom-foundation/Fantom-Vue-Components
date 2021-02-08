// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import { withA11y } from '@storybook/addon-a11y';

import FNotifications from './FNotifications.vue';
import FButton from '@/components/FButton/FButton.vue';

import Vue from 'vue';
import { Notifications } from '@/plugins/notifications.js';

Vue.use(Notifications);

export default {
    title: 'FNotifications',
    component: FNotifications,
    decorators: [withA11y],
};

function notificationText(_type) {
    if (_type === 'success') {
        return 'Success message';
    } else if (_type === 'error') {
        return 'Error message';
    } else if (_type === 'warning') {
        return 'Warning message';
    } else if (_type === 'info') {
        return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.';
    }
}

function getRandomType() {
    return ['success', 'error', 'warning', 'info'][Math.floor(Math.random() * 4)];
}

export const Default = () => ({
    components: { FNotifications, FButton },
    template: `
        <div>
            <h3>In page</h3>
            <p>
                <f-button secondary size="small" @click.native="onButtonClick('success')">success</f-button>
                <f-button secondary size="small" @click.native="onButtonClick('error')">error</f-button>
                <f-button secondary size="small" @click.native="onButtonClick('warning')">warning</f-button>
                <f-button secondary size="small" @click.native="onButtonClick('info')">info</f-button>
            </p>
            <f-notifications ref="notifications" style="max-width: 400px; padding: 0;" />
        </div>
    `,
    methods: {
        onButtonClick(_type) {
            this.$refs.notifications.add({
                type: _type,
                text: notificationText(_type),
                withIcon: _type === 'error',
            });
        },
    },
});

export const PositionAndGroup = () => ({
    components: { FNotifications, FButton },
    template: `
        <div>
            <p>
                <br /><br /><br /><br /><br />
                <f-button secondary size="small" @click.native="onButtonClick('topleft')">top-left</f-button>
                <f-button secondary size="small" @click.native="onButtonClick('topcenter')">top-center</f-button>
                <f-button secondary size="small" @click.native="onButtonClick('topright')">top-right</f-button>
                <f-button secondary size="small" @click.native="onButtonClick('bottomleft')">bottom-left</f-button>
                <f-button secondary size="small" @click.native="onButtonClick('bottomcenter')">bottom-center</f-button>
                <f-button secondary size="small" @click.native="onButtonClick('bottomright')">bottom-right</f-button>
            </p>
            <f-notifications position="top-left" group="topleft" />
            <f-notifications position="top-center" group="topcenter" />
            <f-notifications position="top-right" group="topright" />
            <f-notifications position="bottom-left" group="bottomleft" />
            <f-notifications position="bottom-center" group="bottomcenter" />
            <f-notifications position="bottom-right" group="bottomright" />
        </div>
    `,
    methods: {
        onButtonClick(_group) {
            let type = getRandomType();

            this.$notifications.add(
                {
                    type,
                    text: notificationText(type),
                    withIcon: type === 'error',
                },
                _group
            );
        },
    },
});

export const Strategy = () => ({
    components: { FNotifications, FButton },
    template: `
        <div>
            <p>
                <f-button secondary size="small" @click.native="onButtonClick('bottomleft')">No strategy</f-button>
                <f-button secondary size="small" @click.native="onButtonClick('bottomcenter')"><code>'newest-first'</code></f-button>
                <f-button secondary size="small" @click.native="onButtonClick('topright')"><code>'single'</code></f-button>
            </p>
            <f-notifications position="bottom-left" group="bottomleft" />
            <f-notifications strategy="newest-first" position="bottom-center" group="bottomcenter" />
            <f-notifications strategy="single" position="top-right" group="topright" />
        </div>
    `,
    methods: {
        onButtonClick(_group) {
            let type = getRandomType();

            this.$notifications.add(
                {
                    type,
                    text: notificationText(type),
                    withIcon: type === 'error',
                },
                _group
            );
        },
    },
});

export const Hide = () => ({
    components: { FNotifications, FButton },
    template: `
        <div>
            <h3><code>hide-on-click</code></h3>
            <p>
                <f-button secondary size="small" @click.native="onButtonClick('topcetner')">show notification</f-button>
            </p>

            <h3><code>hide-on-close-button</code></h3>
            <p>
                <f-button secondary size="small" @click.native="onButtonClick('topright')">show notification</f-button>
            </p>

            <h3><code>hide-after</code></h3>
            <p>
                <f-button secondary size="small" @click.native="onButtonClick('topleft')">show notification</f-button>
            </p>

            <f-notifications hide-on-click position="top-center" group="topcetner" />
            <f-notifications hide-on-close-button position="top-right" group="topright" />
            <f-notifications :hide-after="{success: 1000, error: 1000, warning: 1000, info: 1000}" position="top-left" group="topleft" />
        </div>
    `,
    methods: {
        onButtonClick(_group) {
            let type = getRandomType();

            this.$notifications.add(
                {
                    type,
                    text: notificationText(type),
                    withIcon: type === 'error',
                },
                _group
            );
        },
    },
});

export const Slot = () => ({
    components: { FNotifications, FButton },
    template: `
        <div>
            <p>
                <f-button secondary size="small" @click.native="onButtonClick('topcenter')">show notification</f-button>
            </p>

            <f-notifications
                group="topcenter"
                position="top-center"
                animation-in="slide-down-enter-active"
                animation-out="slide-up-leave-active"
            >
                <template #notification="notification">
                    <template v-if="notification.html">
                        <b>&#9742; <span v-html="notification.html"></span></b>
                    </template>
                    <template v-else-if="notification.text">
                        <b>&#9742; {{ notification.text }}</b>
                    </template>
                </template>
            </f-notifications>
        </div>
    `,
    methods: {
        onButtonClick(_group) {
            let type = getRandomType();

            this.$notifications.add(
                {
                    type,
                    text: notificationText(type),
                    withIcon: type === 'error',
                },
                _group
            );
        },
    },
});

export const WithIcon = () => ({
    components: { FNotifications, FButton },
    template: `
        <div>
            <p>
                <f-button secondary size="small" @click.native="onButtonClick('topcetner')">show notification</f-button>
            </p>

            <f-notifications with-icon position="top-center" group="topcetner" />
        </div>
    `,
    methods: {
        onButtonClick(_group) {
            let type = getRandomType();

            this.$notifications.add(
                {
                    type,
                    text: notificationText(type),
                },
                _group
            );
        },
    },
});

export const Variations = () => ({
    components: { FNotifications, FButton },
    template: `
        <div>
            <div class="grid">
                <div class="col-4">
                    <h3>top-left</h3>
                    <p>
                        <f-button secondary size="small" @click.native="onButtonClick('success', 'topleft')">success</f-button>
                        <f-button secondary size="small" @click.native="onButtonClick('error', 'topleft')">error</f-button>
                        <f-button secondary size="small" @click.native="onButtonClick('warning', 'topleft')">warning</f-button>
                        <f-button secondary size="small" @click.native="onButtonClick('info', 'topleft')">info</f-button>
                    </p>
                </div>

                <div class="col-4">
                    <h3>top-center</h3>
                    <p>
                        <f-button secondary size="small" @click.native="onButtonClick('success', 'topcenter')">success</f-button>
                        <f-button secondary size="small" @click.native="onButtonClick('error', 'topcenter')">error</f-button>
                        <f-button secondary size="small" @click.native="onButtonClick('warning', 'topcenter')">warning</f-button>
                        <f-button secondary size="small" @click.native="onButtonClick('info', 'topcenter')">info</f-button>
                    </p>
                </div>

                <div class="col-4">
                    <h3>top-right</h3>
                    <p>
                        <f-button secondary size="small" @click.native="onButtonClick('success', 'topright')">success</f-button>
                        <f-button secondary size="small" @click.native="onButtonClick('error', 'topright')">error</f-button>
                        <f-button secondary size="small" @click.native="onButtonClick('warning', 'topright')">warning</f-button>
                        <f-button secondary size="small" @click.native="onButtonClick('info', 'topright')">info</f-button>
                    </p>
                </div>

                <div class="col-4">
                    <h3>bottom-left</h3>
                    <p>
                        <f-button secondary size="small" @click.native="onButtonClick('success', 'bottomleft')">success</f-button>
                        <f-button secondary size="small" @click.native="onButtonClick('error', 'bottomleft')">error</f-button>
                        <f-button secondary size="small" @click.native="onButtonClick('warning', 'bottomleft')">warning</f-button>
                        <f-button secondary size="small" @click.native="onButtonClick('info', 'bottomleft')">info</f-button>
                    </p>
                </div>

                <div class="col-4">
                    <h3>bottom-center</h3>
                    <p>
                        <f-button secondary size="small" @click.native="onButtonClick('success', 'bottomcenter')">success</f-button>
                        <f-button secondary size="small" @click.native="onButtonClick('error', 'bottomcenter')">error</f-button>
                        <f-button secondary size="small" @click.native="onButtonClick('warning', 'bottomcenter')">warning</f-button>
                        <f-button secondary size="small" @click.native="onButtonClick('info', 'bottomcenter')">info</f-button>
                    </p>
                </div>

                <div class="col-4">
                    <h3>bottom-right</h3>
                    <p>
                        <f-button secondary size="small" @click.native="onButtonClick('success', 'bottomright')">success</f-button>
                        <f-button secondary size="small" @click.native="onButtonClick('error', 'bottomright')">error</f-button>
                        <f-button secondary size="small" @click.native="onButtonClick('warning', 'bottomright')">warning</f-button>
                        <f-button secondary size="small" @click.native="onButtonClick('info', 'bottomright')">info</f-button>
                    </p>
                </div>
            </div>

            <f-notifications
                group="topleft"
                with-icon
                position="top-left"
                hide-on-click
                animation-in="slide-right-enter-active"
                animation-out="slide-left-leave-active"
            />
            <f-notifications
                group="topcenter"
                with-icon
                hide-on-click
                animation-in="scale-center-enter-active"
                animation-out="scale-center-leave-active"
                strategy="single"
                position="top-center"
            />
            <f-notifications
                group="topright"
                position="top-right"
                hide-on-close-button
                animation-in="slide-left-enter-active"
                animation-out="slide-right-leave-active"
            />
            <f-notifications group="bottomleft" position="bottom-left" />
            <f-notifications
                group="bottomcenter"
                position="bottom-center"
                strategy="newest-first"
                animation-in="slide-up-enter-active"
                animation-out="slide-down-leave-active"
            >
                <template #notification="notification">
                    <template v-if="notification.html">
                        <b>&#9742; <span v-html="notification.html"></span></b>
                    </template>
                    <template v-else-if="notification.text">
                        <b>&#9742; {{ notification.text }}</b>
                    </template>
                </template>
            </f-notifications>
            <f-notifications group="bottomright" position="bottom-right" />
        </div>
    `,
    methods: {
        onButtonClick(_type, _group) {
            this.$notifications.add(
                {
                    type: _type,
                    text: notificationText(_type),
                    withIcon: _type === 'error',
                },
                _group
            );
        },
    },
});
