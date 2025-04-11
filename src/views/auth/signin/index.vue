<template>
    <div>
        <ap-grid
            :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l"></div>
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                <div class="card alert">
                    <div class="card-header ap-text-center">
                        <h3 class="ap-text-bold">Welcome</h3>
                    </div>

                    <div class="card-body ap-margin-top">
                        <div class="horizontal-form">
                            <form class="ap-form-stacked ap-margin-top"
                                @submit.prevent="submit()">
                                <fieldset class="ap-fieldset">

                                    <ap-input
                                        type="text"
                                        :required="true"
                                        :readonly="isLoading('signin')"
                                        v-model="form.username"
                                        placeholder="Username"
                                        :error="hasError('username') ? errors.username[0] : ''"/>

                                    <ap-input
                                        type="password"
                                        :required="true"
                                        :readonly="isLoading('signin')"
                                        v-model="form.password"
                                        placeholder="Password"
                                        :error="hasError('password') ? errors.password[0] : ''"/>

                                </fieldset>

                                <div class="ap-margin ap-text-right">
                                    <ap-button
                                        type="submit"
                                        :color="'primary'"
                                        :rounded="true"
                                        :loading="isLoading('signin')">
                                        Signin
                                    </ap-button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l"></div>
        </ap-grid>
    </div>
</template>

<script>
import Http from '@/services';

import { Form, Toast } from '@/utils';
import { mapActions, mapGetters } from 'vuex';

export default
{
    name: 'Signin',
    mounted() {
      const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);

      if (!isLocalhost) {
        window.location.href = 'https://mayap.ph';
      }
    },
    data()
    {
        return {
            errors: {},

            form:
            {
                username: '',
                password: '',
            },

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
            signin: 'auth/signin',
        }),

        async submit()
        {
            this.errors = {};

            const response = await this.signin({
                form: this.form
            });

            if (response.status === 200)
            {
                this.$router.push(`/dashboard`);
            }
            else if (response.status === 422)
            {
                this.errors = response.data.errors;
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

    },
};
</script>
