<template>
    <ap-modal
        :isOpen.sync="$parent.$data.updateStatusModal"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Are you sure?
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">
                <p>
                    You are about to {{statusName}} the status of
                    <span class="ap-text-bold">{{idTemplate.name}}</span> template.
                </p>

                <p>Do you want to continue?</p>

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
import { mapGetters, mapActions } from 'vuex';

import Http from '@/services';

import { Form, Toast } from '@/utils';

export default
{
    data()
    {
        return {
            errors: {},

            submitLoading: false
        };
    },

    computed:
    {
        ...mapGetters({
            idTemplate: 'myCompanyIdTemplate/selected',
            isLoading: 'myCompanyIdTemplate/isLoading',
        }),

        statusName()
        {
            return this.idTemplate.enabled
                ? 'disable'
                : 'enable';
        }
    },

    methods:
    {
        ...mapActions({
            update: 'myCompanyIdTemplate/update',
        }),

        async submit()
        {
            this.errors = {};

            this.submitLoading = true;
            
            const response = await Http.put(
                `/my-company/id-template/${this.idTemplate.id}/status`,
                {},
            );

            this.submitLoading = false;

            if (response.status === 200)
            {
                this.closeModal();

                Toast.success({
                    message: 'Data has been update.'
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
            this.$parent.toggleModal('updateStatus', false);
        },
    },
};
</script>
