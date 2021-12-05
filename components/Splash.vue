<template>
    <v-overlay
        opacity="1"
        absolute
        :value="visible"
        dark
        color="black"
        class="black--text text-center"
        style="z-index: 1000;"
    >
        <span class="logo">👽</span>
    </v-overlay>
</template>

<script>
export default {
    name: 'Splash',
    data() {
        return {
            visible: true
        }
    },
    mounted() {
        setTimeout(() => this.visible = false, 3000);
    }
}
</script>

<style scoped>
.logo {
    font-size: 10rem;
}
</style>

