<template>
    <v-dialog
            v-model="$store.getters.DeleteClientDialog"
            persistent
            max-width="50%"
    >
        <v-card>
            <v-card-title>
                <span class="headline">Диккат!</span>
            </v-card-title>

            <v-card-text>
                <span style="font-size: 1.3em">Сиз хақиқаттан <strong>{{currentClientInfo[0].full_name}}</strong>  мижозни учиришни истайсизми?</span>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        color="error darken-1"
                        text
                        @click="deleteClient"
                >
                    ХА
                </v-btn>
                <v-btn
                        color="green darken-1"
                        text
                        @click="$store.commit('hideDeleteClientInfoDialog')"
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
    import successDelete from "../anyTools/successDelete";
    export default {
        name: "DeleteClient",
        components:{successDelete},
        computed: mapGetters(["currentClientInfo"]),
        methods:{
            deleteClient(){
                this.$store.dispatch('deleteClient', this.currentClientInfo[0].id)
                this.$store.commit('showSuccessDeleteDialog')
            }
        }
    }
</script>

<style scoped>

</style>