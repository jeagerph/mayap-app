<template>
  <ap-modal :isOpen.sync="$parent.$data.batchPrintModal" :isCenter="true">
    <ap-modal-body>
      <ap-modal-title> Batch Print SDN cards </ap-modal-title>

      <hr class="ap-margin-small-top" />

      <div class="ap-margin-top">
        <form class="ap-form-stacked" @submit.prevent="submit()">
          <h5>Please Select Address</h5>
          <hr class="ap-margin-small-top" />
          <ap-grid>
            <div class="ap-width-expand">
              <label class="ap-form-label ap-text-bold"> Reset Address </label>
            </div>
            <div class="ap-text-right">
              <ap-button :text="true" :color="'danger'" @click="resetAddress()">
                <i class="lni lni-close"></i>
              </ap-button>
            </div>
          </ap-grid>
          <div class="ap-margin-top">
            <label class="ap-text-bold ap-form-label"> Province </label>

            <select
              class="ap-select"
              v-if="!isLoading('provinces')"
              v-model="form.selectedProvince"
              @change="onSelectProvince()"
              required
            >
              <option value="" disabled>-- select province --</option>
              <option
                v-for="(item, index) in provinces"
                :key="index"
                :value="item.prov_code"
              >
                {{ item.name }}
              </option>
            </select>
            <ap-placeholder v-else :size="'medium'" />
          </div>

          <div class="ap-margin" v-if="form.selectedProvince">
            <label class="ap-form-label ap-text-bold">
              City/Municipality
            </label>
            <select
              class="ap-select"
              v-if="!isLoading('cities')"
              v-model="form.selectedCity"
              @change="onSelectCity()"
              required
            >
              <option value="" selected disabled>-- select city --</option>
              <option
                v-for="(item, index) in cities"
                :key="index"
                :value="item.city_code"
              >
                {{ item.name }}
              </option>
            </select>
            <ap-placeholder v-else :size="'medium'" />
          </div>
          <ap-input
            v-else
            :label="'* City/Municipality'"
            :value="'Select a province first...'"
            :disabled="true"
          />

          <div v-if="form.selectedCity">
            <label class="ap-form-label ap-text-bold"> Barangay </label>
            <select
              class="ap-select"
              v-if="!isLoading('barangays')"
              v-model="form.selectedBarangay"
              required
            >
              <option value="" selected disabled>-- select barangay --</option>
              <option
                v-for="(item, index) in barangays"
                :key="index"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </select>
            <ap-placeholder v-else :size="'medium'" />
          </div>
          <ap-input
            v-else
            :label="'* Barangay'"
            :value="'Select a city/municipality first...'"
            :disabled="true"
          />
          <label class="ap-form-label ap-text-bold ">* Number of IDs to print</label>
          <input
            class="ap-input"
            type="number"
            :label="'* Number of IDs to print'"
            v-model="form.numberOfIds"
            :disabled="false"
            :placeholder="'Enter number of IDs to print'"
            required
            max="100"
          />
          <div
            class="ap-margin-top"
            style="
              flex: content;
              flex-direction: column;
              align-items: center;
              width: 100%;
            "
          >
            <ap-button
              type="submit"

              class="ap-button ap-button-small ap-button-full-rounded ap-margin-xsmall-right"
            >
              {{ isFormLoading ? "Loading..." : "Submit" }}
            </ap-button>
            <ap-button

              class="ap-button ap-button-small ap-button-full-rounded ap-margin-xsmall-right"
              :color="'secondary'"
              @click="closeModal()"
            >
              Cancel
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

import { Form, Toast } from "@/utils";

