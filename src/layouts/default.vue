<template>
  <v-app dark>
    <nuxt />
  </v-app>
</template>

<script>
export default {
  name: 'default'
}
</script>

<style>
:root {
  color-scheme: dark;
}
body {
  overflow-y: auto;
}
html { 
  overflow-y: auto;
  scroll-behavior: smooth; 
}
</style>