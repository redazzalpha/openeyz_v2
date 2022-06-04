<template>
    <!-- selected-user-dialog -->
    <v-dialog :value="teamSelectDialog" fullscreen hide-overlay transition="dialog-transition" @keydown="keyPressed">
        <v-card>
            <v-toolbar dark color="cyan darken-1">
                <v-toolbar-title>
                    <i class="fa fa-users"></i>
                    <span class="ml-2">Publication of {{ author }}</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <!-- close-button -->
                <v-btn icon>
                    <v-icon @click="updateTeamSelectDialog(false)">mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <Publication :author="author" :username="username" />
        </v-card>
    </v-dialog> <!-- end-selected-user-dialog -->
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import Publication from './Team-publication.vue';
export default Vue.extend({
    name: 'Team-selected',
    components: {
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
            'teamSelectDialog'
        ]),
    },
    methods: {
        ...mapActions([
            'updateTeamSelectDialog'
        ]),
        keyPressed({ code }: KeyboardEvent): void {
            if (code === "Escape")
                this.updateTeamSelectDialog(false);
        }

    }
});
</script>

