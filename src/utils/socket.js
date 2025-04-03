import Echo from 'laravel-echo';
import socketIoClient from 'socket.io-client';
import store from '@/stores';

export const Socket = {

    initialize: (token) =>
    {
        if(process.env.APP_SOCKET_CONNECTION && process.env.APP_SOCKET_CONNECTION != 'false')
        {
            window.io = socketIoClient;

            window.Echo = new Echo({
                broadcaster: 'socket.io',
                host: `${process.env.API_URL}:${process.env.SOCKET_PORT}`,
                auth:
                {
                    headers:
                    {
                        Authorization: token,
                    },
                }
            });

            if(process.env.APP_ENVIRONMENT === 'development') console.log('Socket init is set!');
        }
    },

    setPublic: () =>
    {
        if(process.env.APP_SOCKET_CONNECTION && process.env.APP_SOCKET_CONNECTION != 'false')
        {
            window.io = socketIoClient;

            window.Echo.channel('announcement-channel')
                .listen('.announcement-event', (e) => {
                    console.log(e);
                });

            if(process.env.APP_ENVIRONMENT === 'development') console.log('Public socket is set!');
        }
    },

    setUser: (userCode) =>
    {
        if(process.env.APP_SOCKET_CONNECTION && process.env.APP_SOCKET_CONNECTION != 'false')
        {
            window.Echo.private(`App.Models.User.${userCode}`)
                .notification((notification) => {
                    if(process.env.APP_ENVIRONMENT === 'development') console.log(notification);

                    // store.dispatch('myAccountNotification/receive', notification);

            });

            if(process.env.APP_ENVIRONMENT === 'development') console.log(`Private channel for ${userCode} is set!`);

        }
    },

    setEvent: (channel, listensTo, callback) =>
    {
        if(process.env.APP_SOCKET_CONNECTION && process.env.APP_SOCKET_CONNECTION != 'false')
        {
            window.Echo.private(channel)
                .listen(listensTo, (response) => {
                    if(process.env.APP_ENVIRONMENT === 'development') console.log(response);

                    callback(response);

            });

            if(process.env.APP_ENVIRONMENT === 'development') console.log(`Private channel ${channel} is set!`);
            if(process.env.APP_ENVIRONMENT === 'development') console.log(`Private channel listens to ${listensTo} !`);

        }
    },

    setWhisper: (channel, whisper, data) =>
    {
        if(process.env.APP_SOCKET_CONNECTION && process.env.APP_SOCKET_CONNECTION != 'false')
        {
            window.Echo.private(channel)
                .whisper(whisper, data);

            if(process.env.APP_ENVIRONMENT === 'development') console.log(`Whispered to private channel ${channel} !`);

        }
    },

    setWhisperListener: (channel, whisper, callback) =>
    {
        if(process.env.APP_SOCKET_CONNECTION && process.env.APP_SOCKET_CONNECTION != 'false')
        {
            window.Echo.private(channel)
                .listen(`.client-${whisper}`, (response) => {
                    if(process.env.APP_ENVIRONMENT === 'development') console.log(response);

                    callback(response);

            });

            if(process.env.APP_ENVIRONMENT === 'development') console.log(`Whisper listener to private channel ${channel} is set!`);

        }
    },

    leaveChannel: (channel) =>
    {
        if(process.env.APP_SOCKET_CONNECTION && process.env.APP_SOCKET_CONNECTION != 'false')
        {
            window.Echo.leave(channel);

            if(process.env.APP_ENVIRONMENT === 'development') console.log(`${channel} channel unsubscribed.`);
        }
    },
};
