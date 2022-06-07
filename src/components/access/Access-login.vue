<template>
  <!--login-tab-->
  <v-tab-item>
    <!-- main-card-conjtainer -->
    <v-card>
      <!--connect-title-->
      <v-card-title
        primary-title
        class="d-flex flex-column justify-center align-center mt-2"
      >
        <div class="logo mb-2">OpenEyz</div>
        <!-- subtitle-alert -->
        <div
          style="min-height: 70px; position: relative; width: 100%"
          class="d-flex justify-center align-center"
        >
          <Transition name="scale-transition">
            <div v-show="!alertMessage" style="position: absolute">
              Connection
            </div>
          </Transition>
          <!--error-alert-message-->
          <Transition name="scale-transition">
            <v-alert
              v-show="alertMessage"
              dense
              outlined
              type="error"
              style="word-break: keep-all; position: absolute"
              text
              elevation="5"
              class="mt-5"
              >{{ alertMessage }}</v-alert
            >
          </Transition>
        </div>
      </v-card-title>
      <v-divider class="mb-7"></v-divider>
      <!-- acces-login-card-content -->
      <v-card-text class="py-0">
        <!--login-form-->
        <v-form ref="login" class="login" v-model="valid" lazy-validation>
          <!--email-field-->
          <v-text-field
            v-model="email"
            class="pt-0"
            required
            :rules="emailRules"
            placeholder="E-mail"
            name="username"
          ></v-text-field>
          <!--password-field-->
          <v-text-field
            v-model="password"
            class="pt-0"
            required
            :rules="passwordRules"
            placeholder="Password"
            :type="isSecret ? 'password' : 'text'"
            name="password"
          >
            <template v-slot:append>
              <v-btn icon plain :ripple="false" @click="isSecret = !isSecret"
                ><v-icon>{{
                  isSecret ? "mdi-eye-off" : "mdi-eye"
                }}</v-icon></v-btn
              >
            </template>
          </v-text-field>
        </v-form>
      </v-card-text>
      <v-divider class="mb-7 mt-3"></v-divider>
      <!--connect-button-->
      <v-card-actions class="d-flex flex-column">
        <v-btn
          class="mx-auto mb-1"
          color="primary"
          :width="btnSize"
          @click="login()"
          >CONNECT</v-btn
        >
        <v-btn text color="primary" @click="updateTabAccess(1)"
          >No account ?</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-tab-item>
</template>

<script lang="ts">
import Vue from "vue";
import { rules } from "@/utils/rules";
import { httpRequest } from "@/utils/http";
import { mapActions, mapGetters } from "vuex";
import { VueResponse, VueElement, VueFunction } from "../../utils/types";
import * as Defines from "@/utils/defines";

// TODO: make in server side the refresh
export default Vue.extend({
  name: "Access-login",
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      alertMessage: "",
      isSecret: true,
      emailRules: [rules.requiredEmail, rules.emailValidator],
      passwordRules: [rules.requiredPasswd, rules.passwdValidator],
    };
  },
  methods: {
    ...mapActions(["updateTabAccess"]),
    login(): void {
      let form: VueElement = this.$refs.login;
      if (form != null) {
        if ((form as unknown as VueFunction).validate()) {
          const formElem: HTMLFormElement | null =
            document.querySelector(".login");
          if (formElem != null) {
            httpRequest
              .login(new FormData(formElem))
              .catch((error: VueResponse): void => {
                this.alertMessage = error.bodyText;
                setTimeout(() => {
                  this.alertMessage = "";
                }, Defines.ERROR_MESSAGE_DURATION);
              });
          }
        }
      }
    },
  },
  computed: {
    ...mapGetters(["btnSize"]),
  },
});
</script>
