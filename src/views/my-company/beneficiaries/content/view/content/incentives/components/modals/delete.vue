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
                    You are about to delete <span class="ap-text-bold">{{ incentive.mode.id == 1 ? '+':'-' }} {{ incentivePoints }} points</span>  incentive dated last <span class="ap-text-bold">{{ incentiveDate }}</span>.
                </p>

                <p>Do you want to continue?</p>

                <div class="ap-margin ap-text-right">
                    <ap-button
                        v-if="!isLoading('delete')"
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
                        :loading="isLoading('delete')">
                        Yes
                    </ap-button>
                </div>
            </div>
        </ap-modal-body>
    </ap-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { Form, Toast, Dater } from '@/utils';

export default
{
    data()
    {
        return {
            errors: {},

            current_points: 0,
            current_mode: '',
        };
    },

    created()
    {
        this.initialize();
    },

    computed:
    {
        ...mapGetters({
            incentive: 'companyBeneficiaryIncentive/selected',
            isLoading: 'companyBeneficiaryIncentive/isLoading',
            beneficiary: 'companyBeneficiary/selected',
        }),

        incentiveDate()
        {
            return Dater.format(this.incentive.incentive_date);
        },

        incentivePoints()
        {
            return parseInt(this.incentive.points);
        },

        deleteModal()
        {
            return this.$parent.$data.deleteModal;
        },
    },

    methods:
    {
        ...mapActions({
            destroy: 'companyBeneficiaryIncentive/destroy',
        }),

        async submit()
        {
            this.errors = {};
            
            const response = await this.destroy({
                url: `/my-company/beneficiary/${this.$route.params.code}/incentive/${this.incentive.id}`,
                item: this.incentive,
            });

            if (response.status === 200)
            {
                let currentIncentive = parseFloat(this.beneficiary.incentive);

                if (this.current_mode == 1)
                {
                    currentIncentive -= parseFloat(this.current_points);
                }
                else
                {
                    currentIncentive += parseFloat(this.current_points);
                }

                this.beneficiary.incentive = currentIncentive;

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

        initialize()
        {
            this.current_points = this.incentive.points;
            this.current_mode = this.incentive.mode.id;
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

    watch:
    {
        deleteModal(val)
        {
            if (val) this.initialize();
        },
    },
};
</script>
