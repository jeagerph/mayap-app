<template>
    <div class="ap-margin-auto ap-width-xxlarge ap-margin-top">

        <div class="card card-body ap-padding border-top border-primary border-0 border-4">
            <div>
                <label class="ap-text-bold">Fill-out the form appropriately.</label>
            </div>
            
            <form class="ap-form-stacked ap-margin-top"
                @submit.prevent="submit()">
                <fieldset class="ap-fieldset">

                    <div class="ap-margin-top">
                        <p class="ap-text-bold ap-text-primary">
                            COMPANY INFORMATION
                        </p>

                        <hr>

                        <ap-input
                            v-if="!isLoading('edit')"
                            type="text"
                            :readonly="isLoading('update')"
                            :label="'* Name'"
                            :placeholder="'ex. COMPANY'"
                            v-model="form.name"
                            :error="hasError('name') ? errors.name[0] : ''"/>
                        <div v-else>
                            <label class="ap-form-label ap-text-bold">
                                * Name
                            </label>
                            <ap-placeholder
                                :size="'medium'"/>
                        </div>

                        <ap-input
                            v-if="!isLoading('edit')"
                            class="ap-margin-small-top"
                            type="text"
                            :readonly="isLoading('update')"
                            :label="'Address'"
                            :placeholder="'ex. OLONGAPO CITY'"
                            v-model="form.address"
                            :error="hasError('address') ? errors.address[0] : ''"/>
                        <div v-else>
                            <label class="ap-form-label ap-text-bold">
                                Address
                            </label>
                            <ap-placeholder
                                :size="'medium'"/>
                        </div>

                        <ap-input
                            v-if="!isLoading('edit')"
                            type="text"
                            :readonly="isLoading('update')"
                            :label="'Contact No.'"
                            :placeholder="'ex. 09XXXXXXXXX'"
                            v-model="form.contact_no"
                            :error="hasError('contact_no') ? errors.contact_no[0] : ''"/>
                        <div v-else>
                            <label class="ap-form-label ap-text-bold">
                                Contact No.
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
                        :to="`/administration/companies/${$route.params.code}`">
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

import { Form, Toast } from '@/utils';

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

        this.loadForm();
    },

    computed:
    {
        ...mapGetters({
            form: 'adminCompany/editForm',
            isLoading: 'adminCompany/isLoading',
        }),
    },

    methods:
    {
        ...mapActions({
            load: 'adminCompany/edit',
            update: 'adminCompany/update',
        }),

        async submit()
        {
            this.errors = {};
            
            const response = await this.update({
                url: `/administration/company/${this.$route.params.code}`,
                form: this.form,
            });

            if (response.status === 200)
            {
                Toast.success({
                    message: 'Company has been updated.'
                });

                this.$router.push(`/administration/companies/${this.$route.params.code}`);
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

        async loadForm()
        {
            await this.load(`/administration/company/${this.$route.params.code}/edit`);
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },
    },
}
</script>
