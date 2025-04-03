<template>
  <li>
    <div
      class="ap-card ap-card-body ap-padding-small ap-card-hover"
      :class="{ 'ap-box-shadow-small': showProfile }"
    >
      <ap-grid :gutter="'small'">
        <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
          <ap-grid :gutter="'small'">
            <div class="ap-width-fit-content">
              <ap-avatar
                :shape="'default'"
                :src="item.photo"
                :label="initials"
              />
            </div>
            <div class="ap-width-expand">
              <h5 class="ap-margin-remove ap-point" @click="toggle()">
                {{ fullName }}

                <a
                  class="ap-link-reset ap-point"
                  v-show="!item.is_officer"
                  @click="openModal('updateOfficer')"
                >
                  <span
                    class="ap-text-secondary ap-margin-xsmall-left"
                    style="font-size: 16px"
                    :data-tooltip="'Not an officer/leader'"
                  >
                    <i class="lni lni-user"></i>
                  </span>
                </a>

                <a
                  class="ap-link-reset ap-point"
                  v-show="item.is_officer"
                  @click="openModal('updateOfficer')"
                >
                  <span
                    class="badge badge-custom bg-success ap-margin-xsmall-left"
                    :data-tooltip="`Officer/Leader: ${item.officer_classification}`"
                  >
                    <i class="lni lni-user"></i>
                  </span>
                </a>

                <a
                  class="ap-link-reset ap-point"
                  v-show="!isMayap"
                  @click="openModal('updateVoter')"
                >
                  <span
                    class="badge badge-voter-type ap-margin-small-left"
                    :style="{ 'background-color': item.voter_type.color }"
                    :data-tooltip="`VOTER TYPE: ${item.voter_type.name}`"
                  >
                    {{ item.voter_type.short }}
                  </span>
                </a>

                <!-- For Mayap -->
                <a
                  class="ap-link-reset ap-point"
                  v-show="item.verify_voter === 1 || item.verify_voter === '1'"
                  @click="openModal('updateVoter')"
                >
                  <span
                    class="badge badge-not-verified-voter ap-margin-small-left"
                    style="background-color: #ed772e"
                    :data-tooltip="`VOTER TYPE: ${item.voter_type.name}`"
                  >
                    <i class="lni lni-flag"></i>
                  </span>
                </a>

                <a
                  class="ap-link-reset ap-point"
                  v-show="item.verify_voter === 2 || item.verify_voter === '2'"
                >
                  <span
                    class="badge badge-verified-voter ap-margin-small-left"
                    style="background-color: #17a00e"
                    :data-tooltip="`VOTER TYPE: ${item.voter_type.name}`"
                  >
                    <i class="lni lni-flag"></i>
                  </span>
                </a>
              </h5>

              <p class="ap-margin-remove">
                {{ codeItem(item.code, item.verify_voter, item.voter_details) }}
                &middot;
                {{ item.gender.name }}
                &middot;
                {{ age }} yrs old
              </p>

              <div class="ap-margin-top">
                <small class="ap-text-italic">
                  DATE OF REGISTRATION:
                  <span class="ap-text-bold">{{ dateRegistered }}</span>
                </small>
              </div>

              <div class="ap-margin-small-top" v-if="item.remarks">
                <small class="ap-text-italic">
                  OTHER REMARKS:
                  <span class="ap-text-bold">{{ trimmedRemarks }}</span>
                </small>
              </div>
            </div>
          </ap-grid>
        </div>
        <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
          <small class="ap-text-bold"> LATEST TRANSACTIONS: </small>

          <div class="ap-margin-small-top" v-if="item.last_message_date">
            <small class="ap-text-italic">
              MESSAGE: <span class="ap-text-bold">{{ lastMessageDate }}</span>
            </small>
          </div>
          <div class="ap-margin-small-top" v-if="item.last_call_date">
            <small class="ap-text-italic">
              CALL: <span class="ap-text-bold">{{ lastCallDate }}</span>
            </small>
          </div>

          <div
            class="ap-margin-small-top"
            v-if="!item.last_call_date && !item.last_message_date"
          >
            <small class="ap-text-italic"> No transaction yet </small>
          </div>
        </div>
        <div
          class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l ap-text-right@m"
        >
          <div>
            <span class="badge bg-secondary" :style="{ padding: '5px 5px' }">
              Issued SDN Card: {{ item.issued_ids }}
            </span>
          </div>
          <div>
            <span class="badge bg-secondary" :style="{ padding: '5px 5px' }">
              BRGY {{ item.barangay.name }} &middot; {{ item.city.name }}
            </span>
          </div>

          <a
            class="ap-link-reset"
            target="new"
            :href="`/company/beneficiaries/${slugCode}/network`"
          >
            <div
              class="badge ap-margin-top"
              :class="apCardBackground"
              :data-tooltip="`${item.networks_count} networks`"
            >
              <p
                class="ap-margin-remove ap-text-inverse"
                style="font-size: 14px"
              >
                <i class="lni lni-network ap-text-inverse"></i>
                {{ item.networks_count }} network
              </p>
            </div>
          </a>

          <div
            class="badge ap-margin-top"
            :class="apCardBackground"
            :data-tooltip="`${incentive} incentive points`"
          >
            <p class="ap-margin-remove ap-text-inverse" style="font-size: 14px">
              <i class="bx bx-award ap-text-inverse"></i>
              {{ incentive }} pts
            </p>
          </div>

          <div
            class="badge ap-margin-top"
            :class="apCardBackground"
            :data-tooltip="`${item.assistances_count} assistances`"
          >
            <p class="ap-margin-remove ap-text-inverse" style="font-size: 14px">
              <i class="bx bx-user-check ap-text-inverse"></i>
              {{ item.assistances_count }} assistance
            </p>
          </div>

          <div class="ap-margin-top">
            <small class="ap-text-italic">
              Created <ap-moment :datetime="item.created_at" />
            </small>
          </div>
        </div>
      </ap-grid>

      <div
        class="ap-margin-top ap-padding-small"
        style="background: #f6f6f6"
        v-if="showProfile"
      >
        <profile-component />
      </div>

      <ap-grid :gutter="'small'" class="ap-margin-top ap-margin-bottom">
        <div class="ap-width-expand@m">
          <ap-button
            class="dropdown-toggle ap-margin-small-left"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            :color="'primary'"
            :size="'small'"
            :outline="true"
            :rounded="true"
          >
            GENERATE DOCUMENT/ID
          </ap-button>
          <ul class="dropdown-menu" style="padding-left: 0px">
            <li>
              <router-link
                :to="`/company/beneficiaries/${this.item.slug.code}/document/create`"
                class="dropdown-item"
              >
                DOCUMENT
              </router-link>
            </li>
            <li>
              <a
                class="dropdown-item ap-link-reset ap-point"
                @click="openModal('generateID')"
                >ID</a
              >
            </li>
          </ul>

          <ap-button
            class="dropdown-toggle ap-margin-small-left"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            :color="'primary'"
            :size="'small'"
            :outline="true"
            :rounded="true"
          >
            CALL / SMS SERVICE
          </ap-button>
          <ul class="dropdown-menu" style="padding-left: 0px">
            <li>
              <a
                class="dropdown-item ap-link-reset ap-point"
                @click="openCall()"
                >CALL</a
              >
            </li>
            <li>
              <a
                class="dropdown-item ap-link-reset ap-point"
                @click="openModal('sendBrandingMessage')"
                >SMS ({{ smsSetting.sender_name }})</a
              >
            </li>
            <li>
              <a
                class="dropdown-item"
                href="#"
                @click="openModal('sendRegularMessage')"
                >SMS (REGULAR)</a
              >
            </li>
          </ul>
        </div>
        <div class="ap-text-right@m">
          <router-link
            :to="`/company/beneficiaries/${slugCode}`"
            class="ap-button ap-button-small ap-button-outline-primary ap-button-full-rounded"
          >
            VIEW FULL INFO
          </router-link>
          <router-link
            :to="`/company/beneficiaries/${slugCode}/edit`"
            class="ap-button ap-button-small ap-button-outline-warning ap-button-full-rounded"
          >
            EDIT
          </router-link>
          <ap-button
            :color="'danger'"
            :size="'small'"
            :outline="true"
            :rounded="true"
            @click="openModal('delete')"
          >
            DELETE
          </ap-button>
        </div>
      </ap-grid>
    </div>
  </li>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Http from "@/services";

