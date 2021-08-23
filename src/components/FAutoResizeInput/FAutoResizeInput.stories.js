import FAutoResizeInput from './FAutoResizeInput.vue';
import FInput from '../FInput/FInput.vue';

export default {
    title: 'FAutoResizeInput',
    component: FAutoResizeInput,
};

export const Default = () => ({
    components: { FAutoResizeInput, FInput },
    template: `
        <div>
            <f-auto-resize-input><input type="text" aria-label="auto resizable input"></f-auto-resize-input> <br /><br />
            <f-auto-resize-input><f-input label="FInput" /></f-auto-resize-input>
        </div>
    `,
});

export const MinWidth = () => ({
    components: { FAutoResizeInput, FInput },
    template: `
        <div>
            <f-auto-resize-input min-width="48px"><input type="text" aria-label="auto resizable input"></f-auto-resize-input> <br /><br />
            <f-auto-resize-input min-width="48px"><f-input label="FInput" /></f-auto-resize-input>
        </div>
    `,
});

export const Value = () => ({
    components: { FAutoResizeInput, FInput },
    template: `
        <div>
            <f-auto-resize-input><input type="text" value="Lorem ipsum" aria-label="auto resizable input"></f-auto-resize-input> <br /><br />
            <f-auto-resize-input><f-input label="FInput" value="Lorem ipsum" /></f-auto-resize-input>
        </div>
    `,
});

export const ExtraWidth = () => ({
    components: { FAutoResizeInput, FInput },
    template: `
        <div>
            <f-auto-resize-input :extra-width="21"><input type="number" value="0" aria-label="auto resizable input"></f-auto-resize-input> <br /><br />
        </div>
    `,
});

export const Placeholder = () => ({
    components: { FAutoResizeInput, FInput },
    template: `
        <div>
            <f-auto-resize-input><input type="text" placeholder="Placeholder"></f-auto-resize-input> <br /><br />
            <f-auto-resize-input><f-input label="FInput" placeholder="Placeholder" /></f-auto-resize-input>
        </div>
    `,
});
