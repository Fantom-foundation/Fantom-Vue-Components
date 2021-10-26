<template>
    <span class="fdarkthemeswitch">
        <f-toggle-button v-bind="$attrs" v-on="$listeners" />
    </span>
</template>

<script>
import FToggleButton from '../FToggleButton/FToggleButton.vue';

/**
 * Toggle button with sun and moon icons
 */
export default {
    name: 'FDarkThemeSwitch',

    components: { FToggleButton },

    inheritAttrs: false,

    model: {
        prop: 'modelValue',
        event: 'change',
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
