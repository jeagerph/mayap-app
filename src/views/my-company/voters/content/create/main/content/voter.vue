<template>
    <div class="ap-margin-top">

        <ap-input
            type="text"
            :readonly="isLoading('store')"
            :label="'Precinct No.'"
            :placeholder="'ex. XXXX XXXX XXXX'"
            v-model="form.precinct_no"
            :error="hasError('precinct_no') ? errors.precinct_no[0] : ''"/>

        <ap-grid :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                <ap-input
                    type="text"
                    :readonly="isLoading('store')"
                    :label="'Application No.'"
                    :placeholder="'ex. XXXX XXXX XXXX'"
                    v-model="form.application_no"
                    :error="hasError('application_no') ? errors.application_no[0] : ''"/>
            </div>
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                <ap-input
                    type="date"
                    :readonly="isLoading('store')"
                    :label="'Application Date'"
                    v-model="form.application_date"
                    :error="hasError('application_date') ? errors.application_date[0] : ''"/>
            </div>
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                <ap-input
                    type="text"
                    :readonly="isLoading('store')"
                    :label="'Application Type'"
                    :placeholder="'ex. XXXX XXXX XXXX'"
                    v-model="form.application_type"
                    :error="hasError('application_type') ? errors.application_type[0] : ''"/>
            </div>
        </ap-grid>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default
{
    computed:
    {
        ...mapGetters({
            isLoading: 'companyVoter/isLoading',
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
