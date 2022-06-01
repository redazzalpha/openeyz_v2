<template>
    <v-tab-item style="height: 100vh; overflow-y: hidden;">
        <!-- main-card -->
        <v-card flat max-width="600" class="mx-auto">
            <!-- header-title -->
            <v-card-title class="d-flex  flex-column justify-center align-center">
                <!-- user-avatar -->
                <span style="position: relative">
                    <v-avatar size="175" color="red">
                        <img src="../../assets/account.jpg" alt="alt">
                    </v-avatar>
                </span>
            </v-card-title>
            <!-- profile-tab-content -->
            <v-card-text>
                <v-container grid-list-xs>
                    <!-- title-row -->
                    <v-row>
                        <v-col>-
                            <h3 class="text-decoration-underline">Account</h3>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-card elevation="0">
                                <v-card-text>
                                    <v-form>
                                        <v-container grid-list-xs>
                                            <v-row>
                                                <v-col>
                                                    <v-text-field placeholder="old password"></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col>
                                                    <v-text-field placeholder="new password"></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col class="d-flex justify-center">
                                                    <v-btn :width="btnSize" color="primary">Modify</v-btn>
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
export default Vue.extend({
    name: 'Profile-account',
    components: {
    },
    data() {
        return {
        };
    },
    methods: {
        ...mapActions([
            'updateCurrentUser',
        ]),
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

