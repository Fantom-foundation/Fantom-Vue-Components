import Vue from 'vue';
import { findParentByName } from '../../utils/vue-helpers.js';

function fWindowHideOnClick(event, el, binding, vnode) {
    const fWindow = findParentByName(vnode.componentInstance, 'f-window');

    if (fWindow) {
        fWindow.hide();
    }
}

/**
 * Hide closest `f-window` component.
 */
Vue.directive('fwindow-hide', {
    bind(el, binding, vnode) {
        binding._fWindowHideOnClick = event => {
            fWindowHideOnClick(event, el, binding, vnode);
        };
        el.addEventListener('click', binding._fWindowHideOnClick);
    },

    unbind(el, binding) {
        el.removeEventListener('click', binding._fWindowHideOnClick);
    },
});
