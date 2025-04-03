import Vue from 'vue';
import Router from 'vue-router';
import { Cookie } from '@/utils';

import routes from './routes';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    transitionOnLoad: true,
    // linkActiveClass: 'active',
    linkExactActiveClass: 'mm-active',
    root: '/',
    routes,
});

router.beforeEach((to, from, next) =>
{
    const notAuthRequired = ['signin', 'forgot-password', 'activation', 'reset-password', 'validate-code'];
	const authRequired = !notAuthRequired.includes(to.meta.page);

    const hasAccessToken = Cookie.get(process.env.APP_ACCESS_TOKEN) !== null;

    // if (hasAccessToken && to.path === '/') return next('/dashboard');

    if(authRequired && !hasAccessToken) return next('/signin');

	if(!authRequired && hasAccessToken) return next('/');

	if(to.path == '/') return next('/dashboard');

    return next();
});
