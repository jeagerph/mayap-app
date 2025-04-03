<template>
  <div
    class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l ap-margin-xsmall-top"
  >
    <div
      class="ap-card ap-card-body ap-card-default ap-padding-small ap-text-center"
    >
      <ap-avatar
        :size="'large'"
        :color="'primary'"
        :shape="'circle'"
        :label="'AA'"
        :src="item.relative.photo"
      />

      <h5 class="ap-text-bold">
        {{ fullName }}
      </h5>

      <div>
        <span
          class="badge bg-info ap-margin-xsmall-right"
          style="font-size: 12px"
        >
          {{ item.relationship }}
        </span>
      </div>

      <div class="ap-margin-small-top">
        <p class="ap-margin-remove">
          {{ item.relative.gender.name }}
          &middot;
          {{ age }} yrs old
        </p>

        <div>
          <span
            class="badge bg-secondary ap-margin-xsmall-right"
            style="font-size: 12px"
          >
            {{ item.relative.barangay.name }}, {{ item.relative.city.name }}
          </span>
        </div>
      </div>

      <hr />

      <div>
        <a
          class="ap-button ap-button-outline ap-button-outline-primary ap-button-small ap-button-full-rounded"
          :href="`/company/beneficiaries/${item.relative.slug.code}`"
          target="_blank"
        >
          <small class="ap-text-primary"> SEE PROFILE </small>
        </a>
        <ap-button
          :size="'small'"
          :color="'danger'"
          :outline="true"
          @click="openModal('delete')"
        >
          DELETE
        </ap-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

import { Dater } from "@/utils";

export default {
  props: {
    item: Object,
  },

  data() {
    return {
      show: false,
    };
  },

  computed: {
    age() {
      return Dater.age(this.item.relative.date_of_birth);
    },

    fullName() {
        return `${this.item.relative.first_name} ${this.item.relative.last_name}`;
    }
  },

  methods: {
    ...mapActions({
      select: "companyBeneficiaryFamily/select",
    }),

    openModal(name) {
      this.select(this.item);

      this.$parent.toggleModal(name, true);
    },
  },
};
</script>
