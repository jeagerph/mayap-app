<template>
    <ap-modal
        :isOpen.sync="$parent.$data.callModal"
        :isCenter="true">

        <ap-modal-body>

            <div class="ap-margin-top">

                <div v-if="!audioLoading">
                    <div v-if="audioPermissionAllowed">
                        
                        <div v-if="!storeCallTransactionLoading">
                            <div v-if="!accessTokenLoading">
                                <div v-if="!deviceLoading">
                                    <div v-if="device">
                                        <div class="ap-margin-top ap-text-center">

                                            <ap-avatar
                                                :size="'xlarge'"
                                                :label="initials"
                                                :src="beneficiary.photo" />

                                            <h2 class="ap-text-bold ap-margin-top">
                                                {{ beneficiary.mobile_no }}
                                            </h2>

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
                            <ap-loader
                                :size="'large'" />

                            <p class="ap-margin-top ap-text-italic">
                                Initializing call transaction.
                            </p>

                            <p class="ap-text-italic">
                                Please wait...
                            </p>
                        </div>

                        <div class="ap-card ap-card-body ap-card-default ap-card-small ap-margin-top ap-text-center ap-animate ap-animate-fade-in"
                            v-show="openSetting">

                            <select
                                class="ap-select"
                                v-model="currentAudioInput"
                                @change="changeStream">
                                <option
                                    v-for="(input, index) in audioInputOptions"
                                    :key="index"
                                    :value="input.deviceId">{{ input.label }}</option>
                            </select>

                            <div class="ap-margin-small-top">
                                <meter
                                    min="0"
                                    low="10"
                                    optimum="50"
                                    high="90"
                                    max="100"
                                    :value="volume"
                                    style="width: 200px; height: 30px;">
                                </meter>
                            </div>
                            
                        </div>

                        <div class="ap-text-center ap-margin-top">
                            <a class="ap-link-reset ap-text-primary ap-point"
                                @click="openSetting = !openSetting">
                                <small>
                                    {{ openSetting ? 'CLOSE':'OPEN' }} SETTING
                                </small>
                                
                            </a>
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
            </div>
        </ap-modal-body>
    </ap-modal>
</template>

<script>
import { Device } from '@twilio/voice-sdk';

import { mapGetters, mapActions } from 'vuex';

import Http from '@/services';

import { Dater, Form, Toast } from '@/utils';

