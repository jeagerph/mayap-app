<template>
    <ap-modal
        :isOpen.sync="$parent.$data.createModal"
        :isCenter="true"
        :size="'container'">

        <ap-modal-body>
            <ap-modal-title>
                Create Patient
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">

                <div class="ap-card ap-card-body ap-card-small ap-card-default ap-padding-small ap-margin-top">
                    <p class="ap-text-italic ap-text-bold">
                        Search a Beneficiary
                    </p>
                    <form class="ap-form-stacked"
                        @submit.prevent="search()">
                        <fieldset class="ap-fieldset">
                            <ap-grid :gutter="'small'">
                                <div class="ap-width-expand@m">
                                    <ap-grid :gutter="'small'">
                                        <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                            <ap-input
                                                type="text"
                                                :label="'First Name'"
                                                v-model="searchForm.firstName"
                                                placeholder="ex: JUAN"/>
                                        </div>
                                        <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                            <ap-input
                                                type="text"
                                                :label="'Middle Name'"
                                                v-model="searchForm.middleName"
                                                placeholder="ex: SANTIAGO"/>
                                        </div>
                                        <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                            <ap-input
                                                type="text"
                                                :required="true"
                                                :label="'* Last Name'"
                                                v-model="searchForm.lastName"
                                                placeholder="ex: DELA CRUZ"/>
                                        </div>
                                    </ap-grid>
                                </div>
                                <div class="ap-text-right@m">
                                    <ap-button
                                        type="submit"
                                        :color="'primary'"
                                        :outline="true"
                                        :loading="itemsLoading">
                                        <i class="lni lni-search"></i>
                                    </ap-button>
                                </div>
                            </ap-grid>
                        </fieldset>
                    </form>

                    <div v-if="!itemsLoading"
                        class="ap-margin-top">
                        <div v-show="showItems">
                            <div class="ap-margin-small-top"
                                style="height: 200px; overflow-y: scroll;"
                                v-if="items.length">
                                <p class="ap-text-italic">
                                    Kindly select on the list below
                                </p>
                                <ul class="ap-list ap-list-divider ap-list-hover">
                                    <li
                                        class="ap-point"
                                        v-for="(item, index) in items"
                                        :key="index"
                                        @click="select(item)">
                                        <ap-grid :gutter="'small'">
                                            <div class="ap-width-fit-content">
                                                <ap-avatar
                                                    :shape="'default'"
                                                    :src="item.photo"
                                                    :label="'AA'" />
                                            </div>
                                            <div class="ap-width-expand">
                                                <h5 class="ap-text-bold ap-margin-remove">
                                                    {{item.last_name}}, {{item.first_name}} {{item.middle_name}}
                                                </h5>
                                                <p>
                                                    {{item.gender.name}}
                                                    &middot;
                                                    {{age(item.date_of_birth)}} yrs old
                                                    &middot;
                                                    BRGY {{item.barangay.name}}, {{item.city.name}}
                                                </p>
                                            </div>
                                        </ap-grid>
                                        
                                    </li>
                                </ul>
                            </div>
                            <p class="ap-text-italic" v-else>
                                No search result yet
                            </p>

                        </div>
                        
                    </div>
                    <div v-else>
                        <ap-placeholder
                            :size="'medium'" />
                    </div>

                    <div class="ap-margin-top">
                        <small class="ap-text-bold">
                            Beneficiary not found on the list? <a class="ap-link-reset ap-text-primary ap-point" @click="toggleModal('createBeneficiary', true)">Create New</a>
                        </small>
                    </div>

                    <div class="ap-margin-top">
                        <small class="ap-text-bold ap-text-italic">
                            Selected Beneficiary:
                        </small>
                    </div>
                

                    <div class="ap-card ap-card-body ap-card-default ap-card-small ap-padding-small ap-margin-top">
                        <div v-if="hasBeneficiary">
                            <ap-grid :gutter="'small'">
                                <div class="ap-width-expand">
                                    <ap-grid :gutter="'small'">
                                        <div class="ap-width-fit-content">
                                            <ap-avatar
                                                :shape="'default'"
                                                :src="beneficiary.photo"
                                                :label="'AA'" />
                                        </div>
                                        <div class="ap-width-expand">
                                            <h5 class="ap-text-bold ap-margin-remove">
                                                {{beneficiary.last_name}}, {{beneficiary.first_name}} {{beneficiary.middle_name}}
                                            </h5>
                                            <p>
                                                {{beneficiary.gender.name}}
                                                &middot;
                                                {{age(beneficiary.date_of_birth)}} yrs old
                                                &middot;
                                                BRGY {{beneficiary.barangay.name}}, {{beneficiary.city.name}}
                                            </p>
                                        </div>
                                    </ap-grid>
                                </div>
                                <div class="ap-text-right@m">
                                    <a class="ap-link-reset ap-point ap-text-danger"
                                        @click="remove()">
                                        <i class="lni lni-close"></i>
                                    </a>
                                </div>
                            </ap-grid>
                            
                        </div>
                        <div class="ap-text-center"
                            v-else>
                            <p class="ap-text-italic">
                                no selected beneficiary
                            </p>
                        </div>

                        <small class="ap-text-bold ap-text-danger"
                            v-if="hasError('beneficiaryCode')">
                            {{ errors.beneficiaryCode[0] }}
                        </small>
                    </div>
                </div>

                <form class="ap-form-stacked ap-margin-top"
                    @submit.prevent="submit()">
                    <fieldset class="ap-fieldset">

                        <ap-input
                            type="date"
                            :readonly="isLoading('store')"
                            :label="'* Date Creation'"
                            v-model="form.patient_date"
                            :error="hasError('patient_date') ? errors.patient_date[0] : ''"/>

                        <ap-grid :gutter="'small'">
                            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                <ap-input
                                    type="text"
                                    :readonly="isLoading('store')"
                                    :label="'* First Name'"
                                    :required="true"
                                    :placeholder="'ex. JUAN'"
                                    v-model="form.first_name"
                                    :error="hasError('first_name') ? errors.first_name[0] : ''"/>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                <ap-input
                                    type="text"
                                    :readonly="isLoading('store')"
                                    :label="'Middle Name'"
                                    :placeholder="'ex. SANTIAGO'"
                                    v-model="form.middle_name"
                                    :error="hasError('middle_name') ? errors.middle_name[0] : ''"/>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                <ap-input
                                    type="text"
                                    :readonly="isLoading('store')"
                                    :label="'* Last Name'"
                                    :required="true"
                                    :placeholder="'ex. DELA CRUZ'"
                                    v-model="form.last_name"
                                    :error="hasError('last_name') ? errors.last_name[0] : ''"/>
                            </div>
                        </ap-grid>

                        <ap-input
                            type="text"
                            :readonly="isLoading('store')"
                            :label="'* Relation of Beneficiary to Patient'"
                            :required="true"
                            :placeholder="'ex. PARENT'"
                            v-model="form.relation_to_patient"
                            :error="hasError('relation_to_patient') ? errors.relation_to_patient[0] : ''"/>
                        
                        <ap-grid :gutter="'small'">
                            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                                <label class="ap-text-bold ap-form-label">
                                    Problem Presented
                                </label>

                                <textarea
                                    class="ap-textarea ap-textarea-message"
                                    cols="30"
                                    rows="5"
                                    :readonly="isLoading('store')"
                                    :placeholder="'type here...'"
                                    v-model="form.problem_presented">
                                </textarea>

                                <small class="ap-text-bold ap-text-danger"
                                    v-if="hasError('problem_presented')">
                                        {{errors.problem_presented[0]}}
                                </small>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                                <label class="ap-text-bold ap-form-label">
                                    Findings
                                </label>

                                <textarea
                                    class="ap-textarea ap-textarea-message"
                                    cols="30"
                                    rows="5"
                                    :readonly="isLoading('store')"
                                    :placeholder="'type here...'"
                                    v-model="form.findings">
                                </textarea>

                                <small class="ap-text-bold ap-text-danger"
                                    v-if="hasError('findings')">
                                        {{errors.findings[0]}}
                                </small>
                            </div>
                        </ap-grid>
                        
                        <ap-grid :gutter="'small'">
                            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                                <label class="ap-text-bold ap-form-label">
                                    Assessment & Recommendation
                                </label>

                                <textarea
                                    class="ap-textarea ap-textarea-message"
                                    cols="30"
                                    rows="5"
                                    :readonly="isLoading('store')"
                                    :placeholder="'type here...'"
                                    v-model="form.assessment_recommendation">
                                </textarea>

                                <small class="ap-text-bold ap-text-danger"
                                    v-if="hasError('assessment_recommendation')">
                                        {{errors.assessment_recommendation[0]}}
                                </small>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                                <label class="ap-text-bold ap-form-label">
                                    Needs Given
                                </label>

                                <textarea
                                    class="ap-textarea ap-textarea-message"
                                    cols="30"
                                    rows="5"
                                    :readonly="isLoading('store')"
                                    :placeholder="'type here...'"
                                    v-model="form.needs">
                                </textarea>

                                <small class="ap-text-bold ap-text-danger"
                                    v-if="hasError('needs')">
                                        {{errors.needs[0]}}
                                </small>
                            </div>
                        </ap-grid>

                        <div class="ap-margin-top">
                            <label class="ap-text-bold ap-form-label">
                                * Remarks
                            </label>

                            <textarea
                                class="ap-textarea ap-textarea-message"
                                cols="30"
                                rows="5"
                                :readonly="isLoading('store')"
                                :placeholder="'any remarks here...'"
                                v-model="form.remarks">
                            </textarea>

                            <small class="ap-text-bold ap-text-danger"
                                v-if="hasError('remarks')">
                                    {{errors.remarks[0]}}
                            </small>
                        </div>
                    </fieldset>

                    <div class="ap-margin-top ap-text-right">
                        <ap-button
                            v-if="!isLoading('store')"
                            type="button"
                            class="ap-margin-small-right"
                            @click="closeModal()">
                            Cancel
                        </ap-button>
                        <ap-button
                            type="submit"
                            :color="'primary'"
                            :outline="false"
                            :loading="isLoading('store')">
                            Submit
                        </ap-button>
                    </div>
                </form>
            </div>
        </ap-modal-body>
        
        <create-beneficiary-modal />

    </ap-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Http from '@/services';

