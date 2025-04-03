<template>
    <div class="ap-margin-auto ap-width-xxlarge ap-margin-top">
        <div class="card card-body ap-padding border-top border-primary border-0 border-4">
            <div>
                <label >Fill-out the form appropriately.</label>
            </div>
            
            <form class="ap-form-stacked ap-margin-top"
                @submit.prevent="submit()">
                <fieldset class="ap-fieldset">
                    
                    

                    <div class="ap-margin-top">
                        <p class="ap-text-bold ap-margin-remove ap-text-primary">
                            ACCOUNT PROFILE
                        </p>

                        <hr>

                        <ap-input
                            type="text"
                            :required="true"
                            :readonly="isLoading('store')"
                            :label="'* Full Name'"
                            v-model="form.full_name"
                            placeholder="ex: Juan Dela Cruz"
                            :error="hasError('full_name') ? errors.full_name[0] : ''"/>

                        <ap-grid :gutter="'small'">
                            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">

                                <ap-input
                                    type="text"
                                    :readonly="isLoading('store')"
                                    :label="'Mobile Number'"
                                    v-model="form.mobile_number"
                                    placeholder="ex: 09991239876"
                                    :error="hasError('mobile_number') ? errors.mobile_number[0] : ''"/>

                            </div>
                            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">

                                <ap-input
                                    type="text"
                                    :readonly="isLoading('store')"
                                    :label="'E-mail'"
                                    v-model="form.email"
                                    placeholder="ex: juan.delacruz@email.com"
                                    :error="hasError('email') ? errors.email[0] : ''"/>

                            </div>
                        </ap-grid>

                        <div>
                        <p class="ap-text-bold ap-margin-remove ap-text-primary">
                            SYSTEM ACCOUNT
                        </p>

                        <hr>

                        <ap-grid :gutter="'small'"
                            class="ap-margin-top">
                            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                                <ap-input
                                    type="text"
                                    :required="true"
                                    :readonly="isLoading('store')"
                                    :label="'* Username'"
                                    v-model="form.username"
                                    placeholder="ex: jde001"
                                    :error="hasError('username') ? errors.username[0] : ''"/>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                                <ap-input
                                    type="text"
                                    :readonly="true"
                                    :disabled="true"
                                    :label="'Default Password'"
                                    :value="`@${form.username}`"/>
                            </div>
                        </ap-grid>
                    </div>
                    </div>

                </fieldset>

                
                <div class="ap-margin ap-text-right">
                    <router-link
                        v-if="!isLoading('store')"
                        class="ap-button ap-button-default ap-button-full-rounded ap-margin-small-right"
                        to="/administration/accounts">
                        Cancel
                    </router-link>
                    <ap-button
                        type="submit"
                        :color="'primary'"
                        :rounded="true"
                        :loading="isLoading('store')">
                        Submit
                    </ap-button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { Form, Toast } from '@/utils';

export default
{
    name: 'Main',

    data()
    {
        return {
            errors: {},

            form:
            {
                account_type: 1,
                username: '',
                full_name: '',
                email: '',
                mobile_number: '',
            },
        };
    },

    created()
    {
        window.scrollTo(0,0);
    },

    computed:
    {
        ...mapGetters({
            isLoading: 'adminAccount/isLoading',
            types: 'adminAccount/types',
        }),
    },

    methods:
    {
        ...mapActions({
            store: 'adminAccount/store',
            loadPrerequisite: 'adminAccount/loadPrerequisite',
        }),

        async submit()
        {
            this.errors = {};
            
            const response = await this.store({
                url: '/administration/account',
                form: this.form,
            });

            if (response.status === 201)
            {
                Toast.success({
                    message: 'Account has been created.'
                });

                this.$router.push(`/administration/accounts/${response.data.slug.code}`);
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
}
</script>
