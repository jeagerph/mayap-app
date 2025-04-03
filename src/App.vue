<template>
    <div id="app">

        <div class="wrapper"
            :class="wrapperClass"
            v-if="!isLoading('user')">

            <div v-if="!isFeaturePage">
                <app-sidebar />

                <app-header />

                <div class="page-wrapper">
                    <div class="page-content">

                        <app-content-title />

                        <router-view />

                    </div>
                </div>

                <div class="overlay toggle-icon"
                    @click="closeSidebar()">
                </div>

                <app-footer />
            </div>

            <div v-else>

                <call-component />

            </div>

        </div>

        <div class="ap-splashscreen"
            v-else>
            <img class="ap-splashscreen-logo" :src="loadingLogo">
        </div>

        
        <theme-switcher v-if="!isFeaturePage" />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { Storage } from '@/utils';

import AppSidebar from '@/views/layouts/sidebar';
import AppHeader from '@/views/layouts/header';
import AppFooter from '@/views/layouts/footer';
import AppContentTitle from '@/views/layouts/content-title';
import ThemeSwitcher from '@/views/layouts/switcher';

import SigninComponent from '@/views/auth/signin';
import CallComponent from '@/views/feature/call';

export default
{
    components:
    {
        AppSidebar,
        AppHeader,
        AppFooter,
        AppContentTitle,
        ThemeSwitcher,
        SigninComponent,

        CallComponent,
    },

    data()
    {
        return {
            isLoggedIn: false,
        };
    },

    computed:
    {
        ...mapGetters({
            accessUser: 'auth/accessUser',
            isLoading: 'auth/isLoading',
            isActive: 'auth/isActive',
            sidebar: 'layout/sidebar'
        }),

        wrapperClass()
        {
            let classes = '';

            if (this.sidebar('hovered')) classes = ' sidebar-hovered ';

            if (this.sidebar('toggled')) classes += ' toggled ';

            return classes;
        },

        loadingLogo()
        {
            if (Storage.get('mmbrshp_loading_screen'))
            {
                return Storage.get('mmbrshp_loading_screen');
            }
            else
            {
                return '/static/favicon.ico';
            }
        },

        isFeaturePage()
        {
            return ['/feature/call'].includes(window.location.pathname);
        }
    },

    methods:
    {
        ...mapActions({
            setSidebar: 'layout/setSidebar',
        }),

        closeSidebar()
        {
            this.setSidebar({
                name: 'toggled',
                bool: false
            });
        },

        initializeTitleFavicon()
        {
            let logo = Storage.get('mmbrshp_loading_screen');

            if (logo)
            {
                document.getElementById('ap-favicon').setAttribute('href', logo);
            }
        },
    },
};
</script>

<style lang="scss">
    @import "./scss/app";
</style>
