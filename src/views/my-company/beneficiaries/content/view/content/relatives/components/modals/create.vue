<template>
    <ap-modal
        :isOpen.sync="$parent.$data.createModal"
        :isCenter="true"
        :size="'container'">

        <ap-modal-body>
            <ap-modal-title>
                Add Relative to {{beneficiary.last_name}}, {{beneficiary.first_name}} {{beneficiary.middle_name}}
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
                        <div v-if="hasRelative">
                            <ap-grid :gutter="'small'">
                                <div class="ap-width-expand">
                                    <ap-grid :gutter="'small'">
                                        <div class="ap-width-fit-content">
                                            <ap-avatar
                                                :shape="'default'"
                                                :src="relative.photo"
                                                :label="'AA'" />
                                        </div>
                                        <div class="ap-width-expand">
                                            <h5 class="ap-text-bold ap-margin-remove">
                                                {{relative.last_name}}, {{relative.first_name}} {{relative.middle_name}}
                                            </h5>
                                            <p>
                                                {{relative.gender.name}}
                                                &middot;
                                                {{age(relative.date_of_birth)}} yrs old
                                                &middot;
                                                BRGY {{relative.barangay.name}}, {{relative.city.name}}
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

            <div class="ap-margin-top">
                <form class="ap-form-stacked"
                    @submit.prevent="submit()">
                    <fieldset class="ap-fieldset">

                        <div class="ap-margin">
                            <label class="ap-text-bold ap-form-label"
                                :class="{ 'ap-text-danger': hasError('relationship')}">
                                What is the relationship
                                to
                                <span v-if="hasRelative">
                                    {{relative.last_name}}, {{relative.first_name}} {{relative.middle_name}}
                                </span>
                                ?
                            </label>

                            <select
                                class="ap-select"
                                :required="true"
                                v-model="form.relationship"
                                :readonly="isLoading('store')">
                                <option :value="''" disabled>-- select relationship --</option>
                                <option
                                    v-for="(relationship, index) in relationships"
                                    :key="index"
                                    :value="index">
                                        {{index}}
                                    </option>
                            </select>

                            <small class="ap-text-bold ap-text-danger"
                                v-if="hasError('relationship')">
                                <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                                {{errors.relationship[0]}}
                            </small>
                        </div>
                    </fieldset>

                    <div class="ap-margin ap-text-right">
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

            items: [],
            itemsLoading: false,
            showItems: false,

            relationships: [],
            relationshipsLoading: false,

            form:
            {
                relativeCode: '',
                relationship: '',
            },

            searchForm:
            {
                firstName: '',
                middleName: '',
                lastName: '',
            },

            relative: {},
        };
    },

    created()
    {
        this.initialize();

        this.loadRelationships();
    },

    computed:
    {
        ...mapGetters({
            beneficiary: 'companyBeneficiary/selected',
            isLoading: 'companyBeneficiaryRelative/isLoading',
        }),

        hasRelative()
        {
            return Object.keys(this.relative).length > 0;
        },

        hasResident()
        {
            return Object.keys(this.beneficiary).length > 0;
        },
    },

    methods:
    {
        ...mapActions({
            store: 'companyBeneficiaryRelative/store',
        }),

        async submit()
        {
            this.errors = {};
            
            const response = await this.store({
                url: `/my-company/beneficiary/${this.beneficiary.slug.code}/relative`,
                form: this.form,
            });

            if (response.status === 201)
            {
                this.initialize();

                this.closeModal();

                Toast.success({
                    message: 'Relative has been added.'
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

            const response = await Http.get(`/my-company/beneficiary/options?firstName=${this.searchForm.firstName}&middleName=${this.searchForm.middleName}&lastName=${this.searchForm.lastName}`)

            this.itemsLoading = false;

            if (response.status == 200)
            {
                this.items = response.data;

                this.showItems = true;
            }
        },

        async loadRelationships()
        {
            this.relationshipsLoading = true;

            const response = await Http.get(`/my-company/beneficiary/relationship/options`);

            this.relationshipsLoading = false;

            if (response.status == 200)
            {
                this.relationships = response.data;
            }
        },

        select(item)
        {
            this.form.relativeCode = item.slug.code;
            this.relative = item;

            this.showItems = false;

            this.errors = {};
        },

        remove()
        {
            this.form.relativeCode = '';
            this.relative = {};
        },

        age(date)
        {
            return Dater.age(date);
        },

        initialize()
        {
            this.items = [];
            this.form.relativeCode = '';
            this.form.relationship = '';
            this.searchForm.firstName = '';
            this.searchForm.middleName = '';
            this.searchForm.lastName = '';

            this.relative = {};
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
