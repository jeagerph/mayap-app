<template>
    <div class="ap-card-content ap-padding-small">

        <!-- <header-component /> -->

        <div class="ap-text-center ap-margin-top"
            v-if="items.length && page.total > 10">

            <ap-pagination
                :page="page"/>
        </div>

        <div
            v-if="!isLoading('index')"
            class="ap-card-content">

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

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import HeaderComponent from './content/header';
import ItemComponent from './content/item';
import PlaceholderComponent from './content/placeholder';

export default
{
    name: 'BeneficiaryDocument',

    components:
    {
        HeaderComponent,
        ItemComponent,
        PlaceholderComponent
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
            items: 'companyBeneficiaryDocument/items',
            isLoading: 'companyBeneficiaryDocument/isLoading',
            page: 'companyBeneficiaryDocument/page',
            selected: 'companyBeneficiaryDocument/selected',
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

        hasSelected()
        {
            return Object.keys(this.selected).length > 0;
        },
    },

    methods:
    {
        ...mapActions({
            load: 'companyBeneficiaryDocument/load',
            loadMore: 'companyBeneficiaryDocument/loadMore',
            unset: 'companyBeneficiaryDocument/unsetItems',
        }),

        async onLoad()
        {
            await this.load(`/my-company/beneficiary/${this.$route.params.code}/documents`);
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
