<template>
    <section>
        <h1 class="h2">FDotsLoader</h1>

        <h3>size</h3>
        <div class="flex ali-center gap-5 mab-5">
            <f-dots-loader size="var(--f-spacer-5)" />
            <f-dots-loader />
            <f-dots-loader size="var(--f-spacer-1)" />
        </div>

        <h3>color</h3>
        <div class="flex ali-center gap-5 mab-5">
            <f-dots-loader color="crimson" />
            <f-dots-loader color="magenta" />
        </div>

        <h3>speed</h3>
        <div class="flex ali-center gap-5 mab-5">
            <f-dots-loader speed="0.4s" />
            <f-dots-loader speed="2s" />
        </div>
    </section>
</template>

<script>
import FDotsLoader from '@/components/FDotsLoader/FDotsLoader.vue';
export default {
    name: 'FDotsLoaderPlayground',
    components: { FDotsLoader },
};
</script>

<style scoped></style>
