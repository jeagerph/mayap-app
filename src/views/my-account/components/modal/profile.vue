<template>
    <ap-modal
        :isOpen.sync="$parent.$data.updateModal"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Update My Account
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
                        :label="'* Username'"
                        v-model="form.username"
                        placeholder="ex: sysadmin"
                        :error="hasError('username') ? errors.username[0] : ''"/>

                    <ap-input
                        type="text"
                        :required="true"
                        :readonly="isLoading('update')"
                        :label="'* Full Name'"
                        v-model="form.full_name"
                        placeholder="ex: Juan Dela Cruz"
                        :error="hasError('full_name') ? errors.full_name[0] : ''"/>

                    <ap-input
                        type="text"
                        :readonly="isLoading('update')"
                        :label="'Mobile Number'"
                        v-model="form.mobile_number"
                        placeholder="ex: 09991239876"
                        :error="hasError('mobile_number') ? errors.mobile_number[0] : ''"/>

                    <ap-input
                        type="text"
                        :readonly="isLoading('update')"
                        :label="'E-mail'"
                        v-model="form.email"
                        placeholder="ex: juan.delacruz@email.com"
                        :error="hasError('email') ? errors.email[0] : ''"/>

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
                username: '',
                full_name: '',
                email: '',
                mobile_number: '',
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
            accessUser: 'auth/accessUser',
            isLoading: 'auth/isLoading',
        }),
    },

    methods:
    {
        ...mapActions({
            update: 'auth/update',
        }),

        async submit()
        {
            this.errors = {};
            
            const response = await this.update({
                url: '/my-account',
                form: this.form,
            });

            if (response.status === 200)
            {
                this.closeModal();

                Toast.success({
                    message: 'Account has been updated.'
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
            this.form.username = this.accessUser.user.username;
            this.form.full_name = this.accessUser.full_name;
            this.form.email = this.accessUser.email;
            this.form.mobile_number = this.accessUser.mobile_number;
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
};
</script>
