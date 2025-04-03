<template>
    <ap-modal
        :isOpen.sync="$parent.$data.downloadModal"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Download Encoding Report
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">

                <form class="ap-form-stacked ap-margin-top"
                    @submit.prevent="submit()">

                    <fieldset class="ap-fieldset">
                        <ap-input
                            type="date"
                            :readonly="downloadLoading"
                            :required="true"
                            :label="'* Start Date'"
                            v-model="form.from"
                            @input="onChangeFrom"
                            :error="hasError('from') ? errors.from[0] : ''"/>

                        <ap-input
                            type="date"
                            :readonly="downloadLoading"
                            :required="true"
                            :label="'* End Date'"
                            v-model="form.to"
                            :error="hasError('to') ? errors.to[0] : ''"/>
                    </fieldset>
                    

                    <div class="ap-margin-top ap-text-right">
                        <ap-button
                            v-if="!downloadLoading"
                            type="button"
                            class="ap-margin-small-right"
                            :rounded="true"
                            @click="closeModal()">
                            Cancel
                        </ap-button>
                        <ap-button
                            type="submit"
                            :color="'primary'"
                            :rounded="true"
                            :loading="downloadLoading">
                            Submit
                        </ap-button>
                    </div>
                </form>
                
                
            </div>
        </ap-modal-body>
    </ap-modal>
</template>

<script>
import { mapGetters } from 'vuex';

import Http from '@/services';

import { Form, Toast, Dater } from '@/utils';

export default
{
    data()
    {
        return {
            errors: {},

            form:
            {
                from: '',
                to: '',
                
            },

            downloadLoading: false,
        };
    },

    created()
    {
        this.initialize();
    },

    computed:
    {
        ...mapGetters({
            accessUser: 'auth/accessUser',
        }),

        downloadModal()
        {
            return this.$parent.$data.downloadModal;
        }
    },

    methods:
    {
        async submit()
        {
            this.errors = {};

            let url = `/my-company/accounts/summary/download?ctx`;

                url += `&from=${this.form.from}`;
                url += `&to=${this.form.to}`;

            this.downloadLoading = true;
            
            const response = await Http.get(url);

            this.downloadLoading = false;

            if (response.status === 200)
            {
                window.open(response.data.path);

                this.closeModal();

                Toast.success({
                    message: 'Data has been downloaded.'
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

        onChangeFrom()
        {
            this.form.to = this.form.from;
        },

        initialize()
        {
            this.form.from = Dater.rawToday();
            this.form.to = Dater.rawToday();
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },

        closeModal()
        {
            this.$parent.toggleModal('download', false);
        },
    },

    watch:
    {
        downloadModal(val)
        {
            if (val) this.initialize();
        }
    }
};
</script>
