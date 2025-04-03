<template>
  <ap-modal
    :isOpen.sync="$parent.$data.updatePhotoModal"
    :isCenter="true"
    :size="'container'"
  >
    <ap-modal-body>
      <ap-modal-title>
        Update {{ selectedBeneficiary }}'s Photo
      </ap-modal-title>

      <hr class="ap-margin-small-top" />

      <ap-grid :gutter="'small'" class="ap-flex-middle">
        <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
          <ap-grid :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
              <small> DEVICE STATUS: </small>
            </div>
            <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
              <p
                class="ap-text-italic ap-text-bold"
                v-if="hasGetUserMedia && permissionAllowed"
              >
                <i class="bx bx-check-circle ap-text-success"></i>
                CONNECTED
              </p>
              <p class="ap-text-italic ap-text-bold" v-else>
                <span v-if="!hasGetUserMedia">
                  <i class="bx bx-info-circle ap-text-danger"></i>
                  User Media is not supported on your browser.
                </span>
                <span v-else-if="!permissionAllowed">
                  <i class="bx bx-info-circle ap-text-danger"></i>
                  Permission to use your camera is not allowed on your browser.
                </span>
              </p>
            </div>
          </ap-grid>

          <div class="ap-margin-top" v-show="!cameraLoading">
            <div v-show="hasGetUserMedia">
              <small class="ap-text-bold"> Available Sources: </small>

              <select
                class="ap-select"
                v-model="selectedCamera"
                @change="changeStream"
              >
                <option
                  v-for="(option, index) in cameraOptions"
                  :key="index"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>

              <div class="ap-margin-small-top ap-text-center">
                <video
                  v-show="!hasCapturedPhoto"
                  ref="apCamera"
                  :width="450"
                  :height="337.5"
                  autoplay
                ></video>

                <canvas
                  v-show="hasCapturedPhoto"
                  id="apPhotoTaken"
                  ref="apCanvas"
                  :width="450"
                  :height="337.5"
                >
                </canvas>
              </div>

              <div class="ap-margin-small-top ap-text-center">
                <ap-button
                  v-show="hasCapturedPhoto"
                  type="button"
                  :color="'warning'"
                  :outline="true"
                  @click="resetPhoto()"
                >
                  RETRY
                </ap-button>
                <ap-button
                  type="button"
                  :color="'primary'"
                  :rounded="true"
                  :outline="true"
                  :loading="captureLoading"
                  @click="capturePhoto()"
                >
                  CAPTURE
                </ap-button>
              </div>
            </div>

            <div class="ap-text-center" v-show="!hasGetUserMedia">
              <img
                src="/static/assets/images/empty.png"
                width="300"
                height="300"
              />
            </div>
          </div>

          <div class="ap-margin-top ap-text-center" v-show="cameraLoading">
            <ap-loader :size="'large'" />

            <p class="ap-text-italic ap-margin-top">INITIALIZING CAMERA...</p>
          </div>

          <div class="ap-margin-top ap-margin-bottom ap-text-center">
            - OR -
          </div>
          <div class="ap-text-center">
            <label class="ap-upload-label-button" for="upload-resident-image"
              >Select Photo</label
            >
            <input
              class="ap-display-none"
              id="upload-resident-image"
              type="file"
              accept="image/**"
              @change="onFileChange"
            />
            <ap-input class="ap-display-none" type="file" accept="image/**" />
          </div>
        </div>
        <div
          class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-center"
        >
          <vue-croppie
            ref="residentRef"
            :boundary="{ width: 250, height: 250 }"
            :viewport="{ width: 225, height: 225, type: 'square' }"
            :enableResize="false"
            :enableOrientation="true"
            :mouseWheelZoom="false"
            @result="result"
          >
          </vue-croppie>

          <div>
            <ap-button
              type="button"
              class="ap-margin-small-right"
              data-tooltip="Rotate Left"
              :color="'secondary'"
              :size="'small'"
              :outline="true"
              :rounded="true"
              @click="rotate(90)"
            >
              <i class="lni lni-arrow-left"></i>
            </ap-button>

            <ap-button
              type="button"
              data-tooltip="Rotate Right"
              :color="'secondary'"
              :size="'small'"
              :outline="true"
              :rounded="true"
              @click="rotate(-90)"
            >
              <i class="lni lni-arrow-right"></i>
            </ap-button>
          </div>

          <div class="ap-margin-top ap-text-center" v-if="hasError('photo')">
            <small class="ap-text-bold ap-text-danger">
              <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
              {{ errors.photo[0] }}
            </small>
          </div>
        </div>
      </ap-grid>

      <div class="ap-margin-top ap-text-right">
        <ap-button
          v-if="!isLoading('update')"
          type="button"
          class="ap-margin-small-right"
          :rounded="true"
          @click="closeModal()"
        >
          Cancel
        </ap-button>
        <ap-button
          :color="'primary'"
          :loading="isLoading('update')"
          :rounded="true"
          @click="upload()"
        >
          Upload
        </ap-button>
      </div>
    </ap-modal-body>
  </ap-modal>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import { Toast, Form } from "@/utils";

