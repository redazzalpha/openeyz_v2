<template>
  <!-- post-input-block -->
  <div class="post-input">
    <!-- editor-container -->
    <v-container grid-list-xs fluid>
      <v-row>
        <v-col>
          <!--card-container -->
          <v-card max-width="500" class="mx-auto card mb-6 pb-2" elevation="7" style="position: relative">
            <!--error-alert-message-->
            <Transition name="scale-transition">
              <v-alert v-show="alertMessage" dense outlined type="error" style="
                  position: absolute;
                  top: 40%;
                  left: 10%;
                  right: 10%;
                  z-index: 1;
                  word-break: keep-all;
                " text elevation="5" class="mt-3">{{ alertMessage }}</v-alert>
            </Transition>
            <!-- header-title -->
            <v-card-title primary-title style="background-color: #00acc1"
              class="text-body-1 text-sm-h6 white--text mb-4 pa-2">
              <router-link to="#">
                <Avatar :user="currentUser" />
              </router-link>
              Say what you want {{ currentUser.name }}
            </v-card-title>
            <!--editor -->
            <v-card-text>
              <ckeditor :editor="editor" v-model="editorData" height="300" tag-name="textarea"></ckeditor>
            </v-card-text>
            <!-- buttons -->
            <v-card-actions class="d-flex justify-center">
              <v-btn color="primary" :width="btnSize" @click="publish">Publish</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ClassicEditor from "@/ckeditor5/ckeditor5";
import { mapGetters, mapState, mapActions } from "vuex";
import { httpRequest } from "@/utils/http";
import * as Defines from "@/utils/defines";
import Avatar from "../cpn/Avatar-cpn.vue";
import { VueResponse } from "../../utils/types";

export default Vue.extend({
  name: "Post-input",
  components: {
    Avatar,
  },
  data() {
    return {
      alertMessage: "",
      editor: ClassicEditor,
      editorData: "",
      test: Number,
    };
  },
  methods: {
    ...mapActions(["getAllPosts"]),
    publish(): void {
      if (this.editorData) {
        let data: FormData = new FormData();
        // TODO: try to add src attribut to see imge on click 
        data.append("post", this.editorData.replace(/<img/g, "<img width=100%"));
        httpRequest.post(Defines.SERVER_PUBLICATION_URL, data).then(
          (): void => {
            this.editorData = "";
            this.getAllPosts();
          },
          (error: VueResponse): void => {
            this.alertMessage = error.bodyText;
            setTimeout(() => {
              this.alertMessage = "";
            }, Defines.ERROR_MESSAGE_DURATION);
          }
        );
      }
    },
    showErrorMessage(message: string): void {
      this.alertMessage = message;
    },
  },
  computed: {
    ...mapState(["posts", "currentUser"]),
    ...mapGetters(["btnSize"]),
  },
});
</script>

<style lang="scss">
// editor body
/* .ck.ck-editor {
} */
// editor-toolbar
/* .ck-rounded-corners .ck.ck-editor__top .ck-sticky-panel .ck-toolbar,
.ck.ck-editor__top .ck-sticky-panel .ck-toolbar.ck-rounded-corners {
  background-color: #BDBDBD;
} */

// editor-content
.ck.ck-editor__main>.ck-editor__editable {
  min-height: $height-editor-content !important;
}
</style>
