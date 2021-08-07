<template>
    <v-container>
        <p class="text-subtitle-2 text-center">Хисоботлар</p>
        <v-row>
            <v-col cols="12" class="col-12">
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
                    <v-data-table

                            :headers="headers"
                            :items="getUserStats.data"
                            :search="search"
                    ></v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "Statistics",
        data: ()=>({
            search: null,
            headers: [
                { text: 'ID', align: 'start', value: 'id' },
                { text: 'Авто', value: 'name' },
                { text: 'Нархи', value: 'narxi' },
                { text: 'Келишилган нархи', value: 'kelishilgan_narx' },
                { text: 'Муддат', value: 'muddat' },
                { text: 'Тан нархи', value: 'tan_narxi' },
                { text: 'Умумий фойда $', value: 'umumiy_foyda' },
                { text: 'Накт фойда $', value: 'naqt_foyda' },
                { text: 'Умумий фойда %', value: 'umumiy_foyda_foizda' },
                { text: 'Ойлик фойда $', value: 'oylik_foyda' },
                { text: 'Ойлик фойда %', value: 'oylik_foyda_foizda' },
            ]
        }),
        computed: mapGetters(["getUserStats"]),
        methods: {

        },
        mounted() {
            this.$store.dispatch('getUserStats')
        }
    }
</script>

<style scoped>

</style>