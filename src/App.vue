<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue'
// import affix from  "./components/affix"
import avatar from  "./components/avatar"
import { reactive, toRefs } from 'vue'

const state = reactive({
  circleUrl:
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
})

const { circleUrl} = toRefs(state)
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
  <!-- <icon /> -->
  <!-- <div style="height:2000px"> -->
    <!-- <affix :offset="500">
     <button>Offset top 120px</button>
    </affix> -->
  <!-- </div> -->
  <avatar :src="circleUrl" :size="90" :shape="square"></avatar>
  
</template>

<style>

</style>
