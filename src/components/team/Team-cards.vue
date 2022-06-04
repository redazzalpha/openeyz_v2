<template>
    <!-- user-cards-->
    <v-container grid-list-xs style="max-width: 800px;">
        <v-row class="d-flex justify-center">
            <!-- TODO: CHANGE type of recieved object cu=ause deos not respect convention need get map<string, value> as json   -->
            <v-col class="col-12 col-sm-6 " v-for="(item, index) in userMap" :key="index">
                <!-- user-card -->
                <v-hover v-slot="{ hover }">
                    <v-card :elevation="hover ? 7 : 2" @click="openSelected(item[0], item[3])">
                        <v-card-text class="text-center" >
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
        <Selected :author="author" :username="username" />
    </v-container> <!-- end-user-cards -->
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import Selected from './Team-selected.vue'
export default Vue.extend({
    name: 'Team-cards',
    components: {
        Selected,
    },
    data() {
        return {
            author: "",
            username: ""
        };
    },
    computed: {
        ...mapState([
            'userMap',
        ]),
    },
    methods: {
        ...mapActions([
            'updateTeamSelectDialog'
        ]),
        openSelected(author: string, username: string) {
            this.author = author;
            this.username = username;
            this.updateTeamSelectDialog(true);  
        },
    }
});
</script>

<style lang="scss" scoped>
.hover {
    cursor: pointer;
}
</style>
