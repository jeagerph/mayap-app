<template>
    <div class="ap-animate ap-animate-fade-in">
        
        <div class="ap-padding-small">

            <ap-grid :gutter="'small'">
                <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">

                    <p class="ap-text-bold ap-text-primary">
                        KAPITAN PH DATA
                    </p>

                    <div class="ap-margin-top">
                        <ap-button
                            :class="'ap-inline'"
                            :size="'small'"
                            :color="dataSetting.kapitan_merge_residents_kabataan ? 'success':'default'"
                            :loading="isLoading('dataSetting') || kapitan_merge_residents_kabataan_loading"
                            @click="submit({
                                field: 'kapitan_merge_residents_kabataan',
                                value: dataSetting.kapitan_merge_residents_kabataan ? 0 : 1
                            })">
                            {{ dataSetting.kapitan_merge_residents_kabataan ? 'YES':'NO' }}
                        </ap-button>

                        <div class="ap-inline ap-margin-small-top ap-margin-left">
                            <p class="ap-text-bold ap-text-italic">Merge Residents data from Kabataan PH</p>
                        </div>
                    </div>

                    <div class="ap-margin-small-top">
                        <ap-button
                            :class="'ap-inline'"
                            :size="'small'"
                            :color="dataSetting.kapitan_merge_establishments_kabataan ? 'success':'default'"
                            :loading="isLoading('dataSetting') || kapitan_merge_establishments_kabataan_loading"
                            @click="submit({
                                field: 'kapitan_merge_establishments_kabataan',
                                value: dataSetting.kapitan_merge_establishments_kabataan ? 0 : 1
                            })">
                            {{ dataSetting.kapitan_merge_establishments_kabataan ? 'YES':'NO' }}
                        </ap-button>

                        <div class="ap-inline ap-margin-small-top ap-margin-left">
                            <p class="ap-text-bold ap-text-italic">Merge Establishments data from Kabataan PH</p>
                        </div>
                    </div>

                    <div class="ap-margin-small-top">
                        <ap-button
                            :class="'ap-inline'"
                            :size="'small'"
                            :color="dataSetting.kapitan_merge_buildings_kabataan ? 'success':'default'"
                            :loading="isLoading('dataSetting') || kapitan_merge_buildings_kabataan_loading"
                            @click="submit({
                                field: 'kapitan_merge_buildings_kabataan',
                                value: dataSetting.kapitan_merge_buildings_kabataan ? 0 : 1
                            })">
                            {{ dataSetting.kapitan_merge_buildings_kabataan ? 'YES':'NO' }}
                        </ap-button>

                        <div class="ap-inline ap-margin-small-top ap-margin-left">
                            <p class="ap-text-bold ap-text-italic">Merge Lot/Buildings data from Kabataan PH</p>
                        </div>
                    </div>

                    <div class="ap-margin-small-top">
                        <ap-button
                            :class="'ap-inline'"
                            :size="'small'"
                            :color="dataSetting.kapitan_merge_documents_kabataan ? 'success':'default'"
                            :loading="isLoading('dataSetting') || kapitan_merge_documents_kabataan_loading"
                            @click="submit({
                                field: 'kapitan_merge_documents_kabataan',
                                value: dataSetting.kapitan_merge_documents_kabataan ? 0 : 1
                            })">
                            {{ dataSetting.kapitan_merge_documents_kabataan ? 'YES':'NO' }}
                        </ap-button>

                        <div class="ap-inline ap-margin-small-top ap-margin-left">
                            <p class="ap-text-bold ap-text-italic">Merge Documents data from Kabataan PH</p>
                        </div>
                    </div>

                    <div class="ap-margin-small-top">
                        <ap-button
                            :class="'ap-inline'"
                            :size="'small'"
                            :color="dataSetting.kapitan_merge_cases_kabataan ? 'success':'default'"
                            :loading="isLoading('dataSetting') || kapitan_merge_cases_kabataan_loading"
                            @click="submit({
                                field: 'kapitan_merge_cases_kabataan',
                                value: dataSetting.kapitan_merge_cases_kabataan ? 0 : 1
                            })">
                            {{ dataSetting.kapitan_merge_cases_kabataan ? 'YES':'NO' }}
                        </ap-button>

                        <div class="ap-inline ap-margin-small-top ap-margin-left">
                            <p class="ap-text-bold ap-text-italic">Merge Cases data from Kabataan PH</p>
                        </div>
                    </div>

                    <div class="ap-margin-small-top">
                        <ap-button
                            :class="'ap-inline'"
                            :size="'small'"
                            :color="dataSetting.kapitan_merge_blotters_kabataan ? 'success':'default'"
                            :loading="isLoading('dataSetting') || kapitan_merge_blotters_kabataan_loading"
                            @click="submit({
                                field: 'kapitan_merge_blotters_kabataan',
                                value: dataSetting.kapitan_merge_blotters_kabataan ? 0 : 1
                            })">
                            {{ dataSetting.kapitan_merge_blotters_kabataan ? 'YES':'NO' }}
                        </ap-button>

                        <div class="ap-inline ap-margin-small-top ap-margin-left">
                            <p class="ap-text-bold ap-text-italic">Merge Blotters data from Kabataan PH</p>
                        </div>
                    </div>
                </div>
                <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">

                    <p class="ap-text-bold ap-text-primary">
                        KABATAAN PH DATA
                    </p>

                    <div class="ap-margin-top">
                        <ap-button
                            :class="'ap-inline'"
                            :size="'small'"
                            :color="dataSetting.kabataan_merge_residents_kapitan ? 'success':'default'"
                            :loading="isLoading('dataSetting') || kabataan_merge_residents_kapitan_loading"
                            @click="submit({
                                field: 'kabataan_merge_residents_kapitan',
                                value: dataSetting.kabataan_merge_residents_kapitan ? 0 : 1
                            })">
                            {{ dataSetting.kabataan_merge_residents_kapitan ? 'YES':'NO' }}
                        </ap-button>

                        <div class="ap-inline ap-margin-small-top ap-margin-left">
                            <p class="ap-text-bold ap-text-italic">Merge Residents data from Kapitan PH</p>
                        </div>
                    </div>

                    <div class="ap-margin-small-top">
                        <ap-button
                            :class="'ap-inline'"
                            :size="'small'"
                            :color="dataSetting.kabataan_merge_establishments_kapitan ? 'success':'default'"
                            :loading="isLoading('dataSetting') || kabataan_merge_establishments_kapitan_loading"
                            @click="submit({
                                field: 'kabataan_merge_establishments_kapitan',
                                value: dataSetting.kabataan_merge_establishments_kapitan ? 0 : 1
                            })">
                            {{ dataSetting.kabataan_merge_establishments_kapitan ? 'YES':'NO' }}
                        </ap-button>

                        <div class="ap-inline ap-margin-small-top ap-margin-left">
                            <p class="ap-text-bold ap-text-italic">Merge Establishments data from Kapitan PH</p>
                        </div>
                    </div>

                    <div class="ap-margin-small-top">
                        <ap-button
                            :class="'ap-inline'"
                            :size="'small'"
                            :color="dataSetting.kabataan_merge_buildings_kapitan ? 'success':'default'"
                            :loading="isLoading('dataSetting') || kabataan_merge_buildings_kapitan_loading"
                            @click="submit({
                                field: 'kabataan_merge_buildings_kapitan',
                                value: dataSetting.kabataan_merge_buildings_kapitan ? 0 : 1
                            })">
                            {{ dataSetting.kabataan_merge_buildings_kapitan ? 'YES':'NO' }}
                        </ap-button>

                        <div class="ap-inline ap-margin-small-top ap-margin-left">
                            <p class="ap-text-bold ap-text-italic">Merge Lot/Buildings data from Kapitan PH</p>
                        </div>
                    </div>

                    <div class="ap-margin-small-top">
                        <ap-button
                            :class="'ap-inline'"
                            :size="'small'"
                            :color="dataSetting.kabataan_merge_documents_kapitan ? 'success':'default'"
                            :loading="isLoading('dataSetting') || kabataan_merge_documents_kapitan_loading"
                            @click="submit({
                                field: 'kabataan_merge_documents_kapitan',
                                value: dataSetting.kabataan_merge_documents_kapitan ? 0 : 1
                            })">
                            {{ dataSetting.kabataan_merge_documents_kapitan ? 'YES':'NO' }}
                        </ap-button>

                        <div class="ap-inline ap-margin-small-top ap-margin-left">
                            <p class="ap-text-bold ap-text-italic">Merge Documents data from Kapitan PH</p>
                        </div>
                    </div>

                    <div class="ap-margin-small-top">
                        <ap-button
                            :class="'ap-inline'"
                            :size="'small'"
                            :color="dataSetting.kabataan_merge_cases_kapitan ? 'success':'default'"
                            :loading="isLoading('dataSetting') || kabataan_merge_cases_kapitan_loading"
                            @click="submit({
                                field: 'kabataan_merge_cases_kapitan',
                                value: dataSetting.kabataan_merge_cases_kapitan ? 0 : 1
                            })">
                            {{ dataSetting.kabataan_merge_cases_kapitan ? 'YES':'NO' }}
                        </ap-button>

                        <div class="ap-inline ap-margin-small-top ap-margin-left">
                            <p class="ap-text-bold ap-text-italic">Merge Cases data from Kapitan PH</p>
                        </div>
                    </div>

                    <div class="ap-margin-small-top">
                        <ap-button
                            :class="'ap-inline'"
                            :size="'small'"
                            :color="dataSetting.kabataan_merge_blotters_kapitan ? 'success':'default'"
                            :loading="isLoading('dataSetting') || kabataan_merge_blotters_kapitan_loading"
                            @click="submit({
                                field: 'kabataan_merge_blotters_kapitan',
                                value: dataSetting.kabataan_merge_blotters_kapitan ? 0 : 1
                            })">
                            {{ dataSetting.kabataan_merge_blotters_kapitan ? 'YES':'NO' }}
                        </ap-button>

                        <div class="ap-inline ap-margin-small-top ap-margin-left">
                            <p class="ap-text-bold ap-text-italic">Merge Blotters data from Kapitan PH</p>
                        </div>
                    </div>
                </div>
            </ap-grid>

        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Http from '@/services';

