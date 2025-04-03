<template>
    <div class="ap-animate ap-animate-fade-in">
        
        <ap-grid :gutter="'small'">

            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">

                <div class="card card-body">
                    <ap-grid :gutter="'small'">
                        <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                            <ap-button
                                :size="'small'"
                                :rounded="true"
                                :color="activeService == 'sms' ? apButtonBackground:'default'"
                                :outline="activeService != 'sms'"
                                :fullWidth="true"
                                @click="activeService = 'sms'">
                                SMS
                            </ap-button>
                        </div>
                        <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                            <ap-button
                                :size="'small'"
                                :rounded="true"
                                :color="activeService == 'call' ? apButtonBackground:'default'"
                                :outline="activeService != 'call'"
                                :fullWidth="true"
                                @click="activeService = 'call'">
                                CALL
                            </ap-button>
                        </div>
                    </ap-grid>

                    <sms-component v-if="activeService == 'sms'" />

                    <call-component v-if="activeService == 'call'" />
                </div>
            </div>
            <div class="ap-width-1-1@s ap-width-2-3@m ap-width-2-3@l">

                <summary-component />

                <monthly-progress-component />

                <assistances-type-monthly-progress-component />

                <top-networks-component />

                <ap-grid :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">

                        <beneficiaries-per-month-component />
                        
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">

                        <assistances-per-month-component />

                    </div>
                </ap-grid>

                <ap-grid :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">

                        <patients-per-month-component />
                        
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">

                        <networks-per-month-component />

                    </div>
                </ap-grid>

            </div>
        </ap-grid>

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import SmsComponent from './content/sms';
import CallComponent from './content/call';

import SummaryComponent from './content/summary';
import MonthlyProgressComponent from './content/monthly-progress';
import AssistancesTypeMonthlyProgressComponent from './content/assistances-type-monthly-progress';
import TopNetworksComponent from './content/top-networks';
import BeneficiariesPerMonthComponent from './content/beneficiaries-per-month';
import AssistancesPerMonthComponent from './content/assistances-per-month';
import PatientsPerMonthComponent from './content/patients-per-month';
import NetworksPerMonthComponent from './content/networks-per-month';
import AssistedTotalComponent from './content/assisted-total';

export default
{
    name: 'CompanyDashboard',

    components:
    {
        SmsComponent,
        CallComponent,

        SummaryComponent,
        MonthlyProgressComponent,
        AssistancesTypeMonthlyProgressComponent,
        TopNetworksComponent,

        BeneficiariesPerMonthComponent,
        AssistancesPerMonthComponent,
        PatientsPerMonthComponent,
        NetworksPerMonthComponent,
        AssistedTotalComponent,
    },

    data()
    {
        return {
            activeService: 'sms',

            updateModal: false,
            updateLogoModal: false,
            updateSubLogoModal: false,
        }
    },

    created()
    {
        this.load();
    },

    computed:
    {
        ...mapGetters({
            profile: 'myCompany/profile',
            isLoading: 'myCompany/isLoading',
            accessUser: 'auth/accessUser',
        }),

        company()
        {
            return this.accessUser.company;
        },

        hasProfile()
        {
            return Object.keys(this.profile).length > 0;
        },

        apButtonBackground()
        {
            if (this.company.province_id == '0314') return 'customPink';

            return 'primary';
        }
        
    },
    
    methods:
    {
        ...mapActions({
            loadObject: 'myCompany/loadObject',
        }),

        async load()
        {
            await this.loadObject({
                url: `/my-company/profile`,
                action: 'profile'
            });
        },

        toggleModal(name, bool)
        {
            this[`${name}Modal`] = bool;
        },
    },
};
</script>
