<template>
    <div class="ap-margin-top">

        <div class="card card-body ap-padding border-top border-primary border-0 border-4">

            <div class="ap-text-center">
                <h4 class="ap-margin-remove"
                    v-if="!beneficiaryLoading('show')">
                    {{fullName}}
                </h4>
                <ap-placeholder
                    :size="'medium'"
                    v-else />

                <p class="ap-margin-xsmall-top ap-margin-xsmall-bottom"
                    v-if="!beneficiaryLoading('show')">
                    {{ beneficiary.code }}
                    &middot;
                    {{beneficiary.gender.name}}
                    &middot;
                    {{age}} yrs old
                </p>
                <ap-placeholder
                    :size="'small'"
                    v-else />
            </div>

            <div class="ap-margin-small-top">
                <label>Fill-out the form appropriately.</label>
            </div>

            <div class="ap-margin-top">
                <form class="ap-form-stacked ap-margin-top"
                    @submit.prevent="submit()">
                    <fieldset class="ap-fieldset">

                        <ap-grid>
                            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">

                                <div>
                                    <label class="ap-text-bold ap-form-label">
                                        Choose a Document template
                                    </label>

                                    <select class="ap-select ap-margin-small-top"
                                        v-if="!beneficiaryLoading('documentTemplates')"
                                        v-model="selectedDocument"
                                        :readonly="submitLoading"
                                        :required="true"
                                        @change="onSelectDocument">
                                        <option :value="''" disabled>-- select template --</option>
                                        <option v-for="(item, index) in documentTemplates"
                                            :key="index"
                                            :value="item.id">
                                            {{item.name}}
                                        </option>
                                    </select>
                                    <ap-placeholder
                                        v-else
                                        :size="'medium'" />
                                </div>
                                
                                <div class="accordion ap-margin-top" id="form-accordion">

                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="form-inputs-tables">
                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-form-inputs-tables" aria-expanded="false" aria-controls="collapse-form-inputs-tables">

                                                <span :class="{ 'ap-text-danger ap-margin-right': checkErrors(['content.title', 'content.salutation', 'inputs', 'tables']) }">
                                                    <i class="lni lni-user ap-margin-right"></i> INPUTS & TABLES
                                                </span>
                                                <small class="ap-text-danger ap-text-italic"
                                                    style="font-size: 11px;"
                                                    v-if="checkErrors(['inputs', 'tables'])">
                                                    (Form contains remarks)
                                                </small>

                                            </button>
                                        </h2>
                                        <div id="collapse-form-inputs-tables" class="accordion-collapse collapse show" aria-labelledby="form-inputs-tables" data-bs-parent="#form-accordion" style="">
                                            <div class="accordion-body">

                                                <inputs-component v-if="selectedDocument" />

                                                <tables-component v-if="selectedDocument" />

                                            </div>
                                        </div>
                                    </div>

                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="form-approval">
                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-form-approval" aria-expanded="false" aria-controls="collapse-form-approval">

                                                <span :class="{ 'ap-text-danger ap-margin-right': checkErrors([
                                                    'options.with_left_approval',
                                                    'options.with_right_approval',
                                                    'approvals.left_approval.label',
                                                    'approvals.left_approval.name',
                                                    'approvals.left_approval.position',
                                                    'approvals.right_approval.label',
                                                    'approvals.right_approval.name',
                                                    'approvals.right_approval.position',
                                                ]) }">
                                                    <i class="lni lni-user ap-margin-right"></i> APPROVALS
                                                </span>
                                                <small class="ap-text-danger ap-text-italic"
                                                    style="font-size: 11px;"
                                                    v-if="checkErrors([
                                                    'options.with_left_approval',
                                                    'options.with_right_approval',
                                                    'options.with_left_approval_substitute',
                                                    'options.with_right_approval_substitute',
                                                    'approvals.left_approval.label',
                                                    'approvals.left_approval.name',
                                                    'approvals.left_approval.position',
                                                    'approvals.right_approval.label',
                                                    'approvals.right_approval.name',
                                                    'approvals.right_approval.position',
                                                ])">
                                                    (Form contains remarks)
                                                </small>

                                            </button>
                                        </h2>
                                        <div id="collapse-form-approval" class="accordion-collapse collapse" aria-labelledby="form-approval" data-bs-parent="#form-accordion" style="">
                                            <div class="accordion-body">

                                                <left-approval-component v-if="selectedDocument" />

                                                <right-approval-component v-if="selectedDocument" />

                                            </div>
                                        </div>
                                    </div>

                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="form-settings">
                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-form-settings" aria-expanded="false" aria-controls="collapse-form-settings">

                                                <span :class="{ 'ap-text-danger ap-margin-right': checkErrors([
                                                    'options.with_qr_code',
                                                    'options.with_document_no',
                                                    'options.with_issuance_date',
                                                    'content.issuance_date',
                                                    'options.with_expiration_date',
                                                    'content.expiration_date',
                                                    'options.with_applicant_photo',
                                                    'options.with_applicant_signature',
                                                ]) }">
                                                    <i class="lni lni-user ap-margin-right"></i> SETTINGS
                                                </span>
                                                <small class="ap-text-danger ap-text-italic"
                                                    style="font-size: 11px;"
                                                    v-if="checkErrors([
                                                    'options.with_qr_code',
                                                    'options.with_document_no',
                                                    'options.with_issuance_date',
                                                    'content.issuance_date',
                                                    'options.with_expiration_date',
                                                    'content.expiration_date',
                                                    'options.with_applicant_photo',
                                                    'options.with_applicant_signature',
                                                    'options.with_left_thumbmark',
                                                    'options.with_right_thumbmark',
                                                ])">
                                                    (Form contains remarks)
                                                </small>

                                            </button>
                                        </h2>
                                        <div id="collapse-form-settings" class="accordion-collapse collapse" aria-labelledby="form-settings" data-bs-parent="#form-accordion" style="">
                                            <div class="accordion-body">

                                                <settings-component v-if="selectedDocument" />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="ap-width-1-1@s ap-width-2-3@m ap-width-2-3@l">

                                <document-component />

                            </div>
                        </ap-grid>

                    </fieldset>
                    
                    <div class="ap-margin ap-text-right">
                        <ap-button
                            v-if="!submitLoading && !downloadLoading"
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
                            :loading="submitLoading || downloadLoading">
                            Submit
                        </ap-button>
                    </div>
                </form>
            </div>
        </div>

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Http from '@/services';

