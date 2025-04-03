<template>
    <div class="ap-margin-medium-top">
        <p class="ap-text-bold ap-text-primary">
            RIGHT APPROVAL
        </p>

        <div class="ap-margin-top">
            <label class="ap-text-bold ap-text-italic ap-form-label"
                :class="{ 'ap-opacity': !form.options.with_right_approval }">
                <input
                    class="ap-checkbox ap-margin-right"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    v-model="form.options.with_right_approval" />
                INCLUDE RIGHT APPROVAL
            </label>
            
            <div class="ap-margin-xsmall-top">
                <small class="ap-text-bold ap-text-danger"
                    v-if="hasError('options.with_right_approval')">
                    <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                    {{errors['options.with_right_approval'][0]}}
                </small>
            </div>
        </div>

        <ap-input
            :class="{ 'ap-opacity': !form.options.with_right_approval }"
            type="text"
            :required="form.approvals.right_approval.label"
            :readonly="isLoading('store')"
            :label="'* Approval Label'"
            :placeholder="'ex. Approved By:'"
            v-model="form.approvals.right_approval.label"
            :error="hasError('approvals.right_approval.label') ? errors['approvals.right_approval.label'][0] : ''"/>

        <ap-input
            :class="{ 'ap-opacity': !form.options.with_right_approval }"
            type="text"
            :required="form.approvals.right_approval.name"
            :readonly="isLoading('store')"
            :label="'* Full Name'"
            :placeholder="'ex. HON. JUAN DELA CRUZ'"
            v-model="form.approvals.right_approval.name"
            :error="hasError('approvals.right_approval.name') ? errors['approvals.right_approval.name'][0] : ''"/>
        
        <ap-input
            class="ap-margin-xsmall-top"
            :class="{ 'ap-opacity': !form.options.with_right_approval }"
            type="text"
            :required="form.approvals.right_approval.position"
            :readonly="isLoading('store')"
            :label="'* Position'"
            :placeholder="'ex. PUNONG BARANGAY'"
            v-model="form.approvals.right_approval.position"
            :error="hasError('approvals.right_approval.position') ? errors['approvals.right_approval.position'][0] : ''"/>

        <div class="ap-margin-small-top">
            <label class="ap-text-bold ap-text-italic ap-form-label"
                :class="{ 'ap-opacity': !form.options.with_right_approval }">
                <input
                    class="ap-checkbox ap-margin-right"
                    
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    v-model="form.options.with_right_approval_signature" />
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
        openModal(name)
        {
            this.$parent.toggleModal(name, true);
        },
        
        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },
    },
};
</script>
