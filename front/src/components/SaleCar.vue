<template>
    <v-container>
        <v-row>
            <v-col
                    class="col-6"
                    cols="6"
                    md="6"
                    lg="6"
                    sm="12"
            >

                    <div class="saleType">
                        <v-radio-group
                                v-model="saleType"
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

                        <v-row v-if="profit_show" style="border: 1px solid grey; margin: 15px 0; border-radius: 5px;">
                            <v-col style="text-align: center; border-right: 1px solid lightgrey;">
                                Фойда <br>
                                {{total_percent_prof +'% - '+ (profit_per_month*srok)+'$'}}
                            </v-col>
                            <v-col style="text-align: center; border-right: 1px solid lightgrey;">
                                Ойига <br>
                                {{per_mount +'% - '+ profit_per_month +'$'}}
                            </v-col>
                            <v-col style="text-align: center; border-right: 1px solid lightgrey;">
                                Накт<br>
                                {{naqt_profit +'$'}}
                            </v-col>
                            <v-col style="text-align: center">
                                Устидан<br>
                                {{profit +'$'}}
                            </v-col>
                            <v-col cols="12" class="col-12" style="text-align: center; border-top: 1px solid lightgrey">
                                Умумий фойда -  {{total_profit +'$'}}
                            </v-col>
                        </v-row>
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
                                v-model="final_price"
                                v-mask="'##########'"
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
                                :disabled="valyuta === 'sum'"
                        ></v-text-field>
                        <div v-if="saleType==='muddatli'">
                            <v-text-field
                                    label="Муддатли (ой)"
                                    v-model="m_srok"
                                    v-mask="'##'"
                                    hide-details="auto"
                            ></v-text-field>

                            <v-text-field
                                    label="Олидиндан тулов"
                                    v-model="m_oldindan_tolov"
                                    v-mask="'#########'"
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
                            <span>
                                <v-btn
                                        class="ma-2"
                                        outlined
                                        color="indigo"
                                        @click="countMuddat"
                                >
                                    Муддатни хисоблаш
                                </v-btn>
                            </span>
                            </div>
                        </div>
                        <div v-else-if="saleType==='foizli'">
                            <v-text-field
                                    label="Олдиндан тулов"
                                    v-model="f_oldindan_tolov"
                                    v-mask="'#########'"
                                    hide-details="auto"
                            ></v-text-field>
                            <v-text-field
                                    label="Тулов муддати (ой)"
                                    v-model="f_srok"
                                    v-mask="'##'"
                                    hide-details="auto"
                            ></v-text-field>
                            <v-text-field
                                    label="Йиллик фоиз (%)"
                                    v-model="percent"
                                    v-mask="'###'"
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
                    </div>
                <p v-if="variat_text">{{variat_text}}</p>
                    <v-select
                            :items="myCarList"
                            item-text="name"
                            item-value="id"
                            label="Автомобильни танлаш"
                            v-model="currentCar"
                            @change="carType"
                            solo
                    ></v-select>

                    <v-btn
                            v-if="profit_btn"
                        class="ma-2"
                        outlined
                        color="indigo"
                        @click="countProfit"
                    >
                        Фойдани хисоблаш
                    </v-btn>
                    <v-simple-table>
                        <template v-slot:default>
                            <tbody v-for="car in chosenCar">
                            <tr>
                                <td>Русуми</td>
                                <td>{{car.model}}</td>
                            </tr>
                            <tr>
                                <td>Давлат раками</td>
                                <td>{{car.gos_nomer}}</td>
                            </tr>
                            <tr>
                                <td>Автомибиль йили</td>
                                <td>{{car.year}}</td>
                            </tr>
                            <tr>
                                <td>Сотиб олинган нархи</td>
                                <td>{{car.price}}</td>
                            </tr>
                            <tr>
                                <td>Харажати</td>
                                <td>{{car.xarajat}}</td>
                            </tr>
                            <tr>
                                <td>Умумий нархи</td>
                                <td>{{parseInt(car.price, 10) + parseInt(car.xarajat, 10)}}</td>
                            </tr>
                            </tbody>
                        </template>
                    </v-simple-table>

                    <div class="btn_block">
                        <v-btn
                                class="ma-2"
                                outlined
                                color="indigo"
                                block
                                @click="SaleCar"
                        >
                            OK
                        </v-btn>
                    </div>
                </v-col>
                <v-col
                        class="col-6 col-xs-12 col-sm-12 col-md-6 col-lg-6"
                        cols="12"
                        xs="12"
                        sm="12"
                        md="6"
                        lg="6"
                        xl="6"
                >
                    <getPaymentFromBuyer/>
                    <ChooseSaler @clientId="clientId"/>
                    <div v-if="saleType !== 'naqt'">
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
                        <div v-if="saleType === 'muddatli'">
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
                        <div v-else-if="saleType === 'foizli'">
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
                            label="Кушимча маълумот"
                            v-model="qosh_mal"
                    ></v-textarea>
                </v-col>
            <div v-if="$store.getters.successDialog">
                <success/>
            </div>
        </v-row>
    </v-container>
</template>

