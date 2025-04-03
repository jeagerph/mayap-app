<template>
    <div class="ap-margin-auto ap-width-xxlarge ap-margin-top">

        <div class="card card-body ap-padding border-top border-primary border-0 border-4">
            <div>
                <label>Fill-out the form appropriately.</label>
            </div>

            <div>
                <small class="ap-text-italic">
                    <span class="ap-text-bold">Note:</span> Asterisk (*) inputs are needed to be filled-out.
                </small>
            </div>
            
            <form class="ap-form-stacked ap-margin-top"
                @submit.prevent="submit()">

                <fieldset class="ap-fieldset">

                    <small class="ap-text-bold ap-text-danger"
                        v-if="hasError('beneficiary_validation')">
                        <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                        {{errors.beneficiary_validation[0]}}
                    </small>

                    <div class="ap-card ap-card-body ap-card-default ap-card-small">
                        <h6 class="ap-margin-remove ap-text-primary">
                            <i class="lni lni-user ap-margin-right"></i> PERSONAL INFORMATION AND PHOTO
                        </h6>

                        <hr>

                        <ap-grid>
                            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">

                                <personal-component />

                            </div>

                            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">

                                <photo-component ref="photoComponent" />

                            </div>

                        </ap-grid>
                    </div>

                    <div class="accordion ap-margin-top" id="form-accordion">

                        <div class="accordion-item">
                            <h2 class="accordion-header" id="form-current-address">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-form-current-address" aria-expanded="true" aria-controls="collapse-form-current-address">

                                    <span :class="{ 'ap-text-danger ap-margin-right': checkErrors([
                                        'province_id',
                                        'city_id',
                                        'barangay_id',
                                        'house_no',
                                    ]) }">
                                        <i class="lni lni-user ap-margin-right"></i> CURRENT ADDRESS & MAP LOCATION
                                    </span>
                                    <small class="ap-text-danger ap-text-italic"
                                        style="font-size: 11px;"
                                        v-if="checkErrors([
                                        'province_id',
                                        'city_id',
                                        'barangay_id',
                                        'house_no',
                                    ])">
                                        (Form contains remarks)
                                    </small>

                                </button>
                            </h2>
                            <div id="collapse-form-current-address" class="accordion-collapse collapse show" aria-labelledby="form-current-address" data-bs-parent="#form-accordion" style="">
                                <div class="accordion-body">

                                    <address-component />

                                    <map-component />

                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                            <h2 class="accordion-header" id="form-other-information">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-form-other-information" aria-expanded="false" aria-controls="collapse-form-other-information">

                                    <span :class="{ 'ap-text-danger ap-margin-right': checkErrors([
                                        'place_of_birth',
                                        'email',
                                        'civil_status',
                                        'citizenship',
                                        'religion',
                                        'educational_attainment',
                                        'occupation',
                                        'monthly_income',
                                        'source_of_income',
                                        'classification',
                                        'is_household',
                                        'household_count',
                                        'is_priority',
                                    ]) }">
                                        <i class="lni lni-user ap-margin-right"></i> OTHER INFORMATION
                                    </span>
                                    <small class="ap-text-danger ap-text-italic"
                                        style="font-size: 11px;"
                                        v-if="checkErrors([
                                        'place_of_birth',
                                        'email',
                                        'civil_status',
                                        'citizenship',
                                        'religion',
                                        'educational_attainment',
                                        'occupation',
                                        'monthly_income',
                                        'source_of_income',
                                        'classification',
                                        'is_household',
                                        'household_count',
                                        'is_priority',
                                    ])">
                                        (Form contains remarks)
                                    </small>

                                </button>
                            </h2>
                            <div id="collapse-form-other-information" class="accordion-collapse collapse collapsed" aria-labelledby="form-other-information" data-bs-parent="#form-accordion" style="">
                                <div class="accordion-body">

                                    <other-component />

                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                            <h2 class="accordion-header" id="form-education">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-form-education" aria-expanded="false" aria-controls="collapse-form-education">

                                    <span>
                                        <i class="lni lni-user ap-margin-right"></i> EDUCATIONAL ATTAINMENT
                                    </span>

                                </button>
                            </h2>
                            <div id="collapse-form-education" class="accordion-collapse collapse collapsed" aria-labelledby="form-education" data-bs-parent="#form-accordion" style="">
                                <div class="accordion-body">

                                    <education-component />

                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                            <h2 class="accordion-header" id="form-medical-concerns">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-form-medical-concerns" aria-expanded="false" aria-controls="collapse-form-medical-concerns">

                                    <span :class="{ 'ap-text-danger ap-margin-right': checkErrors([
                                        'remarks',
                                    ]) }">
                                        <i class="lni lni-user ap-margin-right"></i> MEDICAL CONCERNS & OTHER REMARKS
                                    </span>
                                    <small class="ap-text-danger ap-text-italic"
                                        style="font-size: 11px;"
                                        v-if="checkErrors([
                                        'remarks',
                                    ])">
                                        (Form contains remarks)
                                    </small>

                                </button>
                            </h2>
                            <div id="collapse-form-medical-concerns" class="accordion-collapse collapse collapsed" aria-labelledby="form-remarks" data-bs-parent="#form-accordion" style="">
                                <div class="accordion-body">

                                    <medical-concern-component /> 

                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                            <h2 class="accordion-header" id="form-questionnaires">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-form-questionnaires" aria-expanded="false" aria-controls="collapse-form-questionnaires">

                                    <span :class="{ 'ap-text-danger ap-margin-right': checkErrors([

                                    ]) }">
                                        <i class="lni lni-user ap-margin-right"></i> SURVEY QUESTIONS
                                    </span>
                                    <small class="ap-text-danger ap-text-italic"
                                        style="font-size: 11px;"
                                        v-if="checkErrors([
                                    ])">
                                        (Form contains remarks)
                                    </small>

                                </button>
                            </h2>
                            <div id="collapse-form-questionnaires" class="accordion-collapse collapse collapsed" aria-labelledby="form-questionnaires" data-bs-parent="#form-accordion" style="">
                                <div class="accordion-body">

                                    <questionnaires-component />

                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                            <h2 class="accordion-header" id="form-emergency">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-form-emergency" aria-expanded="false" aria-controls="collapse-form-emergency">

                                    <span :class="{ 'ap-text-danger ap-margin-right': checkErrors([
                                        'emergency_contact_name',
                                        'emergency_contact_no',
                                        'emergency_contact_address'
                                    ]) }">
                                        <i class="lni lni-user ap-margin-right"></i> IN CASE OF EMERGENCY
                                    </span>
                                    <small class="ap-text-danger ap-text-italic"
                                        style="font-size: 11px;"
                                        v-if="checkErrors([
                                        'emergency_contact_name',
                                        'emergency_contact_no',
                                        'emergency_contact_address'
                                    ])">
                                        (Form contains remarks)
                                    </small>

                                </button>
                            </h2>
                            <div id="collapse-form-emergency" class="accordion-collapse collapse collapsed" aria-labelledby="form-emergency" data-bs-parent="#form-accordion" style="">
                                <div class="accordion-body">

                                    <emergency-component />

                                </div>
                            </div>
                        </div>

                        
                    </div>
                </fieldset>

                
                <div class="ap-margin-top ap-text-right">
                    <router-link
                        v-if="!isLoading('store')"
                        class="ap-button ap-button-default ap-button-full-rounded ap-margin-small-right"
                        to="/company/beneficiaries">
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

        <photo-modal />

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { Form, Toast, Dater } from '@/utils';

