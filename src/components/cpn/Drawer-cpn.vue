<template>
    <v-navigation-drawer tag="nav" v-model="$store.state.drawer" temporary app bottom>
        <!-- item-list -->
        <v-list-item>
            <!-- user-vatara -->
            <v-list-item-avatar>
                <Avatar :user="currentUser" size="40" />
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title>{{ currentUser.name }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <!-- links -->
        <v-list dense rounded>
            <!-- item-list -->
            <v-list-item v-for="icon in icons" :key="icon.title" link @click="icon.action" >
                <!-- icon-item -->
                <v-list-item-icon class="cyan--text text--darken-1">
                    <i :class="icon.class"></i>
                </v-list-item-icon>
                <!-- content-item -->
                <v-list-item-content >
                    <v-list-item-title>{{ icon.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import Vue from 'vue';
import Avatar from './Avatar-cpn.vue';
import { mapActions, mapState } from 'vuex';
export default Vue.extend({
    name: 'Nav-drawer',
    components: {
        Avatar,
    },
    data() {
        return {
            icons: [
                {
                    title: 'Profile', 
                    class: 'fa-solid fa-user', 
                    action: () => { 
                        this.updateProfileDialog(true);
                        this.updateDrawer(false);
                    }
                },
                {
                    title: 'Notifications', 
                    class: 'fa-solid fa-bell', 
                    action: () => { console.log('notif action'); }
                },
                {
                    title: 'Team', 
                    class: 'fa-solid fa-users', 
                    action: () => { console.log('team action'); }
                },
                {
                    title: 'Logout', 
                    class: 'fa-solid fa-right-from-bracket', 
                    action: () => { console.log('logout action'); }
                },
            ],
        };
    },
    methods: {
        ...mapActions([
            'updateProfileDialog',
            'updateDrawer',
        ]),
    },
    computed: {
        ...mapState([
            'currentUser',
        ]),
    },
});
</script>

