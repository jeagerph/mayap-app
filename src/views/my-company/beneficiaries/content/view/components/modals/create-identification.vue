<template>
    <ap-modal
        :isOpen.sync="$parent.$data.createIdentificationModal"
        :isCenter="true"
        :size="'container'">

        <ap-modal-body>
            <ap-modal-title>
                Create ID for {{ fullName }}
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">


                <form class="ap-form-stacked ap-margin-top"
                    @submit.prevent="submit()">
                    <fieldset class="ap-fieldset">
                        <div class="ap-margin-top">
                            <label class="ap-text-bold ap-form-label">
                                Choose an ID template
                            </label>

                            <select class="ap-select"
                                v-if="!beneficiaryLoading('idTemplates')"
                                v-model="selectedId"
                                :readonly="submitLoading"
                                :required="true"
                                @change="onSelectId">
                                <option :value="''" disabled>-- select template --</option>
                                <option v-for="(item, index) in idTemplates"
                                    :key="index"
                                    :value="item.id">
                                    {{item.name}}
                                </option>
                            </select>
                            <ap-placeholder
                                v-else
                                :size="'medium'" />
                        </div>

                    </fieldset>
                    
                    <div class="ap-margin ap-text-right">
                        <ap-button
                            v-if="!submitLoading"
                            type="button"
                            class="ap-margin-small-right"
                            :rounded="true"
                            @click="closeModal()">
                            Cancel
                        </ap-button>
                        <ap-button
                            type="submit"
                            :rounded="true"
                            :color="'primary'"
                            :loading="submitLoading">
                            Submit
                        </ap-button>
                    </div>
                </form>
            </div>
        </ap-modal-body>
    </ap-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Http from '@/services';

import { Form, Toast, Dater } from '@/utils';

export default
{
    data()
    {
        return {
            errors: {},

            submitLoading: false,

            selectedId: '',

            form:
            {
                
                identification_date: '',
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
        this.initialize();
    },

    computed:
    {
        ...mapGetters({
            isLoading: 'companyBeneficiaryIdentification/isLoading',
            beneficiary: 'companyBeneficiary/selected',
            idTemplates: 'companyBeneficiary/idTemplates',
            beneficiaryLoading: 'companyBeneficiary/isLoading',
        }),

        company()
        {
            return this.accessUser.company;
        },

        fullName()
        {
            return `${this.beneficiary.full_name}`;
        },

        createIdentificationModal()
        {
            return this.$parent.$data.createIdentificationModal;
        },
    },

    methods:
    {
        ...mapActions({
            store: 'companyBeneficiaryIdentification/store',
            loadPrerequisite: 'companyBeneficiary/loadPrerequisite',
        }),

        async submit()
        {
            this.errors = {};

            this.submitLoading = true;
            
            const response = await this.store({
                url: `/my-company/beneficiary/${this.beneficiary.slug.code}/identification`,
                form: this.form
            });

            this.submitLoading = false;

            if (response.status === 201)
            {
                Toast.success({
                    message: `ID has been created.`,
                });

                this.initialize();

                this.closeModal();
            }
            else if (response.status === 422)
            {
                this.errors = response.data.errors;
                
                Toast.error({
                    message: 'Kindly double check your form.',
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

        onSelectId(event)
        {
            let selectedId = event.target.value;

            let checking = this.idTemplates.find(row => row.id == selectedId);

            this.form.name = checking.name;
            this.form.description = checking.description;

            this.form.view = checking.view;
            this.form.content = checking.content;
            this.form.options = checking.options;
            this.form.approvals = checking.approvals;
            this.form.left_signature = checking.left_signature;
            this.form.right_signature = checking.right_signature;
        },

        async loadTemplates()
        {
            this.loadPrerequisite({
                url: `/my-company/beneficiary/id-template/options`,
                action: 'idTemplates'
            });
        }, 

        initialize()
        {
            this.form.identification_date = Dater.rawToday();
            this.form.name = '';
            this.form.description = '';

            this.form.view.index = 'default';
            this.form.view.header = 'default.header';
            this.form.view.front = 'default.front';
            this.form.view.back = 'default.back';
            this.form.view.title_background_color = '#228CDB';

            this.form.content.title = 'IDENTIFICATION CARD';
            this.form.content.salutation = '';
            this.form.content.body = '';

            this.form.options.with_qr_code = 0;
            this.form.options.with_issuance_date = 1;
            this.form.options.with_expiration_date = 1;
            this.form.options.with_applicant_photo = 1;
            this.form.options.with_applicant_signature = 1;
            this.form.options.with_left_approval = 1;
            this.form.options.with_left_approval_signature = 0;
            this.form.options.with_right_approval = 1;
            this.form.options.with_right_approval_signature = 0;
            this.form.options.expiration_date.default = 'months';
            this.form.options.expiration_date.specific = '';
            this.form.options.expiration_date.months = '1';

            this.form.approvals.left_approval.label = 'ATTESTED BY:',
            this.form.approvals.left_approval.name = '',
            this.form.approvals.left_approval.position = '',
            this.form.approvals.right_approval.label = 'APPROVED BY:',
            this.form.approvals.right_approval.name = '',
            this.form.approvals.right_approval.position = '',

            this.form.left_signature = '';
            this.form.right_signature = '';
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },

        closeModal()
        {
            this.$parent.toggleModal('createIdentification', false);
        },
    },

    watch:
    {
        createIdentificationModal(val)
        {
            if (val) this.loadTemplates();
        },
    },
};
</script>
