<template>
    <div class="ap-margin-auto ap-width-xxlarge ap-margin-top">
        <div class="card card-body ap-padding border-top border-primary border-0 border-4">

            <div>
                <label>Fill-out the form appropriately.</label>
            </div>
        
            <form class="ap-form-stacked ap-margin-top"
                @submit.prevent="submit()">
                <fieldset class="ap-fieldset">

                    <company-component />

                    <account-component />

                </fieldset>

                
                <div class="ap-margin ap-text-right">
                    <router-link
                        v-if="!isLoading('store')"
                        class="ap-button ap-button-default ap-button-full-rounded ap-margin-small-right"
                        to="/administration/barangays">
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

import CompanyComponent from './content/company';
import AccountComponent from './content/account';

export default
{
    name: 'Main',
    
    components:
    {
        CompanyComponent,
        AccountComponent,
    },

    data()
    {
        return {
            errors: {},

            form:
            {
                name: '',
                address: '',
                contact_no: '',

                company_position_id: 1,
                account_type: 2,
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
            isLoading: 'adminCompany/isLoading',
        }),
    },

    methods:
    {
        ...mapActions({
            store: 'adminCompany/store',
        }),

        async submit()
        {
            this.errors = {};
            
            const response = await this.store({
                url: '/administration/company',
                form: this.form,
            });

            if (response.status === 201)
            {
                Toast.success({
                    message: 'Company has been created.'
                });

                this.$router.push(`/administration/companies/${response.data.slug.code}`);
            }
            else if (response.status === 422)
            {
                this.errors = response.data.errors;

                Toast.error({
                    message: 'Kindly double check your forms.',
                });

                window.scrollTo(0,0);
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
