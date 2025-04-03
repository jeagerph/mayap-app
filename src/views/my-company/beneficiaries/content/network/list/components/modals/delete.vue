<template>
    <ap-modal
        :isOpen.sync="$parent.$data.deleteModal"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Are you sure?
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">
                <p>
                    You are about to delete
                    <span class="ap-text-bold">{{targetBeneficiary.full_name}}</span> beneficiary under <span class="ap-text-bold">{{ beneficiary.full_name }}</span> network.
                </p>

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
                        Yes
                    </ap-button>
                </div>
            </div>
        </ap-modal-body>
    </ap-modal>
</template>

<script>
import { mapGetters } from 'vuex';

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
                master_degree: 1,
                first_degree: 1,
                second_degree: 1,
                third_degree: 1,
                fourth_degree: 1,
                fifth_degree: 1,
            },

            submitLoading: false,
        };
    },

    computed:
    {
        ...mapGetters({
            beneficiary: 'companyBeneficiary/selected',
            isLoading: 'companyBeneficiary/isLoading',
            network: 'companyBeneficiaryNetwork/selected',
            networks: 'companyBeneficiaryNetwork/networks',
        }),

        targetBeneficiary()
        {
            return this.network.beneficiary;
        },
    },

    methods:
    {
        async submit()
        {
            this.errors = {};

            this.submitLoading = true;
            
            const response = await Http.delete(
                `/my-company/beneficiary/${this.$route.params.code}/network/${this.network.id}`,
            );

            this.submitLoading = false;

            if (response.status === 200)
            {
                this.networks.splice(this.networks.indexOf(this.network), 1);

                this.closeModal();

                Toast.success({
                    message: 'Data has been deleted.'
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
            this.$parent.toggleModal('delete', false);
        },
    },
};
</script>
