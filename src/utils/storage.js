export const Storage = {
    get: (name) =>
    {
        return localStorage.getItem(name);
    },

    set: (key, value) =>
    {
        localStorage.setItem(key, value);
    },

    destroy: (name) =>
    {
        localStorage.removeItem(name);
    },
};
