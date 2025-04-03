<template>
    <ap-modal
        :isOpen.sync="$parent.$data.updatePrefixModal"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Update Case No. Prefix
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">
                <form class="ap-form-stacked"
                    @submit.prevent="submit()">
                    <fieldset class="ap-fieldset">
                        <ap-input
                            type="text"
                            :required="true"
                            :readonly="submitLoading"
                            :label="'* Prefix'"
                            v-model="form.case_prefix"
                            :error="hasError('case_prefix') ? errors.case_prefix[0] : ''"/>
                    </fieldset>

                    <div class="ap-margin ap-text-right">
                        <ap-button
                            v-if="!submitLoading"
                            type="button"
                            class="ap-margin-small-right"
                            :rounded="true"
                            @click="closeModal()">
                            Cancel
                        </ap-button>
                        <ap-button
                            type="button"
                            @click="submit()"
                            :color="'primary'"
                            :rounded="true"
                            :loading="submitLoading">
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

import Http from '@/services';

import { Form, Toast } from '@/utils';

export default
{
    data()
    {
        return {
            errors: {},

            form:
            {
                case_prefix: '',
            },

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
            barangay: 'adminBarangay/selected',
            isLoading: 'adminBarangay/isLoading',
        }),
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
                `/administration/barangay/${this.$route.params.code}/case/setting/prefix`,
                this.form,
            );

            this.submitLoading = false;

            if (response.status === 200)
            {
                this.update(response.data);

                this.closeModal();

                Toast.success({
                    message: 'Data has been updated.'
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
            this.form.case_prefix = this.caseSetting.case_prefix;
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },

        closeModal()
        {
            this.$parent.toggleModal('updatePrefix', false);
        },
    },
};
</script>