export default {
  data() {
    return {
      form: {
        selectedBarangay: null,
        selectedCity: null,
        selectedProvince: null,
        numberOfIds: null,
      },
      provinces: [],
      cities: [],
      barangays: [],
      identifications: [],
      isFormLoading: false,
    };
  },

  created() {
    this.initialize();

    this.loadProvinces();
  },

  computed: {
    ...mapGetters({
      isLoading: "companyBeneficiary/isLoading",
    }),

    batchPrintModal() {
      return this.$parent.$data.batchPrintModal;
    },
  },

  methods: {
    ...mapActions({
      update: "companyBeneficiary/update",
      loadPrerequisite: "companyBeneficiary/loadPrerequisite",
    }),

    async submit() {

      if(this.isFormLoading) return;

      try{
        this.isFormLoading = true;
        const response = await Http.post(
          `/my-company/beneficiary/batch-print`,
          this.form
        );

        if (response.status === 200) {
          Toast.success({
            message : "Batch print successful."
          });
          this.identifications = response.data;

          this.download();
        } else {
          Toast.error({
            message : "Unable to load provinces."
          });
        }
      }catch(e){
        this.isFormLoading = false;
        console.log(`Error submit : ${JSON.stringify(e)}`);
        Toast.error({
          message : "Unable to load provinces."
        });
      }

    },
    async handlerSuccess(){

      const allCodes = this.identifications.map(({code}) => ({code}));

      try{
        const response = await Http.post('/my-company/beneficiaries/update-printed-identifications',{
          codes : allCodes
        });

        Toast.success({
          message : response.data.message
        });

      }catch(e){
        console.log(`Handler Success Error : ${JSON.stringify(e)}`);
      }
    },
    async loadProvinces() {
      const response = await Http.get(`/my-company/beneficiary/provinces`);
      if (response.status === 200) {
        this.provinces = response.data.data;
      } else {
        Toast.error({
          message : "Unable to load provinces."
        });
      }

      this.form.selectedCity = null;
      this.form.selectedBarangay = null;
    },

    async loadCities() {
      const response = await Http.get(
        `/my-company/beneficiary/cities?filter[provCode]=${this.form.selectedProvince}`
      );

      if (response.status === 200) {
        this.cities = response.data.data;
      } else {
        Toast.error({
          message : "Unable to load provinces."
        });
      }

      this.form.selectedBarangay = null;
    },

    async loadBarangays() {
      const response = await Http.get(
        `/my-company/beneficiary/barangays?filter[cityCode]=${this.form.selectedCity}`
      );
      if (response.status === 200) {
        this.barangays = response.data.data;
      } else {
        Toast.error({
          message : "Unable to load provinces."
        });
      }
    },

    onSelectProvince() {
      this.loadCities();

      this.form.selectedCity = null;
      this.form.selectedBarangay = null;
    },

    onSelectCity() {
      this.loadBarangays();

      this.form.selectedBarangay = null;
    },

    resetAddress() {
      this.form.selectedBarangay = null;
      this.form.selectedCity = null;
      this.form.selectedProvince = null;
    },

    initialize() {
        this.form.numberOfIds = null;
        this.form.selectedBarangay = null;
        this.form.selectedCity = null;
        this.form.selectedProvince = null;
    },

    hasError(name = null) {
      return Form.hasError(this.errors, name);
    },

    closeModal() {
      this.$parent.toggleModal("batchPrint", false);
    },

    async download() {

      try{
        const response = await Http.post(
        `/my-company/beneficiary/identifications/download`,
        {
          identifications: this.identifications,
        }
        );
        if (response.status === 200) {

          this.handlerSuccess();

          window.open(response.data.path);

          Toast.success({
            message : "Batch print successful."
          });

          this.isFormLoading = false;
        } else {
          Toast.error({
            message : "Unable to batch print."
          });
          this.isFormLoading = false;
        }
      }catch(e){
        console.log(`Download error : ${JSON.stringify(e)}`);
        Toast.error({
          message : "Unable to batch print."
        });
      }

    },
  },

  watch: {
    batchPrintModal(val) {
      if (val) {
        this.initialize();
      }
    },
  },
};
</script>
