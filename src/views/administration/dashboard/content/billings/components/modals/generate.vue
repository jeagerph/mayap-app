<template>
    <ap-modal
        :isOpen.sync="$parent.$data.generateModal"
        :isCenter="true"
        :size="'container'">

        <ap-modal-body>
            <ap-modal-title>
                Generate Billings
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">

                <form class="ap-form-stacked"
                    @submit.prevent="submit()">
                    <fieldset class="ap-fieldset">

                        <div v-if="!barangaysLoading">
                            <ap-grid :gutter="'small'"
                                class="ap-flex-middle">
                                <div class="ap-width-expand">
                                    <ap-autocomplete
                                        type="search"
                                        :label="'Search a Barangay'"
                                        :loading="loading"
                                        :isOpen.sync="autocompleteOpen"
                                        :doneTyping="search"
                                        :onSelect="select"
                                        :items="result"
                                        v-model="keyword"
                                        :placeholder="'ex. STA. RITA'"/>
                                </div>
                                <div v-if="loading">
                                    <ap-loader
                                        :size="'small'" />
                                </div>
                            </ap-grid>
                        </div>
                        <ap-placeholder
                            v-else
                            :size="'medium'" />

                        <div class="ap-margin-small-top"
                            v-if="barangays.length">
                            <p class="ap-margin-remove ap-text-italic">
                                Selected Barangays:
                            </p>

                            <div class="ap-inline ap-margin-small-top"
                                v-for="(item, index) in barangays"
                                :key="index">
            
                                <div class="ap-chips ap-flex-middle">
                                    BRGY {{item.barangay_name}}
                                    <div class="ap-margin-small-left">
                                        <a class="ap-link-reset ap-point"
                                            @click="onRemove(index)">
                                            <i class="lni lni-close"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p v-else
                            class="ap-text-italic">
                            No selected barangay yet
                        </p>

                        <ap-grid :gutter="'small'"
                            class="ap-margin-medium-top">
                            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                                <ap-input
                                    type="date"
                                    :required="true"
                                    :label="'* Date of Billing'"
                                    :error="hasError('invoice_date') ? errors.invoice_date[0] :''"
                                    v-model="form.invoice_date" />
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                                <ap-input
                                    type="date"
                                    :required="true"
                                    :label="'* Due Date'"
                                    :error="hasError('invoice_due_date') ? errors.invoice_due_date[0] :''"
                                    v-model="form.invoice_due_date" />
                            </div>
                        </ap-grid>

                        <ap-grid :gutter="'small'">
                            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                                <ap-input
                                    type="date"
                                    :required="true"
                                    :label="'* Start Date'"
                                    :error="hasError('start_date') ? errors.start_date[0] :''"
                                    v-model="form.start_date" />
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                                <ap-input
                                    type="date"
                                    :required="true"
                                    :label="'* End Date'"
                                    :error="hasError('end_date') ? errors.end_date[0] :''"
                                    v-model="form.end_date" />
                            </div>
                        </ap-grid>

                    </fieldset>

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
                            type="submit"
                            :color="'primary'"
                            :rounded="true"
                            :loading="submitLoading">
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

            keyword: '',
            loading: false,
            autocompleteOpen: false,
            result: [],
            
            form:
            {
                barangayCodes: [],
                invoice_date: '',
                invoice_due_date: '',
                start_date: '',
                end_date: '',
            },

            barangays: [],
            barangaysLoading: false,

            submitLoading: false,
        };
    },

    created()
    {
        this.loadBarangays();

        this.initialize();
    },

    computed:
    {
        ...mapGetters({
            invoice: 'adminInvoice/selected',
        }),

        invoiceDate()
        {
            return this.form.invoice_date;
        },
    },

    methods:
    {
        async submit()
        {
            this.errors = {};

            await this.barangays.forEach(row => {
                this.form.barangayCodes.push(row.slug.code);
            });

            this.submitLoading = true;
            
            const response = await Http.post(
                `/administration/invoices/generate`,
                this.form
            );

            this.submitLoading = false;

            if (response.status === 200)
            {
                this.initialize();

                this.$parent.loadList();

                this.closeModal();

                Toast.success({
                    message: 'Billings has been created.'
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

        async search(isFirst = false)
        {
            this.loading = true;

            this.result = [];

            const response = await Http.get(`/administration/invoice/barangays?search=${this.keyword}`);

            this.loading = false;
            
            if (response.status === 200)
            {
                const items = [];

                if (response.data.data.length)
                {
                    response.data.data.forEach((row) =>
                    {
                        const item = {};
                        item.title = `BARANGAY ${row.barangay.name}`;
                        item.label = `${row.city.name}, ${row.province.name}`;
                        item.data = row;
                        items.push(item);
                    });
                }

                this.result = items;

                this.autocompleteOpen = true;
            }
            else
            {
                console.error('No result');
            }
        },

        select(item)
        {
            this.errors = {};

            const data = item.data;

            this.keyword = data.name;

            const checking = this.barangays.find(row => row.slug.code == data.slug.code);

            if (checking) return Toast.error({
                    message: 'Barangay already selected.',
            });

            this.barangays.push(data);
        },

        async loadBarangays()
        {
            this.barangaysLoading = true;

            const response = await Http.get(`/administration/invoice/barangays`);

            this.barangaysLoading = false;

            if (response.status == 200)
            {
                this.barangays = response.data.data;
            }
        },

        initialize()
        {
            this.form.barangayCodes = [];
            this.form.invoice_date = Dater.rawToday();
            this.form.invoice_due_date = Dater.addDays(30, Dater.rawToday());
            this.form.start_date = '';
            this.form.end_date = '';
        },

        onUpdate()
        {
            this.form.invoice_due_date = Dater.addDays(30, this.form.invoice_date);
        },

        onRemove(index)
        {
            this.barangays.splice(index, 1);
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },

        closeModal()
        {
            this.$parent.toggleModal('generate', false);
        },
    },

    watch:
    {
        invoiceDate()
        {
            this.onUpdate();
        },
    },
};
</script>
