<template>
    <ap-modal
        :isOpen.sync="$parent.$data.callModal"
        :isCenter="true">

        <ap-modal-body>

            <div class="ap-margin-top">

                <div class="ap-text-center">
                    <small>
                        Mobile Number
                    </small>

                    <h2 class="ap-text-bold ap-margin-remove">
                        {{ form.mobile_number }}
                    </h2>
                </div>

                <div v-if="!audioLoading">
                    <div v-if="audioPermissionAllowed">

                        <div v-if="!accessTokenLoading">
                            <div v-if="!initDeviceLoading">
                                <div v-if="device">
                                    <div class="ap-margin-medium-top ap-text-center">

                                        <h5 class="ap-text-bold">
                                            {{ getCurrentCallLabel(currentCallStatus) }}
                                        </h5>

                                        <div class="ap-margin-medium-top ap-text-center">
                                            <ap-button
                                                v-if="[1].includes(currentCallStatus)"
                                                :color="'danger'"
                                                :fullWidth="true"
                                                @click="closeModal()">
                                                Cancel
                                            </ap-button>
                                            <ap-button
                                                v-if="[2].includes(currentCallStatus)"
                                                :color="'danger'"
                                                :fullWidth="true"
                                                @click="endCall()">
                                                End Call
                                            </ap-button>
                                            <ap-button
                                                v-if="[3,4].includes(currentCallStatus)"
                                                :color="'danger'"
                                                :fullWidth="true"
                                                @click="closeModal()">
                                                Close
                                            </ap-button>
                                            
                                        </div>
                                    </div>
                                </div>

                                <div v-else
                                    class="ap-text-center ap-margin-medium-top">
                                    <h4>
                                        <i class="bx bx-error ap-text-danger" style="font-size: 32px;"></i>
                                    </h4>
                                    <p class="ap-margin-top ap-text-italic">
                                        Unfortunately, device is not registered.
                                    </p>

                                    <p class="ap-text-italic">
                                        To continue this service, kindly reload this page or try again later.
                                    </p>

                                    <div class="ap-margin-large-top ap-text-center">
                                        <ap-button
                                            :color="'danger'"
                                            :fullWidth="true"
                                            @click="endCall()">
                                            Close
                                        </ap-button>
                                    </div>
                                </div>
                                
                            </div>

                            <div class="ap-text-center ap-margin-medium-top"
                                v-else>
                                <ap-loader
                                    :size="'large'" />

                                <p class="ap-margin-top ap-text-italic">
                                    Initializing device.
                                </p>

                                <p class="ap-text-italic">
                                    Please wait...
                                </p>

                            </div>
                        </div>

                        <div v-else
                            class="ap-text-center ap-margin-medium-top">
                            <ap-loader
                                :size="'large'" />

                            <p class="ap-margin-top ap-text-italic">
                                Initializing token.
                            </p>

                            <p class="ap-text-italic">
                                Please wait...
                            </p>
                        </div>
                        
                    </div>
                    <div v-else
                        class="ap-text-center ap-margin-medium-top">
                        <h4>
                            <i class="bx bx-error ap-text-danger" style="font-size: 32px;"></i>
                        </h4>
                        
                        <p class="ap-text-bold">
                            Audio / Microphone not permitted to use.
                        </p>
                        
                        <p class="ap-text-italic">
                            To use the Call Service, kindly unblock/reload this page and allow Audio / Microphone to be use.
                        </p>

                        <div class="ap-margin-medium-top ap-text-center">
                            <ap-button
                                :color="'danger'"
                                :fullWidth="true"
                                @click="closeModal()">
                                Close
                            </ap-button>
                        </div>

                    </div>
                </div>

                <div v-else
                    class="ap-text-center ap-margin-medium-top">
                    <ap-loader
                        :size="'large'" />

                    <p class="ap-margin-top ap-text-italic">
                        Please allow permission of <span class="ap-text-bold">Audio / Microphone</span> device to be use for <span class="ap-text-bold">Call Service</span>.
                    </p>
                </div>
                
                
                

                

                <!-- <div class="ap-margin-large-top ap-text-center"
                    v-if="!accessTokenLoading">
                    <ap-button
                        :color="'danger'"
                        :fullWidth="true"
                        @click="endCall()">
                        End Call
                    </ap-button>
                </div> -->
            </div>
        </ap-modal-body>
    </ap-modal>
