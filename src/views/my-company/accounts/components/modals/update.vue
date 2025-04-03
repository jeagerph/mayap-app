<template>
    <ap-modal
        :isOpen.sync="$parent.$data.updateModal"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Update Account
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">
                <form class="ap-form-stacked"
                    @submit.prevent="submit()">
                    <fieldset class="ap-fieldset">

                        <ap-grid
                            :gutter="'small'">
                            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                <div class="ap-margin">
                                    <label class="ap-text-bold ap-form-label"
                                        :class="{ 'ap-text-danger': hasError('company_position_id')}">
                                        * Company Position
                                    </label>

                                    <select
                                        v-if="!isLoading('positions')"
                                        class="ap-select"
                                        :required="true"
                                        v-model="form.company_position_id"
                                        :readonly="isLoading('update')">
                                        <option :value="''" disabled>-- select position --</option>
                                        <option v-for="(item, index) in positions"
                                            :key="index"
                                            :value="item.id">
                                            {{item.name}}
                                        </option>
                                    </select>
                                    <ap-placeholder v-else
                                        :size="'medium'"/>

                                    <small class="ap-text-bold ap-text-danger"
                                        v-if="hasError('company_position_id')">
                                        <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                                        {{errors.company_position_id[0]}}
                                    </small>
                                </div>
                            </div>
                            <div class="ap-width-1-1@s ap-width-2-3@m ap-width-2-3@l">
                                <ap-input
                                    type="text"
                                    :required="true"
                                    :readonly="isLoading('update')"
                                    :label="'* Full Name'"
                                    :placeholder="'ex. JUAN DELA CRUZ'"
                                    v-model="form.full_name"
                                    :error="hasError('full_name') ? errors.full_name[0] : ''"/>
                            </div>
                        </ap-grid>

                        <ap-grid
                            :gutter="'small'"
                            class="ap-margin-top">
                            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                                <ap-input
                                    type="text"
                                    :readonly="isLoading('update')"
                                    :label="'Mobile No.'"
                                    :placeholder="'ex. 09XXXXXXXXX'"
                                    v-model="form.mobile_number"
                                    :error="hasError('mobile_number') ? errors.mobile_number[0] : ''"/>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                                <ap-input
                                    type="text"
                                    :readonly="isLoading('update')"
                                    :label="'E-mail'"
                                    :placeholder="'ex. juan.delacruz@gmail.com'"
                                    v-model="form.email"
                                    :error="hasError('email') ? errors.email[0] : ''"/>
                            </div>
                        </ap-grid>

                        <ap-input
                            type="text"
                            :required="true"
                            :readonly="isLoading('update')"
                            :label="'* Username'"
                            :placeholder="'ex. jde001'"
                            v-model="form.username"
                            :error="hasError('username') ? errors.username[0] : ''"/>

                    </fieldset>

                    
                    <div class="ap-margin ap-text-right">
                        <ap-button
                            v-if="!isLoading('update')"
                            type="button"
                            class="ap-margin-small-right"
                            @click="closeModal()">
                            Cancel
                        </ap-button>
                        <ap-button
                            type="submit"
                            :color="'primary'"
                            :outline="false"
                            :loading="isLoading('update')">
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

import { Form, Toast } from '@/utils';

export default
{
    data()
    {
        return {
            errors: {},

            form:
            {
                company_position_id: '',
                account_type_id: 2,
                username: '',
                full_name: '',
                email: '',
                mobile_number: '',
            },
        };
    },

    created()
    {
        this.initialize();

        this.loadPositions();
    },

    computed:
    {
        ...mapGetters({
            positions: 'myCompanyAccount/positions',
            companyAccount: 'myCompanyAccount/selected',
            isLoading: 'myCompanyAccount/isLoading',
        }),

        account()
        {
            return this.companyAccount.account;
        }
    },

    methods:
    {
        ...mapActions({
            update: 'myCompanyAccount/update',
            loadPrerequisite: 'myCompanyAccount/loadPrerequisite'
        }),

        async submit()
        {
            this.errors = {};
            
            const response = await this.update({
                url: `/my-company/account/${this.companyAccount.slug.code}`,
                form: this.form,
            });

            if (response.status === 200)
            {
                this.closeModal();

                Toast.success({
                    message: 'Account has been updated.'
                });
            }
            else if (response.status === 422)
            {
                this.errors = response.data.errors;

                Toast.error({
                    message: 'Kindly double check your form.'
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
            this.form.company_position_id = this.companyAccount.company_position.id;
            this.form.account_type = 2;
            this.form.username = this.account.user.username;
            this.form.full_name = this.account.full_name;
            this.form.email = this.account.email;
            this.form.mobile_number = this.account.mobile_number;
        },

        async loadPositions()
        {
            await this.loadPrerequisite({
                url: '/my-company/account/position/options',
                action: 'positions'
            });
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },

        closeModal()
        {
            this.$parent.toggleModal('update', false);
        },
    },

    watch:
    {
        companyAccount()
        {
            this.initialize();
        },
    },
};
</script>
