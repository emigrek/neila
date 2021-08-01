<template>
  <div>Hiii!</div>
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
