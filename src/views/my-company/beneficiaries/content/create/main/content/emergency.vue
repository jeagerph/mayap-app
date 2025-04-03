<template>
    <div class="ap-margin-small-top">

        <ap-grid :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-2-3@m ap-width-2-3@l">
                <ap-input
                    type="text"
                    :readonly="isLoading('store')"
                    :label="'Full Name'"
                    :placeholder="'ex. JUAN DELA CRUZ'"
                    v-model="form.emergency_contact_name"
                    :error="hasError('emergency_contact_name') ? errors.emergency_contact_name[0] : ''"/>
            </div>
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                <ap-input
                    type="text"
                    :readonly="isLoading('store')"
                    :label="'Contact No'"
                    :placeholder="'ex. 09XX XXX XXXX'"
                    v-model="form.emergency_contact_no"
                    :error="hasError('emergency_contact_no') ? errors.emergency_contact_no[0] : ''"/>
            </div>
        </ap-grid>

        <ap-input
            class="ap-margin-small-top"
            type="text"
            :readonly="isLoading('store')"
            :label="'Address'"
            :placeholder="'ex. #10 Aguinaldo St., East Tapinac, Olongapo City'"
            v-model="form.emergency_contact_address"
            :error="hasError('emergency_contact_address') ? errors.emergency_contact_address[0] : ''"/>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default
{
    computed:
    {
        ...mapGetters({
            isLoading: 'companyBeneficiary/isLoading',
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
            return this.$parent.hasError(name);
        },
    },
};
</script>
