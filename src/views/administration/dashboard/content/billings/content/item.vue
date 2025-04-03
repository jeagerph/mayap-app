<template>
    <li>
        <div class="ap-card ap-card-body ap-padding-small ap-card-hover">

            <ap-grid :gutter="'small'">
                <div class="ap-width-expand">
                    <router-link
                        class="ap-link-reset ap-point"
                        :to="`/administration/invoices/${slugCode}`">
                        <h5 class="ap-margin-remove">
                            {{item.invoice_no}}
                        </h5>
                    </router-link>

                    <div>
                        <div class="badge bg-primary">
                            {{item.barangay.barangay.name}}
                        </div>
                    </div>

                    <ap-grid :gutter="'small'"
                        class="ap-margin-small-top">
                        <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                            <small>
                                BILL AMOUNT
                            </small>
                        </div>
                        <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l ap-text-right">
                            <p class="ap-text-bold ap-margin-remove-bottom">
                                {{billAmount}}
                            </p>

                            <small>
                                BALANCE: <span class="ap-text-bold">{{runningBalance}}</span>
                            </small>
                        </div>
                    </ap-grid>

                    <ap-grid :gutter="'small'"
                        class="ap-margin-xsmall-top">
                        <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                            <small>
                                INVOICE DATE
                            </small>
                        </div>
                        <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l ap-text-right">
                            <p class="ap-text-bold ap-margin-remove-bottom">
                                {{invoiceDate.toUpperCase()}}
                            </p>

                            <small :class="dueDateClass">
                                DUE DATE: <span class="ap-text-bold">{{dueDate.toUpperCase()}}</span>
                            </small>
                        </div>
                    </ap-grid>
                </div>
            </ap-grid>

            <div class="ap-margin-top">
                <p class="ap-text-bold ap-text-italic">
                    PAYMENT ATTACHMENTS:
                </p>
                <ul class="ap-list" style="padding-left: 0px;">
                    <li v-for="(attachment, index) in item.attachments"
                        :key="index">
                        <div class="ap-card ap-card-body ap-card-default ap-padding-small">
                            <ap-grid :gutter="'small'">
                                <div>
                                    <ap-avatar
                                        class="ap-margin-remove"
                                        :shape="'square'"
                                        :size="'small'"
                                        :label="attachment.name[0]"
                                        :src="attachment.path.thumbnail"/>
                                </div>
                                <div class="ap-width-expand">
                                    <p class="ap-margin-remove">
                                        {{attachment.name}}
                                    </p>
                                </div>
                            </ap-grid>
                        
                        </div>
                    </li>
                </ul>
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

    data()
    {
        return {
            showInclusions: false,
            
            inclusions: [],
            inclusionsLoading: false,
        };
    },

    computed:
    {
        billAmount()
        {
            return Text.currency(this.item.bill_amount);
        },

        runningBalance()
        {
            return Text.currency(this.item.running_balance);
        },
        
        invoiceDate()
        {
            return Dater.format(this.item.invoice_date);
        },

        dueDateClass()
        {
            let dueDate = new Date(this.item.invoice_due_date);
            let today = new Date();

            if (dueDate.getTime() < today.getTime())
            {
                return 'ap-text-danger';
            }
            
            return '';
        },

        statusClass()
        {
            return {
                'bg-secondary': this.item.status.id == 1,
                'bg-success': this.item.status.id == 2,
                'bg-danger': this.item.status.id == 3
            };
        },

        deliveredClass()
        {
            return {
                'bg-secondary': !this.item.is_delivered,
                'bg-success': this.item.is_delivered,
            };
        },

        dueDate()
        {
            return Dater.format(this.item.invoice_due_date);
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
            select: 'adminDashboardBilling/select',
        }),

        toggleInclusions()
        {
            this.showInclusions = !this.showInclusions;

            if (this.showInclusions)
            {
                this.loadInclusions();
            }
        },

        async loadInclusions()
        {
            this.inclusionsLoading = true;

            const response = await Http.get(`/administration/invoice/${this.item.slug.code}/inclusions`);

            this.inclusionsLoading = false;

            if (response.status == 200)
            {
                this.inclusions = response.data.data;
            }
        },

        openModal(name)
        {
            this.select(this.item);

            this.$parent.toggleModal(name, true);
        },
    },
};
</script>
