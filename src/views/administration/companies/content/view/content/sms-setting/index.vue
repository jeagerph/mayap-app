<template>
    <div class="ap-animate ap-animate-fade-in">
        
        <div class="ap-padding-small">

            <form class="ap-form-stacked"
                @submit.prevent="submit()">
                <fieldset class="ap-fieldset">

                    <div>
                        <small class="ap-text-bold ap-margin-remove">
                            SMS SERVICE STATUS
                        </small>
                    </div>
                    

                    <div class="ap-inline ap-margin-small-top"
                        v-if="!isLoading('smsSetting')">
                        <label for="status-on">
                            <input class="ap-checkbox" id="status-on" type="radio"
                                :value="1"
                                v-model="form.sms_status">
                            <span class="ap-margin-xsmall-left">
                                ON
                            </span>
                        </label>
                    </div>
                    <div class="ap-inline ap-margin-small-top ap-margin-left"
                        v-if="!isLoading('smsSetting')">
                        <label for="status-off">
                            <input class="ap-checkbox" id="status-off" type="radio"
                                :value="0"
                                v-model="form.sms_status">
                            <span class="ap-margin-xsmall-left">
                                OFF
                            </span>
                        </label>
                    </div>

                    <ap-placeholder
                        v-if="isLoading('smsSetting')"
                        :size="'medium'" />

                    <small class="ap-text-bold ap-text-danger"
                        v-if="hasError('sms_status')">
                            {{errors.sms_status[0]}}
                    </small>

                    <ap-input
                        v-if="!isLoading('smsSetting')"
                        type="text"
                        :required="true"
                        :readonly="submitLoading"
                        :label="'* Sender Name'"
                        v-model="form.branding_sender_name"
                        :error="hasError('branding_sender_name') ? errors.branding_sender_name[0] : ''"/>
                    <div v-else>
                        <label class="ap-form-label ap-text-bold">
                            * Sender Name
                        </label>
                        <ap-placeholder
                            :size="'medium'" />
                    </div>
                    
                    <ap-input
                        v-if="!isLoading('smsSetting')"
                        type="text"
                        :required="true"
                        :readonly="submitLoading"
                        :label="'* API URL'"
                        v-model="form.branding_api_url"
                        :error="hasError('branding_api_url') ? errors.branding_api_url[0] : ''"/>
                    <div v-else>
                        <label class="ap-form-label ap-text-bold">
                            * API URL
                        </label>
                        <ap-placeholder
                            :size="'medium'" />
                    </div>
                    
                    <ap-input
                        v-if="!isLoading('smsSetting')"
                        type="text"
                        :required="true"
                        :readonly="submitLoading"
                        :label="'* API Code'"
                        v-model="form.branding_api_code"
                        :error="hasError('branding_api_code') ? errors.branding_api_code[0] : ''"/>
                    <div v-else>
                        <label class="ap-form-label ap-text-bold">
                            * API Code
                        </label>
                        <ap-placeholder
                            :size="'medium'" />
                    </div>

                    <hr>

                    <ap-grid :gutter="'small'"
                        class="ap-margin-medium-top">
                        <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                            <div>
                                <small class="ap-text-bold ap-margin-remove">
                                    OTP STATUS
                                </small>
                            </div>
                            

                            <div class="ap-inline ap-margin-small-top"
                                v-if="!isLoading('smsSetting')">
                                <label for="otp-status-on">
                                    <input class="ap-checkbox" id="otp-status-on" type="radio"
                                        :value="1"
                                        v-model="form.otp_status">
                                    <span class="ap-margin-xsmall-left">
                                        ON
                                    </span>
                                </label>
                            </div>
                            <div class="ap-inline ap-margin-small-top ap-margin-left"
                                v-if="!isLoading('smsSetting')">
                                <label for="otp-status-off">
                                    <input class="ap-checkbox" id="otp-status-off" type="radio"
                                        :value="0"
                                        v-model="form.otp_status">
                                    <span class="ap-margin-xsmall-left">
                                        OFF
                                    </span>
                                </label>
                            </div>

                            <ap-placeholder
                                v-if="isLoading('smsSetting')"
                                :size="'medium'" />

                            <small class="ap-text-bold ap-text-danger"
                                v-if="hasError('otp_status')">
                                    {{errors.otp_status[0]}}
                            </small>
                        </div>
                        <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                            <div>
                                <small class="ap-text-bold ap-margin-remove">
                                    DIAFAAN STATUS
                                </small>
                            </div>
                            

                            <div class="ap-inline ap-margin-small-top"
                                v-if="!isLoading('smsSetting')">
                                <label for="diafaan-status-on">
                                    <input class="ap-checkbox" id="diafaan-status-on" type="radio"
                                        :value="1"
                                        v-model="form.diafaan_status">
                                    <span class="ap-margin-xsmall-left">
                                        ON
                                    </span>
                                </label>
                            </div>
                            <div class="ap-inline ap-margin-small-top ap-margin-left"
                                v-if="!isLoading('smsSetting')">
                                <label for="diafaan-status-off">
                                    <input class="ap-checkbox" id="diafaan-status-off" type="radio"
                                        :value="0"
                                        v-model="form.diafaan_status">
                                    <span class="ap-margin-xsmall-left">
                                        OFF
                                    </span>
                                </label>
                            </div>

                            <ap-placeholder
                                v-if="isLoading('smsSetting')"
                                :size="'medium'" />

                            <small class="ap-text-bold ap-text-danger"
                                v-if="hasError('diafaan_status')">
                                    {{errors.diafaan_status[0]}}
                            </small>
                        </div>
                        <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                            
                        </div>
                        <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                            
                        </div>
                    </ap-grid>

                    <p class="ap-text-bold ap-text-primary ap-margin-medium-top">
                        CREDIT PRICING
                    </p>

                    <ap-grid :gutter="'small'">
                        <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                            <ap-input
                                v-if="!isLoading('smsSetting')"
                                type="text"
                                :required="true"
                                :readonly="submitLoading"
                                :label="'* Credit / Branding SMS'"
                                v-model="form.credit_per_branding_sms"
                                :error="hasError('credit_per_branding_sms') ? errors.credit_per_branding_sms[0] : ''"/>
                            <div v-else>
                                <label class="ap-form-label ap-text-bold">
                                    * Credit / Branding SMS
                                </label>
                                <ap-placeholder
                                    :size="'medium'" />
                            </div>
                        </div>
                        <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                            <ap-input
                                v-if="!isLoading('smsSetting')"
                                type="text"
                                :required="true"
                                :readonly="submitLoading"
                                :label="'* Credit / Regular SMS'"
                                v-model="form.credit_per_regular_sms"
                                :error="hasError('credit_per_regular_sms') ? errors.credit_per_regular_sms[0] : ''"/>
                            <div v-else>
                                <label class="ap-form-label ap-text-bold">
                                    * Credit / Regular SMS
                                </label>
                                <ap-placeholder
                                    :size="'medium'" />
                            </div>
                        </div>
                    </ap-grid>

                    <ap-grid :gutter="'small'">
                        <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                            <ap-input
                                v-if="!isLoading('smsSetting')"
                                type="text"
                                :required="true"
                                :readonly="submitLoading"
                                :label="'* Max Char / SMS'"
                                v-model="form.max_char_per_sms"
                                :error="hasError('max_char_per_sms') ? errors.max_char_per_sms[0] : ''"/>
                            <div v-else>
                                <label class="ap-form-label ap-text-bold">
                                    * Max Char / SMS
                                </label>
                                <ap-placeholder
                                    :size="'medium'" />
                            </div>
                        </div>
                        <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                            <ap-input
                                v-if="!isLoading('smsSetting')"
                                type="text"
                                :required="true"
                                :readonly="submitLoading"
                                :label="'* Max Allowable Credit'"
                                v-model="form.credit_threshold"
                                :error="hasError('credit_threshold') ? errors.credit_threshold[0] : ''"/>
                            <div v-else>
                                <label class="ap-form-label ap-text-bold">
                                    * Max Allowable Credit
                                </label>
                                <ap-placeholder
                                    :size="'medium'" />
                            </div>
                        </div>
                    </ap-grid>

                    <ap-grid :gutter="'small'">
                        <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                            <p class="ap-text-bold ap-text-primary">
                                MESSAGE HEADER AND FOOTER
                            </p>

                            <ap-input
                                v-if="!isLoading('smsSetting')"
                                type="text"
                                :required="true"
                                :readonly="submitLoading"
                                :label="'* Header'"
                                v-model="form.header_name"
                                :error="hasError('header_name') ? errors.header_name[0] : ''"/>
                            <div v-else>
                                <label class="ap-form-label ap-text-bold">
                                    * SMS Header
                                </label>
                                <ap-placeholder
                                    :size="'medium'" />
                            </div>

                            <div class="ap-margin-top">
                                <label class="ap-text-bold ap-form-label">
                                    Footer
                                </label>

                                <textarea
                                    v-if="!isLoading('smsSetting')"
                                    class="ap-textarea ap-textarea-message"
                                    cols="30"
                                    rows="5"
                                    :readonly="submitLoading"
                                    :placeholder="'ex. JUAN DELA CRUZ (BARANGAY CHAIRMAN)'"
                                    v-model="form.footer_name">
                                </textarea>
                                <ap-placeholder
                                    v-else
                                    :size="'medium'" />

                                <small class="ap-text-bold ap-text-danger"
                                    v-if="hasError('footer_name')">
                                        {{errors.footer_name[0]}}
                                </small>
                            </div>
                        </div>
                        <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                            <p class="ap-text-bold ap-text-primary">
                                BIRTHDAY GREETING
                            </p>

                            <div>
                                <small class="ap-text-bold ap-margin-remove">
                                    STATUS
                                </small>
                            </div>
                            

                            <div class="ap-inline ap-margin-small-top"
                                v-if="!isLoading('smsSetting')">
                                <label for="birthday-status-on">
                                    <input class="ap-checkbox" id="birthday-status-on" type="radio"
                                        :value="1"
                                        v-model="form.birthday_status">
                                    <span class="ap-margin-xsmall-left">
                                        ON
                                    </span>
                                </label>
                            </div>
                            <div class="ap-inline ap-margin-small-top ap-margin-left"
                                v-if="!isLoading('smsSetting')">
                                <label for="birthday-status-off">
                                    <input class="ap-checkbox" id="birthday-status-off" type="radio"
                                        :value="0"
                                        v-model="form.birthday_status">
                                    <span class="ap-margin-xsmall-left">
                                        OFF
                                    </span>
                                </label>
                            </div>

                            <ap-placeholder
                                v-if="isLoading('smsSetting')"
                                :size="'medium'" />

                            <small class="ap-text-bold ap-text-danger"
                                v-if="hasError('birthday_status')">
                                    {{errors.birthday_status[0]}}
                            </small>

                            <ap-input
                                v-if="!isLoading('smsSetting')"
                                type="text"
                                :required="true"
                                :readonly="submitLoading"
                                :label="'* Birthday Header'"
                                v-model="form.birthday_header"
                                :error="hasError('birthday_header') ? errors.birthday_header[0] : ''"/>
                            <div v-else>
                                <label class="ap-form-label ap-text-bold">
                                    * Header
                                </label>
                                <ap-placeholder
                                    :size="'medium'" />
                            </div>

                            <div class="ap-margin-top">
                                <label class="ap-text-bold ap-form-label">
                                    Message
                                </label>

                                <textarea
                                    v-if="!isLoading('smsSetting')"
                                    class="ap-textarea ap-textarea-message"
                                    cols="30"
                                    rows="5"
                                    :readonly="submitLoading"
                                    :placeholder="'ex. Happy Birthday'"
                                    v-model="form.birthday_message">
                                </textarea>
                                <ap-placeholder
                                    v-else
                                    :size="'medium'" />

                                <small class="ap-text-bold ap-text-danger"
                                    v-if="hasError('birthday_greeting')">
                                        {{errors.birthday_greeting[0]}}
                                </small>
                            </div>
                        </div>
                    </ap-grid>


                    <ap-grid :gutter="'small'">
                        <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                            <p class="ap-text-bold ap-text-primary">
                                REPORT
                            </p>

                            <div>
                                <small class="ap-text-bold ap-margin-remove">
                                    STATUS
                                </small>
                            </div>
                            

                            <div class="ap-inline ap-margin-small-top"
                                v-if="!isLoading('smsSetting')">
                                <label for="report-status-on">
                                    <input class="ap-checkbox" id="report-status-on" type="radio"
                                        :value="1"
                                        v-model="form.report_status">
                                    <span class="ap-margin-xsmall-left">
                                        ON
                                    </span>
                                </label>
                            </div>
                            <div class="ap-inline ap-margin-small-top ap-margin-left"
                                v-if="!isLoading('smsSetting')">
                                <label for="report-status-off">
                                    <input class="ap-checkbox" id="report-status-off" type="radio"
                                        :value="0"
                                        v-model="form.report_status">
                                    <span class="ap-margin-xsmall-left">
                                        OFF
                                    </span>
                                </label>
                            </div>

                            <ap-placeholder
                                v-if="isLoading('smsSetting')"
                                :size="'medium'" />

                            <small class="ap-text-bold ap-text-danger"
                                v-if="hasError('report_status')">
                                    {{errors.report_status[0]}}
                            </small>

                            <ap-input
                                v-if="!isLoading('smsSetting')"
                                type="text"
                                :required="true"
                                :readonly="submitLoading"
                                :label="'* Template'"
                                v-model="form.report_template"
                                :error="hasError('report_template') ? errors.report_template[0] : ''"/>
                            <div v-else>
                                <label class="ap-form-label ap-text-bold">
                                    * Template
                                </label>
                                <ap-placeholder
                                    :size="'medium'" />
                            </div>

                            <p class="ap-text-bold">
                                REPORT RECEIVERS
                            </p>

                            <form class="ap-form-stacked"
                                v-if="!isLoading('smsSetting')"
                                @submit.prevent="addReportMobileNumber()">
                                <fieldset class="ap-fieldset">
                                    <ap-input
                                        type="text"
                                        :required="true"
                                        :label="'Enter Mobile No.'"
                                        v-model="reportForm.mobile_no"/>
                                </fieldset>
                            </form>

                            <div class="ap-margin-small-top"
                                v-if="!isLoading('smsSetting')">

                                <ul class="ap-list ap-list-divider"
                                    v-if="form.report_mobile_numbers.length > 0">
                                    <li v-for="(item, index) in form.report_mobile_numbers"
                                    :key="index">
                                        <p class="ap-text-bold ap-margin-remove">
                                            {{ item }}
                                            <a class="ap-link-reset ap-text-danger ap-point"
                                                @click="removeReportMobileNumber(index)">
                                                <i class="lni lni-trash"></i>
                                            </a>
                                        </p>
                                    </li>
                                </ul>

                                <small class="ap-text-italic ap-text-bold"
                                    v-else>
                                    No receivers yet
                                </small>
                            </div>
                        </div>
                    </ap-grid>
                    

                </fieldset>

                <div class="ap-margin ap-text-right"
                    v-if="!isLoading('smsSetting')">

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
                sms_status: 0,
                otp_status: 0,
                diafaan_status: 0,
                birthday_status: 0,
                header_name: '',
                footer_name: '',
                branding_sender_name: '',
                branding_api_url: '',
                branding_api_code: '',
                max_char_per_sms: 0,
                credit_per_branding_sms: 0.00,
                credit_per_regular_sms: 0.00,
                credit_threshold: 0.00,
                birthday_header: '',
                birthday_message: '',
                report_status: 0,
                report_template: 'default',
                report_mobile_numbers: [],
            },

            reportForm:
            {
                mobile_no: '',
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
            smsSetting: 'adminCompany/smsSetting',
            isLoading: 'adminCompany/isLoading',
        }),

        hasSmsSetting()
        {
            return Object.keys(this.smsSetting).length > 0;
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
                `/administration/company/${this.$route.params.code}/sms/setting`,
                this.form
            );

            this.submitLoading = false;

            if (response.status == 200)
            {
                this.updateState({
                    state: 'smsSetting',
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
                action: 'smsSetting',
                url: `/administration/company/${this.$route.params.code}/sms/setting`
            });

            if (response.status == 200)
            {
                this.form = response.data;
            }
        },

        addReportMobileNumber()
        {
            let checking = this.form.report_mobile_numbers.find(row => row == this.reportForm.mobile_no);

            if (checking) return Toast.error({
                message: 'Mobile number is already added.',
            });

            this.form.report_mobile_numbers.push(Object.assign({}, this.reportForm).mobile_no);

            this.reportForm.mobile_no = '';
        },

        removeReportMobileNumber(index)
        {
            this.form.report_mobile_numbers.splice(index, 1);
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },
    },
}
</script>