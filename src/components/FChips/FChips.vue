<template>
    <f-listbox
        :data="data"
        :removable-items="removable"
        non-selectable
        hide-not-found-message
        v-bind="$attrs"
        class="fchips"
        :class="classes"
        aria-orientation="horizontal"
        @item-remove="onItemRemove"
    >
        <!-- copy slots -->
        <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
            <slot :name="name" v-bind="data"></slot>
        </template>
    </f-listbox>
</template>

<script>
import FListbox from '../FListbox/FListbox.vue';
import { cloneObject } from '../../utils';

export default {
    name: 'FChips',

    inheritAttrs: false,

    components: { FListbox },

    model: {
        prop: 'data',
        event: 'change',
    },

    props: {
        /** @type {{label: string}[]} */
        data: {
            type: Array,
            default() {
                return [];
            },
        },
        /**
         * Size of the chips
         *
         * @type {('large' | 'small' | 'mini')}
         */
        size: {
            type: String,
            default: '',
            validator: function(_value) {
                return ['', 'large', 'small', 'mini'].indexOf(_value) !== -1;
            },
        },
        /** If `true`, chips will be removable */
        removable: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            dData: this.data,
        };
    },

    computed: {
        classes() {
            const { size } = this;

            return {
                'fchips-lg': size === 'large',
                'fchips-sm': size === 'small',
                'fchips-xs': size === 'mini',
            };
        },
    },

    methods: {
        onItemRemove(payload) {
            this.$emit('chip-delete', payload);

            this.dData.splice(payload.index, 1);
            this.$emit('change', cloneObject(this.dData));
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
