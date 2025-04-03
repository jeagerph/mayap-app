import axios from 'axios';

/* Handles response from API resource */
axios.interceptors.response.use(
    response => response,
    (error) =>
    {
        if (!error.response)
        {
            console.log('AXIOS ERROR RESPONSE');
        }
        
        const errorResponse = error.response;

        return errorResponse;
    }
);

const Http = {
    request: (url, method, data = null) =>
    {
        let URI = `${process.env.APP_API_URL}/`;
            URI += `${process.env.APP_API_VERSION}`;
            URI += url;

        return axios({
            url: URI,
            method,
            data,
        });
    },

    get: (url) =>
        Http.request(url, 'GET')
            .then((response) =>
            {
                const httpResponse = response;

                if (process.env.APP_DEBUG) console.log(httpResponse);

                return httpResponse;
            })
            .catch((error) =>
            {
                const httpError = error.data;

                if (process.env.APP_DEBUG) console.log(httpError);

                return httpError;
            }),

    post: (url, data, method = 'POST') =>
        Http.request(url, method, data)
            .then((response) =>
            {
                const httpResponse = response;

                if (process.env.APP_DEBUG) console.log(httpResponse);
                
                return httpResponse;
            })
            .catch((error) =>
            {
                const httpError = error;
                
                if (process.env.APP_DEBUG) console.log(httpError);

                return httpError;
            }),
    put: (url, data, method = 'PUT') =>
        Http.request(url, method, data)
            .then((response) =>
            {
                const httpResponse = response;

                if (process.env.APP_DEBUG) console.log(httpResponse);

                return httpResponse;
            })
            .catch((error) =>
            {
                const httpError = error;

                if (process.env.APP_DEBUG) console.log(httpError);

                return httpError;
            }),
    
    delete: (url, data, method = 'DELETE') =>
        Http.request(url, method, data)
            .then((response) =>
            {
                const httpResponse = response;

                if (process.env.APP_DEBUG) console.log(httpResponse);

                return httpResponse;
            })
            .catch((error) =>
            {
                const httpError = error;

                if (process.env.APP_DEBUG) console.log(httpError);
                
                return httpError;
            }),
};

export default Http;