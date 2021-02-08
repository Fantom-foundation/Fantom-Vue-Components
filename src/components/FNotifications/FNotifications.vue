<template>
    <div class="fnotifications" :class="[positionClasses]">
        <f-message
            v-for="notification in notifications"
            :key="notification.id"
            v-bind="{ ...notification, text: undefined, html: undefined }"
            :type="notification.type"
            animate
            @message-hidden="onMessageHidden"
            class="fnotifications_notification"
        >
            <slot name="notification" v-bind="{ ...notification }">
                <template v-if="notification.html">
                    <div v-html="notification.html"></div>
                </template>
                <template v-else-if="notification.text">
                    {{ notification.text }}
                </template>
            </slot>
        </f-message>
    </div>
</template>

<script>
import FMessage from '../FMessage/FMessage.vue';
import { getUniqueId } from '../../utils/index.js';
import { eventBusMixin } from '../../mixins/event-bus.js';

/**
 * Container for notifications (`f-message` components).
 *
 * Use `add` method to add new notifications. This method accepts object that describes notification
 * - properties are the same as of `f-message` + property `'text'` (for displaying
 * text content) or `'html'` - for displaying html content.
 *
 * You can install Notifications as a plugin
 *
 * `import { Notifications } from '@/plugins/notifications.js';`
 * `Vue.use(Notifications);`
 *
 * and use it in a Vue component like:
 *
 * `this.$notifications.add(notification, group);`
 */
export default {
    name: 'FNotifications',

    mixins: [eventBusMixin],

    components: { FMessage },

    props: {
        /**
         * Predefined notification positions
         *
         * @type {('' | 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right')}
         */
        position: {
            type: String,
            default: '',
            validator: function(_value) {
                return (
                    ['', 'top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'].indexOf(
                        _value
                    ) !== -1
                );
            },
        },
        /** Name of notification group. Specifies where notifications will be rendered to */
        group: {
            type: String,
            default: '',
        },
        /**
         * Strategy for displaying notifications.
         * `'newest-first'` - new notification will be prepended
         * `'single'` - just one notification at a time will be displayed
         *
         * @type {('' | 'newest-first' | 'single')}
         */
        strategy: {
            type: String,
            default: '',
            validator: function(_value) {
                return ['', 'newest-first', 'single'].indexOf(_value) !== -1;
            },
        },
        /** Use icon with notifications */
        withIcon: {
            type: Boolean,
            default: false,
        },
        /** Animation that starts when the notification is just about to show. */
        animationIn: {
            type: String,
            default: 'fade-enter-active',
        },
        /** Animation that starts when the notification is just about to hide. */
        animationOut: {
            type: String,
            default: 'fade-leave-active',
        },
        /** Notification will be hidden by clicking on it */
        hideOnClick: {
            type: Boolean,
            default: false,
        },
        /** Notification will be hidden by clicking on 'close' button */
        hideOnCloseButton: {
            type: Boolean,
            default: false,
        },
        /** Accepts object - keys are notification types, values specify the time in milliseconds after which
         * the notifications close
         */
        hideAfter: {
            type: Object,
            default() {
                return {
                    success: 3000,
                    info: 4000,
                    warning: 4000,
                    error: 5000,
                };
            },
        },
    },

    data() {
        return {
            notifications: [],
        };
    },

    computed: {
        positionClasses() {
            return this.position ? ['fnotifications-fixed', `fnotifications-${this.position.replace('-', '')}`] : '';
        },
    },

    created() {
        this._eventBus.on('add-notification', this.addNotification);
    },

    methods: {
        add(_notification) {
            const { notifications } = this;
            const { strategy } = this;
            const notification = {
                id: getUniqueId(),
                type: 'success',
                animationIn: this.animationIn,
                animationOut: this.animationOut,
                withIcon: this.withIcon,
                alert: this.alert,
                hideOnClick: this.hideOnClick,
                hideOnCloseButton: this.hideOnCloseButton,
                ...(_notification || {}),
            };

            if (!notification.hideAfter) {
                notification.hideAfter = this.hideAfter[notification.type];
            }

            if (strategy === 'newest-first') {
                notifications.unshift(notification);
            } else if (strategy === 'single') {
                this.notifications = [notification];
            } else {
                notifications.push(notification);
            }
        },

        addNotification(_data) {
            if (_data.group === this.group) {
                this.add(_data.notification);
            }
        },

        getNotificationIdxById(_id) {
            return this.notifications.findIndex(_notification => _id === _notification.id);
        },

        onMessageHidden(_messageId) {
            const index = this.getNotificationIdxById(_messageId);

            if (index > -1) {
                this.notifications.splice(index, 1);
            }
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
