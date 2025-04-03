<template>
  <div class="ap-animate ap-animate-fade-in">
    <div class="card card-body ap-padding">
      <form class="ap-form-stacked" @submit.prevent="customSearch()">
        <fieldset class="ap-fieldset">
          <div
            class="ap-width-xxlarge ap-margin-auto"
            v-show="showingSearch == 'beneficiary'"
          >
            <ap-grid :gutter="'small'">
              <div class="ap-width-expand@m">
                <p class="ap-text-bold ap-margin-remove-bottom">
                  Search {{ appBeneficiaryName }}
                </p>

                <div>
                  <small class="ap-text-italic">
                    Fill-out the form below for searching.
                  </small>
                </div>
              </div>
              <div class="ap-text-right@m">
                <ap-button
                  type="button"
                  :size="'small'"
                  :color="'default'"
                  :rounded="true"
                  @click="toggleShowingSearch('family')"
                >
                  <i class="lni lni-search ap-margin-xsmall-right"></i>
                  FAMILY/RELATIVE
                </ap-button>
              </div>
            </ap-grid>

            <ap-grid class="ap-margin-top">
              <div class="ap-width-expand">
                <ap-grid :gutter="'small'">
                  <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                    <input
                      class="ap-input-custom"
                      type="text"
                      placeholder="First Name"
                      v-model="search.firstName"
                    />
                    <small class="ap-text-italic ap-margin-left">
                      (Optional)
                    </small>
                  </div>
                  <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                    <input
                      class="ap-input-custom"
                      type="text"
                      placeholder="Middle Name"
                      v-model="search.middleName"
                    />
                    <small class="ap-text-italic ap-margin-left">
                      (Optional)
                    </small>
                  </div>
                  <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                    <input
                      class="ap-input-custom"
                      type="text"
                      placeholder="Last Name"
                      :required="showingSearch == 'beneficiary'"
                      v-model="search.lastName"
                    />
                  </div>
                </ap-grid>
              </div>
              <div class="ap-text-right">
                <ap-button
                  class="ap-margin-small-top"
                  type="submit"
                  :size="'medium'"
                  :color="apButtonBackground"
                >
                  <i class="lni lni-search"></i>
                </ap-button>
              </div>
            </ap-grid>
          </div>
          <div
            class="ap-width-xxlarge ap-margin-auto"
            v-show="showingSearch == 'family'"
          >
            <ap-grid :gutter="'small'">
              <div class="ap-width-expand@m">
                <p class="ap-text-bold ap-margin-remove-bottom">
                  Search Family/Relative
                </p>

                <div>
                  <small class="ap-text-italic">
                    Fill-out the form below for searching.
                  </small>
                </div>
              </div>
              <div class="ap-text-right@m">
                <ap-button
                  type="button"
                  :size="'small'"
                  :color="'default'"
                  :rounded="true"
                  @click="toggleShowingSearch('beneficiary')"
                >
                  <i class="lni lni-search ap-margin-xsmall-right"></i>
                  {{ appBeneficiaryName.toUpperCase() }}
                </ap-button>
              </div>
            </ap-grid>

            <ap-grid class="ap-margin-top">
              <div class="ap-width-expand">
                <input
                  class="ap-input-custom"
                  type="text"
                  placeholder="Last Name"
                  :required="showingSearch == 'family'"
                  v-model="search.relativeName"
                />
              </div>
              <div class="ap-text-right">
                <ap-button
                  class="ap-margin-small-top"
                  type="submit"
                  :size="'medium'"
                  :color="apButtonBackground"
                >
                  <i class="lni lni-search"></i>
                </ap-button>
              </div>
            </ap-grid>
          </div>
        </fieldset>
      </form>
    </div>

    <div class="ap-margin">
      <ap-grid :gutter="'small'" class="ap-flex-middle">
        <div class="ap-width-expand@m">
          <div class="ap-inline ap-margin-small-right">
            <small class="ap-text-bold"> FILTER: </small>
          </div>

          <ap-button
            :color="hasFilterOfficer ? 'info' : 'default'"
            :size="'small'"
            :outline="!hasFilterOfficer"
            @click="toggleFilter('filter[isOfficer]')"
          >
            <i
              class="bx bx-check ap-margin-xsmall-right"
              v-show="hasFilterOfficer"
            ></i>
            OFFICER
          </ap-button>

          <ap-button
            :color="hasFilterPriority ? 'info' : 'default'"
            :size="'small'"
            :outline="!hasFilterPriority"
            @click="toggleFilter('filter[isPriority]')"
          >
            <i
              class="bx bx-check ap-margin-xsmall-right"
              v-show="hasFilterPriority"
            ></i>
            PRIORITY
          </ap-button>

          <ap-button
            :color="hasFilterHousehold ? 'info' : 'default'"
            :size="'small'"
            :outline="!hasFilterHousehold"
            @click="toggleFilter('filter[isHousehold]')"
          >
            <i
              class="bx bx-check ap-margin-xsmall-right"
              v-show="hasFilterHousehold"
            ></i>
            HEAD OF HOUSEHOLD
          </ap-button>

          <ap-button
            :color="hasFilterGreen ? 'success' : 'default'"
            :size="'small'"
            :outline="!hasFilterGreen"
            @click="toggleFilter('filter[isGreen]')"
          >
            <i
              class="bx bx-check ap-margin-xsmall-right"
              v-show="hasFilterGreen"
            ></i>
            <i
              class="lni lni-flag"
              style="color: #17a00e"
              :style="hasFilterGreen ? 'color: white' : ''"
            ></i>
          </ap-button>

          <ap-button
            :style="hasFilterOrange ? 'background-color: #ed772e' : ''"
            :size="'small'"
            :outline="!hasFilterOrange"
            @click="toggleFilter('filter[isOrange]')"
          >
            <i
              class="bx bx-check ap-margin-xsmall-right"
              v-show="hasFilterOrange"
            ></i>
            <i
              class="lni lni-flag"
              style="color: #ed772e"
              :style="hasFilterOrange ? 'color: white' : ''"
            ></i>
          </ap-button>
        </div>
        <div class="ap-text-right@m">
          <div
            class="dropdown ap-inline"
            v-permit:access="'company-beneficiaries-download-reports'"
          >
            <ap-button
              :class="'dropdown-toggle'"
              data-bs-toggle="dropdown"
              :color="'success'"
              :size="'small'"
              :outline="true"
            >
              <i class="bx bx-download"></i> REPORTS
            </ap-button>
            <ul class="dropdown-menu" style="margin: 0px">
              <li>
                <a
                  class="dropdown-item ap-point"
                  @click="openModal('download')"
                >
                  LIST
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item ap-point"
                  @click="openModal('downloadByBarangay')"
                >
                  BY BARANGAY
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item ap-point"
                  @click="openModal('downloadByPurok')"
                >
                  BY PUROK/SITIO
                </a>
              </li>
            </ul>
          </div>

          <span class="ap-margin-small-left ap-margin-small-right"> | </span>

          <router-link
            class="ap-button ap-button-small ap-button-full-rounded ap-margin-xsmall-right"
            to="/company/beneficiaries/create"
            :class="`ap-button-${apButtonBackground}`"
          >
            <i class="lni lni-plus ap-margin-xsmall-right"></i> Create
          </router-link>
          <ap-button
            :color="'primary'"
            :size="'small'"
            :rounded="true"
            :outline="true"
            @click="openModal('batchPrint')"
          >
            <i class="bx bx-printer"></i> Batch Print
          </ap-button>
          <ap-button
            :color="'primary'"
            :size="'small'"
            :rounded="true"
            :outline="true"
            @click="openOffcanvas('main')"
          >
            <i class="lni lni-funnel ap-margin-xsmall-right"></i> Filters
          </ap-button>
        </div>
      </ap-grid>

      <ap-querycrumbs :queries="queries" :onClick="reset" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      showingSearch: "beneficiary",

      search: {
        firstName: "",
        middleName: "",
        lastName: "",
        relativeName: "",
      },

      query: {
        search: null,
      },

      queries: {
        search: {
          name: "",
          type: "search",
          icon: "lni-search",
          query: "search",
          options: "",
        },
      },
    };
  },

  created() {
    this.initializeQueries();
  },

  computed: {
    ...mapGetters({
      isLoading: "companyBeneficiary/isLoading",
      accessUser: "auth/accessUser",
    }),

    company() {
      return this.accessUser.company;
    },

    hasFilterOfficer() {
      return (
        Object.keys(this.$route.query).includes("filter[isOfficer]") &&
        this.$route.query["filter[isOfficer]"]
      );
    },

    hasFilterHousehold() {
      return (
        Object.keys(this.$route.query).includes("filter[isHousehold]") &&
        this.$route.query["filter[isHousehold]"]
      );
    },

    hasFilterGreen() {
      return (
        Object.keys(this.$route.query).includes("filter[isGreen]") &&
        this.$route.query["filter[isGreen]"]
      );
    },

    hasFilterOrange() {
      return (
        Object.keys(this.$route.query).includes("filter[isOrange]") &&
        this.$route.query["filter[isOrange]"]
      );
    },

    hasFilterPriority() {
      return (
        Object.keys(this.$route.query).includes("filter[isPriority]") &&
        this.$route.query["filter[isPriority]"]
      );
    },

    apButtonBackground() {
      if (this.company.province_id == "0314") return "customPink";

      return "primary";
    },

    appBeneficiaryName() {
      return process.env.APP_BENEFICIARY_SINGULAR_NAME;
    },
  },

  methods: {
    toggleFilter(filter) {
      let value = this.$route.query[filter];

      if (value) {
        this.reset(filter);
      } else {
        let query = {};

        query[filter] = 1;

        this.$router.replace({
          ...this.$router.currentRoute,
          query: {
            ...this.$route.query,

            ...query,
          },
        });
      }
    },

    toggleShowingSearch(name) {
      if (name == "beneficiary") {
        this.search.relativeName = "";
      } else {
        this.search.firstName = "";
        this.search.middleName = "";
        this.search.lastName = "";
      }

      this.showingSearch = name;
    },

    customSearch() {
      this.$router.replace({
        ...this.$router.currentRoute,
        query: {
          ...this.search,
        },
      });
    },

    applySearch() {
      this.$router.replace({
        ...this.$router.currentRoute,
        query: {
          search: this.query.search,
        },
      });
    },

    initializeQueries() {
      const queries = this.$route.query;

      Object.keys(queries).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(queries, key)) {
          const value = queries[key];

          // if (['filter[status]', 'filter[viewed]'].includes(key)) return this.query[key] = parseInt(value);

          this.query[key] = value;
        }
      });
    },

    openModal(name) {
      this.select(this.item);

      this.$parent.toggleModal(name, true);
    },

    reset(name) {
      const query = Object.assign({}, this.$route.query);
      delete query[name];

      this.$router.replace({ query });
    },

    openModal(name) {
      this.$parent.toggleModal(name, true);
    },

    openOffcanvas(name) {
      this.$parent.toggleOffcanvas(name, true);
    },
  },
};
</script>
