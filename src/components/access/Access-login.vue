<template>
  <!--login-tab-->
  <v-tab-item class="access-login-tab-item">
    <!-- main-card-conjtainer -->
    <v-card>
      <!--connect-title-->
      <v-card-title
        primary-title
        class="d-flex flex-column justify-center align-center mt-2"
      >
        <div class="logo mb-2">OpenEyz</div>
        <!-- subtitle -->
        <div>Connection</div>
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
            @keydown="enter"
          ></v-text-field>
          <!--password-field-->
          <v-text-field
            v-model="password"
            class="pt-0"
            required
            counter
            :rules="passwordRules"
            placeholder="Password"
            :type="isSecret ? 'password' : 'text'"
            name="password"
            @keydown="enter"
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
          :width="btnSize()"
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
import { mapActions } from "vuex";
import { rules } from "@/utils/rules";
import { VueElement, VueFunction } from "../../utils/types";
import { login, enterPressed } from "@/utils/functions";
import { btnSize } from '../../utils/functions';

export default Vue.extend({
  name: "Access-login",
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      isSecret: true,
      btnSize: btnSize,
      emailRules: [rules.requiredEmail, rules.emailValidator],
      passwordRules: [rules.requiredPasswd, rules.passwdValidator],
    };
  },
  methods: {
    ...mapActions(["updateTabAccess"]),
    /**
     * logs the user in
     * @function
     */
    login(): void {
      let form: VueElement = this.$refs.login;
      if (form != null) {
        if ((form as unknown as VueFunction).validate()) {
          const formElem: HTMLFormElement | null =
            document.querySelector(".login");
          if (formElem != null) login(new FormData(formElem));
        }
      }
    },
    /**
     * action on enter pressed
     * @function
     * @param event
     */
    enter(event: KeyboardEvent): void {
      enterPressed(event, this.login);
    },
  },
});
</script>
