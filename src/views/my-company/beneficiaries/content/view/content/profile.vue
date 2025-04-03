<template>
    <div class="card card-body ap-padding">

        <div class="ap-text-center">

            <ap-avatar
                v-if="!isLoading('show')"
                :shape="'default'"
                :size="'xxlarge'"
                :src="beneficiary.photo"
                :label="initials" />
            <ap-placeholder
                v-else
                :type="'image'"
                :width="'160px'"
                :height="'160px'" />

            <h4 class="ap-margin-small-top"
                v-if="!isLoading('show')">
                {{fullName}}
                <a class="ap-link-reset ap-point"
                    v-show="!beneficiary.is_officer"
                    @click="openModal('updateOfficer')">
                    <span class="ap-text-secondary ap-margin-xsmall-left"
                        style="font-size: 16px;"
                        :data-tooltip="'Not an officer/leader'">
                        <i class="lni lni-user"></i>
                    </span>
                </a>
                
                <a class="ap-link-reset ap-point"
                    v-show="beneficiary.is_officer"
                    @click="openModal('updateOfficer')">
                    <span class="badge badge-custom bg-success ap-margin-xsmall-left"
                        :data-tooltip="`Officer/Leader: ${beneficiary.officer_classification}`">
                        <i class="lni lni-user"></i>
                    </span>
                </a>

                <a class="ap-link-reset ap-point"
                    v-show="!isMayap"
                    @click="openModal('updateVoter')">
                    <span class="badge badge-voter-type ap-margin-small-left"
                        :style="{ 'background-color': beneficiary.voter_type.color }"
                        :data-tooltip="`VOTER TYPE: ${beneficiary.voter_type.name}`">
                        {{ beneficiary.voter_type.short }}
                    </span>
                </a>
            
            </h4>
            <ap-placeholder
                :size="'medium'"
                v-else />

             <p class="ap-margin-xsmall-top ap-margin-xsmall-bottom"
                v-if="!isLoading('show')">
                {{ beneficiary.code }}
                &middot;
                {{beneficiary.gender.name}}
                &middot;
                {{age}} yrs old
            </p>
            <ap-placeholder
                :size="'small'"
                v-else />


            <div v-if="!isLoading('show')">
                <span class="badge bg-secondary" :style="{ padding: '5px 5px'}">
                    BRGY {{beneficiary.barangay.name}} &middot; {{beneficiary.city.name}}
                </span>
            </div>

            <a class="ap-link-reset"
                v-if="!isLoading('show')"
                target="new"
                :href="`/company/beneficiaries/${slugCode}/network`">
                <div class="badge ap-margin-top ap-padding-small"
                :class="apCardBackground"
                    :data-tooltip="`${beneficiary.networks_count} network`">

                    <ap-grid :gutter="'small'">
                        <div class="ap-width-fit-content">
                            <i class="lni lni-network" style="font-size: 26px;"></i>
                        </div>
                        <div class="ap-width-expand">
                            <p class="ap-margin-remove ap-text-right">
                                NETWORK
                            </p>
                            <p class="ap-margin-xsmall-top ap-margin-remove-bottom ap-text-inverse" style="font-size: 14px;">
                                {{ beneficiary.networks_count }}
                            </p>
                        </div>
                    </ap-grid>
                    
                </div>
            </a>

            <div class="badge ap-margin-top ap-padding-small"
                v-if="!isLoading('show')"
                :class="apCardBackground"
                :data-tooltip="`${beneficiary.incentive} incentive points`">

                <ap-grid :gutter="'small'">
                    <div class="ap-width-fit-content">
                        <i class="bx bx-award" style="font-size: 26px;"></i>
                    </div>
                    <div class="ap-width-expand">
                        <p class="ap-margin-remove ap-text-right">
                            INCENTIVE
                        </p>
                        <p class="ap-margin-xsmall-top ap-margin-remove-bottom ap-text-inverse" style="font-size: 14px;">
                            {{ incentive }} pts
                        </p>
                    </div>
                </ap-grid>
                
            </div>

            <div class="badge ap-margin-top ap-padding-small"
                v-if="!isLoading('show')"
                :class="apCardBackground"
                :data-tooltip="`${beneficiary.assistances_count} assistance`">

                <ap-grid :gutter="'small'">
                    <div class="ap-width-fit-content">
                        <i class="bx bx-user-check" style="font-size: 26px;"></i>
                    </div>
                    <div class="ap-width-expand">
                        <p class="ap-margin-remove ap-text-right">
                            ASSISTANCE
                        </p>
                        <p class="ap-margin-xsmall-top ap-margin-remove-bottom ap-text-inverse" style="font-size: 14px;">
                            {{ beneficiary.assistances_count }}
                        </p>
                    </div>
                </ap-grid>
                
            </div>
            
            <hr>

            <div class="ap-margin-top"
                v-if="!isLoading('show')">
                <ap-button
                    :color="'warning'"
                    :size="'small'"
                    :rounded="true"
                    :outline="true"
                    @click="openModal('updatePhoto')">
                    CHANGE PHOTO
                </ap-button>

                <span class="ap-margin-xsmall-left ap-margin-xsmall-right">
                    |
                </span>
                
                <router-link
                    :to="`/company/beneficiaries/${slugCode}/edit`"
                    class="ap-button ap-button-small ap-button-outline-warning ap-button-full-rounded">
                    EDIT
                </router-link>
                <ap-button
                    :color="'danger'"
                    :size="'small'"
                    :rounded="true"
                    :outline="true"
                    @click="openModal('delete')">
                    DELETE
                </ap-button>
            </div>

            <hr>

            <div class="ap-margin-top"
                v-if="!isLoading('show')">
                <ap-button
                    class="dropdown-toggle ap-margin-small-left"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    :color="'primary'"
                    :size="'small'"
                    :outline="true"
                    :rounded="true">
                    GENERATE DOCUMENT/ID
                </ap-button>
                <ul class="dropdown-menu" style="padding-left: 0px;">
                    <li>
                        <router-link
                            :to="`/company/beneficiaries/${this.$route.params.code}/document/create`"
                            class="dropdown-item">
                            DOCUMENT
                        </router-link>
                        <!-- <a class="dropdown-item" href="#" @click="openModal('createDocument')">DOCUMENT</a> -->
                    </li>
                    <li><a class="dropdown-item" href="#" @click="openModal('generateID')">ID</a></li>
                </ul>

                <ap-button
                    class="dropdown-toggle ap-margin-small-left"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    :color="'primary'"
                    :size="'small'"
                    :outline="true"
                    :rounded="true">
                    CALL / SMS SERVICE
                </ap-button>
                <ul class="dropdown-menu" style="padding-left: 0px;">
                    <li><a class="dropdown-item" href="#" @click="openCall()">CALL</a></li>
                    <li><a class="dropdown-item" href="#" @click="openModal('sendBrandingMessage')">SMS ({{ smsSetting.sender_name }})</a></li>
                    <li><a class="dropdown-item" href="#" @click="openModal('sendRegularMessage')">SMS (REGULAR)</a></li>
                </ul>

                <!-- <span class="ap-margin-xsmall-left ap-margin-xsmall-right">
                    |
                </span>

                <ap-button
                    :color="'danger'"
                    :size="'small'"
                    :rounded="true"
                    :outline="true">
                    BLOCK
                </ap-button> -->
            </div>

            <hr>

            <div class="ap-margin-top"
                v-if="!isLoading('show')">
                <router-link
                    :to="`/company/beneficiaries/${slugCode}/network`"
                    class="ap-button ap-button-small ap-button-outline-primary ap-button-full-rounded">
                    VIEW NETWORK ({{ beneficiary.networks_count }})
                </router-link>
            </div>
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
            accessUser: 'auth/accessUser',
        }),

        company()
        {
            return this.accessUser.company;
        },

        isMayap()
        {
            return this.company.province_id == '0369';
        },

        smsSetting()
        {
            return this.company.sms_setting;
        },

        fullName()
        {
            return `${this.beneficiary.last_name}, ${this.beneficiary.first_name} ${this.beneficiary.middle_name?this.beneficiary.middle_name:''}`;
        },

        initials()
        {
            return `${this.beneficiary.first_name[0]}${this.beneficiary.last_name[0]}`;
        },

        age()
        {
            return Dater.age(this.beneficiary.date_of_birth);
        },

        dateRegistered()
        {
            return Dater.format(this.beneficiary.date_registered);
        },

        incentive()
        {
            return parseInt(this.beneficiary.incentive);
        },

        slugCode()
        {
            return this.beneficiary.slug
                ? this.beneficiary.slug.code
                : 'DELETED'
        },

        apCardBackground()
        {
            if (this.company.province_id == '0314') return 'ap-card-orange';

            return 'bg-primary';
        },
    },

    methods:
    {
        openCall()
        {
            if (
                this.beneficiary.mobile_no.length != 11 ||
                this.beneficiary.mobile_no[0] != '0' ||
                this.beneficiary.mobile_no[1] != '9'
            )
            {
                return Toast.error({
                    message: 'Mobile number is invalid format.'
                })
            }

            let url = `${process.env.APP_URL}/feature/call?ctx`;
                url += `&source=beneficiary`;
                url += `&mobileNo=${this.beneficiary.mobile_no}`;
                url += `&name=${this.fullName}`;
                url += `&photo=${this.beneficiary.photo}`;
                url += `&beneficiaryCode=${this.beneficiary.slug.code}`;


            window.open(url, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes').focus();
        },

        openModal(name)
        {
            this.$parent.toggleModal(name, true);
        },
    },
}
</script>


<style scoped>
    .badge-custom {
        font-size: 14px;
        border-radius: 14px !important;
        padding: 5px 5px !important;
    }

    .badge-voter-type {
        font-size: 12px;
        border-radius: 12px !important;
        padding: 8px 8px !important;
    }

    .badge-voter-type-OTH {
        background-color: #6c757d;
    }

    .badge-voter-type-CV {
        background-color: #17a00e;
    }

    .badge-voter-type-SV {
        background-color: #ff8f07;
    }

    .badge-voter-type-SW {
        background-color: #fffb22df;
    }

    .badge-voter-type-BL {
        background-color: #f41127;
    }
</style>
