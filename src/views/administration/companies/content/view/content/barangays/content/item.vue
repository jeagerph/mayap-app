<template>
    <li>
        <ap-grid
            :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">

                <ap-grid :gutter="'small'">
                    <div class="ap-width-fit-content">
                        <a class="ap-link-reset ap-point"
                            @click="openModal('updateCityLogo')">
                            <ap-avatar
                                :shape="'circle'"
                                :src="item.city_logo"
                                :label="item.city_name[0]" />
                        </a>
                        
                        <a class="ap-link-reset ap-point"
                            @click="openModal('updateBarangayLogo')">
                            <ap-avatar
                                :shape="'circle'"
                                :src="item.barangay_logo"
                                :label="item.barangay_name[0]" />
                        </a>
                    </div>
                    <div class="ap-width-expand">
                        <h5 class="ap-margin-remove">
                            BRGY {{item.barangay_name}}
                        </h5>
                        <small>
                            {{ item.city_name }}, {{ item.province_name }}
                        </small>
                    </div>
                </ap-grid>
            </div>
            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                <small class="ap-text-bold">
                    STATUS
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
            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l ap-text-right@m">
                <ap-button
                    :color="'warning'"
                    :size="'small'"
                    :outline="true"
                    :rounded="true"
                    @click="openModal('update')">
                    <i class="lni lni-pencil"></i>
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
        statusClass()
        {
            return {
                'bg-warning': !this.item.status,
                'bg-success': this.item.status
            };
        },

        statusName()
        {
            return this.item.status
                ? 'ACTIVE'
                : 'SUSPENDED';
        },
    },

    methods:
    {
        ...mapActions({
            select: 'adminCompanyBarangay/select',
        }),

        openModal(name)
        {
            this.select(this.item);

            this.$parent.toggleModal(name, true);
        },
    },
};
</script>
