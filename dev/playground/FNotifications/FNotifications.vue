<template>
    <div>
        <div class="grid">
            <div class="col-4">
                <h3>top-left</h3>
                <p>
                    <f-button secondary size="small" @click.native="gSuccess('topleft')">success</f-button>
                    <f-button secondary size="small" @click.native="gError('topleft')">error</f-button>
                    <f-button secondary size="small" @click.native="gWarning('topleft')">warning</f-button>
                    <f-button secondary size="small" @click.native="gInfo('topleft')">info</f-button>
                </p>
            </div>

            <div class="col-4">
                <h3>top-center</h3>
                <p>
                    <f-button secondary size="small" @click.native="gSuccess('topcenter')">success</f-button>
                    <f-button secondary size="small" @click.native="gError('topcenter')">error</f-button>
                    <f-button secondary size="small" @click.native="gWarning('topcenter')">warning</f-button>
                    <f-button secondary size="small" @click.native="gInfo('topcenter')">info</f-button>
                </p>
            </div>

            <div class="col-4">
                <h3>top-right</h3>
                <p>
                    <f-button secondary size="small" @click.native="success">success</f-button>
                    <f-button secondary size="small" @click.native="error">error</f-button>
                    <f-button secondary size="small" @click.native="warning">warning</f-button>
                    <f-button secondary size="small" @click.native="info">info</f-button>
                </p>
            </div>

            <div class="col-4">
                <h3>bottom-left</h3>
                <p>
                    <f-button secondary size="small" @click.native="gSuccess('bottomleft')">success</f-button>
                    <f-button secondary size="small" @click.native="gError('bottomleft')">error</f-button>
                    <f-button secondary size="small" @click.native="gWarning('bottomleft')">warning</f-button>
                    <f-button secondary size="small" @click.native="gInfo('bottomleft')">info</f-button>
                </p>
            </div>

            <div class="col-4">
                <h3>bottom-center</h3>
                <p>
                    <f-button secondary size="small" @click.native="gSuccess('bottomcenter')">success</f-button>
                    <f-button secondary size="small" @click.native="gError('bottomcenter')">error</f-button>
                    <f-button secondary size="small" @click.native="gWarning('bottomcenter')">warning</f-button>
                    <f-button secondary size="small" @click.native="gInfo('bottomcenter')">info</f-button>
                </p>
            </div>

            <div class="col-4">
                <h3>bottom-right</h3>
                <p>
                    <f-button secondary size="small" @click.native="gSuccess('bottomright')">success</f-button>
                    <f-button secondary size="small" @click.native="gError('bottomright')">error</f-button>
                    <f-button secondary size="small" @click.native="gWarning('bottomright')">warning</f-button>
                    <f-button secondary size="small" @click.native="gInfo('bottomright')">info</f-button>
                </p>
            </div>
        </div>

        <div>
            <h3>In Page</h3>
            <p>
                <f-button secondary size="small" @click.native="gSuccess('page')">success</f-button>
                <f-button secondary size="small" @click.native="gError('page')">error</f-button>
                <f-button secondary size="small" @click.native="gWarning('page')">warning</f-button>
                <f-button secondary size="small" @click.native="gInfo('page')">info</f-button>
            </p>
            <f-notifications group="page" style="max-width: 400px; padding: 0;" />
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
            ref="notifications"
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
</template>

<script>
import FNotifications from '@/components/FNotifications/FNotifications.vue';
import FButton from '@/components/FButton/FButton.vue';
import { translationsMixin } from '@/mixins/translations.js';

export default {
    name: 'FNotificationsPlayground',

    mixins: [translationsMixin],

    components: { FButton, FNotifications },

    methods: {
        success() {
            this.$refs.notifications.add({
                text: 'success message',
            });
        },

        error() {
            this.$refs.notifications.add({
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                type: 'error',
                withIcon: true,
            });
        },

        warning() {
            this.$refs.notifications.add({
                text: 'warning message',
                type: 'warning',
            });
        },

        info() {
            this.$refs.notifications.add({
                text: 'info message',
                type: 'info',
            });
        },

        gSuccess(_group = '') {
            this.$notifications.add({ text: 'success message' }, _group);
        },

        gError(_group = '') {
            this.$notifications.add(
                {
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                    type: 'error',
                    withIcon: true,
                },
                _group
            );
        },

        gWarning(_group = '') {
            this.$notifications.add(
                {
                    text: 'warning message',
                    type: 'warning',
                },
                _group
            );
        },

        gInfo(_group = '') {
            this.$notifications.add(
                {
                    html: '<i>info message</i> <a href="#more">more</a>',
                    type: 'info',
                    hideAfter: 4000,
                },
                _group
            );
        },
    },
};
</script>
