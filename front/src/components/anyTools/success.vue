<template>
    <v-dialog
            v-model="$store.getters.successDialog"
            persistent
            max-width="290"
    >
        <v-card style="text-align: center">
            <v-card-title class="headline">

            </v-card-title>
            <v-icon color="green" x-large >mdi-check-circle</v-icon>
            <v-card-text>{{httpRes.message}}</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        color="green darken-1"
                        text
                        @click="$store.commit('hideSuccessDialog')"
                >
                    ОК
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "success",
        computed: mapGetters(["httpRes"])
    }
</script>

<style scoped>

</style>