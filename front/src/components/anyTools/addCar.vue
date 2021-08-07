<template>
    <div class="addCar">
        <v-select
                :items="carsList"
                item-text="text"
                item-value="val"
                label="Русумни танланг"
                v-model="model"
        ></v-select>

        <v-text-field
                label="Позицияси"
                :rules="rules"
                v-model="pozitsiya"
                v-mask="'#'"
                hide-details="auto"
        ></v-text-field>

        <v-text-field
                label="Давлат раками"
                :rules="rules"
                v-model="davlat_raqami"
                v-mask="gos?'## ### AAA':'## A ### AA'"
                hide-details="auto"
                @input="upperDR"
        ></v-text-field>
        <v-checkbox
                v-model="gos"
                hide-details
                label="гос. номер"
                class="shrink mr-2 mt-0"
        ></v-checkbox>

        <v-text-field
                label="Автомибиль йили"
                :rules="rules"
                v-model="yili"
                v-mask="'####'"
                hide-details="auto"
        ></v-text-field>

        <v-text-field
                label="Пробеги"
                :rules="rules"
                v-mask="'#######'"
                v-model="probegi"
                hide-details="auto"
        ></v-text-field>

        <v-text-field
                label="Краска"
                :rules="rules"
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

        <v-select
                :items="carsColor"
                item-text="text"
                item-value="val"
                label="Ранг танланг"
                v-model="rangi"
        ></v-select>

        <v-text-field
                label="Кетган харажати"
                :rules="rules"
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
    import {mapGetters} from 'vuex'
    export default {
        name: "addCar",
        data: ()=>({
            gos: false, korobka: 'avtomat',
            naqt:true, muddatli:false, foiz:false, model:'', davlat_raqami:'', pozitsiya:'', yili:'', probegi:'', kraska:'', rangi:'', xarajat:'', qosh_mal:'', sostoyaniya: '',
            picker: new Date().toISOString().substr(0, 10),
        }),
        computed: mapGetters(["carsList","carsColor", "sostoyanieCar","rules"]),
        methods:{
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
    }
</script>

<style scoped>

</style>