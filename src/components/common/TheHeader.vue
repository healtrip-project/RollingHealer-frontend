<script setup>
import { useLoginInfoStore } from "@/stores/loginInfo";
import TheLogo from "@/components/common/TheLogo.vue"
import TopNavList from "./TopNavList.vue";
import NavListItem from "./item/NavListItem.vue";
import NavButton from "@/components/common/NavButton.vue"
import { computed,ref } from "vue";
import ModalContainer from "../layout/ModalContainer.vue";
import LoginForm from "../login/LoginForm.vue";

</script>

<template>
    <header class="header">
        <nav class="header-nav">
            <TheLogo type="default"/>
            <TopNavList>
                <NavListItem>힐링플랜</NavListItem>
                <NavListItem>칼럼</NavListItem>
                <NavListItem :item-link="{name:'map'}">장소</NavListItem>
                <NavListItem>길드</NavListItem>
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