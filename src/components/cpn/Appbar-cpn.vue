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
            <v-btn class="btn d-flex mx-5" elevation=0 color="transparent" v-for="icon of icons" :key="icon.title"
                :title="icon.title">
                <!-- <font-awesome-icon  class="appbar-icon mr-2" :icon="item.icon"/> -->
                <i :class="icon.class + ' mr-1'"></i><span>{{ icon.title }}</span>
                <!-- <span class="white--text"></span> -->
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
                { title: 'Profile', class: 'fa-solid fa-user', action: '#' },
                { title: 'Notifications', class: 'fa-solid fa-bell', action: '#' },
                { title: 'Team', class: 'fa-solid fa-users', action: '#' },
                { title: 'Logout', class: 'fa-solid fa-right-from-bracket'},
            ],
        };
    },
    methods: {
        ...mapActions([
            'updateDrawer'
        ]),
        logout() {
            console.log('logggg')
        }
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
