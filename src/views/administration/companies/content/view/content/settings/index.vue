<template>
    <div class="ap-animate ap-animate-fade-in">

        <div class="accordion" id="form-accordion">

            <div class="accordion-item">
                <h2 class="accordion-header" id="form-primary-sms-setting">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-form-primary-sms-setting" aria-expanded="false" aria-controls="collapse-form-primary-sms-setting">

                        <span>
                            <i class="lni lni-empty-file ap-margin-right"></i> SMS SETTING
                        </span>

                    </button>
                </h2>
                <div id="collapse-form-primary-sms-setting" class="accordion-collapse collapse" aria-labelledby="form-primary-sms-setting" data-bs-parent="#form-accordion" style="">
                    <div class="accordion-body">

                        <sms-setting-component />

                    </div>
                </div>
            </div>

            <div class="accordion-item">
                <h2 class="accordion-header" id="form-primary-call-setting">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-form-primary-call-setting" aria-expanded="false" aria-controls="collapse-form-primary-call-setting">

                        <span>
                            <i class="lni lni-empty-file ap-margin-right"></i> CALL SETTING
                        </span>

                    </button>
                </h2>
                <div id="collapse-form-primary-call-setting" class="accordion-collapse collapse" aria-labelledby="form-primary-call-setting" data-bs-parent="#form-accordion" style="">
                    <div class="accordion-body">

                        <call-setting-component />

                    </div>
                </div>
            </div>

            <div class="accordion-item">
                <h2 class="accordion-header" id="form-primary-network-setting">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-form-primary-network-setting" aria-expanded="false" aria-controls="collapse-form-primary-network-setting">

                        <span>
                            <i class="lni lni-empty-file ap-margin-right"></i> NETWORK SETTING
                        </span>

                    </button>
                </h2>
                <div id="collapse-form-primary-network-setting" class="accordion-collapse collapse" aria-labelledby="form-primary-network-setting" data-bs-parent="#form-accordion" style="">
                    <div class="accordion-body">

                        <network-setting-component />

                    </div>
                </div>
            </div>

            <div class="accordion-item">
                <h2 class="accordion-header" id="form-primary-id-setting">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-form-primary-id-setting" aria-expanded="false" aria-controls="collapse-form-primary-id-setting">

                        <span>
                            <i class="lni lni-empty-file ap-margin-right"></i> ID SETTING
                        </span>

                    </button>
                </h2>
                <div id="collapse-form-primary-id-setting" class="accordion-collapse collapse" aria-labelledby="form-primary-id-setting" data-bs-parent="#form-accordion" style="">
                    <div class="accordion-body">

                        <id-setting-component />

                    </div>
                </div>
            </div>

            <div class="accordion-item">
                <h2 class="accordion-header" id="form-primary-map-setting">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-form-primary-map-setting" aria-expanded="false" aria-controls="collapse-form-primary-map-setting">

                        <span>
                            <i class="lni lni-empty-file ap-margin-right"></i> MAP SETTING
                        </span>

                    </button>
                </h2>
                <div id="collapse-form-primary-map-setting" class="accordion-collapse collapse" aria-labelledby="form-primary-map-setting" data-bs-parent="#form-accordion" style="">
                    <div class="accordion-body">

                        <map-setting-component />

                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import SmsSettingComponent from '../sms-setting';
import CallSettingComponent from '../call-setting';
import NetworkSettingComponent from '../network-setting';
import IdSettingComponent from '../id-setting';
import MapSettingComponent from '../map-setting';

export default
{
    components:
    {
        SmsSettingComponent,
        CallSettingComponent,
        NetworkSettingComponent,
        IdSettingComponent,
        MapSettingComponent,
    },

    computed:
    {
        ...mapGetters({
            company: 'adminCompany/selected',
            smsSetting: 'adminCompany/smsSetting',
            callSetting: 'adminCompany/callSetting',
            isLoading: 'adminCompany/isLoading',
        }),

        
        hasSmsSetting()
        {
            return Object.keys(this.smsSetting).length > 0;
        },
        
        hasCallSetting()
        {
            return Object.keys(this.callSetting).length > 0;
        },
    },
};
</script>