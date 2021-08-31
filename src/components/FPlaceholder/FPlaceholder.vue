<template>
    <span class="fplaceholder" :class="classes">
        <template v-if="contentLoaded"><slot></slot></template>
        <template v-else>
            <span v-if="!block" ref="twin" class="fplaceholder_replacementtwin">{{ replacement || '&nbsp;' }}</span>
            <span class="fplaceholder_replacement">{{ replacement || '&nbsp;' }}</span>
        </template>
    </span>
</template>

<script>
/**
 * Placeholder for a content. Waits for `contentLoaded` to be `true`, meanwhile it shows not visible replacement element
 * with background animation.
 */
export default {
    name: 'FPlaceholder',

    props: {
        /** Determines whether the content is loaded or not */
        contentLoaded: {
            type: Boolean,
            default: false,
        },
        /** Text to be used in replacement element (not visible) */
        replacementText: {
            type: String,
            default: '',
        },
        /** Number of characters of placeholder text "Lorem ipsum ..." used as a replacement text, if `replacementText` is not specified */
        replacementNumChars: {
            type: Number,
            default: 0,
            validator: function(value) {
                return value >= 0;
            },
        },
        animation: {
            type: String,
            default: 'fplaceholder-movingbganim',
        },
        /** Set `animation` class while content is loading */
        useAnimation: {
            type: Boolean,
            default: true,
        },
        /** Display placeholder as a block */
        block: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            loremIpsum:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid ipsam magni nam odit praesentium temporibus vel voluptates voluptatibus. Aliquam atque autem cum dolores iure minus officia quibusdam quis vel voluptates!</div><div>Dicta numquam officiis placeat sed tempore? Consequatur corporis deserunt doloribus, eaque earum enim, ex facere fugiat, hic id iusto minima nisi obcaecati perferendis repellat sunt tempora voluptate! Distinctio, laborum quia.</div><div>Architecto debitis dicta doloremque dolores eligendi enim error exercitationem, explicabo fugiat hic labore laudantium molestias nesciunt nihil obcaecati porro voluptas voluptate voluptatem. Blanditiis, culpa dignissimos odio porro provident quam velit!',
        };
    },

    computed: {
        replacement() {
            let replacement = this.replacementText;

            if (replacement === '' && this.replacementNumChars > 0) {
                replacement = this.loremIpsum.slice(0, this.replacementNumChars);
            }

            return replacement;
        },
        classes() {
            return {
                'fplaceholder-on': !this.contentLoaded,
                'fplaceholder-isblock': this.block,
                [this.animation]: this.useAnimation && !this.contentLoaded,
            };
        },
    },

    mounted() {
        this.$nextTick(() => {
            this.setBackgroundSize();
        });
    },

    methods: {
        setBackgroundSize() {
            if (this.animation !== 'fplaceholder-movingbganim') {
                return;
            }

            let width = 0;

            if (this.block) {
                width = this.$el.clientWidth;
            } else if (!this.contentLoaded) {
                const eTwin = this.$refs.twin;

                if (eTwin) {
                    const elStyle = window.getComputedStyle(this.$el);

                    eTwin.style.padding = elStyle.padding;
                    eTwin.style.fontSize = elStyle.fontSize;
                    eTwin.style.fontFamily = elStyle.fontFamily;

                    width = eTwin.clientWidth;
                }
            }

            if (width > 0) {
                this.$el.style.setProperty('--fplaceholder-background-size-width', `${width * 2}px`);
            }
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
