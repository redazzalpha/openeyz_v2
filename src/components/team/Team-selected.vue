<template>
    <!-- selected-user-dialog -->
    <v-dialog :value="teamSelectDialog" fullscreen hide-overlay transition="dialog-transition" @keydown="keyPressed">
        <v-card>
            <!-- toolbar -->
            <Toolbar icon="fa-solid fa-users" :title="`Publication of ${author}`">
                <template v-slot:button>
                    <!-- close-button -->
                    <v-btn icon>
                        <v-icon @click="updateTeamSelectDialog(false)">mdi-close</v-icon>
                    </v-btn>

                </template>
            </Toolbar>
            <!-- card-title -->
            <v-container grid-list-xs fluid>
                <v-row class="my-5">
                    <v-col class="text-center">
                        <v-card-title primary-title class="d-flex justify-center">
                            {{ author }} 's publications
                        </v-card-title>
                    </v-col>
                </v-row>
            </v-container>
            <Publication :action="getAllUserPosts" :posts="userPosts" :username="username" />
            <!-- end-publications-alert -->
            <VAlert text color="primary" :value="true" max-width="700" class="mx-auto text-center">
                You have reach end of {{ author }} 's publications
            </VAlert>

        </v-card>
    </v-dialog> <!-- end-selected-user-dialog -->
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import Publication from '../../components/cpn/Publication-cpn.vue';
import Toolbar from '../cpn/Toolbar-cpn.vue';
export default Vue.extend({
    name: 'Team-selected',
    components: {
        Toolbar,
        Publication,
    },
    props: {
        author: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapState([
            'teamSelectDialog',
            'userPosts'
        ]),
    },
    methods: {
        ...mapActions([
            'updateTeamSelectDialog',
            'getAllUserPosts'
        ]),
        keyPressed({ code }: KeyboardEvent): void {
            if (code === "Escape")
                this.updateTeamSelectDialog(false);
        }
    },
    watch: {
        teamSelectDialog(visible: boolean) {
            if (visible)
                this.getAllUserPosts(this.username);
        }
    }

});
</script>

