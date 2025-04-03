<template>
    <li class="nav-item dropdown dropdown-large ap-margin-xsmall-right">
        <a class="dropdown-toggle dropdown-toggle-nocaret position-relative" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <div class="ap-card ap-card-body ap-card-primary"
                :style="{padding: '2px 8px !important'}"
                v-if="isCompany">
                <ap-grid :gutter="'small'"
                    class="ap-flex-middle">
                    <div class="ap-width-fit-content">
                        <i class="bx bx-message-detail ap-text-inverse" :style="{ fontSize: '25px'}"></i>
                    </div>
                    <div class="ap-width-expand">
                        <small :style="{ fontSize: '8px !important'}">
                            SMS CREDIT
                        </small>
                        <p class="ap-margin-remove ap-text-inverse">
                            {{ smsCredit }}
                        </p>
                    </div>
                </ap-grid>
            </div>
        </a>

        <div class="dropdown-menu dropdown-menu-end">
            <div class="ap-padding-small ap-text-center">

                <small>
                    SMS CREDIT
                </small>

                <h4 class="ap-margin-remove ap-text-bold ap-text-primary"
                    v-if="isCompany">
                    {{ smsCredit }}
                </h4>

                <hr class="ap-margin-top ap-margin-bottom">

                <p class="ap-margin-remove-top ap-text-italic ap-text-center">
                    To reload your credit balance, kindly contact <span class="ap-text-bold">Velcro Tech Philippines Inc.</span> to request.
                </p>

                <p class="ap-margin-remove-top ap-text-italic ap-text-center">
                    0910 842 5828 (Smart) <br />
                    0945 71 6376 (Globe)
                </p>
            </div>
        </div>
    </li>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

import Http from '@/services';

import { Text } from '@/utils';

export default
{
    name: 'SmsCredit',

    computed:
    {
        ...mapGetters({
            accessUser: 'auth/accessUser',
            sidebar: 'layout/sidebar',
        }),

        smsCredit()
        {
            return Text.currency(this.accessUser.company.sms_credit);
        },

        isCompany()
        {
            return this.accessUser.account_type.id == 2;
        },


    }
}

</script>