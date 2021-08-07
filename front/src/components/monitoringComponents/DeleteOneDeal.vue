<template>
    <v-dialog
            v-model="$store.getters.DeleteDealDialog"
            persistent
            max-width="50%"
    >
        <v-card>
            <v-card-title>
                <span class="headline">Диккат!</span>
            </v-card-title>

            <v-card-text>
                <span style="font-size: 1.3em">Сиз хақиқаттан <strong>{{deleteDealInfo[0].model +' '+ deleteDealInfo[0].gos_nomer}}</strong>  келишувни учиришни истайсизми?</span>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        color="error darken-1"
                        text
                        @click="deleteDeal"
                >
                    ХА
                </v-btn>
                <v-btn
                        color="green darken-1"
                        text
                        @click="$store.commit('hideDeleteDealInfoDialog')"
                >
                    Йок
                </v-btn>
            </v-card-actions>
            <div v-if="$store.getters.DeleteDealDialog" style="width: 100%;">
                <successDelete/>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
    import successDelete from "../anyTools/successDelete";
    import {mapGetters} from "vuex";
    export default {
        name: "DeleteOneDeal",
        components: {successDelete},
        computed: mapGetters(["deleteDealInfo"]),
        methods: {
            deleteDeal(){
                this.$store.dispatch('deleteOneDeal', this.deleteDealInfo[0].id)
                this.$store.commit('showSuccessDeleteDialog')
            }
        }
    }
</script>

<style scoped>

</style>