<template>
    <ap-modal
        :isOpen.sync="$parent.$data.voterTypesModal"
        :size="'container'"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Summary of Voter Types
            </ap-modal-title>

            <hr class="ap-margin-small-top">
            

            <div class="ap-margin-top">

                <ul class="ap-list ap-list-divider"
                    v-if="!summaryLoading">
                    <li>
                        <ap-grid :gutter="'small'">
                            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l"></div>
                            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                                <small class="ap-text-bold">
                                    COMMAND VOTER (CV)
                                </small>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                                <small class="ap-text-bold">
                                    SURE VOTER (SV)
                                </small>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                                <small class="ap-text-bold">
                                    SWING VOTER (SW)
                                </small>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                                <small class="ap-text-bold">
                                    BLOCK LISTED (BL)
                                </small>
                            </div>
                        </ap-grid>
                    </li>
                    <li>
                        <ap-grid :gutter="'small'">
                            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                                <p class="ap-text-bold ap-margin-remove">
                                    TODAY
                                </p>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                                <p class="ap-text-bold ap-margin-remove">
                                    {{ summary.date.command ? summary.date.command : '0' }}
                                </p>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                                <p class="ap-text-bold ap-margin-remove">
                                    {{ summary.date.sure ? summary.date.sure : '0' }}
                                </p>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                                <p class="ap-text-bold ap-margin-remove">
                                    {{ summary.date.swing ? summary.date.swing : '0' }}
                                </p>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                                <p class="ap-text-bold ap-margin-remove">
                                    {{ summary.date.block ? summary.date.block : '0' }}
                                </p>
                            </div>
                        </ap-grid>
                    </li>
                    <li>
                        <ap-grid :gutter="'small'">
                            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                                <p class="ap-text-bold ap-margin-remove">
                                    THIS MONTH
                                </p>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                                <p class="ap-text-bold ap-margin-remove">
                                    {{ summary.month.command ? summary.month.command : '0' }}
                                </p>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                                <p class="ap-text-bold ap-margin-remove">
                                    {{ summary.month.sure ? summary.month.sure : '0' }}
                                </p>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                                <p class="ap-text-bold ap-margin-remove">
                                    {{ summary.month.swing ? summary.month.swing : '0' }}
                                </p>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                                <p class="ap-text-bold ap-margin-remove">
                                    {{ summary.month.block ? summary.month.block : '0' }}
                                </p>
                            </div>
                        </ap-grid>
                    </li>
                    <li>
                        <ap-grid :gutter="'small'">
                            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                                <p class="ap-text-bold ap-margin-remove">
                                    THIS YEAR
                                </p>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                                <p class="ap-text-bold ap-margin-remove">
                                    {{ summary.year.command ? summary.year.command : '0' }}
                                </p>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                                <p class="ap-text-bold ap-margin-remove">
                                    {{ summary.year.sure ? summary.year.sure : '0' }}
                                </p>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                                <p class="ap-text-bold ap-margin-remove">
                                    {{ summary.year.swing ? summary.year.swing : '0' }}
                                </p>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                                <p class="ap-text-bold ap-margin-remove">
                                    {{ summary.year.block ? summary.year.block : '0' }}
                                </p>
                            </div>
                        </ap-grid>
                    </li>
                </ul>

                <div class="ap-margin-medium-top ap-text-center"
                    v-else>

                    <ap-loader
                        :size="'large'" />

                    <p>
                        LOADING...
                    </p>
                </div>

                
                
                <!-- <ap-grid :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                        <h5 class="ap-text-bold ap-margin-remove">
                            TODAY
                        </h5>
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right@m">
                        <h3 class="ap-text-bold ap-margin-remove"
                            v-if="!summaryLoading">
                            {{ voterTypesDate }}
                        </h3>
                        <ap-loader
                            v-else
                            :size="'small'" />
                    </div>
                </ap-grid>
                
                <ap-grid :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                        <small class="ap-text-bold">
                            COMMAND VOTES (CV)
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right@m">
                        <p class="ap-text-bold ap-margin-remove"
                            v-if="!summaryLoading">
                            {{ summary.date.command ? summary.date.command : '0' }}
                        </p>
                        <ap-loader
                            v-else
                            :size="'small'" />
                    </div>
                </ap-grid>

                <ap-grid :gutter="'small'"
                    class="ap-margin-remove-top">
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                        <small class="ap-text-bold">
                            SURE VOTES (SV)
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right@m">
                        <p class="ap-text-bold ap-margin-remove"
                            v-if="!summaryLoading">
                            {{ summary.date.sure ? summary.date.sure : '0' }}
                        </p>
                        <ap-loader
                            v-else
                            :size="'small'" />
                    </div>
                </ap-grid>

                <ap-grid :gutter="'small'"
                    class="ap-margin-remove-top">
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                        <small class="ap-text-bold">
                            SWING VOTES (SW)
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right@m">
                        <p class="ap-text-bold ap-margin-remove"
                            v-if="!summaryLoading">
                            {{ summary.date.swing ? summary.date.swing : '0' }}
                        </p>
                        <ap-loader
                            v-else
                            :size="'small'" />
                    </div>
                </ap-grid>

                <ap-grid :gutter="'small'"
                    class="ap-margin-remove-top">
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                        <small class="ap-text-bold">
                            BLOCK LISTED (BL)
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right@m">
                        <p class="ap-text-bold ap-margin-remove"
                            v-if="!summaryLoading">
                            {{ summary.date.block ? summary.date.block : '0' }}
                        </p>
                        <ap-loader
                            v-else
                            :size="'small'" />
                    </div>
                </ap-grid>

                <hr>
                
                <ap-grid :gutter="'small'"
                    :class="'ap-margin-remove-top'">
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                        <h5 class="ap-text-bold ap-margin-remove">
                            THIS MONTH
                        </h5>
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right@m">
                        <h3 class="ap-text-bold ap-margin-remove"
                            v-if="!summaryLoading">
                            {{ voterTypesMonth }}
                        </h3>
                        <ap-loader
                            v-else
                            :size="'small'" />
                    </div>
                </ap-grid>

                <ap-grid :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                        <small class="ap-text-bold">
                            COMMAND VOTES (CV)
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right@m">
                        <p class="ap-text-bold ap-margin-remove"
                            v-if="!summaryLoading">
                            {{ summary.date.command ? summary.date.command : '0' }}
                        </p>
                        <ap-loader
                            v-else
                            :size="'small'" />
                    </div>
                </ap-grid>

                <ap-grid :gutter="'small'"
                    class="ap-margin-remove-top">
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                        <small class="ap-text-bold">
                            SURE VOTES (SV)
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right@m">
                        <p class="ap-text-bold ap-margin-remove"
                            v-if="!summaryLoading">
                            {{ summary.month.sure ? summary.month.sure : '0' }}
                        </p>
                        <ap-loader
                            v-else
                            :size="'small'" />
                    </div>
                </ap-grid>

                <ap-grid :gutter="'small'"
                    class="ap-margin-remove-top">
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                        <small class="ap-text-bold">
                            SWING VOTES (SW)
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right@m">
                        <p class="ap-text-bold ap-margin-remove"
                            v-if="!summaryLoading">
                            {{ summary.month.swing ? summary.month.swing : '0' }}
                        </p>
                        <ap-loader
                            v-else
                            :size="'small'" />
                    </div>
                </ap-grid>

                <ap-grid :gutter="'small'"
                    class="ap-margin-remove-top">
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                        <small class="ap-text-bold">
                            BLOCK LISTED (BL)
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right@m">
                        <p class="ap-text-bold ap-margin-remove"
                            v-if="!summaryLoading">
                            {{ summary.month.block ? summary.month.block : '0' }}
                        </p>
                        <ap-loader
                            v-else
                            :size="'small'" />
                    </div>
                </ap-grid>
                
                <hr>
                
                <ap-grid :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                        <h5 class="ap-text-bold ap-margin-remove">
                            THIS YEAR
                        </h5>
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right@m">
                        <h3 class="ap-text-bold ap-margin-remove"
                            v-if="!summaryLoading">
                            {{ voterTypesYear }}
                        </h3>
                        <ap-loader
                            v-else
                            :size="'small'" />
                    </div>
                </ap-grid>

                <ap-grid :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                        <small class="ap-text-bold">
                            COMMAND VOTES (CV)
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right@m">
                        <p class="ap-text-bold ap-margin-remove"
                            v-if="!summaryLoading">
                            {{ summary.year.command ? summary.year.command : '0' }}
                        </p>
                        <ap-loader
                            v-else
                            :size="'small'" />
                    </div>
                </ap-grid>

                <ap-grid :gutter="'small'"
                    class="ap-margin-remove-top">
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                        <small class="ap-text-bold">
                            SURE VOTES (SV)
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right@m">
                        <p class="ap-text-bold ap-margin-remove"
                            v-if="!summaryLoading">
                            {{ summary.year.sure ? summary.year.sure : '0' }}
                        </p>
                        <ap-loader
                            v-else
                            :size="'small'" />
                    </div>
                </ap-grid>

                <ap-grid :gutter="'small'"
                    class="ap-margin-remove-top">
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                        <small class="ap-text-bold">
                            SWING VOTES (SW)
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right@m">
                        <p class="ap-text-bold ap-margin-remove"
                            v-if="!summaryLoading">
                            {{ summary.year.swing ? summary.year.swing : '0' }}
                        </p>
                        <ap-loader
                            v-else
                            :size="'small'" />
                    </div>
                </ap-grid>

                <ap-grid :gutter="'small'"
                    class="ap-margin-remove-top">
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                        <small class="ap-text-bold">
                            BLOCK LISTED (BL)
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right@m">
                        <p class="ap-text-bold ap-margin-remove"
                            v-if="!summaryLoading">
                            {{ summary.year.block ? summary.year.block : '0' }}
                        </p>
                        <ap-loader
                            v-else
                            :size="'small'" />
                    </div>
                </ap-grid>

                <hr>
                
                <ap-grid :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                        <h5 class="ap-text-bold ap-margin-remove">
                            OVERALL
                        </h5>
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right@m">
                        <h3 class="ap-text-bold"
                            v-if="!summaryLoading">
                            {{ voterTypesTotal }}
                        </h3>
                        <ap-loader
                            v-else
                            :size="'small'" />
                    </div>
                </ap-grid>

                <ap-grid :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                        <small class="ap-text-bold">
                            COMMAND VOTES (CV)
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right@m">
                        <p class="ap-text-bold ap-margin-remove"
                            v-if="!summaryLoading">
                            {{ summary.command ? summary.command : '0' }}
                        </p>
                        <ap-loader
                            v-else
                            :size="'small'" />
                    </div>
                </ap-grid>

                <ap-grid :gutter="'small'"
                    class="ap-margin-remove-top">
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                        <small class="ap-text-bold">
                            SURE VOTES (SV)
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right@m">
                        <p class="ap-text-bold ap-margin-remove"
                            v-if="!summaryLoading">
                            {{ summary.sure ? summary.sure : '0' }}
                        </p>
                        <ap-loader
                            v-else
                            :size="'small'" />
                    </div>
                </ap-grid>

                <ap-grid :gutter="'small'"
                    class="ap-margin-remove-top">
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                        <small class="ap-text-bold">
                            SWING VOTES (SW)
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right@m">
                        <p class="ap-text-bold ap-margin-remove"
                            v-if="!summaryLoading">
                            {{ summary.swing ? summary.swing : '0' }}
                        </p>
                        <ap-loader
                            v-else
                            :size="'small'" />
                    </div>
                </ap-grid>

                <ap-grid :gutter="'small'"
                    class="ap-margin-remove-top">
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                        <small class="ap-text-bold">
                            BLOCK LISTED (BL)
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right@m">
                        <p class="ap-text-bold ap-margin-remove"
                            v-if="!summaryLoading">
                            {{ summary.block ? summary.block : '0' }}
                        </p>
                        <ap-loader
                            v-else
                            :size="'small'" />
                    </div>
                </ap-grid> -->

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
                total: 0,
                others: 0,
                command: 0,
                sure: 0,
                swing: 0,
                block: 0,
                year:
                {
                    total: 0,
                    others: 0,
                    command: 0,
                    sure: 0,
                    swing: 0,
                    block: 0,
                },
                month:
                {
                    total: 0,
                    others: 0,
                    command: 0,
                    sure: 0,
                    swing: 0,
                    block: 0,
                },
                date:
                {
                    total: 0,
                    others: 0,
                    command: 0,
                    sure: 0,
                    swing: 0,
                    block: 0,
                },
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
        voterTypesModal()
        {
            return this.$parent.$data.voterTypesModal;
        },

        voterTypesTotal()
        {
            let total = parseInt(this.summary.command);
                total += parseInt(this.summary.sure);
                total += parseInt(this.summary.swing);
                total += parseInt(this.summary.block);

            return total;
        },

        voterTypesYear()
        {
            let total = parseInt(this.summary.year.command);
                total += parseInt(this.summary.year.sure);
                total += parseInt(this.summary.year.swing);
                total += parseInt(this.summary.year.block);

            return total;
        },

        voterTypesMonth()
        {
            let total = parseInt(this.summary.month.command);
                total += parseInt(this.summary.month.sure);
                total += parseInt(this.summary.month.swing);
                total += parseInt(this.summary.month.block);

            return total;
        },

        voterTypesDate()
        {
            let total = parseInt(this.summary.date.command);
                total += parseInt(this.summary.date.sure);
                total += parseInt(this.summary.date.swing);
                total += parseInt(this.summary.date.block);

            return total;
        },
    },

    methods:
    {
        async load()
        {
            this.errors = {};

            this.summaryLoading = true;
            
            const response = await Http.get(
                `/my-company/summary/voter-types/total/view?date=${this.form.date}`
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
            this.$parent.toggleModal('voterTypes', false);
        },
    },

    watch:
    {
        voterTypesModal(val)
        {
            if (val) this.load();
        },
    }
};
</script>