import { Form, Toast } from '@/utils';

export default
{
    data()
    {
        return {
            errors: {},

            submitLoading: false,

            kapitan_merge_residents_kabataan_loading: false,
            kapitan_merge_establishments_kabataan_loading: false,
            kapitan_merge_buildings_kabataan_loading: false,
            kapitan_merge_documents_kabataan_loading: false,
            kapitan_merge_cases_kabataan_loading: false,
            kapitan_merge_blotters_kabataan_loading: false,

            kabataan_merge_residents_kapitan_loading: false,
            kabataan_merge_establishments_kapitan_loading: false,
            kabataan_merge_buildings_kapitan_loading: false,
            kabataan_merge_documents_kapitan_loading: false,
            kabataan_merge_cases_kapitan_loading: false,
            kabataan_merge_blotters_kapitan_loading: false,
        };
    },

    created()
    {
        this.load();
    },

    computed:
    {
        ...mapGetters({
            barangay: 'adminBarangay/selected',
            dataSetting: 'adminBarangay/dataSetting',
            isLoading: 'adminBarangay/isLoading',
        }),

        hasDataSetting()
        {
            return Object.keys(this.dataSetting).length > 0;
        }
    },

    methods:
    {
        ...mapActions({
            loadSetting: 'adminBarangay/loadSetting',
            updateSetting: 'adminBarangay/updateSetting',
        }),

        async submit(form)
        {
            this[`${form.field}_loading`] = true;

            const response = await Http.put(
                `/administration/barangay/${this.$route.params.code}/data/setting`,
                form
            );

            this[`${form.field}_loading`] = false;

            if (response.status == 200)
            {
                this.updateSetting({
                    state: 'dataSetting',
                    data: response.data
                });

                Toast.success({
                    message: 'Setting has been updated.',
                });
            }
            else if (response.status === 422)
            {
                this.errors = response.data.errors;

                Toast.error({
                    message: 'Kindly double check your form.',
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

        async load()
        {
            await this.loadSetting({
                action: 'dataSetting',
                url: `/administration/barangay/${this.$route.params.code}/data/setting`
            });
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },
    },
}
</script>