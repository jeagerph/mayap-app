<template>
    <div class="card card-body ap-padding">

        <header-component />

        <div
            v-if="!isLoading('index')"
            class="ap-card-scroll-custom"
            @scroll="onScroll">

            <ul class="ap-list ap-list-divider"
                v-if="items.length">
                <item-component 
                    v-for="(item, index) in items"
                    :key="index"
                    :item="item"/>
            </ul>
            <ap-card-empty
                v-else
                :label="emptyLabel"/>
        </div>

        <placeholder-component
            v-else
            v-for="index in 5"
            :key="index" />

        <placeholder-component
            v-if="isLoading('more')" />

        <view-modal v-if="hasPatient" />

        <update-modal v-if="hasPatient" />

        <delete-modal v-if="hasPatient" />

        <approve-modal v-if="hasPatient" />

        <in-progress-modal v-if="hasPatient" />

        <complete-modal v-if="hasPatient" />

        <cancel-modal v-if="hasPatient" />

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import HeaderComponent from './content/header';
import ItemComponent from './content/item';
import PlaceholderComponent from './content/placeholder';

import ViewModal from './components/modals/view';
import UpdateModal from './components/modals/update';
import DeleteModal from './components/modals/delete';

import ApproveModal from './components/modals/approve';
import InProgressModal from './components/modals/in-progress';
import CompleteModal from './components/modals/complete';
import CancelModal from './components/modals/cancel';

export default
{
    name: 'DashboardPatients',

    components:
    {
        HeaderComponent,
        ItemComponent,
        PlaceholderComponent,

        ViewModal,
        UpdateModal,
        DeleteModal,

        ApproveModal,
        InProgressModal,
        CompleteModal,
        CancelModal,
    },

    data()
    {
        return {
            viewModal: false,
            updateModal: false,
            deleteModal: false,

            approveModal: false,
            inProgressModal: false,
            completeModal: false,
            cancelModal: false,
        };
    },

    created()
    {
        window.scrollTo(0,0);
        
        this.onLoad();
    },

    destroyed()
    {
        this.unset();
    },
    
    computed:
    {
        ...mapGetters({
            items: 'companyDashboardPatient/items',
            isLoading: 'companyDashboardPatient/isLoading',
            page: 'companyDashboardPatient/page',
            patient: 'companyDashboardPatient/selected',
        }),

        emptyLabel()
        {
            return Object.keys(this.$route.query).length > 0
                ? 'no search result'
                : 'no record yet';
        },

        nextPage()
        {
            return this.page.nextPage
                ? this.page.nextPage.replace(
                    `${process.env.APP_API_URL}/${process.env.APP_API_VERSION}`,
                    '')
                : null;
        },

        hasPatient()
        {
            return Object.keys(this.patient).length > 0;
        },
    },

    methods:
    {
        ...mapActions({
            load: 'companyDashboardPatient/load',
            loadMore: 'companyDashboardPatient/loadMore',
            unset: 'companyDashboardPatient/unsetItems',
        }),

        async onLoad()
        {
            await this.load(`/my-company/dashboard/patients/list`);
        },

        async onLoadMore()
        {
            await this.loadMore(this.nextPage);
        },

        onScroll ({ target: { scrollTop, clientHeight, scrollHeight }})
        {
            if (!this.isLoading('index') && !this.isLoading('more'))
            {
                if (scrollTop + clientHeight >= scrollHeight)
                {
                    if (this.nextPage)
                    {
                        this.loadMore(this.nextPage);
                    }
                }
            }
        },

        toggleModal(name, bool)
        {
            this[`${name}Modal`] = bool;
        },
    },
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