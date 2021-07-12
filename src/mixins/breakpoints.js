import { Breakpoints } from '@/utils/Breakpoints.js';
import { isNonEmptyArray } from '@/utils/array.js';

export const breakpointsMixin = {
    data() {
        return {
            /** @type {Breakpoint[]} */
            breakpoints: [],
        };
    },

    created() {
        /** @type {Breakpoints} */
        this._breakpointsC = null;
    },

    mounted() {
        if (isNonEmptyArray(this.breakpoints)) {
            this._breakpointsC = new Breakpoints({
                breakpoints: this.breakpoints,
                callback: _breakpoint => this.onBreakpointChange(_breakpoint),
            });
        }
    },

    beforeDestroy() {
        if (this._breakpointsC) {
            this._breakpointsC.destroy();
            this._breakpointsC = null;
        }
    },

    methods: {
        /**
         * Override this method in the component that use this mixin.
         *
         * @param {{code: string, media: string, value: string, matches: []}} _breakpoint
         */
        onBreakpointChange(_breakpoint) {
            console.log(_breakpoint);
        },
    },
};
