<template>
    <div class="card radius-10 ap-animate ap-animate-fade-in">
        <div class="card-body">
            <ap-grid :gutter="'small'"
                class="ap-margin-small-top">
                <div class="ap-width-expand">
                    <h5 class="ap-margin-remove ap-text-primary">
                        SMS CREDIT BALANCE
                    </h5>
                </div>
                <div class="ap-text-right">
                    <h4 class="ap-margin-remove ap-text-primary"
                        v-if="!summaryLoading">
                        {{ smsCredit }}
                    </h4>
                    <ap-loader
                        v-else
                        :size="'small'"
                        />
                </div>
            </ap-grid>

            <hr>

            <ap-grid :gutter="'small'">
                <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                    <small>
                        LAST CREDIT LOAD:
                    </small>
                </div>

                <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l ap-text-right">
                    <div v-if="!summaryLoading">
                        <div v-if="summary.last_replenish_sms_credit_record">
                            <p class="ap-text-bold ap-margin-remove">
                                {{ lastReplenishAmount }}
                            </p>
                            <p class="ap-text-bold ap-margin-remove">
                                {{ lastReplenishDate }}
                            </p>
                        </div>
                        
                        <p class="ap-margin-remove ap-text-italic"
                            v-else>
                            No record yet
                        </p>
                    </div>
                    <ap-loader
                        v-else
                        :size="'small'"
                        />
                </div>
            </ap-grid>

            <ap-grid :gutter="'small'">
                <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                    <small>
                        LAST TRANSACTION:
                    </small>
                </div>

                <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l ap-text-right">
                    <div v-if="!summaryLoading">
                        <div v-if="summary.last_sms_transaction_record">
                            <p class="ap-text-bold ap-margin-remove">
                                {{ lastTransactionAmount }}
                            </p>
                            <p class="ap-text-bold ap-margin-remove">
                                {{lastTransactionDate}}
                            </p>
                        </div>
                        
                        <p class="ap-margin-remove ap-text-italic"
                            v-else>
                            No record yet
                        </p>
                    </div>
                    <ap-loader
                        v-else
                        :size="'small'"
                        />
                </div>
            </ap-grid>

            <div class="ap-margin-top ap-text-center"
                v-if="!summaryLoading">
                <ap-button
                    class=""
                    :color="'primary'"
                    :size="'small'"
                    :outline="true"
                    :rounded="true"
                    @click="toggleModal('replenish', true)">
                    REPLENISH LOAD
                </ap-button>

                <ap-button
                    class=""
                    :color="'warning'"
                    :size="'small'"
                    :outline="true"
                    :rounded="true"
                    @click="toggleModal('withdraw',true)">
                    WITHDRAW LOAD
                </ap-button>
            </div>
        </div>

        <replenish-modal />

        <withdraw-modal />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Http from '@/services';

import { Text, Dater } from '@/utils';

import ReplenishModal from './components/modals/replenish';
import WithdrawModal from './components/modals/withdraw';

export default
{
    components:
    {
        ReplenishModal,
        WithdrawModal,
    },

    data()
    {
        return {
            summaryLoading: false,

            summary:
            {
                sms_credit: 0,
                last_replenish_sms_credit_record: {},
                last_sms_transaction_record: {}
            },

            replenishModal: false,
            withdrawModal: false,
        };
    },

    created()
    {
        this.loadSummary();
    },

    computed:
    {
        ...mapGetters({
            company: 'adminCompany/selected',
            isLoading: 'adminCompany/isLoading',
        }),

        smsCredit()
        {
            return Text.currency(this.summary.sms_credit);
        },

        lastReplenishDate()
        {
            return Dater.format(this.summary.last_replenish_sms_credit_record.credit_date);
        },

        lastReplenishAmount()
        {
            return Text.currency(this.summary.last_replenish_sms_credit_record.amount);
        },

        lastTransactionDate()
        {
            return Dater.format(this.summary.last_sms_transaction_record.transaction_date);
        },

        lastTransactionAmount()
        {
            return Text.currency(this.summary.last_sms_transaction_record.amount);
        }
    },

    methods:
    {
        async loadSummary()
        {
            this.summaryLoading = true;

            const response = await Http.get(`/administration/company/${this.$route.params.code}/summary/sms/credits`);

            this.summaryLoading = false;

            if (response.status == 200)
            {
                this.summary = response.data;
            }
        },

        toggleModal(name, bool)
        {
            this[`${name}Modal`] = bool;
        },
    },
};
</script>