<template>
    <ap-modal
        :isOpen.sync="$parent.$data.updateModal"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Update Profile
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">
                <form class="ap-form-stacked"
                    @submit.prevent="submit()">
                    <fieldset class="ap-fieldset">

                        <ap-input
                            type="text"
                            :readonly="submitLoading"
                            :label="'* Display Name'"
                            :placeholder="'ex. COMPANY'"
                            v-model="form.name"
                            :error="hasError('name') ? errors.name[0] : ''"/>

                        <ap-input
                            type="text"
                            :readonly="submitLoading"
                            :label="'* Address'"
                            :placeholder="'ex. ADDRESS'"
                            v-model="form.address"
                            :error="hasError('address') ? errors.address[0] : ''"/>

                        <ap-input
                            type="text"
                            :readonly="submitLoading"
                            :label="'* Contact No.'"
                            :placeholder="'ex. 09XX XXXX XXXX'"
                            v-model="form.contact_no"
                            :error="hasError('contact_no') ? errors.contact_no[0] : ''"/>

                    </fieldset>

                    
                    <div class="ap-margin ap-text-right">
                        <ap-button
                            v-if="!submitLoading"
                            type="button"
                            class="ap-margin-small-right"
                            @click="closeModal()">
                            Cancel
                        </ap-button>
                        <ap-button
                            type="submit"
                            :color="'primary'"
                            :outline="false"
                            :loading="submitLoading">
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

import Http from '@/services';

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
                address: '',
                contact_no: '',
            },

            submitLoading: false,
        };
    },

    created()
    {
        this.initialize();
    },

    computed:
    {
        ...mapGetters({
            profile: 'myCompany/profile',
            isLoading: 'myCompany/isLoading',
        }),
    },

    methods:
    {
        ...mapActions({
            update: 'myCompany/update',
        }),

        async submit()
        {
            this.errors = {};

            this.submitLoading = true;
            
            const response = await Http.put(
                `/my-company/profile`,
                this.form,
            );

            this.submitLoading = false;

            if (response.status === 200)
            {
                this.profile.name = response.data.name;
                this.profile.address = response.data.address;
                this.profile.contact_no = response.data.contact_no;

                this.closeModal();

                Toast.success({
                    message: 'Profile has been updated.'
                });
            }
            else if (response.status === 422)
            {
                this.errors = response.data.errors;

                Toast.error({
                    message: 'Kindly double check your form.'
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
            this.form.name = this.profile.name;
            this.form.address = this.profile.address;
            this.form.contact_no = this.profile.contact_no;
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
        profile()
        {
            this.initialize();
        },
    },
};
</script>