import { Form, Toast, Dater } from '@/utils';

import InputsComponent from './content/inputs';
import TablesComponent from './content/tables';
import LeftApprovalComponent from './content/approval/left';
import RightApprovalComponent from './content/approval/right';
import SettingsComponent from './content/settings';
import DocumentComponent from './content/document';

export default
{
    name: 'Document',

    components:
    {
        InputsComponent,
        TablesComponent,
        LeftApprovalComponent,
        RightApprovalComponent,
        SettingsComponent,
        DocumentComponent,
    },

    data()
    {
        return {
            errors: {},

            submitLoading: false,
            downloadLoading: false,

            selectedDocument: '',

            form:
            {
                document_date: '',
                name: '',
                description: '',
                view:
                {
                    index: 'default',
                    header: 'default.header',
                    sidebar: 'default.sidebar',
                    content: 'default.content',
                    footer: 'default.footer',
                },
                content:
                {
                    title: 'IDENTIFICATION CARD',
                    salutation: '',
                    body: ''
                },
                options:
                {
                    with_qr_code: 1,
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

                header_border: '',

                left_signature_for_upload: false,
                left_signature: '',

                right_signature_for_upload: false,
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
        this.loadBeneficiary();

        this.initialize();

        this.loadAssignatories();

        this.loadTemplates();
    },

    computed:
    {
        ...mapGetters({
            isLoading: 'companyBeneficiaryIdentification/isLoading',
            beneficiary: 'companyBeneficiary/selected',
            documentTemplates: 'companyBeneficiary/documentTemplates',
            beneficiaryLoading: 'companyBeneficiary/isLoading',
        }),

        fullName()
        {
            return `${this.beneficiary.full_name}`;
        },

        age()
        {
            return Dater.age(this.beneficiary.date_of_birth);
        },

        createDocumentModal()
        {
            return this.$parent.$data.createDocumentModal;
        },
    },

    methods:
    {
        ...mapActions({
            loadPrerequisite: 'companyBeneficiary/loadPrerequisite',
            show: 'companyBeneficiary/show'
        }),

        async submit()
        {
            this.errors = {};

            this.submitLoading = true;
            
            const response = await Http.post(
                `/my-company/beneficiary/${this.beneficiary.slug.code}/document`,
                this.form
            );

            this.submitLoading = false;

            if (response.status === 201)
            {
                this.download(response.data.id);
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

        async download(id)
        {
            this.downloadLoading = true;

            const response = await Http.get(`/my-company/beneficiary/${this.beneficiary.slug.code}/document/${id}/download`);

            this.downloadLoading = false;

            if (response.status == 200)
            {
                window.open(response.data.path);

                Toast.success({
                    message: 'Document has been generated.'
                });

                this.$router.push(`/company/beneficiaries/${this.$route.params.code}`);
            }
        },

        onSelectDocument(event)
        {
            let selectedDocument = event.target.value;

            let checking = this.documentTemplates.find(row => row.id == selectedDocument);

            this.form.name = checking.name;
            this.form.description = checking.description;

            this.form.view = checking.view;
            this.form.content = checking.content;
            this.form.options = checking.options;
            this.form.inputs = checking.inputs;
            this.form.tables = checking.tables;
            this.form.approvals = checking.approvals;
            this.form.header_border = checking.header_border;
            this.form.left_signature = checking.left_signature;
            this.form.right_signature = checking.right_signature;

            this.form.content.issuance_date = Dater.rawToday();

            if (this.form.options.with_expiration_date)
            {
                if (this.form.options.expiration_date.default == 'months')
                {
                    this.form.content.expiration_date = Dater.addDays(
                        this.form.options.expiration_date.months * 30,
                        Dater.rawToday()
                    );
                }
                else if (this.form.options.expiration_date.default == 'specific')
                {
                    this.form.content.expiration_date = this.form.options.expiration_date.specific;
                }
                else
                {
                    this.form.content.expiration_date = Dater.addDays(
                        30,
                        Dater.rawToday()
                    );
                }
            }

            this.form.left_signature_for_upload = false;
            this.form.right_signature_for_upload = false;
        },

        async loadTemplates()
        {
            this.loadPrerequisite({
                url: `/my-company/beneficiary/document-template/options`,
                action: 'documentTemplates'
            });
        },

        async loadBeneficiary()
        {
            await this.show(`/my-company/beneficiary/${this.$route.params.code}`);
        },

        initialize()
        {
            this.form.document_date = Dater.rawToday();
            this.form.name = '';
            this.form.description = '';

            this.form.view.index = 'default';
            this.form.view.header = 'default.header';
            this.form.view.sidebar = 'default.sidebar';
            this.form.view.content = 'default.content';
            this.form.view.footer = 'default.footer';

            this.form.content.title = 'CERTIFICATION';
            this.form.content.salutation = '';
            this.form.content.body = '';

            this.form.options.with_qr_code = 1;
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

            this.form.header_border = '';

            this.form.left_signature_for_upload = false;
            this.form.left_signature = '';

            this.form.right_signature_for_upload = false;
            this.form.right_signature = '';
        },

        async loadAssignatories()
        {
            this.loadPrerequisite({
                url: `/my-company/document-template/assignatory/options`,
                action: 'assignatories'
            });
        },

        checkErrors(names)
        {
            let checking = false;

            names.forEach(name => {
                if (this.hasError(name)) checking = true;
            });

            return checking;
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },

        toggleModal(name, bool)
        {
            this[`${name}Modal`] = bool;
        }
    },
}
</script>
