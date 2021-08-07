<template>
    <v-container>
        <v-row>
            <v-col
                    class="col-12 col-sm-12 col-md-6 col-lg-6"
                    cols="12"
            >

                <div class="buyType">
                    <v-radio-group
                            v-model="buyType"
                            row
                    >
                        <v-radio
                                label="Накт"
                                value="naqt"
                        ></v-radio>
                        <v-radio
                                label="Муддатли"
                                value="muddatli"
                        ></v-radio>
                        <v-radio
                                label="Фоизли"
                                value="foizli"
                        ></v-radio>
                    </v-radio-group>
                    <v-radio-group
                            v-model="valyuta"
                            @change="getCurs"
                            row
                    >
                        <v-radio
                                label="Сум"
                                value="sum"
                        ></v-radio>
                        <v-radio
                                label="Доллар"
                                value="dollar"
                        ></v-radio>
                    </v-radio-group>
                    <p v-if="kurs">Доллар курси: {{kurs.Rate}} сана: {{ kurs.Date}}</p>
                    <p>Сделака саниси</p>
                    <input type="date" class="my_date"  v-model="created_at">
                    <v-text-field
                            label="Умумий нархи"
                            :rules="rules"
                            v-model="final_price"
                            hide-details="auto"
                            disabled
                    ></v-text-field>
                    <v-text-field
                            v-if="valyuta === 'sum'"
                            label="Келишилган нархи сумда"
                            :rules="rules"
                            v-model="kelishilgan_narxi_s"
                            v-mask="'##########'"
                            hide-details="auto"
                            @input="kelNarx"
                    ></v-text-field>
                    <v-text-field
                            label="Келишилган нархи долларда"
                            :rules="rules"
                            v-model="kelishilgan_narxi"
                            hide-details="auto"
                            @input="setTotalPrice"
                            :disabled="valyuta === 'sum'"
                    ></v-text-field>
                    <div v-if="buyType==='muddatli'">
                        <v-text-field
                                label="Муддатли (ой)"
                                :rules="rules"
                                v-model="m_srok"
                                v-mask="'##'"
                                hide-details="auto"
                        ></v-text-field>

                        <v-text-field
                                label="Олидиндан тулов"
                                v-model="m_oldindan_tolov"
                                hide-details="auto"
                        ></v-text-field>


                        <v-text-field
                                label="Ойлик тулов"
                                v-model="m_oyiga"
                                hide-details="auto"
                        ></v-text-field>
                        <div class="counting">
                            <span>
                                <v-btn
                                        class="ma-2"
                                        outlined
                                        color="indigo"
                                        @click="countPerMonthMuddatli"
                                >
                                    Хисоблаш
                                </v-btn>
                            </span>
                        </div>
                    </div>
                    <div v-else-if="buyType==='foizli'">
                        <v-text-field
                                label="Олдиндан тулов"
                                v-model="f_oldindan_tolov"
                                hide-details="auto"
                        ></v-text-field>
                        <v-text-field
                                label="Тулов муддати (ой)"
                                v-model="f_srok"
                                hide-details="auto"
                        ></v-text-field>
                        <v-text-field
                                label="Йиллик фоиз (%)"
                                v-model="percent"
                                hide-details="auto"
                        ></v-text-field>
                        <v-text-field
                                label="Ойлик тулов"
                                v-model="f_oyiga"
                                hide-details="auto"
                        ></v-text-field>
                        <div class="counting">
                                <span>
                                    <v-btn
                                            class="ma-2"
                                            outlined
                                            color="indigo"
                                            @click="countPerMonthFoizli"
                                    >
                                        Хисоблаш
                                    </v-btn>
                                </span>
                        </div>
                    </div>
                    <div v-if="buyType !== 'naqt'">
                        <v-text-field
                                label="Ойлик тулов кунлари"
                                v-model="oyiga_srok"
                                v-mask="'##'"
                                hide-details="auto"
                        ></v-text-field>
                    </div>
                </div>
                <br>
                <hr>
                <br>
                <addCar @carDatas="SendData"/>

            </v-col>
            <v-col
                    class="col-12 col-sm-12 col-md-6 col-lg-6"
                    cols="12"
            >
                <addPaymentModal/>

                <ChooseSaler @clientId="clientId"/>

                <div v-if="buyType !== 'naqt'">
                    <div class="flex-center">
                        <v-radio-group
                                v-model="oy"
                                row
                        >
                            <v-radio
                                    label="Биринчи"
                                    value="birinchi"
                            ></v-radio>
                            <v-radio
                                    label="Оралик"
                                    value="oraliq"
                            ></v-radio>
                            <v-radio
                                    label="Охирги"
                                    value="oxirgi"
                            ></v-radio>
                        </v-radio-group>
                    </div>
                    <div v-if="buyType === 'muddatli'">
                        <div v-show="oy === 'birinchi'" style="text-align: center">
                            <p>Биринчи муддат</p>
                            <div class="tt">
                                <v-text-field
                                        label="Биринчи тулов"
                                        v-model="m_birinchi_tolov"
                                        hide-details="auto"
                                ></v-text-field>
                            </div>
                            <v-layout justify-center>
                                <v-date-picker v-model="first_pay_day"></v-date-picker>
                            </v-layout>
                        </div>
                        <div v-show="oy === 'oraliq'" style="text-align: center">
                            <p>Оралик муддат</p>
                            <div class="tt">
                                <v-text-field
                                        label="Оралик тулов"
                                        v-model="m_oraliq_tolov"
                                        hide-details="auto"
                                ></v-text-field>
                            </div>
                            <v-layout justify-center>
                                <v-date-picker v-model="middle_pay_day"></v-date-picker>
                            </v-layout>
                        </div>
                        <div v-show="oy === 'oxirgi'" style="text-align: center">
                            <p>Охирги муддат</p>
                            <div class="tt">
                                <v-text-field
                                        label="Охирги тулов"
                                        v-model="m_oxirgi_tolov"
                                        hide-details="auto"
                                ></v-text-field>
                            </div>
                            <v-layout justify-center>
                                <v-date-picker v-model="last_pay_day"></v-date-picker>
                            </v-layout>
                        </div>
                    </div>
                    <div v-else-if="buyType === 'foizli'">
                        <div v-show="oy === 'birinchi'" style="text-align: center">
                            <p>Биринчи муддат</p>
                            <div class="tt">
                                <v-text-field
                                        label="Биринчи тулов"
                                        v-model="f_birinchi_tolov"
                                        hide-details="auto"
                                ></v-text-field>
                            </div>
                            <v-layout justify-center>
                                <v-date-picker v-model="first_pay_day"></v-date-picker>
                            </v-layout>
                        </div>
                        <div v-show="oy === 'oraliq'" style="text-align: center">
                            <p>Оралик муддат</p>
                            <div class="tt">
                                <v-text-field
                                        label="Оралик тулов"
                                        v-model="f_oraliq_tolov"
                                        hide-details="auto"
                                ></v-text-field>
                            </div>
                            <v-layout justify-center>
                                <v-date-picker v-model="middle_pay_day"></v-date-picker>
                            </v-layout>
                        </div>
                        <div v-show="oy === 'oxirgi'" style="text-align: center">
                            <p>Охирги муддат</p>
                            <div class="tt">
                                <v-text-field
                                        label="Охирги тулов"
                                        v-model="f_oxirgi_tolov"
                                        hide-details="auto"
                                ></v-text-field>
                            </div>
                            <v-layout justify-center>
                                <v-date-picker v-model="last_pay_day"></v-date-picker>
                            </v-layout>
                        </div>
                    </div>
                </div>


                <v-textarea
                        clearable
                        clear-icon="mdi-close-circle"
                        label="Кушимча маълумот (сделка)"
                        v-model="info_deal"
                        value=""
                ></v-textarea>
                <div v-if="$store.getters.successDialog">
                    <success/>
                </div>
            </v-col>
            <div class="text-center">
                <v-snackbar
                        v-model="snackbar"
                        :timeout="snackTimeout"
                >
                    {{ snackText }}

                    <template v-slot:action="{ attrs }">
                        <v-btn
                                color="blue"
                                text
                                v-bind="attrs"
                                @click="snackbar = false"
                        >
                            Ёпиш
                        </v-btn>
                    </template>
                </v-snackbar>
            </div>
        </v-row>

    </v-container>
