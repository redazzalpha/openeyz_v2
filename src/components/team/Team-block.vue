<template>
    <v-row justify="center">
        <v-dialog :value="teamDialog" fullscreen hide-overlay transition="dialog-bottom-transition"
            @keydown="keyPressed">
            <v-card>
                <Toolbar />
                <Title />
                <Cards />
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import Toolbar from './Team-toolbar.vue';
import Title from './Team-title.vue';
import Cards from './Team-cards.vue';

export default Vue.extend({
    name: 'Team-page',
    components: {
        Toolbar,
        Title,
        Cards,
    },
    methods: {
        ...mapActions([
            'updateTeamDialog'
        ]),
        keyPressed({ code }: KeyboardEvent): void {
            if (code === "Escape")
                this.updateTeamDialog(false);
        },
    },
    computed: {
        ...mapState([
            'teamDialog'
        ]),
    },
});
</script>

