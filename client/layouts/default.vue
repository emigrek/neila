<template>
  <v-app dark>
    <v-app-bar
      app
      color="black"
      class="d-flex justify-center align-center"
      :value="!storage.overlay"
    >
      <div class="display-1 font-weight-bold">nelia 👽</div>
    </v-app-bar>
    <v-main>
      <v-fade-transition>
        <nuxt />
      </v-fade-transition>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
    name: 'default',
    computed: {
        ...mapState(["storage"]),
    },
}
</script>

<style>
:root {
  color-scheme: dark;
}
html { overflow-y: auto }
</style>