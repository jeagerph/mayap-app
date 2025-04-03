<template>
    <div class="ap-animate ap-animate-fade-in">
        <!-- <h4 class="ap-text-bold ap-margin-remove-bottom">
            Activities
        </h4> -->

        <div class="ap-margin-top">
            <div v-if="!isLoading('index')">

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
            </div>

            <placeholder-component
                v-else
                v-for="index in 5"
                :key="index" />


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
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import ItemComponent from './components/item';
import PlaceholderComponent from './components/placeholder';

export default
{
    name: 'ActivitiesComponent',

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

    destroyed()
    {
        this.unset();
    },
    
    computed:
    {
        ...mapGetters({
            items: 'adminIDTemplateActivity/items',
            isLoading: 'adminIDTemplateActivity/isLoading',
            page: 'adminIDTemplateActivity/page',
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
            load: 'adminIDTemplateActivity/load',
            loadMore: 'adminIDTemplateActivity/loadMore',
            unset: 'adminIDTemplateActivity/unsetItems',
        }),

        async onLoad()
        {
            const response = await this.load(`/administration/id-template/${this.$route.params.code}/activities`);
        },

        async onLoadMore()
        {
            const response = await this.loadMore(this.nextPage);
        },
    },
};
</script>
