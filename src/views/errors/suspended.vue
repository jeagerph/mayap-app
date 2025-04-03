<template>
    <ap-grid
        :gutter="'small'">
        <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l"></div>
        <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">

            <div class="card card-body">
                <div class="ap-text-center">
                    <img src="/static/assets/images/logo/web-logo.png" width="300" height="300">
                </div>

                <hr>

                <div class="ap-margin-top">
                    <h4 class="ap-text-bold">
                        Your account is temporarily suspended.
                    </h4>

                    <p class="ap-margin-top">
                        We would like to reinstate your account but need your help to do that.
                    </p>

                    <p>
                        We sent a billing statement weeks ago but no response coming from your end.
                    </p>

                    <p>
                        Feel free to contact us to to enlighten you on the details.
                    </p>

                    <p class="ap-margin-medium-top">
                        Very truly yours,
                    </p>

                    <p class="ap-text-bold ap-margin-remove-bottom">
                        Velcro Tech Philippines
                    </p>
                    
                    <div class="ap-margin-top">
                        <small>
                            <span class="ap-text-italic">Mobile No.:</span>
                            <span class="ap-text-bold">0917 123 1481</span>
                        </small>
                    </div>
                    
                    <div>
                        <small>
                            <span class="ap-text-italic">E-mail:</span>
                            <span class="ap-text-bold">admin@velcrotech.ph</span>
                        </small>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l"></div>
    </ap-grid>
</template>

<script>
import { mapGetters } from 'vuex';

export default
{
    mounted()
    {
        this.initialize();
    },

    computed:
    {
        ...mapGetters({
            accessUser: 'auth/accessUser'
        }),
    },

    methods:
    {
        initialize()
        {
            if (this.accessUser.account_type.id == 2)
            {
                if (this.accessUser.barangay_profile.status == 1)
                {
                    return this.$router.push('/barangay/dashboard');
                }
            }
        },
    },
}
</script>