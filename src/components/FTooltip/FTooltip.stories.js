import FTooltip from './FTooltip.vue';
import FButton from '../FButton/FButton.vue';

export default {
    title: 'FTooltip',
    component: FTooltip,
};

export const Default = () => ({
    components: { FTooltip },
    template: `
        <div class="pat-1">
            <div class="gridauto">
                <div><span data-tooltip="Tooltip text">Tooltip 1</span></div>
                <div class="pat-7"><span data-tooltip="Tooltip text 2">Tooltip 2</span></div>
                <div><span data-tooltip="Tooltip text 3">Tooltip 3</span><span data-tooltip="Tooltip text 3.5">Tooltip 3.5</span></div>
                <div><span data-tooltip="">No tooltip text</span></div>
            </div>
            <f-tooltip />
        </div>
    `,
});

export const FocusBlur = () => ({
    components: { FTooltip, FButton },
    template: `
        <div class="pat-5">
            <button data-tooltip="Button tooltip text 1">Tooltip 1</button>
            <f-button data-tooltip="Button tooltip text 1" label="Tooltip 2" />
            <f-button data-tooltip="" label="No text" />
            <f-tooltip />
        </div>
    `,
});

export const WithArrow = () => ({
    components: { FTooltip, FButton },
    template: `
        <div class="pat-9">
            <button data-tooltip="Button tooltip text 1">Tooltip 1</button>
            <f-button data-tooltip="Button tooltip text 1" label="Tooltip 2" />
            <f-button data-tooltip="" label="No tooltip text" />
            <f-tooltip with-arrow />
        </div>
    `,
});
