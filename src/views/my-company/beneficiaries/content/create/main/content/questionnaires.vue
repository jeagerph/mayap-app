<template>
    <div class="ap-margin-small-top">

        <ul class="ap-list"
            v-if="form.questionnaires.length">

            <questionnaire-item-component
                v-for="(item, index) in form.questionnaires"
                :key="index"
                :item="item" />

        </ul>

        <div class="ap-card ap-card-body ap-card-default ap-card-small ap-text-center"
            v-else>
            <h5>
                no questionnaires available
            </h5>
        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import QuestionnaireItemComponent from './questionnaire-item';

export default
{
    components:
    {
        QuestionnaireItemComponent
    },

    computed:
    {
        ...mapGetters({
            questionnaires: 'companyBeneficiary/questionnaires',
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
