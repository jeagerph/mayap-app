<template>
    <div>

        <ap-grid :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">

                <profile-component />

            </div>

            <div class="ap-width-1-1@s ap-width-2-3@m ap-width-2-3@l">
                <div class="ap-subnav-wrapper">
                    <ul class="ap-subnav ap-subnav-default ap-subnav-horizontal-scroll">
                        <li :class="{ 'ap-active': activeTab === 'details' }">
                            <a class="ap-point"
                                :class="{ 'ap-text-bold': activeTab === 'details' }"
                                @click="switchTab('details')">
                                <i class="lni lni-bolt ap-margin-small-right"></i> DETAILS
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="card card-body ap-padding">
                    <ul class="ap-switcher">
                        <li :class="{ 'ap-active': activeTab === 'details'}">

                            <details-component v-if="activeTab === 'details'" />

                        </li>
                    </ul>
                </div>

            </div>
        </ap-grid>

        <delete-modal v-if="hasTemplate" />

        <update-left-signature-modal v-if="hasTemplate" />

        <update-right-signature-modal v-if="hasTemplate" />

        <update-border-modal v-if="hasTemplate" />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import ProfileComponent from './content/profile';
import DetailsComponent from './content/details';
import ActivitiesComponent from './content/activities';

import UpdateStatusModal from './components/modals/update-status';
import UpdateLeftSignatureModal from './components/modals/update-left-signature';
import UpdateRightSignatureModal from './components/modals/update-right-signature';
import UpdateBorderModal from './components/modals/update-border';
import DeleteModal from './components/modals/delete';

export default
{
    name: 'ViewComponent',

    components:
    {
        ProfileComponent,
        DetailsComponent,
        ActivitiesComponent,

        UpdateStatusModal,
        UpdateLeftSignatureModal,
        UpdateRightSignatureModal,
        UpdateBorderModal,
        DeleteModal,
    },

    data()
    {
        return {
            activeTab: 'details',

            updateStatusModal: false,
            updateLeftSignatureModal: false,
            updateRightSignatureModal: false,
            updateBorderModal: false,
            deleteModal: false,
        };
    },

    created()
    {
        this.load();

        window.scrollTo(0,0);
    },

    computed:
    {
        ...mapGetters({
            template: 'myCompanyDocumentTemplate/selected',
            isLoading: 'myCompanyDocumentTemplate/isLoading',
        }),

        hasTemplate()
        {
            return Object.keys(this.template).length > 0;
        },
    },
    
    methods:
    {
        ...mapActions({
            show: 'myCompanyDocumentTemplate/show',
        }),

        async load()
        {
            await this.show(`/my-company/document-template/${this.$route.params.id}`);
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
