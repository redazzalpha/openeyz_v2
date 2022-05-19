<template>
    <!--register-tab-->
    <v-tab-item>
        <v-card>
            <!--register-title-->
            <v-card-title primary-title class="d-flex flex-column justify-center align-center my-2">
                <div class="logo mb-2">OpenEyz</div>
                <div>Create account</div>
            </v-card-title>
            <v-divider class="mb-7"></v-divider>
            <v-card-text class="pa-0">
                <!--register-form-->
                <v-form ref="register" v-model="valid" lazy-validation>
                    <v-container fluid grid-list-xs>
                        <v-row>
                            <!--first-name-field-->
                            <v-col cols="12" sm="6" class="py-0">
                                <v-text-field v-model="lname" required :rules="fieldRules" placeholder="Last name"
                                    name="lname" outlined></v-text-field>
                            </v-col>
                            <!--name-field-->
                            <v-col cols="12" sm="6" class="py-0">
                                <v-text-field v-model="name" required :rules="fieldRules" placeholder="First name"
                                    name="name" outlined></v-text-field>
                            </v-col>
                            <!--email-field-->
                            <v-col cols="12" sm="6" class="py-0">
                                <v-text-field v-model="email" required :rules="emailRules" placeholder="E-mail"
                                    name="username" outlined></v-text-field>
                            </v-col>
                            <!--password-field-->
                            <v-col cols="12" sm="6" class="py-0">
                                <v-text-field v-model="password" required :rules="passwordRules" placeholder="Password"
                                    name="password" outlined type="password">
                                </v-text-field>
                            </v-col>
                            <!--description-field-->
                            <v-col cols="12" class="py-0">
                                <v-text-field v-model="description" :rules="fieldRules" placeholder="Description"
                                    name="description" outlined></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-divider class="mb-7"></v-divider>
                    <!--text-terms-->
                    <v-card-text class="text-caption text-sm-body-2 py-0">
                        En cliquant sur S’inscrire, vous acceptez nos Conditions générales.
                        Découvrez comment nous recueillons, utilisons et partageons vos données
                        en lisant notre Politique d’utilisation des données et comment nous utilisons
                        les cookies et autres technologies similaires en consultant notre Politique d’utilisation des
                        cookies.
                        Vous recevrez peut-être des notifications par texto de notre part et vous
                        pouvez à tout moment vous désabonner.
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
                                <v-col class="d-flex justify-center my-0">
                                    <v-btn :width="btnSize" color="primary" @click="register()">REGISTER
                                    </v-btn>
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
export default Vue.extend({
    name: 'access-register',
    data() {
        return {
            res: "",
            valid: false,
            lname: "",
            name: "",
            email: "",
            password: "",
            description: "",
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
        async register(): Promise<void> {
            let form: any = this.$refs.register;
            if (form != null) {
                if (form.validate()) {
                    const formElem: HTMLFormElement | null = document.querySelector("form");
                    if (formElem != null) {
                        this.res = await httpRequest.post(new FormData(formElem));
                    }
                }
            }
        },
    },
    computed: {
        btnSize(): string {
            return this.$vuetify.breakpoint.name == 'xs' ? '100%' : '50%';
        }
    },
});
</script>

