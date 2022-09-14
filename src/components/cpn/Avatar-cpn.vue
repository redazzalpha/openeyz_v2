<template>
    <v-avatar :size="size" class="avatar-cpn-avatar mr-3">
        <v-img v-if="!avatarSrc && role == 'SUPERADMIN'" src="../../assets/users/suadmin.png" alt="alt" />
        <v-img v-else-if="!avatarSrc && role == 'ADMIN'" src="../../assets/users/admin.png" alt="alt" />
        <v-img v-else-if="!avatarSrc && role == 'USER'" src="../../assets/users/user.png" alt="alt" />
        <v-img v-else-if="avatarSrc" :src="avatarSrc" alt="alt" />
        <v-img v-else src="../../assets/users/user.png" alt="alt" />
    </v-avatar>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    name: "Avatar-cpn",
    props: {
        avatarSrc: {
            // got no spedcify type cause throw error on null value
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            default: "55",
            required: false,
        }
    },
});
</script>

