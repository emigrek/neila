<template>
  <v-container>
    <v-row align="center" justify="center" class="mt-2">
      <v-col xl="6" lg="8" md="10" sm="12">
        <Overlay/>
        <Chat/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  head() {
    return {
      title: this.storage.title,
    }
  },
  transition: "fade",
  created() {
    if (process.client) { 
	    window.addEventListener('visibilitychange', this.visibilityChange, false);
    }
  },
  methods: {
    visibilityChange(e) {
      this.$store.commit("storage/SET_PAGE_VISIBLE", !window.document.hidden);
    },
  },
  components: {
    Chat: () => import("~/components/Chat"),
    Overlay: () => import("~/components/Overlay")
  },
  computed: {
    ...mapState(["storage"]),
  },
}
</script>
