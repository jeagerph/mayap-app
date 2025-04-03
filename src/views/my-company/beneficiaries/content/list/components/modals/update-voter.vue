<template>
  <ap-modal
    :isOpen.sync="$parent.$data.updateVoterModal"
    :isCenter="true"
    :size="'container'"
  >
    <ap-modal-body>
      <ap-modal-title> Update {{ fullName }} as Voter? </ap-modal-title>

      <hr class="ap-margin-small-top" />
      <div>
        <div v-if="!votersLoading">
          <table>
            <thead>
              <tr>
                <th>Beneficiary Info</th>
                <th class="voter-col">Voter Info</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="beneficiary-col">
                  <strong>Full Name:</strong> {{ fullName }}<br />
                  <strong>Gender:</strong> {{ gender }}<br />
                  <strong>Age:</strong> {{ getAge(dateOfBirth) }} yrs old
                </td>
                <td class="voter-col" v-for="item in voters" :key="item.id">
                  <strong>Full Name:</strong> {{ item.last_name }}, {{ item.first_name }} {{ item.middle_name ? item.middle_name : ""}} <br />
                  <strong>Gender:</strong> {{ item.gender.name }}<br />
                  <strong>Age:</strong>
                  {{
                    item.date_of_birth
                      ? getAge(item.date_of_birth) + " yrs old"
                      : "NOT INDICATED"
                  }}<br />
                  <strong>Precinct No.:</strong>
                  {{ item.precinct_no ? item.precinct_no : "Not indicated"
                  }}<br />
                  <div style="text-align: right">
                    <a
                      class="ap-button ap-button-outline-primary ap-button-small ap-button-full-rounded"
                      :href="`/company/voters/${item.slug.code}`"
                      target="new"
                    >
                      <small> SEE DETAILS </small>
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="ap-margin-top ap-text-center" v-else>
          <ap-loader :size="'large'" />

          <p class="ap-text-italic ap-margin-medium-top">
            Checking voters with same details
          </p>
        </div>
      </div>
      <div class="ap-margin-top">
        <!-- <div class="ap-margin-top ap-custom-scroll" v-if="!votersLoading">
          <ul class="ap-list ap-list-divider" v-if="voters.length">
            <li v-for="(item, index) in voters" :key="index">
              <ap-grid :gutter="'small'">
                <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                  <h5 class="ap-margin-remove">
                    {{ item.full_name }}
                  </h5>
                  <p class="ap-margin-remove">
                    {{ item.gender.name }}
                    &middot;
                    <span v-if="item.date_of_birth == null">
                      NOT INDICATED
                    </span>
                    <span v-else>
                      {{ getAge(item.date_of_birth) }} yrs old
                    </span>
                  </p>
                </div>
                <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                  <small class="ap-text-bold"> PRECINCT NO. </small>

                  <p class="ap-text-bold ap-margin-xsmall-top">
                    <span v-if="item.precinct_no">
                      {{ item.precinct_no }}
                    </span>
                    <span v-else class="ap-text-italic"> Not indicated </span>
                  </p>
                </div>
                <div
                  class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l ap-text-right@m"
                >
                  <a
                    class="ap-button ap-button-outline-primary ap-button-small ap-button-full-rounded"
                    :href="`/my-company/voters/${item.slug.code}`"
                    target="new"
                  >
                    <small> SEE DETAILS </small>
                  </a>
                </div>
              </ap-grid>
            </li>
          </ul>
        </div>

        <div class="ap-margin-top ap-text-center" v-else>
          <ap-loader :size="'large'" />

          <p class="ap-text-italic ap-margin-medium-top">
            Checking voters with same details
          </p>
        </div> -->

        <hr />

        <form
          class="ap-form-stacked ap-margin-medium-top"
          @submit.prevent="submit()"
        >
          <fieldset class="ap-fieldset">
            <ap-grid :gutter="'small'">
              <!-- <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                                <label class="ap-form-label ap-text-bold">
                                    Registered Voter?
                                </label>

                                <div class="ap-inline ap-margin-small-top">
                                    <label for="is-voter-yes">
                                        <input class="ap-checkbox" id="is-voter-yes" type="radio"
                                            :value="1"
                                            v-model="form.is_voter">
                                        <span class="ap-margin-small-left">
                                            Yes
                                        </span>
                                    </label>
                                </div>
                                <div class="ap-inline ap-margin-small-top ap-margin-left">
                                    <label for="is-voter-no">
                                        <input class="ap-checkbox" id="is-voter-no" type="radio"
                                            :value="0"
                                            v-model="form.is_voter">
                                        <span class="ap-margin-small-left">
                                            No
                                        </span>
                                    </label>
                                </div>
                            </div> -->
              <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <label class="ap-form-label ap-text-bold">
                  Are they the same voter?
                </label>

                <div class="ap-inline ap-margin-small-top">
                  <label for="is-voter-yes">
                    <input
                      class="ap-checkbox"
                      id="is-voter-yes"
                      type="radio"
                      :value="2"
                      @change="form.is_voter = 1"
                      v-model="form.verify_voter"
                    />
                    <span class="ap-margin-small-left"> Yes </span>
                  </label>
                </div>
                <div class="ap-inline ap-margin-small-top ap-margin-left">
                  <label for="is-voter-no">
                    <input
                      class="ap-checkbox"
                      id="is-voter-no"
                      type="radio"
                      :value="1"
                      @change="form.is_voter = 0"
                      v-model="form.verify_voter"
                    />
                    <span class="ap-margin-small-left"> No </span>
                  </label>
                </div>
              </div>
              <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <div>
                  <label
                    class="ap-text-bold ap-form-label"
                    :class="{ 'ap-text-danger': hasError('voter_type') }"
                  >
                    * Type of Voter
                  </label>

                  <select
                    class="ap-select"
                    :required="true"
                    v-model="form.voter_type"
                    :readonly="isLoading('update')"
                  >
                    <option :value="''" disabled>-- select type --</option>
                    <option :value="2">COMMAND VOTES (CV)</option>
                    <option :value="3">SURE VOTES (SV)</option>
                    <option :value="4">SWING VOTES (SW)</option>
                    <option :value="5">BLOCK LISTED (BL)</option>
                    <option :value="1">OTHERS (OT)</option>
                  </select>

                  <small
                    class="ap-text-bold ap-text-danger"
                    v-if="hasError('voter_type')"
                  >
                    <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                    {{ errors.voter_type[0] }}
                  </small>
                </div>
              </div>
            </ap-grid>
          </fieldset>

          <div class="ap-margin-top ap-text-right">
            <ap-button
              v-if="!submitLoading"
              type="button"
              class="ap-margin-small-right"
              :rounded="true"
              @click="closeModal()"
            >
              Cancel
            </ap-button>
            <ap-button
              type="submit"
              :color="'primary'"
              :rounded="true"
              :loading="submitLoading"
            >
              Submit
            </ap-button>
          </div>
        </form>
      </div>
    </ap-modal-body>
  </ap-modal>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Http from "@/services";

