<template>
<div class="ap-animate ap-animate-fade-in ap-margin-medium-top">
    
    <profile-component />

    <div class="card card-body ap-padding ap-margin-top">

        <div v-if="!isLoading('networks')">

            <p class="ap-text-bold ap-text-primary">
                NETWORK
            </p>

            <ul class="ap-list ap-list-divider"
                v-if="networks.length">

                <master-degree-item-component
                    v-for="(item, index) in networks"
                    :key="index"
                    :item="item" />
            </ul>

            <ap-card-empty
                v-else
                :label="'no network yet'" />
        </div>

        <placeholder-component
            :size="'medium'"
            v-else />
    </div>

    <create-modal v-if="hasBeneficiary" />

    <delete-modal v-if="hasBeneficiary && hasNetwork" />

</div>


</template>

<script>

import { mapGetters, mapActions } from 'vuex';

import { Dater } from '@/utils';

import ProfileComponent from './content/profile';
import MasterDegreeItemComponent from './content/master-degree-item';
import PlaceholderComponent from './content/placeholder';

import CreateModal from './components/modals/create';
import DeleteModal from './components/modals/delete';

export default
{
    name: 'CompanyBeneficiaryNetworkList',

    components:
    {
        ProfileComponent,
        MasterDegreeItemComponent,
        PlaceholderComponent,

        CreateModal,
        DeleteModal,
    },

    data()
    {
        return {
            createModal: false,
            deleteModal: false,
        };
    },

    created()
    {
        window.scrollTo(0,0);
        
        this.load();

        this.loadNetworks();
    },

    computed:
    {
        ...mapGetters({
            networks: 'companyBeneficiaryNetwork/networks',
            network: 'companyBeneficiaryNetwork/selected',
            isLoading: 'companyBeneficiaryNetwork/isLoading',
            beneficiary: 'companyBeneficiary/selected',
            beneficiaryLoading: 'companyBeneficiary/isLoading',
        }),

        hasBeneficiary()
        {
            return Object.keys(this.beneficiary).length > 0;
        },

        hasNetwork()
        {
            return Object.keys(this.network).length > 0;
        },

        age()
        {
            return Dater.age(this.beneficiary.date_of_birth);
        },
    },

    methods:
    {
        ...mapActions({
            show: 'companyBeneficiary/show',
            loadBeneficiaryNetworks: 'companyBeneficiaryNetwork/loadObject',
        }),

        async load()
        {
            await this.show(`/my-company/beneficiary/${this.$route.params.code}`);
        },

        async loadNetworks()
        {
            await this.loadBeneficiaryNetworks({
                url: `/my-company/beneficiary/${this.$route.params.code}/network/list`,
                action: 'networks'
            });
        },

        toggleModal(name, bool)
        {
            this[`${name}Modal`] = bool;
        },
    }
};
</script>
