<script setup>
import { useLoginInfoStore } from "@/stores/loginInfo";
import TheLogo from "@/components/common/TheLogo.vue"
import TopNavList from "./TopNavList.vue";
import NavListItem from "./item/NavListItem.vue";
import NavButton from "@/components/common/NavButton.vue"
import { computed,ref } from "vue";
import ModalContainer from "../layout/ModalContainer.vue";
import LoginForm from "../login/LoginForm.vue";
import { useRouter } from "vue-router";
const userStore = useLoginInfoStore()


const router = useRouter();
const movePost = () => {
    router.push({name : 'Post'})
}

const moveGuild = () => {
    router.push({name : 'Guild'})
}


</script>

<template>
    <header class="header">
        <nav class="header-nav">
            <TheLogo type="default"/>
            <TopNavList class="ms-10">
                <NavListItem :item-link="{name:'Plan'}">힐링플랜</NavListItem>
                <NavListItem :item-link="{name:'Post'}">칼럼</NavListItem>
                <NavListItem :item-link="{name:'Place'}">장소</NavListItem>
                <NavListItem :item-link="{name:'Guild'}">길드</NavListItem>
                <NavListItem v-if="userStore?.userInfo?.userId=='admin'" :item-link="{name:'Admin'}">관리</NavListItem>
            </TopNavList>
            <LoginForm></LoginForm>
            
        </nav>
    </header>
</template>

<style scoped>
    .header{
        max-width: 1044px;
        width: 100%;
        display: block;
        position:relative;
        margin: 0 auto;
    }
    .header .header-nav{
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

</style>