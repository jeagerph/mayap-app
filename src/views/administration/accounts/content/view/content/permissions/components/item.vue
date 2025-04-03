<template>
    <tr>
        <td style="width: 25%;">
            <p class="ap-text-bold">
                {{item.name}}
            </p>
        </td>
        <td style="width: 15%;">
            <div v-if="!accessLoading">
                <input class="ap-checkbox" id="permission-access" type="checkbox"
                    :disabled="isSysAdmin"
                    v-model="form.access"
                    :true-value="1"
                    :false-value="0"
                    @change="toggle('access')">
            </div>
            <ap-loader
                v-else
                :color="'primary'"
                :size="'small'" />
        </td>
        <td style="width: 15%;">
            <div  v-if="!indexLoading">
                <input class="ap-checkbox" id="permission-index" type="checkbox"
                    :disabled="isSysAdmin"
                    v-model="form.index"
                    :true-value="1"
                    :false-value="0"
                    @change="toggle('index')">
            </div>
            <ap-loader
                v-else
                :color="'primary'"
                :size="'small'" />
        </td>
        <td style="width: 15%;">
            <div v-if="!storeLoading">
                <input class="ap-checkbox" id="permission-store" type="checkbox"
                    :disabled="isSysAdmin"
                    v-model="form.store"
                    :true-value="1"
                    :false-value="0"
                    @change="toggle('store')">
            </div>
            <ap-loader
                v-else
                :color="'primary'"
                :size="'small'" />
        </td>
        <td style="width: 15%;">
            <div v-if="!updateLoading">
                <input class="ap-checkbox" id="permission-update" type="checkbox"
                    :disabled="isSysAdmin"
                    v-model="form.update"
                    :true-value="1"
                    :false-value="0"
                    @change="toggle('update')">
            </div>
            <ap-loader
                v-else
                :color="'primary'"
                :size="'small'" />
        </td>
        <td style="width: 15%;">
            <div v-if="!destroyLoading">
                <input class="ap-checkbox" id="permission-destroy" type="checkbox"
                    :disabled="isSysAdmin"
                    v-model="form.destroy"
                    :true-value="1"
                    :false-value="0"
                    @change="toggle('destroy')">
            </div>
            <ap-loader
                v-else
                :color="'primary'"
                :size="'small'" />
        </td>
    </tr>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Http from '@/services';

import { Toast } from '@/utils';

export default
{
    props:
    {
        item: Object,
    },

    data()
    {
        return {
            form:
            {
                module_id: '',
                access: 0,
                index: 0,
                store: 0,
                update: 0,
                destroy: 0,
            },

            accessLoading: false,
            indexLoading: false,
            storeLoading: false,
            updateLoading: false,
            destroyLoading: false,
        };
    },

    created()
    {
        this.initialize();
    },

    computed:
    {
        ...mapGetters({
            account: 'adminAccount/selected',
            isLoading: 'adminAccount/isLoading',
        }),

        isSysAdmin()
        {
            return this.account.account_type.id === 1;
        },
    },

    methods:
    {
        initialize()
        {
            if (!this.isSysAdmin)
            {
                const permission = this.account.permissions.find(row => row.module.id == this.item.id);

                this.form.module_id = this.item.id;
                this.form.access = permission ? permission.access : 0;
                this.form.index = permission ? permission.index : 0;
                this.form.store = permission ? permission.store : 0;
                this.form.update = permission ? permission.update : 0;
                this.form.destroy = permission ? permission.destroy : 0;
            }
            else
            {
                this.form.module_id = this.item.id;
                this.form.access = 1;
                this.form.index = 1;
                this.form.store = 1;
                this.form.update = 1;
                this.form.destroy = 1;
            }
        },

        async toggle(action)
        {
            this[`${action}Loading`] = true;

            const response = await Http.put(
                `/administration/account/${this.$route.params.code}/permission`,
                this.form
            );

            this[`${action}Loading`] = false;

            if (response.status === 200 || response.status === 201)
            {
                this.form.access = response.data.access;
                this.form.index = response.data.index;
                this.form.store = response.data.store;
                this.form.update = response.data.update;
                this.form.destroy = response.data.destroy;
                
                Toast.success({
                    message: 'Permission has been updated.'
                });
            }
            else if (response.status === 422)
            {
                this.errors = response.data.errors;

                Toast.error({
                    message: 'Form validation. Please double check your form.',
                });
            }
            else if (response.status === 403)
            {
                let message = 'Sorry, you cannot perform this action.';

                Toast.error({
                    message: response.data.error.description
                        ? response.data.error.description
                        : message,
                });
            }
            else if (response.status === 404)
            {
                let message = 'Data not found. Please try again.';

                Toast.error({
                    message: response.data.error.description
                        ? response.data.error.description
                        : message,
                });
            }
            else
            {
                let message = 'Something went wrong. Please try again.';

                Toast.error({
                    message: response.data.error.description
                        ? response.data.error.description
                        : message,
                });
            }
        },
    },
};
</script>
