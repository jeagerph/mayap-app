<template>
    <div class="ap-animate ap-animate-fade-in">
        
        <div class="ap-padding-small">

            <form class="ap-form-stacked"
                @submit.prevent="submit()">
                <fieldset class="ap-fieldset">

                    <ap-input
                        v-if="!isLoading('idSetting')"
                        type="text"
                        :required="true"
                        :readonly="submitLoading"
                        :label="'* Header Name'"
                        v-model="form.name"
                        :error="hasError('name') ? errors.name[0] : ''"/>
                    <div v-else>
                        <label class="ap-form-label ap-text-bold">
                            * Header Name
                        </label>
                        <ap-placeholder
                            :size="'medium'" />
                    </div>

                    <ap-input
                        v-if="!isLoading('idSetting')"
                        type="text"
                        :readonly="submitLoading"
                        :label="'Address'"
                        v-model="form.address"
                        :error="hasError('address') ? errors.address[0] : ''"/>
                    <div v-else>
                        <label class="ap-form-label ap-text-bold">
                            * Address
                        </label>
                        <ap-placeholder
                            :size="'medium'" />
                    </div>

                    <ap-input
                        v-if="!isLoading('idSetting')"
                        type="text"
                        :readonly="submitLoading"
                        :label="'Contact No.'"
                        v-model="form.contact_no"
                        :error="hasError('contact_no') ? errors.contact_no[0] : ''"/>
                    <div v-else>
                        <label class="ap-form-label ap-text-bold">
                            * Contact No.
                        </label>
                        <ap-placeholder
                            :size="'medium'" />
                    </div>
                    
                </fieldset>

                <div class="ap-margin ap-text-right"
                    v-if="!isLoading('idSetting')">

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
                name: '',
                address: '',
                contact_no: '',
            }
        };
    },

    created()
    {
        this.load();
    },

    computed:
    {
        ...mapGetters({
            company: 'adminCompany/selected',
            idSetting: 'adminCompany/idSetting',
            isLoading: 'adminCompany/isLoading',
        }),

        hasIdSetting()
        {
            return Object.keys(this.idSetting).length > 0;
        }
    },

    methods:
    {
        ...mapActions({
            loadObject: 'adminCompany/loadObject',
            updateState: 'adminCompany/selectObject',
        }),

        async submit()
        {
            this.errors = {};
            
            this.submitLoading = true;

            const response = await Http.put(
                `/administration/company/${this.$route.params.code}/id/setting`,
                this.form
            );

            this.submitLoading = false;

            if (response.status == 200)
            {
                this.updateState({
                    state: 'idSetting',
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
            const response = await this.loadObject({
                action: 'idSetting',
                url: `/administration/company/${this.$route.params.code}/id/setting`
            });

            if (response.status == 200)
            {
                this.form = response.data;
            }
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },
    },
}
</script>