<template>
  <!-- post-container -->
  <v-container grid-list-xs fluid class="post-cpn-container">
    <v-row>
      <v-col>
        <!--card-container -->
        <v-card
          max-width="500"
          class="mx-auto card mb-6 pb-2"
          elevation="7"
          style="position: relative; border-radius: 7px"
          :color="$vuetify.theme.dark ? '#424242' : ''"
        >
          <!-- header-title -->
          <v-card-title
            v-if="checkCurrentUser()"
            primary-title
            :style="`background-color: ${
              $vuetify.theme.dark ? '#424242' : '#00acc1'
            }`"
            style="
              border-radius: 7px 7px 0 0;
              display: block;
              padding: 5px !important;
            "
            class="font-italic white--text mb-4 pa-2"
          >
            <div class="d-flex align-center">
              <v-btn :ripple="false" plain icon class="pa-7 mx-2" to="/profile">
                <AvatarCpn
                  :path="currentUser.avatarSrc ? currentUser.avatarSrc : ''"
                  :role="currentUser.roles[0].roleName"
                />
              </v-btn>
              <div class="d-flex flex-column flex-sm-row">
                <span class="text-subtitle-1 mr-2">{{ currentUser.name }}</span>
                <span class="text-subtitle-1"> say what you want </span>
              </div>
            </div>
          </v-card-title>
          <!--editor -->
          <v-card-text>
            <ckeditor
              tools
              :editor="editor"
              v-model="editorData"
              tag-name="textarea"
            ></ckeditor>
            <v-container fluid v-if="max255">
              <v-row>
                <v-spacer></v-spacer>
                <v-col class="flex-grow-0 flex-shrink-0">
                  <span class="red--text text-no-wrap">
                    {{ errorMessage }}
                  </span>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <!-- buttons -->
          <v-card-actions class="d-flex justify-center">
            <v-btn
              color="primary"
              :width="btnSize()"
              @click="publish"
              :loading="loading"
              :disabled="disabled"
              >Publish</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import ClassicEditor from "../../ckeditor5/ckeditor5";
import AvatarCpn from "./Avatar-cpn.vue";
import { mapState } from "vuex";
import { btnSize, publishPost } from "../../utils/functions";

export default Vue.extend({
  name: "Post-cpn",
  components: {
    AvatarCpn,
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: "",
      errorMessage: "255 characters max",
      loading: false,
      disabled: true,
      btnSize: btnSize,
    };
  },
  computed: {
    ...mapState(["posts", "currentUser"]),
    max255(): boolean {
      return this.editorData.length > 255;
    },
  },
  methods: {
    checkCurrentUser(): boolean {
      return typeof this.currentUser != "function" && this.currentUser != null;
    },
    publish(): void {
      if (this.editorData) {
        this.loading = true;
        this.disabled = true;
        publishPost(this.editorData).then(
          () => (this.editorData = ""),
          () => {
            /**/
          }
        );
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    },
  },
  watch: {
    editorData(value: string) {
      if (value.length > 0 && value.length <= 255) this.disabled = false;
      else this.disabled = true;
    },
  },
});
</script>

<style lang="scss">
:root {
  --ck-border-radius: 5px;
}
// editor-content
.ck.ck-editor__main > .ck-editor__editable {
  min-height: $height-editor-content;
}
.v-btn__content {
  opacity: 1 !important;
}
</style>
