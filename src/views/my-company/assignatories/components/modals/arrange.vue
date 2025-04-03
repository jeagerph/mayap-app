<template>
    <ap-modal
        :isOpen.sync="$parent.$data.arrangeModal"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Update Assignatories Order
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">
                <form class="ap-form-stacked"
                    @submit.prevent="submit()">
                    <fieldset class="ap-fieldset">

                        <ul class="ap-list ap-list-small ap-list-divider-bottom">

                            <li v-for="(item, index) in form"
                                :key="index">
                                <ap-grid
                                    :gutter="'small'"
                                    class="ap-flex-middle">
                                    <div class="ap-width-1-1@s ap-width-4-5@m ap-width-4-5@l">
                                        <h5 class="ap-margin-remove">
                                            {{item.name.toUpperCase()}}
                                        </h5>
                                    </div>
                                    <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">

                                        <ap-input
                                            class="ap-margin-xsmall-right"
                                            type="number"
                                            :required="true"
                                            v-model="item.order_no"/>
                                    </div>
                                </ap-grid>
                                <small class="ap-text-bold ap-text-danger"
                                    v-if="hasError(`assignatories.${index}.order_no`)">
                                    <i class="bx bx-info-circle"></i> {{errors[`assignatories.${index}.order_no`][0]}}
                                </small>
                            </li>
                        </ul>

                        <div class="ap-margin-small-top">
                            <small class="ap-text-bold ap-text-danger"
                                v-if="hasError('assignatories')">
                                <i class="bx bx-info-circle"></i> {{errors['assignatories'][0]}}
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
            assignatories: 'myCompanyAssignatory/items',
            isLoading: 'myCompanyAssignatory/isLoading',
        }),

        arrangeModal()
        {
            return this.$parent.$data.arrangeModal;
        },
    },

    methods:
    {
        ...mapActions({
            load: 'myCompanyAssignatory/load',
            update: 'myCompanyAssignatory/update',
        }),

        async submit()
        {
            this.errors = {};
            
            const response = await this.update({
                url: `/my-company/assignatories/arrange`,
                form:
                {
                    assignatories: this.form
                },
            });

            if (response.status === 200)
            {
                this.form = [];
                
                this.closeModal();

                this.load(`/my-company/assignatories`);

                Toast.success({
                    message: 'Assignatories has been updated.'
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

            this.assignatories.forEach(row => {
                
                this.form.push({
                    id: row.id,
                    name: row.name,
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
