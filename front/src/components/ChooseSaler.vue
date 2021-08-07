<template>
    <v-container fluid>
        <v-card >
            <v-tabs
                    v-model="tab"
                    fixed-tabs
                    background-color="blue darken-2"
                    dark
            >
                <v-tab :key="royxat">
                    {{royxat}}
                </v-tab>
                <v-tab>
                    <fullClientAdd/>
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item :key="royxat">
                    <v-card>
                        <v-select
                                :items="perekupList"
                                item-text="full_name"
                                item-value="id"
                                :label="mijozType"
                                v-model="ch_perekupshik"
                                @change="chosen"
                                solo
                        ></v-select>
                        <v-card-text v-for="one of choosen">
                            <p><b>Ф.И.О.:</b> {{one.full_name}}</p>
                            <p><b>Паспорт:</b> {{one.passport}}</p>
                            <p><b>Адресс:</b> {{one.address}}</p>
                            <p><b>Тел.:</b> {{one.phone}}</p>
                        </v-card-text>
                    </v-card>
                </v-tab-item>

            </v-tabs-items>
        </v-card>
    </v-container>
</template>

<script>
    import fullClientAdd from "./mainPageComponents/fullClientAdd";
    import {mapGetters, mapActions} from 'vuex'
    export default {

        name: "ChooseSaler",
        components: {fullClientAdd},
        data: ()=>({
            fio:'', passport: '', tel:'', address: '', s_turi:{}, ch_perekupshik:{}, clientId: null,
            choosen: [],
            royxat: 'Мижозни танлаш', yangi: 'Янги мижоз кушиш',
            tab: null,
            rules: [
                value => !!value || '*',
                value => (value && value.length >= 1) || 'Min 1 characters',
            ],
        }),
        computed: mapGetters(["perekupList","mijozType"]),
        methods:{
            chosen(one){
                this.choosen = this.perekupList.filter(t=>t.id === one)
                this.$emit('clientId', one)
            },
            ...mapActions(["getUserClients"]),

        },
        mounted() {
            this.getUserClients(1)
        }

    }
</script>

<style scoped>
    .v-tab{
        padding: 0;
    }
</style>