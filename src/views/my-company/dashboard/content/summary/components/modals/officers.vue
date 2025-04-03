<template>
    <ap-modal
        :isOpen.sync="$parent.$data.officersModal"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Summary of Officers/Leaders
            </ap-modal-title>

            <hr class="ap-margin-small-top">
            

            <div class="ap-margin-top">
                
                <ap-grid :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                        <small class="ap-text-bold">
                            TODAY
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right@m">
                        <h3 class="ap-text-bold"
                            v-if="!summaryLoading">
                            {{ summary.today ? summary.today : '0' }}
                        </h3>
                        <ap-loader
                            v-else
                            :size="'small'" />
                    </div>
                </ap-grid>

                <hr>
                
                <ap-grid :gutter="'small'"
                    :class="'ap-margin-remove-top'">
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                        <small class="ap-text-bold">
                            THIS MONTH
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right@m">
                        <h3 class="ap-text-bold"
                            v-if="!summaryLoading">
                            {{ summary.month }}
                        </h3>
                        <ap-loader
                            v-else
                            :size="'small'" />
                    </div>
                </ap-grid>
                
                <hr>
                
                <ap-grid :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                        <small class="ap-text-bold">
                            THIS YEAR
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right@m">
                        <h3 class="ap-text-bold"
                            v-if="!summaryLoading">
                            {{ summary.year }}
                        </h3>
                        <ap-loader
                            v-else
                            :size="'small'" />
                    </div>
                </ap-grid>

                <hr>
                
                <ap-grid :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                        <small class="ap-text-bold">
                            OVERALL
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right@m">
                        <h3 class="ap-text-bold"
                            v-if="!summaryLoading">
                            {{ summary.total }}
                        </h3>
                        <ap-loader
                            v-else
                            :size="'small'" />
                    </div>
                </ap-grid>

                <div class="ap-margin-top ap-text-center">
                    <ap-button
                        type="button"
                        class="ap-margin-small-right"
                        @click="closeModal()">
                        Close
                    </ap-button>
                </div>
            </div>
        </ap-modal-body>
    </ap-modal>
</template>

<script>

import Http from '@/services';

import { Form, Toast, Dater } from '@/utils';

export default
{
    data()
    {
        return {
            errors: {},

            summary:
            {
                year: 0,
                month: 0,
                date: 0,
                total: 0,
            },

            form:
            {
                date: ''
            },

            summaryLoading: false,
        };
    },

    created()
    {
        this.initialize();
    },

    computed:
    {
        officersModal()
        {
            return this.$parent.$data.officersModal;
        },
    },

    methods:
    {
        async load()
        {
            this.errors = {};

            this.summaryLoading = true;
            
            const response = await Http.get(
                `/my-company/summary/officers/total/view?date=${this.form.date}`
            );

            this.summaryLoading = false;

            if (response.status === 200)
            {
                this.summary = response.data;
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
            this.form.date = Dater.rawToday();
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },

        closeModal()
        {
            this.$parent.toggleModal('officers', false);
        },
    },

    watch:
    {
        officersModal(val)
        {
            if (val) this.load();
        },
    }
};
</script>
