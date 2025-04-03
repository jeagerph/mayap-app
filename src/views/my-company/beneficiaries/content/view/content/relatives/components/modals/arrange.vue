<template>
    <ap-modal
        :isOpen.sync="$parent.$data.arrangeModal"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Arrange Family/Relatives in Order
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">
                <form class="ap-form-stacked"
                    @submit.prevent="submit()">
                    <fieldset class="ap-fieldset">

                        <ul class="ap-list ap-list-divider-bottom">

                            <li v-for="(item, index) in form"
                                :key="index">
                                <ap-grid
                                    :gutter="'small'">
                                    <div class="ap-width-1-1@s ap-width-2-3@m ap-width-2-3@l">
                                        <ap-grid :gutter="'small'">
                                            <div class="ap-width-fit-content">
                                                <ap-avatar
                                                    :shape="'circle'"
                                                    :src="item.photo"
                                                    :label="'AA'" />
                                            </div>
                                            <div class="ap-width-expand">
                                                <h5 class="ap-margin-remove">
                                                    {{item.last_name}}, {{item.first_name}} {{item.middle_name ? item.middle_name : ''}}
                                                </h5>
                                                <div>
                                                    <span class="badge bg-info ap-margin-xsmall-right"
                                                        style="font-size: 12px;">
                                                        {{item.relationship}}
                                                    </span>
                                                </div>
                                            </div>
                                        </ap-grid>
                                    </div>
                                    <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">

                                        <input
                                            type="number"
                                            v-model="item.order_no" />
                                    </div>
                                </ap-grid>
                                <small class="ap-text-bold ap-text-danger"
                                    v-if="hasError(`relatives.${index}.order_no`)">
                                    <i class="bx bx-info-circle"></i> {{errors[`relatives.${index}.order_no`][0]}}
                                </small>
                            </li>
                        </ul>

                        <div class="ap-margin-small-top">
                            <small class="ap-text-bold ap-text-danger"
                                v-if="hasError('relatives')">
                                <i class="bx bx-info-circle"></i> {{errors['relatives'][0]}}
                            </small>
                        </div>
                    </fieldset>

                    
                    <div class="ap-margin ap-text-right">
                        <ap-button
                            v-if="!isLoading('update')"
                            type="button"
                            class="ap-margin-small-right"
                            @click="closeModal()">
                            Cancel
                        </ap-button>
                        <ap-button
                            type="submit"
                            :color="'primary'"
                            :outline="false"
                            :loading="isLoading('update')">
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

import { Form, Toast } from '@/utils';

export default
{
    data()
    {
        return {
            errors: {},

            form: [],
        };
    },

    created()
    {
        this.initialize();
    },

    computed:
    {
        ...mapGetters({
            relatives: 'companyBeneficiaryRelative/items',
            isLoading: 'companyBeneficiaryRelative/isLoading',
        }),

        arrangeModal()
        {
            return this.$parent.$data.arrangeModal;
        },
    },

    methods:
    {
        ...mapActions({
            load: 'companyBeneficiaryRelative/load',
            update: 'companyBeneficiaryRelative/update',
        }),

        async submit()
        {
            this.errors = {};
            
            const response = await this.update({
                url: `/my-company/beneficiary/${this.$route.params.code}/relatives/arrange`,
                form:
                {
                    relatives: this.form
                },
            });

            if (response.status === 200)
            {
                this.form = [];
                
                this.closeModal();

                this.load(`/my-company/beneficiary/${this.$route.params.code}/relatives`);

                Toast.success({
                    message: 'Family/Relatives has been updated.'
                });
            }
            else if (response.status === 422)
            {
                this.errors = response.data.errors;

                Toast.error({
                    message: 'Kindly double check your form.'
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
            this.form = [];

            this.relatives.forEach(row => {
                
                this.form.push({
                    id: row.id,
                    first_name: row.relative.first_name,
                    middle_name: row.relative.middle_name
                        ? row.relative.middle_name
                        : '',
                    last_name: row.relative.last_name,
                    gender: row.relative.gender,
                    date_of_birth: row.relative.date_of_birth,
                    photo: row.relative.photo,
                    relationship: row.relationship,
                    order_no: row.order_no,
                });

            });
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },

        closeModal()
        {
            this.$parent.toggleModal('arrange', false);
        },
    },

    watch:
    {
        arrangeModal(val)
        {
            if (val) this.initialize();
        },
    },
};
</script>
