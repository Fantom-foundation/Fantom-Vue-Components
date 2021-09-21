import FImage from '@/components/FImage/FImage.vue';

export default {
    title: 'FImage',
    components: FImage,
};

export const Default = () => ({
    components: { FImage },
    //language=HTML
    template: `
        <div>
            <f-image alt="image" />
        </div>
    `,
});

export const Src = () => ({
    components: { FImage },
    //language=HTML
    template: `
        <div>
            <f-image src="avatar.png" alt="image" />
        </div>
    `,
});

export const SrcBig = () => ({
    components: { FImage },
    //language=HTML
    template: `
        <div>
            <f-image src="avatar2.jpg" alt="image" />
        </div>
    `,
});

export const WidthAndHeight = () => ({
    components: { FImage },
    //language=HTML
    template: `
        <div class="gridauto">
            <f-image width="100%" height="100px" alt="image" :style="style" />
            <f-image width="100%" height="100px" src="avatar.png" alt="image" :style="style" />
            <f-image width="100%" height="100px" src="avatar2.jpg" alt="image" :style="style" />
        </div>
    `,
    data() {
        return {
            style: {
                border: '1px solid #ddd',
            },
        };
    },
});

export const Size = () => ({
    components: { FImage },
    //language=HTML
    template: `
        <div class="gridauto">
            <f-image size="200px" alt="image" :style="style" />
            <f-image size="200px" src="avatar.png" alt="image" :style="style" />
            <f-image size="200px" src="avatar2.jpg" alt="image" :style="style" />
        </div>
    `,
    data() {
        return {
            style: {
                border: '1px solid #ddd',
            },
        };
    },
});

export const PlaceholderSlot = () => ({
    components: { FImage },
    //language=HTML
    template: `
        <div class="gridauto">
            <f-image size="200px" :src="src" alt="image" :style="style">
                <template #placeholder>
                    Loading...
                </template>
            </f-image>
        </div>
    `,
    data() {
        return {
            style: {
                border: '1px solid #ddd',
            },
            src: '',
        };
    },
    created() {
        setTimeout(() => {
            this.src = 'avatar.png';
        }, 1500);
    },
});
