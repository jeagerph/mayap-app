<template>
  <div class="ap-padding-small">
    <ap-grid :gutter="'small'">
      <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
        <p class="ap-text-bold ap-text-primary">PERSONAL INFORMATION</p>

        <ap-grid :gutter="'small'">
          <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
            <small> FIRST NAME: </small>
          </div>
          <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
            <p class="ap-text-bold ap-margin-remove" v-if="!isLoading('show')">
              {{ voter.first_name }}
            </p>
            <ap-placeholder v-else :size="'small'" :width="'120px'" />
          </div>
        </ap-grid>

        <ap-grid :gutter="'small'">
          <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
            <small> MIDDLE NAME: </small>
          </div>
          <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
            <p class="ap-text-bold ap-margin-remove" v-if="!isLoading('show')">
              {{ voter.middle_name }}
            </p>
            <ap-placeholder v-else :size="'small'" :width="'120px'" />
          </div>
        </ap-grid>

        <ap-grid :gutter="'small'">
          <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
            <small> LAST NAME: </small>
          </div>
          <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
            <p class="ap-text-bold ap-margin-remove" v-if="!isLoading('show')">
              {{ voter.last_name }}
            </p>
            <ap-placeholder v-else :size="'small'" :width="'120px'" />
          </div>
        </ap-grid>

        <ap-grid :gutter="'small'">
          <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
            <small> GENDER: </small>
          </div>
          <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
            <p class="ap-margin-remove" v-if="!isLoading('show')">
              <span class="ap-text-bold" v-if="voter.gender">
                {{ voter.gender.name }}
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
              v-if="!isLoading('show') && voter.date_of_birth == null"
            >
              NOT INDICATED
            </p>
            <p
              class="ap-text-bold ap-margin-remove"
              v-if="!isLoading('show') && voter.date_of_birth != null"
            >
              {{ dateOfBirth }}
            </p>
            <ap-placeholder v-else-if="isLoading('show')" :size="'small'" :width="'120px'" />
          </div>
        </ap-grid>

        <ap-grid :gutter="'small'">
          <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
            <small> EXACT ADDRESS </small>
          </div>
          <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
            <p class="ap-margin-remove" v-if="!isLoading('show')">
              <span class="ap-text-bold" v-if="voter.province">
                {{ voter.barangay ? `${voter.barangay.name}, ` : "" }}
                {{ voter.city ? `${voter.city.name}, ` : "" }}
                {{ voter.province ? voter.province.name : "" }}
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
            <p class="ap-margin-remove" v-if="!isLoading('show')">
              <span class="ap-text-bold" v-if="voter.precinct_no">
                {{ voter.precinct_no }}
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
                            v-if="!isLoading('show')">
                            <span class="ap-text-bold"
                                v-if="voter.application_no">
                                {{voter.application_no}}
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
                            v-if="!isLoading('show')">
                            <span class="ap-text-bold"
                                v-if="voter.application_date">
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
                            v-if="!isLoading('show')">
                            <span class="ap-text-bold"
                                v-if="voter.application_type">
                                {{voter.application_type}}
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

import { Dater } from "@/utils";

export default {
  computed: {
    ...mapGetters({
      voter: "companyVoter/selected",
      isLoading: "companyVoter/isLoading",
    }),

    dateOfBirth() {
      return Dater.format(this.voter.date_of_birth).toUpperCase();
    },

    applicationDate() {
      return Dater.format(this.voter.application_date);
    },
  },

  methods: {
    openModal(name) {
      this.$parent.toggleModal(name, true);
    },
  },
};
</script>
