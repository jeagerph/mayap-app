import Vue from 'vue';
import VueToast from 'vue-toast-notification';
// import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast);

export const Toast = {
    success: (data) =>
    {
        let form = {
            message: data.message,
            type: 'success',
            position: 'bottom-right',
            duration: 5000,
        };

        Toast.fire(form);
    },

    error: (data) =>
    {
        let form = {
            message: data.message,
            type: 'error',
            position: 'bottom-right',
            duration: 5000,
        };

        Toast.fire(form);
    },

    fire: (data) =>
    {
        Vue.$toast.open({
            message: data.message,
            type: data.type,
            position: data.position,
            duration: data.duration,
        });
    },
};
