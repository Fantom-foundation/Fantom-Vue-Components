/**
 * Breakpoint object
 * @typedef {Object} Breakpoint
 * @property {string} value Width use in default media query (e.g. 500px)
 * @property {string} media Media query used instead of default media query
 * @property {string} code Breakpoint code
 * @property {boolean} min Use min-width in default media query
 */

/**
 * Class for handling css media queries programmatically
 */
export class Breakpoints {
    constructor() {
        /** @type {Breakpoint[]} */
        this._breakpoints = [];
        /** @type {Function} */
        this._breapointChangeCallback = null;
        this._spacesRE = / /g;
    }

    destroy() {
        this._unbindBreakpointsEvents();
    }

    /**
     * @param {Function} _callback
     */
    setBreapointChangeCallback(_callback) {
        this._breapointChangeCallback = _callback;
    }

    /**
     * Bind media query events.
     *
     * @param {Breakpoint[]} _breakpoints
     */
    bindBreakpointsEvents(_breakpoints) {
        _breakpoints.forEach(_breakpoint => {
            const breakpoint = { ..._breakpoint };

            if (breakpoint.value && !breakpoint.media) {
                breakpoint.media = `only screen and (${breakpoint.min ? 'min' : 'max'}-width: ${breakpoint.value})`;
            }

            breakpoint._callback = _event => this._onBreakpointChange(_event);
            breakpoint._mqList = window.matchMedia(breakpoint.media);

            try {
                // Chrome & Firefox
                breakpoint._mqList.addEventListener('change', breakpoint._callback);
            } catch (_error1) {
                try {
                    // Safari
                    breakpoint._mqList.addListener(breakpoint._callback);
                } catch (_error2) {
                    console.error(_error2);
                }
            }

            this._breakpoints.push(breakpoint);
            this._onBreakpointChange(breakpoint._mqList);
        });
    }

    /**
     * Unbind media query events.
     *
     * @private
     */
    _unbindBreakpointsEvents() {
        this._breakpoints.forEach(_breakpoint => {
            if (_breakpoint._mqList && _breakpoint._callback) {
                try {
                    // Chrome & Firefox
                    _breakpoint._mqList.removeEventListener('change', _breakpoint._callback);
                } catch (_error1) {
                    try {
                        // Safari
                        _breakpoint._mqList.removeListener(_breakpoint._callback);
                    } catch (_error2) {
                        console.error(_error2);
                    }
                }
            }
        });
        this._breakpoints = null;
    }

    /**
     * Called when media query breakpoint changes.
     *
     * @param {Event} _event
     * @private
     */
    _onBreakpointChange(_event) {
        const breakpoint = this._breakpoints.filter(
            _breakpoint => this._withoutSpaces(_breakpoint.media) === this._withoutSpaces(_event.media)
        );
        let data;

        if (breakpoint.length === 1) {
            data = {
                value: breakpoint[0].value,
                code: breakpoint[0].code,
                media: _event.media,
                matches: _event.matches,
            };

            if (this._breapointChangeCallbackExists()) {
                this._breapointChangeCallback(data);
            } else {
                throw new Error('_breapointChangeCallback is not set');
            }
        }
    }

    _breapointChangeCallbackExists() {
        return typeof this._breapointChangeCallback === 'function';
    }

    /**
     * Return string without spaces.
     *
     * @param _str
     * @return {String}
     */
    _withoutSpaces(_str) {
        return _str.replace(this._spacesRE, '');
    }
}

export const breakpointsMixin = {
    data() {
        return {
            /** @type {Breakpoint[]} */
            breakpoints: [],
        };
    },

    created() {
        /** @type {Breakpoints} */
        this._breakpointsC = new Breakpoints();
    },

    mounted() {
        this._breakpointsC.setBreapointChangeCallback(_breakpoint => this.onBreakpointChange(_breakpoint));
        this._breakpointsC.bindBreakpointsEvents(this.breakpoints);
    },

    beforeDestroy() {
        this._breakpointsC.destroy();
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
