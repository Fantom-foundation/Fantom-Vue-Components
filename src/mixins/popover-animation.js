export const popoverAnimationMixin = {
    props: {
        /** Animation that starts when the popover is just about to show */
        animationIn: {
            type: String,
            default: 'scale-center-enter-active',
        },
        /** Animation that starts when the popover is just about to hide */
        animationOut: {
            type: String,
            default: 'scale-center-leave-active',
        },
        /** Animation that starts when the item is selected  */
        animationOutSuccess: {
            type: String,
            default: 'scale-center-forward-leave-active',
        },
    },
};
