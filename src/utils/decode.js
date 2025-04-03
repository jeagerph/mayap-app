export const Decode = function (data)
{
    return process.env.APP_BASE64 ? JSON.parse(atob(data)) : data;
};
