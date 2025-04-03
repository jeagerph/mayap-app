<template>
    <div class="ap-padding-small">
        <ap-grid :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <ap-grid
                    :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                        <small>
                            FIRST NAME:
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <p class="ap-text-bold ap-margin-remove"
                            v-if="!isLoading('show')">
                            {{beneficiary.first_name}}
                        </p>
                        <ap-placeholder
                            v-else
                            :size="'small'"
                            :width="'120px'" />
                    </div>
                </ap-grid>

                <ap-grid
                    :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                        <small>
                            MIDDLE NAME:
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <p class="ap-text-bold ap-margin-remove"
                            v-if="!isLoading('show')">
                            {{beneficiary.middle_name}}
                        </p>
                        <ap-placeholder
                            v-else
                            :size="'small'"
                            :width="'120px'" />
                    </div>
                </ap-grid>

                <ap-grid
                    :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                        <small>
                            LAST NAME:
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <p class="ap-text-bold ap-margin-remove"
                            v-if="!isLoading('show')">
                            {{beneficiary.last_name}}
                        </p>
                        <ap-placeholder
                            v-else
                            :size="'small'"
                            :width="'120px'" />
                    </div>
                </ap-grid>

                <ap-grid
                    :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                        <small>
                            GENDER:
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <p class="ap-margin-remove"
                            v-if="!isLoading('show')">
                            <span class="ap-text-bold"
                                v-if="beneficiary.gender">
                                {{beneficiary.gender.name}}
                            </span>
                            <span class="ap-text-italic"
                                v-else>
                                NOT INDICATED
                            </span>
                        </p>
                        <ap-placeholder
                            v-else
                            :size="'small'"
                            :width="'120px'" />
                    </div>
                </ap-grid>

                <ap-grid
                    :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                        <small>
                            DATE OF BIRTH:
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <p class="ap-text-bold ap-margin-remove"
                            v-if="!isLoading('show')">
                            {{dateOfBirth}}
                        </p>
                        <ap-placeholder
                            v-else
                            :size="'small'"
                            :width="'120px'" />
                    </div>
                </ap-grid>

                <ap-grid
                    :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                        <small>
                            EXACT ADDRESS
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <p class="ap-margin-remove"
                            v-if="!isLoading('show')">
                            <span class="ap-text-bold"
                                v-if="beneficiary.address">
                                {{beneficiary.address}}
                            </span>
                            <span class="ap-text-italic"
                                v-else>
                                NOT INDICATED
                            </span>
                        </p>
                        <ap-placeholder
                            v-else
                            :size="'small'"
                            :width="'120px'" />
                    </div>
                </ap-grid>

                <ap-grid
                    :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                        <small>
                            NEAREST LANDMARK
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <p class="ap-margin-remove"
                            v-if="!isLoading('show')">
                            <span class="ap-text-bold"
                                v-if="beneficiary.landmark">
                                {{beneficiary.landmark}}
                            </span>
                            <span class="ap-text-italic"
                                v-else>
                                NOT INDICATED
                            </span>
                        </p>
                        <ap-placeholder
                            v-else
                            :size="'small'"
                            :width="'120px'" />
                    </div>
                </ap-grid>

                <ap-grid
                    :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                        <small>
                            HOUSE OWNERSHIP
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <p class="ap-margin-remove"
                            v-if="!isLoading('show')">
                            <span class="ap-text-bold"
                                v-if="beneficiary.house_ownership">
                                {{beneficiary.house_ownership}}
                            </span>
                            <span class="ap-text-italic"
                                v-else>
                                NOT INDICATED
                            </span>
                        </p>
                        <ap-placeholder
                            v-else
                            :size="'small'"
                            :width="'120px'" />
                    </div>
                </ap-grid>

                <ap-grid
                    :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                        <small>
                            OWNERSHIP REMARKS
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <p class="ap-margin-remove"
                            v-if="!isLoading('show')">
                            <span class="ap-text-bold"
                                v-if="beneficiary.house_ownership_remarks">
                                {{beneficiary.house_ownership_remarks}}
                            </span>
                            <span class="ap-text-italic"
                                v-else>
                                NOT INDICATED
                            </span>
                        </p>
                        <ap-placeholder
                            v-else
                            :size="'small'"
                            :width="'120px'" />
                    </div>
                </ap-grid>

                <ap-grid
                    :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                        <small>
                            PLACE OF BIRTH:
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <p class="ap-margin-remove"
                            v-if="!isLoading('show')">
                            <span class="ap-text-bold"
                                v-if="beneficiary.place_of_birth">
                                {{beneficiary.place_of_birth}}
                            </span>
                            <span class="ap-text-italic"
                                v-else>
                                NOT INDICATED
                            </span>
                        </p>
                        <ap-placeholder
                            v-else
                            :size="'small'"
                            :width="'120px'" />
                    </div>
                </ap-grid>

                <ap-grid
                    :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                        <small>
                            MOBILE NO:
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <p class="ap-margin-remove"
                            v-if="!isLoading('show')">
                            <span class="ap-text-bold"
                                v-if="beneficiary.mobile_no">
                                {{beneficiary.mobile_no}}
                            </span>
                            <span class="ap-text-italic"
                                v-else>
                                NOT INDICATED
                            </span>
                        </p>
                        <ap-placeholder
                            v-else
                            :size="'small'"
                            :width="'120px'" />
                    </div>
                </ap-grid>

                <ap-grid
                    :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                        <small>
                            EMERGENCY (NAME)
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <p class="ap-margin-remove"
                            v-if="!isLoading('show')">
                            <span class="ap-text-bold"
                                v-if="beneficiary.emergency_contact_name">
                                {{beneficiary.emergency_contact_name}}
                            </span>
                            <span class="ap-text-italic"
                                v-else>
                                NOT INDICATED
                            </span>
                        </p>
                        <ap-placeholder
                            v-else
                            :size="'small'"
                            :width="'120px'" />
                    </div>
                </ap-grid>

                <ap-grid
                    :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                        <small>
                            EMERGENCY (CONTACT)
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <p class="ap-margin-remove"
                            v-if="!isLoading('show')">
                            <span class="ap-text-bold"
                                v-if="beneficiary.emergency_contact_no">
                                {{beneficiary.emergency_contact_no}}
                            </span>
                            <span class="ap-text-italic"
                                v-else>
                                NOT INDICATED
                            </span>
                        </p>
                        <ap-placeholder
                            v-else
                            :size="'small'"
                            :width="'120px'" />
                    </div>
                </ap-grid>

                <ap-grid
                    :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                        <small>
                            EMERGENCY (ADDRESS)
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <p class="ap-margin-remove"
                            v-if="!isLoading('show')">
                            <span class="ap-text-bold"
                                v-if="beneficiary.emergency_contact_address">
                                {{beneficiary.emergency_contact_address}}
                            </span>
                            <span class="ap-text-italic"
                                v-else>
                                NOT INDICATED
                            </span>
                        </p>
                        <ap-placeholder
                            v-else
                            :size="'small'"
                            :width="'120px'" />
                    </div>
                </ap-grid>

                <div class="ap-margin-medium-top">
                    <p class="ap-text-bold ap-text-primary ap-margin-medium-top">
                        EDUCATIONAL ATTAINMENT
                    </p>

                    <ap-grid
                        :gutter="'small'">
                        <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                            <small>
                                ELEMENTARY (PRIMARY)
                            </small>
                        </div>
                        <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                            <div v-if="!isLoading('show')">
                                <p v-if="beneficiary.primary_school"
                                    class="ap-text-bold">
                                    {{beneficiary.primary_school}} ({{beneficiary.primary_year_graduated}})
                                </p>
                                <p class="ap-text-italic"
                                    v-else>
                                    NOT INDICATED
                                </p>
                            </div>
                            <ap-placeholder
                                v-else
                                :size="'small'"
                                :width="'120px'" />
                        </div>
                    </ap-grid>

                    <ap-grid
                        :gutter="'small'">
                        <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                            <small>
                                HIGH SCHOOL (SECONDARY)
                            </small>
                        </div>
                        <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                            <div v-if="!isLoading('show')">
                                <p v-if="beneficiary.secondary_school"
                                    class="ap-text-bold">
                                    {{beneficiary.secondary_school}} ({{beneficiary.secondary_year_graduated}})
                                    <span v-if="beneficiary.secondary_course">
                                        <br />{{beneficiary.secondary_course}}
                                    </span>
                                </p>
                                <p class="ap-text-italic"
                                    v-else>
                                    NOT INDICATED
                                </p>
                            </div>
                            <ap-placeholder
                                v-else
                                :size="'small'"
                                :width="'120px'" />
                        </div>
                    </ap-grid>

                    <ap-grid
                        :gutter="'small'">
                        <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                            <small>
                                COLLEGE (TERTIARY)
                            </small>
                        </div>
                        <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                            <div v-if="!isLoading('show')">
                                <p v-if="beneficiary.tertiary_school"
                                    class="ap-text-bold">
                                    {{beneficiary.tertiary_school}} ({{beneficiary.tertiary_year_graduated}})
                                    <span v-if="beneficiary.tertiary_course">
                                        <br />{{beneficiary.tertiary_course}}
                                    </span>
                                </p>
                                <p class="ap-text-italic"
                                    v-else>
                                    NOT INDICATED
                                </p>
                            </div>
                            <ap-placeholder
                                v-else
                                :size="'small'"
                                :width="'120px'" />
                        </div>
                    </ap-grid>

                    <ap-grid
                        :gutter="'small'">
                        <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                            <small>
                                OTHERS
                            </small>
                        </div>
                        <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                            <div v-if="!isLoading('show')">
                                <p v-if="beneficiary.other_school"
                                    class="ap-text-bold">
                                    {{beneficiary.other_school}} ({{beneficiary.other_year_graduated}})
                                    <span v-if="beneficiary.other_course">
                                        <br />{{beneficiary.other_course}}
                                    </span>
                                </p>
                                <p class="ap-text-italic"
                                    v-else>
                                    NOT INDICATED
                                </p>
                            </div>
                            <ap-placeholder
                                v-else
                                :size="'small'"
                                :width="'120px'" />
                        </div>
                    </ap-grid>
                </div>
            </div>
            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <p class="ap-text-bold ap-text-primary">
                    OTHER INFORMATION
                </p>

                <ap-grid
                    :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                        <small>
                            CIVIL STATUS:
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <p class="ap-margin-remove"
                            v-if="!isLoading('show')">
                            <span class="ap-text-bold"
                                v-if="beneficiary.civil_status">
                                {{beneficiary.civil_status}}
                            </span>
                            <span class="ap-text-italic"
                                v-else>
                                NOT INDICATED
                            </span>
                        </p>
                        <ap-placeholder
                            v-else
                            :size="'small'"
                            :width="'120px'" />
                    </div>
                </ap-grid>

                <ap-grid
                    :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                        <small>
                            CITIZENSHIP:
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <p class="ap-margin-remove"
                            v-if="!isLoading('show')">
                            <span class="ap-text-bold"
                                v-if="beneficiary.citizenship">
                                {{beneficiary.citizenship}}
                            </span>
                            <span class="ap-text-italic"
                                v-else>
                                NOT INDICATED
                            </span>
                        </p>
                        <ap-placeholder
                            v-else
                            :size="'small'"
                            :width="'120px'" />
                    </div>
                </ap-grid>

                <ap-grid
                    :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                        <small>
                            RELIGION:
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <p class="ap-margin-remove"
                            v-if="!isLoading('show')">
                            <span class="ap-text-bold"
                                v-if="beneficiary.religion">
                                {{beneficiary.religion}}
                            </span>
                            <span class="ap-text-italic"
                                v-else>
                                NOT INDICATED
                            </span>
                        </p>
                        <ap-placeholder
                            v-else
                            :size="'small'"
                            :width="'120px'" />
                    </div>
                </ap-grid>

                <ap-grid
                    :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                        <small>
                            HEAD OF HOUSEHOLD:
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <p class="ap-text-bold ap-margin-remove"
                            v-if="!isLoading('show')">
                            {{ beneficiary.is_household ? 'YES':'NO'}}
                        </p>
                        <ap-placeholder
                            v-else
                            :size="'small'"
                            :width="'120px'" />
                    </div>
                </ap-grid>

                <ap-grid
                    :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                        <small>
                            HOUSEHOLD MEMBERS:
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <p class="ap-text-bold ap-margin-remove"
                            v-if="!isLoading('show')">
                            {{ beneficiary.household_count }} {{ beneficiary.household_count > 1 ? ' members':' member' }}
                        </p>
                        <ap-placeholder
                            v-else
                            :size="'small'"
                            :width="'120px'" />
                    </div>
                </ap-grid>

                <ap-grid
                    :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                        <small>
                            HOUSEHOLD VOTERS:
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <p class="ap-text-bold ap-margin-remove"
                            v-if="!isLoading('show')">
                            {{ beneficiary.household_voters_count }} {{ beneficiary.household_voters_count > 1 ? ' voters':' voter' }}
                        </p>
                        <ap-placeholder
                            v-else
                            :size="'small'"
                            :width="'120px'" />
                    </div>
                </ap-grid>

                <ap-grid
                    :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                        <small>
                            HOUSEHOLD FAMILIES:
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <p class="ap-text-bold ap-margin-remove"
                            v-if="!isLoading('show')">
                            {{ beneficiary.household_families_count }} {{ beneficiary.household_families_count > 1 ? ' families':' family' }}
                        </p>
                        <ap-placeholder
                            v-else
                            :size="'small'"
                            :width="'120px'" />
                    </div>
                </ap-grid>

                <ap-grid
                    :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                        <small>
                            EDUCATIONAL ATTAINMENT
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <p class="ap-margin-remove"
                            v-if="!isLoading('show')">
                            <span class="ap-text-bold"
                                v-if="beneficiary.educational_attainment">
                                {{beneficiary.educational_attainment}}
                            </span>
                            <span class="ap-text-italic"
                                v-else>
                                NOT INDICATED
                            </span>
                        </p>
                        <ap-placeholder
                            v-else
                            :size="'small'"
                            :width="'120px'" />
                    </div>
                </ap-grid>

                <ap-grid
                    :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                        <small>
                            OCCUPATION
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <p class="ap-margin-remove"
                            v-if="!isLoading('show')">
                            <span class="ap-text-bold"
                                v-if="beneficiary.occupation">
                                {{beneficiary.occupation}}
                            </span>
                            <span class="ap-text-italic"
                                v-else>
                                NOT INDICATED
                            </span>
                        </p>
                        <ap-placeholder
                            v-else
                            :size="'small'"
                            :width="'120px'" />
                    </div>
                </ap-grid>

                <ap-grid
                    :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                        <small>
                            MONTHLY INCOME
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <p class="ap-margin-remove"
                            v-if="!isLoading('show')">
                            <span class="ap-text-bold"
                                v-if="beneficiary.monthly_income">
                                {{beneficiary.monthly_income}}
                            </span>
                            <span class="ap-text-italic"
                                v-else>
                                NOT INDICATED
                            </span>
                        </p>
                        <ap-placeholder
                            v-else
                            :size="'small'"
                            :width="'120px'" />
                    </div>
                </ap-grid>

                <ap-grid
                    :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                        <small>
                            SOURCE OF INCOME
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <p class="ap-margin-remove"
                            v-if="!isLoading('show')">
                            <span class="ap-text-bold"
                                v-if="beneficiary.source_of_income">
                                {{beneficiary.source_of_income}}
                            </span>
                            <span class="ap-text-italic"
                                v-else>
                                NOT INDICATED
                            </span>
                        </p>
                        <ap-placeholder
                            v-else
                            :size="'small'"
                            :width="'120px'" />
                    </div>
                </ap-grid>

                <ap-grid
                    :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                        <small>
                            CLASSIFICATION
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <p class="ap-margin-remove"
                            v-if="!isLoading('show')">
                            <span class="ap-text-bold"
                                v-if="beneficiary.classification">
                                {{beneficiary.classification}}
                            </span>
                            <span class="ap-text-italic"
                                v-else>
                                NOT INDICATED
                            </span>
                        </p>
                        <ap-placeholder
                            v-else
                            :size="'small'"
                            :width="'120px'" />
                    </div>
                </ap-grid>

                <div class="ap-margin-medium-top">
                    <p class="ap-text-bold ap-text-primary">
                        MEDICAL CONCERNS & OTHER REMARKS
                    </p>

                    <div>
                        <small class="ap-text-bold ap-text-italic">
                            Problem Presented
                        </small>

                        <div v-if="!isLoading('show')">
                            <div v-html="beneficiary.problem_presented"
                                v-if="beneficiary.problem_presented"
                                style="white-space: pre-wrap;"
                                class="ap-margin-small-top">
                            </div>
                            <p v-else class="ap-margin-remove ap-text-italic">
                                Not indicated
                            </p>
                        </div>
                        <ap-placeholder
                            v-else
                            :size="'medium'" />
                        
                    </div>

                    <div class="ap-margin-top">
                        <small class="ap-text-bold ap-text-italic">
                            Findings
                        </small>
                        <div v-if="!isLoading('show')">
                            <div v-html="beneficiary.findings"
                                v-if="beneficiary.findings"
                                style="white-space: pre-wrap;"
                                class="ap-margin-small-top">
                            </div>
                            <p v-else class="ap-margin-remove ap-text-italic">
                                Not indicated
                            </p>
                        </div>
                        <ap-placeholder
                            v-else
                            :size="'medium'" />
                        
                    </div>

                    <div class="ap-margin-top">
                        <small class="ap-text-bold ap-text-italic">
                            Assessment & Recommendation
                        </small>
                        <div v-if="!isLoading('show')">
                            <div v-html="beneficiary.assessment_recommendation"
                                v-if="beneficiary.assessment_recommendation"
                                style="white-space: pre-wrap;"
                                class="ap-margin-small-top">
                            </div>
                            <p v-else class="ap-margin-remove ap-text-italic">
                                Not indicated
                            </p>
                        </div>
                        <ap-placeholder
                            v-else
                            :size="'medium'" />
                        
                    </div>

                    <div class="ap-margin-top">
                        <small class="ap-text-bold ap-text-italic">
                            Medicine/Other Needs
                        </small>

                        <div v-if="!isLoading('show')">
                            <div v-html="beneficiary.needs"
                                v-if="beneficiary.needs"
                                style="white-space: pre-wrap;"
                                class="ap-margin-small-top">
                            </div>
                            <p v-else class="ap-margin-remove ap-text-italic">
                                Not indicated
                            </p>
                        </div>
                        <ap-placeholder
                            v-else
                            :size="'medium'" />
                        
                    </div>

                    <div class="ap-margin-top">
                        <small class="ap-text-bold ap-text-italic">
                            Other Remarks
                        </small>

                        <div v-if="!isLoading('show')">
                            <div v-html="beneficiary.remarks"
                                v-if="beneficiary.remarks"
                                style="white-space: pre-wrap;"
                                class="ap-margin-small-top">
                            </div>
                            <p v-else class="ap-margin-remove ap-text-italic">
                                Not indicated
                            </p>
                        </div>
                        <ap-placeholder
                            v-else
                            :size="'medium'" />
                        
                    </div>
                </div>

            </div>
        </ap-grid>


        <div class="ap-margin-medium-top">

            <ap-grid :gutter="'small'">
            
                <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                    <p class="ap-text-bold ap-text-primary">
                        SURVEY QUESTIONS
                    </p>


                    <div v-if="!isLoading('show')">
                        <ul class="ap-list ap-list-divider">
                            <li v-for="(item, index) in beneficiary.questionnaires"
                                :key="index">
                                <p class="ap-margin-remove ap-text-bold ap-text-italic">
                                    {{ item.question }}
                                </p>

                                <div v-if="item.answer">
                                    <div v-html="`Answer: ${item.answer}`" style="white-space: pre-wrap;" class="ap-margin-xsmall-top"></div>
                                </div>
                                <p class="ap-text-italic ap-margin-remove"
                                    v-else>
                                    No answer
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div v-else
                        class="ap-margin-top">
                        <ap-placeholder
                            :size="'medium'" />
                        <ap-placeholder
                            class="ap-margin-xsmall-top"
                            :size="'medium'" />
                        <ap-placeholder
                            class="ap-margin-xsmall-top"
                            :size="'medium'" />
                        <ap-placeholder
                            class="ap-margin-xsmall-top"
                            :size="'medium'" />
                        <ap-placeholder
                            class="ap-margin-xsmall-top"
                            :size="'medium'" />
                    </div>
                </div>
            </ap-grid>
            
        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { Dater } from '@/utils';

export default
{

    computed:
    {
        ...mapGetters({
            beneficiary: 'companyBeneficiary/selected',
            isLoading: 'companyBeneficiary/isLoading',
        }),

        dateOfBirth()
        {
            return (Dater.format(this.beneficiary.date_of_birth)).toUpperCase();
        },
    },

    methods:
    {
        openModal(name)
        {
            this.$parent.toggleModal(name, true);
        },
    },
};
</script>