<template>
    <div class="ap-card ap-card-body ap-card-default ap-padding-small ap-margin-top">
        <small class="ap-text-bold">
            DOCUMENT PREFIX & COMMITTEES
        </small>

        <form class="ap-form-stacked"
            @submit.prevent="submit()">
            <fieldset class="ap-fieldset">

                <div class="ap-margin-top">
                    <ap-input
                        v-if="!isLoading('caseSetting')"
                        type="text"
                        :required="true"
                        :readonly="submitLoading"
                        :label="'* Case Prefix'"
                        v-model="form.case_prefix"
                        :error="hasError('case_prefix') ? errors.case_prefix[0] : ''" />
                    <div v-else>
                        <label class="ap-form-label ap-text-bold">
                            * Case Prefix
                        </label>
                        <ap-placeholder
                            :size="'medium'" />
                    </div>

                    <ap-grid :gutter="'small'">
                        <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                            <p class="ap-text-primary ap-text-bold">
                                PUNONG BARANGAY
                            </p>
                            <div class="ap-margin">
                                <select class="ap-select"
                                    v-if="!isLoading('officials')"
                                    @change="onSelectOption($event, 'punong_barangay', 'officials')"
                                    v-model="selectedPunongBarangay">
                                    <option :value="''" disabled>-- select punong barangay --</option>
                                    <option
                                        v-for="(item, index) in officials"
                                        :key="index"
                                        :value="item.id">
                                        {{item.name}}
                                    </option>
                                </select>
                                <ap-placeholder
                                    v-else
                                    :size="'medium'"/>
                            </div>
                            
                            <ap-input
                                v-if="!isLoading('caseSetting')"
                                type="text"
                                :required="true"
                                :readonly="submitLoading"
                                :label="'* Full Name'"
                                v-model="form.punong_barangay_name"
                                :error="hasError('punong_barangay_name') ? errors.punong_barangay_name[0] : ''" />
                            <div v-else>
                                <label class="ap-form-label ap-text-bold">
                                    * Full Name
                                </label>
                                <ap-placeholder
                                    :size="'medium'" />
                            </div>

                            <ap-input
                                v-if="!isLoading('caseSetting')"
                                type="text"
                                :required="true"
                                :readonly="submitLoading"
                                :label="'* Position'"
                                v-model="form.punong_barangay_position"
                                :error="hasError('punong_barangay_position') ? errors.punong_barangay_position[0] : ''" />
                            <div v-else>
                                <label class="ap-form-label ap-text-bold">
                                    * Position
                                </label>
                                <ap-placeholder
                                    :size="'medium'" />
                            </div>
                        </div>
                        <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                            <p class="ap-text-primary ap-text-bold">
                                BARANGAY SECRETARY
                            </p>
                            <div class="ap-margin">
                                <select class="ap-select"
                                    v-if="!isLoading('officials')"
                                    @change="onSelectOption($event, 'barangay_secretary', 'officials')"
                                    v-model="selectedBarangaySecretary">
                                    <option :value="''" disabled>-- select barangay secretary --</option>
                                    <option
                                        v-for="(item, index) in officials"
                                        :key="index"
                                        :value="item.id">
                                        {{item.name}}
                                    </option>
                                </select>
                                <ap-placeholder
                                    v-else
                                    :size="'medium'"/>
                            </div>
                            
                            <ap-input
                                v-if="!isLoading('caseSetting')"
                                type="text"
                                :required="true"
                                :readonly="submitLoading"
                                :label="'* Full Name'"
                                v-model="form.barangay_secretary_name"
                                :error="hasError('barangay_secretary_name') ? errors.barangay_secretary_name[0] : ''" />
                            <div v-else>
                                <label class="ap-form-label ap-text-bold">
                                    * Full Name
                                </label>
                                <ap-placeholder
                                    :size="'medium'" />
                            </div>

                            <ap-input
                                v-if="!isLoading('caseSetting')"
                                type="text"
                                :required="true"
                                :readonly="submitLoading"
                                :label="'* Position'"
                                v-model="form.barangay_secretary_position"
                                :error="hasError('barangay_secretary_position') ? errors.barangay_secretary_position[0] : ''" />
                            <div v-else>
                                <label class="ap-form-label ap-text-bold">
                                    * Position
                                </label>
                                <ap-placeholder
                                    :size="'medium'" />
                            </div>
                        </div>
                    </ap-grid>

                    <ap-grid :gutter="'small'">
                        <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                            <p class="ap-text-primary ap-text-bold">
                                LUPON CHAIRMAN
                            </p>
                            <div class="ap-margin">
                                <select class="ap-select"
                                    v-if="!isLoading('officials')"
                                    @change="onSelectOption($event, 'lupon_chairman', 'officials')"
                                    v-model="selectedLuponChairman">
                                    <option :value="''" disabled>-- select lupon chairman --</option>
                                    <option
                                        v-for="(item, index) in officials"
                                        :key="index"
                                        :value="item.id">
                                        {{item.name}}
                                    </option>
                                </select>
                                <ap-placeholder
                                    v-else
                                    :size="'medium'"/>
                            </div>
                            
                            <ap-input
                                v-if="!isLoading('caseSetting')"
                                type="text"
                                :readonly="submitLoading"
                                :label="'Full Name'"
                                v-model="form.lupon_chairman_name"
                                :error="hasError('lupon_chairman_name') ? errors.lupon_chairman_name[0] : ''" />
                            <div v-else>
                                <label class="ap-form-label ap-text-bold">
                                    Full Name
                                </label>
                                <ap-placeholder
                                    :size="'medium'" />
                            </div>

                            <ap-input
                                v-if="!isLoading('caseSetting')"
                                type="text"
                                :readonly="submitLoading"
                                :label="'Position'"
                                v-model="form.lupon_chairman_position"
                                :error="hasError('lupon_chairman_position') ? errors.lupon_chairman_position[0] : ''" />
                            <div v-else>
                                <label class="ap-form-label ap-text-bold">
                                    Position
                                </label>
                                <ap-placeholder
                                    :size="'medium'" />
                            </div>
                        </div>
                        <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                            <p class="ap-text-primary ap-text-bold">
                                LUPON SECRETARY
                            </p>
                            <div class="ap-margin">
                                <select class="ap-select"
                                    v-if="!isLoading('officials')"
                                    @change="onSelectOption($event, 'lupon_secretary', 'officials')"
                                    v-model="selectedLuponSecretary">
                                    <option :value="''" disabled>-- select lupon secretary --</option>
                                    <option
                                        v-for="(item, index) in officials"
                                        :key="index"
                                        :value="item.id">
                                        {{item.name}}
                                    </option>
                                </select>
                                <ap-placeholder
                                    v-else
                                    :size="'medium'"/>
                            </div>
                            
                            <ap-input
                                v-if="!isLoading('caseSetting')"
                                type="text"
                                :readonly="submitLoading"
                                :label="'Full Name'"
                                v-model="form.lupon_secretary_name"
                                :error="hasError('lupon_secretary_name') ? errors.lupon_secretary_name[0] : ''" />
                            <div v-else>
                                <label class="ap-form-label ap-text-bold">
                                    Full Name
                                </label>
                                <ap-placeholder
                                    :size="'medium'" />
                            </div>

                            <ap-input
                                v-if="!isLoading('caseSetting')"
                                type="text"
                                :readonly="submitLoading"
                                :label="'Position'"
                                v-model="form.lupon_secretary_position"
                                :error="hasError('lupon_secretary_position') ? errors.lupon_secretary_position[0] : ''" />
                            <div v-else>
                                <label class="ap-form-label ap-text-bold">
                                    Position
                                </label>
                                <ap-placeholder
                                    :size="'medium'" />
                            </div>
                        </div>
                    </ap-grid>

                    <ap-grid :gutter="'small'">
                        <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                            <p class="ap-text-primary ap-text-bold">
                                PANGKAT CHAIRMAN
                            </p>
                            <div class="ap-margin">
                                <select class="ap-select"
                                    v-if="!isLoading('members')"
                                    @change="onSelectOption($event, 'pangkat_chairman', 'members')"
                                    v-model="selectedPangkatChairman">
                                    <option :value="''" disabled>-- select pangkat chairman --</option>
                                    <option
                                        v-for="(item, index) in members"
                                        :key="index"
                                        :value="item.id">
                                        {{item.name}}
                                    </option>
                                </select>
                                <ap-placeholder
                                    v-else
                                    :size="'medium'"/>
                            </div>
                            
                            <ap-input
                                v-if="!isLoading('caseSetting')"
                                type="text"
                                :readonly="submitLoading"
                                :label="'Full Name'"
                                v-model="form.pangkat_chairman_name"
                                :error="hasError('pangkat_chairman_name') ? errors.pangkat_chairman_name[0] : ''" />
                            <div v-else>
                                <label class="ap-form-label ap-text-bold">
                                    Full Name
                                </label>
                                <ap-placeholder
                                    :size="'medium'" />
                            </div>

                            <ap-input
                                v-if="!isLoading('caseSetting')"
                                type="text"
                                :readonly="submitLoading"
                                :label="'Position'"
                                v-model="form.pangkat_chairman_position"
                                :error="hasError('pangkat_chairman_position') ? errors.pangkat_chairman_position[0] : ''" />
                            <div v-else>
                                <label class="ap-form-label ap-text-bold">
                                    Position
                                </label>
                                <ap-placeholder
                                    :size="'medium'" />
                            </div>
                        </div>
                        <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                            <p class="ap-text-primary ap-text-bold">
                                PANGKAT SECRETARY
                            </p>
                            <div class="ap-margin">
                                <select class="ap-select"
                                    v-if="!isLoading('members')"
                                    @change="onSelectOption($event, 'pangkat_secretary', 'members')"
                                    v-model="selectedPangkatSecretary">
                                    <option :value="''" disabled>-- select pangkat secretary --</option>
                                    <option
                                        v-for="(item, index) in members"
                                        :key="index"
                                        :value="item.id">
                                        {{item.name}}
                                    </option>
                                </select>
                                <ap-placeholder
                                    v-else
                                    :size="'medium'"/>
                            </div>
                            
                            <ap-input
                                v-if="!isLoading('caseSetting')"
                                type="text"
                                :readonly="submitLoading"
                                :label="'Full Name'"
                                v-model="form.pangkat_secretary_name"
                                :error="hasError('pangkat_secretary_name') ? errors.pangkat_secretary_name[0] : ''" />
                            <div v-else>
                                <label class="ap-form-label ap-text-bold">
                                    Full Name
                                </label>
                                <ap-placeholder
                                    :size="'medium'" />
                            </div>

                            <ap-input
                                v-if="!isLoading('caseSetting')"
                                type="text"
                                :readonly="submitLoading"
                                :label="'Position'"
                                v-model="form.pangkat_secretary_position"
                                :error="hasError('pangkat_secretary_position') ? errors.pangkat_secretary_position[0] : ''" />
                            <div v-else>
                                <label class="ap-form-label ap-text-bold">
                                    Position
                                </label>
                                <ap-placeholder
                                    :size="'medium'" />
                            </div>
                        </div>
                        
                    </ap-grid>

                    <ap-grid :gutter="'small'">
                        <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                            <p class="ap-text-primary ap-text-bold">
                                PANGKAT MEMBER
                            </p>
                            <div class="ap-margin">
                                <select class="ap-select"
                                    v-if="!isLoading('members')"
                                    @change="onSelectOption($event, 'pangkat_member', 'members')"
                                    v-model="selectedPangkatMember">
                                    <option :value="''" disabled>-- select pangkat member --</option>
                                    <option
                                        v-for="(item, index) in members"
                                        :key="index"
                                        :value="item.id">
                                        {{item.name}}
                                    </option>
                                </select>
                                <ap-placeholder
                                    v-else
                                    :size="'medium'"/>
                            </div>
                            
                            <ap-input
                                v-if="!isLoading('caseSetting')"
                                type="text"
                                :readonly="submitLoading"
                                :label="'Full Name'"
                                v-model="form.pangkat_member_name"
                                :error="hasError('pangkat_member_name') ? errors.pangkat_member_name[0] : ''" />
                            <div v-else>
                                <label class="ap-form-label ap-text-bold">
                                    Full Name
                                </label>
                                <ap-placeholder
                                    :size="'medium'" />
                            </div>

                            <ap-input
                                v-if="!isLoading('caseSetting')"
                                type="text"
                                :readonly="submitLoading"
                                :label="'Position'"
                                v-model="form.pangkat_member_position"
                                :error="hasError('pangkat_member_position') ? errors.pangkat_member_position[0] : ''" />
                            <div v-else>
                                <label class="ap-form-label ap-text-bold">
                                    Position
                                </label>
                                <ap-placeholder
                                    :size="'medium'" />
                            </div>
                        </div>
                        <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                            <p class="ap-text-primary ap-text-bold">
                                WARRANT OFFICER
                            </p>
                            <div class="ap-margin">
                                <select class="ap-select"
                                    v-if="!isLoading('officers')"
                                    @change="onSelectOption($event, 'warrant_officer', 'officers')"
                                    v-model="selectedWarrantOfficer">
                                    <option :value="''" disabled>-- select warrant officer --</option>
                                    <option
                                        v-for="(item, index) in officers"
                                        :key="index"
                                        :value="item.id">
                                        {{item.name}}
                                    </option>
                                </select>
                                <ap-placeholder
                                    v-else
                                    :size="'medium'"/>
                            </div>
                            
                            <ap-input
                                v-if="!isLoading('caseSetting')"
                                type="text"
                                :readonly="submitLoading"
                                :label="'Full Name'"
                                v-model="form.warrant_officer_name"
                                :error="hasError('warrant_officer_name') ? errors.warrant_officer_name[0] : ''" />
                            <div v-else>
                                <label class="ap-form-label ap-text-bold">
                                    Full Name
                                </label>
                                <ap-placeholder
                                    :size="'medium'" />
                            </div>

                            <ap-input
                                v-if="!isLoading('caseSetting')"
                                type="text"
                                :readonly="submitLoading"
                                :label="'Position'"
                                v-model="form.warrant_officer_position"
                                :error="hasError('warrant_officer_position') ? errors.warrant_officer_position[0] : ''" />
                            <div v-else>
                                <label class="ap-form-label ap-text-bold">
                                    Position
                                </label>
                                <ap-placeholder
                                    :size="'medium'" />
                            </div>
                        </div>
                    </ap-grid>
                </div>
            </fieldset>

            <div class="ap-margin ap-text-right">
                <ap-button
                    type="submit"
                    :color="'primary'"
                    :rounded="true"
                    :loading="submitLoading">
                    Submit
                </ap-button>
            </div>
        </form>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import Http from '@/services';