</template>

<script>
    import addPaymentModal from "./anyTools/addPaymentModal";
    import addCar from "./carComponents/addCar";
    import ChooseSaler from "./ChooseSaler";
    import {mapActions, mapGetters} from "vuex";
    import warning from "./anyTools/warning";
    import success from "./anyTools/success";
    export default {
        name: "BuyCar",
        components:{
          addPaymentModal, addCar, ChooseSaler, warning, success
        },
        data: ()=>({
            m_birinchi_tolov: null, m_oraliq_tolov: null, m_oxirgi_tolov: null, f_birinchi_tolov: null, f_oraliq_tolov: null, f_oxirgi_tolov: null, oyiga_srok: null,
            items: [
                {name: "Накдга олиш", val: "naqt"},
                {name: "Муддатли олиш", val: "muddatli"}
            ], valyuta: 'dollar', kurs: null, kelishilgan_narxi_s: null,
            rules: [
                value => !!value || '*',
                value => (value && value.length >= 1) || 'Min 1 characters',
            ],
            snackbar: false, snackTimeout: 3000, snackText: "",
            buyType: 'naqt', final_price: null, m_oldindan_tolov: null, f_srok: 1, percent: null, clientID: null, warnDialog: false,
            m_srok:1, f_oldindan_tolov:null, m_oyiga: null, f_oyiga: null, kelishilgan_narxi: null, created_at: new Date().toISOString().substr(0, 10),
            first_pay_day: null, middle_pay_day: null, last_pay_day: null, info_deal: null, oy: 'birinchi'
        }),
        methods:{
            setTotalPrice(){
              if(this.buyType === 'naqt'){
                  this.final_price = this.kelishilgan_narxi
              }
            },
            async getCurs(){
                if(this.$store.getters.kurs){
                    this.kurs = await this.$store.getters.kurs
                }else{
                    this.kurs = await this.$store.dispatch('kursValyut')
                }
                if(this.kurs && this.kelishilgan_narxi){
                    this.kelishilgan_narxi = parseInt((this.kelishilgan_narxi_s / this.kurs.Rate), 10)
                }
            },
            kelNarx(){
                if(this.valyuta === 'sum'){
                    this.kelishilgan_narxi = parseInt((this.kelishilgan_narxi_s / this.kurs.Rate), 10)
                }
            },
            countSummasMuddatli(){
                let oldindan = this.m_oldindan_tolov || 0
                let birinchi = this.m_birinchi_tolov || 0
                let oxirgi = this.m_oxirgi_tolov || 0
                let narxi = this.final_price
                this.m_oyiga = (narxi - oldindan - birinchi - oxirgi)/this.m_srok
                if(birinchi && oxirgi){
                    this.m_oraliq_tolov = (narxi - oldindan - birinchi - oxirgi)/this.m_srok
                }
            },
            countPerMonthMuddatli(){
                this.m_oyiga = (this.kelishilgan_narxi - this.m_oldindan_tolov) / this.m_srok
                this.final_price = this.m_oyiga * this.m_srok + + this.m_oldindan_tolov
                if(this.m_birinchi_tolov){
                    console.log("1", this.m_birinchi_tolov)
                    this.m_oyiga = (this.final_price - this.m_oldindan_tolov - this.m_birinchi_tolov) / (this.m_srok - 1)
                }
                if(this.m_oxirgi_tolov){
                    console.log("1", this.m_birinchi_tolov)
                    this.m_oyiga = (this.final_price - this.m_oldindan_tolov - this.m_oxirgi_tolov) / (this.m_srok - 1)
                }
                if(this.m_birinchi_tolov && this.m_oraliq_tolov){
                    console.log("2", this.m_oraliq_tolov)
                    this.m_oyiga = (this.final_price - this.m_oldindan_tolov - this.m_birinchi_tolov - this.m_oraliq_tolov) / (this.m_srok - 2)
                }

                if(this.m_birinchi_tolov && this.m_oxirgi_tolov){
                    console.log("1-3", this.m_oxirgi_tolov)
                    this.m_oyiga = (this.final_price - this.m_oldindan_tolov - this.m_birinchi_tolov - this.m_oxirgi_tolov) / (this.m_srok - 2)
                }
                if(this.m_birinchi_tolov && this.m_oraliq_tolov && this.m_oxirgi_tolov){
                    console.log("3", this.m_oxirgi_tolov)
                    console.log("3", (this.final_price - this.m_oldindan_tolov - this.m_birinchi_tolov - this.m_oraliq_tolov - this.m_oxirgi_tolov) / (this.m_srok - 3))
                    console.log("3", this.m_srok - 3)
                    this.m_oyiga = (this.final_price - this.m_oldindan_tolov - this.m_birinchi_tolov - this.m_oraliq_tolov - this.m_oxirgi_tolov) / (this.m_srok - 3)
                }

            },
            countPerMonthFoizli(){
                this.f_oyiga = (this.kelishilgan_narxi - this.f_oldindan_tolov) * ((this.percent/12) * this.f_srok/100 + +1) / this.f_srok
                this.final_price = this.f_oyiga * this.f_srok + + this.f_oldindan_tolov
                if(this.f_birinchi_tolov){
                    console.log("1", this.f_birinchi_tolov)
                    this.f_oyiga = (this.final_price - this.f_oldindan_tolov - this.f_birinchi_tolov) / (this.f_srok - 1)
                }
                if(this.f_birinchi_tolov && this.f_oraliq_tolov){
                    console.log("2", this.f_oraliq_tolov)
                    this.f_oyiga = (this.final_price - this.f_oldindan_tolov - this.f_birinchi_tolov - this.f_oraliq_tolov) / (this.f_srok - 2)
                }
                if(this.f_birinchi_tolov && this.f_oraliq_tolov && this.f_oxirgi_tolov){
                    console.log("3", this.f_oxirgi_tolov)
                    this.f_oyiga = (this.final_price - this.f_oldindan_tolov - this.f_birinchi_tolov - this.f_oxirgi_tolov) / (this.f_srok - 3)
                }
                if(this.f_birinchi_tolov && this.f_oxirgi_tolov){
                    console.log("1-3", this.f_oxirgi_tolov)
                    this.f_oyiga = (this.final_price - this.f_oldindan_tolov - this.f_birinchi_tolov - this.f_oxirgi_tolov) / (this.f_srok - 2)
                }

            },
            ...mapActions(["addNewDeal"]),
            SendData(carData){
                let dealData = {
                    turi: "olish", narxi: this.final_price, savdo_turi: this.buyType, info_deal: this.info_deal, created_at: this.created_at, course: this.kurs.Rate
                }
                if(this.buyType === 'naqt') this.final_price = this.kelishilgan_narxi
                dealData.foiz = null
                if(this.buyType === 'naqt'){
                    dealData.muddat = null
                    dealData.oldindan_tulov = null
                    dealData.birinchi_tulov_kuni = null
                    dealData.oraliq_tulov_kuni = null
                    dealData.oxirgi_tulov_kuni = null
                    dealData.tulov_kuni = null
                }else if(this.buyType === 'muddatli'){
                    dealData.birinchi_tulov_kuni = this.first_pay_day
                    dealData.oraliq_tulov_kuni = this.middle_pay_day
                    dealData.oxirgi_tulov_kuni = this.last_pay_day
                    dealData.tulov_kuni = this.oyiga_srok
                    dealData.birinchi_tolov = this.m_birinchi_tolov
                    dealData.oraliq_tolov = this.m_oraliq_tolov
                    dealData.oxirgi_tolov = this.m_oxirgi_tolov
                    dealData.muddat = this.m_srok
                    dealData.oldindan_tulov = this.m_oldindan_tolov
                    dealData.oylik_tulov = this.m_oyiga
                }else if(this.buyType === 'foizli'){
                    dealData.birinchi_tulov_kuni = this.first_pay_day
                    dealData.oraliq_tulov_kuni = this.middle_pay_day
                    dealData.oxirgi_tulov_kuni = this.last_pay_day
                    dealData.tulov_kuni = this.oyiga_srok
                    dealData.birinchi_tolov = this.f_birinchi_tolov
                    dealData.oraliq_tolov = this.f_oraliq_tolov
                    dealData.oxirgi_tolov = this.f_oxirgi_tolov
                    dealData.muddat = this.f_srok
                    dealData.oldindan_tulov = this.f_oldindan_tolov
                    dealData.foiz = this.percent
                    dealData.oylik_tulov = this.f_oyiga
                }
                dealData.client_Id = this.clientID
                // console.log("test", dealData)
                if(carData.gos_nomer.length === 11){
                    if(dealData.client_Id || this.info_deal){
                        console.log(dealData.client_Id, this.info_deal)
                        // this.addNewDeal({user_id:1,carData, dealData})
                        // this.$store.commit('showSuccessDialog')
                    }else{
                        this.snackText = "Сделакага кошимча маълумот киритинг ёки мижозни танланг"
                        this.snackbar = true
                    }
                }else{
                    this.snackText = "Автомобиль давлат ракамини киритинг"
                    this.snackbar = true
                }
            },
            clientId(id){
                this.clientID = id
            },
        },
        async mounted() {
            this.$store.commit('mijozType', "Кимдан олинганини танланг")
            await this.$store.dispatch('kursValyut')
            this.getCurs()
        }
    }
</script>

<style scoped>
    .btn_block{
        margin: 20px auto;
    }
    .my_date{
        display: block;
        width: 100%;
        outline: navajowhite;
        --darkreader-inline-outline: #7d4e08;
        border-bottom: 1px solid gray;
        margin: 15px auto;
    }
    .flex-center {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .tt{
        width: 100%;
        margin: 20px auto;
        padding: 0 135px;
    }
</style>