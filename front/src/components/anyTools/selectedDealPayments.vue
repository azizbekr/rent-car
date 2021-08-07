<template>
    <v-container>
        <v-row>
            <v-col class="col-4 col-sm-12 col-md-4 col-lg-4" cols="12" sm="12">
                <div style="width: 100%">
                    <v-row>
                        <v-col cols="6">Русуми</v-col><v-col cols="6">{{ choosen[0].model + ' ' + (choosen[0].gos_nomer || '') }}</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">Сделка санаси</v-col><v-col cols="6">{{ choosen[0].created_date }}</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">Муддати</v-col><v-col cols="6">{{ choosen[0].muddat }}</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">Нархи</v-col><v-col cols="6">{{ parseInt(choosen[0].narxi, 10) + (parseInt(choosen[0].xarajat,10) || 0) }}</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">Бошлангич тулов</v-col><v-col cols="6">{{ choosen[0].boshlangich_tulov }}</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">Ойлик тулов</v-col><v-col cols="6">{{ choosen[0].oylik_tulov }}</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">Колган сумма</v-col><v-col cols="6">{{ Math.round(choosen[0].qolgan_summa) }}</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">Колган муддат</v-col><v-col cols="6">{{ choosen[0].qolgan_muddat }}</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">Ойлик колдик</v-col><v-col cols="6">{{ choosen[0].oylik_qoldiq }}</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">Биринчи тулов</v-col><v-col cols="6">{{ choosen[0].birinchi_tulov }}</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">Биринчи тулов куни</v-col><v-col cols="6">{{ choosen[0].birinchi_tulov_kuni }}</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">Оралик тулов</v-col><v-col cols="6">{{ choosen[0].oraliq_tulov }}</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">Оралик тулов куни</v-col><v-col cols="6">{{ choosen[0].oraliq_tulov_kuni }}</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">Охирги тулов</v-col><v-col cols="6">{{ choosen[0].oxirgi_tulov }}</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">Охирги тулов куни</v-col><v-col cols="6">{{ choosen[0].oxirgi_tulov_kuni }}</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">Изох</v-col><v-col cols="6">{{ choosen[0].info }}</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">Тулов куни</v-col><v-col cols="6">{{ choosen[0].tulov_kuni }}</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">Курс</v-col><v-col cols="6">{{ choosen[0].kurs }} сум</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">Харажати</v-col><v-col cols="6">{{ choosen[0].xarajat }}</v-col>
                    </v-row>
                    <v-row v-if="choosen[0].foiz">
                        <v-col cols="6">Фоиз</v-col><v-col cols="6">{{ choosen[0].foiz }}</v-col>
                    </v-row>
                </div>
            </v-col>
            <v-col v-if="choosen[0].debt" class="col-8 col-sm-12 col-md-8 col-lg-8" cols="12" sm="12">
                <v-row align="center" justify="center" style="margin: 15px 0;">
                    <div v-if="choosen[0].debt.type === 'ok'">
                        <p>Ойлик карздорлик йук</p>
                    </div>
                    <div v-else-if="choosen[0].debt.type === 'debt'" class="monthInfo">
                        <p style="color: red;">{{choosen[0].debt.months + ' ой(лар) учун ' + choosen[0].debt.amount + '$ карз' }}</p>
                    </div>
                    <div v-else-if="choosen[0].debt.type === 'forward'" class="monthInfo">
                        <p style="color: green;">{{choosen[0].debt.months + ' ой(лар) учун ' + choosen[0].debt.amount + '$ олдиндан туланган' }}</p>
                    </div>
                </v-row>
                <div style="width: 100%; text-align: center; margin: 10px auto;" v-for="sddelka in sdelkaPayments">
                    <v-row>
                        <v-col cols="2">
                            Муддат <br>
                            {{ sddelka.muddat_uchun }} - ой учун
                        </v-col>
                        <v-col cols="2">
                            Сумма <br>
                            {{ sddelka.payed_summa }}
                        </v-col>
                        <v-col cols="2">
                            {{ sddelka.muddat_uchun.substr(sddelka.muddat_uchun.length - 1) }} ой колдиги <br>
                            {{ sddelka.qolgan_summa }}
                        </v-col>
                        <v-col cols="4">
                            Изох <br>
                            {{ sddelka.info }}
                        </v-col>
                        <v-col cols="2">
                            Санаси <br>
                            {{ sddelka.pay_d }}
                        </v-col>
                    </v-row>
                    <hr>
                </div>
                <div class="text-center">
                    <v-progress-circular
                            :rotate="-90"
                            :size="200"
                            :width="50"
                            :value="progress"
                            color="teal"
                    >
                        {{ (parseInt(choosen[0].narxi, 10) + (parseInt(choosen[0].xarajat,10) || 0)) + '/' + Math.round((parseInt(choosen[0].narxi, 10) + (parseInt(choosen[0].xarajat,10) || 0)) - this.choosen[0].qolgan_summa)}}
                    </v-progress-circular>
                </div>
            </v-col>
            <v-col v-else class="col-8 col-sm-12 col-md-8 col-lg-8" cols="12" sm="12">
                <div class="text-center">
                    <p>Хозирча туловлар мавжуд эмас</p>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "selectedDealPayments",
        data: ()=>({

        }),
        computed:{
            ...mapGetters(["sdelkaPayments","choosen"]),
            progress(){
                if(this.choosen[0]){
                    let total = parseInt(this.choosen[0].narxi, 10) + (parseInt(this.choosen[0].xarajat,10) || 0)
                    return (total - this.choosen[0].qolgan_summa) * 100 / total
                }else{
                    return 0
                }
            }
        },

    }
</script>

<style scoped>
    .monthInfo{
        text-align: center;
        font-size: 1.3em;
        font-weight: bold;
    }
</style>