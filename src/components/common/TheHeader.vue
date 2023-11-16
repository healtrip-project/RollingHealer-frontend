<script setup>
import { useLoginInfoStore } from "@/stores/loginInfo";
import TheLogo from "@/components/common/TheLogo.vue"
import TopNavList from "./TopNavList.vue";
import NavListItem from "./item/NavListItem.vue";
import NavButton from "@/components/common/NavButton.vue"
import { computed,ref } from "vue";
import ModalContainer from "../layout/ModalContainer.vue";
import LoginForm from "../login/LoginForm.vue";
const loginStore = useLoginInfoStore();
const userInfo = computed(()=>loginStore.userInfo);
const showModal =ref(false);
const test=()=>{
    showModal.value=true;

}
console.log(userInfo.value)
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
                <NavListItem v-if="userInfo ===null" @click="test"><NavButton>로그인</NavButton></NavListItem>
                <NavListItem v-else-if="userInfo !==null">마이페이지</NavListItem>
            </TopNavList>
        </nav>
        <ModalContainer v-if="showModal">
            <LoginForm></LoginForm>
        </ModalContainer>
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