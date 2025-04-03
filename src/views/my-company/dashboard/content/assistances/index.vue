<template>
    <div class="card card-body ap-padding">

        <header-component />

        <div
            v-if="!isLoading('index')"
            class="ap-card-scroll-custom"
            @scroll="onScroll">

            <ul class="ap-list ap-list-divider"
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

        <placeholder-component
            v-if="isLoading('more')" />

        <update-modal v-if="hasAssistance" />

        <delete-modal v-if="hasAssistance" />

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import HeaderComponent from './content/header';
import ItemComponent from './content/item';
import PlaceholderComponent from './content/placeholder';

import UpdateModal from './components/modals/update';
import DeleteModal from './components/modals/delete';

export default
{
    name: 'DashboardAssistance',

    components:
    {
        HeaderComponent,
        ItemComponent,
        PlaceholderComponent,

        UpdateModal,
        DeleteModal,
    },

    data()
    {
        return {
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
            items: 'companyDashboardAssistance/items',
            isLoading: 'companyDashboardAssistance/isLoading',
            page: 'companyDashboardAssistance/page',
            assistance: 'companyDashboardAssistance/selected',
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

        hasAssistance()
        {
            return Object.keys(this.assistance).length > 0;
        },
    },

    methods:
    {
        ...mapActions({
            load: 'companyDashboardAssistance/load',
            loadMore: 'companyDashboardAssistance/loadMore',
            unset: 'companyDashboardAssistance/unsetItems',
        }),

        async onLoad()
        {
            await this.load(`/my-company/dashboard/assistances/list`);
        },

        async onLoadMore()
        {
            await this.loadMore(this.nextPage);
        },

        onScroll ({ target: { scrollTop, clientHeight, scrollHeight }})
        {
            if (!this.isLoading('index') && !this.isLoading('more'))
            {
                if (scrollTop + clientHeight >= scrollHeight)
                {
                    if (this.nextPage)
                    {
                        this.loadMore(this.nextPage);
                    }
                }
            }
        },

        toggleModal(name, bool)
        {
            this[`${name}Modal`] = bool;
        },
    },
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