import { Form, Toast, Dater } from "@/utils";

export default {
  data() {
    return {
      errors: {},

      voters: [],
      votersLoading: false,

      form: {
        is_voter: "",
        voter_type: "",
        verify_voter: 1,
      },

      submitLoading: false,
    };
  },

  created() {
    this.initialize();

    this.loadVoters();
  },

  computed: {
    ...mapGetters({
      beneficiary: "companyBeneficiary/selected",
      isLoading: "companyBeneficiary/isLoading",
    }),

    updateVoterModal() {
      return this.$parent.$data.updateVoterModal;
    },

    fullName() {
      return `${this.beneficiary.last_name}, ${this.beneficiary.first_name} ${this.beneficiary.middle_name ? this.beneficiary.middle_name : ""}`;
    },

    gender() {
      return `${this.beneficiary.gender.name}`;
    },

    dateOfBirth() {
      return Dater.format(this.beneficiary.date_of_birth);
    },
  },

  methods: {
    ...mapActions({
      update: "companyBeneficiary/update",
    }),

    async submit() {
      this.errors = {};

      this.submitLoading = true;

      const response = await Http.put(
        `/my-company/beneficiary/${this.beneficiary.slug.code}/voter`,
        this.form
      );

      this.submitLoading = false;

      if (response.status === 200) {
        this.beneficiary.is_voter = response.data.is_voter;
        this.beneficiary.voter_type = response.data.voter_type;
        this.beneficiary.verify_voter = response.data.verify_voter;
        this.closeModal();

        Toast.success({
          message: "Data has been updated.",
        });
      } else if (response.status === 403) {
        let message = "Sorry, you cannot perform this action.";

        Toast.error({
          message: response.data.error.description
            ? response.data.error.description
            : message,
        });
      } else if (response.status === 404) {
        let message = "Data not found. Please try again.";

        Toast.error({
          message: response.data.error.description
            ? response.data.error.description
            : message,
        });
      } else {
        let message = "Something went wrong. Please try again.";

        Toast.error({
          message: response.data.error.description
            ? response.data.error.description
            : message,
        });
      }
    },

    async loadVoters() {
      this.votersLoading = true;

      const response = await Http.get(
        `/my-company/beneficiary/${this.beneficiary.slug.code}/voters/check`
      );

      this.votersLoading = false;

      if (response.status == 200) {
        this.voters = response.data;
      }
    },

    getFullName(voter) {
      return this.voter.full_name;
    },

    getAge(date) {
      return Dater.age(date);
    },

    initialize() {
      this.form.is_voter = this.beneficiary.is_voter;
      this.form.voter_type = this.beneficiary.voter_type.id;
    },

    hasError(name = null) {
      return Form.hasError(this.errors, name);
    },

    closeModal() {
      this.$parent.toggleModal("updateVoter", false);
    },
  },

  watch: {
    updateVoterModal(val) {
      if (val) {
        this.initialize();

        this.loadVoters();
      }
    },
  },
};
</script>

<style scoped>
.ap-custom-scroll {
  max-height: 200px;
  overflow: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  vertical-align: top;
}
th {
  background-color: #f2f2f2;
  font-weight: bold;
}
.beneficiary-col {
  background-color: white; 
}
.voter-col {
  background-color: white;
}
.detail-link {
  display: block;
  text-align: right;
  margin-top: 5px;
}
</style>
