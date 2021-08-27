import { withA11y } from '@storybook/addon-a11y';

import FPlaceholder from './FPlaceholder.vue';

export default {
    title: 'FPlaceholder',
    component: FPlaceholder,
    decorators: [withA11y],
};

const testContStyle = {
    maxWidth: '350px',
    // border: '1px solid #eee',
    // padding: '16px',
    margin: '16px',
};

const testContStyle2 = {
    maxWidth: '850px',
    margin: '16px',
};

const TIMEOUT = 2000;

export const Default = () => ({
    components: { FPlaceholder },
    template: `
        <div>
            <div :style="testContStyle">
                Lorem ipsum dolor sit amet,
                <b><f-placeholder :content-loaded="!!item"><em>{{ item }}</em></f-placeholder></b>
                consectetur adipisicing elit.
            </div>
            <button class="btn light" @click="init">Go</button>
        </div>
    `,
    created() {
        this.init();
    },
    data() {
        return {
            item: '',
            testContStyle,
        };
    },
    methods: {
        init() {
            this.item = '';

            setTimeout(() => {
                this.item = 'foo';
            }, TIMEOUT);
        },
    },
});

export const ReplacementText = () => ({
    components: { FPlaceholder },
    template: `
        <div>
            <div :style="testContStyle">
                Lorem ipsum dolor sit amet,
                <b><f-placeholder replacement-text="123" :content-loaded="!!item"><em>{{ item }}</em></f-placeholder></b>
                consectetur adipisicing elit.
            </div>
            <button class="btn light" @click="init">Go</button>
        </div>
    `,
    created() {
        this.init();
    },
    data() {
        return {
            item: '',
            testContStyle,
        };
    },
    methods: {
        init() {
            this.item = '';

            setTimeout(() => {
                this.item = 'foo';
            }, TIMEOUT);
        },
    },
});

export const LongerReplacementText = () => ({
    components: { FPlaceholder },
    template: `
        <div>
            <div :style="testContStyle">
                Lorem ipsum dolor sit amet,
                <b>
                    <f-placeholder
                        replacement-text="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                        :content-loaded="!!item"
                    >
                        <em>{{ item }}</em>
                    </f-placeholder>
                </b>
                consectetur adipisicing elit.
            </div>
            <button class="btn light" @click="init">Go</button>
        </div>
    `,
    created() {
        this.init();
    },
    data() {
        return {
            item: '',
            testContStyle,
        };
    },
    methods: {
        init() {
            this.item = '';

            setTimeout(() => {
                this.item = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.';
            }, TIMEOUT);
        },
    },
});

export const ReplacementNumChars = () => ({
    components: { FPlaceholder },
    template: `
        <div>
            <div :style="testContStyle">
                Lorem ipsum dolor sit amet,
                <b>
                    <f-placeholder :replacement-num-chars="71" :content-loaded="!!item">
                        <em>{{ item }}</em>
                    </f-placeholder>
                </b>
                consectetur adipisicing elit.
            </div>
            <button class="btn light" @click="init">Go</button>
        </div>
    `,
    created() {
        this.init();
    },
    data() {
        return {
            item: '',
            testContStyle,
        };
    },
    methods: {
        init() {
            this.item = '';

            setTimeout(() => {
                this.item = 'Aspernatur assumenda aut culpa, cupiditate dolor eius enim facere fuga.';
            }, TIMEOUT);
        },
    },
});

export const Block = () => ({
    components: { FPlaceholder },
    template: `
        <div>
            <div :style="testContStyle">
                Lorem ipsum dolor sit amet,
                <b>
                    <f-placeholder block :replacement-num-chars="120" :content-loaded="!!item">
                        <em>{{ item }}</em>
                    </f-placeholder>
                </b>
                consectetur adipisicing elit.
            </div>
            <div :style="testContStyle2">
                Lorem ipsum dolor sit amet,
                <b>
                    <f-placeholder block :replacement-num-chars="140" :content-loaded="!!item">
                        <em>{{ item }}</em>
                    </f-placeholder>
                </b>
                consectetur adipisicing elit.
            </div>
            <button class="btn light" @click="init">Go</button>
        </div>
    `,
    created() {
        this.init();
    },
    data() {
        return {
            item: '',
            testContStyle,
            testContStyle2,
        };
    },
    methods: {
        init() {
            this.item = '';

            setTimeout(() => {
                this.item =
                    'Aspernatur assumenda aut culpa, cupiditate dolor eius enim facere fuga. Lorem ipsum dolor sit amet, consectetur adipisicing elit.';
            }, TIMEOUT);
        },
    },
});

export const Animation = () => ({
    components: { FPlaceholder },
    template: `
        <div>
            <div :style="testContStyle">
                Lorem ipsum dolor sit amet,
                <b>
                    <f-placeholder animation="fplaceholder-pulsebganim" :replacement-num-chars="120" block :content-loaded="!!item">
                        <em>{{ item }}</em>
                    </f-placeholder>
                </b>
                consectetur adipisicing elit.
            </div>
            <div :style="testContStyle2">
                Lorem ipsum dolor sit amet,
                <b>
                    <f-placeholder animation="fplaceholder-pulsebganim" :replacement-num-chars="140" block :content-loaded="!!item">
                        <em>{{ item }}</em>
                    </f-placeholder>
                </b>
                consectetur adipisicing elit.
            </div>
            <button class="btn light" @click="init">Go</button>
        </div>
    `,
    created() {
        this.init();
    },
    data() {
        return {
            item: '',
            testContStyle,
            testContStyle2,
        };
    },
    methods: {
        init() {
            this.item = '';

            setTimeout(() => {
                this.item =
                    'Aspernatur assumenda aut culpa, cupiditate dolor eius enim facere fuga. Lorem ipsum dolor sit amet, consectetur adipisicing elit.';
            }, TIMEOUT);
        },
    },
});

export const NoAnimation = () => ({
    components: { FPlaceholder },
    template: `
        <div>
            <div :style="testContStyle">
                Lorem ipsum dolor sit amet,
                <b>
                    <f-placeholder :use-animation="false" :replacement-num-chars="120" block :content-loaded="!!item">
                        <em>{{ item }}</em>
                    </f-placeholder>
                </b>
                consectetur adipisicing elit.
            </div>
            <div :style="testContStyle2">
                Lorem ipsum dolor sit amet,
                <b>
                    <f-placeholder :use-animation="false" :replacement-num-chars="140" block :content-loaded="!!item">
                        <em>{{ item }}</em>
                    </f-placeholder>
                </b>
                consectetur adipisicing elit.
            </div>
            <button class="btn light" @click="init">Go</button>
        </div>
    `,
    created() {
        this.init();
    },
    data() {
        return {
            item: '',
            testContStyle,
            testContStyle2,
        };
    },
    methods: {
        init() {
            this.item = '';

            setTimeout(() => {
                this.item =
                    'Aspernatur assumenda aut culpa, cupiditate dolor eius enim facere fuga. Lorem ipsum dolor sit amet, consectetur adipisicing elit.';
            }, TIMEOUT);
        },
    },
});
