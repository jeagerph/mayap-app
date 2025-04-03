<template>
  <li>
    <div
      class="ap-card ap-card-body ap-padding-small ap-card-hover"
      :class="{ 'ap-box-shadow-small': showProfile }"
    >
      <ap-grid :gutter="'small'">
        <div class="ap-width-fit-content">
          <ap-avatar :shape="'default'" :src="item.photo" :label="initials" />
        </div>
        <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
          <h5 class="ap-margin-remove ap-point" @click="toggle()">
            {{ fullName }}
            <a
              class="ap-link-reset ap-point"
              v-show="item.beneficiary === null || item.beneficiary == null"
            >
              <span
                class="badge badge-not-verified-voter ap-margin-small-left"
                style="background-color: #ed772e"
                :data-tooltip="`Not linked with beneficiary yet.`"
              >
                <i class="lni lni-flag"></i>
              </span>
            </a>

            <a
              class="ap-link-reset ap-point"
              :href="`/company/beneficiaries/${beneficiarySlugCode}`"
              v-show="item.beneficiary !== null || item.beneficiary != null"
              target="_blank"
            >
              <span
                class="badge badge-verified-voter ap-margin-small-left"
                style="background-color: #17a00e"
                :data-tooltip="`Linked with beneficiary.`"
              >
                <i class="lni lni-flag"></i>
              </span>
            </a>
          </h5>

          <p class="ap-margin-remove">
            {{ codeItem(item, item.precinct_no) }}
            &middot;
            {{ item.gender.name }}
            &middot;
            <span v-if="item.date_of_birth == null">NOT INDICATED</span>
            <span v-else>{{ age }} yrs old</span>
          </p>

          <div class="ap-margin-small-top" v-if="item.remarks">
            <small class="ap-text-italic">
              OTHER REMARKS:
              <span class="ap-text-bold">{{ trimmedRemarks }}</span>
            </small>
          </div>
        </div>
        <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
          <div v-if="item.province">
            <span class="badge bg-secondary" :style="{ padding: '5px 5px' }">
              BRGY {{ item.barangay.name }} &middot; {{ item.city.name }}
            </span>
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
        <div class="ap-width-expand@m"></div>
        <div class="ap-text-right@m">
          <ap-button
            v-if="item.beneficiary != null"
            @click="openModal('updatePhoto')"
            class="ap-button ap-button-small ap-button-outline-primary ap-button-full-rounded"
            >EDIT PHOTO</ap-button
          >
          <router-link
            :to="`/company/voters/${slugCode}`"
            class="ap-button ap-button-small ap-button-outline-primary ap-button-full-rounded"
          >
            VIEW FULL INFO
          </router-link>
          <!-- <router-link
                        :to="`/company/voters/${slugCode}/edit`"
                        class="ap-button ap-button-small ap-button-outline-warning ap-button-full-rounded">
                        EDIT
                    </router-link> -->
          <!-- <ap-button
            :color="'danger'"
            :size="'small'"
            :outline="true"
            :rounded="true"
            @click="openModal('delete')"
          >
            DELETE
          </ap-button> -->
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
      beneficiary: "companyVoter/selected",
      accessUser: "auth/accessUser",
    }),

    company() {
      return this.accessUser.company;
    },

    fullName() {
      return `${this.item.full_name}`;
    },

    initials() {
      return `${this.item.first_name[0]}${this.item.last_name[0]}`;
    },

    age() {
      return Dater.age(this.item.date_of_birth);
    },

    dateRegistered() {
      return Dater.format(this.item.date_registered);
    },

    trimmedRemarks() {
      return this.item.remarks.length > 50
        ? `${this.item.remarks.substr(0, 50)}...`
        : this.item.remarks;
    },

    slugCode() {
      return this.item.slug ? this.item.slug.code : "DELETED";
    },

    beneficiarySlugCode() {
      return this.item.beneficiary
        ? this.item.beneficiary.slug.code
        : "DELETED";
    },

    hasProfile() {
      return Object.keys(this.profile).length > 0;
    },

    apCardBackground() {
      if (this.company.province_id == "0314") return "ap-card-orange";

      return "bg-primary";
    },
  },

  methods: {
    ...mapActions({
      select: "companyVoter/select",
    }),
    codeItem(item, precinct_no){
      
      

      if(item.beneficiary && precinct_no){

        const split = item.beneficiary.code.split('-');
        const lastNum = split[split.length - 1];

        return `${split[0]}-${split[1]}-${precinct_no}-${lastNum}`;
      }
        
      
      return item.code;
    },
    async load() {
      if (!this.hasProfile) {
        this.profileLoading = true;

        const response = await Http.get(
          `/my-company/voter/${this.voter.slug.code}/profile`
        );

        this.profileLoading = false;

        if (response.status == 200) {
          this.profile = response.data;
        }
      }
    },

    toggle() {
      this.select(this.item);

      this.showProfile = !this.showProfile;
    },

    openModal(name) {
      this.select(this.item);
      this.$parent.toggleModal(name, true);
    },
  },
};
</script>
