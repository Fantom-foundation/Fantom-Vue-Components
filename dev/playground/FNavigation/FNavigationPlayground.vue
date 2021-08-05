<template>
    <div class="fnavigationplayground">
        <br /><br />
        <button @click="expanded = !expanded">{{ expanded ? 'Collapse' : 'Expand' }}</button>
        <button @click="$refs.nav1.highlightNode('id1')">Highlight node</button>
        <button @click="$refs.nav1.highlightNode('id1', true)">Highlight node and expand</button>
        <button @click="$refs.nav1.highlightPath('id1')">Highlight path</button>
        <button @click="$refs.nav1.highlightPath('id1', true)">Highlight path and expand</button>
        <button @click="$refs.nav1.background()">Background</button>
        <button @click="$refs.nav1.background(true)">Background and collapse</button>

        <f-navigation
            ref="nav1"
            :navigation="navigation"
            :expanded="expanded"
            :highlight-node="highlight"
            @node-selected="onNodeSelected"
        />

        <br /><br />
        <button @click="expanded2 = !expanded2">{{ expanded2 ? 'Collapse' : 'Expand' }}</button>
        <f-navigation :navigation="navigation2" :expanded="expanded2" @node-selected="onNodeSelected">
            <template #node="node">
                <b :data-node-id="node.id">{{ node.label }}</b>
                <template v-if="node.parent"> ({{ node.expanded ? 'expanded' : 'collapsed' }})</template>
            </template>
        </f-navigation>
    </div>
</template>

<script>
import FNavigation from '@/components/FNavigation/FNavigation.vue';
import { clone } from '@/utils';

const navigation = [
    {
        label: 'Item 1',
        _c: [
            { label: 'Item 2 1', url: '#url21', blank: true },
            {
                label: 'Item 2 2',
                url: '#url22',
                _c: [
                    { label: 'Item 3 1', url: '#url31' },
                    { id: 'id1', label: 'Item 3 2', url: '#url32' },
                    { label: 'Item 3 3', url: '#url33' },
                ],
            },
        ],
    },
    { label: 'Item 2' },
];

export default {
    name: 'FNavigationPlayground',

    components: { FNavigation },

    data() {
        return {
            navigation: clone(navigation),
            navigation2: clone(navigation),
            expanded: false,
            expanded2: false,
            highlight: '',
            highlight2: '',
        };
    },

    methods: {
        onNodeSelected(_node) {
            console.log('!!', _node);
        },
    },
};
</script>
