<template>
    <v-tab-item style="height: 100vh; overflow-y: hidden;">
        <!-- main-card -->
        <v-card flat max-width="600" class="mx-auto">
            <!-- header-title -->
            <v-card-title class="d-flex  flex-column justify-center align-center">
                <!-- user-avatar -->
                <span>{{ currentUser.name }}</span>
                <span style="position: relative">
                    <Avatar :user="currentUser" size="170" />
                    <v-btn icon color="primary" style="position: absolute; top: 145px; right: 18px; "
                        @click="openFolder" title="modify image">
                        <input v-show="0" type="file" accept="image/*" ref="input" @change="pickFile" />
                        <i class="fa-solid fa-camera" style="font-size: 20px;"></i>
                    </v-btn>
                </span>
            </v-card-title>
            <!-- profile-tab-content -->
            <v-card-text>
                <v-container grid-list-xs>
                    <!-- title-row -->
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
                            <v-btn small color="primary" @click="openModify(0)">Modify</v-btn> <br>
                        </v-col>
                    </v-row>
                    <!-- name-row -->
                    <v-row>
                        <v-col>
                            <span class="mr-3">Name: {{ currentUser.name }} </span>
                        </v-col>
                        <v-col class="shrink">
                            <v-btn small color="primary" @click="openModify(1)">Modify</v-btn> <br>
                        </v-col>
                    </v-row>
                    <!-- email-row -->
                    <v-row>
                        <v-col>
                            <span class="mr-3">E-mail: {{ currentUser.username }} </span>
                        </v-col>
                        <!-- <v-col class="shrink">
                            <v-btn small color="primary" @click="openModify(2)">Modify</v-btn> <br>
                        </v-col> -->
                    </v-row>
                    <!-- description-row -->
                    <v-row>
                        <v-col>
                            <span class="mr-3">
                                description: {{ currentUser.description ? currentUser.description : 'No description' }}
                            </span>
                        </v-col>
                    </v-row>
                    <!-- decription-modify-area -->
                    <v-row>
                        <v-col>
                            <VTextarea outlined no-resize autoGrow v-model="description"
                                placeholder="New description here" rows=1 append="mdi-send">
                                <template v-slot:append>
                                    <v-btn icon color="primary" @click="sendDescription" title="send description">
                                        <v-icon>mdi-send</v-icon>
                                    </v-btn>
                                </template>
                            </VTextarea>
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
                    <v-card-title class="text-h5 grey lighten-2">
                        {{ modifyTitle }}
                    </v-card-title>
                    <!-- modify-content -->
                    <v-card-text>
                        <v-form ref="form" class="form">
                            <v-text-field v-model="userData" :placeholder="modifyPlaceholder" required name="data">
                            </v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-divider></v-divider>
                    <!-- proceed-button -->
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" plain @click="proceed">
                            Procced
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-card>
    </v-tab-item>
</template>

<script lang="ts">
import { httpRequest } from '@/utils/http';
import Vue from 'vue';
import { mapState } from 'vuex';
import Avatar from '../cpn/Avatar-cpn.vue';
import * as Defines from '../../utils/defines';
import { VueElement, VueFunction, VueResponse } from '../../utils/types';
import { mapActions } from 'vuex';
export default Vue.extend({
    name: 'Profile-info',
    components: {
        Avatar,
    },
    data() {
        return {
            userData: "",
            description: "",
            modifyDialog: false,
            modifyTitle: "",
            modifyPlaceholder: "",
            target: 0,
            url: "",
        };
    },
    methods: {
        ...mapActions([
            'updateCurrentUser',
        ]),
        // TODO: GOT to reload current user cause vuex is not affected on reload
        async sendDescription() {
            const description: FormData = new FormData();
            description.append("description", this.description);
            await httpRequest.patch(Defines.SERVER_DESCRIPTION_URL, description);
            this.currentUser.description = this.description;
            this.updateCurrentUser(this.currentUser);
            this.description = "";
        },
        openModify(target: number) {
            switch (target) {
                case 0:
                    this.modifyTitle = "Modify last name";
                    this.modifyPlaceholder = "last name here...";
                    break;
                case 1:
                    this.modifyTitle = "Modify name";
                    this.modifyPlaceholder = "name here...";

                    break;
                case 2:
                    this.modifyTitle = "Modify username";
                    this.modifyPlaceholder = "e-mail here...";
                    break;
            }
            this.target = target;
            this.modifyDialog = true;
        },
        async proceed() {
            let form: VueElement = this.$refs.form;
            // TODO: got to check for username modification cause need change cookie from server according the new username
            if (form != null) {
                if (((form as unknown) as VueFunction).validate()) {
                    const formElem: HTMLFormElement | null = document.querySelector(".form");
                    if (formElem != null) {
                        this.switchTarget();
                        await httpRequest.patch(this.url, new FormData(formElem));
                        this.updateUser();
                        this.modifyDialog = false;
                        this.userData = "";
                    }
                }
            }
        },
        switchTarget() {
            switch (this.target) {
                case 0:
                    this.url = Defines.SERVER_USER_LNAME_URL;
                    break;
                case 1:
                    this.url = Defines.SERVER_USER_NAME_URL;
                    break;
                case 2:
                    this.url = Defines.SERVER_USER_USERNAME_URL;
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
            file.append("file", input.files![0]);
            const response: VueResponse =  await httpRequest.post(Defines.SERVER_USER_IMG_URL, file);
            this.currentUser.avatarSrc = response.bodyText; 
            this.updateCurrentUser(this.currentUser);  
        }
    },
    computed: {
        ...mapState([
            'currentUser',
        ]),
    },
});
</script>

