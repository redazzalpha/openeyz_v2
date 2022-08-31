<template>
  <v-tab-item class="profile-info-tab-item" >
    <!-- main-card -->
    <v-card max-width="600" class="mx-auto mb-10" shaped raised outlined>
      <!-- header-title -->
      <v-card-title class="d-flex flex-column justify-center align-center">
        <!-- user-avatar -->
        <span>{{ currentUser.name }}</span>
        <span style="position: relative">
          <AvatarCpn
            :avatarSrc="currentUser.avatarSrc"
            :role="currentUser.roles[0].roleName"
            size="170"
          />
          <v-btn
            icon
            color="primary"
            style="position: absolute; top: 145px; right: 18px"
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
            <i class="fa-solid fa-camera" style="font-size: 20px"></i>
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
              <span class="mr-3">Last name: {{ currentUser.lname }} </span>
            </v-col>
            <v-col class="shrink">
              <v-btn small color="primary" @click="openModify(0)">Modify</v-btn>
              <br />
            </v-col>
          </v-row>
          <!-- name-row -->
          <v-row>
            <v-col>
              <span class="mr-3">First name: {{ currentUser.name }} </span>
            </v-col>
            <v-col class="shrink">
              <v-btn small color="primary" @click="openModify(1)">Modify</v-btn>
              <br />
            </v-col>
          </v-row>
          <!-- email-row -->
          <v-row>
            <v-col>
              <span class="mr-3">E-mail: {{ currentUser.username }} </span>
            </v-col>
          </v-row>
          <v-row v-if="isAuthorized()">
            <v-col>
              <span class="mr-3"
                >Role: {{ currentUser.roles[0].roleName }}
              </span>
            </v-col>
          </v-row>
          <!-- description-row -->
          <v-row>
            <v-col>
              <span class="mr-3">
                Description:
                {{
                  currentUser.description
                    ? currentUser.description
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
                autofocus
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
      <v-dialog v-model="modifyDialog" width="500">
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
import { httpRequest } from "@/utils/http";
import { VueElement, VueFunction, VueResponse } from "../../utils/types";
import AvatarCpn from "../cpn/Avatar-cpn.vue";
import {
  SERVER_USER_DESCRIPTION_URL,
  SERVER_USER_THEME_URL,
  SERVER_USER_AVATAR_URL,
  SERVER_USER_LNAME_URL,
  SERVER_USER_NAME_URL,
  SERVER_USER_USERNAME_URL,
} from "../../utils/defines";
import { rules } from "../../utils/rules";

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
      fieldRules: [rules.requiredField, rules.fieldValidator],
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
    async sendDescription() {
      const description: FormData = new FormData();
      description.append("description", this.description);
      await httpRequest.patch(SERVER_USER_DESCRIPTION_URL, description);
      this.currentUser.description = this.description;
      this.updateCurrentUser(this.currentUser);
      this.description = "";
    },
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
    async proceed() {
      this.loading = true;
      this.disabled = true;

      let form: VueElement = this.$refs.form;
      // TODO: got to check for username modification cause need change cookie from server according the new username
      if (form != null) {
        if ((form as unknown as VueFunction).validate()) {
          const formElem: HTMLFormElement | null =
            document.querySelector(".form");
          if (formElem != null) {
            this.switchTarget();
            await httpRequest.patch(this.url, new FormData(formElem));
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
    openFolder() {
      const input = this.$refs.input as HTMLInputElement;
      input.click();
    },
    // TODO: try to find a solution to give possibility to user to remove his user image
    async pickFile() {
      const input = this.$refs.input as HTMLInputElement;
      const file = new FormData();
      if (input.files) file.append("file", input.files[0]);
      const response: VueResponse = await httpRequest.patch(
        SERVER_USER_AVATAR_URL,
        file
      );
      this.currentUser.avatarSrc = response.bodyText;
      this.updateCurrentUser(this.currentUser);
    },
    async themeSwitcher(darkMode: boolean) {
      const data: FormData = new FormData();
      data.append("dark", darkMode.toString());
       await httpRequest.patch(SERVER_USER_THEME_URL, data);
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
    isAuthorized(): boolean {
      return (
        this.currentUser.roles[0].roleName == "SUPERADMIN" ||
        this.currentUser.roles[0].roleName == "ADMIN"
      );
    },
  },
  watch: {
    userData(value: string) {
      if (value) this.disabled = false;
      else this.disabled = true;
    },
  },
});
</script>
