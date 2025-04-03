<template>
    <div class="ap-margin-small-top">

        <div v-if="!isLoading('edit')">
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
