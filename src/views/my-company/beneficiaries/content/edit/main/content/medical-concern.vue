<template>
    <div class="ap-margin-small-top">

        <div class="ap-margin-top">

            <label class="ap-text-bold ap-form-label">
                Health Issues/Illness
            </label>
            <textarea
                cols="30"
                rows="5"
                class="ap-textarea ap-textarea-message"
                placeholder="type any here . . ."
                v-model="form.health_issues">
            </textarea>

            <small class="ap-text-bold ap-text-danger"
                v-if="hasError('health_issues')">
                <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                {{errors.health_issues[0]}}
            </small>
        </div>

        <div class="ap-margin-top">

            <label class="ap-text-bold ap-form-label">
                Problem Presented
            </label>
            <textarea
                cols="30"
                rows="5"
                class="ap-textarea ap-textarea-message"
                placeholder="type any here . . ."
                v-model="form.problem_presented">
            </textarea>

            <small class="ap-text-bold ap-text-danger"
                v-if="hasError('problem_presented')">
                <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                {{errors.problem_presented[0]}}
            </small>
        </div>

        <div class="ap-margin-top">

            <label class="ap-text-bold ap-form-label">
                Findings
            </label>
            <textarea
                cols="30"
                rows="5"
                class="ap-textarea ap-textarea-message"
                placeholder="type any here . . ."
                v-model="form.findings">
            </textarea>

            <small class="ap-text-bold ap-text-danger"
                v-if="hasError('findings')">
                <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                {{errors.findings[0]}}
            </small>
        </div>

        <div class="ap-margin-top">

            <label class="ap-text-bold ap-form-label">
                Assessment & Recommendation
            </label>
            <textarea
                cols="30"
                rows="5"
                class="ap-textarea ap-textarea-message"
                placeholder="type any here . . ."
                v-model="form.assessment_recommendation">
            </textarea>

            <small class="ap-text-bold ap-text-danger"
                v-if="hasError('assessment_recommendation')">
                <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                {{errors.assessment_recommendation[0]}}
            </small>
        </div>

        <div class="ap-margin-top">

            <label class="ap-text-bold ap-form-label">
                Medicine/Other Needs
            </label>
            <textarea
                cols="30"
                rows="5"
                class="ap-textarea ap-textarea-message"
                placeholder="type any here . . ."
                v-model="form.needs">
            </textarea>

            <small class="ap-text-bold ap-text-danger"
                v-if="hasError('needs')">
                <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                {{errors.needs[0]}}
            </small>
        </div>

        <div class="ap-margin-top">

            <label class="ap-text-bold ap-form-label">
                Other Remarks
            </label>
            <textarea
                cols="30"
                rows="5"
                class="ap-textarea ap-textarea-message"
                placeholder="type any here . . ."
                v-model="form.remarks">
            </textarea>

            <small class="ap-text-bold ap-text-danger"
                v-if="hasError('remarks')">
                <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                {{errors.remarks[0]}}
            </small>
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
