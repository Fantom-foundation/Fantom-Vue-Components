<template>
    <div class="fdatagridrowedit">
        <f-data-grid
            ref="grid"
            edit-mode="row-edit"
            :use-pagination="false"
            no-header
            v-bind="$attrs"
            v-on="$listeners"
        >
            <!-- copy slots -->
            <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
                <slot :name="name" v-bind="data"></slot>
            </template>
        </f-data-grid>

        <div class="pat-4">
            <f-button v-if="showAddButton" secondary size="small" label="Add lines" @click.native="onAddLinesClick" />
            <f-button
                v-if="showClearButton"
                secondary
                size="small"
                label="Clear all lines"
                @click.native="onClearAllLinesClick"
            />
        </div>
    </div>
</template>

<script>
import FDataGrid from '../FDataGrid/FDataGrid.vue';
import FButton from '../FButton/FButton.vue';

/**
 * Extension of `FDataGrid` with row edit mode switched on
 */
export default {
    name: 'FDataGridRowEdit',

    components: { FButton, FDataGrid },

    inheritAttrs: false,

    model: {
        prop: 'items',
        event: 'data-change',
    },

    props: {
        showAddButton: {
            type: Boolean,
            default: true,
        },
        showClearButton: {
            type: Boolean,
            default: true,
        },
    },

    methods: {
        getGridRef() {
            return this.$refs.grid;
        },

        onAddLinesClick() {
            this.$refs.grid.addEmptyRow(4);
        },

        onClearAllLinesClick() {
            const { grid } = this.$refs;

            grid.dItems = [];
            grid.addEmptyRow(2);
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
