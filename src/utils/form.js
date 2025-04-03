export const Form = {
    hasError: (object, name) =>
    {
        return Object.prototype.hasOwnProperty.call(object, name);
    },

    toData: (object) =>
    {
        const formData = new FormData();
        
        for(let key in object)
        {
            formData.append(key, object[key]);
        }

        return formData;
    },
};
