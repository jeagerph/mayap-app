export const baseMutations = {

    append: (state, item) =>
    {
        state.items.push(item);
    },

    appendBulk: (state, items) =>
    {
        state.items = [...state.items, ...items.data];

        state.total = items.total;
        state.from = items.from;
        state.to = items.to;
        state.currentPage = items.current_page;
        state.nextPage = items.next_page_url;
        state.lastPage = items.last_page;
        state.path = items.path;
    },

    prepend: (state, item) =>
    {
        state.items.unshift(item);
    },

    prependBulk: (state, items) =>
    {
        state.items = [...items.data, ...state.items];
    },

    update: (state, item) =>
    {
        Object.assign(state.selected, item);
    },

    remove: (state, item) =>
    {
        state.items.splice(state.items.indexOf(item), 1);
    },

    setLoad: (state, items) =>
    {
        state.total = items.total;
        state.from = items.from;
        state.to = items.to;
        state.currentPage = items.current_page;
        state.nextPage = items.next_page_url;
        state.lastPage = items.last_page;
        state.path = items.path;

        state.items = items.data;
    },

    setEditForm: (state, item) =>
    {
        state.editForm = item;
    },

    setSelected: (state, item) =>
    {
        state.selected = item;
    },

    setLoading: (state, { action, boolean }) =>
    {
        state[`${action}Loading`] = boolean;
    },

    setUrl: (state, item) =>
    {
        state.url = item;
    },

    setPrerequisite: (state, module) =>
    {
        state[module.state] = module.items;
    },

    appendPrerequisite: (state, module) =>
    {
        state[module.state].push(module.item);
    },

    setObject: (state, module) =>
    {
        state[module.state] = module.data;
    },
};
