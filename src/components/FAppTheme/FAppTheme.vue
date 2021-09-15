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
 * Sets theme css class to the given container
 */
export default {
    name: 'FAppTheme',

    props: {
        /** Set of possible theme classes */
        themes: {
            type: Array,
            default() {
                return ['theme-default', 'theme-dark'];
            },
        },
        /** Current theme */
        theme: {
            type: String,
            default: 'theme-default',
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
                eContainer.classList.add('fapptheme-transition');
            }

            this._addThemeClass(theme);

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

        _addThemeClass(theme) {
            const { eContainer } = this;

            if (eContainer) {
                // remove previous theme classes
                this.themes.forEach(theme => {
                    eContainer.classList.remove(theme);
                });

                eContainer.classList.add(theme);
            }
        },

        /**
         * @param {number} wait Milliseconds
         */
        _removeTransitionClass(wait) {
            setTimeout(() => {
                this.eContainer.classList.remove('fapptheme-transition');
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
