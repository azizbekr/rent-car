<template>
    <v-row>
        <v-col class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" cols="12" sm="12">
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
                                Йили
                            </th>
                            <th class="text-center">
                                Тулик куриш/Узгартириш/Учириш
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr
                                v-for="item in resultQuery"
                                :key="item.id"
                        >
                            <td>{{ item.id }}</td>
                            <td>{{ item.model }}</td>
                            <td>{{ item.gos_nomer }}</td>
                            <td>{{ Math.floor(item.price) + (parseInt(item.xarajat, 10) || 0) }}</td>
                            <td>{{ item.year }}</td>
                            <td style="display: flex; justify-content: center;align-items: center;">
                                <v-btn
                                        color="success"
                                        fab
                                        x-small
                                        dark
                                        @click="showCar(item.id)"
                                >
                                    <v-icon>mdi-car-info</v-icon>
                                </v-btn>
                                <v-btn
                                        color="primary"
                                        fab
                                        x-small
                                        dark
                                        @click="editCar(item.id)"
                                >
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn
                                        color="error"
                                        fab
                                        x-small
                                        dark
                                        @click="deleteCar(item.id)"
                                >
                                    <v-icon>mdi-delete-outline</v-icon>
                                </v-btn>
                            </td>

                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
                <div v-if="$store.getters.currentCarDialog">
                    <CurrentCar/>
                </div>
                <div v-if="$store.getters.EditCarDialog">
                    <UpdateCar/>
                </div>
                <div v-if="$store.getters.DeleteCarDialog">
                    <DeleteCarDialog/>
                </div>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import CurrentCar from "../carComponents/CurrentCar";
    import UpdateCar from "../carComponents/UpdateCar";
    import DeleteCarDialog from "../carComponents/DeleteCarDialog";
    import {mapActions, mapGetters} from 'vuex'
    export default {
        name: "CarsList",
        components:{CurrentCar,UpdateCar,DeleteCarDialog},
        data: ()=>({
            search: null
        }),
        computed: {
            ...mapGetters(["myCars"]),
            resultQuery(){
                if(this.search){
                    return this.myCars.filter((item)=>{
                        return this.search.toLowerCase().split(' ').every(v => item.gos_nomer.toLowerCase().includes(v))
                    })
                }else{
                    return this.myCars;
                }
            }
        },
        methods:{
            ...mapActions(["getUserCars"]),
            showCar(id){
                this.$store.commit('showOneCarInfo', id)
                this.$store.commit('showCurrentCarInfoDialog')
            },
            editCar(id){
                this.$store.commit('editOneCar', id)
                this.$store.commit('showEditCarInfoDialog')
            },
            deleteCar(id){
                this.$store.commit('deleteOneCar', id)
                this.$store.commit('showDeleteCarInfoDialog')
            },
        },
        mounted() {
            this.getUserCars(1)
        }
    }
</script>

<style scoped>
    td button{
        margin: 0 5px;
    }
</style>
