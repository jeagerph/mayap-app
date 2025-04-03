<template>
    <div class="ap-animate ap-animate-fade-in ap-margin-top">

        <ap-grid :gutter="'small'"
            class="ap-flex-middle">
            <div class="ap-width-1-1@s ap-width-expand">
                <input
                    class="ap-input-search-query"
                    type="text" 
                    placeholder="Search Assistance"
                    @input="inputSearchKeyword">
            </div>
        </ap-grid>

        <ap-grid :gutter="'small'"
            class="ap-flex-middle">
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                <div>
                    <small class="ap-text-bold">
                        TYPE OF ASSISTANCE
                    </small>
                    
                    <ap-button
                        class="dropdown-toggle ap-margin-xsmall-top"
                        data-bs-toggle="dropdown"
                        :size="'small'"
                        :color="'primary'"
                        :outline="true"
                        :rounded="true"
                        :fullWidth="true">
                        {{ displayMarkerColorValue }}
                    </ap-button>
                    <ul class="dropdown-menu" style="margin: 0px;">
                        <li><a class="dropdown-item ap-point" @click="selectMarkerColor('')">ALL</a></li>
                        <li><a class="dropdown-item ap-point" @click="selectMarkerColor('brown')"><i class="ap-margin-small-right bx bx-circle" style="color: brown;"></i>GUARANTEE LETTER</a></li>
                        <li><a class="dropdown-item ap-point" @click="selectMarkerColor('blue')"><i class="ap-margin-small-right bx bx-circle" style="color: blue;"></i>MEDICAL/MEDICINE</a></li>
                        <li><a class="dropdown-item ap-point" @click="selectMarkerColor('green')"><i class="ap-margin-small-right bx bx-circle" style="color: green;"></i>FINANCIAL</a></li>
                        <li><a class="dropdown-item ap-point" @click="selectMarkerColor('gray')"><i class="ap-margin-small-right bx bx-circle" style="color: gray;"></i>BURIAL</a></li>
                        <li><a class="dropdown-item ap-point" @click="selectMarkerColor('pink')"><i class="ap-margin-small-right bx bx-circle" style="color: pink;"></i>SCHOLARSHIP</a></li>
                        <li><a class="dropdown-item ap-point" @click="selectMarkerColor('orange')"><i class="ap-margin-small-right bx bx-circle" style="color: orange;"></i>TRAINING</a></li>
                        <li><a class="dropdown-item ap-point" @click="selectMarkerColor('yellow')"><i class="ap-margin-small-right bx bx-circle" style="color: yellow;"></i>INFRASTRUCTURE</a></li>
                    </ul>
                </div>
            </div>
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                <small class="ap-text-bold">
                    YEAR
                </small>
                <select
                    class="ap-select"
                    v-model="query.assistanceYear"
                    @change="onSelectAssistanceYear">
                    <option :value="''">ALL YEAR</option>
                    <option
                        v-for="(year, index) in listOfYears"
                        :key="index"
                        :value="year">{{ year }}</option>
                </select>
            </div>
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                <small class="ap-text-bold">
                    CITY/MUNICIPALITY
                </small>

                <select
                    v-if="!citiesLoading"
                    class="ap-select"
                    v-model="query.cityCode"
                    @change="onSelectCity">
                    <option :value="''">ALL</option>
                    <option
                        v-for="(city, index) in cities"
                        :key="index"
                        :value="city.city_code">{{ city.name }}</option>
                </select>
                <ap-placeholder
                    v-else
                    :size="'medium'" />
            </div>
            
        </ap-grid>

        <div class="ap-margin-top">
            <gmap-map
                v-if="!assistancesLoading"
                style="width: 100%; height: 800px;"
                :zoom="10"
                :center="center">
                <gmap-marker
                    v-for="(location, index) in filteredAssistances"
                    :key="index"
                    :position="{
                        lat: parseFloat(location.latitude),
                        lng: parseFloat(location.longitude)
                    }"
                    :icon="`/static/assets/images/map-marker/${location.marker_color}-marker.png`"
                    @click="toggleInfoCard(index)"
                />

                <gmap-info-window
                    :options="{
                        maxWidth: 500,
                        pixelOffset: { width: 0, height: -35 }
                    }"
                    :position="infoCard.position"
                    :opened="infoCard.open"
                    @closeclick="infoCard.open=false">
                    <div v-html="infoCard.template"></div>
                </gmap-info-window>
            </gmap-map>

            <div class="ap-text-center ap-margin-medium-top"
                v-if="assistancesLoading">
                <ap-loader
                    :size="'large'" />

                <p>
                    Loading ...
                </p>
            </div>

        </div>

        
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Http from '@/services';

import { Dater } from '@/utils';

