<template>
    <div class="ap-animate ap-animate-fade-in">

        <header-component />

        <div class="card card-body ap-padding ap-card-content">

            <div class="ap-text-center ap-margin-top"
                v-if="items.length && page.total > 10">

                <ap-pagination
                    :page="page"/>
            </div>

            <div
                v-if="!isLoading('index')">

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

        <create-modal />

        <update-modal v-if="hasSelected" />

        <delete-modal v-if="hasSelected" />

        <update-status-modal v-if="hasSelected" />


    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { Toast } from '@/utils';

import HeaderComponent from './content/header';
import ItemComponent from './content/item';
import PlaceholderComponent from './content/placeholder';

import CreateModal from './components/modals/create';
import UpdateModal from './components/modals/update';
import DeleteModal from './components/modals/delete';
import UpdateStatusModal from './components/modals/update-status';

export default
{
    name: 'CompanyOfficerClassifications',

    components:
    {
        HeaderComponent,
        ItemComponent,
        PlaceholderComponent,
        CreateModal,
        UpdateModal,
        DeleteModal,
        UpdateStatusModal,
    },

    data()
    {
        return {
            createModal: false,
            updateModal: false,
            updateStatusModal: false,
            deleteModal: false,
            updateStatusModal: false,
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
            items: 'myCompanyOfficerClassification/items',
            isLoading: 'myCompanyOfficerClassification/isLoading',
            page: 'myCompanyOfficerClassification/page',
            selected: 'myCompanyOfficerClassification/selected',
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
            load: 'myCompanyOfficerClassification/load',
            loadMore: 'myCompanyOfficerClassification/loadMore',
            unset: 'myCompanyOfficerClassification/unsetItems',
        }),

        async onLoad()
        {
            const response = await this.load(`/my-company/officer-classifications`);

            if (response.status == 200)
            {

            }
            else if (response.status === 403)
            {
                let message = 'Sorry, you cannot perform this action.';

                Toast.error({
                    message: response.data.error.description
                        ? response.data.error.description
                        : message,
                });
            }
            else if (response.status === 404)
            {
                let message = 'Data not found. Please try again.';

                Toast.error({
                    message: response.data.error.description
                        ? response.data.error.description
                        : message,
                });
            }
            else
            {
                let message = 'Something went wrong. Please try again.';

                Toast.error({
                    message: response.data.error.description
                        ? response.data.error.description
                        : message,
                });
            }
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
