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

                    <approvals-component ref="signatureComponent" />

                    <settings-component />

                    <view-component />

                </fieldset>

                
                <div class="ap-margin ap-text-right">
                    <router-link
                        v-if="!isLoading('store')"
                        class="ap-button ap-button-default ap-button-full-rounded ap-margin-small-right"
                        to="/company/id-templates">
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
import ApprovalsComponent from './content/approvals';
import SettingsComponent from './content/settings';
import ViewComponent from './content/view';

export default
{
    name: 'Main',

    components:
    {
        NameComponent,
        ContentComponent,
        ApprovalsComponent,
        SettingsComponent,
        ViewComponent,
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
                    front: 'default.front',
                    back: 'default.back',
                    title_background_color: '#228CDB'
                },
                content:
                {
                    title: 'IDENTIFICATION CARD',
                    salutation: '',
                    body: ''
                },
                options:
                {
                    with_qr_code: 0,
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
                left_signature: '',
                right_signature: '',
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
            isLoading: 'myCompanyIdTemplate/isLoading',
        }),
    },

    methods:
    {
        ...mapActions({
            store: 'myCompanyIdTemplate/store',
        }),

        async submit()
        {
            this.errors = {};

            const options = {
                format: 'png',
                circle: false,
            };

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
                url: '/my-company/id-template',
                form: this.form,
            });

            if (response.status === 201)
            {
                Toast.success({
                    message: 'ID Template has been created.'
                });

                this.$router.push(`/company/id-templates/${response.data.id}`);
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