import { Dater, Text } from "@/utils";

import ProfileComponent from "./content/profile";

export default {
  components: {
    ProfileComponent,
  },

  props: {
    item: Object,
  },

  data() {
    return {
      showProfile: false,

      profile: {},
      profileLoading: false,
    };
  },

  computed: {
    ...mapGetters({
      beneficiary: "companyBeneficiary/selected",
      accessUser: "auth/accessUser",
    }),

    company() {
      return this.accessUser.company;
    },

    isMayap() {
      return this.company.province_id == "0369";
    },

    smsSetting() {
      return this.company.sms_setting;
    },

    initials() {
      return `${this.item.first_name[0]}${this.item.last_name[0]}`;
    },

    fullName() {
      return `${this.item.full_name}`;
    },

    age() {
      return Dater.age(this.item.date_of_birth);
    },

    dateRegistered() {
      return Dater.format(this.item.date_registered);
    },

    incentive() {
      return parseInt(this.item.incentive);
    },

    trimmedRemarks() {
      return this.item.remarks.length > 50
        ? `${this.item.remarks.substr(0, 50)}...`
        : this.item.remarks;
    },

    slugCode() {
      return this.item.slug ? this.item.slug.code : "DELETED";
    },

    hasProfile() {
      return Object.keys(this.profile).length > 0;
    },

    lastMessageDate() {
      return Dater.format(this.item.last_message_date);
    },

    lastCallDate() {
      return Dater.format(this.item.last_call_date);
    },

    apCardBackground() {
      if (this.company.province_id == "0314") return "ap-card-orange";

      return "bg-primary";
    },
  },

  methods: {
    ...mapActions({
      select: "companyBeneficiary/select",
    }),

    async load() {
      if (!this.hasProfile) {
        this.profileLoading = true;

        const response = await Http.get(
          `/my-company/beneficiary/${this.beneficiary.slug.code}/profile`
        );

        this.profileLoading = false;

        if (response.status == 200) {
          this.profile = response.data;
        }
      }
    },

    codeItem(code, status, voterDetails){

      if(status === 2 && voterDetails){

        const split = code.split('-');
        const lastNum = split[split.length - 1];

        return `${split[0]}-${split[1]}-${voterDetails.precinct_no}-${lastNum}`;
      }
        
      
      return code;
    },

    toggle() {
      this.select(this.item);

      this.showProfile = !this.showProfile;
    },

    openCall() {
      if (
        this.beneficiary.mobile_no.length != 11 ||
        this.beneficiary.mobile_no[0] != "0" ||
        this.beneficiary.mobile_no[1] != "9"
      ) {
        return Toast.error({
          message: "Mobile number is invalid format.",
        });
      }

      let url = `${process.env.APP_URL}/feature/call?ctx`;
      url += `&source=beneficiary`;
      url += `&mobileNo=${this.beneficiary.mobile_no}`;
      url += `&name=${this.fullName}`;
      url += `&photo=${this.beneficiary.photo}`;
      url += `&beneficiaryCode=${this.beneficiary.slug.code}`;

      window
        .open(
          url,
          "_blank",
          "location=yes,height=570,width=520,scrollbars=yes,status=yes"
        )
        .focus();
    },

    openModal(name) {
      this.select(this.item);

      this.$parent.toggleModal(name, true);
    },
  },
};
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

.badge-not-verified-voter {
  background-color: #ed772e;
}

.badge-verified-voter {
  background-color: #17a00e;
}
</style>
