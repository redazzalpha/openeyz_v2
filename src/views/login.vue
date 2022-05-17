<template>
    <!--login-container-->
    <div class="login-container">
        <!--access-dialog-->
        <v-dialog v-model="dialog" width="500" persistent>
            <!--access-title-tabs-->
            <v-tabs align-with-title v-model="tab">
                <v-tabs-slider color="cyan darken-1"></v-tabs-slider>
                <v-tab>Login</v-tab>
                <v-tab>Register</v-tab>
            </v-tabs>
            <!--tabs-content-->
            <v-tabs-items v-model="tab">
            <!--login-tab-->
                <v-tab-item>
                    <v-card>
                        <v-card-text>
                            item 1
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <!--register-tab-->
                <v-tab-item>
                    <v-card>
                        <v-card-text>
                            item 2
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
                    <v-btn small color="success" @click="validate" >text</v-btn>

        </v-dialog>




    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as httpRequest from '../utils/http';
export default Vue.extend({
    name: 'login-page',
    data(): Record<any, any> {
        return {
            dialog: true,
            tab: null,
        };
    },
  methods : {
    validate() {
        httpRequest.post(new FormData());
    }
  }
});
</script>
