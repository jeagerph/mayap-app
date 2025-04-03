<template>
    <div class="ap-animate ap-animate-fade-in">
        <h6 class="text-uppercase">
            <i class="lni lni-bolt ap-margin-small-right"></i> MY ACTIVITIES
        </h6>

        <hr>

        <div class="card card-body ap-padding">
            <div v-if="!isLoading('index')"
                class="ap-card-scroll">

                <ul class="ap-list ap-list-hover ap-list-divider ap-margin-top"
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
                    v-if="nextPage && !isLoading('index')">
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
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import ItemComponent from './components/item';
import PlaceholderComponent from './components/placeholder';

export default
{
    name: 'Activities',

    components:
    {
        ItemComponent,
        PlaceholderComponent,
    },

    created()
    {
        window.scrollTo(0,0);
        
        this.onLoad();
    },
    
    computed:
    {
        ...mapGetters({
            items: 'myAccountActivity/items',
            isLoading: 'myAccountActivity/isLoading',
            page: 'myAccountActivity/page',
        }),

        emptyLabel()
        {
            return Object.keys(this.$route.query).length > 0
                ? 'no search result'
                : 'no activities yet';
        },

        nextPage()
        {
            return this.page.nextPage
                ? this.page.nextPage.replace(
                    `${process.env.APP_API_URL}/${process.env.APP_API_VERSION}`,
                    '')
                : null;
        }
    },

    methods:
    {
        ...mapActions({
            load: 'myAccountActivity/load',
            loadMore: 'myAccountActivity/loadMore',
        }),

        async onLoad()
        {
            const response = await this.load('/my-account/activities');
        },

        async onLoadMore()
        {
            const response = await this.loadMore(this.nextPage);
        },
    },
};
</script>
