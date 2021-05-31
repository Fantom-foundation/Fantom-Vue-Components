<template>
    <span class="fdotsloader">
        <span></span>
        <span></span>
        <span></span>
    </span>
</template>

<script>
/**
 * Three dots loader component
 */
export default {
    name: 'FDotsLoader',

    props: {
        color: {
            type: String,
            default: '',
        },
        size: {
            type: String,
            default: '',
        },
        speed: {
            type: String,
            default: '',
        },
    },

    watch: {
        color(_value) {
            this.setColor(_value);
        },

        size(_value) {
            this.setSize(_value);
        },

        speed(_value) {
            this.setSpeed(_value);
        },
    },

    mounted() {
        this.setColor(this.color);
        this.setSize(this.size);
        this.setSpeed(this.speed);
    },

    methods: {
        setCustomProperty(_prop, _value) {
            const { $el } = this;

            if ($el && _value) {
                $el.style.setProperty(_prop, _value);
            }
        },

        setColor(_value) {
            this.setCustomProperty('--fdotsloader-background', _value);
        },

        setSize(_value) {
            this.setCustomProperty('--fdotsloader-size', _value);
        },

        setSpeed(_value) {
            this.setCustomProperty('--fdotsloader-anim-duration', _value);
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
