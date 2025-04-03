<template>
    <li>
        <div class="ap-card ap-card-body ap-padding-small ap-card-hover"
            :class="{ 'ap-box-shadow-small': showProfile}">
            <ap-grid :gutter="'small'"
                class="ap-flex-middle">
                <div class="ap-width-expand@m">
                    <ap-grid :gutter="'small'">
                        <div class="ap-width-fit-content">

                            <ap-avatar
                                :shape="'default'"
                                :src="item.photo"
                                :label="initials" />
                        </div>
                        <div class="ap-width-expand">
                            <h5 class="ap-margin-remove ap-point"
                                @click="toggle()">
                                {{fullName}}
                            </h5>
                            <p class="ap-margin-remove">
                                {{item.code}}
                                &middot;
                                {{item.gender.name}}
                                &middot;
                                {{age}} yrs old
                            </p>

                            <div class="ap-margin-top">
                                <small class="ap-text-italic">
                                    DATE OF REGISTRATION: <span class="ap-text-bold">{{dateRegistered}}</span>
                                </small>
                            </div>
                            
                        </div>
                    </ap-grid>
                </div>
                <div class="ap-text-right@m">
                    <div>
                        <span class="badge bg-secondary">
                            {{item.city.name}}, {{item.province.name}}
                        </span>
                    </div>
                    <div class="ap-margin-small-top">
                        <div class="badge bg-primary"
                            style="font-size: 14px;">
                            {{item.barangay.name}}
                        </div>
                    </div>

                    <div class="ap-margin-top">
                        <small class="ap-text-italic">
                            Created <ap-moment :datetime="item.created_at" />
                        </small>
                    </div>
                </div>
            </ap-grid>

            <div class="ap-margin-top ap-padding-small"
                style="background: #f6f6f6;"
                v-if="showProfile">

                <profile-component />

            </div>

            <ap-grid :gutter="'small'"
                class="ap-margin-top ap-margin-bottom">
                <div class="ap-width-expand@m">
                    <ap-button
                        class="dropdown-toggle ap-margin-small-left"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        :color="'primary'"
                        :size="'small'"
                        :outline="true"
                        :rounded="true">
                        CALL / SMS SERVICE
                    </ap-button>
                    <ul class="dropdown-menu" style="padding-left: 0px;">
                        <li><a class="dropdown-item ap-link-reset ap-point"  @click="openModal('call')">CALL</a></li>
                        <li><a class="dropdown-item ap-link-reset ap-point"  @click="openModal('sendBrandingMessage')">SMS ({{ smsSetting.sender_name }})</a></li>
                        <li><a class="dropdown-item" href="#" @click="openModal('sendRegularMessage')">SMS (REGULAR)</a></li>
                    </ul>
                </div>
            </ap-grid>

        </div>
    </li>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import Http from '@/services';

import { Dater } from '@/utils';

import ProfileComponent from './content/profile';

export default
{
    components:
    {
        ProfileComponent,
    },

    props:
    {
        item: Object,
    },

    data()
    {
        return {
            showProfile: false,
        };
    },

    computed:
    {
        ...mapGetters({
            resident: 'companyResident/selected',
            accessUser: 'auth/accessUser',
        }),

        company()
        {
            return this.accessUser.company;
        },

        smsSetting()
        {
            return this.company.sms_setting;
        },
        
        initials()
        {
            return `${this.item.first_name[0]}${this.item.last_name[0]}`;
        },

        fullName()
        {
            return `${this.item.last_name}, ${this.item.first_name} ${this.item.middle_name ? this.item.middle_name : ''}`;
        },

        age()
        {
            return Dater.age(this.item.date_of_birth);
        },

        slugCode()
        {
            return this.item.slug
                ? this.item.slug.code
                : 'DELETED'
        },

        hasProfile()
        {
            return Object.keys(this.profile).length > 0;
        },

        hasResident()
        {
            return Object.keys(this.resident).length > 0;
        },

        dateRegistered()
        {
            return Dater.format(this.item.date_registered);
        },
    },

    methods:
    {
        ...mapActions({
            select: 'companyResident/select',
        }),

        toggle()
        {
            this.select(this.item);

            this.showProfile = !this.showProfile;
        },

        openModal(name)
        {
            this.select(this.item);

            this.$parent.toggleModal(name, true);
        },
    },
};
</script>
