<template>
    <div class="ap-card-content ap-padding-small">

        <header-component />

        <div class="ap-text-center ap-margin-top"
            v-if="items.length && page.total > 10">

            <ap-pagination
                :page="page"/>
        </div>

        <div
            v-if="!isLoading('index')"
            class="ap-margin-medium-top">

            <ul class="ap-list ap-list-divider-bottom"
                v-if="items.length">
                <item-component 
                    v-for="(item, index) in items"
                    :key="index"
                    :item="item"/>
            </ul>
            <ap-card-empty
                v-else
                :label="emptyLabel"/>

            <div class="ap-margin-top ap-text-center"
                v-if="!isLoading('index') && nextPage">
                <hr>
                <ap-button
                    @click="onLoadMore()"
                    :color="'primary'"
                    :rounded="true"
                    :loading="isLoading('more')">
                    Load More
                </ap-button>
            </div>
        </div>

        <placeholder-component
            v-else
            v-for="index in 5"
            :key="index" />

        <create-modal v-if="hasBeneficiary" />

        <update-modal v-if="hasBeneficiary && hasPatient" />

        <delete-modal v-if="hasBeneficiary && hasPatient" />

        <approve-modal v-if="hasBeneficiary && hasPatient" />

        <in-progress-modal v-if="hasBeneficiary && hasPatient" />

        <complete-modal v-if="hasBeneficiary && hasPatient" />

        <cancel-modal v-if="hasBeneficiary && hasPatient" />

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import HeaderComponent from './content/header';
import ItemComponent from './content/item';
import PlaceholderComponent from './content/placeholder';

import CreateModal from './components/modals/create';
import UpdateModal from './components/modals/update';
import DeleteModal from './components/modals/delete';

import ApproveModal from './components/modals/approve';
import InProgressModal from './components/modals/in-progress';
import CompleteModal from './components/modals/complete';
import CancelModal from './components/modals/cancel';

export default
{
    name: 'BeneficiaryPatients',

    components:
    {
        HeaderComponent,
        ItemComponent,
        PlaceholderComponent,

        CreateModal,
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
            createModal: false,
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
            items: 'companyBeneficiaryPatient/items',
            isLoading: 'companyBeneficiaryPatient/isLoading',
            page: 'companyBeneficiaryPatient/page',
            patient: 'companyBeneficiaryPatient/selected',
            beneficiary: 'companyBeneficiary/selected',
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

        hasBeneficiary()
        {
            return Object.keys(this.beneficiary).length > 0;
        },

        hasPatient()
        {
            return Object.keys(this.patient).length > 0;
        },
    },

    methods:
    {
        ...mapActions({
            load: 'companyBeneficiaryPatient/load',
            loadMore: 'companyBeneficiaryPatient/loadMore',
            unset: 'companyBeneficiaryPatient/unsetItems',
        }),

        async onLoad()
        {
            await this.load(`/my-company/beneficiary/${this.$route.params.code}/patients`);
        },

        async onLoadMore()
        {
            await this.loadMore(this.nextPage);
        },

        toggleModal(name, bool)
        {
            this[`${name}Modal`] = bool;
        },
    },
};
</script>
