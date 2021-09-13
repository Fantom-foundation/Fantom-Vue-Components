<template>
    <div style="display: none" hidden aria-hidden="true"></div>
</template>

<script>
import Vue from 'vue';
import { getCustomProperty, getLengthAndUnit } from '../../utils/css.js';

/** Global state for FAppTheme */
const appThemeState = new Vue({
    data: {
        theme: '',
    },
});

/**
 * Sets application theme
 */
export default {
    name: 'FAppTheme',

    props: {
        /** Set of possible themes */
        themes: {
            type: Array,
            default() {
                return ['default', 'theme-dark'];
            },
        },
        /** Current theme */
        theme: {
            type: String,
            default: 'default',
        },
        /** Selector for element where theme attribute will be applied to */
        container: {
            type: String,
            default: 'html',
        },
        /** Animate transition between themes */
        animate: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            eContainer: null,
            skip: true,
        };
    },

    computed: {
        cTheme() {
            return appThemeState.theme;
        },
    },

    watch: {
        theme(value) {
            this.setTheme(value, true);
        },

        cTheme(value = this.theme) {
            if (!this.skip) {
                this.setTheme(value, true);
            }
        },
    },

    mounted() {
        this.eContainer = document.querySelector(this.container);

        this.setTheme(this.theme);

        appThemeState.theme = this.theme;
        this.$nextTick(() => {
            this.skip = false;
        });
    },

    methods: {
        /**
         * @param {string} [theme]
         * @param {boolean} [emitEvent]
         */
        setTheme(theme = this.theme, emitEvent = false) {
            const { eContainer } = this;

            if (!this.themes.includes(theme)) {
                throw new Error(`Bad theme '${theme}'`);
            }

            if (this.animate) {
                eContainer.classList.add('theme-transition');
            }

            eContainer.setAttribute('data-theme', theme);

            if (emitEvent) {
                /**
                 * Triggers when theme is set
                 *
                 * @property {string} theme
                 */
                this.$emit('theme-set', theme);
            }

            if (this.animate) {
                this._removeTransitionClass(this._getTransitionLength());
            }
        },

        /**
         * @param {number} wait Milliseconds
         */
        _removeTransitionClass(wait) {
            setTimeout(() => {
                this.eContainer.classList.remove('theme-transition');
            }, wait);
        },

        /**
         * Read transition length value from css custom propety `--apptheme-transition-length`
         *
         * @return {number}
         * @private
         */
        _getTransitionLength() {
            const lu = getLengthAndUnit(getCustomProperty('--apptheme-transition-length'));

            return lu.unit ? (lu.unit === 's' ? lu.len * 1000 : lu.len) : 200;
        },
    },

    setTheme(theme) {
        appThemeState.theme = theme;
    },
};
</script>

<style lang="scss">
@use "style";
</style>
