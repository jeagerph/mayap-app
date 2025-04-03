<template>
    <div class="ap-margin-auto ap-width-xxlarge ap-margin-top">
        <div class="card card-body ap-padding border-top border-primary border-0 border-4">
            <div>
                <label >Fill-out the form appropriately.</label>
            </div>
            
            <form class="ap-form-stacked ap-margin-top"
                @submit.prevent="submit()">
                <fieldset class="ap-fieldset">

                    <name-component />

                    <content-component />

                    <inputs-component />

                    <tables-component />
                    
                    <approvals-component />
                    
                    <settings-component />

                    <view-component />

                </fieldset>

                
                <div class="ap-margin ap-text-right"
                    v-if="!isLoading('edit')">
                    <router-link
                        v-if="!isLoading('update')"
                        class="ap-button ap-button-default ap-button-full-rounded ap-margin-small-right"
                        :to="`/company/document-templates/${$route.params.id}`">
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

import { Form, Toast, Text } from '@/utils';

import NameComponent from './content/name';
import ContentComponent from './content/content';
import InputsComponent from './content/inputs';
import TablesComponent from './content/tables';
import SettingsComponent from './content/settings';
import ApprovalsComponent from './content/approvals';
import ViewComponent from './content/view';

export default
{
    name: 'Main',

    components:
    {
        NameComponent,
        ContentComponent,
        InputsComponent,
        TablesComponent,
        SettingsComponent,
        ApprovalsComponent,
        ViewComponent,
    },

    data()
    {
        return {
            errors: {},

            beneficiaryInputs: [
                {
                    label: 'FULL NAME',
                    key: 'beneficiary_full_name',
                },
                {
                    label: 'ADDRESS',
                    key: 'beneficiary_address',
                },
                {
                    label: 'BIRTH DATE',
                    key: 'beneficiary_date_of_birth',
                },
                {
                    label: 'BIRTH PLACE',
                    key: 'beneficiary_place_of_birth',
                },
                {
                    label: 'AGE',
                    key: 'beneficiary_age',
                },
                {
                    label: 'CIVIL STATUS',
                    key: 'beneficiary_civil_status',
                },
                {
                    label: 'GENDER (MALE/FEMALE)',
                    key: 'beneficiary_gender',
                },
                {
                    label: 'GENDER (He/She)',
                    key: 'beneficiary_gender_pronoun_title_case',
                },
                {
                    label: 'GENDER (he/she)',
                    key: 'beneficiary_gender_pronoun_lower_case',
                },
                {
                    label: 'GENDER (His/Her)',
                    key: 'beneficiary_gender_possessive_title_case',
                },
                {
                    label: 'GENDER (his/her)',
                    key: 'beneficiary_gender_possessive_lower_case',
                },
            ],
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
            form: 'myCompanyDocumentTemplate/editForm',
            isLoading: 'myCompanyDocumentTemplate/isLoading',
        }),
    },

    methods:
    {
        ...mapActions({
            edit: 'myCompanyDocumentTemplate/edit',
            update: 'myCompanyDocumentTemplate/update',
        }),

        async submit()
        {
            this.errors = {};
            
            const response = await this.update({
                url: `/my-company/document-template/${this.$route.params.id}`,
                form: this.form,
            });

            if (response.status === 200)
            {
                Toast.success({
                    message: 'ID Template has been updated.'
                });

                this.$router.push(`/company/document-templates/${response.data.id}`);
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

        async loadForm()
        {
            const response = await this.edit(
                `/my-company/document-template/${this.$route.params.id}/edit`
            );

            if (response.status == 200)
            {
                if (!response.data.view.title_background_color)
                {
                    this.form.view.title_background_color = '#228CDB'
                }
            }
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },
    },
};
</script>
