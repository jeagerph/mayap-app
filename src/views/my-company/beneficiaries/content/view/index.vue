<template>
    <div class="ap-animate ap-animate-fade-in">
        
        <ap-grid :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">

                <profile-component />
                
                <map-component />

            </div>

            <div class="ap-width-1-1@s ap-width-2-3@m ap-width-2-3@l">
                <div class="ap-subnav-wrapper">
                    <ul class="ap-subnav ap-subnav-default ap-subnav-horizontal-scroll">
                        <li :class="{ 'ap-active': activeTab === 'information' }">
                            <a class="ap-point"
                                :class="{ 'ap-text-bold': activeTab === 'information' }"
                                @click="switchTab('information')">
                                <i class="lni lni-user ap-margin-small-right"></i> PERSONAL INFO
                            </a>
                        </li>

                        <li :class="{ 'ap-active': activeTab === 'families' }">
                            <a class="ap-point"
                                :class="{ 'ap-text-bold': activeTab === 'families' }"
                                @click="switchTab('families')">
                                <i class="lni lni-user ap-margin-small-right"></i> FAMILY/RELATIVES
                            </a>
                        </li>

                        <li :class="{ 'ap-active': activeTab === 'incentives' }">
                            <a class="ap-point"
                                :class="{ 'ap-text-bold': activeTab === 'incentives' }"
                                @click="switchTab('incentives')">
                                <i class="lni lni-certificate ap-margin-small-right"></i> INCENTIVES
                            </a>
                        </li>

                        <li :class="{ 'ap-active': activeTab === 'assistances' }">
                            <a class="ap-point"
                                :class="{ 'ap-text-bold': activeTab === 'assistances' }"
                                @click="switchTab('assistances')">
                                <i class="lni lni-users ap-margin-small-right"></i> ASSISTANCES
                            </a>
                        </li>

                        <li :class="{ 'ap-active': activeTab === 'patients' }">
                            <a class="ap-point"
                                :class="{ 'ap-text-bold': activeTab === 'patients' }"
                                @click="switchTab('patients')">
                                <i class="lni lni-users ap-margin-small-right"></i> PATIENTS
                            </a>
                        </li>

                        <li :class="{ 'ap-active': activeTab === 'documents' }">
                            <a class="ap-point"
                                :class="{ 'ap-text-bold': activeTab === 'documents' }"
                                @click="switchTab('documents')">
                                <i class="lni lni-certificate ap-margin-small-right"></i> DOCUMENTS
                            </a>
                        </li>

                        <li :class="{ 'ap-active': activeTab === 'messages' }">
                            <a class="ap-point"
                                :class="{ 'ap-text-bold': activeTab === 'messages' }"
                                @click="switchTab('messages')">
                                <i class="lni lni-envelope ap-margin-small-right"></i> MESSAGES
                            </a>
                        </li>

                        <li :class="{ 'ap-active': activeTab === 'calls' }">
                            <a class="ap-point"
                                :class="{ 'ap-text-bold': activeTab === 'calls' }"
                                @click="switchTab('calls')">
                                <i class="lni lni-phone ap-margin-small-right"></i> CALL HISTORY
                            </a>
                        </li>
                        
                        <!-- <li :class="{ 'ap-active': activeTab === 'attachments' }">
                            <a class="ap-point"
                                :class="{ 'ap-text-bold': activeTab === 'attachments' }"
                                @click="switchTab('attachments')">
                                <i class="lni lni-files ap-margin-small-right"></i> ATTACHMENTS
                            </a>
                        </li> -->
                        
                        <li :class="{ 'ap-active': activeTab === 'activities' }">
                            <a class="ap-point"
                                :class="{ 'ap-text-bold': activeTab === 'activities' }"
                                @click="switchTab('activities')">
                                <i class="lni lni-bolt ap-margin-small-right"></i> ACTIVITIES
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="card card-body">

                    <ul class="ap-switcher">
                        <li :class="{ 'ap-active': activeTab === 'information' }">

                            <information-component v-if="activeTab == 'information'" />

                        </li>

                        <li :class="{ 'ap-active': activeTab === 'families' }">

                            <families-component v-if="activeTab == 'families'" />

                        </li>

                        <li :class="{ 'ap-active': activeTab === 'incentives' }">

                            <incentives-component v-if="activeTab == 'incentives'" />

                        </li>

                        <li :class="{ 'ap-active': activeTab === 'assistances' }">

                            <assistances-component v-if="activeTab == 'assistances'" />

                        </li>

                        <li :class="{ 'ap-active': activeTab === 'patients' }">

                            <patients-component v-if="activeTab == 'patients'" />

                        </li>

                        <li :class="{ 'ap-active': activeTab === 'documents' }">

                            <documents-component v-if="activeTab == 'documents'" />

                        </li>

                        <li :class="{ 'ap-active': activeTab === 'messages' }">

                            <messages-component v-if="activeTab == 'messages'" />

                        </li>

                        <li :class="{ 'ap-active': activeTab === 'calls' }">

                            <calls-component v-if="activeTab == 'calls'" />

                        </li>

                        <li :class="{ 'ap-active': activeTab === 'activities' }">

                            <activities-component v-if="activeTab == 'activities'" />

                        </li>

                    </ul>
                </div>
            </div>
        </ap-grid>

        <update-photo-modal v-if="hasBeneficiary" />

        <delete-modal v-if="hasBeneficiary" />

        <send-branding-message-modal v-if="hasBeneficiary" />
        
        <send-regular-message-modal v-if="hasBeneficiary" />

        <!-- <call-modal v-if="hasBeneficiary" /> -->

        <update-officer-modal v-if="hasBeneficiary" />

        <update-voter-modal v-if="hasBeneficiary" />

        <generate-id-modal v-if="hasBeneficiary" />

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import ProfileComponent from './content/profile';
import MapComponent from './content/map';
import InformationComponent from './content/information';
import IncentivesComponent from './content/incentives';
import DocumentsComponent from './content/documents';
// import RelativesComponent from './content/relatives';
import FamiliesComponent from './content/families';
import PatientsComponent from './content/patients';
import MessagesComponent from './content/messages';
import CallsComponent from './content/calls';
import AssistancesComponent from './content/assistances';
import ActivitiesComponent from './content/activities';

