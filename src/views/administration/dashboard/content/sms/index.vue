<template>
    <div class="card card-body radius-10 ap-animate ap-animate-fade-in">

        <ap-grid>
            <div class="ap-width-expand">
                <h5 class="ap-text-bold">
                    PENDING SMS
                </h5>

                <div class="ap-margin-small-top"
                    v-if="!isLoading('index')">

                    <ap-pagination-showing
                        :page="page"/>
                </div>
            </div>
            <div class="ap-text-right">
                <div class="widgets-icons text-primary ms-auto">
                    <i class="bx bx-message-detail"></i>
                </div>
            </div>
        </ap-grid>
        
        <hr>

        <div class="ap-card-scroll"
            style="max-height: 10vh;"
            v-if="!isLoading('index')">

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

            <div class="ap-margin-top ap-text-center"
                v-if="nextPage && !isLoading('index')">

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
import { mapActions, mapGetters } from 'vuex';

import HeaderComponent from './content/header';
import ItemComponent from './content/item';
import PlaceholderComponent from './content/placeholder';

export default
{
    name: 'ListComponent',

    components:
    {
        HeaderComponent,
        ItemComponent,
        PlaceholderComponent,
    },

    created()
    {
        this.onLoad();
    },

    computed:
    {
        ...mapGetters({
            items: 'adminDashboardSms/items',
            isLoading: 'adminDashboardSms/isLoading',
            page: 'adminDashboardSms/page',
            barangay: 'adminDashboardSms/selected',
        }),

        emptyLabel()
        {
            return Object.keys(this.$route.query).length > 0
                ? 'no search result'
                : 'no records yet';
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
            load: 'adminDashboardSms/load',
            loadMore: 'adminDashboardSms/loadMore',
        }),

        async onLoad()
        {
            await this.load(`/administration/dashboard/sms/pending`);
        },

        async onLoadMore()
        {
            await this.loadMore(this.nextPage);
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
};
</script>
