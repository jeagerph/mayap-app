<template>
    <div>
        <ap-grid
            :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">

                <profile-component />

            </div>
            <div class="ap-width-1-1@s ap-width-2-3@m ap-width-2-3@l">

                <message-component />

                <recipients-component />

            </div>
        </ap-grid>

        <cancel-status-modal v-if="hasSmsTransaction" />

        <delete-modal v-if="hasSmsTransaction" />

        <update-message-modal v-if="hasSmsTransaction" />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import ProfileComponent from './content/profile';
import MessageComponent from './content/message';
import RecipientsComponent from './content/recipients';

import CancelStatusModal from './components/modals/cancel-status';
import DeleteModal from './components/modals/delete';
import UpdateMessageModal from './components/modals/update-message';

export default
{
    name: 'ViewComponent',

    components:
    {
        ProfileComponent,
        MessageComponent,
        RecipientsComponent,

        CancelStatusModal,
        DeleteModal,
        UpdateMessageModal,
    },

    data()
    {
        return {
            activeTab: 'details',

            cancelStatusModal: false,
            deleteModal: false,
            updateMessageModal: false,
        };
    },

    created()
    {
        window.scrollTo(0,0);

        this.load();
    },

    computed:
    {
        ...mapGetters({
            smsTransaction: 'myCompanySmsTransaction/selected',
            isLoading: 'myCompanySmsTransaction/isLoading',
        }),

        hasSmsTransaction()
        {
            return Object.keys(this.smsTransaction).length > 0;
        },
    },
    
    methods:
    {
        ...mapActions({
            show: 'myCompanySmsTransaction/show',
        }),

        async load()
        {
            await this.show(`/my-company/sms-transaction/${this.$route.params.code}`);
        },

        switchTab(tab)
        {
            this.activeTab = tab;
        },

        toggleModal(name, bool)
        {
            this[`${name}Modal`] = bool;
        },
    },
};
</script>