import UpdatePhotoModal from './components/modals/update-photo';
import DeleteModal from './components/modals/delete';
import SendBrandingMessageModal from './components/modals/send-branding-message';
import SendRegularMessageModal from './components/modals/send-regular-message';
// import CallModal from './components/modals/call';
import UpdateOfficerModal from './components/modals/update-officer';
import UpdateVoterModal from './components/modals/update-voter';
import GenerateIdModal from './components/modals/generate-id';

export default
{
    name: 'ViewComponent',

    components:
    {
        ProfileComponent,
        MapComponent,
        InformationComponent,
        IncentivesComponent,
        DocumentsComponent,
        // RelativesComponent,
        FamiliesComponent,
        PatientsComponent,
        MessagesComponent,
        CallsComponent,
        AssistancesComponent,
        ActivitiesComponent,

        UpdatePhotoModal,
        DeleteModal,
        SendBrandingMessageModal,
        SendRegularMessageModal,
        // CallModal,
        UpdateOfficerModal,
        UpdateVoterModal,
        // GenerateDocumentModal,
        GenerateIdModal,
    },

    data()
    {
        return {
            activeTab: 'information',

            updatePhotoModal: false,
            deleteModal: false,
            sendBrandingMessageModal: false,
            sendRegularMessageModal: false,
            // callModal: false,
            updateOfficerModal: false,
            updateVoterModal: false,
            generateIDModal: false,
            generateDocumentModal: false,
            createIdentificationModal: false,
        };
    },

    created()
    {
        window.scrollTo(0,0);

        this.load();
    },

    computed:
    {
        ...mapGetters({
            beneficiary: 'companyBeneficiary/selected',
            isLoading: 'companyBeneficiary/isLoading',
        }),

        hasBeneficiary()
        {
            return Object.keys(this.beneficiary).length > 0;
        },
    },
    
    methods:
    {
        ...mapActions({
            show: 'companyBeneficiary/show',
            loadPrerequisite: 'companyBeneficiary/loadPrerequisite',
        }),

        async load()
        {
            await this.show(`/my-company/beneficiary/${this.$route.params.code}`);
        },

        switchTab(tab)
        {
            this.activeTab = tab;
        },

        toggleModal(name, bool)
        {
            this[`${name}Modal`] = bool;
        },
    },
}
</script>