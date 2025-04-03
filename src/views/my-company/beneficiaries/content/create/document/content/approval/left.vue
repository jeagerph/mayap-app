<template>
    <div class="ap-margin-top">
        <p class="ap-text-bold ap-text-primary">
            LEFT APPROVAL
        </p>

        <div class="ap-margin-top">
            <label class="ap-text-bold ap-text-italic ap-form-label"
                :class="{ 'ap-opacity': !form.options.with_left_approval }">
                <input
                    class="ap-checkbox ap-margin-right"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    v-model="form.options.with_left_approval" />
                INCLUDE LEFT APPROVAL
            </label>
            
            <div class="ap-margin-xsmall-top">
                <small class="ap-text-bold ap-text-danger"
                    v-if="hasError('options.with_left_approval')">
                    <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                    {{errors['options.with_left_approval'][0]}}
                </small>
            </div>
        </div>

        <ap-input
            :class="{ 'ap-opacity': !form.options.with_left_approval }"
            type="text"
            :required="form.approvals.left_approval.label"
            :readonly="isLoading('store')"
            :label="'* Approval Label'"
            :placeholder="'ex. Attested By:'"
            v-model="form.approvals.left_approval.label"
            :error="hasError('approvals.left_approval.label') ? errors['approvals.left_approval.label'][0] : ''"/>

        <ap-input
            :class="{ 'ap-opacity': !form.options.with_left_approval }"
            type="text"
            :required="form.approvals.left_approval.name"
            :readonly="isLoading('store')"
            :label="'* Full Name'"
            :placeholder="'ex. JUAN DELA CRUZ'"
            v-model="form.approvals.left_approval.name"
            :error="hasError('approvals.left_approval.name') ? errors['approvals.left_approval.name'][0] : ''"/>
        
        <ap-input
            class="ap-margin-xsmall-top"
            :class="{ 'ap-opacity': !form.options.with_left_approval }"
            type="text"
            :required="form.approvals.left_approval.position"
            :readonly="isLoading('store')"
            :label="'* Position'"
            :placeholder="'ex. ADMIN CLERK'"
            v-model="form.approvals.left_approval.position"
            :error="hasError('approvals.left_approval.position') ? errors['approvals.left_approval.position'][0] : ''"/>

        <div class="ap-margin-small-top">
            <label class="ap-text-bold ap-text-italic ap-form-label"
                :class="{ 'ap-opacity': !form.options.with_left_approval }">
                <input
                    class="ap-checkbox ap-margin-right"
                    
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    v-model="form.options.with_left_approval_signature" />
                INCLUDE APPROVAL SIGNATURE
            </label>
            
            <div class="ap-margin-xsmall-top">
                <small class="ap-text-bold ap-text-danger"
                    v-if="hasError('options.with_left_approval_signature')">
                    <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                    {{errors['options.with_left_approval_signature'][0]}}
                </small>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { Form } from '@/utils';

export default
{
    data()
    {
        return {
            selectedAssignatoryId: '',
        };
    },

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

        openModal(name)
        {
            this.$parent.toggleModal(name, true);
        },
    },
};
</script>
