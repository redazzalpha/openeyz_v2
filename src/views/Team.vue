<template>
    <v-card>

        <Toolbar title="Team" icon="fa-solid fa-users" >
            <template v-slot:center>
                <v-autocomplete v-model="select" :loading="loading" :items="userList" :search-input.sync="search"
                    cache-items class="mx-4" flat hide-no-data hide-details label="Search by username" solo-inverted>
                </v-autocomplete>

            </template>
        </Toolbar>

        <Title />
        <Cards />
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import Toolbar from '../components/cpn/Toolbar-cpn.vue';
import Title from '../components/team/Team-title.vue';
import Cards from '../components/team/Team-cards.vue';
import { httpRequest } from '../utils/http';
import * as Defines from '../utils/defines';

export default Vue.extend({
    name: 'Team-page',
    components: {
        Toolbar,
        Title,
        Cards,
    },
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
            'userMap',
        ]),
    },
    methods: {
        ...mapActions([
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
    created() {
        this.getUsers();
    }

});
</script>

