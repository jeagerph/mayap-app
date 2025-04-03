<template>
    <div class="ap-margin-auto ap-width-xxlarge ap-margin-top">
        
        <div class="card card-body ap-padding border-top border-primary border-0 border-4">

            <form class="ap-form-stacked"
                @submit.prevent="submit()">
                <fieldset class="ap-fieldset">

                    <div>
                        
                        <p class="ap-text-bold ap-text-primary">
                            Master Degree
                        </p>

                        <ap-grid :gutter="'small'"
                            class="ap-flex-middle">
                            <div class="ap-width-expand@m">
                                <ap-input
                                    v-if="!isLoading('networkSetting')"
                                    type="number"
                                    :required="true"
                                    step=".01"
                                    :readonly="submitLoading"
                                    :label="'* Points'"
                                    v-model="form.master_degree_points"
                                    :error="hasError('master_degree_points') ? errors.master_degree_points[0] : ''"/>
                                <div v-else>
                                    <label class="ap-form-label ap-text-bold">
                                        * Points
                                    </label>
                                    <ap-placeholder
                                        :size="'medium'" />
                                </div>
                            </div>
                            <div class="ap-text-right@m">
                                <ap-button
                                    type="button"
                                    :size="'small'"
                                    :color="form.master_degree_enabled ? 'success': 'default'"
                                    :outline="!form.master_degree_enabled"
                                    @click="toggleActivation('master_degree')">
                                    {{ form.master_degree_enabled ? 'ON':'OFF' }}
                                </ap-button>
                            </div>
                        </ap-grid>

                        
                    </div>

                    <div class="ap-margin-small-top">
                        
                        <p class="ap-text-bold ap-text-primary">
                            1st Degree
                        </p>

                        <ap-grid :gutter="'small'"
                            class="ap-flex-middle">
                            <div class="ap-width-expand@m">
                                <ap-input
                                    v-if="!isLoading('networkSetting')"
                                    type="number"
                                    :required="true"
                                    step=".01"
                                    :readonly="submitLoading"
                                    :label="'* Points'"
                                    v-model="form.first_degree_points"
                                    :error="hasError('first_degree_points') ? errors.first_degree_points[0] : ''"/>
                                <div v-else>
                                    <label class="ap-form-label ap-text-bold">
                                        * Points
                                    </label>
                                    <ap-placeholder
                                        :size="'medium'" />
                                </div>
                            </div>
                            <div class="ap-text-right@m">
                                <ap-button
                                    type="button"
                                    :size="'small'"
                                    :color="form.first_degree_enabled ? 'success': 'default'"
                                    :outline="!form.first_degree_enabled"
                                    @click="toggleActivation('first_degree')">
                                    {{ form.first_degree_enabled ? 'ON':'OFF' }}
                                </ap-button>
                            </div>
                        </ap-grid>
                    </div>

                    <div class="ap-margin-small-top">
                        
                        <p class="ap-text-bold ap-text-primary">
                            2nd Degree
                        </p>

                        <ap-grid :gutter="'small'"
                            class="ap-flex-middle">
                            <div class="ap-width-expand@m">
                                <ap-input
                                    v-if="!isLoading('networkSetting')"
                                    type="number"
                                    :required="true"
                                    step=".01"
                                    :readonly="submitLoading"
                                    :label="'* Points'"
                                    v-model="form.second_degree_points"
                                    :error="hasError('second_degree_points') ? errors.second_degree_points[0] : ''"/>
                                <div v-else>
                                    <label class="ap-form-label ap-text-bold">
                                        * Points
                                    </label>
                                    <ap-placeholder
                                        :size="'medium'" />
                                </div>
                            </div>
                            <div class="ap-text-right@m">
                                <ap-button
                                    type="button"
                                    :size="'small'"
                                    :color="form.second_degree_enabled ? 'success': 'default'"
                                    :outline="!form.second_degree_enabled"
                                    @click="toggleActivation('second_degree')">
                                    {{ form.second_degree_enabled ? 'ON':'OFF' }}
                                </ap-button>
                            </div>
                        </ap-grid>
                    </div>

                    <div class="ap-margin-small-top">
                        
                        <p class="ap-text-bold ap-text-primary">
                            3rd Degree
                        </p>

                        <ap-grid :gutter="'small'"
                            class="ap-flex-middle">
                            <div class="ap-width-expand@m">
                                <ap-input
                                    v-if="!isLoading('networkSetting')"
                                    type="number"
                                    :required="true"
                                    step=".01"
                                    :readonly="submitLoading"
                                    :label="'* Points'"
                                    v-model="form.third_degree_points"
                                    :error="hasError('third_degree_points') ? errors.third_degree_points[0] : ''"/>
                                <div v-else>
                                    <label class="ap-form-label ap-text-bold">
                                        * Points
                                    </label>
                                    <ap-placeholder
                                        :size="'medium'" />
                                </div>
                            </div>
                            <div class="ap-text-right@m">
                                <ap-button
                                    type="button"
                                    :size="'small'"
                                    :color="form.third_degree_enabled ? 'success': 'default'"
                                    :outline="!form.third_degree_enabled"
                                    @click="toggleActivation('third_degree')">
                                    {{ form.third_degree_enabled ? 'ON':'OFF' }}
                                </ap-button>
                            </div>
                        </ap-grid>
                    </div>

                    <div class="ap-margin-small-top">
                        
                        <p class="ap-text-bold ap-text-primary">
                            4th Degree
                        </p>

                        <ap-grid :gutter="'small'"
                            class="ap-flex-middle">
                            <div class="ap-width-expand@m">
                                <ap-input
                                    v-if="!isLoading('networkSetting')"
                                    type="number"
                                    :required="true"
                                    step=".01"
                                    :readonly="submitLoading"
                                    :label="'* Points'"
                                    v-model="form.fourth_degree_points"
                                    :error="hasError('fourth_degree_points') ? errors.fourth_degree_points[0] : ''"/>
                                <div v-else>
                                    <label class="ap-form-label ap-text-bold">
                                        * Points
                                    </label>
                                    <ap-placeholder
                                        :size="'medium'" />
                                </div>
                            </div>
                            <div class="ap-text-right@m">
                                <ap-button
                                    type="button"
                                    :size="'small'"
                                    :color="form.fourth_degree_enabled ? 'success': 'default'"
                                    :outline="!form.fourth_degree_enabled"
                                    @click="toggleActivation('fourth_degree')">
                                    {{ form.fourth_degree_enabled ? 'ON':'OFF' }}
                                </ap-button>
                            </div>
                        </ap-grid>
                    </div>

                    <div class="ap-margin-small-top">
                        
                        <p class="ap-text-bold ap-text-primary">
                            5th Degree
                        </p>

                        <ap-grid :gutter="'small'"
                            class="ap-flex-middle">
                            <div class="ap-width-expand@m">
                                <ap-input
                                    v-if="!isLoading('networkSetting')"
                                    type="number"
                                    :required="true"
                                    step=".01"
                                    :readonly="submitLoading"
                                    :label="'* Points'"
                                    v-model="form.fifth_degree_points"
                                    :error="hasError('fifth_degree_points') ? errors.fifth_degree_points[0] : ''"/>
                                <div v-else>
                                    <label class="ap-form-label ap-text-bold">
                                        * Points
                                    </label>
                                    <ap-placeholder
                                        :size="'medium'" />
                                </div>
                            </div>
                            <div class="ap-text-right@m">
                                <ap-button
                                    type="button"
                                    :size="'small'"
                                    :color="form.fifth_degree_enabled ? 'success': 'default'"
                                    :outline="!form.fifth_degree_enabled"
                                    @click="toggleActivation('fifth_degree')">
                                    {{ form.fifth_degree_enabled ? 'ON':'OFF' }}
                                </ap-button>
                            </div>
                        </ap-grid>
                    </div>
                    
                </fieldset>

                <div class="ap-margin ap-text-right"
                    v-if="!isLoading('networkSetting')">

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
                master_degree_enabled: 0,
                master_degree_points: 0,
                first_degree_enabled: 0,
                first_degree_points: 0,
                second_degree_enabled: 0,
                second_degree_points: 0,
                third_degree_enabled: 0,
                third_degree_points: 0,
                fourth_degree_enabled: 0,
                fourth_degree_points: 0,
                fifth_degree_enabled: 0,
                fifth_degree_points: 0,
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
            networkSetting: 'myCompany/networkSetting',
            isLoading: 'myCompany/isLoading',
        }),

        hasNetworkSetting()
        {
            return Object.keys(this.networkSetting).length > 0;
        }
    },

    methods:
    {
        ...mapActions({
            loadObject: 'myCompany/loadObject',
            updateState: 'myCompany/selectObject',
        }),

        async submit()
        {
            this.submitLoading = true;

            const response = await Http.put(
                `/my-company/network/setting`,
                this.form
            );

            this.submitLoading = false;

            if (response.status == 200)
            {
                this.updateState({
                    state: 'networkSetting',
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
                action: 'networkSetting',
                url: `/my-company/network/setting`
            });

            if (response.status == 200)
            {
                this.form.master_degree_enabled = response.data.master_degree_enabled;
                this.form.master_degree_points = response.data.master_degree_points;
                this.form.first_degree_enabled = response.data.first_degree_enabled;
                this.form.first_degree_points = response.data.first_degree_points;
                this.form.second_degree_enabled = response.data.second_degree_enabled;
                this.form.second_degree_points = response.data.second_degree_points;
                this.form.third_degree_enabled = response.data.third_degree_enabled;
                this.form.third_degree_points = response.data.third_degree_points;
                this.form.fourth_degree_enabled = response.data.fourth_degree_enabled;
                this.form.fourth_degree_points = response.data.fourth_degree_points;
                this.form.fifth_degree_enabled = response.data.fifth_degree_enabled;
                this.form.fifth_degree_points = response.data.fifth_degree_points;
            }
        },

        toggleActivation(form)
        {
            let status = this.form[`${form}_enabled`];
            
            if (status == 1)
            {
                status = 0;
            }
            else
            {
                status = 1;
            }

            this.form[`${form}_enabled`] = status;
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },
    },
}
</script>