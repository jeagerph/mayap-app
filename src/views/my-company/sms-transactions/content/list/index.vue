<template>
    <div class="ap-animate ap-animate-fade-in">

        <header-component />

        <div class="card card-body ap-padding ap-card-content">

            <div class="ap-text-center"
                v-if="!isLoading('index') && items.length && page.total > 10">

                <ap-pagination
                    :page="page"/>
            </div>

            <div class="ap-margin-top"
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

        <cancel-status-modal v-if="hasSmsTransaction" />

        <main-offcanvas />

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { Toast } from '@/utils';

import HeaderComponent from './content/header';
import ItemComponent from './content/item';
import PlaceholderComponent from './content/placeholder';

import CancelStatusModal from './components/modals/cancel-status';

import MainOffcanvas from './components/offcanvas/main';

export default
{
    name: 'CompanySmsTransactions',

    components:
    {
        HeaderComponent,
        ItemComponent,
        PlaceholderComponent,

        CancelStatusModal,

        MainOffcanvas,
    },

    data()
    {
        return {
            cancelStatusModal: false,

            mainOffcanvas: false,
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
            items: 'myCompanySmsTransaction/items',
            isLoading: 'myCompanySmsTransaction/isLoading',
            page: 'myCompanySmsTransaction/page',
            smsTransaction: 'myCompanySmsTransaction/selected',
        }),

        emptyLabel()
        {
            return Object.keys(this.$route.query).length > 0
                ? 'no search result'
                : 'no record yet';
        },

        hasSmsTransaction()
        {
            return Object.keys(this.smsTransaction).length > 0;
        },

        fullPath()
        {
            return this.$route.fullPath.replace(
                '/company/sms-transactions',
                '/my-company/sms-transactions'
            );
        },
    },

    methods:
    {
        ...mapActions({
            load: 'myCompanySmsTransaction/load',
            loadMore: 'myCompanySmsTransaction/loadMore',
            unset: 'myCompanySmsTransaction/unsetItems',
        }),

        async onLoad()
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
            this.onLoad();
        },
    },
};
</script>
