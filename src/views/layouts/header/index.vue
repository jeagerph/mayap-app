<template>
    <header>
        <div class="topbar d-flex align-items-center">
            <nav class="navbar navbar-expand">

                <div class="mobile-toggle-menu"
                    @click="toggleSidebar()">
                    <i class="bx bx-menu"></i>
                </div>

                <div class="top-menu ms-auto">
                    <ul class="navbar-nav align-items-center">

                        <!-- <messages-component /> -->

                        <!-- <sms-credit-component /> -->

                        <!-- <call-credit-component /> -->

                        <notifications-component />


                    </ul>
                </div>
                
                <account-component />
            </nav>
        </div>

        <logout-modal />
    </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

// import Http from '@/services';

import AccountComponent from './content/account';
import NotificationsComponent from './content/notifications';
import MessagesComponent from './content/messages';
// import SmsCreditComponent from './content/sms-credit';
// import CallCreditComponent from './content/call-credit';

import LogoutModal from '../components/modals/logout';

export default
{
    name: 'Header',

    components:
    {
        NotificationsComponent,
        MessagesComponent,
        AccountComponent,
        // SmsCreditComponent,
        // CallCreditComponent,


        LogoutModal,
    },

    data()
    {
        return {
            logoutModal: false,
        };
    },

    computed:
    {
        ...mapGetters({
            accessUser: 'auth/accessUser',
            sidebar: 'layout/sidebar',
        }),

        appName()
        {
            return process.env.APP_NAME;
        },

        isDevelopment()
        {
            return process.env.APP_ENVIRONMENT === 'development';
        },

        appVersion()
        {
            return process.env.APP_VERSION;
        },
    },

    methods:
    {
        ...mapActions({
            setSidebar: 'layout/setSidebar',
        }),

        toggleSidebar()
        {
            this.setSidebar({
                name: 'toggled',
                bool: !this.sidebar('toggled')
            });
        },

        toggleModal(name, bool)
        {
            this[`${name}Modal`] = bool;
        },
    },
};
</script>
