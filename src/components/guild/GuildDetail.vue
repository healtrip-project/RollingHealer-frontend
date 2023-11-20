<script setup>
import { getGuildDetails } from '@/api/v1/guild';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const actions = ref([
  // Populate with action data
]);

const topContentItems = ref([
  // Populate with content data
]);

const logs = ref([
  // Populate with log data
]);

const guildDetails = ref({});

const getGuild = () => {
    getGuildDetails(
        route.params.alias,
        ({ data }) => {
            console.dir(data)
            guildDetails.value = data;
        },
        (error) => {
            console.log(error);
        }
    );
}
getGuild();


</script>


<template>
    <div class="main-container">
      <aside class="left-sidebar">
        <div class="profile-section">
          <!--  <img src="path-to-profile-image.jpg" alt="Profile" class="profile-picture"> -->
          <h3 class="username">유저이름</h3>
          <p class="user-description">간단 소개</p>
        </div>
        <ul class="user-actions">
          <!-- Dynamically generate list items -->
          <li v-for="action in actions" :key="action.id" class="action-item">
            <img :src="action.icon" alt="" class="action-icon">
            <span>{{ action.label }}</span>
          </li>
        </ul>
      </aside>
      <section class="content-area">
        <div class="top-content">
          <!-- Dynamically generate content cards -->
          <div v-for="item in topContentItems" :key="item.id" class="content-card">
            <img :src="item.image" alt="" class="card-image">
            <div class="card-description">
              <h4>{{ item.title }}</h4>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </div>
        <div class="bottom-content">
          <ul class="logs">
            <!-- Dynamically generate logs -->
            <li v-for="log in logs" :key="log.id" class="log-item">
              <span>{{ log.action }}</span>
              <span>{{ log.date }}</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </template>
  
  
  <style scoped>
  .main-container {
    display: flex;
  }
  
  .left-sidebar {
    width: 20%; /* Adjust width as necessary */
    background-color: #C0392B; /* Adjust color as necessary */
  }
  
  .profile-section {
    /* Style the profile section */
  }
  
  .profile-picture {
    border-radius: 50%; /* Make the image round */
  }
  
  .username {
    /* Style the username */
  }
  
  .user-description {
    /* Style the user description */
  }
  
  .user-actions {
    list-style: none; /* Remove list bullet points */
    padding: 0; /* Remove padding */
  }
  
  .action-item {
    display: flex;
    align-items: center; /* Align icon and label */
  }
  
  .content-area {
    width: 80%; /* Adjust width as necessary */
    background-color: #34495E; /* Adjust color as necessary */
  }
  
  .top-content {
    /* Style the top content area */
  }
  
  .content-card {
    /* Style the content cards */
  }
  
  .card-image {
    /* Style the card images */
  }
  
  .card-description {
    /* Style the card description */
  }
  
  .bottom-content {
    /* Style the bottom content area */
  }
  
  .logs {
    list-style: none; /* Remove list bullet points */
    padding: 0; /* Remove padding */
  }
  
  .log-item {
    /* Style the log items */
  }
  </style>