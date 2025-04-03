<template>
    <ap-modal
        :isOpen.sync="$parent.$data.createModal"
        :isCenter="true"
        :size="'container'">

        <ap-modal-body>
            <ap-modal-title>
                Create Assistance
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">

                <div class="ap-card ap-card-body ap-card-small ap-card-default ap-padding-small ap-margin-top">
                    <p class="ap-text-italic ap-text-bold">
                        Search a {{ appBeneficiaryName }}
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
                            {{ appBeneficiaryName }} not found on the list? <a class="ap-link-reset ap-text-primary ap-point" @click="toggleModal('createBeneficiary', true)">Create New</a>
                        </small>
                    </div>

                    <div class="ap-margin-top">
                        <small class="ap-text-bold ap-text-italic">
                            Selected {{ appBeneficiaryName }}:
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
                            :label="'* Request Date'"
                            v-model="form.assistance_date"
                            :error="hasError('assistance_date') ? errors.assistance_date[0] : ''"/>

                        <ap-grid :gutter="'small'">
                            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                                <ap-input
                                    list="assistanceTypeOptions"
                                    type="text"
                                    :readonly="isLoading('store')"
                                    :label="'* Type of Assistance'"
                                    :required="true"
                                    :placeholder="'ex. FINANCIAL ASSISTANCE'"
                                    v-model="form.assistance_type"
                                    :error="hasError('assistance_type') ? errors.assistance_type[0] : ''"/>

                                <datalist id="assistanceTypeOptions">
                                    <option value="FINANCIAL ASSISTANCE" />
                                    <option value="GUARANTEE LETTER" />
                                    <option value="MEDICAL/MEDICINE" />
                                    <option value="DENTAL" />
                                    <option value="EDUCATION/SCHOLARSHIP" />
                                    <option value="JOB" />
                                    <option value="HOUSING" />
                                    <option value="BURIAL" />
                                    <option value="HEALTH SERVICE" />
                                </datalist>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                                <ap-input
                                    type="number"
                                    :readonly="isLoading('store')"
                                    :label="'Amount (if applicable)'"
                                    :required="true"
                                    v-model="form.assistance_amount"
                                    :error="hasError('assistance_amount') ? errors.assistance_amount[0] : ''"/>
                            </div>
                        </ap-grid>

                        <div class="ap-margin-top">
                            <label class="ap-text-bold ap-form-label">
                                Other Remarks
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

                        <div class="ap-margin-top">
                            <ap-grid :gutter="'small'">
                                <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                    <label class="ap-form-label ap-text-bold">
                                        Assisted?
                                    </label>

                                    <div class="ap-inline ap-margin-small-top">
                                        <label for="edit-is-assisted-yes">
                                            <input class="ap-checkbox" id="edit-is-assisted-yes" type="radio"
                                                :value="1"
                                                v-model="form.is_assisted">
                                            <span class="ap-margin-small-left">
                                                Yes
                                            </span>
                                        </label>
                                    </div>
                                    <div class="ap-inline ap-margin-small-top ap-margin-left">
                                        <label for="edit-is-assisted-no">
                                            <input class="ap-checkbox" id="edit-is-assisted-no" type="radio"
                                                :value="0"
                                                v-model="form.is_assisted">
                                            <span class="ap-margin-small-left">
                                                No
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                    <ap-input
                                        v-show="form.is_assisted"
                                        type="date"
                                        :readonly="isLoading('store')"
                                        :label="'* Date Assisted'"
                                        v-model="form.assisted_date"
                                        :error="hasError('assisted_date') ? errors.assisted_date[0] : ''"/>
                                </div>
                                <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                    <ap-input
                                        v-show="form.is_assisted"
                                        type="text"
                                        :readonly="isLoading('store')"
                                        :label="'* Assisted By'"
                                        :placeholder="'ex. JUAN DELA CRUZ'"
                                        v-model="form.assisted_by"
                                        :error="hasError('assisted_by') ? errors.assisted_by[0] : ''"/>
                                </div>
                            </ap-grid>

                            <ap-input
                                list="assistanceFromOptions"
                                type="text"
                                :readonly="isLoading('store')"
                                :label="'* Assistance From'"
                                :placeholder="'ex. CONGRESSMAN'"
                                v-model="form.assistance_from"
                                :error="hasError('assistance_from') ? errors.assistance_from[0] : ''"/>

                            <datalist id="assistanceFromOptions"
                                v-if="company.province_id == '0369'">
                                <option value="VY" />
                                <option value="SY" />
                                <option value="CY" />
                            </datalist>

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
                assistance_date: '',
                assistance_type: '',
                assistance_amount: 0,
                remarks: '',
                is_assisted: 0,
                assisted_date: '',
                assisted_by: '',
                assistance_from: '',
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
            assistance: 'companyAssistance/selected',
            isLoading: 'companyAssistance/isLoading',
            accessUser: 'auth/accessUser',
        }),

        company()
        {
            return this.accessUser.company;
        },

        hasBeneficiary()
        {
            return Object.keys(this.beneficiary).length > 0;
        },

        createModal()
        {
            return this.$parent.$data.createModal;
        },

        appBeneficiaryName()
        {
            return process.env.APP_BENEFICIARY_SINGULAR_NAME;
        },
    },

    methods:
    {
        ...mapActions({
            store: 'companyAssistance/store',
        }),

        async submit()
        {
            this.errors = {};
            
            const response = await this.store({
                url: `/my-company/assistance`,
                form: this.form,
            });

            if (response.status === 201)
            {
                this.closeModal();

                Toast.success({
                    message: 'Assistance has been created.'
                });
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
            this.form.assistance_date = Dater.rawToday();
            this.form.assistance_type = '';
            this.form.assistance_amount = 0;
            this.form.remarks = '';
            this.form.is_assisted = 0;
            this.form.assisted_date = Dater.rawToday();
            this.form.assisted_by = '';
            this.form.assistance_from = '';

            if (Object.keys(this.assistance).length > 0)
            {
                this.beneficiary =  this.assistance.beneficiary;
                this.form.beneficiaryCode = this.assistance.beneficiary.slug.code;
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
