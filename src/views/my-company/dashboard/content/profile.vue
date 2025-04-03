<template>
    <div class="card card-body ap-padding">

        <div class="ap-text-center">
            <a class="ap-link-reset ap-point ap-margin-xsmall-right"
                v-if="!isLoading('profile')"
                @click="openModal('updateLogo')">
                <ap-avatar
                    :shape="'circle'"
                    :src="company.logo"
                    :label="'L'"
                    :size="'large'" />
            </a>

            <ap-placeholder
                v-else
                class="ap-placeholder-image-circle ap-margin-xsmall-right"
                :type="'image'"
                :width="'96px'"
                :height="'96px'" />

            <a class="ap-link-reset ap-point ap-margin-xsmall-right"
                v-if="!isLoading('profile')"
                @click="openModal('updateSubLogo')">
                <ap-avatar
                    :shape="'circle'"
                    :src="company.sub_logo"
                    :label="'SL'"
                    :size="'large'" />
            </a>

            <ap-placeholder
                v-else
                class="ap-placeholder-image-circle ap-margin-xsmall-right"
                :type="'image'"
                :width="'96px'"
                :height="'96px'" />

            <div class="ap-margin-top">
                <h4 class="ap-margin-remove"
                    v-if="!isLoading('profile')">
                    {{company.name}}
                </h4>
                <ap-placeholder
                    class="ap-margin-xsmall-top"
                    v-else
                    :size="'medium'" />
            </div>
        </div>

        <div class="ap-margin-top"
            v-if="showDetails">

            <ap-grid :gutter="'small'"
                class="ap-margin-xsmall-top ap-flex-middle">
                <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                    <small>
                        ADDRESS
                    </small>
                </div>
                <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l ap-text-right">
                    <h6 v-if="!isLoading('profile')">
                        <span v-if="company.address">
                            {{company.address}}
                        </span>
                        <span v-else
                            class="vh-text-italic">
                            No address yet
                        </span>
                    </h6>
                    <ap-placeholder
                        v-else
                        :size="'small'" />
                </div>
            </ap-grid>

            <ap-grid :gutter="'small'"
                class="ap-margin-xsmall-top ap-flex-middle">
                <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                    <small>
                        CONTACT NO.
                    </small>
                </div>
                <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l ap-text-right">
                    <h6 v-if="!isLoading('profile')">
                        <span v-if="company.contact_no">
                            {{company.contact_no}}
                        </span>
                        <span v-else
                            class="vh-text-italic">
                            No contact yet
                        </span>
                    </h6>
                    <ap-placeholder
                        v-else
                        :size="'small'" />
                </div>
            </ap-grid>
        </div>

        <hr v-if="showDetails">

        <div class="ap-margin-top ap-text-center"
            v-if="!isLoading('profile') && showDetails">
            <ap-button
                data-tooltip="Update"
                class="ap-margin-xsmall-right"
                :color="'warning'"
                :size="'small'"
                :outline="true"
                @click="openModal('update')">
                <i class="lni lni-pencil ap-margin-small-right"></i> UPDATE
            </ap-button>
        </div>

        <a class="ap-text-center ap-margin-top ap-point"
            v-if="!isLoading('profile')"
            @click="showDetails = !showDetails">
            <small>
                <i class="lni ap-margin-xsmall-right" :class="showDetails ? 'lni-chevron-up':'lni-chevron-down'"></i>
                {{showDetails ? 'HIDE':'SHOW'}} DETAILS
            </small>
        </a>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default
{
    data()
    {
        return {
            showDetails: false,
        };
    },

    computed:
    {
        ...mapGetters({
            company: 'myCompany/profile',
            isLoading: 'myCompany/isLoading',
        }),

        slugCode()
        {
            return this.company.slug
                ? this.company.slug.code
                : 'DELETED'
        },

        statusClass()
        {
            return {
                'bg-success': this.company.status,
                'bg-warning': !this.company.status
            }
        },

        statusName()
        {
            return this.company.status ? 'ACTIVE' : 'SUSPENDED';
        },
    },

    methods:
    {
        openModal(name)
        {
            this.$parent.toggleModal(name, true);
        },
    },
}
</script>
