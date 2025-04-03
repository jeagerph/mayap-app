<template>
    <div class="ap-margin-medium-top">
        <p class="ap-text-bold ap-text-primary">
            ACCOUNT REPRESENTATIVE
        </p>

        <hr>

        <ap-grid
            :gutter="'small'"
            class="ap-margin-top">
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                <div class="ap-margin">
                    <label class="ap-text-bold ap-form-label"
                        :class="{ 'ap-text-danger': hasError('company_position_id')}">
                        * Company Position
                    </label>

                    <select
                        v-if="!isLoading('positions')"
                        class="ap-select"
                        :required="true"
                        v-model="form.company_position_id"
                        :readonly="isLoading('store')">
                        <option :value="''" disabled>-- select position --</option>
                        <option v-for="(item, index) in positions"
                            :key="index"
                            :value="item.id">
                            {{item.name}}
                        </option>
                    </select>
                    <ap-placeholder v-else
                        :size="'medium'"/>

                    <small class="ap-text-bold ap-text-danger"
                        v-if="hasError('company_position_id')">
                        <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                        {{errors.company_position_id[0]}}
                    </small>
                </div>
            </div>
            <div class="ap-width-1-1@s ap-width-2-3@m ap-width-2-3@l">
                <ap-input
                    type="text"
                    :required="true"
                    :readonly="isLoading('store')"
                    :label="'* Full Name'"
                    :placeholder="'ex. JUAN DELA CRUZ'"
                    v-model="form.full_name"
                    :error="hasError('full_name') ? errors.full_name[0] : ''"/>
            </div>
        </ap-grid>

        <ap-grid
            :gutter="'small'"
            class="ap-margin-top">
            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <ap-input
                    type="text"
                    :readonly="isLoading('store')"
                    :label="'Mobile No.'"
                    :placeholder="'ex. 09XXXXXXXXX'"
                    v-model="form.mobile_number"
                    :error="hasError('mobile_number') ? errors.mobile_number[0] : ''"/>
            </div>
            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <ap-input
                    type="text"
                    :readonly="isLoading('store')"
                    :label="'E-mail'"
                    :placeholder="'ex. juan.delacruz@gmail.com'"
                    v-model="form.email"
                    :error="hasError('email') ? errors.email[0] : ''"/>
            </div>
        </ap-grid>

        <ap-grid
            :gutter="'small'"
            class="ap-margin-top">
            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <ap-input
                    type="text"
                    :required="true"
                    :readonly="isLoading('store')"
                    :label="'* Username'"
                    :placeholder="'ex. jde001'"
                    v-model="form.username"
                    :error="hasError('username') ? errors.username[0] : ''"/>
            </div>
            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <ap-input
                    type="text"
                    :disabled="true"
                    :readonly="isLoading('store')"
                    :label="'Default Password'"
                    :placeholder="'ex. jde001'"
                    :value="`@${form.username}`"
                    :error="hasError('username') ? errors.username[0] : ''"/>
            </div>
        </ap-grid>
        
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default
{
    created()
    {
        this.loadPositions();
    },

    computed:
    {
        ...mapGetters({
            positions: 'adminCompany/positions',
            isLoading: 'adminCompany/isLoading',
        }),

        errors:
        {
            get()
            {
                return this.$parent.$data.errors;
            },

            set(value)
            {
                this.$parent.$data.errors = value;
            },
        },

        form()
        {
            return this.$parent.$data.form;
        },
    },

    methods:
    {
        ...mapActions({
            loadPrerequisite: 'adminCompany/loadPrerequisite'
        }),


        async loadPositions()
        {
            if (this.positions.length > 0) return false;

            await this.loadPrerequisite({
                url: '/administration/company/position/options',
                action: 'positions'
            });
        },

        hasError(name = null)
        {
            return this.$parent.hasError(name);
        },
    },
}
</script>