import PersonalComponent from './content/personal';
import PhotoComponent from './content/photo';
import AddressComponent from './content/address';
import MapComponent from './content/map';
import OtherComponent from './content/other';
import EducationComponent from './content/education';
import MedicalConcernComponent from './content/medical-concern';
import QuestionnairesComponent from './content/questionnaires';
import EmergencyComponent from './content/emergency';

import PhotoModal from './components/modals/photo';

export default
{
    name: 'Main',

    components:
    {
        PhotoComponent,
        PersonalComponent,
        AddressComponent,
        MapComponent,
        OtherComponent,
        EducationComponent,
        MedicalConcernComponent,
        QuestionnairesComponent,
        EmergencyComponent,

        PhotoModal,
    },

    data()
    {
        return {
            errors: {},

            photoModal: false,

            form:
            {
                beneficiary_validation: true,
                date_registered: '',

                province_id: '',
                city_id: '',
                barangay_id: '',
                house_no: '',
                zone: '',
                purok: '',
                street: '',
                landmark: '',
                house_ownership: '',
                house_ownership_remarks: '',

                first_name: '',
                middle_name: '',
                last_name: '',
                gender: '',
                mobile_no: '',
                email: '',

                place_of_birth: '',
                date_of_birth: '',
                civil_status: '',
                citizenship: '',
                religion: '',

                educational_attainment: '',
                occupation: '',
                monthly_income: '',
                source_of_income: '',
                classification: '',

                is_household: 0,
                household_count: 0,
                household_voters_count: 0,
                household_families_count: 0,
                is_priority: 0,

                health_issues: '',
                problem_presented: '',
                findings: '',
                assessment_recommendation: '',
                needs: '',
                remarks: '',

                emergency_contact_name: '',
                emergency_contact_address: '',
                emergency_contact_no: '',

                questionnaires: [],

                photo: '',

                latitude: 0,
                longitude: 0,

                voter_type: 1,

            },

            province: {},
            city: {},
            barangay: {},

            changedPhoto: false,
        };
    },

    created()
    {
        window.scrollTo(0,0);

        this.initialize();

        this.loadClassifications();

        this.loadQuestionnaires();
    },

    computed:
    {
        ...mapGetters({
            accessUser: 'auth/accessUser',
            isLoading: 'companyBeneficiary/isLoading',
            classifications: 'companyBeneficiary/classifications',
            questionnaires: 'companyBeneficiary/questionnaires',
        }),

        isDeviceConnected()
        {
            return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
        },
    },

    methods:
    {
        ...mapActions({
            store: 'companyBeneficiary/store',
            loadPrerequisite: 'companyBeneficiary/loadPrerequisite'
        }),

        async submit()
        {
            this.errors = {};

            if (this.changedPhoto)
            {
                await this.$refs.photoComponent.$refs.residentRef.result({
                    format: 'png', 
                    circle: false
                }, (output) =>
                {
                    this.form.photo = output;
                });
            }

            const response = await this.store({
                url: '/my-company/beneficiary',
                form: this.form,
            });

            if (response.status === 201)
            {
                Toast.success({
                    message: 'Beneficiary has been created.'
                });

                this.$router.push(`/company/beneficiaries/${response.data.slug.code}`);
            }
            else if (response.status === 422)
            {
                window.scrollTo(0,0);

                this.errors = response.data.errors;

                Toast.error({
                    message: 'Form Validation: Kindly double check your form.'
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

        async loadClassifications()
        {
            if (this.classifications.length > 0) return false;

            this.loadPrerequisite({
                url: `/my-company/beneficiary/classification/options`,
                action: 'classifications'
            });
        },

        async loadQuestionnaires()
        {
            const response = await this.loadPrerequisite({
                url: `/my-company/beneficiary/questionnaire/options`,
                action: 'questionnaires'
            });

            if (response.status == 200)
            {
                this.questionnaires.forEach(row => {
                    
                    this.form.questionnaires.push({
                        question_id: row.id,
                        question: row.question,
                        answer: '',
                    });

                })
            }
        },

        initialize()
        {
            this.form.date_registered = Dater.rawToday();

            this.form.province_id = this.accessUser.company.province_id;
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
        },
    },
}
</script>
