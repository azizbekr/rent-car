<template>
    <v-dialog
            v-model="$store.getters.currentDeal"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
            content-class="newdialog"
            @keydown.esc="$store.commit('hideCurrentDeal')"
    >

        <v-card>
            <v-toolbar
                    dark
                    color="primary"
            >
                <v-btn
                        icon
                        dark
                        @click="$store.commit('hideCurrentDeal')"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>

            </v-toolbar>

            <selectedDealPayments/>

        </v-card>
    </v-dialog>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import selectedDealPayments from "../anyTools/selectedDealPayments";
    export default {
        name: "CurrentDeal",
        components: {selectedDealPayments},
        data: ()=>({

        }),
        methods: {

        }
    }
</script>

<style scoped>
    .newdialog{
        padding-top: 100px !important;
    }
</style>