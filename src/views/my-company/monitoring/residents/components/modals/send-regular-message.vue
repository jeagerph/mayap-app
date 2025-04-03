<template>
    <ap-modal
        :isOpen.sync="$parent.$data.sendRegularMessageModal"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Send Message to RESIDENT
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">

                <ap-grid :gutter="'small'"
                    class="ap-margin-remove-top">
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                        <small>
                            SENDER:
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l ap-text-right@m">
                        <p class="ap-text-bold ap-margin-remove">
                            REGULAR
                        </p>
                    </div>
                </ap-grid>
                
                <ap-grid :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                        <small>
                            RECIPIENT:
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l ap-text-right@m">
                        <p class="ap-text-bold ap-margin-remove">
                            {{fullName}} ({{resident.contact_no}})
                        </p>
                    </div>
                </ap-grid>
                
                <form class="ap-form-stacked ap-margin-top"
                    @submit.prevent="submit()">
                    <fieldset class="ap-fieldset">
                        <small class="ap-text-bold">
                            MESSAGE:
                        </small>

                        <div class="ap-margin-top">
                            <div v-if="resident.contact_no">
                                <p>
                                    {{smsSetting.header_name}}
                                </p>
                                <textarea
                                    class="ap-textarea ap-textarea-message"
                                    cols="30"
                                    rows="10"
                                    autofocus
                                    :placeholder="'type your message here...'"
                                    v-model="form.message">
                                </textarea>
                                <div class="ap-text-right">
                                    <small class="ap-text-muted"
                                        style="font-size: 11px;">
                                        Character count : {{charLength}} / {{smsSetting.max_char}}
                                    </small>
                                </div>
                                
                                <div class="ap-margin-xsmall-top">
                                    <small class="ap-text-bold ap-text-danger"
                                        v-if="hasError('message')">
                                        {{errors.message[0]}}
                                    </small>
                                </div>
                                <div class="ap-margin-xsmall-top">
                                    <small class="ap-text-bold ap-text-danger"
                                        v-if="hasError('mobile_number')">
                                        {{errors.mobile_number[0]}}
                                    </small>
                                </div>
                                
                            </div>
                            <div v-else
                                class="ap-text-center">
                                <p class="ap-text-italic">
                                    Sorry, you cannot send a message to the recipient without a mobile number.
                                </p>
                            </div>
                        </div>

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
                            v-if="resident.contact_no"
                            type="submit"
                            :rounded="true"
                            :color="'primary'"
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
import { mapGetters, mapActions } from 'vuex';

import Http from '@/services';

import { Form, Toast, Dater } from '@/utils';

export default
{
    data()
    {
        return {
            errors: {},

            submitLoading: false,

            form:
            {
                mobile_number: '',
                sms_type: 1,
                transaction_date: '',
                transaction_type: 1,
                scheduled_date: '',
                scheduled_time: '',
                message: '',
                source: 'RESIDENT',

                message_date: '',
                message_type: 1,
            },
        };
    },

    created()
    {
        this.initialize();
    },

    computed:
    {
        ...mapGetters({
            resident: 'companyResident/selected',
            isLoading: 'companyResident/isLoading',
            accessUser: 'auth/accessUser',
        }),

        company()
        {
            return this.accessUser.company;
        },

        smsSetting()
        {
            return this.company.sms_setting;
        },

        fullName()
        {
            return `${this.resident.last_name}, ${this.resident.first_name} ${this.resident.middle_name ? this.resident.middle_name : ''}`;
        },

        charLength()
        {
            let headerName = this.smsSetting.header_name;
            
            return headerName.length + this.form.message.length;
        },

        sendRegularMessageModal()
        {
            return this.$parent.$data.sendRegularMessageModal;
        },
    },

    methods:
    {
        ...mapActions({
            store: 'companyResidentMessage/store',
        }),

        async submit()
        {
            this.errors = {};

            this.submitLoading = true;
            
            const response = await Http.post(
                `/my-company/sms/send`,
                this.form
            );

            this.submitLoading = false;

            if (response.status === 201)
            {
                Toast.success({
                    message: `Your message has been sent.`,
                });

                this.initialize();

                this.closeModal();
            }
            else if (response.status === 422)
            {
                this.errors = response.data.errors;
                
                Toast.error({
                    message: 'Kindly double check your form.',
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
            this.form.mobile_number = this.resident.contact_no;
            this.form.sms_type = 1;
            this.form.transaction_date = Dater.rawToday();
            this.form.transaction_type = 1;
            this.form.scheduled_date = Dater.rawToday();
            this.form.scheduled_time = Dater.rawTime('H:i');
            this.form.message = `Attention: ${this.fullName}`;

            this.form.message_date = Dater.rawToday();
            this.form.message_type = 1;
            this.form.message_sender_name = 'REGULAR';
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },

        closeModal()
        {
            this.$parent.toggleModal('sendRegularMessage', false);
        },
    },

    watch:
    {
        sendRegularMessageModal(val)
        {
            if (val) this.load();
        },
    },
};
</script>
