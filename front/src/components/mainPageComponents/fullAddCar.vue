<template>
    <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
            content-class="newdialog"
    >
        <template v-slot:activator="{ on, attrs }">

            <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
            >
                Автомобиль қўшиш
            </v-btn>

        </template>

        <v-card>
            <v-toolbar
                    dark
                    color="primary"
            >
                <v-btn
                        icon
                        dark
                        @click="closeDialog"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <p style="font-size: 1.5em; font-weight: bold">Автомобиль қўшиш</p>
            </v-toolbar>

            <v-container fluid>
                <v-row>
                    <v-col
                            class="col-6 col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"
                            cols="12"
                            xs="12"
                            sm="12"
                            md="6"
                            lg="6"
                            xl="6"
                    >
                        <v-text-field
                                label="Сотиб олинган нархи"
                                v-model="o_narxi"
                                v-mask="'##########'"
                                hide-details="auto"
                        ></v-text-field>
                        <addCar @carDatas="SendData"/>
                    </v-col>
                    <v-col
                            class="col-6 col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"
                            cols="12"
                            xs="12"
                            sm="12"
                            md="6"
                            lg="6"
                            xl="6"
                    >
                        <v-row>
                            <ChooseSaler @clientId="clientId"/>
<!--                            <div v-if="warnDialog" style="width: 100%;">-->
<!--                                <warning/>-->
<!--                            </div>-->
                            <v-col
                                    class="col-12"
                                    cols="12"
                                    sm="12"
                            >
                                <v-layout justify-center>
                                    <v-date-picker v-model="picker"></v-date-picker>
                                </v-layout>
                            </v-col>
                            <div v-if="$store.getters.successDialog" style="width: 100%;">
                                <success/>
                            </div>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>

</template>

<script>
    import addCar from "../carComponents/addCar";
    import warning from "../anyTools/warning";
    import success from "../anyTools/success";
    import ChooseSaler from "../ChooseSaler";
    import {mapActions, mapGetters} from 'vuex'
    export default {
        name: "fullAddCar",
        components: {addCar, ChooseSaler, warning, success},
        data: ()=>({
            dialog: false, clientID: null, warnDialog: false,  o_narxi:null,
            picker: new Date().toISOString().substr(0, 10),
        }),
        computed: mapGetters(["httpRes"]),
        methods:{
            ...mapActions(["addNewCar", "getUserCars"]),
            SendData(carData){
                carData.price = this.o_narxi
                carData.client_Id = this.clientID
                carData.user_id = 1 //NOW ONLY ONE USER
                if(carData.gos_nomer.length === 11){
                    this.addNewCar(carData)
                    this.$store.commit('showSuccessDialog')
                }
            },
            clientId(id){
                if(id) this.warnDialog = false
                this.clientID = id
            },
            closeDialog(){
                this.dialog = false
                this.getUserCars(1)
            }
        },
        mounted() {
            this.$store.commit('mijozType', "Кимдан олинганини танланг")
        }
    }
</script>

<style>
    .newdialog{
        padding-top: 55px !important;
    }
    .btn_block{
        width: 100%;
        margin: 20px auto;
        text-align: center;
    }
</style>