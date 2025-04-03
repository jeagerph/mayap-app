<template>
    <li>
        <ap-grid
            :gutter="'small'">
            <div class="ap-width-expand@m">
                <a class="ap-link-reset ap-point"
                    @click="submit()">
                    <p class="ap-text-bold ap-margin-remove">
                        <i class="bx bx-id-card ap-margin-xsmall-right"></i> {{ item.name }}
                    </p>
                </a>
            </div>
            <div class="ap-text-right@m">
                <ap-loader
                    v-if="submitLoading || downloadLoading"
                    :size="'small'" />
            </div>
        </ap-grid>
    </li>
</template>

<script>
import { mapGetters } from 'vuex';

import Http from '@/services';

import { Toast, Dater } from '@/utils';

export default
{
    props:
    {
        item: Object,
    },

    data()
    {
        return {
            submitLoading: false,
            downloadLoading: false,
        };
    },

    computed:
    {
        ...mapGetters({
            selected: 'companyBeneficiary/selected',
            isLoading: 'companyBeneficiary/isLoading',
        }),
    },

    methods:
    {
        showError()
        {
            Toast.error({
                message: 'Template not yet available.'
            });
        },

        async submit()
        {
            this.errors = {};

            this.submitLoading = true;
            
            const response = await Http.post(
                `/my-company/beneficiary/${this.selected.slug.code}/identification`,
                {
                    identification_date: Dater.rawToday(),
                    name: this.item.name,
                    description: this.item.description,
                    view: this.item.view,
                    content: this.item.content,
                    options: this.item.options,
                    approvals: this.item.approvals,
                    left_signature: this.item.left_signature,
                    right_signature: this.item.right_signature
                }
            );

            this.submitLoading = false;

            if (response.status === 201)
            {
                this.download(response.data.id);
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

        async download(id)
        {
            this.downloadLoading = true;

            const response = await Http.get(`/my-company/beneficiary/${this.selected.slug.code}/identification/${id}/download`);

            this.downloadLoading = false;

            if (response.status == 200)
            {
                window.open(response.data.path);

                this.closeModal();

                Toast.success({
                    message: 'ID has been generated.'
                });
            }
        },
    },
}
</script>