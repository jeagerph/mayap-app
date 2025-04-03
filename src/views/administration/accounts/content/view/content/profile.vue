<template>
    <div class="card card-body ap-padding">
        <div class="ap-text-center">
            <a class="ap-link-reset ap-point"
                v-if="!isLoading('show')"
                @click="openModal('updatePhoto')">
                <ap-avatar
                    :shape="'circle'"
                    :outline="true"
                    :src="photo"
                    :label="initials"
                    :size="'xlarge'" />
            </a>
            <ap-placeholder
                v-else
                class="ap-placeholder-image-circle"
                :type="'image'"
                :width="'120px'"
                :height="'120px'" />

            <h4 class="ap-margin-remove"
                v-if="!isLoading('show')">
                {{fullName}}
            </h4>
            <ap-placeholder
                class="ap-margin-xsmall-top"
                v-else
                :size="'medium'" />

            <p class="ap-margin-remove"
                v-if="!isLoading('show')">
                {{accountTypeName}}
            </p>
            <ap-placeholder
                class="ap-margin-xsmall-top"
                v-else
                :size="'small'" />

            <div class="ap-margin-small-top"
                v-if="!isLoading('show')">
                <router-link
                    data-tooltip="Update Profile"
                    class="ap-button ap-button-outline-warning ap-button-small ap-button-full-rounded ap-margin-xsmall-right"
                    :to="`/administration/accounts/${slugCode}/edit`">
                    <i class="lni lni-pencil"></i>
                </router-link>
                <ap-button
                    data-tooltip="Update Password"
                    class="ap-margin-xsmall-right"
                    :color="'warning'"
                    :size="'small'"
                    :outline="true"
                    :rounded="true"
                    @click="openModal('updatePassword')">
                    <i class="lni lni-key"></i>
                </ap-button>
                <ap-button
                    data-tooltip="Delete Account"
                    class=""
                    :color="'danger'"
                    :size="'small'"
                    :outline="true"
                    :rounded="true"
                    @click="openModal('delete')">
                    <i class="lni lni-trash"></i>
                </ap-button>
            </div>
        </div>

        <hr>

        <p class="ap-margin-xsmall-bottom"
            v-if="!isLoading('show')">
            <i class="lni lni-user ap-margin-right"></i> {{userName}}
        </p>
        <ap-placeholder
            v-else
            :size="'small'" />

        <p class="ap-margin-xsmall"
            v-if="!isLoading('show')">
            <i class="lni lni-mobile ap-margin-right"></i>
            <span v-if="account.mobile_number">
                {{account.mobile_number}}
            </span>
            <span class="ap-text-italic" v-else>
                No mobile number
            </span>
        </p>
        <ap-placeholder
            v-else
            class="ap-margin-xsmall-top"
            :size="'small'" />

        <p class="ap-margin-xsmall"
            v-if="!isLoading('show')">
            <i class="lni lni-envelope ap-margin-right"></i>
            <span v-if="account.email">
                {{account.email}}
            </span>
            <span class="ap-text-italic" v-else>
                No email
            </span>
        </p>
        <ap-placeholder
            v-else
            class="ap-margin-xsmall-top"
            :size="'small'" />

        <p class="ap-margin-xsmall"
            v-if="!isLoading('show')">
            <i class="lni lni-key ap-margin-right"></i> {{account.user.pin}}
        </p>
        <ap-placeholder
            v-else
            class="ap-margin-xsmall-top"
            :size="'small'" />

    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default
{
    computed:
    {
        ...mapGetters({
            accessUser: 'auth/accessUser',
            account: 'adminAccount/selected',
            isLoading: 'adminAccount/isLoading',
        }),

        fullName()
        {
            return `${this.account.full_name}`;
        },

        userName()
        {
            return this.account.user.username;
        },

        accountTypeName()
        {
            return this.account.account_type.name;
        },

        photo()
        {
            return this.account.photo;
        },

        initials()
        {
            return `${this.account.full_name[0]}`;
        },

        statusClass()
        {
            return this.account.user.locked
                ? 'badge-danger'
                : 'badge-success';
        },

        statusName()
        {
            return this.account.user.locked
                ? 'Locked'
                : 'Active';
        },

        slugCode()
        {
            return this.account.slug
                ? this.account.slug.code
                : 'DELETED'
        }
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
