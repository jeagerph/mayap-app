<template>
    <ap-modal
        :isOpen.sync="$parent.$data.createModal"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Create Barangay Official
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">
                <form class="ap-form-stacked"
                    @submit.prevent="submit()">
                    <fieldset class="ap-fieldset">

                        <div class="ap-margin">
                            <label class="ap-form-label ap-text-bold"
                                :class="{ 'ap-text-danger': hasError('position_id')}">
                                * Position
                            </label>
                            <select class="ap-select"
                                :readonly="isLoading('store')"
                                v-model="form.position_id"
                                :required="true">
                                <option :value="''" disabled>-- select position --</option>
                                <option :value="1">PUNONG BARANGAY</option>
                                <option :value="2">KAGAWAD</option>
                                <option :value="5">BARANGAY SECRETARY</option>
                                <option :value="6">BARANGAY TREASURER</option>
                                <option :value="7">BARANGAY ADMINISTRATOR</option>
                                <option :value="8">BARANGAY EXECUTIVE ASSISTANT</option>
                                <option :value="9">BARANGAY CLERK</option>
                                <option :value="3">SK CHAIRMAN</option>
                                <option :value="4">SK KAGAWAD</option>
                                <option :value="10">SK SECRETARY</option>
                                <option :value="11">SK TREASURER</option>
                                <option :value="12">SK CLERK</option>
                            </select>

                            <small class="ap-text-bold ap-text-danger"
                                v-if="hasError('position_id')">
                                <i class="bx bx-info-circle"></i> {{errors['position_id'][0]}}
                            </small>
                        </div>

                        <ap-grid
                            :gutter="'small'">
                            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                <ap-input
                                    type="text"
                                    :required="true"
                                    :readonly="isLoading('store')"
                                    :label="'* Prefix'"
                                    :placeholder="'ex. HON.'"
                                    v-model="form.prefix"
                                    :error="hasError('prefix') ? errors.prefix[0] : ''"/>
                            </div>
                            <div class="ap-width-1-1@s ap-width-2-3@m ap-width-2-3@l">
                                <ap-input
                                    type="text"
                                    :required="true"
                                    :readonly="isLoading('store')"
                                    :label="'* Full Name'"
                                    :placeholder="'ex. JUAN DELA CRUZ'"
                                    v-model="form.name"
                                    :error="hasError('name') ? errors.name[0] : ''"/>
                            </div>
                        </ap-grid>
                        
                        <div class="ap-margin-top">
                            <form class="ap-form-stacked"
                            @submit.prevent="add()">
                                <fieldset>
                                    <ap-input
                                        type="text"
                                        :readonly="isLoading('store')"
                                        :label="'* Type a Committee'"
                                        :placeholder="'ex. Committee on Education'"
                                        v-model="keyword" />
                                </fieldset>
                            </form>
                            
                            <div class="ap-margin-small-top"
                                v-if="form.committees.length">
                                <div class="ap-inline ap-margin-xsmall-right"
                                    v-for="(item, index) in form.committees"
                                    :key="index">
                                    <div class="ap-chips">
                                        <p class="ap-margin-remove ap-flex-middle">
                                            <span>
                                                {{item}}
                                            </span>
                                            <a class="ap-link-reset ap-point ap-chips-close"
                                                @click="remove(index)">
                                                <i class="lni lni-close"></i>
                                            </a>
                                        </p>
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="ap-margin-top" v-else>
                                <p class="ap-text-italic">No committee yet</p>
                            </div>
                        </div>

                        <div class="ap-margin">
                            <label class="ap-text-bold ap-form-label"
                                :class="{ 'ap-text-danger': hasError('registered_domain')}">
                                * Registered Domain
                            </label>

                            <select
                                class="ap-select"
                                :required="true"
                                v-model="form.registered_domain"
                                :readonly="isLoading('store')">
                                <option :value="''" disabled>-- select domain --</option>
                                <option :value="1">KAPITAN.PH</option>
                                <option :value="2">KABATAAN.PH</option>
                            </select>

                            <small class="ap-text-bold ap-text-danger"
                                v-if="hasError(`registered_domain`)">
                                <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                                {{errors[`registered_domain`][0]}}
                            </small>
                        </div>

                    </fieldset>

                    
                    <div class="ap-margin ap-text-right">
                        <ap-button
                            v-if="!isLoading('store')"
                            type="button"
                            class="ap-margin-small-right"
                            @click="closeModal()">
                            Cancel
                        </ap-button>
                        <ap-button
                            type="submit"
                            :color="'primary'"
                            :outline="false"
                            :loading="isLoading('store')">
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

            form:
            {
                position_id: '',
                name: '',
                prefix: '',
                committees: [],
                show_certificate: 1,
                show_certificate_photo: 0,
                show_certificate_position: 1,
                show_certificate_committees: 1,
                registered_domain: '',
            },

            keyword: '',
        };
    },

    created()
    {
        this.initialize();
    },

    computed:
    {
        ...mapGetters({
            isLoading: 'adminBarangayOfficial/isLoading',
        }),
    },

    methods:
    {
        ...mapActions({
            store: 'adminBarangayOfficial/store',
        }),

        async submit()
        {
            this.errors = {};
            
            const response = await this.store({
                url: `/administration/barangay/${this.$route.params.code}/official`,
                form: this.form,
            });

            if (response.status === 201)
            {
                this.initialize();

                this.closeModal();

                Toast.success({
                    message: 'Barangay official has been updated.'
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
            this.form.position_id = '';
            this.form.name = '';
            this.form.committees = [];
            this.form.show_certificate = 1;
            this.form.show_certificate_photo = 0;
            this.form.show_certificate_position = 1;
            this.form.show_certificate_committees = 1;
            this.form.registered_domain = '';
        },

        add()
        {
            this.form.committees.push(this.keyword);

            this.keyword = '';
        },

        remove(index)
        {
            this.form.committees.splice(index, 1);
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },

        closeModal()
        {
            this.$parent.toggleModal('create', false);
        },
    },
};
</script>
