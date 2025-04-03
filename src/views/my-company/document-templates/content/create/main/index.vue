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

                    <inputs-component />

                    <tables-component />

                    <content-component />

                    <approvals-component ref="signatureComponent" />

                    <settings-component />

                    <border-component ref="borderComponent" />

                    <view-component />

                </fieldset>

                
                <div class="ap-margin ap-text-right">
                    <router-link
                        v-if="!isLoading('store')"
                        class="ap-button ap-button-default ap-button-full-rounded ap-margin-small-right"
                        to="/company/document-templates">
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

import NameComponent from './content/name';
import ContentComponent from './content/content';
import InputsComponent from './content/inputs';
import TablesComponent from './content/tables';
import ApprovalsComponent from './content/approvals';
import SettingsComponent from './content/settings';
import ViewComponent from './content/view';
import BorderComponent from './content/border';

export default
{
    name: 'Main',

    components:
    {
        NameComponent,
        ContentComponent,
        InputsComponent,
        TablesComponent,
        ApprovalsComponent,
        SettingsComponent,
        ViewComponent,
        BorderComponent,
    },

    data()
    {
        return {
            errors: {},

            form:
            {
                name: '',
                description: '',
                view:
                {
                    index: 'default',
                    header: 'default.header',
                    sidebar: 'default.sidebar',
                    content: 'default.content',
                    footer: 'default.footer',
                    sidebar_background_color: '#FFFFFF'
                },
                content:
                {
                    title: 'CERTIFICATION',
                    salutation: 'TO WHOM IT MAY CONCERN:',
                    body: ''
                },
                options:
                {
                    with_qr_code: 0,
                    with_document_no: 1,
                    with_issuance_date: 1,
                    with_expiration_date: 1,
                    with_applicant_photo: 1,
                    with_applicant_signature: 1,
                    with_left_approval: 1,
                    with_left_approval_signature: 0,
                    with_right_approval: 1,
                    with_right_approval_signature: 0,
                    expiration_date:
                    {
                        default: 'months',
                        specific: '',
                        months: '1'
                    }
                },
                inputs: [],
                tables: [],
                approvals:
                {
                    left_approval:
                    {
                        label: 'ATTESTED BY:',
                        name: '',
                        position: '',
                    },
                    right_approval:
                    {
                        label: 'APPROVED BY:',
                        name: '',
                        position: '',
                    },
                },
                header_border_for_upload: false,
                header_border: '',
                left_signature: '',
                right_signature: '',
            },

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
    },

    computed:
    {
        ...mapGetters({
            isLoading: 'myCompanyDocumentTemplate/isLoading',
        }),
    },

    methods:
    {
        ...mapActions({
            store: 'myCompanyDocumentTemplate/store',
        }),

        async submit()
        {
            this.errors = {};

            const options = {
                format: 'png',
                circle: false,
            };

            if (this.form.header_border_for_upload)
            {
                await this.$refs.borderComponent.$refs.borderRef.result(options, (output) =>
                {
                    this.form.header_border = output;
                });
            }

            if (this.form.options.with_left_approval_signature)
            {
                await this.$refs.signatureComponent.$refs.leftSignatureRef.result(options, (output) =>
                {
                    this.form.left_signature = output;
                });
            }

            if (this.form.options.with_right_approval_signature)
            {
                await this.$refs.signatureComponent.$refs.rightSignatureRef.result(options, (output) =>
                {
                    this.form.right_signature = output;
                });
            }
            
            const response = await this.store({
                url: '/my-company/document-template',
                form: this.form,
            });

            if (response.status === 201)
            {
                Toast.success({
                    message: 'Document Template has been created.'
                });

                this.$router.push(`/company/document-templates/${response.data.id}`);
            }
            else if (response.status === 422)
            {
                this.errors = response.data.errors;

                Toast.error({
                    message: 'Form validation. Please double check your form.'
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
