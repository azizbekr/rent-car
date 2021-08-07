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
                <span style="font-size: 1.3em">Сиз хакаттан <strong>{{currentClientInfo[0].full_name}}</strong>  мижозни учиришни истайсизми?</span>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        color="error darken-1"
                        text
                        @click="$store.commit('hideDeleteClientInfoDialog')"
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
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "DeleteClient",
        computed: mapGetters(["currentClientInfo"])
    }
</script>

<style scoped>

</style>