<template>
    <div class="card card-body">
        
        <ap-grid :gutter="'small'">
            <div class="ap-width-expand@m">
                <div
                    v-if="!beneficiaryLoading('show')">
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
                            <h4 class="ap-text-bold ap-text-primary">
                                {{beneficiary.full_name}}
                            </h4>

                            <p class="ap-margin-remove ap-text-bold">
                                {{beneficiary.gender.name}}
                                &middot;
                                {{age}} yrs old
                            </p>
                        </div>
                    </ap-grid>
                </div>

                <div
                    v-else>
                    <ap-placeholder 
                        :size="'medium'"/>
                    <ap-placeholder 
                        class="ap-margin-xsmall-top"
                        :size="'medium'"/>
                </div>
            </div>
            <div class="ap-text-right@m"
                v-if="!beneficiaryLoading('show')">
                <ap-button
                    :size="'small'"
                    :color="'primary'"
                    :rounded="true"
                    @click="openModal('create')">
                    ADD NEW
                </ap-button>
            </div>
        </ap-grid>
        
    </div>
</template>

<script>

import { mapGetters } from 'vuex';

import { Dater } from '@/utils';

export default
{
    computed:
    {
        ...mapGetters({
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
        openModal(name)
        {
            this.$parent.toggleModal(name, true);
        }
    }
}

</script>