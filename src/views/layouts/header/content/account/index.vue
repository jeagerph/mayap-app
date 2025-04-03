<template>
    <div class="user-box dropdown">
        <a class="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"
            :class="{ 'show': dropdown }"
            @click="dropdown = !dropdown">
            <ap-avatar
                class="user-img"
                :src="accessUser.photo"
                :label="initials" />

            <div class="user-info ps-3">
                <p class="user-name mb-0">{{fullName}}</p>
                <p class="designattion mb-0">
                    <span v-if="this.accessUser.account_type.id == 2">
                        {{companyPosition}}
                    </span>
                    <span v-else>
                        {{accountTypeName}}
                    </span>
                </p>
            </div>
        </a>
        <ul class="dropdown-menu dropdown-menu-end"
            :class="{ 'show': dropdown }">
            <router-link
                tag="li"
                to="/my-account">
                <a class="dropdown-item">
                    <i class="bx bx-user"></i>
                    <span>My Account</span>
                </a>
            </router-link>
            <li>
                <div class="dropdown-divider mb-0"></div>
            </li>
            <li>
                <a class="dropdown-item ap-point"
                    @click="openModal('logout')">
                    <i class='bx bx-log-out-circle'></i><span>Logout</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default
{
    data()
    {
        return {
            dropdown: false,
        };
    },

    mounted()
    {
        window.addEventListener('click', this.clickOutside);
    },

    computed:
    {
        ...mapGetters({
            accessUser: 'auth/accessUser',
        }),

        hasAccessUser()
        {
            return Object.keys(this.accessUser).length > 0;
        },

        initials()
        {
            return this.hasAccessUser
                ? this.accessUser.full_name && this.accessUser.full_name[0]
                : 'AA';
        },

        fullName()
        {
            return this.hasAccessUser
                ? this.accessUser.full_name
                : 'Default User';
        },
        
        accountTypeName()
        {
            return this.hasAccessUser
                ? this.accessUser.account_type.name
                : 'Adminstrator';
        },

        companyPosition()
        {
            return this.hasAccessUser
                ? this.accessUser.company_position.name
                : ''
        }
    },

    methods:
    {
        openModal(name)
        {
            this.$parent.toggleModal(name, true);
        },

        clickOutside(event)
        {
            this.dropdown = false;
        },
    },
};
</script>