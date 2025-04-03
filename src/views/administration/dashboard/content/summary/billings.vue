<template>
    <div class="ap-animate ap-animate-fade-in">
        <div class="card radius-10">
            <div class="card-body">
                <ap-grid>
                    <div class="ap-width-expand">
                        <h4 class="ap-text-bold">
                            BILLING
                        </h4>
                    </div>
                    <div class="ap-text-right">
                        <div class="widgets-icons text-primary ms-auto">
                            <i class="bx bxs-layer"></i>
                        </div>
                    </div>
                </ap-grid>

                <hr class="">

                <router-link
                    class="ap-link-reset"
                    :to="`/administration/invoices?filter[status]=1`">
                    <ap-grid>
                        <div class="ap-width-expand">
                            <small>
                                NOT YET DELIVERED
                            </small>
                        </div>
                        <div class="ap-text-right">
                            <h5
                                v-if="!summaryLoading">
                                {{notDeliveredAmount}}
                            </h5>
                            <ap-loader
                                v-else
                                :size="'small'"
                                :color="'primary'" />
                            
                        </div>
                    </ap-grid>
                </router-link>

                <router-link
                    class="ap-link-reset"
                    :to="`/administration/invoices?filter[status]=1`">
                    <ap-grid>
                        <div class="ap-width-expand">
                            <small>
                                UNPAID
                            </small>
                        </div>
                        <div class="ap-text-right">
                            <h5
                                v-if="!summaryLoading">
                                {{unpaidAmount}}
                            </h5>
                            <ap-loader
                                v-else
                                :size="'small'"
                                :color="'primary'" />
                            
                        </div>
                    </ap-grid>
                </router-link>

                <router-link
                    class="ap-link-reset"
                    :to="`/administration/invoices?filter[status]=1&dueDate=1`">
                    <ap-grid>
                        <div class="ap-width-expand">
                            <small>
                                DUE DATE
                            </small>
                        </div>
                        <div class="ap-text-right">
                            <h5 class="ap-margin-remove"
                                v-if="!summaryLoading">
                                {{dueDateAmount}}
                            </h5>
                            <ap-loader
                                v-else
                                :size="'small'"
                                :color="'primary'" />
                            
                        </div>
                    </ap-grid>
                </router-link>
                
            </div>
        </div>
    </div>
</template>

<script>
import Http from '@/services';

import { Dater, Text } from '@/utils';

export default
{
    data()
    {
        return {
            summaryLoading: false,
            summary:
            {
                total: 0,
                totalAmount: 0,
                unpaid: 0,
                unpaidAmount: 0,
                notDelivered: 0,
                notDeliveredAmount: 0,
                dueDate: 0,
                dueDateAmount: 0,
            }
        };
    },

    created()
    {
        this.loadSummary();
    },

    computed:
    {
        totalAmount()
        {
            return Text.currency(this.summary.totalAmount);
        },

        unpaidAmount()
        {
            return Text.currency(this.summary.unpaidAmount);
        },

        notDeliveredAmount()
        {
            return Text.currency(this.summary.notDeliveredAmount);
        },

        dueDateAmount()
        {
            return Text.currency(this.summary.dueDateAmount);
        },
    },

    methods:
    {
        async loadSummary()
        {
            const date = Dater.firstAndLastDateOfMonth();

            this.summaryLoading = true;

            const response = await Http.get(`/administration/dashboard/summary/billings/unpaid?from=${date.firstDate}&to=${date.lastDate}`);

            this.summaryLoading = false;

            if (response.status == 200)
            {
                this.summary = response.data;
            }
        },
    },
};
</script>