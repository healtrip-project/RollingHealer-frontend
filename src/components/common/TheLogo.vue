<script setup>
import IconTheLogo from "@/components/icons/IconTheLogo.vue"
import { useRouter } from "vue-router";
import { RouterLink } from "vue-router";
const props = defineProps({
    type: {
        type: String,
        default:"default"
        }
})
const router = useRouter()
</script>

<template>
    <RouterLink :to="{name:'index'}">
        <div class="logo-render">
            <IconTheLogo></IconTheLogo>
        </div>
    </RouterLink>
</template>

<style scoped>

</style>