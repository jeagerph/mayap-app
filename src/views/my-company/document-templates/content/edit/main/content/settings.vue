<template>
    <div class="ap-margin-medium-top">
        <ap-grid :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                <p class="ap-text-bold ap-text-primary">
                    DOCUMENT SETTINGS
                </p>

                <div class="ap-margin-small-top"
                    v-if="!isLoading('edit')">
                    <label for="update-option-with-document-no">
                        <input class="ap-checkbox" id="update-option-with-document-no" type="checkbox"
                            :true-value="1"
                            :false-value="0"
                            v-model="form.options.with_document_no">
                        <span class="ap-margin-small-left">
                            SHOW DOCUMENT NO
                        </span>
                    </label>
                </div>
                <div class="ap-margin-small-top"
                    v-else>
                    <ap-placeholder
                        :size="'medium'" />
                </div>

                <div class="ap-margin-small-top"
                    v-if="!isLoading('edit')">
                    <label for="update-option-with-qr-code">
                        <input class="ap-checkbox" id="update-option-with-qr-code" type="checkbox"
                            :true-value="1"
                            :false-value="0"
                            v-model="form.options.with_qr_code">
                        <span class="ap-margin-small-left">
                            SHOW QR CODE
                        </span>
                    </label>
                </div>
                <div class="ap-margin-small-top"
                    v-else>
                    <ap-placeholder
                        :size="'medium'" />
                </div>

                <div class="ap-margin-small-top"
                    v-if="!isLoading('edit')">
                    <label for="update-option-with-issuance-date">
                        <input class="ap-checkbox" id="update-option-with-issuance-date" type="checkbox"
                            :true-value="1"
                            :false-value="0"
                            v-model="form.options.with_issuance_date">
                        <span class="ap-margin-small-left">
                            SHOW ISSUANCE DATE
                        </span>
                    </label>
                </div>
                <div class="ap-margin-small-top"
                    v-else>
                    <ap-placeholder
                        :size="'medium'" />
                </div>

                <div class="ap-margin-small-top"
                    v-if="!isLoading('edit')">
                    <label for="update-option-with-expiration-date">
                        <input class="ap-checkbox" id="update-option-with-expiration-date" type="checkbox"
                            :true-value="1"
                            :false-value="0"
                            v-model="form.options.with_expiration_date">
                        <span class="ap-margin-small-left">
                            SHOW EXPIRATION DATE
                        </span>
                    </label>
                </div>
                <div class="ap-margin-small-top"
                    v-else>
                    <ap-placeholder
                        :size="'medium'" />
                </div>

                <div class="ap-margin-top"
                    v-if="!isLoading('edit')"
                    v-show="form.options.with_expiration_date">
                    <p class="ap-text-italic">
                        Set Expiration Date:
                    </p>
                    <div>
                        <ap-grid :gutter="'small'"
                            class="ap-flex-middle">
                            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                                <input class="ap-checkbox" id="update-option-expiration-date" type="radio"
                                    :value="'months'"
                                    v-model="form.options.expiration_date.default">
                            </div>
                            <div class="ap-width-1-1@s ap-width-4-5@m ap-width-4-5@l"
                                :class="{ 'ap-opacity': form.options.expiration_date.default != 'months'}">
                                <input type="number"
                                    class="ap-input"
                                    min="1"
                                    :required="form.options.expiration_date.default == 'months'"
                                    v-model="form.options.expiration_date.months" />
                                <small class="ap-text-italic">
                                    + {{form.options.expiration_date.months}} month(s) from Issuance Date
                                </small>
                                <div v-if="hasError('options.expiration_date.months')">
                                    <small class="ap-text-bold ap-text-danger">
                                        {{errors['options.expiration_date.months'][0]}}
                                    </small>
                                </div>
                            </div>
                        </ap-grid>
                    </div>
                    <div>
                        <ap-grid :gutter="'small'"
                            class="ap-flex-middle">
                            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                                <input class="ap-checkbox" id="update-option-expiration-date" type="radio"
                                    :value="'specific'"
                                    v-model="form.options.expiration_date.default">
                            </div>
                            <div class="ap-width-1-1@s ap-width-4-5@m ap-width-4-5@l"
                                :class="{ 'ap-opacity': form.options.expiration_date.default != 'specific'}">
                                <input type="date"
                                    class="ap-input"
                                    :required="form.options.expiration_date.default == 'specific'"
                                    v-model="form.options.expiration_date.specific" />
                                <small class="ap-text-italic">
                                    Specific date
                                </small>
                                <div v-if="hasError('options.expiration_date.specific')">
                                    <small class="ap-text-bold ap-text-danger">
                                        {{errors['options.expiration_date.specific'][0]}}
                                    </small>
                                </div>
                            </div>
                        </ap-grid>
                        
                    </div>
                    
                </div>
            </div>

            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                <p class="ap-text-bold ap-text-primary">
                    APPLICANT SETTINGS
                </p>

                <div class="ap-margin-small-top"
                    v-if="!isLoading('edit')">
                    <label for="update-option-with-applicant-photo">
                        <input class="ap-checkbox" id="update-option-with-applicant-photo" type="checkbox"
                            :true-value="1"
                            :false-value="0"
                            v-model="form.options.with_applicant_photo">
                        <span class="ap-margin-small-left">
                            SHOW APPLICANT PHOTO
                        </span>
                    </label>
                </div>
                <div class="ap-margin-small-top"
                    v-else>
                    <ap-placeholder
                        :size="'medium'" />
                </div>
                
                <div class="ap-margin-small-top"
                    v-if="!isLoading('edit')">
                    <label for="update-option-with-applicant-signature">
                        <input class="ap-checkbox" id="update-option-with-applicant-signature" type="checkbox"
                            :true-value="1"
                            :false-value="0"
                            v-model="form.options.with_applicant_signature">
                        <span class="ap-margin-small-left">
                            SHOW APPLICANT SIGNATURE
                        </span>
                    </label>
                </div>
                <div class="ap-margin-small-top"
                    v-else>
                    <ap-placeholder
                        :size="'medium'" />
                </div>

            </div>

            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                <p class="ap-text-bold ap-text-primary">
                    APPROVAL SETTINGS
                </p>

                <div class="ap-margin-small-top"
                    v-if="!isLoading('edit')">
                    <label for="update-option-with-left-approval">
                        <input class="ap-checkbox" id="update-option-with-left-approval" type="checkbox"
                            :true-value="1"
                            :false-value="0"
                            v-model="form.options.with_left_approval">
                        <span class="ap-margin-small-left">
                            SHOW LEFT APPROVAL
                        </span>
                    </label>
                </div>
                <div class="ap-margin-small-top"
                    v-else>
                    <ap-placeholder
                        :size="'medium'" />
                </div>

                <div class="ap-margin-small-top"
                    v-if="!isLoading('edit')">
                    <label for="update-option-with-left-approval-signature">
                        <input class="ap-checkbox" id="update-option-with-left-approval-signature" type="checkbox"
                            :true-value="1"
                            :false-value="0"
                            v-model="form.options.with_left_approval_signature">
                        <span class="ap-margin-small-left">
                            SHOW LEFT APPROVAL SIGNATURE
                        </span>
                    </label>
                </div>
                <div class="ap-margin-small-top"
                    v-else>
                    <ap-placeholder
                        :size="'medium'" />
                </div>

                <div class="ap-margin-small-top"
                    v-if="!isLoading('edit')">
                    <label for="update-option-with-right-approval">
                        <input class="ap-checkbox" id="update-option-with-right-approval" type="checkbox"
                            :true-value="1"
                            :false-value="0"
                            v-model="form.options.with_right_approval">
                        <span class="ap-margin-small-left">
                            SHOW RIGHT APPROVAL
                        </span>
                    </label>
                </div>
                <div class="ap-margin-small-top"
                    v-else>
                    <ap-placeholder
                        :size="'medium'" />
                </div>

                <div class="ap-margin-small-top"
                    v-if="!isLoading('edit')">
                    <label for="update-option-with-right-approval-signature">
                        <input class="ap-checkbox" id="update-option-with-right-approval-signature" type="checkbox"
                            :true-value="1"
                            :false-value="0"
                            v-model="form.options.with_right_approval_signature">
                        <span class="ap-margin-small-left">
                            SHOW RIGHT APPROVAL SIGNATURE
                        </span>
                    </label>
                </div>
                <div class="ap-margin-small-top"
                    v-else>
                    <ap-placeholder
                        :size="'medium'" />
                </div>

            </div>
        </ap-grid>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default
{
    computed:
    {
        ...mapGetters({
            form: 'myCompanyDocumentTemplate/editForm',
            isLoading: 'myCompanyDocumentTemplate/isLoading',
        }),

        errors:
        {
            get()
            {
                return this.$parent.$data.errors;
            },

            set(value)
            {
                this.$parent.$data.errors = value;
            },
        },
    },

    methods:
    {
        hasError(name = null)
        {
            return this.$parent.hasError(name);
        },
    },
};
</script>