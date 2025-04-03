<template>
    <div>

        <ap-grid :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">

                <profile-component />

            </div>

            <div class="ap-width-1-1@s ap-width-2-3@m ap-width-2-3@l">
                <div class="ap-subnav-wrapper">
                    <ul class="ap-subnav ap-subnav-default ap-subnav-horizontal-scroll">
                        <li :class="{ 'ap-active': activeTab === 'activities' }">
                            <a class="ap-point"
                                :class="{ 'ap-text-bold': activeTab === 'activities' }"
                                @click="switchTab('activities')">
                                <i class="lni lni-bolt ap-margin-small-right"></i> ACTIVITIES
                            </a>
                        </li>
                        <li :class="{ 'ap-active': activeTab === 'permissions' }">
                            <a class="ap-point"
                                :class="{ 'ap-text-bold': activeTab === 'permissions' }"
                                @click="switchTab('permissions')">
                                <i class="lni lni-cogs ap-margin-small-right"></i> PERMISSIONS
                            </a>
                        </li>
                        <li :class="{ 'ap-active': activeTab === 'user-pin' }">
                            <a class="ap-point"
                                :class="{ 'ap-text-bold': activeTab === 'user-pin' }"
                                @click="switchTab('user-pin')">
                                <i class="lni lni-cogs ap-margin-small-right"></i> OTP
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="card card-body ap-padding">
                    <ul class="ap-switcher">
                        <li :class="{ 'ap-active': activeTab === 'activities'}">

                            <activities-component v-if="activeTab === 'activities'" />

                        </li>
                        <li :class="{ 'ap-active': activeTab === 'permissions'}">

                            <permissions-component v-if="activeTab === 'permissions'" />

                        </li>
                        <li :class="{ 'ap-active': activeTab === 'user-pin'}">

                            <user-pin-component v-if="activeTab === 'user-pin'" />

                        </li>
                    </ul>
                </div>

            </div>
        </ap-grid>

        <update-photo-modal v-if="hasAccount" />

        <update-password-modal v-if="hasAccount" />

        <update-status-modal v-if="hasAccount" />

        <delete-modal v-if="hasAccount" />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import ProfileComponent from './content/profile';
import ActivitiesComponent from './content/activities';
import PermissionsComponent from './content/permissions';
import UserPinComponent from './content/user-pin';

import UpdatePhotoModal from './components/modals/update-photo';
import UpdatePasswordModal from './components/modals/update-password';
import UpdateStatusModal from './components/modals/update-status';
import DeleteModal from './components/modals/delete';

export default
{
    name: 'ViewComponent',

    components:
    {
        ProfileComponent,
        ActivitiesComponent,
        PermissionsComponent,
        UserPinComponent,

        UpdatePhotoModal,
        UpdatePasswordModal,
        UpdateStatusModal,
        DeleteModal,
    },

    data()
    {
        return {
            activeTab: 'activities',

            updatePhotoModal: false,
            updatePasswordModal: false,
            updateStatusModal: false,
            deleteModal: false,
        };
    },

    created()
    {
        this.load();
    },

    computed:
    {
        ...mapGetters({
            account: 'adminAccount/selected',
            isLoading: 'adminAccount/isLoading',
        }),

        hasAccount()
        {
            return Object.keys(this.account).length > 0;
        },
    },
    
    methods:
    {
        ...mapActions({
            show: 'adminAccount/show',
        }),

        async load()
        {
            await this.show(`/administration/account/${this.$route.params.code}`);
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
