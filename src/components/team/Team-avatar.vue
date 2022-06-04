<template>
    <v-avatar :size="size" class="mr-3">
        <!-- FIXME: got to fix bug that when sending publication or comment good img  appears only reload -->
        <v-img v-if="!avatarSrc && role == 'SUPERADMIN'" src="../../assets/suadmin.png" alt="alt" />
        <v-img v-else-if="!avatarSrc && role == 'ADMIN'" src="../../assets/admin.png" alt="alt" />
        <v-img v-else-if="!avatarSrc && role == 'USER'" src="../../assets/user.png" alt="alt" />
        <v-img v-else-if="avatarSrc" :src="avatarSrc" alt="alt" />
    </v-avatar>
</template>

<script lang="ts">
import Vue from 'vue';
import { PropType } from 'vue/types/umd';
import { Users } from '../../utils/types';
export default Vue.extend({
    name: "Team-avatar",
    props: {
        avatarSrc: {
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            default: "55"
        }
    }
});
</script>

