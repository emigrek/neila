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