<script setup>
import SlideListContainer from '../layout/SlideListContainer.vue';
import MainCenterBanner from '@/components/main/item/MainCenterBanner.vue'

</script>

<template>
  <div class="main-container">
    <div class="main-top-area">떠나고 싶은 어디든 롤링힐러</div>
    <SlideListContainer title="오늘의 힐링">

    </SlideListContainer>
    <MainCenterBanner></MainCenterBanner>
    <SlideListContainer title="지금 뜨는 장소">

    </SlideListContainer>
    <SlideListContainer title="베스트 힐러">

    </SlideListContainer>
  </div>
</template>

<style scoped>
  .main-container{
    min-height: auto;
  }
  .main-top-area{
    font-size: 1.5rem;
    font-weight: bold;
  }
</style>