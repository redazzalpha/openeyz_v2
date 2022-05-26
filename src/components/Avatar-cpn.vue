<template>
    <div>
        <router-link to="#">
            <v-avatar size="55" class="mr-3">
                <img v-if="user.avatarSrc == null && user.roles[0].roleName == 'SUPERADMIN'" src="../assets/suadmin.png"
                    alt="alt">
                <img v-else-if="user.avatarSrc == null && user.roles[0].roleName == 'ADMIN'" src="../assets/admin.png"
                    alt="alt">
                <img v-else-if="user.avatarSrc == null && user.roles[0].roleName == 'USER'" src="../assets/user.png"
                    alt="alt">
                <img v-else-if="user.avatarSrc != null" :src="user.avatarSrc" alt="alt">
            </v-avatar>
        </router-link>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    name: 'Avatar-cpn',
    props: {
        user: { type: Object, required: false }
    }
});
</script>

