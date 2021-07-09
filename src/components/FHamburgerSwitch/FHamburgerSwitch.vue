<template>
    <div
        class="fhamburgerswitch"
        role="switch"
        :class="[classes, `fhamburgerswitch-thickness${thickness}`]"
        @click="toggle"
    >
        <div class="cont">
            <div class="l1"></div>
            <div class="l2" v-if="!twoLines"></div>
            <div class="l3"></div>
        </div>
    </div>
</template>

<script>
import { breakpointsMixin } from '../../mixins/breakpoints.js';
import Vue from 'vue';

/** Global state for FHamburgerSwitch(es) */
const switchState = new Vue({
    data: {
        on: false,
    },
});

/**
 * Menu switch with animation -> 3 (2) horizontal lines to `X`.
 * It is controlled by global state, so if one instance of `FHamburgerSwitch` is turned on, the other instances are also turned on.
 */
export default {
    name: 'FHamburgerSwitch',

    mixins: [breakpointsMixin],

    props: {
        /** Turn the switch on on initialization */
        on: {
            type: Boolean,
            default: false,
        },
        /** Use just 2 lines instead of 3. */
        twoLines: {
            type: Boolean,
            default: false,
        },
        /** Thickness of one switch row. */
        thickness: {
            type: String,
            default: '1',
            validator: function(_value) {
                return ['1', '2', '3'].indexOf(_value) !== -1;
            },
        },
        /** Minimum width for switching to mobile view */
        mobileViewBreakpoint: {
            type: String,
            default: '',
        },
    },

    computed: {
        isOn() {
            return switchState.on;
        },

        classes() {
            return {
                'fhamburgerswitch-on': this.isOn,
            };
        },
    },

    watch: {
        on(value) {
            switchState.on = !!value;
        },

        isOn(value) {
            const eBody = document.body;

            if (value) {
                eBody.classList.add('fhamburgerswitch-on');
            } else {
                eBody.classList.remove('fhamburgerswitch-on');
            }
        },
    },

    created() {
        switchState.on = this.on;

        if (this.mobileViewBreakpoint) {
            this.breakpoints = [{ value: this.mobileViewBreakpoint }];
        }
    },

    methods: {
        toggle() {
            switchState.on = !switchState.on;

            if (switchState.on) {
                this.$emit('hamburger-switch-on');
            } else {
                this.$emit('hamburger-switch-off');
            }
        },

        onBreakpointChange() {
            switchState.on = false;
        },
    },

    on() {
        switchState.on = true;
    },

    off() {
        switchState.on = false;
    },
};
</script>

<style lang="scss">
@use "style";
</style>
