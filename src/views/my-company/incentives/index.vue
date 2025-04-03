<template>
    <div class="ap-animate ap-animate-fade-in">

        <action-component />

        <div class="card card-body ap-padding ap-card-content">
        
            <header-component />

            <div class="ap-margin-top">
                <div class="ap-text-center ap-margin-top"
                    v-if="!isLoading('index') && items.length && page.total > 10">

                    <ap-pagination
                        :page="page"/>
                </div>

                <div v-if="!isLoading('index')">
                    <ul class="ap-list ap-list-divider ap-list-hover"
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
        </div>

        <delete-modal v-if="hasIncentive" />

        <main-offcanvas />

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import ActionComponent from './content/action';
import HeaderComponent from './content/header';
import ItemComponent from './content/item';
import PlaceholderComponent from './content/placeholder';

import DeleteModal from './components/modals/delete';

import MainOffcanvas from './components/offcanvas/main';

export default
{
    name: 'CompanyIncentives',

    components:
    {
        ActionComponent,
        HeaderComponent,
        ItemComponent,
        PlaceholderComponent,

        DeleteModal,

        MainOffcanvas,
    },

    data()
    {
        return {
            deleteModal: false,

            mainOffcanvas: false,
        };
    },

    created()
    {
        window.scrollTo(0,0);
        
        this.loadList();
    },

    computed:
    {
        ...mapGetters({
            items: 'companyIncentive/items',
            isLoading: 'companyIncentive/isLoading',
            page: 'companyIncentive/page',
            incentive: 'companyIncentive/selected',
        }),

        emptyLabel()
        {
            return Object.keys(this.$route.query).length > 0
                ? 'no search result'
                : 'no record yet';
        },

        hasIncentive()
        {
            return Object.keys(this.incentive).length > 0;
        },

        fullPath()
        {
            return this.$route.fullPath.replace(
                '/company/incentives',
                '/my-company/incentives'
            );
        },
    },

    methods:
    {
        ...mapActions({
            load: 'companyIncentive/load',
        }),

        async loadList()
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
            this.loadList()
        }
    }
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