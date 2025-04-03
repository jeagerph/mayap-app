<template>
    <ap-modal
        :isOpen.sync="$parent.$data.completeModal"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Are you sure?
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">
                <p>
                    You are about to revert the status of <span class="ap-text-bold"> {{ patient.full_name }}</span> to <span class="ap-text-bold">COMPLETED</span>.
                </p>

                <p>Do you want to continue?</p>

                <div class="ap-margin ap-text-right">
                    <ap-button
                        v-if="!isLoading('update')"
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
                        :loading="isLoading('update')">
                        Yes
                    </ap-button>
                </div>
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
        };
    },

    computed:
    {
        ...mapGetters({
            patient: 'companyBeneficiaryPatient/selected',
            isLoading: 'companyBeneficiaryPatient/isLoading',
            beneficiary: 'companyBeneficiary/selected',
        }),
    },

    methods:
    {
        ...mapActions({
            update: 'companyBeneficiaryPatient/update',
        }),

        async submit()
        {
            this.errors = {};
            
            const response = await this.update({
                url: `/my-company/beneficiary/${this.$route.params.code}/patient/${this.patient.id}/complete`,
                form: {},
            });

            if (response.status === 200)
            {
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

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },

        closeModal()
        {
            this.$parent.toggleModal('complete', false);
        },
    },
};
</script>
