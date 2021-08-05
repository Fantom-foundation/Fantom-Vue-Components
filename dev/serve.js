import Vue from 'vue';
import Dev from './serve.vue';
import { Notifications } from '@/plugins/notifications.js';
import FSearchField from '@/components/FSearchField/FSearchField.vue';
import FComboBox from '@/components/FComboBox/FComboBox.vue';
import CustomComboBox from './playground/CustomComboBox/CustomComboBox.vue';

Vue.use(Notifications);

Vue.config.productionTip = false;

// global components
Vue.component('FSearchField', FSearchField);
Vue.component('FComboBox', FComboBox);
Vue.component('CustomComboBox', CustomComboBox);

new Vue({
    render: h => h(Dev),
}).$mount('#app');
