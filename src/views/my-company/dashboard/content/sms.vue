<template>
    <div class="ap-animate ap-animate-fade-in ap-margin-top">
        <ap-grid :gutter="'small'"
            class="ap-margin-small-top">
            <div class="ap-width-expand">
                <h5 class="ap-margin-remove ap-text-primary">
                    SMS SERVICE
                </h5>
            </div>
            <div class="ap-text-right">
                <h5 class="ap-margin-remove ap-text-primary">
                    {{ smsCredit }}
                </h5>
            </div>
        </ap-grid>

        <div v-if="!isLoading('show')">
            <form class="ap-form-stacked ap-margin-top"
                v-if="smsSetting.sms_service_status"
                @submit.prevent="submit()">
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
                    
                    <div class="ap-margin-top">
                        <small class="ap-text-bold">
                            MESSAGE:
                        </small>

                        <p class="ap-margin-small-top">
                            {{smsSetting.header_name}}
                        </p>

                        <textarea
                            class="ap-textarea ap-textarea-message"
                            cols="30"
                            rows="5"
                            :required="true"
                            :placeholder="'type your message here...'"
                            v-model="form.message">
                        </textarea>

                        <ap-grid :gutter="'small'">
                            <div class="ap-width-expand">
                                <small class="ap-text-muted"
                                    style="font-size: 11px;">
                                    SMS Credit : {{creditPerSent}} / {{smsSetting.max_char}} characters
                                </small>
                            </div>
                            <div class="ap-text-right">
                                <small class="ap-text-muted"
                                    style="font-size: 11px;">
                                    Character count : {{charLength}}
                                </small>
                            </div>
                        </ap-grid>
                        
                        
                        <div class="ap-margin-xsmall-top">
                            <small class="ap-text-bold ap-text-danger"
                                v-if="hasError('message')">
                                {{errors.message[0]}}
                            </small>
                        </div>
                    </div>
                </fieldset>

                <div class="ap-margin">
                    <ap-button
                        class="ap-width-block"
                        type="submit"
                        :rounded="true"
                        :color="apButtonBackground"
                        :loading="submitLoading">
                        Submit
                    </ap-button>
                </div>
            </form>

            <div v-else
                class="ap-margin-top ap-text-center">
               <h4>
                    OFFLINE MODE
               </h4>

               <p class="ap-margin-top">
                    SMS service is currently not available at the moment.
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
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Http from '@/services';

import { Form, Toast, Dater, Text } from '@/utils';

export default
{
    data()
    {
        return {
            errors: {},

            submitLoading: false,

            form:
            {
                mobile_number: '09',
                sms_type: 2,
                transaction_date: '',
                transaction_type: 1,
                scheduled_date: '',
                scheduled_time: '',
                message: '',
                source: 'DASHBOARD',
            },
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

        isCompany()
        {
            return this.accessUser.account_type.id == 2;
        },

        company()
        {
            return this.accessUser.company;
        },

        smsCredit()
        {
            return Text.currency(this.company.sms_credit);
        },

        smsSetting()
        {
            return this.company.sms_setting;
        },

        charLength()
        {
            let headerName = this.smsSetting.header_name;
            
            return headerName.length + this.form.message.length;
        },

        creditPerSent()
        {
            return Text.currency(this.smsSetting.credit_per_sent);
        },

        apButtonBackground()
        {
            if (this.company.province_id == '0314') return 'customPink';

            return 'primary';
        }
    },

    methods:
    {
        async submit()
        {
            this.errors = {};

            this.submitLoading = true;
            
            const response = await Http.post(
                `/my-company/sms/send`,
                this.form
            );

            this.submitLoading = false;

            if (response.status === 201)
            {
                this.company.sms_credit = parseFloat(this.company.sms_credit) - parseFloat(response.data.possible_amount);

                Toast.success({
                    message: `${response.data.code} SMS has been sent.`,
                });

                this.initialize();
            }
            else if (response.status === 422)
            {
                this.errors = response.data.errors;
                
                Toast.error({
                    message: 'Kindly double check your form.',
                });
            }
            else if (response.status === 403)
            {
                let message = 'Sorry, you cannot perform this action.';

                Toast.error({
                    message: response.data.error.description
                        ? response.data.error.description
                        : message,
                });
            }
            else if (response.status === 404)
            {
                let message = 'Data not found. Please try again.';

                Toast.error({
                    message: response.data.error.description
                        ? response.data.error.description
                        : message,
                });
            }
            else
            {
                let message = 'Something went wrong. Please try again.';

                Toast.error({
                    message: response.data.error.description
                        ? response.data.error.description
                        : message,
                });
            }
        },

        initialize()
        {
            this.form.mobile_number = '09';
            this.form.sms_type = 2;
            this.form.transaction_date = Dater.rawToday();
            this.form.transaction_type = 1;
            this.form.scheduled_date = Dater.rawToday();
            this.form.scheduled_time = Dater.rawTime('H:i');
            this.form.message = '';
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },
    },
};
</script>