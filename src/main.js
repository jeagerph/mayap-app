// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';

import axios from 'axios';
import VueCroppie from 'vue-croppie';


import { store } from './stores';
import { router } from './router';

// Utils
import { Cookie } from './utils';

// Global Components
import './components';
import 'croppie/croppie.css';
import '@/utils/directive';

Vue.use(VueCroppie);

Vue.config.productionTip = false;

if (Cookie.get(process.env.APP_ACCESS_TOKEN) !== null)
{
    const authorization = `Bearer ${Cookie.get(process.env.APP_ACCESS_TOKEN)}`;

    axios.defaults.headers.common.Authorization = authorization;

    store.dispatch('auth/loadUser');
}

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});
