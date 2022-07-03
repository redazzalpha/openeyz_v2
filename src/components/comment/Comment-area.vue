<template>
  <!-- main-container -->
  <v-container grid-list-xs class="comment-area-container">
    <!-- leave-comment-area -->
    <v-row>
      <v-col class="d-flex align-center pt-0">
        <AvatarCpn
          :avatarSrc="currentUser.avatarSrc"
          :role="currentUser.roles[0].roleName"
          size="40"
        />
        <v-form v-model="valid" ref="form" style="width: 100%">
          <v-textarea
            v-model="comment"
            placeholder="comment here"
            auto-grow
            outlined
            rows="1"
            row-height="15"
            rounded
            autofocus
            counter
            :rules="rules"
          >
            <!-- FIXME: fix btn bug sometimes does not appear - try to change with append directive -->
            <!-- send-comment-button -->
            <template v-slot:append>
              <v-btn
                icon
                color="primary"
                @click="send"
                :loading="loading"
                :disabled="disabled || !valid"
                class="btn-send"
              >
                <v-icon>mdi-send</v-icon>
              </v-btn>
            </template>
          </v-textarea>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { getAllComments, translateDate } from "../../utils/functions";
import { COMMENT_GET_LIMIT, SERVER_COMMENT_URL } from "../../utils/defines";
import { httpRequest } from "../../utils/http";
import AvatarCpn from "../cpn/Avatar-cpn.vue";
import { rules } from "../../utils/rules";
export default Vue.extend({
  name: "Comment-area",
  components: {
    AvatarCpn,
  },
  data() {
    return {
      test: false,
      translateDate: translateDate,
      valid: false,
      comment: "",
      loading: false,
      disabled: true,
      rules: [rules.max250],
    };
  },
  computed: {
    ...mapState(["currentUser", "currentItem"]),
  },
  methods: {
    // TODO; block message length as 255 char max need to do it on server too
    async send(): Promise<void> {
      if (this.valid) {
        this.loading = true;
        this.disabled = true;

        const data: FormData = new FormData();
        data.append("comment", this.comment);
        data.append("postId", this.currentItem.post.id.toString());
        await httpRequest.post(SERVER_COMMENT_URL, data);
        await getAllComments(this.currentItem.post.id, COMMENT_GET_LIMIT);
        this.currentItem.commentCount++;
        this.comment = "";

        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    },
  },
  watch: {
    comment(value: string) {
      if (value) this.disabled = false;
      else this.disabled = true;
    },
  },
});
</script>

<style lang="scss">
.v-input__append-inner {
  margin-top: 8px !important;
}
</style>

<style lang="scss" scoped>
.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense)
  textarea {
  margin-top: 13px !important  ;
}
.btn-send {
  position: absolute;
  bottom: 10px;
  right: 0;
}
</style>
