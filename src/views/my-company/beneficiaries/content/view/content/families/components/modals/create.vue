<template>
  <ap-modal :isOpen.sync="$parent.$data.createModal" :isCenter="true">
    <ap-modal-body>
      <ap-modal-title>
        Add Family/Relative to
        <span class="ap-text-bold">{{ beneficiary.full_name }}</span>
      </ap-modal-title>

      <hr class="ap-margin-small-top" />

      <div
        class="ap-card ap-card-body ap-card-small ap-card-default ap-padding-small ap-margin-top"
      >
        <p class="ap-text-italic ap-text-bold">Search a Relative</p>
        <form class="ap-form-stacked" @submit.prevent="search()">
          <fieldset class="ap-fieldset">
            <ap-grid :gutter="'small'">
              <div class="ap-width-expand@m">
                <ap-grid :gutter="'small'">
                  <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                    <ap-input
                      type="text"
                      :label="'First Name'"
                      v-model="searchForm.firstName"
                      placeholder="ex: JUAN"
                    />
                  </div>
                  <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                    <ap-input
                      type="text"
                      :label="'Middle Name'"
                      v-model="searchForm.middleName"
                      placeholder="ex: SANTIAGO"
                    />
                  </div>
                  <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                    <ap-input
                      type="text"
                      :required="true"
                      :label="'* Last Name'"
                      v-model="searchForm.lastName"
                      placeholder="ex: DELA CRUZ"
                    />
                  </div>
                </ap-grid>
              </div>
              <div class="ap-text-right@m">
                <ap-button
                  type="submit"
                  :color="'primary'"
                  :outline="true"
                  :loading="itemsLoading"
                >
                  <i class="lni lni-search"></i>
                </ap-button>
              </div>
            </ap-grid>
          </fieldset>
        </form>

        <div v-if="!itemsLoading">
          <div
            class="ap-margin-small-top"
            style="height: 200px; overflow-y: scroll"
            v-if="items.length"
          >
            <p class="ap-text-italic">Kindly select on the list below</p>
            <ul class="ap-list ap-list-divider ap-list-hover">
              <li
                :style="
                  form.relativeCode === item.slug.code
                    ? { background: '#f6f6f6' }
                    : ''
                "
                class="ap-point"
                v-for="(item, index) in items"
                :key="index"
                @click="select(item)"
              >
                <ap-grid :gutter="'small'">
                  <div class="ap-width-fit-content">
                    <ap-avatar
                      :shape="'default'"
                      :src="item.photo"
                      :label="'AA'"
                    />
                  </div>
                  <div class="ap-width-expand">
                    <h5 class="ap-text-bold ap-margin-remove">
                      {{ item.last_name }}, {{ item.first_name }}
                      {{ item.middle_name }}
                    </h5>
                    <p>
                      {{ item.gender.name }}
                      &middot;
                      {{ age(item.date_of_birth) }} yrs old &middot; BRGY
                      {{ item.barangay.name }}, {{ item.city.name }}
                    </p>
                  </div>
                </ap-grid>
              </li>
            </ul>
          </div>
          <p class="ap-text-italic" v-else>No search result yet</p>
        </div>
        <div v-else>
          <ap-placeholder :size="'medium'" />
        </div>
      </div>
      <div class="ap-margin-top">
        <form class="ap-form-stacked" @submit.prevent="submit()">
          <fieldset class="ap-fieldset">
            <p class="ap-text-bold ap-text-italic">
              Kindly fill-out the form below
            </p>

            <ap-grid :gutter="'small'">
              <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <label class="ap-form-label ap-text-bold">
                  Selected Relative
                </label>

                <div v-if="form.relativeCode">
                  <ap-grid :gutter="'small'">
                    <div class="ap-width-fit-content">
                      <ap-avatar
                        :shape="'default'"
                        :src="relative.photo"
                        :label="'AA'"
                      />
                    </div>
                    <div class="ap-width-expand">
                      <h5 class="ap-text-bold ap-margin-remove">
                        {{ relative.last_name }}, {{ relative.first_name }}
                        {{ relative.middle_name }}
                      </h5>
                      <p>
                        {{ relative.gender.name }}
                        &middot;
                        {{ age(relative.date_of_birth) }} yrs old &middot; BRGY
                        {{ relative.barangay.name }}, {{ relative.city.name }}
                      </p>
                    </div>
                  </ap-grid>
                </div>
                <div v-else>
                  <p class="ap-text-italic">No selected relative yet</p>
                </div>
              </div>
              <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <div class="ap-margin">
                  <label
                    class="ap-text-bold ap-form-label"
                    :class="{ 'ap-text-danger': hasError('relationship') }"
                  >
                    What is the relationship to
                    <span>
                      {{ relative.last_name }}, {{ relative.first_name }}
                      {{ relative.middle_name }}
                    </span>
                    ?
                  </label>

                  <select
                    :disabled="!form.relativeCode"
                    class="ap-select"
                    :required="true"
                    v-model="form.relationship"
                    :readonly="isLoading('store')"
                  >
                    <option :value="''" disabled>
                      -- select relationship --
                    </option>
                    <option
                      v-for="(relationship, index) in relationships"
                      :key="index"
                      :value="index"
                    >
                      {{ index }}
                    </option>
                  </select>
                  <span v-if="!form.relativeCode" class="ap-text-danger">
                    Please select a relative first.
                  </span>
                  <small
                    class="ap-text-bold ap-text-danger"
                    v-if="hasError('relationship')"
                  >
                    <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                    {{ errors.relationship[0] }}
                  </small>
                </div>
              </div>
            </ap-grid>
          </fieldset>

          <div class="ap-margin ap-text-right">
            <ap-button
              v-if="!isLoading('store')"
              type="button"
              class="ap-margin-small-right"
              @click="closeModal()"
            >
              Cancel
            </ap-button>
            <ap-button
              type="submit"
              :color="'primary'"
              :outline="false"
              :loading="isLoading('store')"
            >
              Submit
            </ap-button>
          </div>
        </form>
      </div>

      <div class="ap-margin-top">
        <form class="ap-form-stacked" @submit.prevent="submit()"></form>
      </div>
    </ap-modal-body>
  </ap-modal>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import { Form, Toast, Dater } from "@/utils";
