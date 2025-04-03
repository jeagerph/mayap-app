import Vue from 'vue';
import { store } from '../stores';

Vue.directive('permit', {
    bind(el, binding, vnode)
    {
        let hasPermission = true;

        let accessUser = store.getters['auth/accessUser'];

        if (accessUser.account_type.id == 1) return true;

        const permissions = accessUser.permissions;

        const action = binding.arg;

        const bindValue = binding.value;

        if (typeof bindValue === 'string')
        {
            const permission = permissions.find(row => row.module.route_name == bindValue);

            hasPermission = permission && permission[action];
        }

        else if (typeof bindValue === 'object')
        {
            for(let i in bindValue)
            {
                const permission = permissions.find(row => row.module.route_name == bindValue[i]);

                hasPermission = permission && permission[action];

                if (hasPermission) break;
            }
        }
        
        if (!hasPermission) el.style.display = 'none';
    }
});