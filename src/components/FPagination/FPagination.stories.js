import FPagination from './FPagination.vue';
import FButton from '@/components/FButton/FButton.vue';

export default {
    title: 'FPagination',
    component: FPagination,
};

export const Default = () => ({
    components: { FPagination },
    template: `
        <div>
            <f-pagination :total-items="100" />
        </div>
    `,
});

export const Disabled = () => ({
    components: { FPagination },
    template: `
        <div>
            <f-pagination disabled :total-items="100" />
        </div>
    `,
});

export const Type = () => ({
    components: { FPagination },
    template: `
        <div>
            <h3><code>xofy</code></h3>
            <f-pagination :total-items="100" />
            <h3><code>range</code></h3>
            <f-pagination type="range" :total-items="100" />
        </div>
    `,
});

export const Slots = () => ({
    components: { FPagination, FButton },
    template: `
        <div>
            <h3><code>#button</code></h3>
            <p>
                <f-pagination :total-items="100">
                    <template #button="data">
                        <f-button
                            :label="data.label"
                            tertiary
                            round
                            :disabled="data.disabled"
                            :title="data.title"
                            :aria-label="data.title"
                        />
                    </template>
                </f-pagination>
            </p>

            <h3><code>#pages, #button</code></h3>
            <p>
                <f-pagination :total-items="50">
                    <template #button="data">
                        <f-button
                            size="small"
                            :disabled="data.disabled"
                            :title="data.title"
                            :aria-label="data.title"
                        >
                            <template v-if="data.type === 'first'">First</template>
                            <template v-else-if="data.type === 'prev'">Previous</template>
                            <template v-else-if="data.type === 'next'">Next</template>
                            <template v-else-if="data.type === 'last'">Last</template>
                        </f-button>
                    </template>
                    <template #pages="data">
                        <b>{{ data.itemsIndices.from + 1 }}-{{ data.itemsIndices.to + 1 }}</b>/{{ data.totalItems }}
                    </template>
                </f-pagination>
            </p>
        </div>
    `,
});

export const Model = () => ({
    components: { FPagination },
    template: `
        <div>
            <p><f-pagination :total-items="100" v-model="currPage" /></p>
            <p>Current page: {{ currPage }} <input type="number" @input="onInput" value="1"  aria-label="current page"></p>
        </div>
    `,
    data() {
        return {
            currPage: 1,
        };
    },
    methods: {
        onInput(_event) {
            this.currPage = parseInt(_event.target.value);
        },
    },
});

export const PageChange = () => ({
    components: { FPagination },
    template: `
        <div>
            <h3><code>page-change</code> event</h3>
            <p><f-pagination :total-items="100" @page-change="onPageChange" /></p>
            <div>
                <h4>Pagination state</h4>
                <pre>
{{ paginationState }}
                </pre>
            </div>
        </div>
    `,
    data() {
        return {
            paginationState: {},
        };
    },
    methods: {
        onPageChange(_state) {
            this.paginationState = _state;
        },
    },
});
