<template>
    <v-app-bar tag="header" color="cyan darken-1" elevation="1" app>
        <v-container fluid grid-list-xs>
            <v-row>
                <!--navigation-drawer-icon-->
                <v-col v-show="!showAppBarLink" class="shrink px-0">
                    <v-app-bar-nav-icon color="white" @click.stop="updateDrawer(!drawer)" />
                </v-col>
                <v-col :class="$vuetify.breakpoint.name == 'xs' ? '' : 'shrink' + ' px-0'">
                    <!--logo-->
                    <router-link to="/" class=" d-block text-decoration-none">
                        <v-toolbar-title class="logo text-center ml-md-9 text-md-left white--text mr-5">OpenEyz
                        </v-toolbar-title>
                    </router-link>
                </v-col>
            </v-row>
        </v-container>
        <!--appbar-icon-link-->
        <v-toolbar-items v-show="showAppBarLink">
            <!-- profile-icon -->
            <v-btn v-for="icon in icons" :key="icon.title" class="btn d-flex mx-5" elevation=0 color="transparent"
                :title="icon.title" @click="icon.action">
                <i :class="icon.class + ' mr-1'"></i><span>{{ icon.title }}</span>
            </v-btn>
        </v-toolbar-items>
    </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
export default Vue.extend({
    name: 'Appbar-cpn',
    data() {
        return {
            icons: [
                {
                    title: 'Profile', 
                    class: 'fa-solid fa-user', 
                    action: () => { this.$store.dispatch('updateProfileDialog', true); }
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
            'updateDrawer',
            'updateProfileDialog',
        ]),
        openProfile() {
            this.updateProfileDialog(true);
        },  
        logout() {
            console.log('logggg');
        },
    },
    computed: {
        ...mapState([
            'drawer'
        ]),
        showAppBarLink(): boolean {
            let show = true;
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': show = false; break;
                case 'sm': show = false; break;
                case 'md': show = true; break;
                case 'lg': show = true; break;
                case 'xl': show = true; break;
            }
            return show;
        },
    },
});
</script>
