<template>
    <v-dialog
            v-model="$store.getters.currentClientDialog"
            persistent
            max-width="600px"
    >

        <v-card>
            <v-card-title>
                <span class="headline">{{currentClientInfo[0].full_name}}</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="6">Ф.И.О.</v-col><v-col cols="6">{{ currentClientInfo[0].full_name }}</v-col>
                        <v-col cols="6">Тугилган йили</v-col><v-col cols="6">{{ currentClientInfo[0].born_date }}</v-col>
                        <v-col cols="6">Паспорт</v-col><v-col cols="6">{{ currentClientInfo[0].passport }}</v-col>
                        <v-col cols="6">Адрес</v-col><v-col cols="6">{{ currentClientInfo[0].address }}</v-col>
                        <v-col cols="6">ИНН</v-col><v-col cols="6">{{ currentClientInfo[0].inn }}</v-col>
                        <v-col cols="6">Телефон</v-col><v-col cols="6">{{ currentClientInfo[0].phone }}</v-col>
                        <v-col cols="6">Сотувчи/Олувчи</v-col><v-col cols="6">{{ currentClientInfo[0].type }}</v-col>
                        <v-col cols="6">Кушимча малълумот</v-col><v-col cols="6">{{ currentClientInfo[0].info }}</v-col>
                        <v-col cols="6">Кушилган санаси</v-col><v-col cols="6">{{ currentClientInfo[0].created_at }}</v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        color="blue darken-1"
                        text
                        @click="$store.commit('hideCurrentClientInfoDialog')"
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
        name: "CurrentClient",
        computed: mapGetters(["currentClientInfo"]),

    }
</script>

<style scoped>

</style>