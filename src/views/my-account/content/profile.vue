<template>
    <div class="card card-body ap-padding">

        <div class="ap-text-center">
            <a class="ap-link-reset ap-point"
                @click="openModal('updateAvatar')">
                <ap-avatar
                    :shape="'circle'"
                    :outline="true"
                    :src="photo"
                    :label="initials"
                    :size="'xlarge'" />
            </a>

            <h4 class="ap-margin-remove">
                {{fullName}}
            </h4>

            <p class="ap-margin-remove">
                {{accountTypeName}}
            </p>

            <div class="ap-margin-small-top">
                <ap-button
                    data-tooltip="Update Account"
                    class="ap-margin-xsmall-right"
                    :color="'warning'"
                    :size="'small'"
                    :outline="true"
                    @click="openModal('update')">
                    <i class="lni lni-pencil"></i>
                </ap-button>
                <ap-button
                    data-tooltip="Change Password"
                    :color="'warning'"
                    :size="'small'"
                    :outline="true"
                    @click="openModal('updatePassword')">
                    <i class="lni lni-lock"></i>
                </ap-button>
            </div>
        </div>

        <hr>

        <p class="ap-margin-xsmall-bottom">
            <i class="lni lni-user ap-margin-right"></i> {{userName}}
        </p>

        <p class="ap-margin-xsmall">
            <i class="lni lni-mobile ap-margin-right"></i>
            <span v-if="accessUser.mobile_number">
                {{accessUser.mobile_number}}
            </span>
            <span class="ap-text-italic" v-else>
                No mobile number
            </span>
        </p>

        <p class="ap-margin-xsmall">
            <i class="lni lni-envelope ap-margin-right"></i>
            <span v-if="accessUser.email">
                {{accessUser.email}}
            </span>
            <span class="ap-text-italic" v-else>
                No email
            </span>
        </p>

        <p class="ap-margin-xsmall">
            <i class="lni lni-key ap-margin-right"></i> {{accessUser.user.pin}}
        </p>
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
        }),

        fullName()
        {
            return `${this.accessUser.full_name}`;
        },

        userName()
        {
            return this.accessUser.user.username;
        },

        accountTypeName()
        {
            return `${this.accessUser.account_type.name}`;
        },

        photo()
        {
            return this.accessUser.photo;
        },

        initials()
        {
            return `${this.accessUser.full_name[0]}`;
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
