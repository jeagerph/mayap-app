<template>
    <div>

        <ap-grid
            :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">

                <profile-component />

                <sms-overview-component />

                <call-overview-component />

            </div>
            <div class="ap-width-1-1@s ap-width-2-3@m ap-width-2-3@l">

                <!-- <summary-component /> -->

                <div class="ap-subnav-wrapper vh-margin-top">
                    <ul class="ap-subnav ap-subnav-default ap-subnav-horizontal-scroll">
                        <li :class="{ 'ap-active': activeTab === 'barangays' }">
                            <a class="ap-point"
                                :class="{ 'ap-text-bold': activeTab === 'barangays' }"
                                @click="switchTab('barangays')">
                                <i class="lni lni-users ap-margin-small-right"></i> BARANGAYS
                            </a>
                        </li>

                        <li :class="{ 'ap-active': activeTab === 'accounts' }">
                            <a class="ap-point"
                                :class="{ 'ap-text-bold': activeTab === 'accounts' }"
                                @click="switchTab('accounts')">
                                <i class="lni lni-users ap-margin-small-right"></i> ACCOUNTS
                            </a>
                        </li>
                        
                        <li :class="{ 'ap-active': activeTab === 'settings' }">
                            <a class="ap-point"
                                :class="{ 'ap-text-bold': activeTab === 'settings' }"
                                @click="switchTab('settings')">
                                <i class="lni lni-users ap-margin-small-right"></i> SETTINGS
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="card card-body ap-padding">

                    <ul class="ap-switcher">
                        <li :class="{ 'ap-active': activeTab === 'barangays' }">

                            <barangays-component v-if="activeTab == 'barangays'" />

                        </li>

                        <li :class="{ 'ap-active': activeTab === 'accounts' }">

                            <accounts-component v-if="activeTab == 'accounts'" />

                        </li>

                        <li :class="{ 'ap-active': activeTab === 'settings' }">

                            <settings-component v-if="activeTab == 'settings'" />

                        </li>

                    </ul>
                </div>


            </div>

        </ap-grid>

        <update-logo-modal v-if="hasCompany" />

        <update-sub-logo-modal v-if="hasCompany" />

        <delete-modal v-if="hasCompany" />

        <update-status-modal v-if="hasCompany" />

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import ProfileComponent from './content/profile';
import SmsOverviewComponent from './content/overview/sms';
import CallOverviewComponent from './content/overview/call';
import BarangaysComponent from './content/barangays';
import AccountsComponent from './content/accounts';
import SettingsComponent from './content/settings';

import UpdateLogoModal from './components/modals/update-logo';
import UpdateSubLogoModal from './components/modals/update-sub-logo';
import DeleteModal from './components/modals/delete';
import UpdateStatusModal from './components/modals/update-status';

export default
{
    name: 'ViewComponent',

    components:
    {
        ProfileComponent,
        SmsOverviewComponent,
        CallOverviewComponent,
        BarangaysComponent,
        AccountsComponent,
        SettingsComponent,

        UpdateLogoModal,
        UpdateSubLogoModal,
        DeleteModal,
        UpdateStatusModal,
    },

    data()
    {
        return {
            activeTab: 'barangays',

            updateLogoModal: false,
            updateSubLogoModal: false,
            deleteModal: false,
            updateStatusModal: false,
        };
    },

    created()
    {
        this.load();
    },

    computed:
    {
        ...mapGetters({
            company: 'adminCompany/selected',
            isLoading: 'adminCompany/isLoading',
        }),

        hasCompany()
        {
            return Object.keys(this.company).length > 0;
        },
    },
    
    methods:
    {
        ...mapActions({
            show: 'adminCompany/show',
        }),

        async load()
        {
            await this.show(`/administration/company/${this.$route.params.code}`);
        },

        switchTab(tab)
        {
            this.activeTab = tab;
        },

        toggleModal(name, bool)
        {
            this[`${name}Modal`] = bool;
        },
    },
};
</script>
