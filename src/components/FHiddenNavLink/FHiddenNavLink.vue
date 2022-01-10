<template>
    <a :href="`#${to}`" class="fhiddennavlink" @click="onClick"><slot></slot></a>
</template>

<script>
export default {
    name: 'FHiddenNavLink',

    props: {
        /** Id of target element */
        to: {
            type: String,
            default: '',
            required: true,
        },
    },

    methods: {
        onClick(event) {
            const elem = document.getElementById(this.to);

            if (elem) {
                elem.focus();

                if (elem.scrollIntoView) {
                    elem.scrollIntoView();
                }
            }

            event.preventDefault();
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
