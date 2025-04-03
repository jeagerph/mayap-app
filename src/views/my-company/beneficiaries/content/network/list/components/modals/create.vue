<template>
    <ap-modal
        :isOpen.sync="$parent.$data.createModal"
        :isCenter="true"
        :size="'container'">

        <ap-modal-body>
            <ap-modal-title>
                Add Network to {{ beneficiary.full_name }}
            </ap-modal-title>

            <hr class="ap-margin-small-top">

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

                <div v-if="!itemsLoading">
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
                                    <div class="ap-width-expand@m">
                                        <ap-grid :gutter="'small'">
                                            <div class="ap-width-fit-content">
                                                <ap-avatar
                                                    :shape="'default'"
                                                    :src="item.photo"
                                                    :label="'AA'" />
                                            </div>
                                            <div class="ap-width-expand">
                                                <h5 class="ap-text-bold ap-margin-remove">
                                                    {{item.full_name}}
                                                </h5>
                                                <p class="ap-margin-remove">
                                                    {{item.gender.name}}
                                                    &middot;
                                                    {{age(item.date_of_birth)}} yrs old
                                                    &middot;
                                                    BRGY {{item.barangay.name}}, {{item.city.name}}
                                                </p>
                                                <div class="badge bg-primary ap-margin-remove">
                                                    <span v-if="item.network">
                                                        Network under <span class="ap-text-bold">{{ item.network.parent_beneficiary.full_name }}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </ap-grid>
                                    </div>
                                    <div class="ap-text-right@m">
                                        <ap-button
                                            :size="'small'"
                                            :color="'primary'"
                                            :outline="true"
                                            @click="select(item)">
                                            SELECT
                                        </ap-button>
                                    </div>
                                </ap-grid>
                                
                                
                            </li>
                        </ul>
                    </div>
                    <p class="ap-text-italic" v-else>
                        No search result yet
                    </p>
                </div>
                <div v-else>
                    <ap-placeholder
                        :size="'medium'" />
                </div>
            </div>

            <div class="ap-margin-top">
                <small class="ap-text-bold">
                    Beneficiary not found on the list? <a class="ap-link-reset ap-text-primary ap-point" @click="toggleModal('createBeneficiary', true)">Create New</a>
                </small>
            </div>

            <div class="ap-card ap-card-body ap-card-small ap-card-default ap-padding-small ap-margin-top"
                v-if="hasSelectedBeneficiary">
                <label class="ap-form-label ap-text-bold ap-text-italic">
                    Selected Beneficiary:
                </label>

                <div v-if="hasSelectedBeneficiary"
                    class="ap-margin-small-top">
                    <ap-grid :gutter="'small'">
                        <div class="ap-width-expand@m">
                            <ap-grid :gutter="'small'">
                                <div class="ap-width-fit-content">
                                    <ap-avatar
                                        :shape="'default'"
                                        :src="selectedBeneficiary.photo"
                                        :label="'AA'" />
                                </div>
                                <div class="ap-width-expand">
                                    <h5 class="ap-text-bold ap-margin-remove">
                                        {{selectedBeneficiary.last_name}}, {{selectedBeneficiary.first_name}} {{selectedBeneficiary.middle_name}}
                                    </h5>
                                    <p>
                                        {{selectedBeneficiary.gender.name}}
                                        &middot;
                                        {{age(selectedBeneficiary.date_of_birth)}} yrs old
                                        &middot;
                                        BRGY {{selectedBeneficiary.barangay.name}}, {{selectedBeneficiary.city.name}}
                                    </p>
                                </div>
                            </ap-grid>
                        </div>
                        <div class="ap-text-right@m">
                            <ap-button
                                :size="'small'"
                                :color="'danger'"
                                :outline="true"
                                @click="remove()">
                                REMOVE
                            </ap-button>
                        </div>
                    </ap-grid>
                    
                </div>
            </div>

            <div class="ap-card ap-card-body ap-card-small ap-card-default ap-padding-small ap- text-center ap-margin-top"
                v-else>
                <p class="ap-text-bold ap-text-italic">
                    No selected beneficiary yet
                </p>
            </div>

            <div class="ap-margin ap-text-right">
                <ap-button
                    v-if="!submitLoading"
                    type="button"
                    class="ap-margin-small-right"
                    @click="closeModal()">
                    Cancel
                </ap-button>
                <ap-button
                    type="button"
                    :color="'primary'"
                    :outline="false"
                    :loading="submitLoading"
                    @click="submit()">
                    Submit
                </ap-button>
            </div>
        </ap-modal-body>

        <create-beneficiary-modal />
    </ap-modal>
</template>

<script>
import { mapGetters } from 'vuex';

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

            items: [],
            itemsLoading: false,

            form:
            {
                beneficiaryCode: ''
            },

            searchForm:
            {
                firstName: '',
                middleName: '',
                lastName: '',
            },

            selectedBeneficiary: {},
            submitLoading: false,
        };
    },

    created()
    {
        this.initialize();
    },

    computed:
    {
        ...mapGetters({
            beneficiary: 'companyBeneficiary/selected',
            isLoading: 'companyBeneficiaryNetwork/isLoading',
            networks: 'companyBeneficiaryNetwork/networks',
        }),

        hasSelectedBeneficiary()
        {
            return Object.keys(this.selectedBeneficiary).length > 0;
        },
    },

    methods:
    {
        async submit()
        {
            this.errors = {};

            this.submitLoading = true;
            
            const response = await Http.post(
                `/my-company/beneficiary/${this.beneficiary.slug.code}/network`,
                this.form,
            );

            this.submitLoading = false;

            if (response.status === 200)
            {
                this.networks.push(response.data);
                
                this.initialize();

                this.closeModal();

                Toast.success({
                    message: 'Beneficiary has been added.'
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

            const response = await Http.get(`/my-company/beneficiary/network/options?firstName=${this.searchForm.firstName}&middleName=${this.searchForm.middleName}&lastName=${this.searchForm.lastName}`)

            this.itemsLoading = false;

            if (response.status == 200)
            {
                this.items = response.data;
            }
        },

        select(item)
        {
            this.form.beneficiaryCode = item.slug.code;
            this.selectedBeneficiary = item;
        },

        remove()
        {
            this.form.beneficiaryCode = '';
            this.selectedBeneficiary = {};
        },

        age(date)
        {
            return Dater.age(date);
        },

        initialize()
        {
            this.items = [];
            this.form.benefiaryCode = '';

            this.searchForm.firstName = '';
            this.searchForm.middleName = '';
            this.searchForm.lastName = '';

            this.selectedBeneficiary = {};
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
};
</script>
