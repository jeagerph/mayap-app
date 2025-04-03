<template>
    <ap-modal
        :isOpen.sync="$parent.$data.updateModal"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Update Assignatory
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
                            :label="'* Name'"
                            :placeholder="'ex. HON. JUAN DELA CRUZ'"
                            v-model="form.name"
                            :error="hasError('name') ? errors.name[0] : ''"/>

                        <ap-input
                            type="text"
                            :required="true"
                            :readonly="isLoading('update')"
                            :label="'* Position'"
                            :placeholder="'ex. BARANGAY CHAIRMAN'"
                            v-model="form.position"
                            :error="hasError('position') ? errors.position[0] : ''"/>

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
                name: '',
                position: '',
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
            assignatory: 'myCompanyAssignatory/selected',
            isLoading: 'myCompanyAssignatory/isLoading',
        }),
    },

    methods:
    {
        ...mapActions({
            update: 'myCompanyAssignatory/update',
        }),

        async submit()
        {
            this.errors = {};
            
            const response = await this.update({
                url: `/my-company/assignatory/${this.assignatory.id}`,
                form: this.form,
            });

            if (response.status === 200)
            {
                this.closeModal();

                Toast.success({
                    message: 'Assignatory has been updated.'
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
            this.form.name = this.assignatory.name;
            this.form.position = this.assignatory.position;
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
        assignatory()
        {
            this.initialize();
        },
    },
};
</script>
