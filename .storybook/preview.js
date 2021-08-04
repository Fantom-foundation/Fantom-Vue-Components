import '../src/assets/scss/demo.scss';
// import '../src/plugins/vue-svgicon.js';
// import 'focus-visible';
import Vue from 'vue';
import FErrorMessagesPopover from '@/components/FErrorMessagesPopover/FErrorMessagesPopover.vue';
import FSearchField from '@/components/FSearchField/FSearchField.vue';
import { addDecorator, addParameters } from '@storybook/vue';
import { withDirection } from 'storybook-rtl-addon';

Vue.component('FErrorMessagesPopover', FErrorMessagesPopover);
Vue.component('FSearchField', FSearchField);

addParameters({
    a11y: {
        // optional selector which element to inspect
        element: '#root',
        // axe-core configurationOptions (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#parameters-1)
        config: {},
        // axe-core optionsParameter (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter)
        options: {},
        // optional flag to prevent the automatic check
        manual: false,
    },
});

addDecorator(withDirection);
