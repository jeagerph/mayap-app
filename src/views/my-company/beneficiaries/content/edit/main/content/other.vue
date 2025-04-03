<template>
    <div class="ap-margin-small-top">

        <div class="ap-margin-top">
            <ap-input
                type="text"
                :readonly="isLoading('update')"
                :label="'Place of Birth'"
                :placeholder="'ex. OLONGAPO CITY'"
                v-model="form.place_of_birth"
                :error="hasError('place_of_birth') ? errors.place_of_birth[0] : ''"/>
        </div>

        <ap-grid :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <ap-input
                    type="text"
                    :readonly="isLoading('update')"
                    :label="'E-mail'"
                    :placeholder="'ex. juan.delacruz@email.com'"
                    v-model="form.email"
                    :error="hasError('email') ? errors.email[0] : ''"/>
            </div>
            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <ap-input
                    list="civilStatusOptions"
                    type="text"
                    :readonly="isLoading('update')"
                    :label="'Civil Status'"
                    :placeholder="'ex. SINGLE'"
                    v-model="form.civil_status"
                    :error="hasError('civilStatusOptions') ? errors.civilStatusOptions[0] : ''"/>
                <datalist id="civilStatusOptions">
                    <option value="SINGLE" />
                    <option value="MARRIED" />
                    <option value="DIVORCED" />
                    <option value="SEPARATED" />
                    <option value="WIDOWED" />
                    <option value="OTHERS" />
                </datalist>
            </div>
        </ap-grid>

        <ap-grid
            :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <ap-input
                    type="text"
                    :readonly="isLoading('update')"
                    :label="'Citizenship'"
                    :placeholder="'ex. FILIPINO'"
                    v-model="form.citizenship"
                    :error="hasError('citizenship') ? errors.citizenship[0] : ''"/>
            </div>
            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <ap-input
                    list="religion"
                    type="text"
                    :readonly="isLoading('update')"
                    :label="'Religion'"
                    :placeholder="'ex. ROMAN CATHOLIC'"
                    v-model="form.religion"
                    :error="hasError('religion') ? errors.religion[0] : ''"/>
                <datalist id="religion">
                    <option value="ROMAN CATHOLIC" />
                    <option value="BORN AGAIN CHRISTIAN" />
                    <option value="BAPTIST" />
                    <option value="SEVENTH-DAY ADVENTIST" />
                    <option value="IGLESIA NI CRISTO" />
                    <option value="JEHOVAS WITNESS" />
                    <option value="UNITED CHURCH OF CHRIST" />
                    <option value="PROTESTANT" />
                    <option value="ISLAM" />
                    <option value="HINDUISM" />
                    <option value="BUDDHISM" />
                </datalist>
            </div>
        </ap-grid>

        <div class="ap-margin-small-top">
            <ap-input
                list="classificationOptions"
                type="text"
                :readonly="isLoading('update')"
                :label="'Classification'"
                :placeholder="'ex. DISPLACED OFW'"
                v-model="form.classification"
                :error="hasError('classification') ? errors.classification[0] : ''"/>
            <datalist id="classificationOptions"
                v-if="!isLoading('classifications')">
                <option value="NOT APPLICABLE"></option>
                <option v-for="(classification, index) in classifications"
                    :key="index"
                    :value="classification.name">
                </option>
            </datalist>
            <small v-else>
                <ap-loader
                    :size="'xsmall'" />
                <span class="ap-margin-small-left">
                    Loading options ...
                </span>
            </small>
        </div>

        <ap-grid
            :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <ap-input
                    type="text"
                    :readonly="isLoading('update')"
                    :label="'Educational Attainment'"
                    :placeholder="'ex. HIGH SCHOOL GRADUATE'"
                    v-model="form.educational_attainment"
                    :error="hasError('educational_attainment') ? errors.educational_attainment[0] : ''"/>
            </div>
            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <ap-input
                    type="text"
                    :readonly="isLoading('update')"
                    :label="'Occupation'"
                    :placeholder="'ex. DRIVER'"
                    v-model="form.occupation"
                    :error="hasError('occupation') ? errors.occupation[0] : ''"/>
            </div>
            
        </ap-grid>

        <ap-grid
            :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <ap-input
                    type="text"
                    :readonly="isLoading('update')"
                    :label="'Monthly Income'"
                    :placeholder="'ex. 10000'"
                    v-model="form.monthly_income"
                    :error="hasError('monthly_income') ? errors.monthly_income[0] : ''"/>
            </div>
            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <ap-input
                    type="text"
                    :readonly="isLoading('update')"
                    :label="'Source of Income'"
                    :placeholder="'ex. SARI SARI STORE'"
                    v-model="form.source_of_income"
                    :error="hasError('source_of_income') ? errors.source_of_income[0] : ''"/>
            </div>
        </ap-grid>

        <ap-grid :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <label class="ap-form-label ap-text-bold">
                    Is Head of household?
                </label>

                <div class="ap-inline ap-margin-small-top">
                    <label for="is-household-yes">
                        <input class="ap-checkbox" id="is-household-yes" type="radio"
                            :value="1"
                            v-model="form.is_household">
                        <span class="ap-margin-small-left">
                            Yes
                        </span>
                    </label>
                </div>
                <div class="ap-inline ap-margin-small-top ap-margin-left">
                    <label for="is-household-no">
                        <input class="ap-checkbox" id="is-household-no" type="radio"
                            :value="0"
                            v-model="form.is_household">
                        <span class="ap-margin-small-left">
                            No
                        </span>
                    </label>
                </div>
            </div>
            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <ap-input
                    type="number"
                    :readonly="isLoading('update')"
                    :label="'How many Household Member?'"
                    v-model="form.household_count"
                    :error="hasError('household_count') ? errors.household_count[0] : ''"/>
            </div>
        </ap-grid>

        <ap-grid :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <ap-input
                    type="number"
                    :readonly="isLoading('update')"
                    :label="'How many Family in a Household?'"
                    v-model="form.household_families_count"
                    :error="hasError('household_families_count') ? errors.household_families_count[0] : ''"/>

            </div>
            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <ap-input
                    type="number"
                    :readonly="isLoading('update')"
                    :label="'How many Household Member is a Voter?'"
                    v-model="form.household_voters_count"
                    :error="hasError('household_voters_count') ? errors.household_voters_count[0] : ''"/>
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
            form: 'companyBeneficiary/editForm',
            isLoading: 'companyBeneficiary/isLoading',
            classifications: 'companyBeneficiary/classifications',
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
