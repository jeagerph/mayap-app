<template>
    <div clclass="ap-animate ap-animate-fade-in">

        <header-component />

        <div
            v-if="!isLoading('index')"
            class="ap-card-content">

            <ul class="ap-list ap-list-divider ap-margin-top"
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

        <div v-else>
            <placeholder-component
                v-for="index in 5"
                :key="index" />
        </div>

        <create-modal />

        <update-modal v-if="hasSelected" />

        <update-photo-modal v-if="hasSelected" />

        <delete-modal v-if="hasSelected" />

        <update-permissions-modal v-if="hasSelected" />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import HeaderComponent from './content/header';
import ItemComponent from './content/item';
import PlaceholderComponent from './content/placeholder';

import CreateModal from './components/modals/create';
import UpdateModal from './components/modals/update';
import UpdatePhotoModal from './components/modals/update-photo';
import DeleteModal from './components/modals/delete';
import UpdatePermissionsModal from './components/modals/update-permissions';


export default
{
    name: 'AdminCompanyAccounts',

    components:
    {
        HeaderComponent,
        ItemComponent,
        PlaceholderComponent,
        CreateModal,
        UpdateModal,
        UpdatePhotoModal,
        DeleteModal,
        UpdatePermissionsModal,
    },

    data()
    {
        return {
            createModal: false,
            updateModal: false,
            updatePhotoModal: false,
            deleteModal: false,
            updatePermissionsModal: false,
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
            items: 'adminCompanyAccount/items',
            isLoading: 'adminCompanyAccount/isLoading',
            page: 'adminCompanyAccount/page',
            selected: 'adminCompanyAccount/selected',
        }),

        emptyLabel()
        {
            return Object.keys(this.$route.query).length > 0
                ? 'no search result'
                : 'no accounts yet';
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
            load: 'adminCompanyAccount/load',
            loadMore: 'adminCompanyAccount/loadMore',
            unset: 'adminCompanyAccount/unsetItems',
        }),

        async onLoad()
        {
            await this.load(`/administration/company/${this.$route.params.code}/accounts`);
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