</template>

<script>
import { Device } from '@twilio/voice-sdk';

import { mapGetters, mapActions } from 'vuex';

import Http from '@/services';

import { Form, Toast } from '@/utils';

export default
{
    data()
    {
        return {
            errors: {},

            statusLabel: 'Loading...',

            accessTokenLoading: false,
            initDeviceLoading: false,

            accessToken: null,
            device: null,
            currentCall: null,
            currentCallStatus: 1,

            audioPermissionAllowed: false,
            audioLoading: false,
            currentStream: null,

        };
    },

    destroyed()
    {
        this.stopAudioStream();
    },

    computed:
    {
        ...mapGetters({
            accessUser: 'auth/accessUser',
        }),

        company()
        {
            return this.accessUser.company;
        },

        form()
        {
            return this.$parent.$data.form;
        },

        callModal()
        {
            return this.$parent.$data.callModal;
        },
    },

    methods:
    {
        async startAudioStream()
        {
            this.audioLoading = true;

            let constraints = (window.constraints = {
                audio: true,
            });

            await navigator.mediaDevices.getUserMedia(constraints)
                .then(stream => {
                    this.audioLoading = false;
                    this.currentStream = stream;
                    this.audioPermissionAllowed = true;
                })
                .catch(error => {
                    console.log(error);
                    this.audioLoading = false;
                    this.audioPermissionAllowed = false;
                });
        },

        async stopAudioStream()
        {
            const tracks = this.currentStream.getAudioTracks();
            
            tracks.forEach(track => {
                track.stop();
            });
        },

        async loadAccessToken()
        {
            if (!this.audioPermissionAllowed) return false;

            if (this.accessToken) return false;

            this.accessTokenLoading = true;

            const response = await Http.get(`/my-company/call/token/generate`);

            this.accessTokenLoading = false;

            if (response.status == 200)
            {
                this.accessToken = response.data;
            }
        },

        async initDevice()
        {
            if (!this.audioPermissionAllowed) return false;

            if (!this.accessToken) return false;

            if (this.device) return false;

            this.initDeviceLoading = true;

            this.device = new Device(this.accessToken, {
                logLevel: 1,
                codecPreferences: ["opus", "pcmu"],
                edge: "singapore",
            });

            this.device.on("registered", function () {
                console.log("Twilio.Device Ready to make and receive calls!");
                // callControlsDiv.classList.remove("hide");
            });

            this.device.on("error", function (error) {
                console.log("Twilio.Device Error: " + error.message);
            });

            await this.device.register();

            this.initDeviceLoading = false;
        },

        async makeCall()
        {
            if (!this.audioPermissionAllowed) return false;

            if (!this.accessToken) return false;

            if (!this.device) return false;

            let params = {
                mobile_number: this.form.mobile_number,
                code: this.accessUser.company.slug.code
            }

            console.log(`Attempting to call ${params.mobile_number} ...`);

            // Twilio.Device.connect() returns a Call object
            const call = await this.device.connect({ params });
            this.currentCall = call;

            // add listeners to the Call
            // "accepted" means the call has finished connecting and the state is now "open"
            call.on("accept", () => this.currentCallStatus = 2);

            call.on("disconnect", () => this.currentCallStatus = 3);

            call.on("cancel", () => this.currentCallStatus = 4);

        },

        async endCall()
        {
            console.log('Ending call...');

            this.closeModal();
        },

        async initialize()
        {
            await this.startAudioStream();

            await this.loadAccessToken();

            await this.initDevice();

            await this.makeCall();
        },

        getCurrentCallLabel(id)
        {
            if (id == 1) return 'Calling...';

            else if (id == 2) return 'Calling...';

            else if (id == 3) return 'Disconnected.';

            else if (id == 4) return 'Canceled.';

            else return 'Pending.';
        },

        closeModal()
        {
            this.currentCallStatus = 1;

            if (this.currentCall) this.currentCall.disconnect();

            this.stopAudioStream();

            this.$parent.toggleModal('call', false);
        },
    },

    watch:
    {
        callModal(val)
        {
            if (val)
            {
                this.initialize();
            }
        }
    }
};
</script>