export default
{
    data()
    {
        return {
            errors: {},

            statusLabel: 'Loading...',

            accessTokenLoading: false,
            deviceLoading: false,
            storeCallTransactionLoading: false,
            updateCallTransactionLoading: false,
            
            audioPermissionAllowed: false,
            audioLoading: false,

            audioInputOptions: [],
            audioOutputOptions: [],

            currentAudioInput: null,
            currentAudioOutput: null,
            currentStream: null,

            audioContext: null,
            analyser: null,
            microphone: null,
            scriptProcessor: null,

            volume: 0,

            accessToken: null,
            device: null,
            currentCall: null,
            currentCallStatus: 1,
            currentCallTransaction: {},

            openSetting: false,
        };
    },

    destroyed()
    {
        this.stopAudioStream();
    },

    computed:
    {
        ...mapGetters({
            isLoading: 'companyBeneficiaryCall/isLoading',
            accessUser: 'auth/accessUser',
            beneficiary: 'companyBeneficiary/selected',
        }),

        fullName()
        {
            return `${this.beneficiary.full_name}`;
        },

        initials()
        {
            return `${this.beneficiary.first_name[0]}${this.beneficiary.last_name[0]}`;
        },

        company()
        {
            return this.accessUser.company;
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
            this.audioInputOptions = [];
            this.audioOutputOptions = [];

            this.audioLoading = true;

            let constraints = (window.constraints = {
                audio: true,
            });

            await navigator.mediaDevices.enumerateDevices()
                .then(mediaDevices => {
                    // let count = 1;
                    mediaDevices.forEach(mediaDevice => {
                        if (mediaDevice.kind == 'audioinput')
                        {
                            this.audioInputOptions.push({
                                label: mediaDevice.label || `Audio / Microphone ${this.audioInputOptions.length++}`,
                                deviceId: mediaDevice.deviceId,
                            })
                        }

                        if (mediaDevice.kind == 'audiooutput')
                        {
                            this.audioOutputOptions.push({
                                label: mediaDevice.label || `Speaker ${this.audioOutputOptions.length++}`,
                                deviceId: mediaDevice.deviceId,
                            })
                        }
                    });

                    // this.currentAudioInput = this.audioInputOptions[0].deviceId;
                    // this.currentAudioOutput = this.audioOutputOptions[0].deviceId;

                    // constraints.audio = {
                    //     deviceId:
                    //     {
                    //         exact: this.currentAudioInput
                    //     }
                    // };
                });

            await navigator.mediaDevices.getUserMedia(constraints)
                .then(stream => {
                    this.audioLoading = false;
                    this.currentStream = stream;
                    this.audioPermissionAllowed = true;
                    
                    this.audioContext = new AudioContext();
                    this.analyser = this.audioContext.createAnalyser();
                    this.microphone = this.audioContext.createMediaStreamSource(stream);
                    this.scriptProcessor = this.audioContext.createScriptProcessor(2048, 1, 1);

                    this.analyser.smoothingTimeConstant = 0.8;
                    this.analyser.fftSize = 1024;

                    this.microphone.connect(this.analyser);
                    this.analyser.connect(this.scriptProcessor);
                    this.scriptProcessor.connect(this.audioContext.destination);

                    this.scriptProcessor.onaudioprocess = () => {
                        const array = new Uint8Array(this.analyser.frequencyBinCount);
                        this.analyser.getByteFrequencyData(array);
                        const arraySum = array.reduce((a, value) => a + value, 0);
                        const average = arraySum / array.length;
                        
                        this.volume = Math.round(average);
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.audioLoading = false;
                    this.audioPermissionAllowed = false;
                });
        },

        async changeStream(event)
        {
            this.stopAudioStream();

            this.audioLoading = true;

            let deviceId = event.target.value;

            let constraints = (window.constraints = {
                audio: true,
            });

            constraints.audio = {
                deviceId: {
                    exact: deviceId
                }
            };

            await navigator.mediaDevices
                .getUserMedia(constraints)
                .then(stream => {
                    this.currentStream = stream;
                    
                    this.audioContext = new AudioContext();
                    this.analyser = this.audioContext.createAnalyser();
                    this.microphone = this.audioContext.createMediaStreamSource(stream);
                    this.scriptProcessor = this.audioContext.createScriptProcessor(2048, 1, 1);

                    this.analyser.smoothingTimeConstant = 0.8;
                    this.analyser.fftSize = 1024;

                    this.microphone.connect(this.analyser);
                    this.analyser.connect(this.scriptProcessor);
                    this.scriptProcessor.connect(this.audioContext.destination);

                    this.scriptProcessor.onaudioprocess = () => {
                        const array = new Uint8Array(this.analyser.frequencyBinCount);
                        this.analyser.getByteFrequencyData(array);
                        const arraySum = array.reduce((a, value) => a + value, 0);
                        const average = arraySum / array.length;
                        
                        this.volume = Math.round(average);
                    }
                })
                .catch(error => {
                    console.log(error);
                });

            this.audioLoading = false;
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

        async storeCallTransaction()
        {
            this.storeCallTransactionLoading = true;

            const response = await Http.post(
                `/my-company/call/transaction`,
                {
                    transaction_date: Dater.rawToday(),
                    mobile_number: this.beneficiary.mobile_no,
                    source: 'BENEFICIARY'
                }
            );

            this.storeCallTransactionLoading = false;

            if (response.status == 201)
            {
                this.currentCallTransaction = response.data;

                await this.loadAccessToken();

                await this.initDevice();

                await this.makeCall();
            }
            else if (response.status == 422)
            {
                this.errors = response.data.errors;

                this.currentCallStatus = 4;
            }
            else if (response.status === 403)
            {
                let message = 'Sorry, you cannot perform this action.';

                Toast.error({
                    message: response.data.error.description
                        ? response.data.error.description
                        : message,
                });

                this.currentCallStatus = 4;
            }
            else if (response.status === 404)
            {
                let message = 'Data not found. Please try again.';

                Toast.error({
                    message: response.data.error.description
                        ? response.data.error.description
                        : message,
                });

                this.currentCallStatus = 4;
            }
            else
            {
                let message = 'Something went wrong. Please try again.';

                Toast.error({
                    message: response.data.error.description
                        ? response.data.error.description
                        : message,
                });

                this.currentCallStatus = 4;
            }

        },
        
        async updateCallTransaction(event)
        {
            this.updateCallTransactionLoading = true;

            const response = await Http.put(
                `/my-company/call/transaction/${this.currentCallTransaction.slug.code}`,
                {
                    call_sid: event.parameters.CallSid,
                    source: 'beneficiary',
                    beneficiaryCode: this.beneficiary.slug.code,
                }
            );

            this.updateCallTransactionLoading = false;

            if (response.status == 200)
            {

            }
            else if (response.status == 422)
            {
                this.errors = response.data.errors;
            }
            else if (response.status === 403)
            {
                let message = 'Sorry, you cannot perform this action.';

                Toast.error({
                    message: response.data.error.description
                        ? response.data.error.description
                        : message,
                });
            }
            else if (response.status === 404)
            {
                let message = 'Data not found. Please try again.';

                Toast.error({
                    message: response.data.error.description
                        ? response.data.error.description
                        : message,
                });
            }
            else
            {
                let message = 'Something went wrong. Please try again.';

                Toast.error({
                    message: response.data.error.description
                        ? response.data.error.description
                        : message,
                });
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
                To: this.beneficiary.mobile_no,
                CompanyCode: this.accessUser.company.slug.code,
            }

            console.log(`Attempting to call ${params.To} ...`);

            // Twilio.Device.connect() returns a Call object
            const call = await this.device.connect({ params });

            this.currentCall = call;

            // add listeners to the Call
            // "accepted" means the call has finished connecting and the state is now "open"
            call.on("accept", (event) => {
                this.currentCallStatus = 1
                console.log('makeCall: ACCEPTED');

                this.updateCallTransaction(event);
            });

            call.on("ringing", (event) => {
                this.currentCallStatus = 2
                console.log('makeCall: RINGING');

                this.updateCallTransaction(event);
            });

            call.on("disconnect", (event) => {
                this.currentCallStatus = 3;
                console.log('makeCall: DISCONNECT');

                this.updateCallTransaction(event);
            });

            call.on("cancel", (event) => {
                this.currentCallStatus = 4;
                console.log('makeCall: CANCEL');

                this.updateCallTransaction(event);
            });

        },

        async endCall()
        {
            console.log('Ending call...');

            this.closeModal();
        },

        async initialize()
        {
            await this.startAudioStream();

            await this.storeCallTransaction();
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
