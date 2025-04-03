<template>
    <div class="ap-animate ap-animate-fade-in">
        
        <div class="ap-padding-small">

            <form class="ap-form-stacked"
                @submit.prevent="submit()">
                <fieldset class="ap-fieldset">

                    <ap-grid :gutter="'small'">
                        <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                            <ap-input
                                v-if="!isLoading('invoiceSetting')"
                                type="number"
                                :required="true"
                                step=".01"
                                :readonly="submitLoading"
                                :label="'* Domain & Hosting'"
                                v-model="form.domain_hosting"
                                :error="hasError('domain_hosting') ? errors.domain_hosting[0] : ''"/>
                            <div v-else>
                                <label class="ap-form-label ap-text-bold">
                                    * Domain & Hosting
                                </label>
                                <ap-placeholder
                                    :size="'medium'" />
                            </div>
                        </div>
                        <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                            <ap-input
                                v-if="!isLoading('invoiceSetting')"
                                type="number"
                                :required="true"
                                step=".01"
                                :readonly="submitLoading"
                                :label="'* Virtual Storage'"
                                v-model="form.virtual_storage"
                                :error="hasError('virtual_storage') ? errors.virtual_storage[0] : ''"/>
                            <div v-else>
                                <label class="ap-form-label ap-text-bold">
                                    * Virtual Storage
                                </label>
                                <ap-placeholder
                                    :size="'medium'" />
                            </div>
                        </div>
                    </ap-grid>
                    
                    <ap-grid :gutter="'small'">
                        <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                            <ap-input
                                v-if="!isLoading('invoiceSetting')"
                                type="number"
                                :required="true"
                                step=".01"
                                :readonly="submitLoading"
                                :label="'* Branding SMS'"
                                v-model="form.branding_sms"
                                :error="hasError('branding_sms') ? errors.branding_sms[0] : ''"/>
                            <div v-else>
                                <label class="ap-form-label ap-text-bold">
                                    * Branding SMS
                                </label>
                                <ap-placeholder
                                    :size="'medium'" />
                            </div>
                        </div>
                        <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                            <ap-input
                                v-if="!isLoading('invoiceSetting')"
                                type="number"
                                :required="true"
                                step=".01"
                                :readonly="submitLoading"
                                :label="'* Regular SMS'"
                                v-model="form.regular_sms"
                                :error="hasError('regular_sms') ? errors.regular_sms[0] : ''"/>
                            <div v-else>
                                <label class="ap-form-label ap-text-bold">
                                    * Regular SMS
                                </label>
                                <ap-placeholder
                                    :size="'medium'" />
                            </div>
                        </div>
                    </ap-grid>

                    <ap-grid :gutter="'small'">
                        <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                            <p class="ap-text-bold ap-text-primary">
                                LEFT REPRESENTATIVE
                            </p>

                            <ap-grid :gutter="'small'"
                                class="ap-flex-middle">
                                <div class="ap-width-1-1@s ap-width-4-5@m ap-width-4-5@l"
                                    :class="{ 'ap-opacity': !form.show_left_representative }">
                                    <label class="ap-text-bold ap-form-label">
                                        {{`${form.show_left_representative?'* ':''}Left Representative`}}
                                    </label>
                                </div>
                                <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                                    <div class="ap-text-center">
                                        <input class="ap-checkbox" id="create-show-left-representative" type="checkbox"
                                            :true-value="1"
                                            :false-value="0"
                                            v-model="form.show_left_representative">
                                    </div>
                                </div>
                            </ap-grid>
                            <div class="ap-margin-xsmall-top">
                                <small class="ap-text-bold ap-text-danger"
                                    v-if="hasError('show_left_representative')">
                                    <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                                    {{errors['show_left_representative'][0]}}
                                </small>
                            </div>

                            <div class="ap-margin">
                                <select class="ap-select"
                                    v-if="!isLoading('accounts')"
                                    @change="selectAccount"
                                    v-model="selectedAccountId">
                                    <option :value="''" disabled>-- select account --</option>
                                    <option
                                        v-for="(item, index) in accounts"
                                        :key="index"
                                        :value="item.id">
                                        {{item.account.full_name}}
                                    </option>
                                </select>
                                <ap-placeholder
                                    v-else
                                    :size="'medium'"/>
                            </div>

                            <ap-input
                                type="text"
                                :required="form.show_left_representative"
                                :readonly="isLoading('store')"
                                :label="form.show_left_representative ? '* Name' : 'Name'"
                                :placeholder="'ex. MS. JUANA DELA CRUZ'"
                                v-model="form.left_representative_name"
                                :error="hasError('left_representative_name') ? errors.left_representative_name[0] : ''"/>

                            <ap-input
                                type="text"
                                :required="form.show_left_representative"
                                :readonly="isLoading('store')"
                                :label="form.show_left_representative ? '* Position' : 'Position'"
                                v-model="form.left_representative_position"
                                :error="hasError('left_representative_position') ? errors.left_representative_position[0] : ''"/>

                            
                        </div>
                        <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                            <p class="ap-text-bold ap-text-primary">
                                RIGHT REPRESENTATIVE
                            </p>

                            <ap-grid :gutter="'small'"
                                class="ap-flex-middle">
                                <div class="ap-width-1-1@s ap-width-4-5@m ap-width-4-5@l"
                                    :class="{ 'ap-opacity': !form.show_right_representative }">
                                    <label class="ap-text-bold ap-form-label">
                                        {{`${form.show_right_representative?'* ':''}Right Representative`}}
                                    </label>
                                </div>
                                <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                                    <div class="ap-text-center">
                                        <input class="ap-checkbox" id="create-show-right-representative" type="checkbox"
                                            :true-value="1"
                                            :false-value="0"
                                            v-model="form.show_right_representative">
                                    </div>
                                </div>
                            </ap-grid>
                            <div class="ap-margin-xsmall-top">
                                <small class="ap-text-bold ap-text-danger"
                                    v-if="hasError('show_right_representative')">
                                    <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                                    {{errors['show_right_representative'][0]}}
                                </small>
                            </div>

                            <div class="ap-margin">
                                <select class="ap-select"
                                    v-if="!isLoading('officials')"
                                    @change="selectOfficial"
                                    v-model="selectedOfficialId">
                                    <option :value="''" disabled>-- select official --</option>
                                    <option
                                        v-for="(item, index) in officials"
                                        :key="index"
                                        :value="item.id">
                                        {{item.prefix.toUpperCase()}} {{item.name.toUpperCase()}}
                                    </option>
                                </select>
                                <ap-placeholder
                                    v-else
                                    :size="'medium'"/>
                            </div>

                            <ap-input
                                type="text"
                                :required="form.show_right_representative"
                                :readonly="isLoading('store')"
                                :label="form.show_right_representative ? '* Name' : 'Name'"
                                :placeholder="'ex. HON. JUAN DELA CRUZ'"
                                v-model="form.right_representative_name"
                                :error="hasError('right_representative_name') ? errors.right_representative_name[0] : ''"/>

                            <ap-input
                                type="text"
                                :required="form.show_right_representative"
                                :readonly="isLoading('store')"
                                :label="form.show_right_representative ? '* Position' : 'Position'"
                                v-model="form.right_representative_position"
                                :error="hasError('right_representative_position') ? errors.right_representative_position[0] : ''"/>

                            
                        </div>
                    </ap-grid>

                </fieldset>

                <div class="ap-margin ap-text-right"
                    v-if="!isLoading('invoiceSetting')">

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
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Http from '@/services';

