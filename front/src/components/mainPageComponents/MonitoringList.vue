<template>
    <v-row>
        <v-col class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" cols="12" sm="12">
            <v-card v-if="mType === 'olish'">
                <v-card-title>
                    <v-radio-group
                            v-model="mType"
                            @change="changeMType"
                            row
                    >
                        <v-radio
                                label="Олиш"
                                value="olish"
                        ></v-radio>
                        <v-radio
                                label="Сотиш"
                                value="sotish"
                        ></v-radio>
                    </v-radio-group>
                    <v-spacer></v-spacer>
                    <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Излаш"
                            single-line
                            hide-details
                    ></v-text-field>
                </v-card-title>
                <v-simple-table fixed-header>
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
                                Бошлагич тулов
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
                            <th class="text-center">
                                Тулик куриш/Узгартириш/Учириш
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr
                                v-for="item in myMonitoringList.filter(t=>t.turi === 'olish')"
                                :key="item.id"
                                v-bind:style="color[item.status]"
                        >
                            <td>{{ item.id }}</td>
                            <td>{{ item.model }}</td>
                            <td>{{ item.gos_nomer }}</td>
                            <td>{{ parseInt(item.narxi, 10) +  (parseInt(item.xarajat, 10) || 0) }}</td>
                            <td>{{ item.boshlangich_tulov }}</td>
                            <td>{{ item.muddat+'/'+ (item.muddat - item.qolgan_muddat)}}</td>
                            <td>{{ item.oylik_tulov }}</td>
                            <td>{{ Math.floor(item.qolgan_summa) }}</td>
                            <td style="display: flex; justify-content: center;align-items: center;">
                                <v-icon v-if="item.turi === 'olish'" color="green">mdi-arrow-down-thick</v-icon>
                                <v-icon v-else-if="item.turi === 'sotish'" color="red">mdi-arrow-up-thick</v-icon>
                                <v-btn
                                        color="success"
                                        fab
                                        x-small
                                        dark
                                        @click="showDeal(item.id)"
                                >
                                    <v-icon>mdi-handshake-outline</v-icon>
                                </v-btn>
                                <v-btn
                                        color="primary"
                                        fab
                                        x-small
                                        dark
                                        @click="editDeal(item.id)"
                                >
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn
                                        color="error"
                                        fab
                                        x-small
                                        dark
                                        @click="deleteDeal(item.id)"
                                >
                                    <v-icon>mdi-delete-outline</v-icon>
                                </v-btn>
                            </td>

                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card>
            <v-card v-else-if="mType === 'sotish'">
                <v-card-title>
                    <v-radio-group
                            v-model="mType"
                            @change="changeMType"
                            row
                    >
                        <v-radio
                                label="Олиш"
                                value="olish"
                        ></v-radio>
                        <v-radio
                                label="Сотиш"
                                value="sotish"
                        ></v-radio>
                    </v-radio-group>
                    <v-spacer></v-spacer>
                    <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Излаш"
                            single-line
                            hide-details
                    ></v-text-field>
                </v-card-title>
                <v-simple-table fixed-header>
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
                                Бошлагич тулов
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
                            <th class="text-center">
                                Тулик куриш/Узгартириш/Учириш
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr
                                v-for="item in myMonitoringList.filter(t=>t.turi === 'sotish')"
                                :key="item.id"
                                v-bind:style="color[item.status]"
                        >
                            <td>{{ item.id }}</td>
                            <td>{{ item.model }}</td>
                            <td>{{ item.gos_nomer }}</td>
                            <td>{{ parseInt(item.narxi, 10) +  (parseInt(item.xarajat, 10) || 0) }}</td>
                            <td>{{ item.boshlangich_tulov }}</td>
                            <td>{{ item.muddat+'/'+ (item.muddat - item.qolgan_muddat)}}</td>
                            <td>{{ item.oylik_tulov }}</td>
                            <td>{{ Math.floor(item.qolgan_summa) }}</td>
                            <td style="display: flex; justify-content: center;align-items: center;">
                                <v-icon v-if="item.turi === 'olish'" color="green">mdi-arrow-down-thick</v-icon>
                                <v-icon v-else-if="item.turi === 'sotish'" color="red">mdi-arrow-up-thick</v-icon>
                                <v-btn
                                        color="success"
                                        fab
                                        x-small
                                        dark
                                        @click="showDeal(item.id)"
                                >
                                    <v-icon>mdi-handshake-outline</v-icon>
                                </v-btn>
                                <v-btn
                                        color="primary"
                                        fab
                                        x-small
                                        dark
                                        @click="editDeal(item.id)"
                                >
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn
                                        color="error"
                                        fab
                                        x-small
                                        dark
                                        @click="deleteDeal(item.id)"
                                >
                                    <v-icon>mdi-delete-outline</v-icon>
                                </v-btn>
                            </td>

                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card>
        </v-col>
        <v-row v-if="$store.getters.sdelkaId">
            <CurrentDeal/>
        </v-row>
        <div v-if="$store.getters.sdelkaEditId">
            <EditDeal/>
        </div>
        <div v-if="$store.getters.DeleteDealDialog">
            <DeleteOneDeal/>
        </div>
    </v-row>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import CurrentDeal from "../monitoringComponents/CurrentDeal";
    import DeleteOneDeal from "../monitoringComponents/DeleteOneDeal";
    import EditDeal from "../monitoringComponents/EditDeal";
    export default {
        name: "MonitoringList",
        components: {CurrentDeal,DeleteOneDeal,EditDeal},
        data: ()=>({
            search: null, color:{N:'background-color: #d5f2dd;', M: 'background-color: #fce1e1;', F: 'background-color: #fcf4e1;', T: 'background-color: yellow'},
            mType: 'olish', MonitoringList:[]
        }),
        computed: {
            ...mapGetters(["myMonitoringList"]),
            resultQuery(){
                if(this.search){
                    return this.myMonitoringList.filter((item)=>{
                        return this.search.toLowerCase().split(' ').every(v => item.gos_nomer.toLowerCase().includes(v))
                    })
                }else{
                    return this.myMonitoringList;
                }
            }
        },
        methods: {
            ...mapActions(["getUserMonitoring","choosenSdelka","getSdelkaPayments"]),
            showDeal(id){
                this.$store.commit('sdelkaId', id)
                console.log(id)
                this.choosenSdelka(id)
                this.getSdelkaPayments(id)
                this.$store.commit('showCurrentDeal')
            },
            editDeal(id){
                this.$store.commit('sdelkaEditId', id)
                this.$store.commit('showEditDealInfoDialog')
            },
            deleteDeal(id){
                this.$store.commit('deleteOneDeal', id)
                this.$store.commit('showDeleteDealInfoDialog')
            },
            changeMType(){
                if(this.mType === 'olish'){
                    this.MonitoringList = this.myMonitoringList.filter(t=>t.turi === 'olish')
                }else if(this.mType === 'sotish'){
                    this.MonitoringList = this.myMonitoringList.filter(t=>t.turi === 'sotish')
                }
            }
        },
        mounted() {
            this.getUserMonitoring(1)
        }
    }
</script>

<style scoped>
    td button{
        margin: 0 5px;
    }
</style>