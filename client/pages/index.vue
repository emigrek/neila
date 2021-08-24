<template>
  <v-container>
    <v-row align="center" justify="center" class="mt-2">
      <v-col xl="6" lg="8" md="10" sm="12">
        <Splash/>
        <Conversations/>
        <Overlay/>
        <Chat v-if="app.user"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  head() {
    return {
      title: this.page.title,
    }
  },
  transition: "fade",
  created() {
    if (process.client) { 
	    window.addEventListener('visibilitychange', this.visibilityChange, false);
    }
  },
  beforeDestroy () {
    if (typeof window === 'undefined') return

    window.removeEventListener('resize', this.onResize, { passive: true })
  },
  mounted () {
    this.onResize()

    window.addEventListener('resize', this.onResize, { passive: true })
  },
  methods: {
    visibilityChange(e) {
      this.$store.commit("page/SET_VISIBLE", !window.document.hidden);
    },
    onResize () {
      this.$store.commit("page/SET_HEADER", (window.innerWidth < 600) ? false : true);
    }
  },
  components: {
    Chat: () => import("~/components/Chat"),
    Overlay: () => import("~/components/Overlay"),
    Conversations: () => import("~/components/Conversations"),
    Splash: () => import("~/components/Splash")
  },
  computed: {
    ...mapState(["app"]),
    ...mapState(["page"]),
    ...mapState(["conversations"])
  },
}
</script>
