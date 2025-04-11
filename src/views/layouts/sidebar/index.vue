<template>
    <div class="sidebar-wrapper"
        @mouseover="hover(true)"
        @mouseleave="hover(false)">

        <div class="simplebar-height-auto-observer-wrapper">
            <div class="simplebar-height-auto-observer"></div>
        </div>

        <div class="simplebar-mask">
            <div class="simplebar-offset" style="right: 0px; bottom: 0px;">
                <div class="simplebar-content-wrapper" style="height: 100%; overflow: scroll;">
                    <div class="simplebar-content mm-active" style="padding: 0px;">
                        <div class="sidebar-header">
                            <div v-if="isCompany && companyLogo">
                                <img :src="companyLogo" class="logo-icon" alt="logo icon">
                            </div>
                            <div v-else>
                                <img src="/static/assets/images/logo/bcmp-logo.png" class="logo-icon" alt="logo icon">
                            </div>

                            <div v-if="isCompany && companyLogo">
                                <h4 class="logo-text">{{companyName}}</h4>
                            </div>
                            <div v-else>
                                <h4 class="logo-text">Membership</h4>
                            </div>

                            <div class="toggle-icon ms-auto"
                                @click="toggle()">
                                <i class='bx bx-menu'></i>
                            </div>
                        </div>

                        <admin-menu
                            v-if="!isLoading('user') && isAdmin"/>

                        <company-menu
                            v-if="!isLoading('user') && isCompany"/>

                        <!--end navigation -->
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { Dater } from '@/utils';

import AdminMenu from './content/admin';
import CompanyMenu from './content/company';

export default
{
    components:
    {
        AdminMenu,
        CompanyMenu,
    },

    data()
    {
        return {
            settingsDropdown: false,
            settingsClass: 'mm-collapse',

            adminSettingsDropdown: false,
            adminSettingsClass: 'mm-collapse'
        };
    },

    computed:
    {
        ...mapGetters({
            sidebar: 'layout/sidebar',
            accessUser: 'auth/accessUser',
            isLoading: 'auth/isLoading',
        }),

        isAdmin()
        {
            return this.accessUser.account_type.id == 1;
        },

        isCompany()
        {
            return this.accessUser.account_type.id == 2;
        },

        companyLogo()
        {
            return this.accessUser.company.logo;
        },

        companyName()
        {
            return this.accessUser.company.name;
        },

        companyStatus()
        {
            if (this.isCompany)
                return this.accessUser.company.status;

            return true;
        },

        dateRange()
        {
            return `${Dater.rawToday()},${Dater.rawToday()}`;
        },

        monthRange()
        {
            let date = Dater.firstAndLastDateOfMonth();

            return `${date.firstDate},${date.lastDate}`;
        },
    },

    methods:
    {
        ...mapActions({
            setSidebar: 'layout/setSidebar',
        }),

        hover(bool)
        {
            this.setSidebar({
                name: 'hovered',
                bool: bool
            });
        },

        toggle()
        {
            this.setSidebar({
                name: 'toggled',
                bool: !this.sidebar('toggled')
            });
        },

        toggleDropdown(name)
        {
            this[`${name}Class`] = 'mm-collapsing';

            let dropdown = this[`${name}Dropdown`];

            this[`${name}Dropdown`] = !dropdown;

            setTimeout(() => {
                if(this[`${name}Dropdown`])
                {
                    this[`${name}Class`] = 'mm-collapse mm-show';
                }
                else
                {
                    this[`${name}Class`] = 'mm-collapse';
                }
            }, 50);

        },
    },
};
</script>
