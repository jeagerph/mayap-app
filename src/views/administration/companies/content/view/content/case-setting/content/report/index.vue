<template>
    <div class="ap-margin-top ap-form-stacked">
        <div class="accordion ap-margin-top" id="form-accordion-report">

            <item-component
                v-for="(form, index) in forms"
                :key="index"
                :form="form" />

        </div>

        <div class="ap-margin ap-text-right">
            <ap-button
                type="button"
                @click="submit()"
                :color="'primary'"
                :rounded="true"
                :loading="submitLoading">
                Save
            </ap-button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import Http from '@/services';

import { Toast, Form } from '@/utils';

import ItemComponent from './content/item';

export default
{
    components:
    {
        ItemComponent,
    },
    
    data()
    {
        return {
            errors: {},

            forms: [],

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
            caseSetting: 'adminBarangay/caseSetting',
            isLoading: 'adminBarangay/isLoading',
        }),
    },

    methods:
    {
        ...mapActions({
            updateCaseSetting: 'adminBarangay/updateCaseSetting',
        }),

        async submit()
        {

            this.submitLoading = true;

            const response = await Http.put(
                `/administration/barangay/${this.$route.params.code}/case/setting/report`,
                {
                    report: this.forms
                }
            );

            this.submitLoading = false;

            if (response.status == 200)
            {
                this.updateCaseSetting(response.data);

                Toast.success({
                    message: 'Setting has been updated.'
                });
            }
            else if (response.status === 422)
            {
                this.errors = response.data.errors;

                Toast.error({
                    message: 'Kindly double check your forms.',
                });

                window.scrollTo(0,0);
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
            this.forms = this.caseSetting.report_documents;
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },
    },
};
</script>
