<template>
    <div class="ap-animate ap-animate-fade-in">
        <div class="ap-text-center">

            <div v-if="!userPinLoading">
                <div v-if="hasUserPin">
                    <small>
                        ONE-TIME PIN (OTP)
                    </small>

                    <h3 class="ap-text-bold">
                        {{ userPin.otp }}
                    </h3>

                    <small class="ap-text-italic">
                        Created <ap-moment :datetime="userPin.created_at" />
                    </small>
                </div>
                <ap-card-empty
                    v-else
                    :label="'no OTP yet'" />
            </div>
            <ap-loader
                v-else
                :size="'medium'" />
            
        </div>
    </div>
</template>

<script>
import Http from '@/services';

export default
{
    data()
    {
        return {
            userPin: {},
            userPinLoading: false,
        };
    },
    
    created()
    {
        this.load();
    },

    computed:
    {
        hasUserPin()
        {
            return Object.keys(this.userPin).length > 0;
        },
    },

    methods:
    {
        async load()
        {
            this.userPinLoading = true;

            const response = await Http.get(`/administration/account/${this.$route.params.code}/user-pin/latest`);

            this.userPinLoading = false;

            if (response.status == 200)
            {
                this.userPin = response.data;
            }
        }
    },
}
</script>
