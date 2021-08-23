<template>
    <v-sheet class="title pa-3 mb-3 d-flex justify-center align-center" color="alien" elevation="24" rounded>
        <div class="title black--text font-weight-bold">nelia 👽</div>
        <div class="caption red--text text--darken-2 ms-1">• <span class="font-weight-bold">{{active}}</span> online</div>
        <div class="ml-auto">
            <v-btn text color="black" depressed @click="$store.commit('conversations/SET_OVERLAY', !conversations.overlay)">
                <v-icon class="emoji-icon">
                    ✨
                </v-icon>
            </v-btn>
            <v-btn text color="black" depressed @click="$store.commit('app/SET_OVERLAY', !app.overlay)">
                <v-icon class="emoji-icon">
                    {{app.user.emoji}}
                </v-icon>
            </v-btn>
            <v-btn text color="black" depressed @click="
                $store.commit('sound/SET', !sound.enabled);
                $toast(sound.enabled ? 'Dźwięki włączone 🔊' : 'Dźwięki wyłączone 🔈');
            ">
                <v-icon v-if="sound.enabled" class="emoji-icon">
                    🔊
                </v-icon>
                <v-icon v-else class="emoji-icon">
                    🔈
                </v-icon>
            </v-btn>
        </div>
    </v-sheet>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "Header",
    data() {
        return {
            active: 0
        };
    },
    mounted() {
        this.$root.socket.on("users length update", (active) => {
            this.active = active;
        });
    },
    computed: {
        ...mapState(["app"]),
        ...mapState(["sound"]),
        ...mapState(["conversations"])
    }
}
</script>

<style scoped>
.emoji-icon {
    font-style: normal;
}
</style>