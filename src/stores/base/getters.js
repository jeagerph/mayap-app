export const baseGetters = {

    items: state => state.items,

    isLoading: state => action => state[`${action}Loading`],

    selected: state => state.selected,

    editForm: state => state.editForm,

    page(state)
    {
        return {
            total: state.total,
            from: state.from,
            to: state.to,
            currentPage: state.currentPage,
            nextPage: state.nextPage,
            lastPage: state.lastPage,
            path: state.path,
            url: state.url,
        };
    },
};
