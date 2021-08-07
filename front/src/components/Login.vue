<template>
    <div class="login_card">
        <v-card
                class="mx-auto"
                width="500"
                outlined
        >
            <v-card-text>
                <v-card-title>
                    Login
                </v-card-title>

                <v-row>
                    <v-col>
                        <v-text-field
                                label="login"
                                v-model="login"
                        ></v-text-field>
                        <v-text-field
                                v-model="password"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show1 ? 'text' : 'password'"
                                name="input-10-1"
                                label="Password"
                                counter
                                @click:append="show1 = !show1"
                                @keydown.enter="logIn"
                        ></v-text-field>
                        <v-btn
                                outlined
                                text
                                @click="logIn"
                        >
                            Кириш
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>

                <v-snackbar
                        v-model="snackbar"
                        :timeout="timeout"
                >
                    {{ invalidLogin }}

                    <template v-slot:action="{ attrs }">
                        <v-btn
                                color="blue"
                                text
                                v-bind="attrs"
                                @click="snackbar = false"
                        >
                            Ёпиш
                        </v-btn>
                    </template>
                </v-snackbar>

        </v-card>
    </div>
</template>

<script>
    import Cookie from 'js-cookie'
    export default {
        name: "Login",
        data: ()=>({
            login: null, password: null, show1: false,
            errorAlert: false, snackbar: false, timeout: 3000, invalidLogin: "Логин ёки пароль нотугри"
        }),
        methods:{
            async logIn(){
                const loginData = {login: this.login, password: this.password}
                let data = await this.$store.dispatch('loginUser', loginData)
                if(!data.res){
                    this.$router.push("/")
                }else {
                    this.snackbar = true
                }
            }
        },
        mounted() {
            this.$store.state.login = false
            Cookie.remove('bra')
        }
    }
</script>

<style scoped>
    .login_card{
        width: 500px;
        margin: 15% auto;
    }
</style>