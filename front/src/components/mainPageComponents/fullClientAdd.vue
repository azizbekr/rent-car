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
                        block
                        style="height: 100%;"
                >
                    Мижоз қўшиш
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
                <p style="font-size: 1.5em; font-weight: bold">Мижоз қўшиш</p>
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
                        <v-file-input
                                accept="image/*"
                                label="Расм қўшиш"
                                v-model="client_photo"
                        ></v-file-input>
                        <v-text-field
                                label="Фамилияси"
                                :rules="rules"
                                v-model="familiya"
                                hide-details="auto"
                        ></v-text-field>
                        <v-text-field
                                label="Исми"
                                :rules="rules"
                                v-model="imya"
                                hide-details="auto"
                        ></v-text-field>
                        <v-text-field
                                label="Шарифи"
                                :rules="rules"
                                v-model="ochestvo"
                                hide-details="auto"
                        ></v-text-field>
                        <br>
                        <input type="date" class="my_date" v-model="born_date">
                        <v-text-field
                                label="Пасспорт"
                                :rules="rules"
                                v-model="passport"
                                v-mask="'AA#######'"
                                hide-details="auto"
                        ></v-text-field>
                        <v-text-field
                                label="ИНН"
                                :rules="rules"
                                v-model="inn"
                                v-mask="'##########'"
                                hide-details="auto"
                        ></v-text-field>
                        <v-text-field
                                label="Телефон"
                                :rules="rules"
                                v-model="tel"
                                v-mask="'############'"
                                hide-details="auto"
                        ></v-text-field>
                        <v-file-input
                                accept="image/*"
                                label="Пасспорт қўшиш"
                                v-model="passport_file"
                        ></v-file-input>
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
                        <p>Мижоз тури</p>
                        <v-radio-group
                                v-model="mijoz_type"
                                row
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
                        <v-textarea
                                clearable
                                clear-icon="mdi-close-circle"
                                label="Адресс"
                                v-model="adress"
                                value=""
                        ></v-textarea>
                        <v-textarea
                                clearable
                                clear-icon="mdi-close-circle"
                                label="Қўшимча маълумот"
                                v-model="qosh_mal"
                                value=""
                        ></v-textarea>
                        <div v-if="$store.getters.successDialog">
                            <success/>
                        </div>
                    </v-col>
                    <div class="btn_block">
                        <v-btn
                                class="ma-2"
                                outlined
                                color="indigo"
                                @click="SaveClient"
                        >
                            Сақлаш
                        </v-btn>
                    </div>
                </v-row>
            </v-container>
            <div v-if="$store.getters.successDialog" style="width: 100%;">
                <success/>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
    import success from "../anyTools/success";
    import {mapActions, mapGetters} from 'vuex'
    export default {
        name: "fullClientAdd",
        components:{success},
        data: ()=>({
            familiya: null, imya: null, ochestvo: null, born_date: null, passport: null, tel: null, adress: null, qosh_mal: null, inn: null, client_photo: null, passport_file: null,
            dialog: false, mijoz_type: 'oluvchi',
            rules: [
                value => !!value || '*',
                value => (value && value.length >= 1) || 'Min 1 characters',
            ],
        }),
        computed: mapGetters(["httpRes"]),
        methods:{
            ...mapActions(["addNewClient","getUserClients"]),
            SaveClient(){
                let name = this.imya || ''
                let surname = this.familiya || ''
                let middlename = this.ochestvo || ''
                let full_name = name + " " + surname + " " + middlename
                const clientData = {user_id:1, full_name, born_date: this.born_date, passport: this.passport, address: this.adress, inn: this.inn, phone: this.tel, type: this.mijoz_type, info: this.qosh_mal, passport_file: this.passport_file, client_photo: this.client_photo}
                clientData.user_id = 1
                this.addNewClient(clientData)
                this.$store.commit('showSuccessDialog')
            },
            closeDialog(){
                this.dialog = false
                this.getUserClients(1)
            }
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
    .my_date{
        display: block;
        width: 100%;
        outline: navajowhite;
        --darkreader-inline-outline: #7d4e08;
        border-bottom: 1px solid gray;
    }
</style>