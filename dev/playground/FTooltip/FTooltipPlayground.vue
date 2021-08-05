<template>
    <section>
        <f-window
            popover
            with-arrow
            :attach-to="attachTo"
            :attach-position="attachPosition"
            :attach-margin="[4, 4, 4, 4]"
            :with-header="false"
            :hide-after="1000"
            animation-in="scale-center-enter-active"
            animation-out="scale-center-leave-active"
            title="Popover window"
            ref="win"
            style="width: auto; max-width: 360px;"
        >
            Lorem ipsum
        </f-window>

        <div style="padding: 40px; text-align: center">
            <f-button id="attach-top" @click.native="onAttachTopClick">attach top</f-button>
            <f-button id="attach-right" @click.native="onAttachRightClick">attach right</f-button>
            <f-button id="attach-bottom" @click.native="onAttachBottomClick">attach bottom</f-button>
            <f-button id="attach-left" @click.native="onAttachLeftClick">attach left</f-button>
        </div>
    </section>
</template>

<script>
import FWindow from '@/components/FWindow/FWindow.vue';
import FButton from '@/components/FButton/FButton.vue';

export default {
    name: 'FTooltipPlayground',

    components: { FButton, FWindow },

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

                console.log(this.attachPosition, this.attachTo);

                win.hide();
                win.show();
            }
        },
    },
};
</script>

<style scoped></style>
