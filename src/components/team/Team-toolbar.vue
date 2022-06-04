<template>
    <!-- toolbar -->
    <v-toolbar dark color="cyan darken-1">
        <v-toolbar-title>
            <i class="fa fa-users"></i>
            <span class="ml-2">Team</span>
        </v-toolbar-title>
        <!-- search-bar -->
        <v-spacer></v-spacer>
        <v-autocomplete v-model="select" :loading="loading" :items="userList" :search-input.sync="search" cache-items
            class="mx-4" flat hide-no-data hide-details label="Search by username" solo-inverted>
        </v-autocomplete>
        <v-spacer></v-spacer> <!-- end-search-bar -->
        <!-- close-button -->
        <v-btn icon dark @click="updateTeamDialog(false)">
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </v-toolbar> <!-- end-toolbar -->
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import { httpRequest } from '../../utils/http';
import * as Defines from '../../utils/defines';

export default Vue.extend({
    name: 'Team-toolbar',
    data() {
        return {
            select: null,
            loading: false,
            search: null,
            userList: [],
        };
    },
    computed: {
        ...mapState([
            'userMap'
        ]),
    },
    methods: {
        ...mapActions([
            'updateTeamDialog',
            'updateUserMap',
        ]),
        async getUsers(): Promise<void> {
            const res = await httpRequest.get(Defines.SERVER_USER_SIMPLE_URL);
            this.updateUserMap(res.body);

            this.userList = this.userMap.map((e: string[]) => {
                const [name] = e;
                return name;
            });
        },
    },
    watch: {
        search(val) {
            val && val !== this.select;
            // val && val !== this.select && this.querySelections(val);
        },
    },
    created(): void {
        this.getUsers();
    }
});
</script>