export default {
  // mounted() {
  //   console.log(selected_beneficiary);
  // },

  data() {
    return {
      errors: {},

      cropped: "",

      cameraLoading: false,
      captureLoading: false,

      permissionAllowed: false,
      isCheckingCamera: false,
      hasCapturedPhoto: false,

      cameraOptions: [],
      selectedCamera: "",
      currentStream: "",
    };
  },

  computed: {
    ...mapGetters({
      voter: "companyVoter/selected",
      isLoading: "companyVoter/isLoading",
    }),

    updatePhotoModal() {
      return this.$parent.$data.updatePhotoModal;
    },

    hasGetUserMedia() {
      return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    },

    selectedBeneficiary() {
      return `${this.voter.last_name ? `${this.voter.last_name}, ` : ""} ${
        this.voter.first_name
      } ${this.voter.middle_name}`;
    },
  },

  methods: {
    ...mapActions({
      update: "companyVoter/update",
    }),

    async upload() {
      const options = {
        format: "png",
        circle: false,
      };

      const formPhoto = {
        photo: "",
      };

      await this.$refs.residentRef.result(options, (output) => {
        formPhoto.photo = output;
      });

      const response = await this.update({
        url: `/my-company/voter/${this.voter.beneficiary.slug.code}/photo`,
        form: formPhoto,
      });

      if (response.status === 200) {
        this.voter.beneficiary.photo = response.data.photo;
        this.closeModal();
        Toast.success({
          message: "Photo has been updated.",
        });
      } else if (response.status == 422) {
        this.errors = response.data.errors;

        Toast.error({
          title: "Form Validation",
          message: "Photo is required.",
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

    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      const vm = this;

      this.renderPhoto(files[0], (response) => {
        vm.$refs.residentRef.bind({
          url: response,
        });
      });
    },

    renderPhoto(file, callback) {
      const reader = new FileReader();
      reader.onload = (data) => {
        callback(data.target.result);
      };
      reader.readAsDataURL(file);
    },

    rotate(rotationAngle) {
      this.$refs.residentRef.rotate(rotationAngle);
    },

    result(output) {
      this.cropped = output;
    },

    async capturePhoto() {
      this.captureLoading = true;

      const context = this.$refs.apCanvas.getContext("2d");
      await context.drawImage(this.$refs.apCamera, 0, 0, 450, 337.5);

      const canvas = document
        .getElementById("apPhotoTaken")
        .toDataURL("image/jpeg");

      this.captureLoading = false;

      this.hasCapturedPhoto = true;

      await this.$refs.residentRef.bind({
        url: canvas,
      });

      this.hasCapturedPhoto = false;
    },

    async resetPhoto() {
      this.hasCapturedPhoto = false;
    },

    startStream() {
      if (!this.hasGetUserMedia) return false;

      this.cameraLoading = true;
      this.isCheckingCamera = true;
      this.permissionAllowed = false;

      let constraints = (window.constraints = {
        audio: false,
        video: { facingMode: "environment" },
      });

      navigator.mediaDevices.enumerateDevices().then((devices) => {
        let count = 1;
        devices.forEach((device) => {
          if (device.kind === "videoinput") {
            this.cameraOptions.push({
              label: device.label || `Camera ${count++}`,
              value: device.deviceId,
            });
          }
        });

        if (this.cameraOptions.length > 0) {
          this.selectedCamera = this.cameraOptions[0].value;
          constraints.video = {
            deviceId: {
              exact: this.selectedCamera,
            },
          };

          navigator.mediaDevices
            .getUserMedia(constraints)
            .then((stream) => {
              this.cameraLoading = false;
              this.isCheckingCamera = false;
              this.permissionAllowed = true; // Set to true on success
              this.currentStream = stream;
              this.$refs.apCamera.srcObject = stream;
            })
            .catch((error) => {
              console.log(error);
              this.cameraLoading = false;
              this.isCheckingCamera = false;
              this.permissionAllowed = false; // Remain false on error
            });
        } else {
          this.cameraLoading = false;
          this.isCheckingCamera = false;
          // Handle case where no cameras are found
        }
      });
    },

    changeStream(event) {
      this.currentStream.getTracks().forEach((track) => {
        track.stop();
      });

      this.cameraLoading = true;

      let deviceId = event.target.value;

      let constraints = (window.constraints = {
        audio: false,
        video: true,
      });

      constraints.video = {
        deviceId: {
          exact: deviceId,
        },
      };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          this.cameraLoading = false;
          this.currentStream = stream;
          this.$refs.apCamera.srcObject = stream;
        })
        .catch((error) => {
          console.log(error);
          this.cameraLoading = false;
          this.permissionAllowed = false;
        });
    },

    stopStream() {
      if (!this.hasGetUserMedia || !this.permissionAllowed) return false;

      let tracks = this.$refs.apCamera.srcObject.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });

      this.permissionAllowed = true;
    },

    closeModal() {
      if (this.$refs.apCamera && this.$refs.apCamera.srcObject) {
        this.stopStream();
      }

      this.hasCapturedPhoto = false;
      this.cameraOptions = [];
      this.selectedCamera = "";
      this.currentStream = "";

      this.$parent.toggleModal("updatePhoto", false);
    },

    hasError(name = null) {
      return Form.hasError(this.errors, name);
    },
  },

  mounted() {
    this.startStream();
  },

  watch: {
    updatePhotoModal(val) {
      if (val) {
        this.startStream();
      } else {
        // Add the conditional check here
        if (this.$refs.apCamera && this.$refs.apCamera.srcObject) {
          this.stopStream();
        }
      }
    },
  },
};
</script>
