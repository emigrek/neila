<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="8">
        <v-card elevation="5">
          <v-card-title>Czat</v-card-title>
          <v-card-subtitle>Czat</v-card-subtitle>
          <v-card-text>
            A tutaj tekst
          </v-card-text>
          <v-card-actions>
            <v-text-field></v-text-field>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "app",
  transition: "fade",
  mounted() {
    this.socket = this.$nuxtSocket({});
  },
}
</script>
