te<template>
    <ap-modal
        :isOpen.sync="$parent.$data.photoModal"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                CAPTURE PHOTO
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">
                
                <ap-grid :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                        <small>
                            DEVICE STATUS:
                        </small>
                    </div>
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <p class="ap-text-italic ap-text-bold"
                            v-if="hasGetUserMedia && permissionAllowed">
                            <i class="bx bx-check-circle ap-text-success"></i>
                            CONNECTED
                        </p>
                        <p class="ap-text-italic ap-text-bold"
                            v-else>
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

                <div class="ap-margin-top"
                    v-show="!cameraLoading">

                    <div v-show="hasGetUserMedia">
                        <small class="ap-text-bold">
                            Available Sources:
                        </small>

                        <select
                            class="ap-select"
                            v-model="selectedCamera"
                            @change="changeStream">
                            <option
                                v-for="(option, index) in cameraOptions"
                                :key="index"
                                :value="option.value">
                                {{option.label}}
                            </option>
                        </select>

                        <div class="ap-margin-small-top ap-text-center">
                            <video
                                v-show="!hasCapturedPhoto"
                                ref="apCamera" :width="450"
                                :height="337.5"
                                autoplay>
                            </video>

                            <canvas
                                v-show="hasCapturedPhoto"
                                id="apPhotoTaken"
                                ref="apCanvas"
                                :width="450"
                                :height="337.5">
                            </canvas>
                        </div>

                        <div class="ap-margin-small-top ap-text-center">
                            <ap-button
                                v-show="hasCapturedPhoto"
                                type="button"
                                :color="'warning'"
                                :outline="true"
                                @click="resetPhoto()">
                                RETRY
                            </ap-button>
                            <ap-button
                                type="button"
                                :color="'primary'"
                                :rounded="true"
                                :outline="true"
                                :loading="captureLoading"
                                @click="capturePhoto()">
                                CAPTURE
                            </ap-button>
                        </div>
                    </div>

                    

                    <div class="ap-text-center"
                        v-show="!hasGetUserMedia">
                        <img src="/static/assets/images/empty.png" width="300" height="300">
                    </div>

                </div>

                <div class="ap-margin-top ap-text-center"
                    v-show="cameraLoading">

                    <ap-loader
                        :size="'large'" />

                    <p class="ap-text-italic ap-margin-top">
                        INITIALIZING CAMERA...
                    </p>
                </div>

                <div class="ap-margin ap-text-right"
                    v-if="!cameraLoading">
                    <ap-button
                        type="button"
                        class="ap-margin-small-right"
                        :rounded="true"
                        @click="closeModal()">
                        Cancel
                    </ap-button>
                    <ap-button
                        v-show="hasCapturedPhoto"
                        type="button"
                        :color="'primary'"
                        :rounded="true"
                        @click="submit()">
                        Submit
                    </ap-button>
                </div>
                
            </div>
        </ap-modal-body>
    </ap-modal>
</template>

<script>
import { mapGetters } from 'vuex';

import { Form, Toast } from '@/utils';

export default
{
    data()
    {
        return {
            cameraLoading: false,
            captureLoading: false,

            permissionAllowed: true,

            hasCapturedPhoto: false,

            cameraOptions: [],
            selectedCamera: '',
            currentStream: '',
        };
    },

    computed:
    {
        ...mapGetters({
            form: 'appResident/editForm',
            isLoading: 'appResident/isLoading',
        }),

        errors:
        {
            get()
            {
                return this.$parent.$data.errors;
            },

            set(value)
            {
                this.$parent.$data.errors = value;
            },
        },

        photoModal()
        {
            return this.$parent.$data.photoModal;
        },

        hasGetUserMedia()
        {
            return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
        },
    },

    methods:
    {
        async submit()
        {
            this.errors = {};

            const canvas = document.getElementById('apPhotoTaken').toDataURL("image/jpeg");

            await this.$parent.$refs.photoComponent.$refs.residentRef.bind({
                url: canvas,
            });

            this.$parent.$data.changedPhoto = true;

            this.closeModal();
        },

        async capturePhoto()
        {
            this.captureLoading = true;

            const context = this.$refs.apCanvas.getContext('2d');
            await context.drawImage(this.$refs.apCamera, 0, 0, 450, 337.5);

            this.captureLoading = false;

            this.hasCapturedPhoto = true;
        },

        async resetPhoto()
        {
            this.hasCapturedPhoto = false;
        },

        startStream()
        {
            if (!this.hasGetUserMedia || !this.permissionAllowed) return false;

            this.cameraLoading = true;

            let constraints = (window.constraints = {
                audio: false,
                video: { facingMode: 'environment' }
            });

            navigator.mediaDevices.enumerateDevices()
                .then(devices => {
                    let count = 1;
                    devices.forEach(device => {
                        // console.log(device.kind + ": " + device.label +
                        //     " id = " + device.deviceId);
                        // if (device.kind == "videoinput") {  
                        //     videoDevices[videoDeviceIndex++] =  device.deviceId;    
                        // }

                        if (device.kind === 'videoinput')
                        {
                            this.cameraOptions.push({
                                label: device.label || `Camera ${count++}`,
                                value: device.deviceId
                            })
                        }
                    });

                    this.selectedCamera = this.cameraOptions[0].value;
                    constraints.video = {
                        deviceId: {
                            exact: this.selectedCamera
                        }
                    };
                });

            navigator.mediaDevices
                .getUserMedia(constraints)
                .then(stream => {
                    this.cameraLoading = false;
                    this.currentStream = stream;
                    this.$refs.apCamera.srcObject = stream;
                })
                .catch(error => {
                    console.log(error);
                    this.cameraLoading = false;
                    this.permissionAllowed = false;
                });
        },

        changeStream(event)
        {
            this.currentStream.getTracks().forEach(track => {
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
                    exact: deviceId
                }
            };

            navigator.mediaDevices
                .getUserMedia(constraints)
                .then(stream => {
                    this.cameraLoading = false;
                    this.currentStream = stream;
                    this.$refs.apCamera.srcObject = stream;
                })
                .catch(error => {
                    console.log(error);
                    this.cameraLoading = false;
                    this.permissionAllowed = false;
                });
        },

        stopStream()
        {
            if (!this.hasGetUserMedia || !this.permissionAllowed) return false;
            
            let tracks = this.$refs.apCamera.srcObject.getTracks();

            tracks.forEach(track => {
                track.stop();
            });

            this.permissionAllowed = true;
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },

        closeModal()
        {
            this.stopStream();

            this.hasCapturedPhoto = false;
            this.cameraOptions = [];
            this.selectedCamera = '';
            this.currentStream = '';

            this.$parent.toggleModal('photo', false);
        },
    },

    watch:
    {
        photoModal(val)
        {
            if (val) this.startStream();

            else this.stopStream();
        }
    },
};
</script>
