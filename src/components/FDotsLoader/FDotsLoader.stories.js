import FDotsLoader from '@/components/FDotsLoader/FDotsLoader.vue';

export default {
    title: 'FDotsLoader',
    component: FDotsLoader,
};

export const Default = () => ({
    components: { FDotsLoader },
    template: `
        <div>
            <f-dots-loader />
        </div>
    `,
});

export const Color = () => ({
    components: { FDotsLoader },
    template: `
        <div class="flex ali-center gap-5">
            <f-dots-loader color="crimson" />
            <f-dots-loader color="magenta" />
        </div>
    `,
});

export const Size = () => ({
    components: { FDotsLoader },
    template: `
        <div class="flex ali-center gap-5">
            <f-dots-loader size="24px" />
            <f-dots-loader />
            <f-dots-loader size="3px" />
        </div>
    `,
});

export const Speed = () => ({
    components: { FDotsLoader },
    template: `
        <div class="flex ali-center gap-5">
            <f-dots-loader speed="400ms" />
            <f-dots-loader speed="2s" />
        </div>
    `,
});
