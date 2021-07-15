// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import FPopover from './FPopover.vue';
import FButton from '../FButton/FButton.vue';
import FSvgIcon from '../FSvgIcon/FSvgIcon.vue';

export default {
    title: 'FPopover',
    component: FPopover,
};

export const Default = () => ({
    components: { FPopover, FButton },
    template: `
        <div>
            <f-popover ref="popover" attach-to="#btn">
                Lorem ipsum
            </f-popover>

            <div style="padding: 40px; text-align: center">
                <f-button id="btn" @click.native="$refs.popover.toggle()">Toggle</f-button>
            </div>

            <f-popover ref="popover2" attach-to="#btn2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus dolor ducimus enim impedit minima molestias quae qui!
            </f-popover>

            <div style="padding: 40px; text-align: center">
                <f-button id="btn2" @click.native="$refs.popover2.toggle()">Toggle</f-button>
            </div>
        </div>
    `,
});

export const Size = () => ({
    components: { FPopover, FButton },
    template: `
        <div class="gridauto gridauto-miw-256">
            <div>
                <f-popover size="big" ref="popover" attach-to="#btn">
                    Lorem ipsum
                </f-popover>

                <div style="padding: 40px; text-align: center">
                    <f-button id="btn" @click.native="$refs.popover.toggle()"><code>size="big"</code></f-button>
                </div>

                <f-popover size="big" ref="popover2" attach-to="#btn2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus dolor ducimus enim impedit minima molestias quae qui!
                </f-popover>

                <div style="padding: 40px; text-align: center">
                    <f-button id="btn2" @click.native="$refs.popover2.toggle()"><code>size="big"</code></f-button>
                </div>
            </div>
            <div>
                <f-popover ref="popover3" attach-to="#btn3">
                    Lorem ipsum
                </f-popover>

                <div style="padding: 40px; text-align: center">
                    <f-button id="btn3" @click.native="$refs.popover3.toggle()">Default</f-button>
                </div>

                <f-popover ref="popover4" attach-to="#btn4">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus dolor ducimus enim impedit minima molestias quae qui!
                </f-popover>

                <div style="padding: 40px; text-align: center">
                    <f-button id="btn4" @click.native="$refs.popover4.toggle()">Default</f-button>
                </div>
            </div>
            <div>
                <f-popover size="small" ref="popover5" attach-to="#btn5">
                    Lorem ipsum
                </f-popover>

                <div style="padding: 40px; text-align: center">
                    <f-button id="btn5" @click.native="$refs.popover5.toggle()"><code>size="small"</code></f-button>
                </div>

                <f-popover size="small" ref="popover6" attach-to="#btn6">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus dolor ducimus enim impedit minima molestias quae qui!
                </f-popover>

                <div style="padding: 40px; text-align: center">
                    <f-button id="btn6" @click.native="$refs.popover6.toggle()"><code>size="small"</code></f-button>
                </div>
            </div>
        </div>
    `,
});

export const WithHeader = () => ({
    components: { FPopover, FButton },
    template: `
        <div class="gridauto gridauto-miw-256 pat-9">
            <div>
                <f-popover :with-header="true" title="Title" attach-position="top" size="big" ref="popover" attach-to="#btn">
                    Lorem ipsum
                </f-popover>

                <div style="padding: 40px; text-align: center">
                    <f-button id="btn" @click.native="$refs.popover.toggle()"><code>size="big"</code></f-button>
                </div>

                <f-popover :with-header="true" title="Title" attach-position="top" size="big" ref="popover2" attach-to="#btn2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus dolor ducimus enim impedit minima molestias quae qui!
                </f-popover>

                <div style="padding: 40px; text-align: center">
                    <f-button id="btn2" @click.native="$refs.popover2.toggle()"><code>size="big"</code></f-button>
                </div>
            </div>
            <div>
                <f-popover :with-header="true" title="Title" attach-position="top" ref="popover3" attach-to="#btn3">
                    Lorem ipsum
                </f-popover>

                <div style="padding: 40px; text-align: center">
                    <f-button id="btn3" @click.native="$refs.popover3.toggle()">Default</f-button>
                </div>

                <f-popover :with-header="true" title="Title" attach-position="top" ref="popover4" attach-to="#btn4">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus dolor ducimus enim impedit minima molestias quae qui!
                </f-popover>

                <div style="padding: 40px; text-align: center">
                    <f-button id="btn4" @click.native="$refs.popover4.toggle()">Default</f-button>
                </div>
            </div>
            <div>
                <f-popover :with-header="true" title="Title" attach-position="top" size="small" ref="popover5" attach-to="#btn5">
                    Lorem ipsum
                </f-popover>

                <div style="padding: 40px; text-align: center">
                    <f-button id="btn5" @click.native="$refs.popover5.toggle()"><code>size="small"</code></f-button>
                </div>

                <f-popover :with-header="true" title="Title" attach-position="top" size="small" ref="popover6" attach-to="#btn6">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus dolor ducimus enim impedit minima molestias quae qui!
                </f-popover>

                <div style="padding: 40px; text-align: center">
                    <f-button id="btn6" @click.native="$refs.popover6.toggle()"><code>size="small"</code></f-button>
                </div>
            </div>
        </div>
    `,
});

