import { EventBus } from '../mixins/event-bus.js';

export let notifications = null;

export class Notifications {
    static install(_Vue) {
        notifications = new Notifications();
        _Vue.prototype.$notifications = notifications;
    }

    constructor() {
        this._eventBus = new EventBus();
    }

    /**
     * Add notification
     *
     * @param {object} _notification
     * @param {string} [_group] Notification group
     */
    add(_notification, _group = '') {
        this._eventBus.emit('add-notification', {
            notification: _notification,
            group: _group,
        });
    }
}
