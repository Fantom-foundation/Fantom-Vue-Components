<template>
    <f-combo-box
        v-bind="{ ...$attrs, ...$props }"
        v-on="$listeners"
        select-mode
        strategy="remote"
        :data="dData"
        focus
        @page-change="onPageChange"
        @change="$emit('input', $event)"
    >
        <!-- copy slots -->
        <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
            <slot :name="name" v-bind="data"></slot>
        </template>
    </f-combo-box>
</template>

<script>
import { fetchPagedComboBoxData } from './responses.js';
import FListbox from '@/components/FListbox/FListbox.vue';

export default {
    name: 'CustomComboBox',

    inheritAttrs: false,

    props: {
        /**
         * Listbox's items
         * @type {FListboxItem[]}
         */
        data: { ...FListbox.props.data },
    },

    data() {
        return {
            dData: this.data,
        };
    },

    watch: {
        data(_value) {
            this.dData = _value;
        },
    },

    methods: {
        onPageChange(_event) {
            console.log('onPageChange: ', _event);
            this.dData = fetchPagedComboBoxData(1000, _event);
        },
    },
};
</script>
