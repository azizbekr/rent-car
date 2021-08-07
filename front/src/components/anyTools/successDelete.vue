<template>
    <v-dialog
            v-model="$store.getters.successDeleteDialog"
            persistent
            max-width="290"
    >
        <v-card style="text-align: center">
            <v-card-title class="headline">

            </v-card-title>
            <v-icon color="green" x-large >mdi-check-circle</v-icon>
            <v-card-text>{{updateResponse.message}}</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        color="green darken-1"
                        text
                        @click="okey"
                >
                    ОК
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "successDelete",
        computed: mapGetters(["updateResponse"]),
        methods:{
            okey(){
                this.$store.commit('hideDeleteCarInfoDialog')
                this.$store.commit('hideDeleteClientInfoDialog')
                this.$store.commit('hideSuccessDeleteDialog')
                this.$store.commit('hideDeleteDealInfoDialog')
                this.$store.dispatch('getUserCars', 1)
                this.$store.dispatch('getUserClients', 1)
                this.$store.dispatch('getUserMonitoring', 1)
            }
        }
    }
</script>

<style scoped>

</style>