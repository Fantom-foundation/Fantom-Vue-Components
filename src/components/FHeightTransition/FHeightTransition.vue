<template>
    <transition
        :name="!disabled ? 'fheighttransition' : ''"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @after-enter="onAfterEnter"
        @before-leave="onBeforeLeave"
        @after-leave="onAfterLeave"
    >
        <slot></slot>
    </transition>
</template>

<script>
import { defer } from '../../utils/index.js';
import { setCustomProperty } from '../../utils/css.js';

/**
 * Animate height of an element from height `0` (hidden) to `auto` and vice-versa
 */
export default {
    name: 'FHeightTransition',

    props: {
        transitionLength: {
            type: String,
            default: '',
        },
        transitionFunc: {
            type: String,
            default: '',
        },
        /** Disable animation */
        disabled: {
            type: Boolean,
            default: false,
        },
    },

    methods: {
        setTransitionOptions(elem) {
            if (this.transitionLength) {
                setCustomProperty('--fheighttransition-transition-length', this.transitionLength, elem);
            }

            if (this.transitionFunc) {
                setCustomProperty('--fheighttransition-transition-func', this.transitionFunc, elem);
            }
        },

        onBeforeEnter(elem) {
            this.setTransitionOptions(elem);

            elem.classList.add('fheighttransition-willchange');
        },

        onEnter(elem) {
            const height = elem.scrollHeight;

            elem.style.height = 0;
            // force browser to repaint
            elem.offsetHeight;

            defer(() => {
                elem.style.height = `${height}px`;
            });
        },

        onAfterEnter(elem) {
            elem.style.height = 'auto';
            elem.classList.remove('willchange');

            /**
             * Triggers when height transition ends
             *
             * @property {('enter'|'leave')}
             */
            this.$emit('transition-end', 'enter');
        },

        onBeforeLeave(elem) {
            const height = elem.scrollHeight;

            elem.style.height = `${height}px`;
            elem.offsetHeight;
            elem.classList.add('willchange');

            defer(() => {
                elem.style.height = 0;
            });
        },

        onAfterLeave(elem) {
            elem.style.height = 'auto';
            elem.classList.remove('fheighttransition-willchange');

            /**
             * Triggers when height transition ends
             *
             * @property {('enter'|'leave')}
             */
            this.$emit('transition-end', 'leave');
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