export default
{
    data()
    {
        return {
            center:
            { 
                lat: 14.8386,
                lng: 120.2842
            },

            infoCard:
            {
                position: {
                    lat: 0,
                    lng: 0
                },
                open: false,
                template: ''
            },

            assistances: [],
            assistancesLoading: false,

            markerColor: '',
            searchKeyword: '',

            eventTimer: null,

            query:
            {
                assistanceYear: '',
                cityCode: '',
            },

            listOfYears: [],

            cities: [],
            citiesLoading: false,
        };
    },

    created()
    {
        this.initialize();

        this.loadAssistances();

        this.loadCities();
    },

    computed:
    {
        ...mapGetters({
            accessUser: 'auth/accessUser'
        }),

        company()
        {
            return this.accessUser.company;
        },

        displayMarkerColorValue()
        {
            if (this.markerColor == 'brown')
            {
                return 'GUARANTEE LETTER';
            }
            else if (this.markerColor == 'blue')
            {
                return 'MEDICAL/MEDICINE';
            }
            else if (this.markerColor == 'green')
            {
                return 'FINANCIAL ASSISTANCE';
            }
            else if (this.markerColor == 'gray')
            {
                return 'BURIAL';
            }
            else if (this.markerColor == 'pink')
            {
                return 'TRAINING';
            }
            else if (this.markerColor == 'pink')
            {
                return 'SCHOLARSHIP';
            }
            else if (this.markerColor == 'yellow')
            {
                return 'INFRASTRUCTURE';
            }

            return 'ALL';
        },

        filteredAssistances()
        {
            if (this.markerColor)
            {
                return this.assistances.filter(row => row.marker_color == this.markerColor);
            }

            else if (this.searchKeyword)
            {
                return this.assistances.filter(row => (row.assistance_type.toLowerCase()).includes(this.searchKeyword));
            }

            return this.assistances;
        },
    },

    methods:
    {
        toggleInfoCard(index)
        {
            if (this.infoCard.open) return this.infoCard.open = false;

            let assistance = this.assistances[index];

            this.infoCard.position = {
                lat: parseFloat(assistance.latitude), 
                lng: parseFloat(assistance.longitude)
            }
            this.infoCard.template = `<div>
                <h5 class="ap-text-bold ap-margin-remove">${assistance.assistance_type}</h5>
                <p class="ap-text-bold ap-margin-remove">${assistance.full_name}</p>
                <p class="ap-text-bold ap-margin-remove">${this.getAge(assistance.date_of_birth)} YRS OLD &middot; ${assistance.gender_name}</p>
                <div class="ap-margin-xsmall-top">
                    <a href="/company/beneficiaries/${assistance.slug_code}" target="new">
                        <small>[ SEE PROFILE ]</small>
                    </a>
                </div>
            </div>`;
            this.infoCard.open = true
        },

        async loadAssistances()
        {
            let url = `/my-company/assistances/locations/list?ctx`;

            if (this.query.assistanceYear)
            {
                url += `&filter[assistanceYear]=${this.query.assistanceYear}`;
            }

            if (this.query.cityCode)
            {
                url += `&filter[cityCode]=${this.query.cityCode}`;
            }

            this.assistancesLoading = true;

            const response = await Http.get(url);

            this.assistancesLoading = false;

            if (response.status == 200)
            {
                this.assistances = response.data;
            }
        },

        selectMarkerColor(color)
        {
            this.markerColor = color;
        },

        inputSearchKeyword(event)
        {
            clearTimeout(this.eventTimer);

            this.eventTimer = setTimeout(() =>
            {
                this.searchKeyword = event.target.value;
            }, 750);
        },

        getAge(date)
        {
            return Dater.age(date);
        },

        async loadCities()
        {
            this.citiesLoading = true;

            const response = await Http.get(`/my-company/assistance/cities?filter[provCode]=${this.company.province_id}`);

            this.citiesLoading = false;

            if (response.status == 200)
            {
                this.cities = response.data.data;   
            }
        },

        onSelectAssistanceYear()
        {
            this.loadAssistances();
        },

        onSelectCity()
        {
            this.loadAssistances();
        },

        initialize()
        {
            let currentYear = new Date();

            let startTemp = parseInt(currentYear.getFullYear());
            let endTemp = parseInt(currentYear.getFullYear()) - 5;

            while (startTemp >= endTemp)
            {
                this.listOfYears.push(startTemp);

                startTemp--;
            }

            this.query.assistanceYear = currentYear.getFullYear();
            this.query.cityCode = '';

            this.center = {
                lat: parseFloat(this.accessUser.company.map_setting.latitude),
                lng: parseFloat(this.accessUser.company.map_setting.longitude),
            }
        }
    }
}
</script>