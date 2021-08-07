<template>
    <v-container>
        <v-row>
            <div class="btns">
                <div class="eachbtn">
                    <v-btn
                            outlined
                            text
                            @click="logOut"
                    >
                        Чикиш
                    </v-btn>
                </div>
                <div class="eachbtn">
                    <fullAddCar/>
                </div>
                <div class="eachbtn">
                    <fullClientAdd/>
                </div>
            </div>
            <v-col class="col-12" style="padding-top: 0;">
                <v-tabs
                        v-model="tabs"

                >
                    <v-tabs-slider></v-tabs-slider>
                    <v-tab
                            href="#m"
                            class="primary--text"
                    >
                        Мониторинг
                    </v-tab>

                    <v-tab
                            href="#a"
                            class="primary--text"
                    >
                        Автомобиллар
                    </v-tab>

                    <v-tab
                            href="#c"
                            class="primary--text"
                    >
                        Мижозлар
                    </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tabs">
                    <v-tab-item value="m">
                        <v-card flat>
                            <MonitoringList/>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item value="a">
                        <v-card flat>
                            <CarsList/>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item value="c">
                        <v-card flat>
                            <ClientsList/>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
            </v-col>
        </v-row>
        <div v-if="$store.getters.successDialog">
            <success/>
        </div>
    </v-container>
</template>

<script>
    import CarsList from "./mainPageComponents/CarsList";
    import ClientsList from "./mainPageComponents/ClientsList";
    import fullAddCar from "./mainPageComponents/fullAddCar";
    import fullClientAdd from "./mainPageComponents/fullClientAdd";
    import MonitoringList from "./mainPageComponents/MonitoringList";
    import success from "./anyTools/success";
    export default {
        name: "Main",
        components: {CarsList,ClientsList,fullAddCar,fullClientAdd,MonitoringList,success},
        data: ()=>({
            items: [
                {name: "Автомобиль", val: "avto"},
                {name: "Мижоз", val: "mijoz"}
            ],
            tabs:['m', 'a', 'c'],
            httpRes:{message: "Test"},
            s_turi:{}, avto:true, mijoz:false,
            picker: new Date().toISOString().substr(0, 10),
        }),
        methods:{
            turi(turi){
                this.avto = false
                this.mijoz = false
                if(turi === 'avto'){
                    this.avto = true
                }else if(turi === 'mijoz'){
                    this.mijoz = true
                }
            },
            logOut(){
                this.$router.push('/login')
            }
        },
        mounted() {
            this.$store.dispatch('kursValyut')
        }
    }
</script>

<style scoped>
    .btns{
        display: flex;
        flex-direction: row-reverse;
        width: 100%;
        margin: 10px;
    }
    .eachbtn{
        margin: 0 5px;
    }
</style>