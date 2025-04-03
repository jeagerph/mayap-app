<template>
    <ap-modal
        :isOpen.sync="$parent.$data.showSummaryModal"
        :isCenter="true"
        :size="'container'">

        <ap-modal-body>
            <ap-modal-title>
                Summary of Encoding
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">

                <h3 class="ap-text-bold ap-text-center">
                    {{ account.full_name }}
                </h3>

                <ap-grid :gutter="'small'"
                    class="ap-margin-medium-top">
                    <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                        <div class="card radius-10 bg-gradient"
                        :class="apCardBackground">
                            <div class="card-body">
                                <ap-grid>
                                    <div class="ap-width-expand">
                                        <small class="ap-text-inverse">
                                            {{ appBeneficiaryName.toUpperCase() }} 
                                        </small>
                                        <h4 class="ap-margin-remove ap-text-inverse"
                                            v-if="!summaryLoading">
                                            {{summary.beneficiaries.total}}
                                        </h4>
                                        <div class="ap-margin-small-top"
                                            v-else>
                                            <ap-loader
                                                :size="'small'"
                                                :color="'primary'" />
                                        </div>
                                        
                                    </div>
                                    <div class="ap-text-right">
                                        <div class="ap-text-inverse ms-auto font-35">
                                            <i class="bx bx-user-circle"></i>
                                        </div>
                                    </div>
                                </ap-grid>

                                <hr class="ap-text-inverse">

                                <ap-grid >
                                    <div class="ap-width-expand">
                                        <small class="ap-text-inverse">
                                            TODAY
                                        </small>
                                    </div>
                                    <div class="ap-text-right">
                                        <h5 class="ap-text-inverse"
                                            v-if="!summaryLoading">
                                            {{summary.beneficiaries.date}}
                                        </h5>
                                        <ap-loader
                                            v-else
                                            :size="'small'"
                                            :color="'primary'" />
                                        
                                    </div>
                                </ap-grid>

                                <ap-grid class="ap-margin-remove-top">
                                    <div class="ap-width-expand">
                                        <small class="ap-text-inverse">
                                            THIS MONTH
                                        </small>
                                    </div>
                                    <div class="ap-text-right">
                                        <h5 class="ap-text-inverse"
                                            v-if="!summaryLoading">
                                            {{summary.beneficiaries.month}}
                                        </h5>
                                        <ap-loader
                                            v-else
                                            :size="'small'"
                                            :color="'primary'" />
                                        
                                    </div>
                                </ap-grid>

                                <ap-grid class="ap-margin-remove-top">
                                    <div class="ap-width-expand">
                                        <small class="ap-text-inverse">
                                            THIS YEAR
                                        </small>
                                    </div>
                                    <div class="ap-text-right">
                                        <h5 class="ap-text-inverse ap-margin-remove"
                                            v-if="!summaryLoading">
                                            {{summary.beneficiaries.year}}
                                        </h5>
                                        <ap-loader
                                            v-else
                                            :size="'small'"
                                            :color="'primary'" />
                                        
                                    </div>
                                </ap-grid>
                            </div>
                        </div>
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                        <div class="card radius-10 bg-gradient"
                            :class="apCardBackground">
                                <div class="card-body">
                                    <ap-grid>
                                        <div class="ap-width-expand">
                                            <small class="ap-text-inverse">
                                                ASSISTANCES
                                            </small>
                                            <h4 class="ap-margin-remove ap-text-inverse"
                                                v-if="!summaryLoading">
                                                {{summary.assistances.total}}
                                            </h4>
                                            <div class="ap-margin-small-top"
                                                v-else>
                                                <ap-loader
                                                    :size="'small'"
                                                    :color="'primary'" />
                                            </div>
                                            
                                        </div>
                                        <div class="ap-text-right">
                                            <div class="ap-text-inverse ms-auto font-35">
                                                <i class="bx bx-user-check"></i>
                                            </div>
                                        </div>
                                    </ap-grid>

                                    <hr class="ap-text-inverse">

                                    <ap-grid>
                                        <div class="ap-width-expand">
                                            <small class="ap-text-inverse">
                                                TODAY
                                            </small>
                                        </div>
                                        <div class="ap-text-right">
                                            <h5 class="ap-text-inverse"
                                                v-if="!summaryLoading">
                                                {{summary.assistances.date}}
                                            </h5>
                                            <ap-loader
                                                v-else
                                                :size="'small'"
                                                :color="'primary'" />
                                            
                                        </div>
                                    </ap-grid>

                                    <ap-grid class="ap-margin-remove-top">
                                        <div class="ap-width-expand">
                                            <small class="ap-text-inverse">
                                                THIS MONTH
                                            </small>
                                        </div>
                                        <div class="ap-text-right">
                                            <h5 class="ap-text-inverse"
                                                v-if="!summaryLoading">
                                                {{summary.assistances.month}}
                                            </h5>
                                            <ap-loader
                                                v-else
                                                :size="'small'"
                                                :color="'primary'" />
                                            
                                        </div>
                                    </ap-grid>

                                    <ap-grid class="ap-margin-remove-top">
                                        <div class="ap-width-expand">
                                            <small class="ap-text-inverse">
                                                THIS YEAR
                                            </small>
                                        </div>
                                        <div class="ap-text-right">
                                            <h5 class="ap-text-inverse ap-margin-remove"
                                                v-if="!summaryLoading">
                                                {{summary.assistances.year}}
                                            </h5>
                                            <ap-loader
                                                v-else
                                                :size="'small'"
                                                :color="'primary'" />
                                            
                                        </div>
                                    </ap-grid>
                                </div>
                            </div>
                        
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                        <div class="card radius-10 bg-gradient"
                            :class="apCardBackground">
                                <div class="card-body">
                                    <ap-grid>
                                        <div class="ap-width-expand">
                                            <small class="ap-text-inverse">
                                                PATIENTS
                                            </small>
                                            <h4 class="ap-margin-remove ap-text-inverse"
                                                v-if="!summaryLoading">
                                                {{summary.patients.total}}
                                            </h4>
                                            <div class="ap-margin-small-top"
                                                v-else>
                                                <ap-loader
                                                    :size="'small'"
                                                    :color="'primary'" />
                                            </div>
                                            
                                        </div>
                                        <div class="ap-text-right">
                                            <div class="ap-text-inverse ms-auto font-35">
                                                <i class="bx bx-user-pin"></i>
                                            </div>
                                        </div>
                                    </ap-grid>

                                    <hr class="ap-text-inverse">

                                    <ap-grid>
                                        <div class="ap-width-expand">
                                            <small class="ap-text-inverse">
                                                TODAY
                                            </small>
                                        </div>
                                        <div class="ap-text-right">
                                            <h5 class="ap-text-inverse"
                                                v-if="!summaryLoading">
                                                {{summary.patients.date}}
                                            </h5>
                                            <ap-loader
                                                v-else
                                                :size="'small'"
                                                :color="'primary'" />
                                            
                                        </div>
                                    </ap-grid>

                                    <ap-grid class="ap-margin-remove-top">
                                        <div class="ap-width-expand">
                                            <small class="ap-text-inverse">
                                                THIS MONTH
                                            </small>
                                        </div>
                                        <div class="ap-text-right">
                                            <h5 class="ap-text-inverse"
                                                v-if="!summaryLoading">
                                                {{summary.patients.month}}
                                            </h5>
                                            <ap-loader
                                                v-else
                                                :size="'small'"
                                                :color="'primary'" />
                                            
                                        </div>
                                    </ap-grid>

                                    <ap-grid class="ap-margin-remove-top">
                                        <div class="ap-width-expand">
                                            <small class="ap-text-inverse">
                                                THIS YEAR
                                            </small>
                                        </div>
                                        <div class="ap-text-right">
                                            <h5 class="ap-text-inverse ap-margin-remove"
                                                v-if="!summaryLoading">
                                                {{summary.patients.year}}
                                            </h5>
                                            <ap-loader
                                                v-else
                                                :size="'small'"
                                                :color="'primary'" />
                                            
                                        </div>
                                    </ap-grid>
                                </div>
                            </div>
                        
                    </div>
                </ap-grid>

                <ap-grid :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                        <ap-button
                            type="button"
                            :color="'success'"
                            :rounded="true"
                            @click="openModal()">
                            Download
                        </ap-button>
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right@m">
                        <ap-button
                            type="button"
                            @click="closeModal()">
                            Close
                        </ap-button>
                    </div>
                </ap-grid>

                
            </div>
        </ap-modal-body>
    </ap-modal>
