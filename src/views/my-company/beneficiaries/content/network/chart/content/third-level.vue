<template>
    <li>
        <div class="level-3" :data-tooltip="beneficiary.full_name">
            <div class="ap-text-center">
                <ap-avatar
                    :color="'primary'"
                    :shape="'circle'"
                    :label="'AA'"
                    :size="'medium'"
                    :src="beneficiary.photo"
                    />
            </div>
        </div>
    </li>
</template>

<script>

import { Dater } from '@/utils';

export default
{
    props:
    {
        item: Object,
    },

    computed:
    {
        beneficiary()
        {
            return this.item.beneficiary;
        },

        age()
        {
            return Dater.age(this.beneficiary.date_of_birth);
        },
    }
}
</script>