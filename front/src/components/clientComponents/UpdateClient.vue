<template>
    <v-dialog
            v-model="$store.getters.EditClientDialog"
            persistent
            max-width="75%"
    >
        <v-card>
            <v-card-title>
                <span class="headline">Мижозни Узгартириш : <b>{{editClientInfo[0].full_name}}</b></span>
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
                                    label="Фамилияси"
                                    v-model="full_name"
                                    hide-details="auto"
                            ></v-text-field>
                        </v-col>
                        <v-col
                                cols="12"
                                sm="6"
                                md="4"
                        >
                            <v-text-field
                                    label="Пасспорт"
                                    v-model="passport"
                                    v-mask="'AA#######'"
                                    hide-details="auto"
                            ></v-text-field>
                        </v-col>
                        <v-col
                                cols="12"
                                sm="6"
                                md="4"
                        >
                            <v-text-field
                                    label="ИНН"
                                    v-model="inn"
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
                                    label="Телефон"
                                    v-model="tel"
                                    v-mask="'############'"
                                    hide-details="auto"
                            ></v-text-field>
                        </v-col>
                        <v-col
                                cols="12"
                                sm="6"
                                md="4"
                        >
                            <p style="margin: 0;">Мижоз тури</p>
                            <v-radio-group
                                    v-model="mijoz_type"
                                    row
                                    style="margin: 0;"
                            >
                                <v-radio
                                        label="Олувчи"
                                        value="oluvchi"
                                ></v-radio>
                                <v-radio
                                        label="Сотувчи"
                                        value="sotuvchi"
                                ></v-radio>
                            </v-radio-group>
                        </v-col>
                        <v-col
                                cols="12"
                                sm="6"
                                md="4"
                        >
                            <v-file-input
                                    accept="image/*"
                                    label="Пасспорт қўшиш"
                                    v-model="passport_file"
                            ></v-file-input>
                        </v-col>
<!--                        &lt;!&ndash;                            3rd row&ndash;&gt;-->

                        <v-col
                                cols="12"
                                sm="6"
                                md="4"
                        >
                            <v-textarea
                                    clearable
                                    clear-icon="mdi-close-circle"
                                    label="Адресс"
                                    v-model="adress"
                                    value=""
                            ></v-textarea>
                        </v-col>
                        <v-col
                                cols="12"
                                sm="10"
                                md="8"
                        >
                            <v-textarea
                                    clearable
                                    clear-icon="mdi-close-circle"
                                    label="Қўшимча маълумот"
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
                        @click="UpdateClient"
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
    import {mapGetters} from 'vuex'
    import successUpdate from "../anyTools/successUpdate";
    export default {
        name: "UpdateClient",
        components: {successUpdate},
        computed: mapGetters(["editClientInfo"]),
        data: () => ({
            full_name: null, passport: null, inn: null, tel: null,mijoz_type: null,
            passport_file:null, adress: null, qosh_mal: null
        }),
        mounted() {
            this.full_name = this.editClientInfo[0].full_name,
            this.passport = this.editClientInfo[0].passport,
            this.inn = this.editClientInfo[0].inn,
            this.tel = this.editClientInfo[0].phone,
            this.mijoz_type = this.editClientInfo[0].type,
            this.adress = this.editClientInfo[0].address,
            this.qosh_mal = this.editClientInfo[0].info
            // this.passport_file = this.editClientInfo[0].passport_file
        },
        methods:{
            closeDialog(){
                this.$store.dispatch('getUserClients', 1)
                this.$store.commit('hideEditClientInfoDialog')
            },
            UpdateClient(){
                const updateClientData = {
                    full_name: this.full_name, passport: this.passport, inn: this.inn, phone: this.tel,
                    type: this.mijoz_type, address: this.adress, info: this.qosh_mal,
                    user_id: this.editClientInfo[0].user_id, id: this.editClientInfo[0].id
                }
                this.$store.dispatch('UpdateClient', updateClientData)
                this.$store.commit('showSuccessUpdateDialog')
            }
        }
    }
</script>

<style scoped>

</style>