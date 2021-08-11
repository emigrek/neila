<template>
  <v-app dark>
    <v-main>
      <v-fade-transition>
        <nuxt />
      </v-fade-transition>
    </v-main>
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
html { 
  overflow-y: auto;
  scroll-behavior: smooth; 
}
</style>