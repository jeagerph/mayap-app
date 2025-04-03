<template>
    <div class="ap-margin-top">

        <ap-input
            type="text"
            :required="true"
            :readonly="isLoading('store')"
            :label="'* First Name'"
            :placeholder="'ex. JUAN'"
            v-model="form.first_name"
            :error="hasError('first_name') ? errors.first_name[0] : ''"/>

        <ap-input
            type="text"
            :readonly="isLoading('store')"
            :label="'Middle Name'"
            :placeholder="'ex. SANTIAGO'"
            v-model="form.middle_name"
            :error="hasError('middle_name') ? errors.middle_name[0] : ''"/>

        <ap-input
            type="text"
            :required="true"
            :readonly="isLoading('store')"
            :label="'* Last Name'"
            :placeholder="'ex. DELA CRUZ SR.'"
            v-model="form.last_name"
            :error="hasError('last_name') ? errors.last_name[0] : ''"/>

        <div class="ap-margin-top">
            <label class="ap-text-bold ap-form-label"
                :class="{ 'ap-text-danger': hasError('gender')}">
                * Gender
            </label>

            <select
                class="ap-select"
                :required="true"
                v-model="form.gender"
                :readonly="isLoading('store')">
                <option :value="''" disabled>-- select gender --</option>
                <option :value="1">MALE</option>
                <option :value="2">FEMALE</option>
            </select>

            <small class="ap-text-bold ap-text-danger"
                v-if="hasError('gender')">
                <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                {{errors.gender[0]}}
            </small>
        </div>

        <ap-input
            type="date"
            :required="true"
            :readonly="isLoading('store')"
            :label="'* Date of Birth'"
            :placeholder="'ex. Olongapo City'"
            v-model="form.date_of_birth"
            :error="hasError('date_of_birth') ? errors.date_of_birth[0] : ''"/>

        <div class="ap-margin-top">

            <div v-if="checked">
                <div v-if="hasVoter">
                    <small class="ap-text-italic ap-text-bold ap-text-danger">
                        <i class="lni lni-flag-alt ap-margin-xsmall-right"></i>
                        Existing record found in database
                    </small>
                    <div class="vh-margin-top">
                        <h5 class="ap-margin-remove ap-point">
                            {{fullName}}
                        </h5>
                        <p class="ap-margin-remove">
                            {{voter.code}}
                            &middot;
                            {{voter.gender.name}}
                            &middot;
                            {{age}} yrs old
                        </p>
                    </div>

                    <div class="ap-text-center">
                        <a class="ap-button ap-button-outline ap-button-outline-default ap-button-small ap-button-full-rounded"
                            :href="`/company/voters/${voter.slug.code}`">
                            SEE VOTER
                        </a>
                    </div>
                    
                    <hr>

                </div>
                <div v-else>
                    <small class="ap-text-italic ap-text-bold ap-text-success">
                        <i class="lni lni-checkmark ap-margin-xsmall-right"></i>
                        No existing record in database. You may now continue to the next form.
                    </small>
                </div>
            </div>

            <div class="ap-text-center ap-margin-top">
                <div>
                    <small class="ap-text-italic">
                        <span class="ap-text-bold">IMPORTANT:</span> Make sure to check if voter already exists on our database to avoid duplication.
                    </small>
                </div>
                
                <ap-button
                    class="ap-margin-small-top"
                    type="button"
                    :color="'success'"
                    :size="'small'"
                    :outline="true"
                    :loading="checkLoading"
                    @click="check()">
                    CHECK DATABASE
                </ap-button>
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
    data()
    {
        return {
            checkLoading: false,
            checked: false,

            voter: {},
        };
    },

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

        hasVoter()
        {
            return Object.keys(this.voter).length > 0;
        },

        fullName()
        {
            return `${this.voter.full_name}`;
        },

        age()
        {
            return Dater.age(this.voter.date_of_birth);
        },
    },

    methods:
    {
        async check()
        {
            this.errors = {};

            this.initialize();

            if (!this.form.first_name) return this.$parent.$data.errors.first_name = ['Please fill-out this required field.'];

            if (!this.form.last_name) return this.$parent.$data.errors.last_name = ['Please fill-out this required field.'];

            if (!this.form.date_of_birth) return this.$parent.$data.errors.date_of_birth = ['Please fill-out this required field.'];

            this.checkLoading = true;

            const response = await Http.post(
                `/my-company/voter/check`,
                {
                    first_name: this.form.first_name,
                    middle_name: this.form.middle_name,
                    last_name: this.form.last_name,
                    date_of_birth: this.form.date_of_birth,
                }
            );

            this.checkLoading = false;

            if (response.status == 200)
            {
                this.voter = response.data;

                this.checked = true;
            }
            else if (response.status == 422)
            {
                this.errors = response.data.errors;
            }
        },

        initialize()
        {
            this.checked = false;
            this.voter = {};
        },

        hasError(name = null)
        {
            return this.$parent.hasError(name);
        },
    },
};
</script>