</template>

<script>
import { mapGetters } from 'vuex';

import Http from '@/services';

export default
{
    data()
    {
        return {
            summaryLoading: false,
            summary:
            {
                beneficiaries:
                {
                    total: 0,
                    month: 0,
                    year: 0,
                },
                assistances:
                {
                    total: 0,
                    month: 0,
                    year: 0,
                },
                patients:
                {
                    total: 0,
                    month: 0,
                    year: 0,
                },
            },
        };
    },

    created()
    {
        this.loadSummary();
    },

    computed:
    {
        ...mapGetters({
            companyAccount: 'myCompanyAccount/selected',
            isLoading: 'myCompanyAccount/isLoading',
            accessUser: 'auth/accessUser',
        }),

        company()
        {
            return this.accessUser.company;
        },

        account()
        {
            return this.companyAccount.account;
        },

        apCardBackground()
        {
            if (this.company.province_id == '0314') return 'ap-card-orange';

            return 'bg-primary';
        },

        apButtonBackground()
        {
            if (this.company.province_id == '0314') return 'customPink';

            return 'primary';
        },

        appBeneficiaryName()
        {
            return process.env.APP_BENEFICIARY_PLURAL_NAME;
        },

        showSummaryModal()
        {
            return this.$parent.$data.showSummaryModal;
        },
    },

    methods:
    {
        async loadSummary()
        {
            this.summaryLoading = true;

            const response = await Http.get(`/my-company/account/${this.companyAccount.slug.code}/summary/total`);

            this.summaryLoading = false;

            if (response.status == 200)
            {
                this.summary = response.data;
            }
        },

        closeModal()
        {
            this.$parent.toggleModal('showSummary', false);
        },

        openModal()
        {
            this.closeModal();

            this.$parent.toggleModal('downloadSummary', true);
        }
    },

    watch:
    {
        showSummaryModal(val)
        {
            if (val) this.loadSummary();
        }
    }
};
</script>