import { Form, Toast } from '@/utils';

export default
{
    data()
    {
        return {
            errors: {},

            submitLoading: false,
            
            selectedPunongBarangay: '',
            selectedBarangaySecretary: '',
            selectedLuponChairman: '',
            selectedLuponSecretary: '',
            selectedPangkatChairman: '',
            selectedPangkatSecretary: '',
            selectedPangkatMember: '',
            selectedWarrantOfficer: '',
        };
    },

    computed:
    {
        ...mapGetters({
            barangay: 'adminBarangay/selected',
            caseSetting: 'adminBarangay/caseSetting',
            isLoading: 'adminBarangay/isLoading',
            accounts: 'adminBarangay/accounts',
            officials: 'adminBarangay/officials',
            members: 'adminBarangay/members',
            officers: 'adminBarangay/officers',
        }),

        hasCaseSetting()
        {
            return Object.keys(this.caseSetting).length > 0;
        },

        form()
        {
            return this.$parent.$data.form;
        },
    },

    methods:
    {
        ...mapActions({
            update: 'adminBarangay/updateCaseSetting',
        }),

        async submit()
        {
            this.errors = {};

            this.submitLoading = true;
            
            const response = await Http.put(
                `/administration/barangay/${this.$route.params.code}/case/setting`,
                this.form,
            );

            this.submitLoading = false;

            if (response.status === 200)
            {
                this.update(response.data);

                Toast.success({
                    message: 'Data has been updated.'
                });
            }
            else if (response.status === 422)
            {
                this.errors = response.data.errors;
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

        onSelectOption(event, formName, listName)
        {
            let id = event.target.value;

            let selected = this[listName].find(row => row.id == id);

            if (selected)
            {
                this.form[`${formName}_name`] = selected.name;
            }
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },
    },
};
</script>
