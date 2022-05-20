<template>
    <!--login-tab-->
    <v-tab-item>
        <v-card>
            <!--connect-title-->
            <v-card-title primary-title class="d-flex flex-column justify-center align-center mt-2">
                <div class="logo mb-2">OpenEyz</div>
                <div v-show="!alertMessage">Connection</div>
                <!--error-alert-message-->
                <Transition name="scale-transition">
                    <v-alert 
                    v-show="alertMessage" 
                    dense 
                    outlined 
                    type="error"
                    style="word-break: keep-all;"
                    text
                    elevation="5"
                    class="mt-3"
                    >{{alertMessage}}</v-alert>
                </Transition>
            </v-card-title>
            <v-divider class="mb-7"></v-divider>
            <v-card-text class="py-0">
                <!--login-form-->
                <v-form ref="login" class="login" v-model="valid" lazy-validation>
                    <!--email-field-->
                    <v-text-field v-model="email" class="pt-0" required :rules="emailRules" placeholder="E-mail" name="username"
                        ></v-text-field>
                    <!--passwod-field-->
                    <v-text-field v-model="password" class="pt-0" required :rules="passwordRules" placeholder="Password"
                        type="password" name="password" ></v-text-field>
                </v-form>
            </v-card-text>
            <v-divider class="mb-7 mt-3"></v-divider>
            <!--connect-action-->
            <v-card-actions class="d-flex flex-column">
                <!--connect-button-->
                <v-btn :width="btnSize" class="mx-auto mb-1" color="primary" @click="login()">CONNECT</v-btn>
                <v-btn text color="primary" @click="updateTab(1)">No account ?</v-btn>
            </v-card-actions>
        </v-card>
    </v-tab-item>
</template>

<script lang="ts">
import Vue from 'vue';
import { rules } from '../utils/rules';
import { httpRequest } from "../utils/http";
import { mapActions } from 'vuex';

type Err = { body: { message: string } };

export default Vue.extend({
    name: 'Access-login',
    data() {
        return {
            valid: false,
            email: "",
            password: "",
            alertMessage: "",
            emailRules: [
                rules.requiredEmail,
                rules.emailValidator,
            ],
            passwordRules: [
                rules.requiredPasswd,
                rules.passwdValidator,
            ],
        };
    },
    methods: {
        ...mapActions([
            "updateTab"
        ]),
        async login() {
            let form: any = this.$refs.login;
            if (form != null) {
                if (form.validate()) {
                    const formElem: HTMLFormElement | null = document.querySelector(".login");
                    if (formElem != null) {
                        httpRequest.login(new FormData(formElem))
                        .then(
                            (): string => (this.alertMessage = ""),
                            (error: Err): string => (this.alertMessage = error.body.message),
                        );
                    }
                }
            }
        },
    },
    computed: {
        btnSize(): string {
            return this.$vuetify.breakpoint.name == 'xs' ? '100%' : '50%';
        }
    }
});

</script>

