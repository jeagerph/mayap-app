<template>
  <div class="ap-animate ap-animate-fade-in">
    <action-component />

    <div class="card card-body ap-padding ap-card-content">
      <header-component />

      <div class="ap-margin-top">
        <div
          class="ap-text-center ap-margin-top"
          v-if="!isLoading('index') && items.length && page.total > 10"
        >
          <ap-pagination :page="page" />
        </div>

        <div v-if="!isLoading('index')">
          <ul class="ap-list ap-list-divider" v-if="items.length">
            <item-component
              v-for="(item, index) in items"
              :key="index"
              :item="item"
            />
          </ul>

          <ap-card-empty v-else :label="emptyLabel" />
        </div>

        <placeholder-component v-else v-for="index in 5" :key="index" />

        <div
          class="ap-text-center"
          v-if="!isLoading('index') && items.length && page.total > 10"
        >
          <ap-pagination :page="page" />
        </div>
      </div>
    </div>

    <update-photo-modal v-if="hasVoter" />
    <!-- <delete-modal v-if="hasVoter" /> -->
    <main-offcanvas />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import ActionComponent from "./content/action";
import HeaderComponent from "./content/header";
import ItemComponent from "./content/item";
import PlaceholderComponent from "./content/placeholder";

import UpdatePhotoModal from "./components/modals/update-photo.vue";
import deleteModal from "./components/modals/delete.vue";
import MainOffcanvas from "./components/offcanvas/main";

export default {
  name: "ListComponent",

  components: {
    ActionComponent,  
    HeaderComponent,
    ItemComponent,
    PlaceholderComponent,
    UpdatePhotoModal,
    deleteModal,
    MainOffcanvas,
  },

  data() {
    return {
      deleteModal: false,
      updatePhotoModal: false,
      mainOffcanvas: false,
    };
  },

  created() {
    this.loadList();
  },

  computed: {
    ...mapGetters({
      items: "companyVoter/items",
      isLoading: "companyVoter/isLoading",
      page: "companyVoter/page",
      voter: "companyVoter/selected",
    }),

    emptyLabel() {
      return Object.keys(this.$route.query).length > 0
        ? "no search result"
        : "no records yet";
    },

    hasVoter() {
      return Object.keys(this.voter).length > 0;
    },

    fullPath() {
      return this.$route.fullPath.replace(
        "/company/voters",
        "/my-company/voters"
      );
    },
  },

  methods: {
    ...mapActions({
      load: "companyVoter/load",
      loadPrerequisite: "companyVoter/loadPrerequisite",
    }),

    async loadList() {
      window.scrollTo(0, 0);

      await this.load(this.fullPath);
    },

    toggleModal(name, bool) {
      this[`${name}Modal`] = bool;
    },

    toggleOffcanvas(name, bool) {
      this[`${name}Offcanvas`] = bool;
    },
  },

  watch: {
    $route() {
      this.loadList();
    },
  },
};
</script>
