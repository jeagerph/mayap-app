<template>
    <div class="ap-animate ap-animate-fade-in">
        
        <div class="ap-padding-small">

            <form class="ap-form-stacked"
                @submit.prevent="submit()">
                <fieldset class="ap-fieldset">

                    <div class="ap-margin">
                        
                        <p class="ap-text-bold ap-text-primary ap-margin-remove">
                            ONE-TIME PIN (OTP) ACTIVATION
                        </p>

                        <div class="ap-inline ap-margin-small-top"
                            v-if="!isLoading('loginSetting')">
                            <label for="status-on">
                                <input class="ap-checkbox" id="status-on" type="radio"
                                    :value="1"
                                    v-model="form.otp_status">
                                <span class="ap-margin-xsmall-left">
                                    ON
                                </span>
                            </label>
                        </div>
                        <div class="ap-inline ap-margin-small-top ap-margin-left"
                            v-if="!isLoading('loginSetting')">
                            <label for="status-off">
                                <input class="ap-checkbox" id="status-off" type="radio"
                                    :value="0"
                                    v-model="form.otp_status">
                                <span class="ap-margin-xsmall-left">
                                    OFF
                                </span>
                            </label>
                        </div>

                        <ap-placeholder
                            v-if="isLoading('loginSetting')"
                            :size="'medium'" />

                        <small class="ap-text-bold ap-text-danger"
                            v-if="hasError('otp_status')">
                                {{errors.otp_status[0]}}
                        </small>
                    </div>

                </fieldset>

                <div class="ap-margin ap-text-right"
                    v-if="!isLoading('loginSetting')">

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
                otp_status: 0,
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
            barangay: 'adminBarangay/selected',
            loginSetting: 'adminBarangay/loginSetting',
            isLoading: 'adminBarangay/isLoading',
        }),

        hasLoginSetting()
        {
            return Object.keys(this.loginSetting).length > 0;
        }
    },

    methods:
    {
        ...mapActions({
            loadSetting: 'adminBarangay/loadSetting',
            updateSetting: 'adminBarangay/updateSetting',
        }),

        async submit()
        {
            this.submitLoading = true;

            const response = await Http.put(
                `/administration/barangay/${this.$route.params.code}/login/setting`,
                this.form
            );

            this.submitLoading = false;

            if (response.status == 200)
            {
                this.updateSetting({
                    state: 'loginSetting',
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
            const response = await this.loadSetting({
                action: 'loginSetting',
                url: `/administration/barangay/${this.$route.params.code}/login/setting`
            });

            if (response.status == 200)
            {
                this.form.otp_status = response.data.otp_status;
            }
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },
    },
}
</script>