<script>
    import ChooseSaler from "./ChooseSaler";
    import getPaymentFromBuyer from "./anyTools/getPaymentFromBuyer";
    import {mapActions, mapGetters} from 'vuex'
    import warning from "./anyTools/warning";
    import success from "./anyTools/success";
    export default {
        name: "SaleCar",
        components: {getPaymentFromBuyer, ChooseSaler,warning,success},
        data: ()=>({
            m_birinchi_tolov: null, m_oraliq_tolov: null, m_oxirgi_tolov: null, f_birinchi_tolov: null, f_oraliq_tolov: null, f_oxirgi_tolov: null, oyiga_srok: null,
            total_profit: null, total_percent_prof: null, per_mount: null, srok: 0, created_at: new Date().toISOString().substr(0, 10),
            first_pay_day: null, m_srok: 1, m_oldindan_tolov: null, s_narxi:null, f_srok: 1, f_oldindan_tolov: null, profit_show: false, profit_btn: false,
            oy: 'birinchi', f_oyiga_show: null, m_oyiga_show: null, kelishilgan_narxi_s: null, valyuta: 'dollar', kurs: null, naqt_profit: null,
            rules: [
                value => !!value || '*',
                value => (value && value.length >= 1) || 'Min 1 characters',
            ],
            m_oyiga: null, f_oyiga: null, warnDialog: false, clientID: null,
            saleType: 'naqt', percent: null, final_price: null, kelishilgan_narxi:null,
            pay_day: new Date().toISOString().substr(0, 10),
            o_narxi: null, qosh_mal: null, middle_pay_day: null, last_pay_day:null,
            currentCar: {}, chosenCar: [], profit: null, profit_per_month: 0, variat_text: ''
        }),
        computed: mapGetters(["myCarList", "httpRes"]),
        methods:{
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
            countMuddat(){
                let srok = 0
                this.m_srok =  Math.ceil((this.kelishilgan_narxi - this.m_oldindan_tolov) / (this.m_oyiga - ((this.kelishilgan_narxi - this.m_oldindan_tolov)*0.025)))
                let isFloat = (this.kelishilgan_narxi - this.m_oldindan_tolov) % (this.m_oyiga - ((this.kelishilgan_narxi - this.m_oldindan_tolov)*0.025))
                !isFloat ? srok = this.m_srok : srok = this.m_srok - 1
                let ost = (this.kelishilgan_narxi - this.m_oldindan_tolov) * (2.5*this.m_srok/100 + +1) - (this.m_oyiga * srok)
                this.final_price = ((this.kelishilgan_narxi - this.m_oldindan_tolov) * (2.5*this.m_srok/100 + +1)) + + this.m_oldindan_tolov
                if (ost>0){
                    this.variat_text = `${srok} ойга ${this.m_oyiga} дан ва охирги ой учун ${ost}`
                }else{
                    this.variat_text = `${srok} ойга ${this.m_oyiga} дан`
                }
            },
            countPerMonthMuddatli(){
                this.m_oyiga = (this.kelishilgan_narxi - this.m_oldindan_tolov) * (2.5*this.m_srok/100 + +1) / this.m_srok
                this.final_price = Math.round(this.m_oyiga * this.m_srok + + this.m_oldindan_tolov)
                if(this.m_birinchi_tolov){
                    this.m_oyiga = (this.final_price - this.m_oldindan_tolov - this.m_birinchi_tolov) / (this.m_srok - 1)
                }
                if(this.m_oxirgi_tolov){
                    this.m_oyiga = (this.final_price - this.m_oldindan_tolov - this.m_oxirgi_tolov) / (this.m_srok - 1)
                }
                if(this.m_birinchi_tolov && this.m_oraliq_tolov){
                    this.m_oyiga = (this.final_price - this.m_oldindan_tolov - this.m_birinchi_tolov - this.m_oraliq_tolov) / (this.m_srok - 2)
                }
                if(this.m_birinchi_tolov && this.m_oxirgi_tolov){
                    this.m_oyiga = (this.final_price - this.m_oldindan_tolov - this.m_birinchi_tolov - this.m_oxirgi_tolov) / (this.m_srok - 2)
                }
                if(this.m_birinchi_tolov && this.m_oraliq_tolov && this.m_oxirgi_tolov){
                    this.m_oyiga = (this.final_price - this.m_oldindan_tolov - this.m_birinchi_tolov - this.m_oraliq_tolov - this.m_oxirgi_tolov) / (this.m_srok - 3)
                }

            },
            countPerMonthFoizli(){
                this.f_oyiga = ((this.kelishilgan_narxi - this.f_oldindan_tolov) * ((this.percent/12) * this.f_srok/100 + +1) / this.f_srok).toFixed(2)
                this.final_price = Math.round(this.f_oyiga * this.f_srok + + this.f_oldindan_tolov)
                if(this.f_birinchi_tolov){
                    this.f_oyiga = (this.final_price - this.f_oldindan_tolov - this.f_birinchi_tolov) / (this.f_srok - 1)
                }
                if(this.f_oxirgi_tolov){
                    this.f_oyiga = (this.final_price - this.f_oldindan_tolov - this.f_oxirgi_tolov) / (this.f_srok - 1)
                }
                if(this.f_birinchi_tolov && this.f_oraliq_tolov){
                    this.f_oyiga = (this.final_price - this.f_oldindan_tolov - this.f_birinchi_tolov - this.f_oraliq_tolov) / (this.f_srok - 2)
                }
                if(this.f_birinchi_tolov && this.f_oxirgi_tolov){
                    this.f_oyiga = (this.final_price - this.f_oldindan_tolov - this.f_birinchi_tolov - this.f_oxirgi_tolov) / (this.f_srok - 2)
                }
                if(this.f_birinchi_tolov && this.f_oraliq_tolov && this.f_oxirgi_tolov){
                    this.f_oyiga = (this.final_price - this.f_oldindan_tolov - this.f_birinchi_tolov - this.f_oraliq_tolov - this.f_oxirgi_tolov) / (this.f_srok - 3)
                }

            },

            countProfit(){
                if(this.saleType === 'muddatli'){
                    this.srok = this.m_srok
                    let narx = parseInt(this.chosenCar[0].price, 10) + parseInt(this.chosenCar[0].xarajat, 10)
                    this.profit_show = true
                    this.profit = this.kelishilgan_narxi - narx
                    this.total_profit = this.final_price - narx
                    this.total_percent_prof = (30/12)*this.m_srok
                    this.per_mount = 30/12
                    this.profit_per_month = ((this.total_profit - this.profit) / this.m_srok).toFixed(2)
                    if(this.m_oldindan_tolov > this.profit ){
                        this.naqt_profit = this.kelishilgan_narxi - narx
                    }else{
                        this.naqt_profit = this.m_oldindan_tolov || 0
                    }
                }else if(this.saleType === 'foizli'){
                    this.srok = this.f_srok
                    let narx = parseInt(this.chosenCar[0].price, 10) + parseInt(this.chosenCar[0].xarajat, 10)
                    this.profit_show = true
                    this.profit = this.kelishilgan_narxi - narx
                    this.total_profit = this.final_price - narx
                    this.total_percent_prof = ((this.percent/12)*this.f_srok).toFixed(2)
                    this.per_mount = (this.percent/12).toFixed(2)
                    this.profit_per_month = ((this.total_profit - this.profit) / this.f_srok).toFixed(2)
                    if(this.f_oldindan_tolov > this.profit ){
                        this.naqt_profit = this.kelishilgan_narxi - narx
                    }else{
                        this.naqt_profit = this.f_oldindan_tolov || 0
                    }
                }

            },
            ...mapActions(["getUserCars", "addNewDeal"]),
            carType(car){
                this.chosenCar = this.myCarList.filter(t=>t.id === car)
                this.profit_btn = true
            },

            SaleCar(){
                let dealData = {turi: "sotish", created_at: this.created_at, narxi: this.final_price, kelishilgan_narxi: this.kelishilgan_narxi, savdo_turi: this.saleType, info_deal: this.qosh_mal, tulov_kuni: this.pay_day, tan_narxi: (parseInt(this.chosenCar[0].price, 10) + parseInt(this.chosenCar[0].xarajat,2)), course: this.kurs.Rate}
                if(this.saleType === 'naqt'){
                    dealData.muddat = null
                    dealData.oldindan_tulov = null
                    dealData.tulov_kuni = null
                }else if(this.saleType === 'muddatli'){
                    dealData.muddat = this.m_srok
                    dealData.oldindan_tulov = this.m_oldindan_tolov
                    dealData.oylik_tulov = this.m_oyiga
                    dealData.oraliq_tulov_kuni = this.middle_pay_day
                    dealData.oxirgi_tulov_kuni = this.last_pay_day
                }else if(this.saleType === 'foizli'){
                    dealData.muddat = this.f_srok
                    dealData.oldindan_tulov = this.f_oldindan_tolov
                    dealData.foiz = this.percent
                    dealData.oylik_tulov = this.f_oyiga
                    dealData.oraliq_tulov_kuni = this.middle_pay_day
                    dealData.oxirgi_tulov_kuni = this.last_pay_day
                }

                if(!this.chosenCar){
                    this.warnDialog = true
                }else{
                    dealData.car_id = this.chosenCar[0].id
                    dealData.client_Id = this.clientID
                    this.addNewDeal({user_id:1,dealData})
                    this.$store.commit('showSuccessDialog')
                }

            },
            clientId(id){
                if(id) this.warnDialog = false
                this.clientID = id
            },
        },
        async mounted() {
            this.$store.commit('mijozType', "Кимга сотилаётганини танланг")
            await this.$store.dispatch('kursValyut')
            this.getCurs()
            this.getUserCars()
        }
    }
</script>

<style scoped>
    .saleType{
        margin: 15px 0;
    }
    .my_date{
        display: block;
        width: 100%;
        outline: navajowhite;
        --darkreader-inline-outline: #7d4e08;
        border-bottom: 1px solid gray;
    }
    .btn_block{
        margin: 20px auto;
    }
    .counting{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .pay_day_title{
        margin: 10px auto;
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