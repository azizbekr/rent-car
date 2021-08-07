<template>
    <v-container fluid style="padding: 0;">
        <v-card style="position: fixed; width: 100%; z-index: 1000">
            <v-tabs
                    grow
                    background-color="blue darken-2"
                    dark
                    height="55"
                    slider-color="blue"
                    active-class="slider_class"

            >
                <v-row align="center">
                    <v-col
                            class="col-3 col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 menuLists"
                            cols="12"
                    >
                        <router-link to="/">
                            <v-tab>
                                <p style="margin: 0; font-size: 1.2em; font-weight: bold">
                                    Асосий
                                </p>
                            </v-tab>
                        </router-link>
                    </v-col>


                    <v-col
                            class="col-3 col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 menuLists"
                            cols="12"
                    >
                        <router-link to="/buy">
                            <v-tab>
                                <p style="margin: 0; font-size: 1.2em; font-weight: bold">
                                    Автомобиль сотиб олиш
                                </p>
                            </v-tab>
                        </router-link>
                    </v-col>


                    <v-col
                            class="col-3 col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 menuLists"
                            cols="12"
                    >
                        <router-link to="/sale">
                            <v-tab>
                                <p style="margin: 0; font-size: 1.2em; font-weight: bold">
                                    Автомобиль сотиш
                                </p>
                            </v-tab>
                        </router-link>
                    </v-col>


                    <v-col
                            class="col-3 col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 menuLists"
                            cols="12"
                    >
                        <router-link to="/stats">
                            <v-tab>
                                <p style="margin: 0; font-size: 1.2em; font-weight: bold">
                                    Хисоботлар
                                </p>
                            </v-tab>
                        </router-link>

                    </v-col>


                </v-row>
            </v-tabs>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "Navbar"
    }
</script>

<style scoped>
    .v-application a{
        color: white;
    }
    .menuLists, .v-tab{
       height: 100%;
    }
    .v-tab{
        width: 100%;
    }
    .menuLists{
        padding: 0;
        /*border-right: 1px solid black;*/
        /*border-left: 1px solid black;*/
        box-shadow: 10px 0 100px -4px rgba(31, 73, 100, 0.8), -5px 0 8px -4px rgba(31, 73, 100, 0.8);
    }
    a{
        text-decoration: none;
        color: #ffffff;
    }
    .MyNavbar{
        height: 200px;
    }
    .slider_class{
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background: #82B1FF;
    }
</style>