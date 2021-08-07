<template>
    <div class="addCar">
        <v-autocomplete
                v-model="model"
                :items="carsList"
                dense
                filled
                label="Русумни танланг"
        ></v-autocomplete>

        <v-text-field
                label="Позицияси"
                v-model="pozitsiya"
                v-mask="'#'"
                hide-details="auto"
        ></v-text-field>

        <v-text-field
                label="Давлат раками"
                :rules="gos_nomer_rule"
                v-model="davlat_raqami"
                v-mask="gos?'## ### AAA':'## A ### AA'"
                hide-details="auto"
                @input="upperDR"
        ></v-text-field>
        <v-checkbox
                v-model="gos"
                hide-details
                label="фирма"
                class="shrink mr-2 mt-0"
        ></v-checkbox>

        <v-text-field
                label="Автомибиль йили"
                v-model="yili"
                v-mask="'####'"
                hide-details="auto"
        ></v-text-field>

        <v-text-field
                label="Пробеги"
                v-mask="'#######'"
                v-model="probegi"
                hide-details="auto"
        ></v-text-field>

        <v-text-field
                label="Краска"
                v-model="kraska"
                hide-details="auto"
        ></v-text-field>

        <v-radio-group
                v-model="korobka"
                row
        >
            <v-radio
                    label="Автомат"
                    value="avtomat"
            ></v-radio>
            <v-radio
                    label="Механика"
                    value="mexanika"
            ></v-radio>
        </v-radio-group>

        <v-select
                :items="sostoyanieCar"
                item-text="text"
                item-value="val"
                label="Холатини танланг"
                v-model="sostoyaniya"
        ></v-select>

        <v-autocomplete
                v-model="rangi"
                :items="carsColor"
                dense
                filled
                label="Ранг танланг"
        ></v-autocomplete>

        <v-text-field
                label="Кетган харажати"
                v-model="xarajat"
                v-mask="'##########'"
                hide-details="auto"
        ></v-text-field>

        <v-textarea
                clearable
                clear-icon="mdi-close-circle"
                label="Кушимча маълумот"
                v-model="qosh_mal"
                value=""
        ></v-textarea>

        <v-btn
                class="ma-2"
                outlined
                color="indigo"
                @click="getDatas"
        >
            OK
        </v-btn>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    export default {
        name: "addCar",
        data: ()=>({
            gos: false, korobka: 'avtomat',
            naqt:true, muddatli:false, foiz:false, model:'', davlat_raqami:'', pozitsiya:'', yili:'', probegi:0, kraska:'', rangi:'', xarajat:'', qosh_mal:'', sostoyaniya: '',
            picker: new Date().toISOString().substr(0, 10),
            gos_nomer_rule: [
                value => !!value || '*',
                value => (value && value.length >= 11) || 'Давлат ракамини тулик киритинг',
            ],
        }),
        computed: mapGetters(["carsList","carsColor", "sostoyanieCar"]),
        methods:{
            ...mapActions(["getCarModels"]),
            upperDR(){
                this.davlat_raqami = this.davlat_raqami.toUpperCase()
            },
            getDatas(){
                const datas = {
                    model: this.model, gos_nomer: this.davlat_raqami,
                    probeg: this.probegi, year: this.yili, color: this.rangi, position: this.pozitsiya,
                    korobka: this.korobka, price: this.o_narxi, xarajat: this.xarajat,
                    kraska: this.kraska, sostoyaniya: this.sostoyaniya, info: this.qosh_mal
                }
                this.$emit('carDatas', datas)
            }
        },
        mounted() {
            this.getCarModels()
        }
    }
</script>

<style scoped>

</style>