import { Form, Toast, Dater } from '@/utils';

import CreateBeneficiaryModal from './create-beneficiary';

export default
{
    components:
    {
        CreateBeneficiaryModal,
    },

    data()
    {
        return {
            createBeneficiaryModal: false,

            errors: {},

            form:
            {
                beneficiaryCode: '',
                patient_date: '',
                first_name: '',
                middle_name: '',
                last_name: '',
                relation_to_patient: '',
                problem_presented: '',
                findings: '',
                assessment_recommendation: '',
                needs: '',
                remarks: '',
            },

            searchForm:
            {
                firstName: '',
                middleName: '',
                lastName: '',
            },

            items: [],
            itemsLoading: false,
            showItems: false,
            
            beneficiary: {},
        };
    },

    created()
    {
        this.initialize();
    },

    computed:
    {
        ...mapGetters({
            patient: 'companyPatient/selected',
            isLoading: 'companyPatient/isLoading',
        }),

        hasBeneficiary()
        {
            return Object.keys(this.beneficiary).length > 0;
        },

        createModal()
        {
            return this.$parent.$data.createModal;
        },
    },

    methods:
    {
        ...mapActions({
            store: 'companyPatient/store',
        }),

        async submit()
        {
            this.errors = {};
            
            const response = await this.store({
                url: `/my-company/patient`,
                form: this.form,
            });

            if (response.status === 201)
            {
                this.closeModal();

                Toast.success({
                    message: 'Patient has been added.'
                });

                this.$parent

                this.initialize();
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

        async search()
        {
            this.itemsLoading = true;

            const response = await Http.get(`/my-company/patient/beneficiary/options?firstName=${this.searchForm.firstName}&middleName=${this.searchForm.middleName}&lastName=${this.searchForm.lastName}`)

            this.itemsLoading = false;

            if (response.status == 200)
            {
                this.items = response.data;

                this.showItems = true;
            }
        },

        select(item)
        {
            this.form.beneficiaryCode = item.slug.code;
            this.beneficiary = item;

            this.showItems = false;

            this.errors = {};
        },

        remove()
        {
            this.form.beneficiaryCode = '';
            this.beneficiary = {};
        },

        age(date)
        {
            return Dater.age(date);
        },

        initialize()
        {
            this.form.patient_date = Dater.rawToday();
            this.form.first_name = '';
            this.form.middle_name = '';
            this.form.last_name = '';
            this.form.relation_to_patient = '';
            this.form.problem_presented = '';
            this.form.findings = '';
            this.form.assessment_recommendation = '';
            this.form.needs = '';
            this.form.remarks = '';
            
            if (Object.keys(this.patient).length > 0)
            {
                this.beneficiary =  this.patient.beneficiary;
                this.form.beneficiaryCode = this.patient.beneficiary.slug.code;
            }
            else
            {
                this.beneficiary = {};
                this.form.beneficiaryCode = '';
            }
            
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },

        closeModal()
        {
            this.$parent.toggleModal('create', false);
        },

        toggleModal(name, bool)
        {
            this[`${name}Modal`] = bool;
        }
    },

    watch:
    {
        createModal(val)
        {
            if (val) this.initialize();
        }
    }
};
</script>
