<template>
    <div class="ap-margin-small-top">

        <p class="ap-text-bold">
            ELEMENTARY / PRIMARY EDUCATION
        </p>

        <ap-grid :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-2-3@m ap-width-2-3@l">
                <ap-input
                    v-if="!isLoading('edit')"
                    type="text"
                    :readonly="isLoading('update')"
                    :label="'School'"
                    :placeholder="'ex. OLONGAPO WESLEY SCHOOL'"
                    v-model="form.primary_school"
                    :error="hasError('primary_school') ? errors.primary_school[0] : ''"/>
                <div v-else>
                    <label class="ap-form-label ap-text-bold">
                        School
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
                    :label="'Year Graduated'"
                    :placeholder="'ex. 2006'"
                    v-model="form.primary_year_graduated"
                    :error="hasError('primary_year_graduated') ? errors.primary_year_graduated[0] : ''"/>
                <div v-else>
                    <label class="ap-form-label ap-text-bold">
                        Year Graduated
                    </label>
                    <ap-placeholder
                        :size="'medium'"/>
                </div>
            </div>
        </ap-grid>

        <p class="ap-text-bold">
            HIGH SCHOOL / SECONDARY EDUCATION
        </p>

        <ap-grid :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-2-3@m ap-width-2-3@l">
                <ap-input
                    v-if="!isLoading('edit')"
                    type="text"
                    :readonly="isLoading('update')"
                    :label="'School'"
                    :placeholder="'ex. OLONGAPO CITY NATIONAL HIGH SCHOOL'"
                    v-model="form.secondary_school"
                    :error="hasError('secondary_school') ? errors.secondary_school[0] : ''"/>
                <div v-else>
                    <label class="ap-form-label ap-text-bold">
                        School
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
                    :label="'Year Graduated'"
                    :placeholder="'ex. 2011'"
                    v-model="form.secondary_year_graduated"
                    :error="hasError('secondary_year_graduated') ? errors.secondary_year_graduated[0] : ''"/>
                <div v-else>
                    <label class="ap-form-label ap-text-bold">
                        Year Graduated
                    </label>
                    <ap-placeholder
                        :size="'medium'"/>
                </div>
            </div>
        </ap-grid>

        <ap-input
            v-if="!isLoading('edit')"
            type="text"
            :readonly="isLoading('update')"
            :label="'Course/Program/Curriculum'"
            :placeholder="'ex. INFORMATION AND COMMUNICATION CURRICULUM'"
            v-model="form.secondary_course"
            :error="hasError('secondary_course') ? errors.secondary_course[0] : ''"/>
        <div v-else>
            <label class="ap-form-label ap-text-bold">
                Course/Program/Curriculum
            </label>
            <ap-placeholder
                :size="'medium'"/>
        </div>

        <p class="ap-text-bold">
            COLLEGE / TERTIARY EDUCATION
        </p>

        <ap-grid :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-2-3@m ap-width-2-3@l">
                <ap-input
                    v-if="!isLoading('edit')"
                    type="text"
                    :readonly="isLoading('update')"
                    :label="'School/Institution'"
                    :placeholder="'ex. GORDON COLLEGE'"
                    v-model="form.tertiary_school"
                    :error="hasError('tertiary_school') ? errors.tertiary_school[0] : ''"/>
                <div v-else>
                    <label class="ap-form-label ap-text-bold">
                        School/Institution
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
                    :label="'Year Graduated'"
                    :placeholder="'ex. 2016'"
                    v-model="form.tertiary_year_graduated"
                    :error="hasError('tertiary_year_graduated') ? errors.tertiary_year_graduated[0] : ''"/>
                <div v-else>
                    <label class="ap-form-label ap-text-bold">
                        Year Graduated
                    </label>
                    <ap-placeholder
                        :size="'medium'"/>
                </div>
            </div>
        </ap-grid>

        <ap-input
            v-if="!isLoading('edit')"
            type="text"
            :readonly="isLoading('update')"
            :label="'Course'"
            :placeholder="'ex. BACHELOR OF SCIENCE IN COMPUTER SCIENCE'"
            v-model="form.tertiary_course"
            :error="hasError('tertiary_course') ? errors.tertiary_course[0] : ''"/>
        <div v-else>
            <label class="ap-form-label ap-text-bold">
                Course
            </label>
            <ap-placeholder
                :size="'medium'"/>
        </div>

        <p class="ap-text-bold">
            VOCATIONAL/MASTERAL/DOCTORATE
        </p>

        <ap-grid :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-2-3@m ap-width-2-3@l">
                <ap-input
                    v-if="!isLoading('edit')"
                    type="text"
                    :readonly="isLoading('update')"
                    :label="'School/Institution'"
                    :placeholder="'ex. GORDON COLLEGE'"
                    v-model="form.other_school"
                    :error="hasError('other_school') ? errors.other_school[0] : ''"/>
                <div v-else>
                    <label class="ap-form-label ap-text-bold">
                        School/Institution
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
                    :label="'Year Graduated'"
                    :placeholder="'ex. 2021'"
                    v-model="form.other_year_graduated"
                    :error="hasError('other_year_graduated') ? errors.other_year_graduated[0] : ''"/>
                <div v-else>
                    <label class="ap-form-label ap-text-bold">
                        Year Graduated
                    </label>
                    <ap-placeholder
                        :size="'medium'"/>
                </div>
            </div>
        </ap-grid>

        <ap-input
            v-if="!isLoading('edit')"
            type="text"
            :readonly="isLoading('update')"
            :label="'Course'"
            :placeholder="'ex. MASTERS IN COMPUTER SCIENCE'"
            v-model="form.other_course"
            :error="hasError('other_course') ? errors.other_course[0] : ''"/>
        <div v-else>
            <label class="ap-form-label ap-text-bold">
                Course
            </label>
            <ap-placeholder
                :size="'medium'"/>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default
{
    computed:
    {
        ...mapGetters({
            form: 'companyBeneficiary/editForm',
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
