<template>
    <div class="ap-margin-top">

        <ap-input
            v-if="!isLoading('edit')"
            type="text"
            :readonly="isLoading('update')"
            :label="'Precinct No.'"
            :placeholder="'ex. XXXX XXXX XXXX'"
            v-model="form.precinct_no"
            :error="hasError('precinct_no') ? errors.precinct_no[0] : ''"/>
        <div class="ap-margin-top" v-else>
            <label class="ap-form-label ap-text-bold">
                Precinct No.
            </label>
            <ap-placeholder
                :size="'medium'"/>
        </div>

        <ap-grid :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                <ap-input
                    v-if="!isLoading('edit')"
                    type="text"
                    :readonly="isLoading('update')"
                    :label="'Application No.'"
                    :placeholder="'ex. XXXX XXXX XXXX'"
                    v-model="form.application_no"
                    :error="hasError('application_no') ? errors.application_no[0] : ''"/>
                <div class="ap-margin-top" v-else>
                    <label class="ap-form-label ap-text-bold">
                        Precinct No.
                    </label>
                    <ap-placeholder
                        :size="'medium'"/>
                </div>
            </div>
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                <ap-input
                    v-if="!isLoading('edit')"
                    type="date"
                    :readonly="isLoading('update')"
                    :label="'Application Date'"
                    v-model="form.application_date"
                    :error="hasError('application_date') ? errors.application_date[0] : ''"/>
                <div class="ap-margin-top" v-else>
                    <label class="ap-form-label ap-text-bold">
                        Application Date
                    </label>
                    <ap-placeholder
                        :size="'medium'"/>
                </div>
            </div>
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                <ap-input
                    v-if="!isLoading('edit')"
                    type="text"
                    :readonly="isLoading('update')"
                    :label="'Application Type'"
                    :placeholder="'ex. XXXX XXXX XXXX'"
                    v-model="form.application_type"
                    :error="hasError('application_type') ? errors.application_type[0] : ''"/>
                <div class="ap-margin-top" v-else>
                    <label class="ap-form-label ap-text-bold">
                        Application Type
                    </label>
                    <ap-placeholder
                        :size="'medium'"/>
                </div>
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
            form: 'companyVoter/editForm',
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
