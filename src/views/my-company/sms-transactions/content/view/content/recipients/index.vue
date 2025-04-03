<template>
    <div class="card card-body">

        <header-component />

        <div v-if="!isLoading('index')"
            class="ap-card-scroll">

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

        <placeholder-component
            v-else
            v-for="index in 5"
            :key="index" />


        <update-modal v-if="hasSelected" />
        
        <delete-modal v-if="hasSelected" />

        <send-modal v-if="hasSelected" />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import HeaderComponent from './content/header';
import ItemComponent from './content/item';
import PlaceholderComponent from './content/placeholder';

import UpdateModal from './components/modals/update';
import DeleteModal from './components/modals/delete';
import SendModal from './components/modals/send';

export default
{
    name: 'CompanySmsTransactionRecipients',

    components:
    {
        HeaderComponent,
        ItemComponent,
        PlaceholderComponent,

        UpdateModal,
        DeleteModal,
        SendModal,
    },

    data()
    {
        return {
            updateModal: false,
            deleteModal: false,
            sendModal: false,
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
            items: 'myCompanySmsTransactionRecipient/items',
            isLoading: 'myCompanySmsTransactionRecipient/isLoading',
            page: 'myCompanySmsTransactionRecipient/page',
            selected: 'myCompanySmsTransactionRecipient/selected',
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
            load: 'myCompanySmsTransactionRecipient/load',
            loadMore: 'myCompanySmsTransactionRecipient/loadMore',
            unset: 'myCompanySmsTransactionRecipient/unsetItems',
        }),

        async onLoad(status = false)
        {
            let url = `/my-company/sms-transaction/${this.$route.params.code}/recipients`;

            if (status) url += `?filter[status]=${status}`;

            await this.load(url);
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
