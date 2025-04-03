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
                            <i class="lni lni-user ap-margin-right"></i> PERSONAL INFORMATION
                        </h6>

                        <hr>

                        <personal-component />
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
                                        <i class="lni lni-user ap-margin-right"></i> CURRENT ADDRESS
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

                                </div>
                            </div>
                        </div>

                        
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="form-voter">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-form-voter" aria-expanded="true" aria-controls="collapse-form-voter">

                                    <span>
                                        <i class="lni lni-user ap-margin-right"></i> VOTER REGISTRATION
                                    </span>

                                </button>
                            </h2>
                            <div id="collapse-form-voter" class="accordion-collapse collapse show" aria-labelledby="form-voter" data-bs-parent="#form-accordion" style="">
                                <div class="accordion-body">

                                    <voter-component />

                                </div>
                            </div>
                        </div>

                        
                    </div>
                </fieldset>

                
                <div class="ap-margin-top ap-text-right">
                    <router-link
                        v-if="!isLoading('store')"
                        class="ap-button ap-button-default ap-button-full-rounded ap-margin-small-right"
                        to="/company/voters">
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

import { Form, Toast, Dater } from '@/utils';

import PersonalComponent from './content/personal';
import AddressComponent from './content/address';
import VoterComponent from './content/voter';

export default
{
    name: 'Main',

    components:
    {
        PersonalComponent,
        AddressComponent,
        VoterComponent,
    },

    data()
    {
        return {
            errors: {},

            form:
            {
                voter_validation: true,
                date_registered: '',

                province_id: '',
                city_id: '',
                barangay_id: '',
                house_no: '',

                first_name: '',
                middle_name: '',
                last_name: '',
                gender: '',
                date_of_birth: '',

                precinct_no: '',
                application_no: '',
                application_date: '',
                application_type: '',

            },

            province: {},
            city: {},
            barangay: {},
        };
    },

    created()
    {
        window.scrollTo(0,0);

        this.initialize();
    },

    computed:
    {
        ...mapGetters({
            accessUser: 'auth/accessUser',
            isLoading: 'companyVoter/isLoading',
        }),
    },

    methods:
    {
        ...mapActions({
            store: 'companyVoter/store',
            loadPrerequisite: 'companyVoter/loadPrerequisite'
        }),

        async submit()
        {
            this.errors = {};

            const response = await this.store({
                url: '/my-company/voter',
                form: this.form,
            });

            if (response.status === 201)
            {
                Toast.success({
                    message: 'Voter has been created.'
                });

                this.$router.push(`/company/voters/${response.data.slug.code}`);
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
