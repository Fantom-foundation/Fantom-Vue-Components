<template>
    <div role="alert" aria-atomic="true" class="fariaalert">
        <p v-for="msg in cMessages" :key="msg.id">{{ msg.text }}</p>
    </div>
</template>

<script>
import { eventBusMixin } from '../../mixins/event-bus.js';
import { helpersMixin } from '../../mixins/helpers.js';
import { stripHTMLTags } from '../../utils/index.js';

/**
 * Notifies assistive technologies about important messages - input errors etc.
 * Listens to these events on event bus:
 * `'aria-alert-append'`, `'aria-alert-replace'` and `'aria-alert-clear'`
 * This component is intended to be placed at the root of Vue application.
 */
export default {
    mixins: [eventBusMixin, helpersMixin],

    data() {
        return {
            /** alert messages */
            messages: [],
        };
    },

    computed: {
        cMessages() {
            this.setIds(this.messages);

            return this.messages;
        },
    },

    created() {
        this._eventBus.on('aria-alert-append', this.append);
        this._eventBus.on('aria-alert-replace', this.replace);
        this._eventBus.on('aria-alert-clear', this.clear);
    },

    methods: {
        /**
         * Append new message.
         *
         * @param {string} _msg
         */
        append(_msg) {
            this.messages.push({ text: this.adjustMessage(_msg) });
        },

        /**
         * Replace all messages with new message.
         *
         * @param {string} _msg
         */
        replace(_msg) {
            this.messages = [{ text: this.adjustMessage(_msg) }];
        },

        /**
         * Clear all messages.
         */

        clear() {
            this.messages = [];
        },

        /**
         * Strip html tags and add '.' at the end of the string.
         *
         * @param {string} _msg
         * @return {string}
         */
        adjustMessage(_msg) {
            return stripHTMLTags(typeof _msg === 'string' ? _msg.trim() : '');
            // const msg = stripHTMLTags(typeof _msg === 'string' ? _msg.trim() : '');
            // return msg && msg.charAt(_msg.length - 1) !== '.' ? `${msg}.` : msg;
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
