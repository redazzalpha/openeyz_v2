<template>
  <v-tab-item>
    <!-- main-card -->
    <v-card max-width="600" class="mx-auto my-10" shaped raised outlined>
      <!-- header-title -->
      <v-card-title class="d-flex flex-column justify-center align-center">
        <!-- user-avatar -->
        <span style="position: relative">
          <v-avatar size="175" color="red">
            <v-img src="../../assets/account.jpg" alt="alt" />
          </v-avatar>
        </span>
      </v-card-title>
      <!-- profile-tab-content -->
      <v-card-text>
        <v-container grid-list-xs>
          <!-- title-row -->
          <v-row>
            <v-col
              >-
              <h3 class="text-decoration-underline">Account</h3>
            </v-col>
          </v-row>
          <v-row>
            <!-- main-card -->
            <v-col>
              <v-card elevation="0">
                <v-card-text>
                  <!-- main-form -->
                  <v-form>
                    <!-- main-container -->
                    <v-container grid-list-xs>
                      <!-- introduction-row -->
                      <v-row>
                        <v-col>
                          <h3>Delete my account</h3>
                          <p>
                            This section is about deleting your account. <br />
                            We are interested to know why you want to delete
                            your account.
                            <br />
                            Please leave us feedback in order to continue to
                            improve the application <br />
                            and maybe see you come back with us. <br />
                            Thank you.
                          </p>
                        </v-col>
                      </v-row>
                      <!-- area-row -->
                      <v-row>
                        <v-col>
                          <v-textarea
                            outlined
                            no-resize
                            autoGrow
                            v-model="areaModel"
                            placeholder="Let us know why?..."
                            rows="1"
                            append="mdi-send"
                            autofocus
                          >
                          </v-textarea>
                        </v-col>
                      </v-row>
                      <!-- button-row -->
                      <v-row>
                        <v-col class="d-flex justify-center">
                          <v-btn
                            :width="btnSize"
                            color="#ba1c1e"
                            class="white--text"
                            @click.stop="dialog = !dialog"
                          >
                            Delete my account</v-btn
                          >
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
    <!-- delete-dialog -->
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <!-- dialog-title -->
        <v-card-title
          class="text-h5 white--text"
          style="background-color: #ba1c1e"
        >
          Delete My account
        </v-card-title>
        <!-- dialog-content -->
        <v-card-text>
          <!-- information-text -->
          <p>
            <span class="d-block text-h6 font-weight-bold">Warning</span>
            Your are about to delete your account. <br />
            Be aware that all informations like post(s), comment(s)... <br />
            will be deleted from database. <br />
            If you procced this operation cannot be undone.
          </p>

          <!-- confirm-action -->
          <div class="mt-5">
            Please insert
            <span class="font-weight-bold">{{ currentUser.username }}</span> to
            confirm.
          </div>
          <!-- confirm-field -->
          <v-text-field
            v-model="confirmModel"
            solo
            hide-details
            background-color="grey lighten-3"
            style="border: solid red 2px"
          >
          </v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <!-- button-action -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="delAccount"
            :disabled="!(confirmModel === currentUser.username)"
          >
            Procced
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-tab-item>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { mapActions, mapGetters } from "vuex";
import { httpRequest } from "../../utils/http";
import { clearStorage } from '../../utils/functions';
import * as Defines from "../../utils/defines";
export default Vue.extend({
  name: "Profile-account",
  components: {},
  data() {
    return {
      areaModel: "",
      confirmModel: "",
      dialog: false,
      confirm: false,
    };
  },
  methods: {
    ...mapActions(["updateCurrentUser"]),
    async delAccount() {
      await httpRequest.delete(Defines.SERVER_USER_DELETE_URL);
      clearStorage();
      this.$router.push(Defines.ACCESS_PAGE_URL);
    },
  },
  computed: {
    ...mapState(["currentUser"]),
    ...mapGetters(["btnSize"]),
  },
});
</script>
