<template>
    <div class="ap-animate ap-animate-fade-in">

        <header-component />

        <div class="card card-body ap-padding ap-card-content">
            <div class="ap-text-center ap-margin-top"
                v-if="!isLoading('index') && items.length && page.total > 10">

                <ap-pagination
                    :page="page"/>
            </div>

            <div v-if="!isLoading('index')">
                <ul class="ap-list ap-list-divider-bottom"
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

        <update-status-modal v-if="hasAccount" />

        <delete-modal v-if="hasAccount" />

        <main-offcanvas />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import HeaderComponent from './content/header';
import ItemComponent from './content/item';
import PlaceholderComponent from './content/placeholder';

import DeleteModal from './components/modals/delete';
import UpdateStatusModal from './components/modals/update-status';

import MainOffcanvas from './components/offcanvas/main';

export default
{
    name: 'ListComponent',

    components:
    {
        HeaderComponent,
        ItemComponent,
        PlaceholderComponent,

        DeleteModal,
        UpdateStatusModal,

        MainOffcanvas,
    },

    data()
    {
        return {
            deleteModal: false,
            updateStatusModal: false,

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
            items: 'adminAccount/items',
            isLoading: 'adminAccount/isLoading',
            page: 'adminAccount/page',
            account: 'adminAccount/selected',
        }),

        emptyLabel()
        {
            return Object.keys(this.$route.query).length > 0
                ? 'no search result'
                : 'no records yet';
        },

        hasAccount()
        {
            return Object.keys(this.account).length > 0;
        },
    },

    methods:
    {
        ...mapActions({
            load: 'adminAccount/load',
        }),

        async loadList()
        {
            window.scrollTo(0,0);

            await this.load(this.$route.fullPath);
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
