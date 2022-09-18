<template>
    <v-avatar :size="size" class="avatar-cpn-avatar mr-3" style="">
        <img v-if="!avatarSrc && role == 'SUPERADMIN'" src="../../assets/users/suadmin.png" alt="alt" style="object-fit: cover;"/>
        <img v-else-if="!avatarSrc && role == 'ADMIN'" src="../../assets/users/admin.png" alt="alt" style="object-fit: cover;"/>
        <img v-else-if="!avatarSrc && role == 'USER'" src="../../assets/users/user.png" alt="alt" style="object-fit: cover;"/>
        <img v-else-if="avatarSrc" :src="avatarSrc" alt="alt" style="object-fit: cover;"/>
        <img v-else src="../../assets/users/user.png" alt="alt" style="object-fit: cover;"/>
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
            required: false,
            default: null,
        },
        size: {
            type: String,
            required: false,
            default: "55",
        }
    },
});
</script>

