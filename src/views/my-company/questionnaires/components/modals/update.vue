<template>
    <ap-modal
        :isOpen.sync="$parent.$data.updateModal"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Update Questionnaire
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">
                <form class="ap-form-stacked"
                    @submit.prevent="submit()">
                    <fieldset class="ap-fieldset">

                        <ap-input
                            type="text"
                            :required="true"
                            :readonly="isLoading('update')"
                            :label="'* Question'"
                            :placeholder="'ex. Ilan kayo sa pamilya?'"
                            v-model="form.question"
                            :error="hasError('question') ? errors.question[0] : ''"/>

                        <div class="ap-margin-small-top">

                            <label class="ap-text-bold ap-form-label">
                                Description
                            </label>
                            <textarea
                                cols="30"
                                rows="2"
                                class="ap-textarea ap-textarea-message"
                                placeholder="type any here . . ."
                                v-model="form.description">
                            </textarea>

                            <small class="ap-text-bold ap-text-danger"
                                v-if="hasError('description')">
                                <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                                {{errors.description[0]}}
                            </small>
                        </div>

                    </fieldset>

                    
                    <div class="ap-margin ap-text-right">
                        <ap-button
                            v-if="!isLoading('update')"
                            type="button"
                            class="ap-margin-small-right"
                            @click="closeModal()">
                            Cancel
                        </ap-button>
                        <ap-button
                            type="submit"
                            :color="'primary'"
                            :outline="false"
                            :loading="isLoading('update')">
                            Submit
                        </ap-button>
                    </div>
                </form>
            </div>
        </ap-modal-body>
    </ap-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { Form, Toast } from '@/utils';

export default
{
    data()
    {
        return {
            errors: {},

            form:
            {
                question: '',
                description: '',
            },
        };
    },

    created()
    {
        this.initialize();
    },

    computed:
    {
        ...mapGetters({
            questionnaire: 'myCompanyQuestionnaire/selected',
            isLoading: 'myCompanyQuestionnaire/isLoading',
        }),
    },

    methods:
    {
        ...mapActions({
            update: 'myCompanyQuestionnaire/update',
        }),

        async submit()
        {
            this.errors = {};
            
            const response = await this.update({
                url: `/my-company/questionnaire/${this.questionnaire.id}`,
                form: this.form,
            });

            if (response.status === 200)
            {
                this.closeModal();

                Toast.success({
                    message: 'Questionnaire has been updated.'
                });
            }
            else if (response.status === 422)
            {
                this.errors = response.data.errors;

                Toast.error({
                    message: 'Form validation. Please double check your form.',
                });
            }
            else if (response.status === 403)
            {
                let message = 'Sorry, you cannot perform this action.';

                Toast.error({
                    message: response.data.error.description
                        ? response.data.error.description
                        : message,
                });
            }
            else if (response.status === 404)
            {
                let message = 'Data not found. Please try again.';

                Toast.error({
                    message: response.data.error.description
                        ? response.data.error.description
                        : message,
                });
            }
            else
            {
                let message = 'Something went wrong. Please try again.';

                Toast.error({
                    message: response.data.error.description
                        ? response.data.error.description
                        : message,
                });
            }
        },

        initialize()
        {
            this.form.question = this.questionnaire.question;
            this.form.description = this.questionnaire.description;
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },

        closeModal()
        {
            this.$parent.toggleModal('update', false);
        },
    },

    watch:
    {
        questionnaire()
        {
            this.initialize();
        },
    },
};
</script>
