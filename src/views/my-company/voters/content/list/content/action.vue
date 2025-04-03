<template>
  <div class="ap-animate ap-animate-fade-in">
    <div class="card card-body ap-padding">
      <form class="ap-form-stacked" @submit.prevent="customSearch()">
        <fieldset class="ap-fieldset">
          <div class="ap-width-xxlarge ap-margin-auto">
            <ap-grid :gutter="'small'">
              <div class="ap-width-expand@m">
                <p class="ap-text-bold ap-margin-remove-bottom">Search Voter</p>

                <div>
                  <small class="ap-text-italic">
                    Fill-out the form below for searching.
                  </small>
                </div>
              </div>
              <div class="ap-text-right@m"></div>
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
                      :required="true"
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
        </fieldset>
      </form>
    </div>

    <div class="ap-margin">
      <ap-grid :gutter="'small'" class="ap-flex-middle">
        <div class="ap-width-expand@m">
          <!-- <div class="ap-inline ap-margin-small-right">
            <small class="ap-text-bold"> FILTER: </small>
          </div>

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
          </ap-button> -->
        </div>
        <div class="ap-text-right@m">
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
      search: {
        firstName: "",
        middleName: "",
        lastName: "",
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
      isLoading: "companyVoter/isLoading",
      accessUser: "auth/accessUser",
    }),

    // hasFilterGreen() {
    //   return (
    //     Object.keys(this.$route.query).includes("filter[isGreen]") &&
    //     this.$route.query["filter[isGreen]"]
    //   );
    // },

    // hasFilterOrange() {
    //   return (
    //     Object.keys(this.$route.query).includes("filter[isOrange]") &&
    //     this.$route.query["filter[isOrange]"]
    //   );
    // },

    company() {
      return this.accessUser.company;
    },

    apButtonBackground() {
      if (this.company.province_id == "0314") return "customPink";

      return "primary";
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