import { Form, Toast } from '@/utils';

export default
{
    data()
    {
        return {
            errors: {},

            submitLoading: false,

            form:
            {
                domain_hosting: 1000.00,
                virtual_storage: 1000.00,
                branding_sms: 0.60,
                regular_sms: 0.40,
                show_left_representative: 1,
                left_representative_name: '',
                left_representative_position: '',
                show_right_representative: 1,
                right_representative_name: '',
                right_representative_position: '',
            },

            selectedAccountId: '',
            selectedOfficialId: '',
        };
    },

    created()
    {
        this.load();

        this.loadAccounts();

        this.loadOfficials();
    },

    computed:
    {
        ...mapGetters({
            barangay: 'adminBarangay/selected',
            invoiceSetting: 'adminBarangay/invoiceSetting',
            isLoading: 'adminBarangay/isLoading',
            accounts: 'adminBarangay/accounts',
            officials: 'adminBarangay/officials',
        }),

        hasInvoiceSetting()
        {
            return Object.keys(this.invoiceSetting).length > 0;
        }
    },

    methods:
    {
        ...mapActions({
            loadSetting: 'adminBarangay/loadSetting',
            updateSetting: 'adminBarangay/updateSetting',
            loadPrerequisite: 'adminBarangay/loadPrerequisite'
        }),

        async submit()
        {
            this.submitLoading = true;

            const response = await Http.put(
                `/administration/barangay/${this.$route.params.code}/invoice/setting`,
                this.form
            );

            this.submitLoading = false;

            if (response.status == 200)
            {
                this.updateSetting({
                    state: 'invoiceSetting',
                    data: response.data
                });

                Toast.success({
                    message: 'Setting has been updated.',
                });
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

        async load()
        {
            const response = await this.loadSetting({
                action: 'invoiceSetting',
                url: `/administration/barangay/${this.$route.params.code}/invoice/setting`
            });

            if (response.status == 200)
            {
                this.form.domain_hosting = response.data.domain_hosting;
                this.form.virtual_storage = response.data.virtual_storage;
                this.form.branding_sms = response.data.branding_sms;
                this.form.regular_sms = response.data.regular_sms;
                this.form.show_left_representative = response.data.show_left_representative;
                this.form.left_representative_name = response.data.left_representative_name;
                this.form.left_representative_position = response.data.left_representative_position;
                this.form.show_right_representative = response.data.show_right_representative;
                this.form.right_representative_name = response.data.right_representative_name;
                this.form.right_representative_position = response.data.right_representative_position;

            }
        },

        async loadAccounts()
        {
            this.loadPrerequisite({
                url: `/administration/barangay/accounts/${this.$route.params.code}`,
                action: 'accounts'
            });
        },

        async loadOfficials()
        {
            this.loadPrerequisite({
                url: `/administration/barangay/officials/${this.$route.params.code}`,
                action: 'officials'
            });
        },

        selectAccount(event)
        {
            let id = event.target.value;

            let account = this.accounts.find(row => row.id == id);

            if (account)
            {
                this.form.left_representative_name = account.account.full_name;
                this.form.left_representative_position = account.barangay_position.name;
            }
        },

        selectOfficial(event)
        {
            let id = event.target.value;

            let official = this.officials.find(row => row.id == id);

            if (official)
            {
                this.form.right_representative_name = `${official.prefix} ${official.name}`.toUpperCase();
                this.form.right_representative_position = official.position.name.toUpperCase();
                
            }
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },
    },
}
</script>