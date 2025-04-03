<template>
    <div class="ap-animate ap-animate-fade-in">

        <header-component />

        <div v-if="!isLoading('index')"
            class="ap-card-content">

            <ul class="ap-list ap-list-divider ap-margin-top"
                v-if="items.length">
                <item-component 
                    v-for="(item, index) in orderByItems"
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
                :key="index"/>
        </div>

        

        <create-modal />

        <arrange-modal />

        <update-modal v-if="hasSelected" />

        <update-photo-modal v-if="hasSelected" />

        <update-signature-modal v-if="hasSelected" />

        <delete-modal v-if="hasSelected" />


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
import UpdateSignatureModal from './components/modals/update-signature';
import ArrangeModal from './components/modals/arrange';
import DeleteModal from './components/modals/delete';

export default
{
    name: 'BarangayOfficials',

    components:
    {
        HeaderComponent,
        ItemComponent,
        PlaceholderComponent,
        CreateModal,
        UpdateModal,
        UpdatePhotoModal,
        UpdateSignatureModal,
        ArrangeModal,
        DeleteModal,
    },

    data()
    {
        return {
            createModal: false,
            updateModal: false,
            updatePhotoModal: false,
            updateSignatureModal: false,
            arrangeModal: false,
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
            items: 'adminBarangayOfficial/items',
            isLoading: 'adminBarangayOfficial/isLoading',
            page: 'adminBarangayOfficial/page',
            selected: 'adminBarangayOfficial/selected',
        }),

        orderByItems()
        {
            return this.items.sort((firstElement, secondElement) => {
                return firstElement.order_no - secondElement.order_no;
            });
        },

        emptyLabel()
        {
            return Object.keys(this.$route.query).length > 0
                ? 'no search result'
                : 'no officials yet';
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
            load: 'adminBarangayOfficial/load',
            loadMore: 'adminBarangayOfficial/loadMore',
            unset: 'adminBarangayOfficial/unsetItems',
        }),

        async onLoad()
        {
            await this.load(`/administration/barangay/${this.$route.params.code}/officials`);
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
