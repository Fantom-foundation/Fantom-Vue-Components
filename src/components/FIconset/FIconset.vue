<template>
    <f-svg-icon v-bind="$attrs">
        <component :is="componentName" />
    </f-svg-icon>
</template>

<script>
import FSvgIcon from '../FSvgIcon/FSvgIcon.vue';

import IconAngleLeft from '../icons/IconAngleLeft.vue';
import IconCheckCircle from '../icons/IconCheckCircle.vue';
import IconChevronDown from '../icons/IconChevronDown.vue';
import IconExclamationCircle from '../icons/IconExclamationCircle.vue';
import IconEye from '../icons/IconEye.vue';
import IconEyeSlash from '../icons/IconEyeSlash.vue';
import IconFantom from '../icons/IconFantom.vue';
import IconInfoCircle from '../icons/IconInfoCircle.vue';
import IconPopoverArrow from '../icons/IconPopoverArrow.vue';
import IconSearch from '../icons/IconSearch.vue';
import IconTimes from '../icons/IconTimes.vue';
import IconTrash from '../icons/IconTrash.vue';

/**
 * Icon set of default icons (from `icons` directory).
 * Inherits props from `FSvgIcon`
 */
export default {
    name: 'FIconset',

    components: {
        FSvgIcon,
        IconAngleLeft,
        IconCheckCircle,
        IconChevronDown,
        IconExclamationCircle,
        IconEye,
        IconEyeSlash,
        IconFantom,
        IconInfoCircle,
        IconPopoverArrow,
        IconSearch,
        IconTimes,
        IconTrash,
    },

    props: {
        /** Icon name. For example icon name for `IconArrowLeft` will be `arrow-left` */
        icon: {
            type: String,
            default: '',
            required: true,
        },
    },

    computed: {
        componentName() {
            return `icon-${this.icon}`;
        },
    },
};
</script>
