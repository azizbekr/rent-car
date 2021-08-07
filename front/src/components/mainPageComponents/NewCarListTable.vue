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

                <v-simple-table >
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
                                v-for="item in myCars"
                                :key="item.id"
                        >
                            <td>{{ item.id }}</td>
                            <td>{{ item.model }}</td>
                            <td>{{ item.gos_nomer }}</td>
                            <td>{{ item.price }}</td>
                            <td>{{ item.year }}</td>
                            <td style="display: flex; justify-content: center;">
                                <v-btn
                                        color="primary"
                                        fab
                                        small
                                        dark
                                        @click="showCar(item.id)"
                                >
                                    <v-icon>mdi-car-info</v-icon>
                                </v-btn>
                                <v-btn
                                        color="primary"
                                        fab
                                        small
                                        dark
                                        @click="editCar(item.id)"
                                >
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn
                                        color="error"
                                        fab
                                        small
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

            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        name: "NewCarListTable",

        data: ()=>({
            search: null
        }),
        computed: mapGetters(["myCars", "myCarsHeader"]),
        methods:{
            ...mapActions(["getUserCars"]),
            showCar(id){
                console.log(id)
            },
            editCar(id){
                console.log(id)
            },
            deleteCar(id){
                console.log(id)
            },
        },
        mounted() {
            this.getUserCars(1)
        }
    }
</script>

<style scoped>

</style>
