<template>
    <ul class="metismenu" id="menu">
        <li class="menu-label">
            MENU
        </li>

        <li
            :class="{ 'mm-active': beneficiariesDropdown }">
            <a class="has-arrow ap-point" @click="toggleDropdown('beneficiaries')">
                <div class="parent-icon"><i class='bx bx-user'></i>
                </div>
                <div class="menu-title">
                    {{ appBeneficiaryName }}
                </div>
            </a>
            <ul
                :class="beneficiariesClass">

                <router-link
                    tag="li"
                    to="/company/beneficiaries">
                    <a>
                        <i class='bx bx-right-arrow-alt'></i> List
                    </a>
                </router-link>
                <router-link
                    tag="li"
                    to="/company/beneficiaries/map">
                    <a>
                        <i class='bx bx-right-arrow-alt'></i> Mapping
                    </a>
                </router-link>
            </ul>
        </li>

        <li
            :class="{ 'mm-active': assistancesDropdown }">
            <a class="has-arrow ap-point" @click="toggleDropdown('assistances')">
                <div class="parent-icon"><i class='bx bx-user-check'></i>
                </div>
                <div class="menu-title">
                    Assistances
                </div>
            </a>
            <ul
                :class="assistancesClass">

                <router-link
                    tag="li"
                    to="/company/assistances">
                    <a>
                        <i class='bx bx-right-arrow-alt'></i> List
                    </a>
                </router-link>
                <router-link
                    tag="li"
                    to="/company/assistances/mapping">
                    <a>
                        <i class='bx bx-right-arrow-alt'></i> Mapping
                    </a>
                </router-link>
            </ul>
        </li>

        <router-link
            tag="li"
            to="/company/patients">
            <a>
                <div class="parent-icon"><i class="bx bx-user-pin"></i>
                </div>
                <div class="menu-title">Patients</div>
            </a>
        </router-link>

        <router-link
            tag="li"
            to="/company/voters">
            <a>
                <div class="parent-icon"><i class="bx bx-user-circle"></i>
                </div>
                <div class="menu-title">Voters List</div>
            </a>
        </router-link>

        <!-- <router-link
            tag="li"
            to="/company/incentives">
            <a>
                <div class="parent-icon"><i class="bx bx-award"></i>
                </div>
                <div class="menu-title">Incentives</div>
            </a>
        </router-link> -->


        <li class="menu-label">
            BARANGAYS
        </li>

        <router-link
            tag="li"
            to="/company/monitoring/barangays">
            <a>
                <div class="parent-icon"><i class='bx bx-detail'></i>
                </div>
                <div class="menu-title">
                    Monitoring
                </div>
            </a>
        </router-link>

        <li class="menu-label">
            MANAGEMENT
        </li>

        <router-link
            tag="li"
            to="/company/dashboard">
            <a>
                <div class="parent-icon"><i class='bx bx-bar-chart-square'></i>
                </div>
                <div class="menu-title">
                    Dashboard
                </div>
            </a>
        </router-link>

        <router-link
            tag="li"
            to="/company/sms-transactions">
            <a>
                <div class="parent-icon"><i class='bx bx-message-detail'></i>
                </div>
                <div class="menu-title">SMS Transactions</div>
            </a>
        </router-link>

        <router-link
            tag="li"
            to="/company/accounts">
            <a>
                <div class="parent-icon"><i class='bx bx-user'></i>
                </div>
                <div class="menu-title">User Accounts</div>
            </a>
        </router-link>

        <li
            :class="{ 'mm-active': settingsDropdown }">
            <a class="has-arrow ap-point" @click="toggleDropdown('settings')">
                <div class="parent-icon"><i class='bx bx-cog'></i>
                </div>
                <div class="menu-title">
                    Settings
                </div>
            </a>
            <ul
                :class="settingsClass">

                <router-link
                    v-show="!isRobes"
                    tag="li"
                    to="/company/questionnaires">
                    <a>
                        <i class='bx bx-right-arrow-alt'></i> Questionnaires
                    </a>
                </router-link>

                <router-link
                    tag="li"
                    to="/company/classifications">
                    <a>
                        <i class='bx bx-right-arrow-alt'></i> Classifications
                    </a>
                </router-link>

                <router-link
                    tag="li"
                    to="/company/officer-classifications">
                    <a>
                        <i class='bx bx-right-arrow-alt'></i> Officer/Leader Classifications
                    </a>
                </router-link>

                <router-link
                    tag="li"
                    to="/company/assignatories">
                    <a>
                        <i class='bx bx-right-arrow-alt'></i> Assignatories
                    </a>
                </router-link>

                <router-link
                    tag="li"
                    to="/company/network/setting">
                    <a>
                        <i class='bx bx-right-arrow-alt'></i> Network
                    </a>
                </router-link>
            </ul>
        </li>

        <li
            :class="{ 'mm-active': templatesDropdown }">
            <a class="has-arrow ap-point" @click="toggleDropdown('templates')">
                <div class="parent-icon"><i class='bx bx-cog'></i>
                </div>
                <div class="menu-title">
                    Templates
                </div>
            </a>
            <ul
                :class="templatesClass">

                <router-link
                    tag="li"
                    to="/company/id-templates">
                    <a>
                        <i class='bx bx-right-arrow-alt'></i> ID
                    </a>
                </router-link>
                <router-link
                    tag="li"
                    to="/company/document-templates">
                    <a>
                        <i class='bx bx-right-arrow-alt'></i> DOCUMENT
                    </a>
                </router-link>
            </ul>
        </li>

        <!-- <router-link
            tag="li"
            to="/company/accounts">
            <a>
                <div class="parent-icon"><i class='bx bx-user'></i>
                </div>
                <div class="menu-title">User Accounts</div>
            </a>
        </router-link> -->
    </ul>
    
</template>

<script>
import { mapGetters } from 'vuex';

export default
{
    data()
    {
        return {
            settingsDropdown: false,
            settingsClass: 'mm-collapse',

            templatesDropdown: false,
            templatesClass: 'mm-collapse',

            beneficiariesDropdown: false,
            beneficiariesClass: 'mm-collapse',

            assistancesDropdown: false,
            assistancesClass: 'mm-collapse',
        }
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

        isRobes()
        {
            return this.company.province_id == '0314';
        },

        isMayap()
        {
            return this.company.province_id == '0369';
        },

        appBeneficiaryName()
        {
            return process.env.APP_BENEFICIARY_PLURAL_NAME;
        },
    },

    methods:
    {
        toggleDropdown(name)
        {
            this[`${name}Class`] = 'mm-collapsing';
            
            let dropdown = this[`${name}Dropdown`];

            this[`${name}Dropdown`] = !dropdown;

            setTimeout(() => {
                if(this[`${name}Dropdown`])
                {
                    this[`${name}Class`] = 'mm-collapse mm-show';
                }
                else
                {
                    this[`${name}Class`] = 'mm-collapse';
                }
            }, 50);
            
        },
    }
}

</script>