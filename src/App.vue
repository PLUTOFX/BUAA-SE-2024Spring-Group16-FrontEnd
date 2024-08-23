<script setup>
  import { RouterLink, RouterView } from 'vue-router';
  import Footer from './components/layouts/Footer.vue';
</script>
<template>
  <el-config-provider namespace="ep">
    <el-container>
      <el-header>
        <BaseHeader />      
      </el-header>
      <el-main>
        <RouterView/>
      </el-main>
      <div v-if="!$route.meta.hideFooter">
        <Footer/>
      </div>
    </el-container>
    
  </el-config-provider>
  
  
</template>

<style>
/* #app {
  text-align: center;
  color: var(--ep-text-color-primary);
}

.main-container {
  height: calc(100vh - var(--ep-menu-item-height) - 3px);
} */
</style>

