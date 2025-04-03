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

        <update-modal v-if="hasBeneficiary && hasAssistance" />

        <delete-modal v-if="hasBeneficiary && hasAssistance" />

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
    name: 'BeneficiaryAssistance',

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
            items: 'companyBeneficiaryAssistance/items',
            isLoading: 'companyBeneficiaryAssistance/isLoading',
            page: 'companyBeneficiaryAssistance/page',
            assistance: 'companyBeneficiaryAssistance/selected',
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

        hasAssistance()
        {
            return Object.keys(this.assistance).length > 0;
        },
    },

    methods:
    {
        ...mapActions({
            load: 'companyBeneficiaryAssistance/load',
            loadMore: 'companyBeneficiaryAssistance/loadMore',
            unset: 'companyBeneficiaryAssistance/unsetItems',
        }),

        async onLoad()
        {
            await this.load(`/my-company/beneficiary/${this.$route.params.code}/assistances`);
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
