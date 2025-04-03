<template>
    <div class="ap-animate ap-animate-fade-in">
        <ap-grid :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">

                <profile-component />

            </div>

            <div class="ap-width-1-1@s ap-width-2-3@m ap-width-2-3@l">

                <activities-component />
                
            </div>
        </ap-grid>

        <update-modal />

        <update-password-modal />

        <update-avatar-modal />
        
    </div>
</template>

<script>
import ProfileComponent from './content/profile';
import ActivitiesComponent from './content/activities';

import UpdateModal from './components/modal/profile';
import UpdatePasswordModal from './components/modal/password';
import UpdateAvatarModal from './components/modal/avatar';

export default
{
    name: 'MyAccount',

    components:
    {
        ProfileComponent,
        ActivitiesComponent,
        UpdateModal,
        UpdatePasswordModal,
        UpdateAvatarModal,
    },

    data()
    {
        return {
            updateModal: false,
            updatePasswordModal: false,
            updateAvatarModal: false,
        };
    },

    created()
    {
        window.scrollTo(0,0);
    },

    methods:
    {
        toggleModal(name, bool)
        {
            this[`${name}Modal`] = bool;
        },
    },
};
</script>
