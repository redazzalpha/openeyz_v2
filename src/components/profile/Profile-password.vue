<template>
    <v-tab-item>
        <!-- main-card -->
        <v-card flat max-width="600" class="mx-auto">
            <!-- header-title -->
            <v-card-title class="d-flex  flex-column justify-center align-center">
                <!-- user-avatar -->
                <span style="position: relative">
                    <v-avatar size="175" color="red">
                        <v-img src="../../assets/password1.png" alt="alt" />
                    </v-avatar>
                </span>
            </v-card-title>
            <!-- profile-tab-content -->
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
                            <div style="height: 0; position: relative; width: 100%;"
                                class="d-flex justify-center align-center">
                                <!--error-alert-message-->
                                <Transition name="scale-transition">
                                    <v-alert v-show="alertMessage" dense outlined type="error"
                                        style="word-break: keep-all; position: absolute; z-index: 1;"  text elevation="5"
                                        class="mt-5">{{ alertMessage }}</v-alert>
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
                                    <v-form class="form" ref="form">
                                        <v-container grid-list-xs>
                                            <!-- password-field-row -->
                                            <v-row>
                                                <v-col class="pa-0">
                                                    <v-text-field placeholder="old password" type="password"
                                                        name="password"></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col class="pa-0">
                                                    <v-text-field placeholder="new password" type="password"
                                                        name="password1"></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col class="d-flex justify-center">
                                                    <v-btn :width="btnSize" color="primary" @click="sendPassword">Modify
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
import Vue from 'vue';
import { mapState } from 'vuex';
import { mapActions, mapGetters } from 'vuex';
import { httpRequest } from '../../utils/http';
import { VueElement, VueFunction, VueResponse } from '../../utils/types';
import * as Defines from '../../utils/defines';
export default Vue.extend({
    name: 'Profile-password',
    components: {
    },
    data() {
        return {
            alertMessage: "",
        };
    },
    methods: {
        ...mapActions([
            'updateCurrentUser',
        ]),
        async sendPassword(): Promise<void> {
            let form: VueElement = this.$refs.form;
            if (form != null) {
                if (((form as unknown) as VueFunction).validate()) {
                    const formElem: HTMLFormElement | null = document.querySelector(".form");
                    if (formElem != null) {
                        httpRequest.patch(Defines.SERVER_USER_PASSWORD_URL, new FormData(formElem)).catch(
                            (error: VueResponse): void => {
                                this.alertMessage = error.bodyText;
                                setTimeout(() => { this.alertMessage = ''; }, Defines.ERROR_MESSAGE_DURATION);
                            }
                        );
                    }
                }
            }
        },
    },
    computed: {
        ...mapState([
            'currentUser',
        ]),
        ...mapGetters([
            'btnSize',
        ]),
    },
});
</script>

