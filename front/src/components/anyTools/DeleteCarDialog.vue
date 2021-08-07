<template>
    <v-dialog
            v-model="$store.getters.DeleteCarDialog"
            persistent
            max-width="50%"
    >
        <v-card>
            <v-card-title>
                <span class="headline">Диккат!</span>
            </v-card-title>

            <v-card-text>
                <span style="font-size: 1.3em">Сиз хакаттан <strong>{{deleteCarInfo[0].model+' '+deleteCarInfo[0].gos_nomer}}</strong>  автомобильни учиришни истайсизми?</span>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        color="error darken-1"
                        text
                        @click="deleteCar"
                >
                    ХА
                </v-btn>
                <v-btn
                        color="green darken-1"
                        text
                        @click="$store.commit('hideDeleteCarInfoDialog')"
                >
                    Йок
                </v-btn>
            </v-card-actions>
            <div v-if="$store.getters.successDeleteDialog" style="width: 100%;">
                <successDelete/>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapGetters} from 'vuex'
    import successDelete from "./successDelete";
    export default {
        name: "DeleteCarDialog",
        components: {successDelete},
        computed: mapGetters(["deleteCarInfo"]),
        methods:{
            deleteCar(){
                console.log(this.deleteCarInfo[0].id)
                this.$store.dispatch('deleteCar', this.deleteCarInfo[0].id)
                this.$store.commit('showSuccessDeleteDialog')
            }
        }
    }
</script>

<style scoped>

</style>