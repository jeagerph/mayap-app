<template>
    <div class="ap-margin-top">
        <p class="ap-text-bold">
            DOCUMENT SETTINGS
        </p>

        <ap-grid :gutter="'small'"
            class="ap-flex-middle">
            <div class="ap-width-1-1@s ap-width-4-5@m ap-width-4-5@l"
                :class="{ 'ap-opacity': !form.options.with_qr_code }">
                <label class="ap-text-bold ap-form-label">
                {{`${form.options.with_qr_code?'* ':''}Qr Code`}}
            </label>
            </div>
            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                <div class="ap-text-center">
                    <h4
                        :data-tooltip="form.options.with_qr_code ? 'INCLUDED':'NOT INCLUDED'">
                        <i class="lni lni-checkmark-circle ap-text-success" v-show="form.options.with_qr_code"></i>
                        <i class="lni lni-cross-circle ap-text-default" v-show="!form.options.with_qr_code"></i>
                    </h4>
                </div>
            </div>
        </ap-grid>
        <div class="ap-margin-xsmall-top">
            <small class="ap-text-bold ap-text-danger"
                v-if="hasError('options.with_qr_code')">
                <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                {{errors['options.with_qr_code'][0]}}
            </small>
        </div>

        <ap-grid :gutter="'small'"
            class="ap-flex-middle">
            <div class="ap-width-1-1@s ap-width-4-5@m ap-width-4-5@l"
                :class="{ 'ap-opacity': !form.options.with_document_no }">
                <label class="ap-text-bold ap-form-label">
                {{`${form.options.with_document_no?'* ':''}Document No.`}}
            </label>
            </div>
            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                <div class="ap-text-center">
                    <h4
                        :data-tooltip="form.options.with_document_no ? 'INCLUDED':'NOT INCLUDED'">
                        <i class="lni lni-checkmark-circle ap-text-success" v-show="form.options.with_document_no"></i>
                        <i class="lni lni-cross-circle ap-text-default" v-show="!form.options.with_document_no"></i>
                    </h4>
                </div>
            </div>
        </ap-grid>
        <div class="ap-margin-xsmall-top">
            <small class="ap-text-bold ap-text-danger"
                v-if="hasError('options.with_qr_code')">
                <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                {{errors['options.with_qr_code'][0]}}
            </small>
        </div>

        <ap-grid :gutter="'small'"
            class="ap-flex-middle">
            <div class="ap-width-1-1@s ap-width-4-5@m ap-width-4-5@l"
                :class="{ 'ap-opacity': !form.options.with_issuance_date }">
                <ap-input
                    type="date"
                    :required="form.options.with_issuance_date?true:false"
                    :readonly="!form.options.with_issuance_date"
                    :label="`${form.options.with_issuance_date?'* ':''}Issuance Date`"
                    :placeholder="'ex. XXXXXX'"
                    v-model="form.content.issuance_date"
                    :error="hasError('content.issuance_date') ? errors['content.issuance_date'][0] : ''"/>
            </div>
            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                <div class="ap-text-center">
                    <h4
                        :data-tooltip="form.options.with_issuance_date ? 'INCLUDED':'NOT INCLUDED'">
                        <i class="lni lni-checkmark-circle ap-text-success" v-show="form.options.with_issuance_date"></i>
                        <i class="lni lni-cross-circle ap-text-default" v-show="!form.options.with_issuance_date"></i>
                    </h4>
                </div>
            </div>
        </ap-grid>
        <div class="ap-margin-xsmall-top">
            <small class="ap-text-bold ap-text-danger"
                v-if="hasError('options.with_issuance_date')">
                <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                {{errors['options.with_issuance_date'][0]}}
            </small>
        </div>

        <ap-grid :gutter="'small'"
            class="ap-flex-middle">
            <div class="ap-width-1-1@s ap-width-4-5@m ap-width-4-5@l"
                :class="{ 'ap-opacity': !form.options.with_expiration_date }">
                <ap-input
                    type="date"
                    :required="form.options.with_expiration_date?true:false"
                    :readonly="!form.options.with_expiration_date"
                    :label="`${form.options.with_expiration_date?'* ':''}Expiration Date`"
                    :placeholder="'ex. XXXXXX'"
                    v-model="form.content.expiration_date"
                    :error="hasError('content.expiration_date') ? errors['content.expiration_date'][0] : ''"/>
            </div>
            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                <div class="ap-text-center">
                    <h4
                        :data-tooltip="form.options.with_expiration_date ? 'INCLUDED':'NOT INCLUDED'">
                        <i class="lni lni-checkmark-circle ap-text-success" v-show="form.options.with_expiration_date"></i>
                        <i class="lni lni-cross-circle ap-text-default" v-show="!form.options.with_expiration_date"></i>
                    </h4>
                </div>
            </div>
        </ap-grid>
        <div class="ap-margin-xsmall-top">
            <small class="ap-text-bold ap-text-danger"
                v-if="hasError('options.with_expiration_date')">
                <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                {{errors['options.with_expiration_date'][0]}}
            </small>
        </div>

        <p class="ap-text-bold ap-margin-medium-top">
            APPLICANT SETTINGS
        </p>

        <ap-grid :gutter="'small'"
            class="ap-flex-middle">
            <div class="ap-width-1-1@s ap-width-4-5@m ap-width-4-5@l"
                :class="{ 'ap-opacity': !form.options.with_applicant_photo }">
                <label class="ap-text-bold ap-form-label">
                {{`${form.options.with_applicant_photo?'* ':''}Applicant Photo`}}
            </label>
            </div>
            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                <div class="ap-text-center">
                    <h4
                        :data-tooltip="form.options.with_applicant_photo ? 'INCLUDED':'NOT INCLUDED'">
                        <i class="lni lni-checkmark-circle ap-text-success" v-show="form.options.with_applicant_photo"></i>
                        <i class="lni lni-cross-circle ap-text-default" v-show="!form.options.with_applicant_photo"></i>
                    </h4>
                </div>
            </div>
        </ap-grid>
        <div class="ap-margin-xsmall-top">
            <small class="ap-text-bold ap-text-danger"
                v-if="hasError('options.with_applicant_photo')">
                <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                {{errors['options.with_applicant_photo'][0]}}
            </small>
        </div>

        <ap-grid :gutter="'small'"
            class="ap-flex-middle">
            <div class="ap-width-1-1@s ap-width-4-5@m ap-width-4-5@l"
                :class="{ 'ap-opacity': !form.options.with_applicant_signature }">
                <label class="ap-text-bold ap-form-label">
                {{`${form.options.with_applicant_signature?'* ':''}Applicant Signature`}}
            </label>
            </div>
            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                <div class="ap-text-center">
                    <h4
                        :data-tooltip="form.options.with_applicant_signature ? 'INCLUDED':'NOT INCLUDED'">
                        <i class="lni lni-checkmark-circle ap-text-success" v-show="form.options.with_applicant_signature"></i>
                        <i class="lni lni-cross-circle ap-text-default" v-show="!form.options.with_applicant_signature"></i>
                    </h4>
                </div>
            </div>
        </ap-grid>
        <div class="ap-margin-xsmall-top">
            <small class="ap-text-bold ap-text-danger"
                v-if="hasError('options.with_applicant_signature')">
                <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                {{errors['options.with_applicant_signature'][0]}}
            </small>
        </div>
        
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { Form } from '@/utils';

export default
{
    computed:
    {
        ...mapGetters({
            isLoading: 'companyBeneficiaryDocument/isLoading',
        }),

        errors:
        {
            get()
            {
                return this.$parent.$data.errors;
            },

            set(value)
            {
                this.$parent.$data.errors = value;
            },
        },

        form()
        {
            return this.$parent.$data.form;
        },
    },

    methods:
    {
        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },
    },
};
</script>
