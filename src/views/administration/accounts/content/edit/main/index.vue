<template>
    <div class="ap-margin-auto ap-width-xxlarge ap-margin-top">
        <div class="card card-body ap-padding border-top border-primary border-0 border-4">
            <div>
                <label>Fill-out the form appropriately.</label>
            </div>
            
            <form class="ap-form-stacked ap-margin-top"
                @submit.prevent="submit()">
                <fieldset class="ap-fieldset">

                    <div class="ap-margin-top">
                        <label class="ap-text-bold ap-text-primary">
                            Account Profile
                        </label>

                        <ap-input
                            v-if="!isLoading('edit')"
                            class="ap-margin-small-top"
                            type="text"
                            :required="true"
                            :readonly="isLoading('update')"
                            :label="'* Full Name'"
                            v-model="form.full_name"
                            placeholder="ex: Juan Dela Cruz"
                            :error="hasError('full_name') ? errors.full_name[0] : ''"/>
                        
                        <div v-else>
                            <label class="ap-form-label ap-text-bold">
                                * Full Name
                            </label>
                            <ap-placeholder
                                :size="'medium'"/>
                        </div>

                    </div>
                        
                    <ap-grid :gutter="'small'"
                        class="ap-margin-top">
                        <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                            <ap-input
                                v-if="!isLoading('edit')"
                                type="text"
                                :readonly="isLoading('update')"
                                :label="'Mobile Number'"
                                v-model="form.mobile_number"
                                placeholder="ex: 09991239876"
                                :error="hasError('mobile_number') ? errors.mobile_number[0] : ''"/>
                            <div v-else>
                                <label class="ap-form-label ap-text-bold">
                                    Mobile Number
                                </label>
                                <ap-placeholder
                                    :size="'medium'"/>
                            </div>
                        </div>
                        <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                            <ap-input
                                v-if="!isLoading('edit')"
                                type="text"
                                :readonly="isLoading('update')"
                                :label="'E-mail'"
                                v-model="form.email"
                                placeholder="ex: juan.delacruz@email.com"
                                :error="hasError('email') ? errors.email[0] : ''"/>
                            <div v-else>
                                <label class="ap-form-label ap-text-bold">
                                    E-mail
                                </label>
                                <ap-placeholder
                                    :size="'medium'"/>
                            </div>
                        </div>
                    </ap-grid>

                    <div class="ap-margin-top">
                        <label class="ap-text-bold">
                            System Account
                        </label>
                        <ap-input
                            v-if="!isLoading('edit')"
                            type="text"
                            :required="true"
                            :readonly="isLoading('store')"
                            :label="'* Username'"
                            v-model="form.username"
                            placeholder="ex: jde001"
                            :error="hasError('username') ? errors.username[0] : ''"/>
                        <div v-else>
                            <label class="ap-form-label ap-text-bold">
                                * Username
                            </label>
                            <ap-placeholder
                                :size="'medium'"/>
                        </div>
                    </div>
                </fieldset>

                
                <div class="ap-margin ap-text-right"
                    v-if="!isLoading('edit')">
                    <router-link
                        v-if="!isLoading('update')"
                        class="ap-button ap-button-default ap-button-full-rounded ap-margin-small-right"
                        :to="`/administration/accounts/${$route.params.code}`">
                        Cancel
                    </router-link>
                    <ap-button
                        type="submit"
                        :color="'primary'"
                        :rounded="true"
                        :loading="isLoading('update')">
                        Submit
                    </ap-button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Http from '@/services';

import { Form, Toast, Storage } from '@/utils';

export default
{
    name: 'Main',

    data()
    {
        return {
            errors: {},
        };
    },

    created()
    {
        window.scrollTo(0,0);

        this.edit(`/administration/account/${this.$route.params.code}/edit`);
    },

    computed:
    {
        ...mapGetters({
            form: 'adminAccount/editForm',
            isLoading: 'adminAccount/isLoading',
        }),
    },

    methods:
    {
        ...mapActions({
            edit: 'adminAccount/edit',
            update: 'adminAccount/update',
            loadPrerequisite: 'adminAccount/loadPrerequisite',
        }),

        async submit()
        {
            this.errors = {};
            
            const response = await this.update({
                url: `/administration/account/${this.$route.params.code}`,
                form: this.form,
            });

            if (response.status === 200)
            {
                Toast.success({
                    message: 'Account has been updated.'
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
