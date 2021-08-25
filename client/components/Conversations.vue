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
            <p class="display-1 font-weight-bold">Odkryci 🔭</p>
        </div>
        <v-row align="center" justify="center">
            <v-col cols="12" class="text-center">
                <v-btn @click="clear" color="black" depressed :disabled="!conversations.all.length">
                    Wyczyść 🗑
                </v-btn>
            </v-col>
        </v-row>
        <v-row class="my-5" align="center" justify="center">
            <v-col lg="12" md="12" sm="12" cols="10">
                <div class="d-flex flex-column align-center justify-center elevation-5">
                    <v-banner min-width="400" class="grey darken-4" :value="selected && selected.length > 0" dark>
                        <div class="d-flex align-center">
                            <span class="grey--text caption">Zaznaczono {{selected ? selected.length : 0}}</span>
                            <v-btn
                                class="ms-auto"
                                text
                                color="red"
                                @click="removeSelected"
                            >
                                Usuń wybrane
                            </v-btn>
                        </div>
                    </v-banner>
                    <v-list min-width="400" v-if="conversations.all.length" class="overflow-y-auto" two-line style="max-height: 400px;">
                        <v-list-item-group
                            v-model="selected"
                            active-class="alien--text"
                            multiple
                        >
                            <template v-for="(item) in conversations.all">
                                <v-list-item :key="item.room.id">
                                    <template v-slot:default="{ active }">
                                        <v-list-item-avatar>
                                            <v-avatar
                                                class="display-1 elevation-1 grey darken-4"
                                                size="64"
                                            >
                                                {{ item.stranger.emoji }}
                                            </v-avatar> 
                                        </v-list-item-avatar>
                                        
                                        <v-list-item-content>
                                            <v-list-item-title v-text="item.stranger.motto"></v-list-item-title>

                                            <v-list-item-subtitle
                                                class="text--grey"
                                                v-text="item.stranger.region"
                                            ></v-list-item-subtitle>
                                        </v-list-item-content>

                                        <v-list-item-action>
                                            <v-list-item-action-text v-if="active && selected.length < 2">
                                                <v-btn @click="
                                                    selected = [];
                                                    $store.commit('app/SET_MESSAGES', item.messages);
                                                    $store.commit('app/SET_STRANGER', item.stranger);
                                                    $store.commit('conversations/SET_OVERLAY', !conversations.overlay);
                                                    $toast('Wiadomości zostały przeniesione! 👊');
                                                " small text depressed>Pokaż 👀</v-btn>
                                            </v-list-item-action-text>
                                            <v-list-item-action-text v-text="formatDate(item.room.created)"></v-list-item-action-text>
                                        </v-list-item-action>
                                    </template>
                                </v-list-item>
                            </template>
                        </v-list-item-group>
                    </v-list>
                    <div class="grey--text pa-4 grey darken-4 text-center" style="min-width: 400px;" v-else>
                        Wyszukaj pierwszego obcego 😢
                    </div>
                </div>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col cols="12" class="text-center">
                <v-btn x-large rounded no-details @click="$store.commit('conversations/SET_OVERLAY', !conversations.overlay);">
                    Zamknij
                </v-btn>
            </v-col>
        </v-row>
        <div class="text-center grey--text text--darken-2 mt-5">
            <p class="caption">
                Obcy zostaje zapisany gdy rozmowa przekroczy 50 wiadomości. 🤫
            </p>
        </div>
    </v-overlay>
</template>

<script>
import moment from "moment";
import { mapState, mapMutations } from "vuex";

export default {
    name: 'Conversations',
    data() {
        return {
            selected: []
        };
    },
    methods: {
        formatDate(created) {
            return moment(created).fromNow();
        },
        async clear() {
            const res = await this.$dialog.confirm({
                text: 'Na pewno chcesz usunąć wszystkich obcych?',
                title: 'Stój! 😧',
                actions: {
                    false: "Nie",
                    true: "Tak, usuwam"
                }
            })
            
            if(!res) return;

            this.$store.commit("conversations/CLEAR");
            this.$toast('Usunięto wszystkich poprzednich obcych 😎');
        },
        removeSelected() {
            this.$store.commit("conversations/REMOVE", this.selected);
            this.$toast('Usunięto wybranych obcych 😎');
            this.selected = [];
        }
    },
    components: {
        Stranger: () => import("~/components/Stranger")
    },
    computed: {
        ...mapState(["conversations"]),
    },
}
</script>

