<template>
    <div class="ap-margin-top">

        <ap-input
            v-if="!isLoading('edit')"
            type="text"
            :required="true"
            :readonly="isLoading('update')"
            :label="'* First Name'"
            :placeholder="'ex. JUAN'"
            v-model="form.first_name"
            :error="hasError('first_name') ? errors.first_name[0] : ''"/>
        <div class="ap-margin-top" v-else>
            <label class="ap-form-label ap-text-bold">
                * First Name
            </label>
            <ap-placeholder
                :size="'medium'"/>
        </div>

        <ap-input
            v-if="!isLoading('edit')"
            type="text"
            :readonly="isLoading('update')"
            :label="'Middle Name'"
            :placeholder="'ex. SANTIAGO'"
            v-model="form.middle_name"
            :error="hasError('middle_name') ? errors.middle_name[0] : ''"/>
        <div class="ap-margin-top" v-else>
            <label class="ap-form-label ap-text-bold">
                Middle Name
            </label>
            <ap-placeholder
                :size="'medium'"/>
        </div>

        <ap-input
            v-if="!isLoading('edit')"
            type="text"
            :required="true"
            :readonly="isLoading('update')"
            :label="'* Last Name'"
            :placeholder="'ex. DELA CRUZ SR.'"
            v-model="form.last_name"
            :error="hasError('last_name') ? errors.last_name[0] : ''"/>
        <div class="ap-margin-top" v-else>
            <label class="ap-form-label ap-text-bold">
                * Last Name
            </label>
            <ap-placeholder
                :size="'medium'"/>
        </div>

        <div class="ap-margin">
            <label class="ap-text-bold ap-form-label"
                :class="{ 'ap-text-danger': hasError('gender')}">
                * Gender
            </label>

            <select
                v-if="!isLoading('edit')"
                class="ap-select"
                :required="true"
                v-model="form.gender"
                :readonly="isLoading('update')">
                <option :value="''" disabled>-- select gender --</option>
                <option :value="1">MALE</option>
                <option :value="2">FEMALE</option>
            </select>
            <ap-placeholder
                v-else
                :size="'medium'"/>

            <small class="ap-text-bold ap-text-danger"
                v-if="hasError('gender')">
                <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                {{errors.gender[0]}}
            </small>
        </div>

        <div>
            <ap-input
                v-if="!isLoading('edit')"
                type="date"
                :required="true"
                :readonly="isLoading('update')"
                :label="'* Date of Birth'"
                :placeholder="'ex. Olongapo City'"
                v-model="form.date_of_birth"
                :error="hasError('date_of_birth') ? errors.date_of_birth[0] : ''"/>
            <div class="ap-margin-top" v-else>
                <label class="ap-form-label ap-text-bold">
                    * Date of Birth
                </label>
                <ap-placeholder
                    :size="'medium'"/>
            </div>
        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Http from '@/services';

import { Dater } from '@/utils';

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
