<template>
  <v-container>
    <v-row align="center" justify="center" class="mt-2">
      <v-col xl="6" lg="8" md="10" sm="12">
        <Chat/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  head: {
    title: `neila`,
  },
  transition: "fade",
  components: {
    Chat: () => import("~/components/Chat")
  },
  computed: {
    ...mapState(["storage"]),
  },
}
</script>
