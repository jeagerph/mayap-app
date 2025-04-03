<template>
    <div class="ap-animate ap-animate-fade-in ap-padding-small">

        <header-component />

        <div class="ap-text-center ap-margin-top"
            v-if="items.length && page.total > 10">

            <ap-pagination
                :page="page"/>
        </div>

        <div
            v-if="!isLoading('index')"
            class="ap-card-content">

            <div v-if="items.length">
                <ap-grid
                    :gutter="'small'">
                    <item-component 
                        v-for="(item, index) in items"
                        :key="index"
                        :item="item"/>
                </ap-grid>
            </div>
            
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


        <create-modal />

        <delete-modal v-if="hasSelected" />

        <arrange-modal v-if="hasSelected" />

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

export default
{
    name: 'BeneficiaryFamilies',

    components:
    {
        HeaderComponent,
        ItemComponent,
        PlaceholderComponent,

        CreateModal,
        UpdateModal,
        DeleteModal,
    },

    data()
    {
        return {
            createModal: false,
            updateModal: false,
            deleteModal: false,
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
            items: 'companyBeneficiaryFamily/items',
            isLoading: 'companyBeneficiaryFamily/isLoading',
            page: 'companyBeneficiaryFamily/page',
            patient: 'companyBeneficiaryFamily/selected',
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

        hasSelected()
        {
            return this.hasPatient;
        },
    },

    methods:
    {
        ...mapActions({
            load: 'companyBeneficiaryFamily/load',
            loadMore: 'companyBeneficiaryFamily/loadMore',
            unset: 'companyBeneficiaryFamily/unsetItems',
        }),

        async onLoad()
        {
            await this.load(`/my-company/beneficiary/${this.$route.params.code}/relatives`);
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
