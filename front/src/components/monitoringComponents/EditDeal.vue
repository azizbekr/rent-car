<template>
    <v-dialog
            v-model="$store.getters.EditDealDialog"
            persistent
            max-width="75%"
    >
        <v-card>
            <v-card-title>
                <span class="headline">Сделкани Узгартириш</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>

                        <!--                                                    1st row-->
                        <v-col
                                cols="12"
                                sm="6"
                                md="4"
                        >
                            <v-text-field
                                    label="Нархи"
                                    v-model="narxi"
                                    hide-details="auto"
                            ></v-text-field>
                        </v-col>
                        <v-col
                                cols="12"
                                sm="6"
                                md="4"
                        >
                            <v-text-field
                                    label="Ойлик тулов"
                                    v-model="oylik_tulov"
                                    hide-details="auto"
                            ></v-text-field>
                        </v-col>
                        <v-col
                                cols="12"
                                sm="6"
                                md="4"
                        >
                            <v-text-field
                                    label="Муддат"
                                    v-model="muddat"
                                    v-mask="'##########'"
                                    hide-details="auto"
                            ></v-text-field>
                        </v-col>
                        <!--                            2nd row-->
                        <v-col
                                cols="12"
                                sm="6"
                                md="4"
                        >
                            <v-text-field
                                    label="Колган сумма"
                                    v-model="qolgan_summa"
                                    hide-details="auto"
                            ></v-text-field>
                        </v-col>
                        <v-col
                                cols="12"
                                sm="6"
                                md="4"
                        >
                            <v-text-field
                                    label="Бошлангич толов"
                                    v-model="boshlangich_tulov"
                                    hide-details="auto"
                            ></v-text-field>
                        </v-col>
                        <v-col
                                cols="12"
                                sm="6"
                                md="4"
                        >
                            <v-text-field
                                    label="Колган муддат"
                                    v-model="qolgan_muddat"
                                    hide-details="auto"
                            ></v-text-field>
                        </v-col>

                        <v-col
                                cols="12"
                                sm="6"
                                md="4"
                        >
                            <v-text-field
                                    label="Биринчи толов"
                                    v-model="birinchi_tulov"
                                    hide-details="auto"
                            ></v-text-field>
                        </v-col>

                        <v-col
                                cols="12"
                                sm="6"
                                md="4"
                        >
                            <v-text-field
                                    label="Оралик тулов"
                                    v-model="oraliq_tulov"
                                    hide-details="auto"
                            ></v-text-field>
                        </v-col>
                        <v-col
                                cols="12"
                                sm="6"
                                md="4"
                        >
                            <v-text-field
                                    label="Охирги тулов"
                                    v-model="oxirgi_tulov"
                                    hide-details="auto"
                            ></v-text-field>
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
                        @click="UpdateDeal"
                >
                    Саклаш
                </v-btn>
            </v-card-actions>
            <div v-if="$store.getters.successUpdateDialog" style="width: 100%;">
                <successUpdate/>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
    import successUpdate from "../anyTools/successUpdate";
    import {mapGetters} from "vuex";

    export default {
        name: "EditDeal",
        components: {successUpdate},
        computed: mapGetters(["editDealInfo"]),
        data: () => ({
            narxi: null, oylik_tulov: null, muddat: null, qolgan_summa: null,boshlangich_tulov: null,
            birinchi_tulov: null, oraliq_tulov: null, oxirgi_tulov:null, qosh_mal: null, qolgan_muddat: null
        }),
        mounted() {
            this.narxi = this.editDealInfo[0].narxi,
                this.oylik_tulov = this.editDealInfo[0].oylik_tulov,
                this.muddat = this.editDealInfo[0].muddat,
                this.qolgan_summa = this.editDealInfo[0].qolgan_summa,
                this.qolgan_muddat = this.editDealInfo[0].qolgan_muddat,
                this.boshlangich_tulov = this.editDealInfo[0].boshlangich_tulov,
                this.birinchi_tulov = this.editDealInfo[0].birinchi_tulov,
                this.oraliq_tulov = this.editDealInfo[0].oraliq_tulov,
                this.oxirgi_tulov = this.editDealInfo[0].oxirgi_tulov
        },
        methods:{
            closeDialog(){
                this.$store.dispatch('getUserMonitoring', 1)
                this.$store.commit('hideEditDealInfoDialog')
            },
            UpdateDeal(){
                const updateDealData = {
                    narxi: this.narxi, oylik_tulov: this.oylik_tulov, muddat: this.muddat, qolgan_summa: this.qolgan_summa,
                    qolgan_muddat: this.qolgan_muddat, boshlangich_tulov: this.boshlangich_tulov, birinchi_tulov: this.birinchi_tulov,
                    oraliq_tulov: this.oraliq_tulov, oxirgi_tulov: this.oxirgi_tulov,
                    id: this.editDealInfo[0].id
                }
                this.$store.dispatch('UpdateDeal', updateDealData)
                this.$store.commit('showSuccessUpdateDialog')
            }
        }
    }
</script>

<style scoped>

</style>