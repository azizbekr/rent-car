<template>
    <v-dialog
            v-model="$store.getters.currentCarDialog"
            persistent
            max-width="600px"
    >

        <v-card>
            <v-card-title>
                <span class="headline">{{currentCar.model+' '+currentCar.gos_nomer}}</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="6">Нархи</v-col><v-col cols="6">{{ currentCar.price }}</v-col>
                        <v-col cols="6">Харажати</v-col><v-col cols="6">{{ currentCar.xarajat }}</v-col>
                        <v-col cols="6">Ранги</v-col><v-col cols="6">{{ car_color[currentCar.color] }}</v-col>
                        <v-col cols="6">Йили</v-col><v-col cols="6">{{ currentCar.year }}</v-col>
                        <v-col cols="6">Позицияси</v-col><v-col cols="6">{{ currentCar.position }}</v-col>
                        <v-col cols="6">Пробег</v-col><v-col cols="6">{{ currentCar.probeg }}</v-col>
                        <v-col cols="6">Коробка</v-col><v-col cols="6">{{ car_korobka[currentCar.korobka] }}</v-col>
                        <v-col cols="6">Статус</v-col><v-col cols="6">{{ car_status[currentCar.status] }}</v-col>
                        <v-col cols="6">Холати</v-col><v-col cols="6">{{ car_sostoyanie[currentCar.sostoyaniya] }}</v-col>
                        <v-col cols="6">Краска</v-col><v-col cols="6">{{ currentCar.kraska  }}</v-col>
                        <v-col cols="6">Малълумот</v-col><v-col cols="6">{{ currentCar.info  }}</v-col>
                        <v-col cols="6">Кошилган вакти</v-col><v-col cols="6">{{ currentCar.added_date }}</v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        color="blue darken-1"
                        text
                        @click="$store.commit('hideCurrentCarInfoDialog')"
                >
                    Ёпиш
                </v-btn>

            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "CurrentCar",
        computed: mapGetters(["currentCar","carsColor"]),
        data: ()=>({
            car_status: {G:"ГАРАЖ", SN: "Нактга сотилди", SM: "Муддатли сотилди", SF: "Фоизга сотилди"},
            car_color:{oq: "Ок", qora: "Кора", mokriy: "Мокрый", choco: "Чоко", delfin: "Дельфин", molochniy: "Молочный"},
            car_sostoyanie: {new: "Янги", good: "Яхши", normal: "Ортача", bad: "Ёмон"},
            car_korobka: {avtomat: "Автомат", mexanika: "Механика"}
        })
    }
</script>

<style scoped>

</style>