import FEllipsis from './FEllipsis.vue';

export default {
    title: 'FEllipsis',
    component: FEllipsis,
};

const resizableBox = 'max-width: 900px; resize: horizontal; overflow: auto; padding: 24px; border: 1px solid #eee;';

export const Default = () => ({
    components: { FEllipsis },
    template: `
        <div :style="resizableBox">
            <f-ellipsis text="0x2fF3c477b65B37678B8DB93A36426Aa2b6B1AcF9A1f12B766C023Ab1807F44cDC5B1e5746dC69d7e" />
        </div>
    `,
    data() {
        return {
            resizableBox,
        };
    },
});

export const OverflowStart = () => ({
    components: { FEllipsis },
    template: `
        <div :style="resizableBox">
            <f-ellipsis
                text="0x2fF3c477b65B37678B8DB93A36426Aa2b6B1AcF9A1f12B766C023Ab1807F44cDC5B1e5746dC69d7e"
                overflow="start"
            />
        </div>
    `,
    data() {
        return {
            resizableBox,
        };
    },
});

export const OverflowMiddleEnd = () => ({
    components: { FEllipsis },
    template: `
        <div :style="resizableBox">
            <f-ellipsis
                text="0x2fF3c477b65B37678B8DB93A36426Aa2b6B1AcF9A1f12B766C023Ab1807F44cDC5B1e5746dC69d7e"
                overflow="middle"
                :fixed-chars-count="7"
            />
        </div>
    `,
    data() {
        return {
            resizableBox,
        };
    },
});

export const OverflowMiddleStart = () => ({
    components: { FEllipsis },
    template: `
        <div :style="resizableBox">
            <f-ellipsis
                text="0x2fF3c477b65B37678B8DB93A36426Aa2b6B1AcF9A1f12B766C023Ab1807F44cDC5B1e5746dC69d7e"
                overflow="middle"
                :fixed-chars-count="7"
                fixed-chars-pos="start"
            />
        </div>
    `,
    data() {
        return {
            resizableBox,
        };
    },
});

export const Slots = () => ({
    components: { FEllipsis },
    template: `
        <div :style="resizableBox">
            <f-ellipsis
                text="0x2fF3c477b65B37678B8DB93A36426Aa2b6B1AcF9A1f12B766C023Ab1807F44cDC5B1e5746dC69d7e"
                overflow="middle"
                :fixed-chars-count="7"
                fixed-chars-pos="start"
            >
                <template #prefix><b>prefix</b></template>
                <template #suffix><b>suffix</b></template>
            </f-ellipsis>
        </div>
    `,
    data() {
        return {
            resizableBox,
        };
    },
});
