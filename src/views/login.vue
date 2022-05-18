<template>
  <!--login-container-->
  <div class="login-container">

    <!--access-dialog-->
    <v-dialog v-model="dialog" width="500" persistent role="dialog">

      <!--access-title-tabs-->
      <v-tabs align-with-title v-model="tab" background-color="cyan darken-1" class="white-text">
        <!--tab-slider-->
        <v-tab active-class="background-color: primary" class="white--text">Login</v-tab>
        <v-tab active-class="background-color: primary" class="white--text">Register</v-tab>
        <v-tabs-slider color="red"></v-tabs-slider>
      </v-tabs>

      <!--tabs-content-->
      <v-tabs-items v-model="tab">

        <!--login-tab-->
        <v-tab-item>
          <v-card>
            <v-card-title primary-title center-text class="d-flex justify-center my-5">
              <span class="logo mr-5">OpenEyz</span> <br>
              <span>
                connect
              </span>
            </v-card-title>
            <v-card-text class="py-0">

              <!--login-form-->
              <v-form ref="form" v-model="valid" lazy-validation>
                <!--email-field-->
                <v-text-field 
                v-model="email" 
                required 
                :rules="emailRules" 
                placeholder="E-mail" 
                name="username"
                outlined
                ></v-text-field>

                <!--passwod-field-->
                <v-text-field 
                v-model="password" 
                required 
                :rules="passwordRules" 
                placeholder="Password" 
                type="password"
                name="password" 
                outlined
                ></v-text-field>
              </v-form>
            </v-card-text>

            <!--connect-button-->
            <v-card-actions>
              <v-btn width="50%" class="mx-auto mb-5" color="primary" @click="validate()">CONNECT</v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>

        <!--register-tab-->
        <v-tab-item>
          <v-card>
            <v-card-title primary-title class="d-flex justify-center my-5">
              <div class="logo mr-5" width="100%">OpenEyz</div>
              <div>Create account</div>
            </v-card-title>
            <v-card-text class="pa-0">

              <!--register-form-->
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-container fluid grid-list-xs>
                  <v-row>
                    <!--first-name-field-->
                    <v-col cols="12" sm="6" class="py-0">
                      <v-text-field 
                      v-model="name" 
                      required 
                      :rules="fieldRules" 
                      placeholder="Last name" 
                      name="lname"
                      outlined></v-text-field>
                    </v-col>
                    <!--name-field-->
                    <v-col cols="12" sm="6" class="py-0">
                      <v-text-field 
                      v-model="name" 
                      required 
                      :rules="fieldRules" 
                      placeholder="First name" 
                      name="name"
                      outlined
                      ></v-text-field>
                    </v-col>

                    <!--email-field-->
                    <v-col cols="12" sm="6" class="py-0">
                      <v-text-field 
                      v-model="email" 
                      required
                      :rules="emailRules" 
                      placeholder="E-mail" 
                      name="username"
                      outlined
                      ></v-text-field>
                    </v-col>
                    
                    <!--password-field-->
                    <v-col cols="12" sm="6" class="py-0">
                      <v-text-field 
                      v-model="password"
                      required
                      :rules="passwordRules"
                      placeholder="Password"
                      name="password" 
                      outlined 
                      type="password"
                      ></v-text-field>
                    </v-col>
                    <!--description-field-->
                    <v-col cols="12" class="py-0">
                      <v-text-field 
                      v-model="description"
                      :rules="fieldRules"
                      placeholder="Description"
                      name="description"
                      outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-text class="text-caption text-sm-body-2">
              En cliquant sur S’inscrire, vous acceptez nos Conditions générales.
              Découvrez comment nous recueillons, utilisons et partageons vos données
              en lisant notre Politique d’utilisation des données et comment nous utilisons
              les cookies et autres technologies similaires en consultant notre Politique d’utilisation des cookies.
              Vous recevrez peut-être des notifications par texto de notre part et vous
              pouvez à tout moment vous désabonner.
            </v-card-text>
            <!--register-button-->
            <v-card-actions>
              <v-btn width="50%" class="mx-auto mb-5" color="primary" @click="validate()">REGISTER</v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { httpRequest } from "../utils/http";
import { rules } from "../utils/rules";
export default Vue.extend({
  name: "login-page",
  data: (): Record<string | number | symbol, boolean | string | object | null> => {
    return {
      res: "papou",
      dialog: true,
      tab: null,
      valid: false,
      lname: "",
      name: "",
      email: "",
      password: "",
      description: "",
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
    };
  },
  methods: {
    async validate() {
      let form: any = this.$refs.form;
      if (form != null) {
        if (form.validate()) {
          const formElem: HTMLFormElement | null = document.querySelector("form");
          if (formElem != null) {
            this.res = await httpRequest.post(new FormData(formElem));
          }
        }
      }
    },
    reset(): void {
      let form: any = this.$refs.form;
      form.reset();
    },
  },
});
</script>

<style lang="scss">
.logo {
  font-family: 'Water Brush', 'cursive' !important;
  font-size: 2.5rem !important;
}
</style>
