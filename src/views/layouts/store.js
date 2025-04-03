export const layout = {

    namespaced: true,

    state:
    {
        hoveredSidebar: false,
        toggledSidebar: false,
    },

    mutations:
    {
        setSidebar: (state, { name, bool }) =>
        {
            state[`${name}Sidebar`] = bool;
        },
    },

    actions:
    {
        setSidebar({ commit }, { name, bool })
        {
            commit(
                'setSidebar',
                {
                    name: name,
                    bool: bool
                }
            );
        },
    },

    getters:
    {
        sidebar: state => name => state[`${name}Sidebar`],

    },
};
