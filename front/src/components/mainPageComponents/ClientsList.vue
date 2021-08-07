<template>
    <v-row>
        <v-col class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" cols="12" sm="12">
            <div style="text-align: center" v-if="loader">
                <v-progress-circular
                        :size="70"
                        color="primary"
                        indeterminate
                ></v-progress-circular>
            </div>

            <v-card>
                <v-card-title>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Излаш"
                            single-line
                            hide-details
                    ></v-text-field>
                </v-card-title>

                <v-simple-table >
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-left">
                                ID
                            </th>
                            <th class="text-left">
                                Ф.И.О
                            </th>
                            <th class="text-left">
                                Паспорт
                            </th>
                            <th class="text-left">
                                Адрес
                            </th>
                            <th class="text-left">
                                Телефон
                            </th>
                            <th class="text-center">
                                Тулик куриш/Узгартириш/Учириш
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr
                                style="cursor: pointer;"
                                @click="showClientDeals(item.id, item.full_name)"
                                v-for="item in resultQuery"
                                :key="item.id"
                        >
                            <td>{{ item.id }}</td>
                            <td>{{ item.full_name }}</td>
                            <td>{{ item.passport }}</td>
                            <td>{{ item.address }}</td>
                            <td>{{ item.phone }}</td>
                            <td style="display: flex; justify-content: center;align-items: center;">
                                <v-btn
                                        color="success"
                                        fab
                                        x-small
                                        dark
                                        @click.stop="showClient(item.id)"
                                >
                                    <v-icon>mdi-tooltip-account</v-icon>
                                </v-btn>
                                <v-btn
                                        color="primary"
                                        fab
                                        x-small
                                        dark
                                        @click.stop="editClient(item.id)"
                                >
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn
                                        color="error"
                                        fab
                                        x-small
                                        dark
                                        @click.stop="deleteClient(item.id)"
                                >
                                    <v-icon>mdi-delete-outline</v-icon>
                                </v-btn>
                            </td>

                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
                <div v-if="$store.getters.currentClientDialog">
                    <CurrentClient/>
                </div>
                <div v-if="$store.getters.EditClientDialog">
                    <UpdateClient/>
                </div>
                <div v-if="$store.getters.DeleteClientDialog">
                    <DeleteClient/>
                </div>
                <div v-if="userMonitorings">
                    <v-dialog
                            v-model="userMonitorings"
                            style="height: 60%;"
                    >
                        <v-card>
                            <v-card-title class="text-h5 grey lighten-2">
                                {{userMonitoringDataName}}
                            </v-card-title>

                            <v-card-text style="margin: 10px 0;">
                                <p v-if="!userMonitoringData.length" style="text-align: center; margin: 10px; font-size: 1.5em;">
                                    Мижозда сделкалар йук...
                                </p>
                                <v-simple-table v-else dark>
                                    <template v-slot:default>
                                        <thead>
                                        <tr>
                                            <th class="text-left">
                                                ID
                                            </th>
                                            <th class="text-left">
                                                Автомобиль
                                            </th>
                                            <th class="text-left">
                                                Давлат раками
                                            </th>
                                            <th class="text-left">
                                                Нархи
                                            </th>
                                            <th class="text-left">
                                                Бошлангич тулов
                                            </th>
                                            <th class="text-left">
                                                Муддат
                                            </th>
                                            <th class="text-left">
                                                Ойлик тулов
                                            </th>
                                            <th class="text-left">
                                                Колган сумма
                                            </th>

                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr
                                                v-for="item in userMonitoringData"
                                                :key="item.id"
                                        >
                                            <td>{{ item.id }}</td>
                                            <td>{{ item.model }}</td>
                                            <td>{{ item.gos_nomer }}</td>
                                            <td>{{ item.narxi }}</td>
                                            <td>{{ item.boshlangich_tulov }}</td>
                                            <td>{{ item.muddat }}</td>
                                            <td>{{ item.oylik_tulov }}</td>
                                            <td>{{ item.qolgan_summa }}</td>
                                        </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-card-text>

                            <v-divider></v-divider>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                        color="primary"
                                        text
                                        @click="userMonitorings = false"
                                >
                                    Ёпиш
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </div>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import fullClientAdd from "./fullClientAdd";
    import {mapActions, mapGetters} from 'vuex'
    import CurrentClient from "../clientComponents/CurrentClient";
    import UpdateClient from "../clientComponents/UpdateClient";
    import DeleteClient from "../clientComponents/DeleteClient";
    export default {
        name: "ClientsList",
        components: {DeleteClient, UpdateClient, fullClientAdd,CurrentClient},
        data: ()=>({
            search: null,userMonitorings: false, loader: false, userMonitoringData: null, userMonitoringDataName: ''
        }),
        methods: {
            ...mapActions(["getUserClients"]),
            showClient(id){
                this.$store.commit('currentClient', id)
                this.$store.commit('showCurrentClientInfoDialog')
            },
            editClient(id){
                this.$store.commit('editOneClient', id)
                this.$store.commit('showEditClientInfoDialog')
            },
            deleteClient(id){
                this.$store.commit('currentClient', id)
                this.$store.commit('showDeleteClientInfoDialog')
            },
            async showClientDeals(id, full_name){
                this.userMonitoringDataName = ''
                this.userMonitoringDataName = full_name
                this.loader = true
                let resp = await this.$store.dispatch('clientDeals', id)
                this.loader = false
                if(!resp.res){
                    this.userMonitoringData = resp.data
                }else{
                }
                this.userMonitorings = true
            }
        },
        computed: {
            ...mapGetters(["myClients"]),
            resultQuery(){
                if(this.search){
                    return this.myClients.filter((item)=>{
                        return this.search.toLowerCase().split(' ').every(v => item.full_name.toLowerCase().includes(v))
                    })
                }else{
                    return this.myClients;
                }
            }
        },
        mounted() {
            this.getUserClients(1)
        }
    }
</script>

<style scoped>
    .main_cat_title{
        text-align: center;
        width: 100%;
        margin: 10px auto;
    }
    td button{
        margin: 0 5px;
    }
</style>