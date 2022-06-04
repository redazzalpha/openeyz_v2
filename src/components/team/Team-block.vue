<template>
    <v-row justify="center">
        <v-dialog :value="teamDialog" fullscreen hide-overlay transition="dialog-bottom-transition"
            @keydown="keyPressed">
            <!-- toolbar -->
            <v-toolbar dark color="cyan darken-1">
                <v-toolbar-title>Team</v-toolbar-title>
                <!-- search-bar -->
                <v-spacer></v-spacer>
                <v-autocomplete v-model="select" :loading="loading" :items="userList" :search-input.sync="search"
                    cache-items class="mx-4" flat hide-no-data hide-details label="Search by username" solo-inverted>
                </v-autocomplete>
                <v-spacer></v-spacer>
                <!-- close-button -->
                <v-toolbar-items>
                    <v-btn icon dark @click="updateTeamDialog(false)">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <!-- main-card -->
            <v-card>
                <v-container grid-list-xs style="max-width: 800px;">
                    <v-row class="d-flex justify-center">
                        <v-col class="col-12 col-sm-6 " v-for="(item, index) in userMap" :key="index">
                            <!-- user-card -->
                            <v-hover v-slot="{hover}">
                                <v-card :elevation="hover? 7 : 2 "  :class="{hover : 'test'} ">
                                    <v-card-text class="text-center">
                                        <v-avatar size="50" class="mr-3">
                                            <!-- FIXME: got to fix bug that when sending publication or comment good img  appears only reload -->
                                            <v-img v-if="!item[1] && item[2] == 'SUPERADMIN'" src="../../assets/suadmin.png"
                                                alt="alt" />
                                            <v-img v-else-if="!item[1] && item[2] == 'ADMIN'" src="../../assets/admin.png"
                                                alt="alt" />
                                            <v-img v-else-if="!item[1] && item[2] == 'USER'" src="../../assets/user.png"
                                                alt="alt" />
                                            <v-img v-else-if="item[1]" :src="item[1]" alt="alt" />
                                        </v-avatar>
                                        {{ item[0] }}
                                    </v-card-text>
                                </v-card>
                            </v-hover>
                        </v-col>
                    </v-row>
                </v-container>

                <Publication author="max@gmail.com" />
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import { httpRequest } from '../../utils/http';
import * as Defines from '../../utils/defines';
import { UserMap } from '../../utils/types';
import Publication from './Team-publication.vue';

export default Vue.extend({
    name: 'Team-page',
    components: {
        Publication,
    },
    data() {
        return {
            userMap: [[]],
            userList: [],
            loading: false,
            search: null,
            select: null,
        };
    },
    methods: {
        ...mapActions([
            'updateTeamDialog'
        ]),
        keyPressed({ code }: KeyboardEvent): void {
            if (code === "Escape")
                this.updateTeamDialog(false);
        },
        async getUsers(): Promise<void> {
            const res = await httpRequest.get(Defines.SERVER_USER_SIMPLE_URL);
            this.userMap = res.body as UserMap;
            this.userList = this.userMap.map(e => {
                const [name] = e;
                return name;
            });
        },
        openUserProf(){
            console.log("in userprof")
        },
    },
    computed: {
        ...mapState([
            'currentUser',
            'teamDialog'
        ]),
    },
    watch: {
        search(val) {
            val && val !== this.select;
            // val && val !== this.select && this.querySelections(val);
        },
    },

    created(): void {
        this.updateTeamDialog(false);
        this.getUsers();
    }
});
</script>

<style lang="scss" scoped>
.hover {
    cursor: pointer;
}
</style>
