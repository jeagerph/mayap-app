<template>
  <div class="card card-body ap-padding">
    <div class="ap-text-center">
      <ap-avatar
        v-if="!isLoading('show')"
        :shape="'default'"
        :size="'xxlarge'"
        :src="voter.photo"
        :label="initials"
      />
      <ap-placeholder
        v-else
        :type="'image'"
        :width="'160px'"
        :height="'160px'"
      />
      <h4 class="ap-margin-small-top" v-if="!isLoading('show')">
        {{ fullName }}
      </h4>
      <ap-placeholder :size="'medium'" v-else />

      <p
        class="ap-margin-xsmall-top ap-margin-xsmall-bottom"
        v-if="!isLoading('show')"
      >
        {{ voter.code }}
        &middot;
        {{ voter.gender.name }}
        &middot;
        <span v-if="voter.date_of_birth == null">NOT INDICATED</span>
        <span v-else>{{ age }} yrs old</span>
      </p>
      <ap-placeholder :size="'small'" v-else />

      <div v-if="!isLoading('show')">
        <span
          class="badge bg-secondary"
          :style="{ padding: '5px 5px' }"
          v-if="voter.province"
        >
          BRGY {{ voter.barangay.name }} &middot; {{ voter.city.name }}
        </span>
      </div>

      <hr />

      <!-- <div class="ap-margin-top"
                v-if="!isLoading('show')">
                
                <router-link
                    :to="`/company/voters/${slugCode}/edit`"
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
            </div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { Dater } from "@/utils";

export default {
  computed: {
    ...mapGetters({
      voter: "companyVoter/selected",
      isLoading: "companyVoter/isLoading",
      accessUser: "auth/accessUser",
    }),

    company() {
      return this.accessUser.company;
    },

    fullName() {
      return `${this.voter.full_name}`;
    },

    age() {
      return Dater.age(this.voter.date_of_birth);
    },

    dateRegistered() {
      return Dater.format(this.voter.date_registered);
    },

    initials() {
      return `${this.voter.first_name[0]}${this.voter.last_name[0]}`;
    },

    slugCode() {
      return this.voter.slug ? this.voter.slug.code : "DELETED";
    },

    apCardBackground() {
      if (this.company.province_id == "0314") return "ap-card-orange";

      return "bg-primary";
    },
  },

  methods: {
    openModal(name) {
      this.$parent.toggleModal(name, true);
    },
  },
};
</script>
