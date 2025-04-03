const url = require('url');
const path = require('path');

export const Screen = {
    formUrl: (file, isDevelopment) =>
    {
        return isDevelopment
            ? `${process.env.PWD}/public/${file}`
            : `${__dirname}/${file}`;
        // return isDevelopment
        //     ? `${process.env.PWD}/public/${file}`
        //     : url.format({
        //         pathname: path.join(__dirname, `./${file}`),
        //         protocol: 'file:',
        //         slashes: true
        //     });
    },

};
