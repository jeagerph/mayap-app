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

        <update-modal v-if="hasAssistance" />

        <delete-modal v-if="hasAssistance" />

        <download-modal />

        <download-by-barangay-modal />

        <download-by-from-modal />

        <download-by-purok-modal />

        <view-modal v-if="hasAssistance" />

        <main-offcanvas />

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import ActionComponent from './content/action';
import HeaderComponent from './content/header';
import ItemComponent from './content/item';
import PlaceholderComponent from './content/placeholder';

import CreateModal from './components/modals/create';
import UpdateModal from './components/modals/update';
import DeleteModal from './components/modals/delete';

import DownloadModal from './components/modals/download';
import DownloadByBarangayModal from './components/modals/download-by-barangay';
import DownloadByFromModal from './components/modals/download-by-from';
import DownloadByPurokModal from './components/modals/download-by-purok';
import ViewModal from './components/modals/view';

import MainOffcanvas from './components/offcanvas/main';

export default
{
    name: 'CompanyAssistances',

    components:
    {
        ActionComponent,
        HeaderComponent,
        ItemComponent,
        PlaceholderComponent,

        CreateModal,
        UpdateModal,
        DeleteModal,
        
        DownloadModal,
        DownloadByBarangayModal,
        DownloadByFromModal,
        DownloadByPurokModal,
        ViewModal,

        MainOffcanvas,
    },

    data()
    {
        return {
            createModal: false,
            updateModal: false,
            deleteModal: false,
            downloadModal: false,
            downloadByBarangayModal: false,
            downloadByFromModal: false,
            downloadByPurokModal: false,
            viewModal: false,

            mainOffcanvas: false,
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
            items: 'companyAssistance/items',
            isLoading: 'companyAssistance/isLoading',
            page: 'companyAssistance/page',
            assistance: 'companyAssistance/selected',
        }),

        emptyLabel()
        {
            return Object.keys(this.$route.query).length > 0
                ? 'no search result'
                : 'no record yet';
        },

        hasAssistance()
        {
            return Object.keys(this.assistance).length > 0;
        },

        fullPath()
        {
            return this.$route.fullPath.replace(
                '/company/assistances',
                '/my-company/assistances'
            );
        },
    },

    methods:
    {
        ...mapActions({
            load: 'companyAssistance/load',
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