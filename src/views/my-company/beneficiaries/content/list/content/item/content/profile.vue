<template>
    <div class="ap-margin-top">

        <ap-grid :gutter="'small'">
            <div>
                <ap-avatar
                    v-if="!profileLoading"
                    :shape="'default'"
                    :size="'xxlarge'"
                    :src="profile.photo"
                    :label="initials" />
                <ap-placeholder
                    v-else
                    :type="'image'"
                    :width="'160px'"
                    :height="'160px'" />
            </div>
            <div class="ap-width-expand@m">

                <ap-grid :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                        <p class="ap-text-bold ap-text-primary">
                            PERSONAL INFORMATION
                        </p>

                        <ap-grid
                            :gutter="'small'">
                            <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                                <small>
                                    FIRST NAME:
                                </small>
                            </div>
                            <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                                <p class="ap-text-bold ap-margin-remove"
                                    v-if="!profileLoading">
                                    {{profile.first_name}}
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
                                    v-if="!profileLoading">
                                    {{profile.middle_name}}
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
                                    v-if="!profileLoading">
                                    {{profile.last_name}}
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
                                    v-if="!profileLoading">
                                    <span class="ap-text-bold"
                                        v-if="profile.gender">
                                        {{profile.gender.name}}
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
                                    v-if="!profileLoading">
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
                                    v-if="!profileLoading">
                                    <span class="ap-text-bold"
                                        v-if="profile.address">
                                        {{profile.address}}
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
                                    v-if="!profileLoading">
                                    <span class="ap-text-bold"
                                        v-if="profile.place_of_birth">
                                        {{profile.place_of_birth}}
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
                                    v-if="!profileLoading">
                                    <span class="ap-text-bold"
                                        v-if="profile.contact_no">
                                        {{profile.contact_no}}
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
                                    v-if="!profileLoading">
                                    <span class="ap-text-bold"
                                        v-if="profile.emergency_contact_name">
                                        {{profile.emergency_contact_name}}
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
                                    v-if="!profileLoading">
                                    <span class="ap-text-bold"
                                        v-if="profile.emergency_contact_no">
                                        {{profile.emergency_contact_no}}
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
                                    v-if="!profileLoading">
                                    <span class="ap-text-bold"
                                        v-if="profile.emergency_contact_address">
                                        {{profile.emergency_contact_address}}
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
                                    v-if="!profileLoading">
                                    <span class="ap-text-bold"
                                        v-if="profile.civil_status">
                                        {{profile.civil_status}}
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
                                    v-if="!profileLoading">
                                    <span class="ap-text-bold"
                                        v-if="profile.citizenship">
                                        {{profile.citizenship}}
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
                                    v-if="!profileLoading">
                                    <span class="ap-text-bold"
                                        v-if="profile.religion">
                                        {{profile.religion}}
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
                                <p class="ap-margin-remove"
                                    v-if="!profileLoading">
                                    <span class="ap-text-bold">
                                        {{ profile.is_household ? 'YES':'NO'}}
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
                                    EDUCATIONAL ATTAINMENT
                                </small>
                            </div>
                            <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                                <p class="ap-margin-remove"
                                    v-if="!profileLoading">
                                    <span class="ap-text-bold"
                                        v-if="profile.educational_attainment">
                                        {{profile.educational_attainment}}
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
                                    v-if="!profileLoading">
                                    <span class="ap-text-bold"
                                        v-if="profile.occupation">
                                        {{profile.occupation}}
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
                                    v-if="!profileLoading">
                                    <span class="ap-text-bold"
                                        v-if="profile.monthly_income">
                                        {{profile.monthly_income}}
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
                                    v-if="!profileLoading">
                                    <span class="ap-text-bold"
                                        v-if="profile.source_of_income">
                                        {{profile.source_of_income}}
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
                                    v-if="!profileLoading">
                                    <span class="ap-text-bold"
                                        v-if="profile.classification">
                                        {{profile.classification}}
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

                    </div>
                </ap-grid>
            </div>
        </ap-grid>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Http from '@/services';

import { Dater } from '@/utils';

export default
{
    data()
    {
        return {
            profile: {},
            profileLoading: false,
        };
    },

    created()
    {
        this.load();
    },

    computed:
    {
        ...mapGetters({
            beneficiary: 'companyBeneficiary/selected'
        }),

        initials()
        {
            return `${this.profile.first_name[0]}${this.profile.last_name[0]}`;
        },

        dateOfBirth()
        {
            return Dater.format(this.profile.date_of_birth);
        },

        hasProfile()
        {
            return Object.keys(this.profile).length > 0;
        },
    },

    methods:
    {
        async load()
        {
            if (!this.hasProfile)
            {
                this.profileLoading = true;

                const response = await Http.get(`/my-company/beneficiary/${this.beneficiary.slug.code}/profile`);

                this.profileLoading = false;

                if (response.status == 200)
                {
                    this.profile = response.data;
                }
            }
        },
    },

};
</script>
