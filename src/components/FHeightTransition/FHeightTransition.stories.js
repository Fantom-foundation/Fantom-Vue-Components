import FHeightTransition from './FHeightTransition.vue';
import FButton from '@/components/FButton/FButton.vue';

export default {
    title: 'FHeightTransition',
    component: FHeightTransition,
};

export const Default = () => ({
    components: { FHeightTransition, FButton },
    template: `
        <div style="max-width: 400px">
            <f-button :label="!expand ? 'Expand' : 'Collapse'" @click.native="expand = !expand" class="mab-3" />

            <f-height-transition>
                <div v-show="expand" id="elem">
                    <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci assumenda delectus deserunt dignissimos dolores facere, fuga id in incidunt laudantium nisi numquam officia quam soluta totam unde voluptate. Asperiores, vero!</div>
                    <div>Eligendi facere in possimus quae sunt tempora veritatis! Accusantium architecto commodi consectetur culpa, hic ipsam libero magni maxime nulla, numquam odio omnis quas quos sed sint tempora voluptate? Debitis, molestiae?</div>
                </div>
            </f-height-transition>

            <hr>
        </div>
    `,
    data() {
        return {
            expand: false,
        };
    },
});

export const TransitionOptions = () => ({
    components: { FHeightTransition, FButton },
    template: `
        <div style="max-width: 400px">
            <f-button :label="!expand ? 'Expand' : 'Collapse'" @click.native="expand = !expand" class="mab-3" />

            <f-height-transition transition-length="1s" transition-func="ease-in-out">
                <div v-if="expand" id="elem">
                    <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci assumenda delectus deserunt dignissimos dolores facere, fuga id in incidunt laudantium nisi numquam officia quam soluta totam unde voluptate. Asperiores, vero!</div>
                    <div>Eligendi facere in possimus quae sunt tempora veritatis! Accusantium architecto commodi consectetur culpa, hic ipsam libero magni maxime nulla, numquam odio omnis quas quos sed sint tempora voluptate? Debitis, molestiae?</div>
                </div>
            </f-height-transition>

            <hr>
        </div>
    `,
    data() {
        return {
            expand: false,
        };
    },
});

export const Disabled = () => ({
    components: { FHeightTransition, FButton },
    template: `
        <div style="max-width: 400px">
            <f-button :label="!expand ? 'Expand' : 'Collapse'" @click.native="expand = !expand" class="mab-3" />

            <f-height-transition disabled>
                <div v-if="expand" id="elem">
                    <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci assumenda delectus deserunt dignissimos dolores facere, fuga id in incidunt laudantium nisi numquam officia quam soluta totam unde voluptate. Asperiores, vero!</div>
                    <div>Eligendi facere in possimus quae sunt tempora veritatis! Accusantium architecto commodi consectetur culpa, hic ipsam libero magni maxime nulla, numquam odio omnis quas quos sed sint tempora voluptate? Debitis, molestiae?</div>
                </div>
            </f-height-transition>

            <hr>
        </div>
    `,
    data() {
        return {
            expand: false,
        };
    },
});
