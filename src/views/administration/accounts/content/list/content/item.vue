<template>
    <li>
        <ap-grid :gutter="'small'">
            <div class="ap-width-expand@m">
                <ap-grid :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                        <ap-grid :gutter="'small'">
                            <div class="ap-width-fit-content">
                                <router-link
                                    class="ap-link-reset"
                                    :to="`/administration/accounts/${item.slug.code}`">
                                    <ap-avatar
                                        :shape="'circle'"
                                        :src="item.photo"
                                        :label="initials" />
                                </router-link>
                            </div>
                            <div class="ap-width-expand">
                                <router-link
                                    :to="`/administration/accounts/${item.slug.code}`">
                                    <h5 class="ap-margin-remove">
                                        {{fullName}}
                                    </h5>
                                </router-link>
                                <small>
                                    <span v-if="item.account_type.id == 2">
                                        {{companyName.toUpperCase()}} &middot; {{accountTypeName}}
                                    </span>
                                    <span v-else>
                                        {{accountTypeName}}
                                    </span>
                                    &middot;
                                    {{item.user.username}}
                                </small>

                                
                            </div>
                        </ap-grid>
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                        <small class="ap-text-bold">Mobile No.</small>
                        <p class="ap-margin-xsmall-top">
                            <span v-if="item.mobile_number">
                                {{item.mobile_number}}
                            </span>
                            <span class="ap-text-italic" v-else>
                                No mobile number
                            </span>
                        </p>
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                        <small class="ap-text-bold">E-mail</small>
                        <p class="ap-margin-xsmall-top">
                            <span v-if="item.email">
                                {{item.email}}
                            </span>
                            <span class="ap-text-italic" v-else>
                                No email
                            </span>
                        </p>
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                        <small class="ap-text-bold">
                            Status
                        </small>
                        <div class="ap-margin-small-top">
                            <a class="ap-link-reset ap-point"
                                @click="openModal('updateStatus')">
                                <div class="badge"
                                    :class="statusClass">
                                    {{statusName}}
                                </div>
                            </a>
                        </div>
                    </div>
                </ap-grid>
            </div>
            <div class="ap-text-right@m">
                <router-link
                    :to="`/administration/accounts/${slugCode}/edit`"
                    class="ap-button ap-button-small ap-button-outline-warning ap-button-full-rounded">
                    <i class="lni lni-pencil"></i>
                </router-link>
                <ap-button
                    :color="'danger'"
                    :size="'small'"
                    :outline="true"
                    :rounded="true"
                    @click="openModal('delete')">
                    <i class="lni lni-trash"></i>
                </ap-button>
            </div>
        </ap-grid>
        
    </li>
</template>

<script>
import { mapActions } from 'vuex';
export default
{
    props:
    {
        item: Object,
    },

    computed:
    {
        initials()
        {
            return `${this.item.full_name[0]}`;
        },

        fullName()
        {
            return `${this.item.full_name}`
        },

        accountTypeName()
        {
            return this.item.account_type.name;
        },

        companyName()
        {
            return this.item.company;
        },

        statusClass()
        {
            return this.item.user.locked
                ? 'bg-danger'
                : 'bg-success';
        },

        statusName()
        {
            return this.item.user.locked
                ? 'Locked'
                : 'Active';
        },

        slugCode()
        {
            return this.item.slug
                ? this.item.slug.code
                : 'DELETED'
        },
    },

    methods:
    {
        ...mapActions({
            select: 'adminAccount/select',
        }),

        openModal(name)
        {
            this.select(this.item);

            this.$parent.toggleModal(name, true);
        },
    },
};
</script>
