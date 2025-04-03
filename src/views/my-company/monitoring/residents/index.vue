<template>
    <div class="ap-animate ap-animate-fade-in">
        
        <action-component />

        <div class="card card-body ap-padding ap-card-content">

            <div class="ap-margin-top">

                <div class="ap-text-center ap-margin-top"
                    v-if="!isLoading('index') && items.length && page.total > 10">

                    <ap-pagination
                        :page="page"/>
                </div>

                <div v-if="!isLoading('index')">
                    <ul class="ap-list ap-list-divider"
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

        <send-branding-message-modal v-if="hasResident" />

        <send-regular-message-modal v-if="hasResident" />

        <call-modal v-if="hasResident" />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import ActionComponent from './content/action';
import ItemComponent from './content/item';
import PlaceholderComponent from './content/placeholder';

import SendBrandingMessageModal from './components/modals/send-branding-message';
import SendRegularMessageModal from './components/modals/send-regular-message';
import CallModal from './components/modals/call';

export default
{
    components:
    {
        ActionComponent,
        ItemComponent,
        PlaceholderComponent,

        SendBrandingMessageModal,
        SendRegularMessageModal,
        CallModal,
    },

    data()
    {
        return {
            sendBrandingMessageModal: false,
            sendRegularMessageModal: false,
            callModal: false,
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
            items: 'companyResident/items',
            isLoading: 'companyResident/isLoading',
            page: 'companyResident/page',
            resident: 'companyResident/selected',
        }),

        emptyLabel()
        {
            return Object.keys(this.$route.query).length > 0
                ? 'no search result'
                : 'no records yet';
        },

        hasResident()
        {
            return Object.keys(this.resident).length > 0;
        },
    },

    methods:
    {
        ...mapActions({
            load: 'companyResident/load',
            loadPrerequisite: 'companyResident/loadPrerequisite',
        }),

        async loadList()
        {
            let url = `/my-company/monitoring/barangay/residents?ctx`;
                url += `&barangayId=${this.$route.query.barangay}`;

            if (Object.hasOwn(this.$route.query, 'firstName'))
            {
                url += `&firstName=${this.$route.query.firstName}`;
            }

            if (Object.hasOwn(this.$route.query, 'middleName'))
            {
                url += `&middleName=${this.$route.query.middleName}`;
            }

            if (Object.hasOwn(this.$route.query, 'lastName'))
            {
                url += `&lastName=${this.$route.query.lastName}`;
            }

            if (Object.hasOwn(this.$route.query, 'page'))
            {
                url += `&page=${this.$route.query.page}`;
            }

            await this.load(url);
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
    }

};
</script>
