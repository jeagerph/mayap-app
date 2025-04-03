<template>
    <div class="ap-padding-small" style="overflow: auto; scroll-snap-align: center;"
     id="overflow-container">

        <div class="network-container"
            v-if="!isLoading('show')">
    
            <div class="level-1 network-rectangle ap-margin-medium-top">
                
                <div style="display: flex; justify-content: center;">
                    <ap-grid :gutter="'small'">
                        <div class="ap-width-fit-content">
                            <ap-avatar
                                :color="'primary'"
                                :shape="'circle'"
                                :label="'AA'"
                                :size="'medium'"
                                :src="'/static/assets/images/template/avatar-1.png'"
                                />
                        </div>
                        <div class="ap-width-expand ap-margin-left">
                            <h5 class="ap-text-bold ap-text-inverse">
                                {{getFullName(companyMember)}}
                            </h5>

                            <p class="ap-margin-remove ap-text-inverse">
                                {{companyMember.gender.name}}
                                &middot;
                                {{getAge(companyMember)}} yrs old
                            </p>
                        </div>
                    </ap-grid>
                </div>
                
            </div>
    
            <ol class="level-2-wrapper">
                <li>
                    <div class="level-2 network-rectangle">
                        <div class="ap-text-center">
                            <ap-avatar
                                :color="'primary'"
                                :shape="'circle'"
                                :label="'AA'"
                                :size="'medium'"
                                :src="'/static/assets/images/template/avatar-1.png'"
                                />

                            <p class="ap-text-bold">
                                {{getFullName(member)}}
                            </p>

                            <small class="ap-margin-remove">
                                {{member.gender.name}}
                                &middot;
                                {{getAge(member)}} yrs old
                            </small>
                        </div>

                        <hr class="ap-margin-small-top">

                        <div class="ap-margin-small-top">
                            
                            <ap-grid :gutter="'small'">
                                <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                    <ap-button
                                        :size="'small'"
                                        :color="'primary'"
                                        :outline="true"
                                        :fullWidth="true"
                                        :text="true">
                                        VIEW
                                    </ap-button>
                                </div>
                                <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                    <ap-button
                                        :size="'small'"
                                        :color="'primary'"
                                        :outline="true"
                                        :fullWidth="true"
                                        :text="true">
                                        EDIT
                                    </ap-button>
                                </div>
                                <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                    <ap-button
                                        :size="'small'"
                                        :color="'primary'"
                                        :outline="true"
                                        :fullWidth="true"
                                        :text="true">
                                        REPLACE
                                    </ap-button>
                                </div>
                            </ap-grid>
                        </div>
                    </div>
                    <ol class="level-3-wrapper">
                        <li>
                            <div class="level-3 network-rectangle">
                                <div class="ap-text-center">
                                    <ap-avatar
                                        :color="'primary'"
                                        :shape="'circle'"
                                        :label="'AA'"
                                        :size="'small'"
                                        :src="'/static/assets/images/template/avatar-1.png'"
                                        />

                                    <div>
                                        <small class="ap-text-bold">
                                            {{getFullName(member)}}
                                        </small>
                                    </div>
                                    

                                    <small class="ap-margin-remove">
                                        {{member.gender.name}}
                                        &middot;
                                        {{getAge(member)}} yrs old
                                    </small>
                                </div>
                            </div>

                        </li>
                        <li>
                            <div class="level-3 network-rectangle">
                                <div class="ap-text-center">
                                    <ap-avatar
                                        :color="'primary'"
                                        :shape="'circle'"
                                        :label="'AA'"
                                        :size="'small'"
                                        :src="'/static/assets/images/template/avatar-1.png'"
                                        />

                                    <div>
                                        <small class="ap-text-bold">
                                            {{getFullName(member)}}
                                        </small>
                                    </div>
                                    

                                    <small class="ap-margin-remove">
                                        {{member.gender.name}}
                                        &middot;
                                        {{getAge(member)}} yrs old
                                    </small>
                                </div>
                            </div>

                        </li>
                        <li>
                            <div class="level-3 network-rectangle"
                                :data-tooltip="getFullName(member)">
                                <div class="ap-text-center">
                                    <ap-avatar
                                        :color="'primary'"
                                        :shape="'circle'"
                                        :label="'AA'"
                                        :size="'small'"
                                        :src="'/static/assets/images/template/avatar-1.png'"
                                        />

                                    <div>
                                        <small class="ap-text-bold">
                                            {{getFullName(member)}}
                                        </small>
                                    </div>
                                    

                                    <small class="ap-margin-remove">
                                        {{member.gender.name}}
                                        &middot;
                                        {{getAge(member)}} yrs old
                                    </small>
                                </div>
                            </div>

                        </li>
                        <li>
                            <div class="level-3 network-rectangle">
                                <div class="ap-text-center">
                                    <ap-avatar
                                        :color="'primary'"
                                        :shape="'circle'"
                                        :label="'AA'"
                                        :size="'small'"
                                        :src="'/static/assets/images/template/avatar-1.png'"
                                        />

                                    <div>
                                        <small class="ap-text-bold">
                                            {{getFullName(member)}}
                                        </small>
                                    </div>
                                    

                                    <small class="ap-margin-remove">
                                        {{member.gender.name}}
                                        &middot;
                                        {{getAge(member)}} yrs old
                                    </small>
                                </div>
                            </div>

                        </li>
                        <li>
                            <div class="level-3 network-rectangle">
                                <div class="ap-text-center">
                                    <ap-avatar
                                        :color="'primary'"
                                        :shape="'circle'"
                                        :label="'AA'"
                                        :size="'small'"
                                        :src="'/static/assets/images/template/avatar-1.png'"
                                        />

                                    <div>
                                        <small class="ap-text-bold">
                                            {{getFullName(member)}}
                                        </small>
                                    </div>
                                    

                                    <small class="ap-margin-remove">
                                        {{member.gender.name}}
                                        &middot;
                                        {{getAge(member)}} yrs old
                                    </small>
                                </div>
                            </div>

                        </li>
                    </ol>
                </li>
                <li>
                    <div class="level-2 network-rectangle">
                        <div class="ap-text-center">
                            <ap-avatar
                                :color="'primary'"
                                :shape="'circle'"
                                :label="'AA'"
                                :size="'medium'"
                                :src="'/static/assets/images/template/avatar-1.png'"
                                />

                            <p class="ap-text-bold">
                                {{getFullName(member)}}
                            </p>

                            <small class="ap-margin-remove">
                                {{member.gender.name}}
                                &middot;
                                {{getAge(member)}} yrs old
                            </small>
                        </div>

                        <hr class="ap-margin-small-top">

                        <div class="ap-margin-small-top">
                            
                            <ap-grid :gutter="'small'">
                                <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                    <ap-button
                                        :size="'small'"
                                        :color="'primary'"
                                        :outline="true"
                                        :fullWidth="true"
                                        :text="true">
                                        VIEW
                                    </ap-button>
                                </div>
                                <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                    <ap-button
                                        :size="'small'"
                                        :color="'primary'"
                                        :outline="true"
                                        :fullWidth="true"
                                        :text="true">
                                        EDIT
                                    </ap-button>
                                </div>
                                <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                    <ap-button
                                        :size="'small'"
                                        :color="'primary'"
                                        :outline="true"
                                        :fullWidth="true"
                                        :text="true">
                                        REPLACE
                                    </ap-button>
                                </div>
                            </ap-grid>
                        </div>
                    </div>

                </li>
                <li>
                    <div class="level-2 network-rectangle">
                        <div class="ap-text-center">
                            <ap-avatar
                                :color="'primary'"
                                :shape="'circle'"
                                :label="'AA'"
                                :size="'medium'"
                                :src="'/static/assets/images/template/avatar-1.png'"
                                />

                            <p class="ap-text-bold">
                                {{getFullName(member)}}
                            </p>

                            <small class="ap-margin-remove">
                                {{member.gender.name}}
                                &middot;
                                {{getAge(member)}} yrs old
                            </small>
                        </div>

                        <hr class="ap-margin-small-top">

                        <div class="ap-margin-small-top">
                            
                            <ap-grid :gutter="'small'">
                                <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                    <ap-button
                                        :size="'small'"
                                        :color="'primary'"
                                        :outline="true"
                                        :fullWidth="true"
                                        :text="true">
                                        VIEW
                                    </ap-button>
                                </div>
                                <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                    <ap-button
                                        :size="'small'"
                                        :color="'primary'"
                                        :outline="true"
                                        :fullWidth="true"
                                        :text="true">
                                        EDIT
                                    </ap-button>
                                </div>
                                <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                    <ap-button
                                        :size="'small'"
                                        :color="'primary'"
                                        :outline="true"
                                        :fullWidth="true"
                                        :text="true">
                                        REPLACE
                                    </ap-button>
                                </div>
                            </ap-grid>
                        </div>
                        
                        
                    </div>

                </li>
                <li>
                    <div class="level-2 network-rectangle">
                        <div class="ap-text-center">
                            <ap-avatar
                                :color="'primary'"
                                :shape="'circle'"
                                :label="'AA'"
                                :size="'medium'"
                                :src="'/static/assets/images/template/avatar-1.png'"
                                />

                            <p class="ap-text-bold">
                                {{getFullName(member)}}
                            </p>

                            <small class="ap-margin-remove">
                                {{member.gender.name}}
                                &middot;
                                {{getAge(member)}} yrs old
                            </small>
                        </div>

                        <hr class="ap-margin-small-top">

                        <div class="ap-margin-small-top">
                            
                            <ap-grid :gutter="'small'">
                                <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                    <ap-button
                                        :size="'small'"
                                        :color="'primary'"
                                        :outline="true"
                                        :fullWidth="true"
                                        :text="true">
                                        VIEW
                                    </ap-button>
                                </div>
                                <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                    <ap-button
                                        :size="'small'"
                                        :color="'primary'"
                                        :outline="true"
                                        :fullWidth="true"
                                        :text="true">
                                        EDIT
                                    </ap-button>
                                </div>
                                <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                    <ap-button
                                        :size="'small'"
                                        :color="'primary'"
                                        :outline="true"
                                        :fullWidth="true"
                                        :text="true">
                                        REPLACE
                                    </ap-button>
                                </div>
                            </ap-grid>
                        </div>
                        
                        
                    </div>

                </li>
                <li>
                    <div class="level-2 network-rectangle">
                        <div class="ap-text-center">
                            <ap-avatar
                                :color="'primary'"
                                :shape="'circle'"
                                :label="'AA'"
                                :size="'medium'"
                                :src="'/static/assets/images/template/avatar-1.png'"
                                />

                            <p class="ap-text-bold">
                                {{getFullName(member)}}
                            </p>

                            <small class="ap-margin-remove">
                                {{member.gender.name}}
                                &middot;
                                {{getAge(member)}} yrs old
                            </small>
                        </div>

                        <hr class="ap-margin-small-top">

                        <div class="ap-margin-small-top">
                            
                            <ap-grid :gutter="'small'">
                                <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                    <ap-button
                                        :size="'small'"
                                        :color="'primary'"
                                        :outline="true"
                                        :fullWidth="true"
                                        :text="true">
                                        VIEW
                                    </ap-button>
                                </div>
                                <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                    <ap-button
                                        :size="'small'"
                                        :color="'primary'"
                                        :outline="true"
                                        :fullWidth="true"
                                        :text="true">
                                        EDIT
                                    </ap-button>
                                </div>
                                <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                    <ap-button
                                        :size="'small'"
                                        :color="'primary'"
                                        :outline="true"
                                        :fullWidth="true"
                                        :text="true">
                                        REPLACE
                                    </ap-button>
                                </div>
                            </ap-grid>
                        </div>
                        
                        
                    </div>

                </li>
                <li>
                    <div class="level-2 network-rectangle">
                        <div style="width: 160px; height: 154px; padding: 10px 10px; border: 1px dotted black; display: flex; justify-content: center; align-items: center;"
                            class="ap-point">
                            <i class="bx bx-plus ap-text-primary" style="font-size: 30px;"></i>
                        </div>
                    </div>
                    
                </li>
            </ol>
        </div>
        
        <div class="ap-margin-top"
            v-else>

            <ap-loader
                :size="'xlarge'" />
        </div>
        

    </div>
