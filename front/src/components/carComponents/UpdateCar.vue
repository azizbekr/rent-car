<template>
    <v-row justify="center">
        <v-dialog
                v-model="$store.getters.EditCarDialog"
                persistent
                max-width="75%"
        >
            <v-card>
                <v-card-title>
                    <span class="headline">Автомобильни Узгартириш : <b>{{editCarInfo[0].model+' '+editCarInfo[0].gos_nomer}}</b></span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
<!--                            1st row-->
                            <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                            >
                                <v-select
                                        :items="carsList"
                                        item-text="text"
                                        item-value="val"
                                        label="Русумни танланг"
                                        v-model="model"
                                ></v-select>
                            </v-col>
                            <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                            >
                                <v-text-field
                                        label="Позицияси"
                                        v-model="pozitsiya"
                                        v-mask="'#'"
                                        hide-details="auto"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                            >
                                <v-text-field
                                        label="Давлат раками"
                                        v-model="davlat_raqami"
                                        v-mask="gos?'## ### AAA':'## A ### AA'"
                                        hide-details="auto"
                                        @input="upperDR"
                                ></v-text-field>
                                <v-checkbox
                                        v-model="gos"
                                        hide-details
                                        label="гос. номер"
                                        class="shrink mr-2 mt-0"
                                ></v-checkbox>
                            </v-col>
<!--                            2nd row-->
                            <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                            >
                                <v-text-field
                                        label="Автомибиль йили"
                                        v-model="yili"
                                        v-mask="'####'"
                                        hide-details="auto"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                            >
                                <v-text-field
                                        label="Пробеги"
                                        v-mask="'#######'"
                                        v-model="probegi"
                                        hide-details="auto"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                            >
                                <v-text-field
                                        label="Краска"
                                        v-model="kraska"
                                        hide-details="auto"
                                ></v-text-field>
                            </v-col>
<!--                            3rd row-->
                            <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                            >
                                <v-radio-group
                                        v-model="korobka"
                                        row
                                >
                                    <v-radio
                                            label="Автомат"
                                            value="avtomat"
                                    ></v-radio>
                                    <v-radio
                                            label="Механика"
                                            value="mexanika"
                                    ></v-radio>
                                </v-radio-group>
                            </v-col>
                            <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                            >
                                <v-select
                                        :items="sostoyanieCar"
                                        item-text="text"
                                        item-value="val"
                                        label="Холатини танланг"
                                        v-model="sostoyaniya"
                                ></v-select>
                            </v-col>
                            <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                            >
                                <v-select
                                        :items="carsColor"
                                        item-text="text"
                                        item-value="val"
                                        label="Ранг танланг"
                                        v-model="rangi"
                                ></v-select>
                            </v-col>
                            <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                            >
                                <v-text-field
                                        label="Кетган харажати"
                                        v-model="xarajat"
                                        v-mask="'##########'"
                                        hide-details="auto"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                            >
                                <v-text-field
                                        label="Нархи"
                                        v-model="narxi"
                                        v-mask="'############'"
                                        hide-details="auto"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                    cols="12"
                                    sm="10"
                                    md="8"
                            >
                                <v-textarea
                                        clearable
                                        clear-icon="mdi-close-circle"
                                        label="Кушимча маълумот"
                                        v-model="qosh_mal"
                                        value=""
                                ></v-textarea>
                            </v-col>

                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="blue darken-1"
                            text
                            @click="closeDialog"
                    >
                        Ёпиш
                    </v-btn>
                    <v-btn
                            color="green darken-1"
                            text
                            @click="UpdateCar"
                    >
                        Саклаш
                    </v-btn>
                </v-card-actions>
                <div v-if="$store.getters.successUpdateDialog" style="width: 100%;">
                    <successUpdate/>
                </div>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import {mapGetters} from 'vuex'
    import ChooseSaler from "../ChooseSaler";
    import successUpdate from "../anyTools/successUpdate";
    export default {
        name: "UpdateCar",
        components:{successUpdate, ChooseSaler},
        data: () => ({
            model: null, pozitsiya: null, davlat_raqami: null, gos: false, yili: null,probegi: null,
            kraska:null, korobka:null,sostoyaniya:null,rangi:null,xarajat: null,qosh_mal: null, narxi: null
        }),
        computed: {
            ...mapGetters(["editCarInfo", "carsList", "sostoyanieCar","carsColor","httpRes"]),
        },
        mounted() {
            this.model = this.editCarInfo[0].model,
            this.pozitsiya = this.editCarInfo[0].position,
            this.davlat_raqami = this.editCarInfo[0].gos_nomer,
            this.yili = this.editCarInfo[0].year,
            this.probegi = this.editCarInfo[0].probeg,
            this.kraska = this.editCarInfo[0].kraska,
            this.korobka = this.editCarInfo[0].korobka,
            this.sostoyaniya = this.editCarInfo[0].sostoyaniya,
            this.rangi = this.editCarInfo[0].color,
            this.xarajat = this.editCarInfo[0].xarajat,
            this.qosh_mal = this.editCarInfo[0].info,
            this.narxi = this.editCarInfo[0].price
        },
        methods:{
            upperDR(){
                this.davlat_raqami = this.davlat_raqami.toUpperCase()
            },
            closeDialog(){
                this.$store.dispatch('getUserCars', 1)
                this.$store.commit('hideEditCarInfoDialog')
            },
            UpdateCar(){
                const updateCarData = {
                    model: this.model, position: this.pozitsiya, gos_nomer: this.davlat_raqami,
                    year: this.yili, probeg: this.probegi, kraska: this.kraska, korobka: this.korobka,
                    sostoyaniya: this.sostoyaniya, color: this.rangi, xarajat: this.xarajat, info: this.qosh_mal,
                    user_id: this.editCarInfo[0].user_id, id: this.editCarInfo[0].id, price: this.narxi
                }
                this.$store.dispatch('UpdateCar', updateCarData)
                this.$store.commit('showSuccessUpdateDialog')
            }
        }
    }
</script>

<style scoped>

</style>