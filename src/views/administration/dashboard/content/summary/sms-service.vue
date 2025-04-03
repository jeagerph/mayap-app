<template>
    <div class="ap-animate ap-animate-fade-in">
        <div class="card radius-10">
            <div class="card-body">
                <ap-grid>
                    <div class="ap-width-expand">
                        <h4 class="ap-text-bold">
                            SMS SERVICE
                        </h4>
                    </div>
                    <div class="ap-text-right">
                        <div class="widgets-icons text-primary ms-auto">
                            <i class="bx bx-message-detail"></i>
                        </div>
                    </div>
                </ap-grid>

                <hr class="">

                <router-link
                    class="ap-link-reset"
                    :to="`/administration/barangays?filter[smsStatus]=1`">
                    <ap-grid>
                        <div class="ap-width-expand">
                            <small>
                                SMS LOAD
                            </small>
                        </div>
                        <div class="ap-text-right">
                            <h5
                                v-if="!summaryLoading">
                                {{smsLoad}}
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
                    :to="`/administration/barangays?filter[smsStatus]=1&filter[status]=1`">
                    <ap-grid>
                        <div class="ap-width-expand">
                            <small>
                                ACTIVE BARANGAY
                            </small>
                        </div>
                        <div class="ap-text-right">
                            <h5
                                v-if="!summaryLoading">
                                {{activeBarangay}}
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
                    :to="`/administration/barangays?filter[otpStatus]=1&filter[status]=1`">
                    <ap-grid>
                        <div class="ap-width-expand">
                            <small>
                                OTP LOGIN
                            </small>
                        </div>
                        <div class="ap-text-right">
                            <h5
                                v-if="!summaryLoading">
                                {{otpLogin}}
                            </h5>
                            <ap-loader
                                v-else
                                :size="'small'"
                                :color="'primary'" />
                        </div>
                    </ap-grid>
                </router-link>

                <ap-grid>
                    <div class="ap-width-expand">
                        <small>
                            STATUS
                        </small>
                    </div>
                    <div class="ap-text-right">
                        <ap-button
                            v-if="!summaryLoading"
                            :size="'small'"
                            :color="summary.sms_status ? 'success':'default'"
                            :loading="updateLoading"
                            @click="updateStatus()">
                            <span class="ap-text-bold">
                                {{ summary.sms_status ? 'ON':'OFF' }}
                            </span>
                        </ap-button>
                        <ap-loader
                            v-else
                            :size="'small'"
                            :color="'primary'" />
                        
                    </div>
                </ap-grid>
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
                active_barangay: 0,
                otp_login: 0,
                sms_load: 0,
                sms_status: 0,
            },

            updateLoading: false,
        };
    },

    created()
    {
        this.loadSummary();
    },

    computed:
    {
        activeBarangay()
        {
            return this.summary.active_barangay;
        },

        otpLogin()
        {
            return this.summary.otp_login;
        },

        smsLoad()
        {
            return Text.currency(this.summary.sms_load);
        },
    },

    methods:
    {
        async loadSummary()
        {
            this.summaryLoading = true;

            const response = await Http.get(`/administration/dashboard/summary/sms-service`);

            this.summaryLoading = false;

            if (response.status == 200)
            {
                this.summary = response.data;
            }
        },

        async updateStatus()
        {
            this.updateLoading = true;

            const response = await Http.put('/administration/dashboard/sms-service/status');

            this.updateLoading = false;

            if (response.status == 200)
            {
                this.summary.sms_status = response.data.status;
            }
        }
    },
};
</script>