</template>

<script>

import { mapGetters } from 'vuex';

import { Dater } from '@/utils';

export default
{
    name: 'MemberNetwork',

    created()
    {
        window.scrollTo(0,0);
        
        // this.onLoad();
    },

    computed:
    {
        ...mapGetters({
            companyMember: 'companyMember/selected',
            member: 'companyMemberNetwork/member',
            isLoading: 'companyMember/isLoading',
        }),
    },

    methods:
    {
        getFullName(member)
        {
            return `${member.last_name}, ${member.first_name} ${member.middle_name ? member.middle_name : ''}`;
        },

        getAge(member)
        {
            return Dater.age(member.date_of_birth);
        },
    }
};
</script>

<style scoped>

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

ol {
  list-style: none;
}

body {
  margin: 50px 0 100px;
  text-align: center;
  font-family: "Inter", sans-serif;
}

.network-container {
  width: 2800px;
  padding: 0 10px;
  margin: 20px 20px;
  /* border: 1px solid black; */
}

.network-rectangle {
  position: relative;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}


/* LEVEL-1 STYLES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
.level-1 {
  width: 400px;
  margin: 0 auto 40px;
  background: #0d6efd;
}

.level-1::before {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 20px;
  background: black;
}


/* LEVEL-2 STYLES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
.level-2-wrapper {
  position: relative;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
}

.level-2-wrapper::before {
  content: "";
  position: absolute;
  top: -20px;
  left: 490px;
  width: 2108px;
  height: 2px;
  background: black;
}

.level-2-wrapper::after {
  display: none;
  content: "";
  position: absolute;
  left: -20px;
  bottom: -20px;
  width: calc(100% + 20px);
  height: 2px;
  background: black;
}

.level-2 {
  width: 200px;
  margin: 0 auto 40px;
  /* background: #f5cc7f; */
}

