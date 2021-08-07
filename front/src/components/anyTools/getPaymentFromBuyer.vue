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
                    block
                    v-bind="attrs"
                    v-on="on"
            >
                Тулов кабул килиш
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
                        @click="dialog = false"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <h2>Тулов кабул килиш</h2>
            </v-toolbar>
            <v-container fluid>
                <v-row>
                    <v-col class="col-4 col-sm-12 col-md-4 col-lg-4" cols="12" sm="12">
                        <v-select
                                :items="myMonitoringListSotish.data"
                                item-text="name"
                                item-value="id"
                                label="Сделкани танланг"
                                v-model="ch_perekupshik"
                                @change="chosen"
                                solo
                        ></v-select>
                        <v-text-field
                                label="Сумма"
                                v-model="summa"
                                hide-details="auto"
                        ></v-text-field>
                        <p style="margin: 15px auto;">Тулов санаси</p>
                        <input type="date" class="my_date"  v-model="pay_day">
                    </v-col>
                    <v-col class="col-6 col-sm-12 col-md-6 col-lg-6" cols="12" sm="12">
                        <v-textarea
                                clearable
                                clear-icon="mdi-close-circle"
                                label="Кушимча маълумот"
                                v-model="qosh_mal"
                        ></v-textarea>
                        <v-btn
                                class="ma-2"
                                outlined
                                color="indigo"
                                @click="addPayment"
                        >
                            Қабул қилиш
                        </v-btn>
                    </v-col>
                    <v-row v-if="$store.getters.sdelkaId">
                        <selectedDealPayments/>
                    </v-row>
                </v-row>
            </v-container>
            <div v-if="$store.getters.successDialog" style="width: 100%;">
                <success-payment/>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import selectedDealPayments from "./selectedDealPayments";
    import successPayment from "./successPayment";
    export default {
        name: "getPaymentFromBuyer",
        components: {selectedDealPayments, successPayment},
        data: ()=> ({
            dialog: false, row: false, progress_value: 0, progress_text: '',
            choosen: {}, ch_perekupshik:null, currentSdelkaId: null,
            summa: null, pay_day:new Date().toISOString().substr(0, 10), qosh_mal: '', cars: {},
            rules: [
                value => !!value || '*',
                value => (value && value.length >= 1) || 'Min 1 characters',
            ],
        }),
        computed: {
            ...mapGetters(["myMonitoringListSotish","sdelkaPayments"]),

        },
        methods:{
            ...mapActions(["getUserSotishList", "getSdelkaPayments","addSdelkaPayment","choosenSdelka"]),
            chosen(one){
                this.$store.commit('sdelkaId', one)
                console.log(one)
                this.currentSdelkaId = one
                this.row =true
                this.choosenSdelka(one)
                this.getSdelkaPayments(one)
            },
            addPayment(){
                const payData = {user_id:1, sdelka_id: this.currentSdelkaId, summa: this.summa, info: this.qosh_mal, pay_date: this.pay_day}
                console.log(payData)
                this.addSdelkaPayment(payData)
                this.$store.commit('showSuccessDialog')
            }
        },
        mounted() {
            this.getUserSotishList(1)
        }
    }
</script>

<style >
    .newdialog{
        padding-top: 55px !important;
    }
    .btn_block{
        width: 100%;
        margin: 20px auto;
        text-align: center;
    }

</style>