<template>
    <div class="card card-body ap-padding">

        <div class="ap-text-center">
            <div class="ap-avatar ap-avatar-xlarge">
                <div class="ap-avatar-content">
                    <div>
                        <span class="ap-avatar-label">
                            <i class="bx bx-message-detail"></i>
                        </span>
                    </div>
                </div>
            </div>

            <h4 class="ap-margin-small-top"
                v-if="!isLoading('show')">
                {{ smsTransaction.code }}
            </h4>
            <ap-placeholder
                :size="'medium'"
                v-else />

            <p v-if="!isLoading('show')">
                {{ smsTransaction.transaction_type.name }}
                &middot;
                {{ transactionDate }}
            </p>

            <div class="ap-margin-top">
                <small v-if="!isLoading('show')">
                    <span v-if="smsTransaction.status.id == 2">
                        CREDIT AMOUNT
                    </span>
                    <span v-else>
                        POSSIBLE AMOUNT
                    </span>
                </small>

                <div>
                    <h4 class="ap-text-bold"
                        v-if="!isLoading('show')">
                        <span v-if="smsTransaction.status.id == 2">
                            {{creditAmount}}
                        </span>
                        <span v-else>
                            {{possibleAmount}}
                        </span>
                    </h4>
                    <ap-placeholder
                        v-else
                        :width="'120px'" />
                </div>

                <p v-if="!isLoading('show')">
                    SMS: <span class="ap-text-bold">{{smsTransaction.success_recipients_count}}</span> out of <span class="ap-text-bold">{{smsTransaction.recipients_count}}</span> sent
                </p>
                
            </div>

            <div class="ap-margin-top">
                <small>
                    CREDIT / SENT SMS
                </small>

                <div>
                    <p class="ap-text-bold"
                        v-if="!isLoading('show')">
                        {{creditPerSent}}
                    </p>
                    <ap-placeholder
                        v-else
                        :width="'120px'" />
                </div>
                
            </div>

            <div class="ap-margin-top">
                <small>
                    STATUS
                </small>

                <div>
                    <div class="ap-margin-xsmall-top"
                        v-if="!isLoading('show')">
                        <div class="badge"
                            :class="statusClass">
                            {{smsTransaction.status.name}}
                        </div>
                    </div>
                    <ap-placeholder
                        v-else
                        :width="'120px'" />
                </div>
            </div>
        </div>

        <div class="ap-margin-top ap-text-right"
            v-if="!isLoading('show')">
            <div class="ap-margin-top">
                <small class="ap-text-italic">
                    Initiated by {{createdBy}}
                </small>
            </div>
            <div class="ap-margin-xsmall-top">
                <small class="ap-text-italic"
                    :data-tooltip="smsTransaction.created_at">
                    <ap-moment :datetime="smsTransaction.created_at" />
                </small>
            </div>
        </div>

        <hr>

        <div class="ap-margin-top ap-text-center"
            v-if="!isLoading('show')">

            <div class="ap-margin-top">

                <ap-button
                    v-show="[1].includes(smsTransaction.status.id)"
                    class="ap-margin-xsmall-right"
                    :color="'warning'"
                    :size="'small'"
                    :outline="true"
                    :rounded="true"
                    @click="openModal('cancelStatus')">
                    CANCEL
                </ap-button>

                <ap-button
                    v-show="[1,3].includes(smsTransaction.status.id)"
                    class="ap-margin-xsmall-right"
                    :color="'danger'"
                    :size="'small'"
                    :outline="true"
                    :rounded="true"
                    @click="openModal('delete')">
                    DELETE
                </ap-button>
            </div>
        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { Text, Dater } from '@/utils';

export default
{
    computed:
    {
        ...mapGetters({
            smsTransaction: 'myCompanySmsTransaction/selected',
            isLoading: 'myCompanySmsTransaction/isLoading',
        }),

        statusClass()
        {
            return {
                'bg-secondary': this.smsTransaction.status.id == 1,
                'bg-success': this.smsTransaction.status.id == 2,
                'bg-warning': this.smsTransaction.status.id == 3,
            }
        },

        creditAmount()
        {
            return Text.currency(this.smsTransaction.amount);
        },

        possibleAmount()
        {
            return Text.currency(this.smsTransaction.possible_amount);
        },

        transactionDate()
        {
            return Dater.format(this.smsTransaction.transaction_date);
        },

        creditPerSent()
        {
            return Text.currency(this.smsTransaction.credit_per_sent);
        },

        createdBy()
        {
            return `${this.smsTransaction.created_by.full_name}`
        },
    },

    methods:
    {
        openModal(name)
        {
            this.$parent.toggleModal(name, true);
        },
    },
}
</script>
