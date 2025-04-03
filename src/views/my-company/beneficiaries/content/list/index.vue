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
                    <ul class="ap-list ap-list-divider"
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

        <delete-modal v-if="hasBeneficiary" />

        <send-branding-message-modal v-if="hasBeneficiary" />

        <send-regular-message-modal v-if="hasBeneficiary" />

        <!-- <call-modal v-if="hasBeneficiary" /> -->

        <update-officer-modal v-if="hasBeneficiary" />

        <update-voter-modal v-if="hasBeneficiary" />

        <generate-document-modal v-if="hasBeneficiary" />

        <generate-id-modal v-if="hasBeneficiary" />

        <download-modal />

        <download-by-barangay-modal />

        <download-by-purok-modal />

        <batch-print-modal />
        
        <main-offcanvas />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import ActionComponent from './content/action';
import HeaderComponent from './content/header';
import ItemComponent from './content/item';
import PlaceholderComponent from './content/placeholder';

import DeleteModal from './components/modals/delete';
import SendBrandingMessageModal from './components/modals/send-branding-message';
import SendRegularMessageModal from './components/modals/send-regular-message';
// import CallModal from './components/modals/call';
import UpdateOfficerModal from './components/modals/update-officer';
import UpdateVoterModal from './components/modals/update-voter';
import GenerateDocumentModal from './components/modals/generate-document';
import GenerateIdModal from './components/modals/generate-id';
import DownloadModal from './components/modals/download';
import DownloadByBarangayModal from './components/modals/download-by-barangay';
import DownloadByPurokModal from './components/modals/download-by-purok';
import BatchPrintModal from './components/modals/batch-print-modal';

import MainOffcanvas from './components/offcanvas/main';

export default
{
    name: 'ListComponent',

    components:
    {
        ActionComponent,
        HeaderComponent,
        ItemComponent,
        PlaceholderComponent,
        BatchPrintModal,
        DeleteModal,
        SendBrandingMessageModal,
        SendRegularMessageModal,
        // CallModal,
        UpdateOfficerModal,
        UpdateVoterModal,
        GenerateDocumentModal,
        GenerateIdModal,
        DownloadModal,
        DownloadByBarangayModal,
        DownloadByPurokModal,

        MainOffcanvas,
    },

    data()
    {
        return {
            deleteModal: false,
            sendBrandingMessageModal: false,
            sendRegularMessageModal: false,
            callModal: false,
            updateOfficerModal: false,
            updateVoterModal: false,
            generateIDModal: false,
            generateDocumentModal: false,
            downloadModal: false,
            downloadByBarangayModal: false,
            downloadByPurokModal: false,
            batchPrintModal: false,
            mainOffcanvas: false,
        };
    },

    created()
    {
        this.loadList();
    },

    computed:
    {
        ...mapGetters({
            items: 'companyBeneficiary/items',
            isLoading: 'companyBeneficiary/isLoading',
            page: 'companyBeneficiary/page',
            beneficiary: 'companyBeneficiary/selected',
        }),

        emptyLabel()
        {
            return Object.keys(this.$route.query).length > 0
                ? 'no search result'
                : 'no records yet';
        },

        hasBeneficiary()
        {
            return Object.keys(this.beneficiary).length > 0;
        },

        fullPath()
        {
            return this.$route.fullPath.replace(
                '/company/beneficiaries',
                '/my-company/beneficiaries'
            );
        },
    },

    methods:
    {
        ...mapActions({
            load: 'companyBeneficiary/load',
            loadPrerequisite: 'companyBeneficiary/loadPrerequisite',
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
            this.loadList();
        },
    },
};
</script>
