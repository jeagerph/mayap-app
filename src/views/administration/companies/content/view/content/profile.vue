<template>
    <div class="card card-body ap-padding">

        <div class="ap-text-center">
            <a class="ap-link-reset ap-point ap-margin-xsmall-right"
                v-if="!isLoading('show')"
                @click="openModal('updateLogo')">
                <ap-avatar
                    :shape="'circle'"
                    :src="company.logo"
                    :label="'L'"
                    :size="'large'" />
            </a>
            <a class="ap-link-reset ap-point ap-margin-xsmall-right"
                v-if="!isLoading('show')"
                @click="openModal('updateSubLogo')">
                <ap-avatar
                    :shape="'circle'"
                    :src="company.sub_logo"
                    :label="'SL'"
                    :size="'large'" />
            </a>

            <div v-else>
                <ap-placeholder
                    class="ap-placeholder-image-circle ap-margin-xsmall-right"
                    :type="'image'"
                    :width="'96px'"
                    :height="'96px'" />
                <ap-placeholder
                    class="ap-placeholder-image-circle ap-margin-xsmall-right"
                    :type="'image'"
                    :width="'96px'"
                    :height="'96px'" />
            </div>

            

            <div class="ap-margin-top">
                <h4 class="ap-margin-remove"
                    v-if="!isLoading('show')">
                    {{company.name}}
                </h4>
                <ap-placeholder
                    class="ap-margin-xsmall-top"
                    v-else
                    :size="'medium'" />
            </div>

            <div class="ap-margin-small-top">
                <a class="ap-link-reset ap-point"
                    v-if="!isLoading('show')"
                    @click="openModal('updateStatus')">
                    <div 
                        class="badge"
                        :class="statusClass">
                        {{statusName}}
                    </div>
                </a>
                <ap-placeholder
                    v-else
                    :size="'small'" />
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
                    <h6 v-if="!isLoading('show')">
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
                    <h6 v-if="!isLoading('show')">
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
            v-if="!isLoading('show') && showDetails">
            <router-link
                data-tooltip="Update"
                class="ap-button ap-button-outline-warning ap-button-small ap-button-full-rounded ap-margin-xsmall-right"
                :to="`/administration/companies/${slugCode}/edit`">
                <i class="lni lni-pencil"></i>
            </router-link>
            <ap-button
                data-tooltip="Delete"
                class=""
                :color="'danger'"
                :size="'small'"
                :outline="true"
                :rounded="true"
                @click="openModal('delete')">
                <i class="lni lni-trash"></i>
            </ap-button>
        </div>

        <a class="ap-text-center ap-margin-top ap-point"
            v-if="!isLoading('show')"
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
            company: 'adminCompany/selected',
            isLoading: 'adminCompany/isLoading',
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
