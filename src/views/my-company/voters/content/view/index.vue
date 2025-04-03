<template>
  <div class="ap-animate ap-animate-fade-in">
    <ap-grid :gutter="'small'">
      <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
        <profile-component />
      </div>

      <div class="ap-width-1-1@s ap-width-2-3@m ap-width-2-3@l">
        <div class="ap-subnav-wrapper">
          <ul class="ap-subnav ap-subnav-default ap-subnav-horizontal-scroll">
            <li :class="{ 'ap-active': activeTab === 'information' }">
              <a
                class="ap-point"
                :class="{ 'ap-text-bold': activeTab === 'information' }"
                @click="switchTab('information')"
              >
                <i class="lni lni-user ap-margin-small-right"></i> PERSONAL INFO
              </a>
            </li>

            <li :class="{ 'ap-active': activeTab === 'activities' }">
              <a
                class="ap-point"
                :class="{ 'ap-text-bold': activeTab === 'activities' }"
                @click="switchTab('activities')"
              >
                <i class="lni lni-bolt ap-margin-small-right"></i> ACTIVITIES
              </a>
            </li>
          </ul>
        </div>

        <div class="card card-body">
          <ul class="ap-switcher">
            <li :class="{ 'ap-active': activeTab === 'information' }">
              <information-component v-if="activeTab == 'information'" />
            </li>

            <li :class="{ 'ap-active': activeTab === 'activities' }">
              <activities-component v-if="activeTab == 'activities'" />
            </li>
          </ul>
        </div>
      </div>
    </ap-grid>

    <!-- <delete-modal v-if="hasVoter" /> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import ProfileComponent from "./content/profile";
import InformationComponent from "./content/information";
import ActivitiesComponent from "./content/activities";

export default {
  name: "ViewComponent",

  components: {
    ProfileComponent,
    InformationComponent,
    ActivitiesComponent,
  },

  data() {
    return {
      activeTab: "information",

      deleteModal: false,
    };
  },

  created() {
    window.scrollTo(0, 0);

    this.load();
  },

  computed: {
    ...mapGetters({
      voter: "companyVoter/selected",
      isLoading: "companyVoter/isLoading",
    }),

    hasVoter() {
      return Object.keys(this.voter).length > 0;
    },
  },

  methods: {
    ...mapActions({
      show: "companyVoter/show",
      loadPrerequisite: "companyVoter/loadPrerequisite",
    }),

    async load() {
      await this.show(`/my-company/voter/${this.$route.params.code}`);
    },

    switchTab(tab) {
      this.activeTab = tab;
    },

    toggleModal(name, bool) {
      this[`${name}Modal`] = bool;
    },
  },
};
</script>
