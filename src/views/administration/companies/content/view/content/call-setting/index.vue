<template>
    <div class="ap-animate ap-animate-fade-in">
        
        <div class="ap-padding-small">

            <form class="ap-form-stacked"
                @submit.prevent="submit()">
                <fieldset class="ap-fieldset">

                    <div>
                        <small class="ap-text-bold ap-margin-remove">
                            CALL SERVICE STATUS
                        </small>
                    </div>
                    

                    <div class="ap-inline ap-margin-small-top"
                        v-if="!isLoading('callSetting')">
                        <label for="status-on">
                            <input class="ap-checkbox" id="status-on" type="radio"
                                :value="1"
                                v-model="form.call_status">
                            <span class="ap-margin-xsmall-left">
                                ON
                            </span>
                        </label>
                    </div>
                    <div class="ap-inline ap-margin-small-top ap-margin-left"
                        v-if="!isLoading('callSetting')">
                        <label for="status-off">
                            <input class="ap-checkbox" id="status-off" type="radio"
                                :value="0"
                                v-model="form.call_status">
                            <span class="ap-margin-xsmall-left">
                                OFF
                            </span>
                        </label>
                    </div>

                    <ap-placeholder
                        v-if="isLoading('callSetting')"
                        :size="'medium'" />

                    <small class="ap-text-bold ap-text-danger"
                        v-if="hasError('call_status')">
                            {{errors.call_status[0]}}
                    </small>
                    
                    <ap-input
                        v-if="!isLoading('callSetting')"
                        type="text"
                        :required="true"
                        :readonly="submitLoading"
                        :label="'* Account SID'"
                        v-model="form.account_sid"
                        :error="hasError('account_sid') ? errors.account_sid[0] : ''"/>
                    <div v-else>
                        <label class="ap-form-label ap-text-bold">
                            * Account SID
                        </label>
                        <ap-placeholder
                            :size="'medium'" />
                    </div>
                    
                    <ap-input
                        v-if="!isLoading('callSetting')"
                        type="text"
                        :required="true"
                        :readonly="submitLoading"
                        :label="'* Auth Token'"
                        v-model="form.auth_token"
                        :error="hasError('auth_token') ? errors.auth_token[0] : ''"/>
                    <div v-else>
                        <label class="ap-form-label ap-text-bold">
                            * Auth Token
                        </label>
                        <ap-placeholder
                            :size="'medium'" />
                    </div>
                    
                    <ap-input
                        v-if="!isLoading('callSetting')"
                        type="text"
                        :required="true"
                        :readonly="submitLoading"
                        :label="'* Phone No.'"
                        v-model="form.phone_no"
                        :error="hasError('phone_no') ? errors.phone_no[0] : ''"/>
                    <div v-else>
                        <label class="ap-form-label ap-text-bold">
                            * Phone No.
                        </label>
                        <ap-placeholder
                            :size="'medium'" />
                    </div>
                    
                    <ap-input
                        v-if="!isLoading('callSetting')"
                        type="text"
                        :required="true"
                        :readonly="submitLoading"
                        :label="'* API Key'"
                        v-model="form.api_key"
                        :error="hasError('api_key') ? errors.api_key[0] : ''"/>
                    <div v-else>
                        <label class="ap-form-label ap-text-bold">
                            * API Key
                        </label>
                        <ap-placeholder
                            :size="'medium'" />
                    </div>
                    
                    <ap-input
                        v-if="!isLoading('callSetting')"
                        type="text"
                        :required="true"
                        :readonly="submitLoading"
                        :label="'* API Secret'"
                        v-model="form.api_secret"
                        :error="hasError('api_secret') ? errors.api_secret[0] : ''"/>
                    <div v-else>
                        <label class="ap-form-label ap-text-bold">
                            * API Secret
                        </label>
                        <ap-placeholder
                            :size="'medium'" />
                    </div>
                    
                    <ap-input
                        v-if="!isLoading('callSetting')"
                        type="text"
                        :required="true"
                        :readonly="submitLoading"
                        :label="'* App SID'"
                        v-model="form.app_sid"
                        :error="hasError('app_sid') ? errors.app_sid[0] : ''"/>
                    <div v-else>
                        <label class="ap-form-label ap-text-bold">
                            * App SID
                        </label>
                        <ap-placeholder
                            :size="'medium'" />
                    </div>
                </fieldset>

                <div class="ap-margin ap-text-right"
                    v-if="!isLoading('callSetting')">

                    <ap-button
                        type="submit"
                        :color="'primary'"
                        :rounded="true"
                        :loading="submitLoading">
                        Submit
                    </ap-button>
                </div>

            </form>

        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Http from '@/services';

import { Form, Toast } from '@/utils';

export default
{
    data()
    {
        return {
            errors: {},

            submitLoading: false,

            form:
            {
                call_status: 0,
                account_sid: '',
                auth_token: '',
                phone_no: '',
                api_key: '',
                api_secret: '',
                app_sid: '',
            }
        };
    },

    created()
    {
        this.load();
    },

    computed:
    {
        ...mapGetters({
            company: 'adminCompany/selected',
            callSetting: 'adminCompany/callSetting',
            isLoading: 'adminCompany/isLoading',
        }),

        hasCallSetting()
        {
            return Object.keys(this.callSetting).length > 0;
        }
    },

    methods:
    {
        ...mapActions({
            loadObject: 'adminCompany/loadObject',
            updateState: 'adminCompany/selectObject',
        }),

        async submit()
        {
            this.submitLoading = true;

            const response = await Http.put(
                `/administration/company/${this.$route.params.code}/call/setting`,
                this.form
            );

            this.submitLoading = false;

            if (response.status == 200)
            {
                this.updateState({
                    state: 'callSetting',
                    data: response.data
                });

                Toast.success({
                    message: 'Setting has been updated.',
                });
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

        async load()
        {
            const response = await this.loadObject({
                action: 'callSetting',
                url: `/administration/company/${this.$route.params.code}/call/setting`
            });

            if (response.status == 200)
            {
                this.form.call_status = response.data.call_status;
                this.form.account_sid = response.data.account_sid;
                this.form.auth_token = response.data.auth_token;
                this.form.phone_no = response.data.phone_no;
                this.form.api_key = response.data.api_key;
                this.form.api_secret = response.data.api_secret;
                this.form.app_sid = response.data.app_sid;
            }
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },
    },
}
</script>