export const AttachPositions = () => ({
    components: { FPopover, FButton },
    template: `
        <div>
            <f-popover attach-position="top" attach-to="#btn1" ref="popover1" visible>
                <code>attach-position="top"</code>
            </f-popover>

            <f-popover attach-position="right" attach-to="#btn2" ref="popover2" visible>
                <code>attach-position="right"</code>
            </f-popover>

            <f-popover attach-position="bottom" attach-to="#btn3" ref="popover3" visible>
                <code>attach-position="bottom"</code>
            </f-popover>

            <f-popover attach-position="left" attach-to="#btn4" ref="popover4" visible>
                <code>attach-position="left"</code>
            </f-popover>

            <f-popover attach-position="auto" attach-to="#btn5" ref="popover5" visible>
                <code>attach-position="auto"</code>
            </f-popover>

            <f-popover attach-position="auto-vertical" attach-to="#btn6" ref="popover6" visible>
                <code>attach-position="auto-vertical"</code>
            </f-popover>

            <f-popover attach-position="auto-vertical-exact" attach-to="#btn7" ref="popover7" visible>
                <code>attach-position="auto-vertical-exact"</code>
            </f-popover>

            <div class="pa-8" style="max-width: 400px; margin: 0 auto;">
                <div class="mab-9">
                    <f-button id="btn1" @click.native="$refs.popover1.toggle()">Toggle</f-button>
                </div>
                <div class="mab-9">
                    <f-button id="btn2" @click.native="$refs.popover2.toggle()">Toggle</f-button>
                </div>
                <div class="mab-9">
                    <f-button id="btn3" @click.native="$refs.popover3.toggle()">Toggle</f-button>
                </div>
                <div class="mab-9">
                    <f-button id="btn4" @click.native="$refs.popover4.toggle()">Toggle</f-button>
                </div>
                <div class="mab-9">
                    <f-button id="btn5" @click.native="$refs.popover5.toggle()">Toggle</f-button>
                </div>
                <div class="mab-9">
                    <f-button id="btn6" @click.native="$refs.popover6.toggle()">Toggle</f-button>
                </div>
                <div class="mab-9">
                    <f-button id="btn7" @click.native="$refs.popover7.toggle()">Toggle</f-button>
                </div>

                <div style="padding-bottom: 1000px;"></div>
            </div>
        </div>
    `,
});

export const WithArrow = () => ({
    components: { FPopover, FButton },
    template: `
        <div>
            <f-popover
                with-arrow
                :attach-to="attachTo"
                :attach-position="attachPosition"
                :hide-after="1000"
                ref="win"
            >
                Lorem ipsum
            </f-popover>

            <div style="padding: 40px; text-align: center">
                <f-button id="attach-top" @click.native="onAttachTopClick">attach top</f-button>
                <f-button id="attach-right" @click.native="onAttachRightClick">attach right</f-button>
                <f-button id="attach-bottom" @click.native="onAttachBottomClick">attach bottom</f-button>
                <f-button id="attach-left" @click.native="onAttachLeftClick">attach left</f-button>
            </div>
        </div>
    `,
    data() {
        return {
            attachPosition: 'right',
            attachTo: '#attach-right',
        };
    },
    methods: {
        onAttachTopClick() {
            this.onBtnClick('top');
        },

        onAttachRightClick() {
            this.onBtnClick('right');
        },

        onAttachBottomClick() {
            this.onBtnClick('bottom');
        },

        onAttachLeftClick() {
            this.onBtnClick('left');
        },

        async onBtnClick(_position) {
            const { win } = this.$refs;

            if (win) {
                this.attachPosition = _position;
                this.attachTo = `#attach-${_position}`;

                win.hide();
                win.show();
            }
        },
    },
});

export const ArrowSlot = () => ({
    components: { FPopover, FButton, FSvgIcon },
    template: `
        <div>
            <f-popover
                with-arrow
                :attach-to="attachTo"
                :attach-position="attachPosition"
                :hide-after="1000"
                title="Popover window"
                ref="win"
            >
                Lorem ipsum
                <template #arrow-icon>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"/></svg>
                </template>
            </f-popover>

            <div style="padding: 40px; text-align: center">
                <f-button id="attach-top" @click.native="onAttachTopClick">attach top</f-button>
                <f-button id="attach-right" @click.native="onAttachRightClick">attach right</f-button>
                <f-button id="attach-bottom" @click.native="onAttachBottomClick">attach bottom</f-button>
                <f-button id="attach-left" @click.native="onAttachLeftClick">attach left</f-button>
            </div>
        </div>
    `,
    data() {
        return {
            attachPosition: 'right',
            attachTo: '#attach-right',
        };
    },
    methods: {
        onAttachTopClick() {
            this.onBtnClick('top');
        },

        onAttachRightClick() {
            this.onBtnClick('right');
        },

        onAttachBottomClick() {
            this.onBtnClick('bottom');
        },

        onAttachLeftClick() {
            this.onBtnClick('left');
        },

        async onBtnClick(_position) {
            const { win } = this.$refs;

            if (win) {
                this.attachPosition = _position;
                this.attachTo = `#attach-${_position}`;

                win.hide();
                win.show();
            }
        },
    },
});

export const Hide = () => ({
    components: { FPopover, FButton },
    template: `
        <div style="max-width: 400px; margin: 0 auto;">
            <f-popover
                hide-on-document-mousedown
                attach-to="#popover"
                attach-position="bottom"
                ref="popover"
            >
                Hide on document mousedown
            </f-popover>
            <f-popover
                hide-on-document-resize
                attach-to="#popover2"
                attach-position="bottom"
                ref="popover2"
            >
                Hide on document resize
            </f-popover>
            <f-popover
                :hide-after="2000"
                attach-to="#popover3"
                attach-position="bottom"
                ref="popover3"
            >
                Hide after 2s
            </f-popover>
            <br><br>
            <f-button id="popover" @click.native="$refs.popover.show()"><code>hide-on-document-mousedown</code></f-button>
            <br><br>
            <f-button id="popover2" @click.native="$refs.popover2.show()">hide-on-document-resize</f-button>
            <br><br>
            <f-button id="popover3" @click.native="$refs.popover3.show()">:hide-after="2000"</f-button>
        </div>
    `,
});
