<template>
  <v-tab-item class="profile-password-tab-item">
    <!-- main-card -->
    <v-card max-width="600" class="mx-auto mb-10" shaped raised outlined>
      <!-- header-title -->
      <v-card-title class="d-flex flex-column justify-center align-center">
        <!-- tile-avatar -->
        <span style="position: relative">
          <v-avatar size="200">
            <v-img src="../../assets/password.png" alt="alt" />
          </v-avatar>
        </span>
      </v-card-title>
      <!-- password-tab-content -->
      <v-card-text>
        <v-container grid-list-xs>
          <!-- title-row -->
          <v-row>
            <v-col>
              <h3 class="text-decoration-underline">Password</h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <!--error-alert-message-->
              <div
                style="height: 0; position: relative; width: 100%"
                class="d-flex justify-center align-center"
              >
                <!--alert-message-->
                <Transition name="scale-transition">
                  <v-alert
                    v-show="alertMessage"
                    dense
                    outlined
                    :type="alertType"
                    style="word-break: keep-all; position: absolute; z-index: 1"
                    text
                    elevation="5"
                    class="mt-5"
                    >{{ alertMessage }}</v-alert
                  >
                </Transition>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <!-- modify-password-card -->
              <v-card elevation="0">
                <v-card-text class="pa-0">
                  <!-- modify-password-form -->
                  <v-form class="form" ref="form" v-model="valid">
                    <v-container grid-list-xs>
                      <!-- current-password-field-row -->
                      <v-row>
                        <v-col class="pa-0">
                          <v-text-field
                            placeholder="Current password"
                            counter
                            :type="isSecret ? 'password' : 'text'"
                            name="password"
                            :rules="passwordRules"
                          >
                            <!-- current-password-field-eye-icon -->
                            <template v-slot:append>
                              <v-btn
                                icon
                                plain
                                :ripple="false"
                                @click="isSecret = !isSecret"
                                ><v-icon>{{
                                  isSecret ? "mdi-eye-off" : "mdi-eye"
                                }}</v-icon></v-btn
                              >
                            </template>
                          </v-text-field>
                        </v-col>
                      </v-row>
                      <!-- new-password-field-row -->
                      <v-row>
                        <v-col class="pa-0">
                          <v-text-field
                            placeholder="New password"
                            counter
                            :rules="passwordRules"
                            :type="isSecret ? 'password' : 'text'"
                            name="password1"
                          >
                            <!-- new-password-field-eye-icon -->
                            <template v-slot:append>
                              <v-btn
                                icon
                                plain
                                :ripple="false"
                                @click="isSecret = !isSecret"
                                ><v-icon>{{
                                  isSecret ? "mdi-eye-off" : "mdi-eye"
                                }}</v-icon></v-btn
                              >
                            </template>
                          </v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="d-flex justify-center">
                          <v-btn
                            :width="btnSize"
                            color="primary"
                            @click="sendPassword"
                            :disabled="!valid"
                            :loading="loading"
                            >Modify
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-tab-item>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions, mapGetters } from "vuex";
import { httpRequest } from "../../utils/http";
import { VueElement, VueFunction, VueResponse } from "../../utils/types";
import { rules } from "@/utils/rules";
import {
  ERROR_MESSAGE_DURATION,
  SERVER_USER_PASSWORD_URL,
} from "../../utils/defines";

export default Vue.extend({
  name: "Profile-password",
  components: {},
  data() {
    return {
      isSecret: true,
      passwordRules: [rules.requiredPasswd, rules.passwdValidator],
      loading: false,
      valid: false,
      currentPasswd: "",
      newPasswd: "",
      alertType: "error",
      alertMessage: "",
    };
  },
  computed: {
    ...mapState(["currentUser"]),
    ...mapGetters(["btnSize"]),
  },
  methods: {
    ...mapActions(["updateCurrentUser"]),
    async sendPassword(): Promise<void> {
      this.loading = true;
      this.valid = false;

      let form: VueElement = this.$refs.form;
      if (form != null) {
        if ((form as unknown as VueFunction).validate()) {
          const formElem: HTMLFormElement | null =
            document.querySelector(".form");
          if (formElem != null) {
            httpRequest
              .patch(SERVER_USER_PASSWORD_URL, new FormData(formElem))
              .then(() => {
                this.showAlert(
                  "success",
                  "Password has been successfully modified"
                );
                (form as unknown as VueFunction).reset();
              })
              .catch(async (error: VueResponse): Promise<void> => {
                this.showAlert("error", error.bodyText);
              });
            setTimeout(() => {
              this.loading = false;
            }, ERROR_MESSAGE_DURATION);
            this.valid = true;
          }
        }
      }
    },
    showAlert(type: string, message: string): void {
      this.alertType = type;
      this.alertMessage = message;
      setTimeout((resolve: () => void) => {
        this.alertMessage = "";
        this.alertType = "";
        resolve();
      }, ERROR_MESSAGE_DURATION);
    },
  },
});
</script>
