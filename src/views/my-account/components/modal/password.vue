<template>
    <ap-modal
        :isOpen.sync="$parent.$data.updatePasswordModal"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Change Password
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">
                <form class="ap-form-stacked" @submit.prevent="submit()">
                    <fieldset class="ap-fieldset">

                    <ap-input
                        type="password"
                        :required="true"
                        :readonly="isLoading('update')"
                        :label="'* Current Password'"
                        v-model="form.old_password"
                        placeholder="Your old password"
                        :error="hasError('old_password') ? errors.old_password[0] : ''"/>

                    <ap-input
                        type="password"
                        :required="true"
                        :readonly="isLoading('update')"
                        :label="'* New Password'"
                        v-model="form.password"
                        placeholder="Your new password"
                        :error="hasError('password') ? errors.password[0] : ''"/>

                    <ap-input
                        type="password"
                        :required="true"
                        :readonly="isLoading('update')"
                        :label="'* Confirm Password'"
                        v-model="form.password_confirmation"
                        placeholder="confirm password"
                        :error="hasError('password_confirmation') ? errors.password_confirmation[0] : ''"/>

                    </fieldset>

                    
                    <div class="ap-margin ap-text-right">
                        <ap-button
                            v-if="!isLoading('update')"
                            type="button"
                            class="ap-margin-small-right"
                            :rounded="true"
                            @click="closeModal()">
                            Cancel
                        </ap-button>
                        <ap-button
                            type="submit"
                            :color="'primary'"
                            :outline="false"
                            :loading="isLoading('update')"
                            >Submit
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
                old_password: '',
                password: '',
                password_confirmation: '',
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
            update: 'auth/updatePassword',
        }),

        async submit()
        {
            this.errors = {};
            
            const response = await this.update({
                url: '/my-account/password',
                form: this.form,
            });

            if (response.status === 200)
            {
                this.initialize();

                this.closeModal();

                Toast.success({
                    message: 'Passwor has been updated.'
                });
            }
            else if (response.status === 422)
            {
                this.errors = response.data.errors;

                this.form.password_confirmation = '';

                this.form.password = '';
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
            this.form.old_password = '';
            this.form.password = '';
            this.form.password_confirmation = '';
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },

        closeModal()
        {
            this.$parent.toggleModal('updatePassword', false);
        },
    },
};
</script>
