import Http from '@/services';

export const baseActions = {

    load: async ({ commit }, url) =>
    {
        commit('setLoading', { action: 'index', boolean: true });

        const response = await Http.get(url);

        commit('setLoading', { action: 'index', boolean: false });

        if (response.status === 200) commit('setLoad', response.data);

        return response;
    },

    loadMore: async ({commit}, url) => 
    {
        commit('setLoading', { action: 'more', boolean: true });

        let response = await Http.get(url);
        
        commit('setLoading', { action: 'more', boolean: false });

        if (response.status === 200) commit('appendBulk', response.data);

        return response;
    },

    show: async ({ commit }, url) =>
    {
        commit('setLoading', { action: 'show', boolean: true });

        const response = await Http.get(url);

        commit('setLoading', { action: 'show', boolean: false });

        if (response.status === 200) commit('setSelected', response.data);

        return response;
    },

    edit: async ({ commit }, url) =>
    {
        commit('setLoading', { action: 'edit', boolean: true });

        const response = await Http.get(url);

        commit('setLoading', { action: 'edit', boolean: false });

        if (response.status === 200) commit('setEditForm', response.data);

        return response;
    },

    store: async ({ commit }, { url, form }) =>
    {
        commit('setLoading', { action: 'store', boolean: true });

        const response = await Http.post(url, form);

        commit('setLoading', { action: 'store', boolean: false });

        if (response.status === 200 || response.status === 201) commit('prepend', response.data);

        return response;
    },

    update: async ({ commit }, { url, form }) =>
    {
        commit('setLoading', { action: 'update', boolean: true });

        const response = await Http.put(url, form);

        commit('setLoading', { action: 'update', boolean: false });

        if (response.status === 200)
        {
            commit('update', response.data);
        }

        return response;
    },

    updateStatus: async ({ commit }, url) =>
    {
        commit('setLoading', { action: 'update', boolean: true });

        const response = await Http.get(url);

        commit('setLoading', { action: 'update', boolean: false });

        if (response.status === 200)
        {
            commit('update', response.data);
        }

        return response;
    },

    destroy: async ({ commit }, { url, item }) =>
    {
        commit('setLoading', { action: 'delete', boolean: true });

        const response = await Http.delete(url);

        commit('setLoading', { action: 'delete', boolean: false });

        if (response.status === 200) commit('remove', item);

        return response;
    },

    select: ({ commit }, item) =>
    {
        commit('setSelected', item);
    },

    unsetItems: ({ commit }) =>
    {
        const obj = {
            total: 0,
            to: 1,
            from: 15,
            currentPage: 1,
            nextPage: null,
            lastPage: 1,
            data: [],
        };

        commit('setLoad', obj);
    },

    unsetSelected: ({ commit }) =>
    {
        commit('setSelected', {});
    },

    updateUrl: ({ commit }, url) =>
    {
        commit('setUrl', url);
    },

    loadPrerequisite: async ({ commit }, module) =>
    {
        commit('setLoading', { action: module.action, boolean: true });

        const response = await Http.get(module.url);

        commit('setLoading', { action: module.action, boolean: false });

        if (response.status === 200) commit('setPrerequisite', { state: module.action, items: response.data.data });

        return response;
    },

    storePrerequisite: async ({ commit }, module) =>
    {
        commit('setLoading', { action: module.loading, boolean: true });

        const response = await Http.post(module.url, module.form);

        commit('setLoading', { action: module.loading, boolean: false });

        if (response.status === 201) commit('appendPrerequisite', { state: module.state, item: response.data });

        return response;
    },

    loadObject: async ({ commit }, module) =>
    {
        commit('setLoading', { action: module.action, boolean: true });

        const response = await Http.get(module.url);

        commit('setLoading', { action: module.action, boolean: false });

        if (response.status === 200) commit('setObject', { state: module.action, data: response.data });

        return response;
    },

    selectObject: async ({ commit}, module) =>
    {
        commit('setObject', { state: module.state, data: module.data });
    },
};
