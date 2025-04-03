<template>
    <li>
        <ap-grid
            :gutter="'small'">
            <div class="ap-width-expand@m">

                <ap-grid :gutter="'small'">
                    <div class="ap-width-fit-content">
                        <a class="ap-link-reset ap-point"
                            @click="openModal('updatePhoto')">
                            <ap-avatar
                                :shape="'circle'"
                                :src="account.photo"
                                :label="account.full_name[0]" />
                        </a>
                        
                    </div>
                    <div class="ap-width-expand">
                        <h5 class="ap-margin-remove">
                            {{account.full_name}}
                        </h5>
                        <small>
                            {{item.company_position.name}}
                            &middot;
                            {{ account.user.username }}
                            &middot;
                            <span v-if="account.mobile_number">
                                {{account.mobile_number}}
                            </span>
                            <span v-else
                                class="ap-text-italic">
                                No mobile number
                            </span>
                            &middot;
                            <span v-if="account.email">
                                {{account.email}}
                            </span>
                            <span v-else
                                class="ap-text-italic">
                                No e-mail
                            </span>
                        </small>
                    </div>
                </ap-grid>
            </div>
            <div class="ap-text-right@m">
                <ap-button
                    :color="'warning'"
                    :size="'small'"
                    :outline="true"
                    :rounded="true"
                    @click="openModal('update')">
                    <i class="lni lni-pencil"></i>
                </ap-button>
                <ap-button
                    :data-tooltip="'Update Permissions'"
                    :color="'warning'"
                    :size="'small'"
                    :outline="true"
                    :rounded="true"
                    @click="openModal('updatePermissions')">
                    <i class="lni lni-flag"></i>
                </ap-button>
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
        account()
        {
            return this.item.account;
        },
    },

    methods:
    {
        ...mapActions({
            select: 'adminCompanyAccount/select',
        }),

        openModal(name)
        {
            this.select(this.item);

            this.$parent.toggleModal(name, true);
        },
    },
};
</script>
