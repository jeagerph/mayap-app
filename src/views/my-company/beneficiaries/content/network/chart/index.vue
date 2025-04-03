<template>
    <div class="ap-animate ap-animate-fade-in ap-padding-small" style="overflow: auto;"
     id="overflow-container">

        <div class="network-container"
            v-if="!beneficiaryLoading('show') && !isLoading('networks')">
    
            <div class="level-1 network-rectangle ap-margin-medium-top">
                
                <div style="display: flex; justify-content: center;">
                    <ap-grid :gutter="'small'">
                        <div class="ap-width-fit-content">
                            <ap-avatar
                                :color="'primary'"
                                :shape="'circle'"
                                :label="'AA'"
                                :size="'medium'"
                                :src="beneficiary.photo"
                                />
                        </div>
                        <div class="ap-width-expand ap-margin-left">
                            <h5 class="ap-text-bold ap-text-inverse">
                                {{beneficiary.full_name}}
                            </h5>

                            <p class="ap-margin-remove ap-text-inverse">
                                {{beneficiary.gender.name}}
                                &middot;
                                {{age}} yrs old
                            </p>
                        </div>
                    </ap-grid>
                </div>
                
            </div>
    
            <ol class="list-wrapper level-2-wrapper"
                v-if="!isLoading('networks')">
                
                <second-level-component
                    v-for="(item, index) in networks"
                    :key="index"
                    :item="item"
                />
                
                <li @click="toggleModal('create', true)">
                    <div class="level-2 network-rectangle">
                        <div style="width: 160px; height: 154px; padding: 10px 10px; border: 1px dotted black; display: flex; justify-content: center; align-items: center;"
                            class="ap-point">
                            <i class="bx bx-plus ap-text-primary" style="font-size: 30px;"></i>
                        </div>
                    </div>
                    
                </li>
            </ol>
        </div>
        
        <div class="ap-margin-medium-top ap-text-center"
            v-else>

            <ap-loader
                :size="'xlarge'" />

            <h4 class="ap-margin-medium-top">
                LOADING NETWORK ...
            </h4>
        </div>
        

        <create-modal v-if="hasBeneficiary" />

        <delete-modal v-if="hasBeneficiary && hasNetwork" />
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

import { Dater } from '@/utils';

import SecondLevelComponent from './content/second-level';

import CreateModal from './components/modals/create';
import DeleteModal from './components/modals/delete';

export default
{
    name: 'CompanyBeneficiaryNetwork',

    components:
    {
        SecondLevelComponent,

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
                url: `/my-company/beneficiary/${this.$route.params.code}/network/chart`,
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