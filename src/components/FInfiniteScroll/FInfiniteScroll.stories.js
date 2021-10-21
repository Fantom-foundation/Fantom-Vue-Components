import FInfiniteScroll from '@/components/FInfiniteScroll/FInfiniteScroll.vue';

export default {
    title: 'FInfiniteScroll',
    component: FInfiniteScroll,
};

function getData(idPrefix = 'i', totalItems = 10) {
    const data = [];

    for (let i = 1; i < totalItems; i++) {
        data.push({
            id: `${idPrefix}_${i}`,
            text: `--- ${i} ---- Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aut dolorum et inventore quidem unde, vitae? Aliquid, cupiditate error eveniet impedit iste maiores nemo porro provident quasi quod totam voluptate? Asperiores consequatur culpa deserunt doloremque eius excepturi exercitationem iusto molestias, nihil officiis perferendis possimus, quo, sapiente sequi ut. Ad blanditiis consectetur ea exercitationem fugiat laborum maiores maxime, nostrum numquam! Molestias? Ab alias, amet at deleniti fugit ipsa laboriosam laudantium libero maxime modi molestias natus nihil, odio officiis repudiandae sapiente sequi, sint suscipit vitae voluptatem! Assumenda consectetur eius eligendi nulla velit? Architecto cum error provident quae repudiandae soluta vero. Ad aliquid asperiores assumenda distinctio dolor ex facere illum libero magni natus neque, officia officiis perspiciatis possimus quia sapiente veritatis vitae voluptate. --- /${i} ----`,
        });
    }

    return data;
}

function fetchPagedData(timeout = 1000, pagination, idPrefix = 'i', totalItems = 10) {
    return new Promise(resolve =>
        setTimeout(() => {
            let cData = getData(idPrefix, totalItems);

            resolve(
                cData.slice((pagination.currPage - 1) * pagination.perPage, pagination.currPage * pagination.perPage)
            );
        }, timeout)
    );
}

export const Default = () => ({
    components: { FInfiniteScroll },
    template: `
        <div style="max-width: 400px; margin: 0 auto">
            <p style="position: fixed; left: 0; top: 0;"><b v-show="loading">Loading...</b></p>
            <f-infinite-scroll :total-items="20" :per-page="5" :curr-page="1" :loading="loading" @page-change="onPageChange">
                <p v-for="item in data" :key="item.id">{{ item.text }}</p>
            </f-infinite-scroll>
        </div>
    `,
    data() {
        return {
            data: [],
            loading: false,
        };
    },
    methods: {
        async onPageChange(pagination) {
            this.loading = true;

            const data = await fetchPagedData(1000, pagination, 'i1', 20);

            if (pagination.currPage < pagination.prevPage) {
                this.data = data.concat(this.data);
            } else {
                this.data = this.data.concat(data);
            }

            this.loading = false;
        },
    },
});

export const Tag = () => ({
    components: { FInfiniteScroll },
    template: `
        <div style="max-width: 400px; margin: 0 auto">
            <p style="position: fixed; left: 0; top: 0;"><b v-show="loading">Loading...</b></p>
            <f-infinite-scroll tag="ul" :total-items="20" :per-page="5" :curr-page="1" :loading="loading">
                <li v-for="item in data" :key="item.id">{{ item.text }}</li>
            </f-infinite-scroll>
        </div>
    `,
    data() {
        return {
            data: getData('i1d', 20),
            loading: false,
        };
    },
});

export const Disabled = () => ({
    components: { FInfiniteScroll },
    template: `
        <div style="max-width: 400px; margin: 0 auto">
            <p style="position: fixed; left: 0; top: 0;"><b v-show="loading">Loading...</b></p>
            <f-infinite-scroll disabled :total-items="20" :per-page="5" :curr-page="1" :loading="loading">
                <p v-for="item in data" :key="item.id">{{ item.text }}</p>
            </f-infinite-scroll>
        </div>
    `,
    data() {
        return {
            data: getData('i1d', 20),
            loading: false,
        };
    },
});

export const MiddlePage = () => ({
    components: { FInfiniteScroll },
    template: `
        <div style="max-width: 400px; margin: 0 auto">
            <p style="position: fixed; left: 0; top: 0;"><b v-show="loading">Loading...</b></p>
            <f-infinite-scroll :total-items="20" :per-page="5" :curr-page="3" :loading="loading" @page-change="onPageChange">
                <p v-for="item in data" :key="item.id">{{ item.text }}</p>
            </f-infinite-scroll>
        </div>
    `,
    data() {
        return {
            data: [],
            loading: false,
        };
    },
    methods: {
        async onPageChange(pagination) {
            this.loading = true;

            const data = await fetchPagedData(1000, pagination, 'i2', 20);

            if (pagination.currPage < pagination.prevPage) {
                this.data = data.concat(this.data);
            } else {
                this.data = this.data.concat(data);
            }

            this.loading = false;
        },
    },
});

