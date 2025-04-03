<template>
    <div class="ap-margin-medium-top">

        <div>
            <p class="ap-text-bold ap-text-primary">
                MAP LOCATION
            </p>

            <div>
                <small class="ap-text-bold ap-text-italic">
                    INSTRUCTION:
                </small>
                <ul>
                    <li>Search the address in the form below and select on the results displayed.</li>
                    <li>To put a <span class="ap-text-bold">PIN</span> on the map, click the map according to its location. </li>
                </ul>
            </div>
            
            <ap-grid :gutter="'small'">

                <div class="ap-width-expand@m">
                    <gmap-autocomplete
                        v-if="!isLoading('edit')"
                        ref="gmapAutoComplete"
                        class="ap-input"
                        @place_changed="setPlace">
                    </gmap-autocomplete>
                </div>
                
                <!-- <div class="ap-text-right">
                    <ap-button
                        type="button"
                        :size="'small'"
                        :color="'primary'"
                        :outline="true"
                        :rounded="true"
                        @click="addMarkerBySetPlace">
                        Pin Location
                    </ap-button>
                </div> -->
                
            </ap-grid>
            

        </div>
        <br/>

        <gmap-map
            v-if="!isLoading('edit')"
            style="width: 100%; height: 600px;"
            :zoom="zoom"
            :center="center"
            @click="addMarkerByMapClick">
            <gmap-marker
                v-if="form.latitude && form.longitude"
                :position="{
                    lat: parseFloat(form.latitude),
                    lng: parseFloat(form.longitude)
                }"
            />
        </gmap-map>

        <ap-grid :gutter="'small'"
            class="ap-margin-top">
            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <ap-input
                    v-if="!isLoading('edit')"
                    type="text"
                    :readonly="true"
                    :label="'Latitude'"
                    :placeholder="'ex. 0.00'"
                    v-model="form.latitude"
                    :error="hasError('latitude') ? errors.latitude[0] : ''"/>
                <div v-else>
                    <label class="ap-form-label ap-text-bold">
                        Latitude
                    </label>
                    <ap-placeholder
                        :size="'medium'"/>
                </div>
            </div>
            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <ap-input
                    v-if="!isLoading('edit')"
                    type="text"
                    :readonly="true"
                    :label="'Longitude'"
                    :placeholder="'ex. 100.00'"
                    v-model="form.longitude"
                    :error="hasError('longitude') ? errors.longitude[0] : ''"/>
                <div v-else>
                    <label class="ap-form-label ap-text-bold">
                        Longitude
                    </label>
                    <ap-placeholder
                        :size="'medium'"/>
                </div>
            </div>
        </ap-grid>
        
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default
{
    data()
    {
        return {
            mapOptions:
            {
                // cursor: 'crosshair'
            },
            center:
            { 
                lat: 14.8386,
                lng: 120.2842
            },
            zoom: 12,

            currentPlace: null,

            currentAddress: '',

            eventTimer: null,

        };
    },

    created()
    {
        this.initialize();
    },

    computed:
    {
        ...mapGetters({
            accessUser: 'auth/accessUser',
            form: 'companyBeneficiary/editForm',
            isLoading: 'companyBeneficiary/isLoading',
            barangays: 'companyBeneficiary/barangays',
            cities: 'companyBeneficiary/cities',
            provinces: 'companyBeneficiary/provinces',
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
    },

    methods:
    {
        setPlace(place)
        {
            this.form.latitude = place.geometry.location.lat();
            this.form.longitude = place.geometry.location.lng();

            this.center = {
                lat: parseFloat(this.form.latitude),
                lng: parseFloat(this.form.longitude),
            };
        },

        addMarkerBySetPlace()
        {
            if (this.currentPlace)
            {
                const marker = {
                    lat: this.currentPlace.geometry.location.lat(),
                    lng: this.currentPlace.geometry.location.lng(),
                };

                this.form.latitude = this.currentPlace.geometry.location.lat();
                this.form.longitude = this.currentPlace.geometry.location.lng();

                this.center = marker;

                this.zoom = 24;
            }
        },

        addMarkerByMapClick(event)
        {
            this.form.latitude = event.latLng.lat();
            this.form.longitude = event.latLng.lng();
        },

        setCurrentAddress()
        {
            clearTimeout(this.eventTimer);

            this.eventTimer = setTimeout(() => {

                let currentAddress = '';
                
                if (this.form.house_no)
                {
                    currentAddress += `${this.form.house_no}, `;
                }

                if (this.form.barangay_id)
                {
                    let barangay = this.barangays.find(row => row.id == this.form.barangay_id);

                    currentAddress += `${barangay.name}, `;
                }

                if (this.form.city_id)
                {
                    let city = this.cities.find(row => row.city_code == this.form.city_id);

                    currentAddress += `${city.name}, `;
                }

                if (this.form.province_id)
                {
                    let province = this.provinces.find(row => row.prov_code == this.form.province_id);

                    currentAddress += `${province.name}, `;
                }

                this.$refs.gmapAutoComplete.$refs.input.value = currentAddress;

            }, 750);
            
        },
        
        initialize()
        {
            this.center = {
                lat: parseFloat(this.form.latitude),
                lng: parseFloat(this.form.longitude),
            }
        },

        hasError(name = null)
        {
            return this.$parent.hasError(name);
        },
    },

    watch:
    {
        'form.barangay_id'(val)
        {
            if (val) this.setCurrentAddress();
        },

        'form.house_no' (val)
        {
            if (val) this.setCurrentAddress();
        }
    },
};
</script>
