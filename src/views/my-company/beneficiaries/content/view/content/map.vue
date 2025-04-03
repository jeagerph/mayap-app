<template>
    <div class="card card-body ap-padding ap-text-center">
        
        <iframe
            style="width: 100%; height: 500px;"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            id="gmap_canvas"
            :src="`https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=${latitude},${longitude}&amp;t=&amp;z=19&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`">
        </iframe>

        <!-- <iframe
            style="width: 100%; height: 500px; border:0;"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            :src="`https://www.google.com/maps/embed/v1/place?key=AIzaSyAcGuC-uH8JW9U2yVZjHI96btYlKw_qMfY&q=${beneficiary.address} OR 107 Fendler St. East Tapinac, Olongapo City`">
        </iframe> -->
    </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default
{
    computed:
    {
        ...mapGetters({
            beneficiary: 'companyBeneficiary/selected',
            isLoading: 'companyBeneficiary/isLoading',
        }),

        latitude()
        {
            return parseFloat(this.beneficiary.latitude);
        },

        longitude()
        {
            return parseFloat(this.beneficiary.longitude);
        },
    },
}

</script>