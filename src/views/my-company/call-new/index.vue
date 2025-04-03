<template>
    <div class="ap-animate ap-animate-fade-in ap-margin-top">
        <ap-grid :gutter="'small'"
            class="ap-margin-small-top">
            <div class="ap-width-expand">
                <h5 class="ap-margin-remove ap-text-primary">
                    CALL SERVICE
                </h5>
            </div>
            <div class="ap-text-right">
                <h5 class="ap-margin-remove ap-text-primary">
                    {{ callCredit }} mins
                </h5>
            </div>
        </ap-grid>

        <div v-if="!isLoading('show')">
            <div class="ap-form-stacked ap-margin-top"
                v-if="callSetting.call_service_status && callSetting.call_status">
                <fieldset class="ap-fieldset">

                    <div class="ap-margin">
                        <small class="ap-text-bold">
                            MOBILE NUMBER:
                        </small>

                        <input
                            type="text"
                            class="ap-textarea ap-textarea-message"
                            placeholder="ex. 09XXXXXXXXX"
                            autofocus="true"
                            :required="true"
                            :readonly="submitLoading"
                            v-model="form.mobile_number">

                        <div class="ap-margin-xsmall-top">
                            <small class="ap-text-bold ap-text-danger"
                                v-if="hasError('mobile_number')">
                                {{errors.mobile_number[0]}}
                            </small>
                        </div>
                    </div>
                </fieldset>

                <div class="ap-margin">
                    <ap-button
                        :rounded="true"
                        :color="'primary'"
                        :fullWidth="true"
                        :loading="submitLoading"
                        @click="openCall()">
                        Call
                    </ap-button>
                </div>
            </div>

            <div v-else
                class="ap-margin-top ap-text-center">
               <h4>
                    OFFLINE MODE
               </h4>

               <p class="ap-margin-top">
                    Call service is currently not available at the moment.
               </p>
               <p>
                    If you have urgent message to send, kindly contact <span class="ap-text-bold">Velcro Tech Philippines Inc.</span>.
               </p>
               <p class="ap-margin-remove-top ap-text-italic ap-text-center">
                    0910 842 5828 (Smart) <br />
                    0945 71 6376 (Globe)
                </p>
            </div>
        </div>

        <div class="ap-margin-top ap-text-center"
            v-else>
            <ap-loader
                :size="'large'" />
        </div>

        <call-component />

    </div>
</template>

<script>


import { mapGetters } from 'vuex';

import Http from '@/services';

import { Form, Toast, Text } from '@/utils';

import CallComponent from './components/modals/call';

export default
{
    components:
    {
        CallComponent,
    },

    data()
    {
        return {
            errors: {},

            callModal: false,

            submitLoading: false,

            form:
            {
                mobile_number: '09',
                source: 'DASHBOARD',
            },

            callStatusLabel: 'Loading setting...',
            callStatus: 1
        };
    },

    created()
    {
        this.initialize();
    },

    computed:
    {
        ...mapGetters({
            accessUser: 'auth/accessUser',
            isLoading: 'myCompany/isLoading',
        }),

        company()
        {
            return this.accessUser.company;
        },

        isServiceActive()
        {
            return this.company.call_status;
        },

        callCredit()
        {
            return parseFloat(this.company.call_credit);
        },

        callSetting()
        {
            return this.company.call_setting;
        },
    },

    methods:
    {
        async openCall()
        {
            if (
                this.form.mobile_number.length != 11 ||
                this.form.mobile_number[0] != '0' ||
                this.form.mobile_number[1] != '9'
            )
            {
                return Toast.error({
                    message: 'Mobile number is invalid format.'
                })
            }

            this.toggleModal('call', true);
        },

        async initialize()
        {
            // this.startAudioStream();

            this.form.mobile_number = '09';
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },

        toggleModal(name, bool)
        {
            this[`${name}Modal`] = bool;
        }
    },
};
</script>