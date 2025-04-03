<template>
    <ap-modal
        :isOpen.sync="$parent.$data.logoutModal"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Are you sure?
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">
                <p>
                    You are about to logout your account.
                </p>

                <p>Do you want to continue?</p>

                <div class="ap-margin ap-text-right">
                    <ap-button
                        v-if="!isLoading('signout')"
                        type="button"
                        class="ap-margin-small-right"
                        :outline="true"
                        @click="closeModal()">
                        Cancel
                    </ap-button>
                    <ap-button
                        type="button"
                        @click="submit()"
                        :color="'primary'"
                        :outline="false"
                        :loading="isLoading('signout')">
                        Yes
                    </ap-button>
                </div>
            </div>
        </ap-modal-body>
    </ap-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { Form, Toast } from '@/utils';


export default
{
    data()
    {
        return {
            errors: {},

            submitLoading: false,
        };
    },

    computed:
    {
        ...mapGetters({
            isLoading: 'auth/isLoading',
        }),
        
    },

    methods:
    {
        ...mapActions({
            signout: 'auth/signout',
        }),

        async submit()
        {
            this.errors = {};
            
            const response = await this.signout();

            if (response.status === 200)
            {

                const localhost = 'http://localhost:8000';

                window.location.href = window.location.href.includes('localhost') ? `${localhost}/signin` : process.env.APP_WEB_URL;

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

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },

        closeModal()
        {
            this.$parent.toggleModal('logout', false);
        },
    },
};
</script>
