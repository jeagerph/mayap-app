<template>
  <div class="ap-margin-top">
    <ap-grid :gutter="'small'">
      <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
        <p class="ap-text-bold ap-text-primary">PERSONAL INFORMATION</p>

        <ap-grid :gutter="'small'">
          <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
            <small> FIRST NAME: </small>
          </div>
          <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
            <p class="ap-text-bold ap-margin-remove" v-if="!profileLoading">
              {{ profile.first_name }}
            </p>
            <ap-placeholder v-else :size="'small'" :width="'120px'" />
          </div>
        </ap-grid>

        <ap-grid :gutter="'small'">
          <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
            <small> MIDDLE NAME: </small>
          </div>
          <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
            <p class="ap-text-bold ap-margin-remove" v-if="!profileLoading">
              {{ profile.middle_name }}
            </p>
            <ap-placeholder v-else :size="'small'" :width="'120px'" />
          </div>
        </ap-grid>

        <ap-grid :gutter="'small'">
          <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
            <small> LAST NAME: </small>
          </div>
          <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
            <p class="ap-text-bold ap-margin-remove" v-if="!profileLoading">
              {{ profile.last_name }}
            </p>
            <ap-placeholder v-else :size="'small'" :width="'120px'" />
          </div>
        </ap-grid>

        <ap-grid :gutter="'small'">
          <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
            <small> GENDER: </small>
          </div>
          <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
            <p class="ap-margin-remove" v-if="!profileLoading">
              <span class="ap-text-bold" v-if="profile.gender">
                {{ profile.gender.name }}
              </span>
              <span class="ap-text-italic" v-else> NOT INDICATED </span>
            </p>
            <ap-placeholder v-else :size="'small'" :width="'120px'" />
          </div>
        </ap-grid>

        <ap-grid :gutter="'small'">
          <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
            <small> DATE OF BIRTH: </small>
          </div>
          <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
            <p
              class="ap-text-bold ap-margin-remove"
              v-if="!profileLoading && profile.date_of_birth == null"
            >
              NOT INDICATED
            </p>
            <p class="ap-text-bold ap-margin-remove" v-if="!profileLoading && profile.date_of_birth != null">
              {{ dateOfBirth }}
            </p>
            <ap-placeholder v-else-if="profileLoading" :size="'small'" :width="'120px'" />
          </div>
        </ap-grid>

        <ap-grid :gutter="'small'">
          <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
            <small> EXACT ADDRESS </small>
          </div>
          <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
            <p class="ap-margin-remove" v-if="!profileLoading">
              <span class="ap-text-bold" v-if="profile.province">
                {{ profile.barangay ? `${profile.barangay.name}, ` : "" }}
                {{ profile.city ? `${profile.city.name}, ` : "" }}
                {{ profile.province ? profile.province.name : "" }}
              </span>
              <span class="ap-text-italic" v-else> NOT INDICATED </span>
            </p>
            <ap-placeholder v-else :size="'small'" :width="'120px'" />
          </div>
        </ap-grid>
      </div>
      <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
        <p class="ap-text-bold ap-text-primary">VOTER REGISTRATION</p>

        <ap-grid :gutter="'small'">
          <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
            <small> PRECINCT NO. </small>
          </div>
          <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
            <p class="ap-margin-remove" v-if="!profileLoading">
              <span class="ap-text-bold" v-if="profile.precinct_no">
                {{ profile.precinct_no }}
              </span>
              <span class="ap-text-italic" v-else> NOT INDICATED </span>
            </p>
            <ap-placeholder v-else :size="'small'" :width="'120px'" />
          </div>
        </ap-grid>

        <!-- <ap-grid
                    :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                        <small>
                            APPLICATION NO.
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <p class="ap-margin-remove"
                            v-if="!profileLoading">
                            <span class="ap-text-bold"
                                v-if="profile.application_no">
                                {{profile.application_no}}
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
                </ap-grid> -->

        <!-- <ap-grid
                    :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                        <small>
                            APPLICATION DATE
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <p class="ap-margin-remove"
                            v-if="!profileLoading">
                            <span class="ap-text-bold"
                                v-if="profile.application_date">
                                {{applicationDate}}
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
                </ap-grid> -->

        <!-- <ap-grid
                    :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                        <small>
                            APPLICATION TYPE:
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <p class="ap-margin-remove"
                            v-if="!profileLoading">
                            <span class="ap-text-bold"
                                v-if="profile.application_type">
                                {{profile.application_type}}
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
                </ap-grid> -->
      </div>
    </ap-grid>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Http from "@/services";

import { Dater } from "@/utils";

export default {
  data() {
    return {
      profile: {},
      profileLoading: false,
    };
  },

  created() {
    this.load();
  },

  computed: {
    ...mapGetters({
      voter: "companyVoter/selected",
    }),

    initials() {
      return `${this.profile.first_name[0]}${this.profile.last_name[0]}`;
    },

    dateOfBirth() {
      return Dater.format(this.profile.date_of_birth);
    },

    applicationDate() {
      return Dater.format(this.profile.application_date);
    },

    hasProfile() {
      return Object.keys(this.profile).length > 0;
    },
  },

  methods: {
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
  },
};
</script>
