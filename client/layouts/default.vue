<template>
  <v-app dark>
    <v-app-bar
      app
      color="black"
      class="d-flex justify-center align-center"
    >
      <div class="display-1 font-weight-bold">neila 👽</div>
    </v-app-bar>
    <v-main>
      <v-fade-transition>
        <nuxt />
      </v-fade-transition>
    </v-main>
  </v-app>
</template>

<script>
</script>

<style>
:root {
  color-scheme: dark;
}
</style>