<template>
    <v-avatar :size="size" class="avatar-cpn-avatar mr-3">
        <v-img v-if="!avatarSrc && role == 'SUPERADMIN'" src="../../assets/suadmin.png" alt="alt" />
        <v-img v-else-if="!avatarSrc && role == 'ADMIN'" src="../../assets/admin.png" alt="alt" />
        <v-img v-else-if="!avatarSrc && role == 'USER'" src="../../assets/user.png" alt="alt" />
        <v-img v-else-if="avatarSrc" :src="avatarSrc" alt="alt" />
        <v-img v-else src="../../assets/user.png" alt="alt" />
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

