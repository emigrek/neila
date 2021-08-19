<template>
    <v-overlay
        opacity="0.95"
        absolute
        :value="conversations.overlay"
        dark
        color="alien"
        class="black--text"
    >
        <div class="text-center">
            <p class="display-1 font-weight-bold">Odkryci ✨</p>
            <p class="subtitle-1">Przeprowadzone konwersacje</p>
        </div>
        <div id="conversations" v-if="conversations.all.length" class="my-2" style="overflow-y: scroll;margin-top: auto; width: 100%;height: 500px;max-height: 500px;">
            <div style="display: flex;flex-flow: column nowrap;padding-top: 10px;">
                <div v-for="conversation in conversations.all" :key="conversation.room.id">
                    <Stranger :emoji="conversation.stranger.emoji" :motto="conversation.stranger.motto" :region="conversation.stranger.region"/>
                </div>
            </div>
        </div>
        <div v-else class="my-5 grey--text text--darken-2">
            <p class="subtitle-1">Wyszukaj pierwszego obcego! 🧐</p>
        </div>
        <v-row align="center" justify="center">
            <v-col cols="12" class="text-center">
                <v-btn depressed x-large rounded no-details @click="$store.commit('conversations/SET_OVERLAY', !conversations.overlay)">
                    Zamknij
                </v-btn>
            </v-col>
        </v-row>
    </v-overlay>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
    name: 'Conversations',
    components: {
        Stranger: () => import("~/components/Stranger")
    },
    computed: {
        ...mapState(["conversations"]),
    },
}
</script>