export const LastPage = () => ({
    components: { FInfiniteScroll },
    template: `
        <div style="max-width: 400px; margin: 0 auto">
            <p style="position: fixed; left: 0; top: 0;"><b v-show="loading">Loading...</b></p>
            <f-infinite-scroll :total-items="20" :per-page="5" :curr-page="4" :loading="loading" @page-change="onPageChange">
                <p v-for="item in data" :key="item.id">{{ item.text }}</p>
            </f-infinite-scroll>
        </div>
    `,
    data() {
        return {
            data: [],
            loading: false,
        };
    },
    methods: {
        async onPageChange(pagination) {
            console.log('onPageChange', JSON.stringify(pagination));
            this.loading = true;

            const data = await fetchPagedData(1000, pagination, 'i3', 20);

            if (pagination.currPage < pagination.prevPage) {
                this.data = data.concat(this.data);
            } else {
                this.data = this.data.concat(data);
            }

            this.loading = false;
        },
    },
});

export const PerPage1 = () => ({
    components: { FInfiniteScroll },
    template: `
        <div style="max-width: 600px; margin: 0 auto">
            <p style="position: fixed; left: 0; top: 0;"><b v-show="loading">Loading...</b></p>
            <f-infinite-scroll :total-items="20" :per-page="1" :curr-page="10" :loading="loading" @page-change="onPageChange">
                <p v-for="item in data" :key="item.id">{{ item.text }}</p>
            </f-infinite-scroll>
        </div>
    `,
    data() {
        return {
            data: [],
            loading: false,
        };
    },
    methods: {
        async onPageChange(pagination) {
            console.log('onPageChange', JSON.stringify(pagination));
            this.loading = true;

            const data = await fetchPagedData(500, pagination, 'i4', 20);

            if (pagination.currPage < pagination.prevPage) {
                this.data = data.concat(this.data);
            } else {
                this.data = this.data.concat(data);
            }

            this.loading = false;
        },
    },
});

export const RootMiddlePage = () => ({
    components: { FInfiniteScroll },
    template: `
        <div id="fio_root" style="max-width: 400px; margin: 0 auto; height: 400px; overflow: auto">
            <p style="position: fixed; left: 0; top: 0;"><b v-show="loading">Loading...</b></p>
            <f-infinite-scroll root="#fio_root" :total-items="20" :per-page="5" :curr-page="3" :loading="loading" @page-change="onPageChange">
                <p v-for="item in data" :key="item.id">{{ item.text }}</p>
            </f-infinite-scroll>
        </div>
    `,
    data() {
        return {
            data: [],
            loading: false,
        };
    },
    methods: {
        async onPageChange(pagination) {
            this.loading = true;

            const data = await fetchPagedData(1000, pagination, 'i5', 20);

            if (pagination.currPage < pagination.prevPage) {
                this.data = data.concat(this.data);
            } else {
                this.data = this.data.concat(data);
            }

            this.loading = false;
        },
    },
});

export const RootMargin = () => ({
    components: { FInfiniteScroll },
    template: `
        <div id="fio_root" style="max-width: 400px; margin: 0 auto; height: 400px; overflow: auto">
            <p style="position: fixed; left: 0; top: 0;"><b v-show="loading">Loading...</b></p>
            <f-infinite-scroll root-margin="400px 0px" root="#fio_root" :total-items="20" :per-page="5" :curr-page="3" :loading="loading" @page-change="onPageChange">
                <p v-for="item in data" :key="item.id">{{ item.text }}</p>
            </f-infinite-scroll>
        </div>
    `,
    data() {
        return {
            data: [],
            loading: false,
        };
    },
    methods: {
        async onPageChange(pagination) {
            this.loading = true;

            const data = await fetchPagedData(1000, pagination, 'i6', 20);

            if (pagination.currPage < pagination.prevPage) {
                this.data = data.concat(this.data);
            } else {
                this.data = this.data.concat(data);
            }

            this.loading = false;
        },
    },
});

export const LoaderSlot = () => ({
    components: { FInfiniteScroll },
    template: `
        <div style="max-width: 400px; margin: 0 auto">
            <p style="position: fixed; left: 0; top: 0;"><b v-show="loading">Loading...</b></p>
            <f-infinite-scroll :total-items="20" :per-page="5" :curr-page="3" :loading="loading" @page-change="onPageChange">
                <template #loader><div style="text-align: center; font-weight: bold">Loading...</div></template>
                <p v-for="item in data" :key="item.id">{{ item.text }}</p>
            </f-infinite-scroll>
        </div>
    `,
    data() {
        return {
            data: [],
            loading: false,
        };
    },
    methods: {
        async onPageChange(pagination) {
            this.loading = true;

            const data = await fetchPagedData(1000, pagination, 'i7', 20);

            if (pagination.currPage < pagination.prevPage) {
                this.data = data.concat(this.data);
            } else {
                this.data = this.data.concat(data);
            }

            this.loading = false;
        },
    },
});