.level-2::before {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 20px;
  background: black;
}

.level-2::after {
  display: none;
  content: "";
  position: absolute;
  top: 50%;
  left: 0%;
  transform: translate(-100%, -50%);
  width: 20px;
  height: 2px;
  background: black;
}

.level-2-wrapper li {
  position: relative;
}

.level-2-wrapper > li::before {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 20px;
  background: black;
}


/* LEVEL-3 STYLES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
.level-3-wrapper {
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 20px;
  width: 100%;
  margin: 0 auto;
}

.level-3-wrapper::before {
  content: "";
  position: absolute;
  top: -20px;
  left: calc(10% - 8px);
  width: calc(80% + 15px);
  height: 2px;
  background: black;
}

.level-3-wrapper > li::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -100%);
  width: 2px;
  height: 20px;
  background: black;
}

.level-3 {
    width: 180px;
  margin-bottom: 20px;
  /* background: #7b9fe0; */
}


/* LEVEL-4 STYLES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
.level-4-wrapper {
  position: relative;
  width: 80%;
  margin-left: auto;
}

.level-4-wrapper::before {
  content: "";
  position: absolute;
  top: -20px;
  left: -20px;
  width: 2px;
  height: calc(100% + 20px);
  background: black;
}

.level-4-wrapper li + li {
  margin-top: 20px;
}

.level-4 {
  font-weight: normal;
  background: #f27c8d;
}

.level-4::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0%;
  transform: translate(-100%, -50%);
  width: 20px;
  height: 2px;
  background: black;
}


/* MQ STYLES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
@media screen and (max-width: 700px) {
  .rectangle {
    padding: 20px 10px;
  }

  .level-1,
  .level-2 {
    width: 100%;
  }

  .level-1 {
    margin-bottom: 20px;
  }

  .level-1::before,
  .level-2-wrapper > li::before {
    display: none;
  }
  
  .level-2-wrapper,
  .level-2-wrapper::after,
  .level-2::after {
    display: block;
  }

  .level-2-wrapper {
    width: 90%;
    margin-left: 10%;
  }

  .level-2-wrapper::before {
    left: -20px;
    width: 2px;
    height: calc(100% + 40px);
  }

  .level-2-wrapper > li:not(:first-child) {
    margin-top: 50px;
  }
}


</style>