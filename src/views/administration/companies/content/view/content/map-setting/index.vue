<template>
    <div class="ap-animate ap-animate-fade-in">
        
        <div class="ap-padding-small">

            <form class="ap-form-stacked"
                @submit.prevent="submit()">
                <fieldset class="ap-fieldset">

                    <ap-input
                        v-if="!isLoading('mapSetting')"
                        type="text"
                        :required="true"
                        :readonly="submitLoading"
                        :label="'* API Key'"
                        v-model="form.api_key"
                        :error="hasError('api_key') ? errors.api_key[0] : ''"/>
                    <div v-else>
                        <label class="ap-form-label ap-text-bold">
                            * API Key
                        </label>
                        <ap-placeholder
                            :size="'medium'" />
                    </div>

                    <ap-input
                        v-if="!isLoading('mapSetting')"
                        type="text"
                        :required="true"
                        :readonly="submitLoading"
                        :label="'* Latitude'"
                        v-model="form.latitude"
                        :error="hasError('latitude') ? errors.latitude[0] : ''"/>
                    <div v-else>
                        <label class="ap-form-label ap-text-bold">
                            * Latitude
                        </label>
                        <ap-placeholder
                            :size="'medium'" />
                    </div>

                    <ap-input
                        v-if="!isLoading('mapSetting')"
                        type="text"
                        :readonly="submitLoading"
                        :label="'* Longitude'"
                        v-model="form.longitude"
                        :error="hasError('longitude') ? errors.longitude[0] : ''"/>
                    <div v-else>
                        <label class="ap-form-label ap-text-bold">
                            * Longitude
                        </label>
                        <ap-placeholder
                            :size="'medium'" />
                    </div>
                    
                </fieldset>

                <div class="ap-margin ap-text-right"
                    v-if="!isLoading('mapSetting')">

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
                api_key: '',
                latitude: '',
                longitude: '',
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
            mapSetting: 'adminCompany/mapSetting',
            isLoading: 'adminCompany/isLoading',
        }),

        hasMapSetting()
        {
            return Object.keys(this.mapSetting).length > 0;
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
                `/administration/company/${this.$route.params.code}/map/setting`,
                this.form
            );

            this.submitLoading = false;

            if (response.status == 200)
            {
                this.updateState({
                    state: 'mapSetting',
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
                action: 'mapSetting',
                url: `/administration/company/${this.$route.params.code}/map/setting`
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