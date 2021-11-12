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
        const data = {
            notification: _notification,
            group: _group,
        };

        this._eventBus.emit('add-notification', data);

        return data._msgId || '';
    }

    /**
     * @param {string} msgId Message id
     * @param {string} [group] Notification group
     */
    hide(msgId = '', group = '') {
        if (msgId) {
            const data = { msgId, group };

            console.log('hide', JSON.stringify(data));

            this._eventBus.emit('hide-notification', data);
        }
    }
}