import axios from "axios";

export default {
  data() {
    return {
      errors: {},
      items: [],

      relationships: [],
      itemsLoading: false,
      searchForm: {
        firstName: "",
        middleName: "",
        lastName: "",
      },

      form: {
        relativeCode: "",
        relationship: "",
      },

      relative: {},
    };
  },

  created() {
    this.initialize();

    this.loadRelationships();
  },

  computed: {
    ...mapGetters({
      isLoading: "companyBeneficiaryFamily/isLoading",
      beneficiary: "companyBeneficiary/selected",
    }),
  },

  methods: {
    ...mapActions({
      store: "companyBeneficiaryFamily/store",
    }),

    async search() {
      this.itemsLoading = true;
      axios
        .get("https://membership-api.kapitan.ph/api/my-company/beneficiaries", {
          params: this.searchForm,
        })
        .then((response) => {
          this.items = response.data.data;
          this.itemsLoading = false;
        })
        .catch((error) => {
          console.log(error);
          this.itemsLoading = false;
        })
        .finally(() => {
          this.itemsLoading = false;
        });
    },

    age(date) {
      return Dater.age(date);
    },

    select(item) {
      this.form.relativeCode = item.slug.code;
      this.relative = item;
    },

    async loadRelationships() {
      await axios
        .get(
          "https://membership-api.kapitan.ph/api/my-company/beneficiary/relationships"
        )
        .then((response) => {
          this.relationships = response.data;
        });
    },

    async submit() {
      this.errors = {};

      const response = await this.store({
        url: `/my-company/beneficiary/${this.beneficiary.slug.code}/relative`,
        form: this.form,
      });

      if (response.status === 201) {
        this.initialize();

        this.closeModal();

        Toast.success({
          message: "Family/relative has been added.",
        });
      } else if (response.status === 422) {
        this.errors = response.data.errors;

        Toast.error({
          message: "Form validation. Please double check your form.",
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

    initialize() {
      this.form = {
        relativeCode: "",
        relationship: "",
      };

      this.searchForm = {
        firstName: "",
        middleName: "",
        lastName: "",
      };

      this.items = [];
      this.relationships = [];
      this.relative = {};
    },

    hasError(name = null) {
      return Form.hasError(this.errors, name);
    },

    closeModal() {
      this.$parent.toggleModal("create", false);
    },
  },
};
</script>
