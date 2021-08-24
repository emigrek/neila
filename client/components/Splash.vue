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
        <v-img @load="loaded" rel="preload" contain width="250" height="250" src="https://www.pngarts.com/files/12/Alien-Emoji-Transparent-Image.png"></v-img>
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
    methods: {
        loaded() {
            setTimeout(() => this.visible = false, 3000);
        }
    }
}
</script>

