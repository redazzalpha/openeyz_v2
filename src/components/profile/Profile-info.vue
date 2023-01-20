<template>
  <v-tab-item class="profile-info-tab-item">
    <!-- main-card -->
    <v-card max-width="600" class="mx-auto mb-10" shaped raised outlined>
      <!-- header-title -->
      <v-card-title class="d-flex flex-column justify-center align-center">
        <!-- user-avatar -->
        <span>{{ current("name") }}</span>
        <span style="position: relative">
          <AvatarCpn
            :path="currentUser.avatarSrc ? currentUser.avatarSrc : ''"
            :role="currentUser.roles[0].roleName"
            size="170"
          />

          <v-btn
            icon
            color="primary"
            style="position: absolute; top: 145px; left: calc(100% - 55px)"
            @click="openFolder"
            title="modify image"
          >
            <input
              v-show="0"
              type="file"
              accept="image/*"
              ref="input"
              @change="pickFile"
            />
            <i class="fa-solid fa-camera" style="font-size: 22px"></i>
          </v-btn>
          <v-btn
            icon
            color="error"
            style="position: absolute; top: 145px; right: calc(100% - 43px)"
            @click="removeAvatar"
            title="remove image"
          >
            <i class="fa-solid fa-times-circle" style="font-size: 20px"></i>
          </v-btn>
        </span>
      </v-card-title>
      <!-- profile-tab-content -->
      <v-card-text>
        <v-container grid-list-xs>
          <!-- information-title-row -->
          <v-row>
            <v-col>
              <h3 class="text-decoration-underline">Informations</h3>
            </v-col>
          </v-row>
          <!-- last-name-row -->
          <v-row>
            <v-col>
              <span class="mr-3"><span class="font-weight-bold">Last name:</span> {{ current("lname") }} </span>
            </v-col>
            <v-col class="shrink">
              <v-btn small color="primary" @click="openModify(0)">Modify</v-btn>
              <br />
            </v-col>
          </v-row>
          <!-- name-row -->
          <v-row>
            <v-col>
              <span class="mr-3"><span class="font-weight-bold">First name: </span> {{ current("name") }} </span>
            </v-col>
            <v-col class="shrink">
              <v-btn small color="primary" @click="openModify(1)">Modify</v-btn>
              <br />
            </v-col>
          </v-row>
          <!-- email-row -->
          <v-row>
            <v-col>
              <span class="mr-3"><span class="font-weight-bold">E-mail:</span> {{ current("username") }} </span>
            </v-col>
          </v-row>
          <!-- role row-->
          <v-row v-if="isAuthorized()">
            <v-col>
              <span class="mr-3"><span class="font-weight-bold">Role: </span>{{ currentRole() }} </span>
            </v-col>
          </v-row>
          <!-- description-row -->
          <v-row>
            <v-col>
              <span class="mr-3">
                <span class="font-weight-bold">Description: </span>
                {{
                  current("description")
                    ? current("description")
                    : "No description"
                }}
              </span>
            </v-col>
          </v-row>
          <!-- decription-modify-area -->
          <v-row>
            <v-col>
              <v-textarea
                outlined
                no-resize
                autoGrow
                v-model="description"
                placeholder="New description here"
                rows="1"
                append="mdi-send"
                @keydown="textarePressed"
              >
                <template v-slot:append>
                  <v-btn
                    icon
                    color="primary"
                    @click="sendDescription"
                    title="send description"
                  >
                    <v-icon>mdi-send</v-icon>
                  </v-btn>
                </template>
              </v-textarea>
            </v-col>
          </v-row>

          <!-- feature-title-row -->
          <v-row>
            <v-col>
              <h3 class="text-decoration-underline">Features</h3>
            </v-col>
          </v-row>
          <!-- dark-mode-switch -->
          <v-row>
            <v-col class="shrink text-no-wrap">
              <v-switch
                v-model="$vuetify.theme.dark"
                hide-details
                :label="`Dark mode: ${$vuetify.theme.dark ? 'on' : 'off'}`"
                class="pt-0"
                @change="themeSwitcher"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
    <!-- modify-dialog -->
    <v-card>
      <v-dialog v-model="modifyDialog" width="500" @click:outside="closeModify">
        <v-card>
          <!-- modify-title -->
          <v-card-title
            primary-title
            class="text-body-1 white--text text-body-2 text-sm-subtitle-1 pa-2"
            :style="`background-color: ${
              $vuetify.theme.dark ? '#424242' : '#00acc1'
            }`"
          >
            {{ modifyTitle }}
          </v-card-title>
          <!-- modify-content -->
          <v-card-text>
            <v-form ref="form" class="form" v-model="valid">
              <v-text-field
                v-model="userData"
                :placeholder="modifyPlaceholder"
                required
                name="data"
                :rules="fieldRules"
                counter
                @keydown="enter"
              >
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <!-- proceed-button -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              plain
              @click="proceed"
              :loading="loading"
              :disabled="!valid"
            >
              Procced
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-tab-item>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import { VueElement, VueFunction, VueResponse } from "../../utils/types";
import AvatarCpn from "../cpn/Avatar-cpn.vue";
import {
  SERVER_USER_LNAME_URL,
  SERVER_USER_NAME_URL,
  SERVER_USER_USERNAME_URL,
} from "../../utils/defines";
import { rules } from "../../utils/rules";
import {
  enterPressed,
  getCurrent,
  getCurrentRole,
  modifyUserDescription,
  modifyUserField,
  modifyUserTheme,
  removeUserAvatar,
  sendUserAvatar,
} from "@/utils/functions";

export default Vue.extend({
  name: "Profile-info",
  components: {
    AvatarCpn,
  },
  data() {
    return {
      darkTheme: this.$vuetify.theme.dark,
      userData: "",
      description: "",
      modifyDialog: false,
      modifyTitle: "",
      modifyPlaceholder: "",
      target: 0,
      url: "",
      loading: false,
      disabled: true,
      valid: false,
      fieldRules: [rules.requiredField, rules.max20, rules.fieldValidator],
      data() {
        return {};
      },
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    ...mapActions(["updateCurrentUser"]),
    /**
     * shorthand to get current data
     * @function
     * @param {string} value - type of param to get
     * @returns {string}
     */
    current(value: string): string {
      return getCurrent(value);
    },
    /**
     * shorthand to get current user role
     * @function
     * @returns {string}
     */
    currentRole(): string {
      return getCurrentRole();
    },
    /**
     * opens modifier dialog modal
     * @function
     * @param {number} target - type of modfifier to open 
     */
    openModify(target: number) {
      switch (target) {
        case 0:
          this.modifyTitle = "Modify my  last name";
          this.modifyPlaceholder = "last name here...";
          break;
        case 1:
          this.modifyTitle = "Modify my name";
          this.modifyPlaceholder = "name here...";

          break;
        case 2:
          this.modifyTitle = "Modify my username";
          this.modifyPlaceholder = "e-mail here...";
          break;
      }
      this.target = target;
      this.modifyDialog = true;
    },
    /**
     * switches target server url 
     * @function
     */
    switchTarget() {
      switch (this.target) {
        case 0:
          this.url = SERVER_USER_LNAME_URL;
          break;
        case 1:
          this.url = SERVER_USER_NAME_URL;
          break;
        case 2:
          this.url = SERVER_USER_USERNAME_URL;
          break;
      }
    },
    /**
     * updates current user instance 
     * @function
     */
    updateUser() {
      switch (this.target) {
        case 0:
          this.currentUser.lname = this.userData;
          break;
        case 1:
          this.currentUser.name = this.userData;
          break;
        case 2:
          this.currentUser.username = this.userData;
          break;
      }
      this.updateCurrentUser(this.currentUser);
    },
    /**
     * opens select image file dialog
     * @function
     */
    openFolder() {
      const input = this.$refs.input as HTMLInputElement;
      input.click();
    },
    /**
     * modify user avatar image
     * @function
     */
    pickFile() {
      const input = this.$refs.input as HTMLInputElement;
      sendUserAvatar(input).then((response: VueResponse) => {
        this.currentUser.avatarSrc = response.bodyText;
        this.updateCurrentUser(this.currentUser);
      });
    },
    /**
     * save modification to server
     * @function
     * @async
     */
    async proceed() {
      this.loading = true;
      this.disabled = true;

      let form: VueElement = this.$refs.form;
      if (form != null) {
        if ((form as unknown as VueFunction).validate()) {
          const formElem: HTMLFormElement | null =
            document.querySelector(".form");
          if (formElem != null) {
            this.switchTarget();
            await modifyUserField(this.url, new FormData(formElem));
            this.updateUser();
            this.userData = "";
          }
        }
      }

      setTimeout(() => {
        this.loading = false;
      }, 1000);
      this.modifyDialog = false;
    },
    /**
     * save description to server
     * @function
     * @async
     */
    async sendDescription() {
      await modifyUserDescription(this.description);
      this.currentUser.description = this.description;
      this.updateCurrentUser(this.currentUser);
      this.description = "";
    },
    /**
     * remove avatar to server
     * @function
     * @async
     */
    async removeAvatar() {
      await removeUserAvatar();
      this.currentUser.avatarSrc = null;
      this.updateCurrentUser(this.currentUser);
    },
    /**
     * modifies app theme dark / light
     * @function
     * @async
     * @param {boolean} darkMode - dark mode state
     */
    async themeSwitcher(darkMode: boolean) {
      await modifyUserTheme(darkMode);
      this.currentUser.dark = darkMode;
      this.updateCurrentUser(this.currentUser);
      this.$vuetify.theme.dark = darkMode;

      const style = document.documentElement.style;
      if (darkMode) {
        style.setProperty("--ck-color-base-foreground", "#424242");
        style.setProperty("--ck-color-base-background", "#424242");
        style.setProperty("--ck-color-base-text", "white");
        style.setProperty(
          "--ck-color-button-default-hover-background",
          "#757575"
        );
        style.setProperty("--ck-color-button-on-background", "#757575");
      } else {
        style.removeProperty("--ck-color-base-foreground");
        style.removeProperty("--ck-color-base-background");
        style.removeProperty("--ck-color-base-text");
        style.removeProperty("--ck-color-button-default-hover-background");
        style.removeProperty("--ck-color-button-on-background");
      }
    },
    /**
     * checks if user is authorized to do action
     * @functikon
     * @returns {boolean}
     */
    isAuthorized(): boolean {
      if (this.currentUser == null) return false;
      return (
        this.currentUser.roles[0].roleName == "SUPERADMIN" ||
        this.currentUser.roles[0].roleName == "ADMIN"
      );
    },
    /**
     * execute action on enter pressed
     * @function
     * @param {KeyboardEvent} e 
     */
    enter(e: KeyboardEvent) {
      enterPressed(e, () => {
        if (this.valid) {
          e.preventDefault();
          this.proceed();
        }
      });
    },
    /**
     * closes modifier dialog modal 
     * @function
     */
    closeModify(): void {
      this.$refs.form.reset();
    },
    /**
     * executes action on enter pressed on description text area
     * @param {KeyboardEvent} e 
     */
    textarePressed(e: KeyboardEvent) {
      enterPressed(e, () => {
        e.preventDefault();
        this.sendDescription();
      });
    },
  },
  watch: {
    /**
     * activate / desactivate proceed button
     * @param {string} value - input value 
     */
    userData(value: string) {
      if (value) this.disabled = false;
      else this.disabled = true;
    },
  },
});
</script>
