import axios from 'axios';
import { Cookie, Dater } from '@/utils';

export const Token = {
    get: () =>
    {
        const accessToken = Cookie.get(process.env.APP_ACCESS_TOKEN);

        return accessToken;
    },

    set: (data) =>
    {
        if (data.access_token && data.refresh_token)
        {
            Cookie.set(process.env.APP_ACCESS_TOKEN, data.access_token, Dater.secToDays(data.expires_in));
            Cookie.set(process.env.APP_REFRESH_TOKEN, data.refresh_token, Dater.secToDays(data.expires_in));

            axios.defaults.headers.common.Authorization = `${data.token_type} ${data.access_token}`;
        }
    },

    destroy: () =>
    {
        Cookie.delete(process.env.APP_ACCESS_TOKEN);
        Cookie.delete(process.env.APP_REFRESH_TOKEN);
        delete axios.defaults.headers.common.Authorization;
    },
};
