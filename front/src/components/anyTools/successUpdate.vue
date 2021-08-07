<template>
    <v-dialog
            v-model="$store.getters.successUpdateDialog"
            persistent
            max-width="290"
    >
        <v-card style="text-align: center;">
            <v-card-title class="headline">

            </v-card-title>
            <v-icon color="green" x-large >mdi-check-circle</v-icon>
            <v-card-text>{{updateResponse.message}}</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        color="green darken-1"
                        text
                        @click="$store.commit('hideSuccessUpdateDialog')"
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
        name: "successUpdate",
        computed: mapGetters(["updateResponse"])
    }
</script>

<style scoped>

</style>