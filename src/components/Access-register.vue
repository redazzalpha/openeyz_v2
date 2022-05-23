<template>
    <!--register-tab-->
    <v-tab-item>
        <v-card>
            <!--register-title-->
            <v-card-title primary-title class="d-flex flex-column justify-center align-center my-2">
                <div class="logo mb-2">OpenEyz</div>
                <div v-show="!alertMessage">Create account</div>
                <!--error-alert-message-->
                <Transition name="scale-transition">
                    <v-alert v-show="alertMessage" dense outlined type="error" style="word-break: keep-all;" text
                        elevation="5" class="mt-3">{{ alertMessage }}</v-alert>
                </Transition>

            </v-card-title>
            <v-divider class="mb-7"></v-divider>
            <v-card-text class="pa-0">
                <!--register-form-->
                <v-form ref="register" class="register" v-model="valid" lazy-validation>
                    <v-container fluid grid-list-xs>
                        <v-row>
                            <!--first-name-field-->
                            <v-col cols="12" sm="6" class="py-0">
                                <v-text-field v-model="lname" required :rules="fieldRules" placeholder="Last name"
                                    name="lname" class="pt-0"></v-text-field>
                            </v-col>
                            <!--name-field-->
                            <v-col cols="12" sm="6" class="py-0">
                                <v-text-field v-model="name" required :rules="fieldRules" placeholder="First name"
                                    name="name" class="pt-0"></v-text-field>
                            </v-col>
                            <!--email-field-->
                            <v-col cols="12" sm="6" class="py-0">
                                <v-text-field v-model="email" required :rules="emailRules" placeholder="E-mail"
                                    name="username" class="pt-0"></v-text-field>
                            </v-col>
                            <!--password-field-->
                            <v-col cols="12" sm="6" class="py-0">
                                <v-text-field v-model="password" required :rules="passwordRules" placeholder="Password"
                                    name="password" class="pt-0" type="password">
                                </v-text-field>
                            </v-col>
                            <!--description-field-->
                            <v-col cols="12" class="py-0">
                                <v-text-field v-model="description" :rules="fieldRules" placeholder="Description"
                                    name="description" class="pt-0"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-divider class="mb-7 mt-8"></v-divider>
                    <!--text-terms-->
                    <v-card-text class="text-caption text-sm-body-2 py-0">
                        En cliquant sur S’inscrire, vous acceptez nos Conditions générales. <br>
                        Découvrez comment nous recueillons, utilisons et partageons vos données <br>
                        en lisant notre Politique d’utilisation des données et comment nous utilisons <br>
                        les cookies et autres technologies similaires en consultant notre Politique d’utilisation des
                        cookies. <br>
                        Vous recevrez peut-être des notifications par texto de notre part et vous
                        pouvez à tout moment vous désabonner. <br>
                    </v-card-text>
                    <!--register-actions-->
                    <v-card-actions>
                        <v-container fluid grid-list-xs>
                            <v-row>
                                <!--check-box-terms-->
                                <v-col cols="12" class="py-0">
                                    <v-checkbox v-model="checkbox" label="Do you agree?" required :rules="checkBoxRule">
                                    </v-checkbox>
                                </v-col>
                                <!--register-button-->
                                <v-col class="d-flex justify-center my-0 pb-0">
                                    <v-btn color="primary" :width="btnSize" @click="register()">REGISTER</v-btn>
                                </v-col>
                            </v-row>
                            <!-- link -->
                            <v-row>
                                <v-col class="d-flex justify-center">
                                    <v-btn text color="primary" @click="updateTab(0)">Got account ?</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-actions>
                </v-form>
            </v-card-text>
        </v-card>
    </v-tab-item>
</template>

<script lang="ts">
import Vue from 'vue';
import { httpRequest } from "../utils/http";
import { rules } from '../utils/rules';
import { mapActions, mapGetters } from 'vuex';
import { HttpResponse } from '../utils/types';
import * as Defines from '../utils/defines';

type VueFunction = { validate: () => boolean };
type VueElement = | undefined | Vue | Element | (Vue | Element)[];

export default Vue.extend({
    name: 'Access-register',
    data() {
        return {
            response: "",
            alertMessage: "",
            lname: "",
            name: "",
            email: "",
            password: "",
            description: "",
            valid: false,
            checkbox: false,
            emailRules: [
                rules.requiredEmail,
                rules.emailValidator,
            ],
            passwordRules: [
                rules.requiredPasswd,
                rules.passwdValidator,
            ],
            fieldRules: [
                rules.requiredField,
                rules.fieldValidator,
            ],
            checkBoxRule: [rules.checked],
        };
    },
    methods: {
        ...mapActions([
            "updateTab",
        ]),
        register() {
            let form: VueElement = this.$refs.register;
            if (form != null) {
                if (((form as unknown) as VueFunction).validate()) {
                    const formElem: HTMLFormElement | null = document.querySelector(".register");
                    if (formElem != null) {
                        httpRequest.login(new FormData(formElem)).catch(
                            (error: HttpResponse): void => {
                                this.alertMessage = error.bodyText;
                                setTimeout(() => { this.alertMessage = ''; }, Defines.ERROR_MESSAGE_DURATION);
                            }
                        );
                    }
                }
            }
        },
    },
    computed: {
        ...mapGetters([
            'btnSize'
        ]),
    }
});
</script>

