<template>
    <li>
        <div class="ap-card ap-card-body ap-padding-small ap-card-hover">

            <ap-grid :gutter="'small'">
                <div class="ap-width-expand@m">
                    <ap-grid :gutter="'small'">
                        <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                            <router-link
                                class="ap-link-reset ap-point"
                                :to="`/company/sms-transactions/${slugCode}`">
                                <h5 class="ap-margin-remove">
                                    {{item.code}}
                                </h5>
                            </router-link>

                            <div>
                                <p class="ap-margin-xsmall-top ap-margin-remove-bottom">
                                    {{item.transaction_type.name}}
                                    &middot;
                                    {{transactionDate.toUpperCase()}}
                                </p>

                                <div class="ap-margin-small-top badge"
                                    :class="statusClass">
                                    {{item.status.name}}
                                </div>
                                
                            </div>

                        </div>
                        <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                            <small class="ap-text-bold">
                                <span v-if="item.status.id == 2">
                                    CREDIT AMOUNT
                                </span>
                                <span v-else>
                                    POSSIBLE AMOUNT
                                </span>
                            </small>

                            <h5 class="ap-margin-xsmall-top">
                                <span v-if="item.status.id == 2">
                                    {{creditAmount}}
                                </span>
                                <span v-else>
                                    {{possibleAmount}}
                                </span>
                            </h5>

                            <small>
                                SMS: <span class="ap-text-bold">{{item.success_recipients_count}}</span> out of <span class="ap-text-bold">{{item.recipients_count}}</span> sent
                            </small>
                        </div>
                        <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                            <small class="ap-text-bold">
                                CREDIT / SENT SMS
                            </small>

                            <h5 class="ap-margin-xsmall-top">
                                {{creditPerSent}}
                            </h5>
                        </div>
                    </ap-grid>
                </div>
                <div class="ap-text-right@m">
                    <div>
                        <small class="ap-text-italic">
                            Initiated by {{createdBy}}
                        </small>
                    </div>
                    <div>
                        <small class="ap-text-italic">
                            <ap-moment :datetime="item.created_at" />
                        </small>
                    </div>
                </div>
            </ap-grid>

            <div class="ap-margin-small-top">
                <small>
                    <span class="ap-text-bold ap-text-italic">Message:</span> {{ item.message }}
                </small>
            </div>

        </div>
    </li>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { Dater, Text } from '@/utils';

export default
{
    props:
    {
        item: Object,
    },

    computed:
    {
        statusClass()
        {
            return {
                'bg-secondary': this.item.status.id == 1,
                'bg-success': this.item.status.id == 2,
                'bg-warning': this.item.status.id == 3,
            }
        },

        creditAmount()
        {
            return Text.currency(this.item.amount);
        },

        possibleAmount()
        {
            return Text.currency(this.item.possible_amount);
        },

        transactionDate()
        {
            return Dater.format(this.item.transaction_date);
        },

        creditPerSent()
        {
            return Text.currency(this.item.credit_per_sent);
        },

        createdBy()
        {
            return `${this.item.created_by.full_name}`
        },

        slugCode()
        {
            return this.item.slug
                ? this.item.slug.code
                : 'DELETED'
        },
    },

    methods:
    {
        ...mapActions({
            select: 'myCompanySmsTransaction/select',
        }),

        openModal(name)
        {
            this.select(this.item);

            this.$parent.toggleModal(name, true);
        },
    },
};
</script>

<style scoped>
    .ap-card-scroll-custom {
        height: 200px;
        overflow: hidden;
    }
    .ap-card-scroll-custom:hover {
        overflow-y: scroll;
    }
</style>