<template>
    <li>
        <div class="ap-card ap-card-body ap-padding-small ap-card-hover">

            <ap-grid :gutter="'small'">
                <div class="ap-width-expand@m">
                    <router-link
                        class="ap-link-reset"
                        :to="`/administration/sms-transactions/${item.slug.code}`">
                        <p class="ap-margin-remove ap-text-bold">
                            {{item.code}}
                        </p>
                    </router-link>

                    <p class="ap-margin-small-top">
                        <span class="badge bg-primary">
                            {{item.transaction_type.name}}
                        </span>
                        &middot;
                        {{transactionDate}}
                    </p>
                </div>
                <div class="ap-text-right@m">
                    <div>
                        <span class="badge bg-secondary"
                            style="font-size: 10px;">
                            {{item.barangay.city.name}}, {{item.barangay.province.name}}
                        </span>
                    </div>
                    <div class="ap-margin-small-top">
                        <div class="badge bg-primary"
                            style="font-size: 11px;">
                            {{item.barangay.barangay.name}}
                        </div>
                    </div>
                    
                </div>
            </ap-grid>

            <ap-grid :gutter="'small'"
                class="ap-margin-remove-top">
                <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                    <small>
                        RECIPIENTS:
                    </small>
                </div>
                <div class="ap-width-1-1@s ap-width-2-3@m ap-width-2-3@l ap-text-right@m">
                    <p class="ap-margin-remove ap-text-bold">
                        {{item.recipients_count}} SMS
                    </p>
                </div>
            </ap-grid>

            <ap-grid :gutter="'small'"
                class="ap-margin-remove-top">
                <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                    <small>
                        POSSIBLE AMOUNT:
                    </small>
                </div>
                <div class="ap-width-1-1@s ap-width-2-3@m ap-width-2-3@l ap-text-right@m">
                    <p class="ap-margin-remove ap-text-bold">
                        {{possibleAmount}}
                    </p>
                </div>
            </ap-grid>

            <ap-grid :gutter="'small'"
                class="ap-margin-remove-top">
                <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                    <small>
                        SMS CREDIT BALANCE
                    </small>
                </div>
                <div class="ap-width-1-1@s ap-width-2-3@m ap-width-2-3@l ap-text-right@m">
                    <p class="ap-margin-remove ap-text-bold">
                        {{creditBalance}}
                    </p>
                </div>
            </ap-grid>
            
            <div class="ap-margin-top ap-text-right">
                <small class="ap-text-italic">
                    Initiated by {{createdBy}}
                </small>
                <div>
                    <small class="ap-text-italic">
                        <ap-moment :datetime="item.created_at" />
                    </small>
                </div>
            </div>
                
        </div>
    </li>
</template>

<script>
import { mapActions } from 'vuex';

import { Dater, Text } from '@/utils';

import Http from '@/services';

export default
{
    props:
    {
        item: Object,
    },

    computed:
    {
        transactionDate()
        {
            return Dater.format(this.item.transaction_date);
        },

        possibleAmount()
        {
            return Text.currency(this.item.possible_amount);
        },

        creditBalance()
        {
            return Text.currency(this.item.credit_balance);
        },

        createdBy()
        {
            return this.item.created_by.full_name
        },

        statusClass()
        {
            return {
                'bg-secondary': this.item.status.id == 1,
                'bg-success': this.item.status.id == 2,
                'bg-warning': this.item.status.id == 3,
            }
        },
    },

    methods:
    {
        ...mapActions({
            select: 'adminDashboardSms/select',
        }),

        openModal(name)
        {
            this.select(this.item);

            this.$parent.toggleModal(name, true);
        },
    },
};
</script>
