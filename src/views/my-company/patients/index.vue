<template>
    <div class="ap-animate ap-animate-fade-in">

        <action-component />

        <div class="card card-body ap-padding ap-card-content">
        
            <header-component />

            <div class="ap-margin-top">
                <div class="ap-text-center ap-margin-top"
                    v-if="!isLoading('index') && items.length && page.total > 10">

                    <ap-pagination
                        :page="page"/>
                </div>

                <div v-if="!isLoading('index')">
                    <ul class="ap-list ap-list-divider ap-list-hover"
                        v-if="items.length">

                        <item-component
                            v-for="(item, index) in items"
                            :key="index"
                            :item="item" />
                    </ul>

                    <ap-card-empty
                        v-else
                        :label="emptyLabel" />
                </div>

                <placeholder-component
                    v-else
                    v-for="index in 5"
                    :key="index" />

                
                <div class="ap-text-center"
                    v-if="!isLoading('index') && items.length && page.total > 10">
                    <ap-pagination
                        :page="page"/>
                </div>
            </div>
        </div>

        <create-modal />

        <view-modal v-if="hasPatient" />

        <update-modal v-if="hasPatient" />

        <delete-modal v-if="hasPatient" />

        <approve-modal v-if="hasPatient" />

        <in-progress-modal v-if="hasPatient" />

        <complete-modal v-if="hasPatient" />

        <cancel-modal v-if="hasPatient" />

        <download-modal />

        <download-by-barangay-modal />

        <download-by-purok-modal />

        <main-offcanvas />

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import ActionComponent from './content/action';
import HeaderComponent from './content/header';
import ItemComponent from './content/item';
import PlaceholderComponent from './content/placeholder';

import ViewModal from './components/modals/view';
import CreateModal from './components/modals/create';
import UpdateModal from './components/modals/update';
import DeleteModal from './components/modals/delete';

import ApproveModal from './components/modals/approve';
import InProgressModal from './components/modals/in-progress';
import CompleteModal from './components/modals/complete';
import CancelModal from './components/modals/cancel';

import DownloadModal from './components/modals/download';
import DownloadByBarangayModal from './components/modals/download-by-barangay';
import DownloadByPurokModal from './components/modals/download-by-purok';

import MainOffcanvas from './components/offcanvas/main';

export default
{
    name: 'CompanyPatients',

    components:
    {
        ActionComponent,
        HeaderComponent,
        ItemComponent,
        PlaceholderComponent,

        ViewModal,
        CreateModal,
        UpdateModal,
        DeleteModal,

        ApproveModal,
        InProgressModal,
        CompleteModal,
        CancelModal,

        DownloadModal,
        DownloadByBarangayModal,
        DownloadByPurokModal,

        MainOffcanvas,
    },

    data()
    {
        return {
            viewModal: false,
            createModal: false,
            updateModal: false,
            deleteModal: false,

            approveModal: false,
            inProgressModal: false,
            completeModal: false,
            cancelModal: false,

            downloadModal: false,
            downloadByBarangayModal: false,
            downloadByPurokModal: false,

            mainOffcanvas: false,

            selectedBeneficiary: {},
        };
    },

    created()
    {
        window.scrollTo(0,0);
        
        this.loadList();
    },

    computed:
    {
        ...mapGetters({
            items: 'companyPatient/items',
            isLoading: 'companyPatient/isLoading',
            page: 'companyPatient/page',
            patient: 'companyPatient/selected',
        }),

        emptyLabel()
        {
            return Object.keys(this.$route.query).length > 0
                ? 'no search result'
                : 'no record yet';
        },

        hasPatient()
        {
            return Object.keys(this.patient).length > 0;
        },

        fullPath()
        {
            return this.$route.fullPath.replace(
                '/company/patients',
                '/my-company/patients'
            );
        },
    },

    methods:
    {
        ...mapActions({
            load: 'companyPatient/load',
        }),

        async loadList()
        {
            window.scrollTo(0,0);

            await this.load(this.fullPath);
        },

        toggleModal(name, bool)
        {
            this[`${name}Modal`] = bool;
        },

        toggleOffcanvas(name, bool)
        {
            this[`${name}Offcanvas`] = bool;
        },
    },

    watch:
    {
        $route()
        {
            this.loadList()
        }
    }
};
</script>

<style scoped>

.ap-card-scroll-custom {
    height: 400px;
    overflow: hidden;
}

.ap-card-scroll-custom:hover {
    overflow: auto;
}
</style>