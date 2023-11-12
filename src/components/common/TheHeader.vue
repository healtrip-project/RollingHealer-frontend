<script setup>
import { useLoginStore } from "@/stores/loginInfo.js";
import TheLogo from "@/components/common/TheLogo.vue"
import TopNavList from "./TopNavList.vue";
import NavListItem from "./item/NavListItem.vue";
import NavButton from "@/components/common/NavButton.vue"
import { computed } from "vue";
const loginStore = useLoginStore();
const user = computed(()=>loginStore.loginInfo);
console.log(user.value)
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
                <NavListItem v-if="user.userInfo ===null" @click="()=>loginStore.login()"><NavButton>로그인</NavButton></NavListItem>
                <NavListItem v-else-if="user.userInfo !==null">마이페이지</NavListItem>
            </TopNavList>
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