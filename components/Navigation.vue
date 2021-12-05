<template>
    <v-sheet color="black" class="navigation d-flex justify-center align-center py-1 mb-3" elevation="18" rounded>
        <v-btn
            depressed
            text
            color="error"
            v-if="app.room !== null"
            @click="disconnect"
        >
            Rozłącz się 🤝
        </v-btn>
        <v-btn
            depressed
            text
            color="red"
            v-if="app.searching == true"
            @click="stopSearching"
        >
            Przestań szukać
        </v-btn>
        <v-btn
            depressed
            text
            color="alien"
            v-if="app.room == null && app.searching == false"
            :disabled="cooldown"
            @click="search"
        >
            Szukaj 🕵️‍♂️
        </v-btn>
        <v-btn
            depressed
            text
            color="info"
            @click="$store.commit('page/SET_HEADER', !page.header)"
        >
            Tryb mobilny 📱
        </v-btn>
    </v-sheet>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import { nanoid } from "nanoid";

export default {
    name: "Navigation",
    data() {
        return {
            cooldown: false
        }
    },
    methods: {
        async search() {
            if(this.cooldown) return this.$toast("Odczekaj chwilę przed następną rozmową. 🤐");

            this.$store.commit('app/SET_STRANGER', null);
            this.$store.commit('app/CLEAR_MESSAGES');
            this.$store.commit('app/ADD_MESSAGE', {
                id: nanoid(),
                created: moment().format(),
                content: "Nawiązywanie połączenia... 🔭"
            });

            this.$root.socket.emit('queue up', this.app.user);
            this.$store.commit('app/SET_SEARCHING', true);

            this.cooldown = true;
            setTimeout(() => {
                this.cooldown = false;
            }, 5*1000);
        },
        async stopSearching() {
            this.$store.commit('app/SET_STRANGER', null);
            this.$store.commit('app/CLEAR_MESSAGES');

            this.$root.socket.emit('queue down');
            this.$store.commit('app/SET_SEARCHING', false);
        },
        async disconnect() {
            const res = await this.$dialog.confirm({
                text: 'Na pewno chcesz się rozłączyć?',
                title: 'Stój! 😧',
                actions: {
                    false: "Nie, rozmawiam dalej",
                    true: "Rozłączam się"
                }
            })
            
            if(!res) return;

            this.$store.commit('app/ADD_MESSAGE', {
                id: nanoid(),
                created: moment().format(),
                content: "Rozłączyłeś się. 🤫"
            });

            if(this.app.messages.length >= 50)
                this.$store.commit('conversations/ADD', {
                    room: this.app.room,
                    stranger: this.app.stranger,
                    messages: this.app.messages
                });
            

            this.$root.socket.emit("leave");

            this.$store.commit('app/SET_STRANGER', null);
            this.$store.commit('app/SET_ROOM', null);
        }
    },
    computed: {
        ...mapState(["app"]),
        ...mapState(["page"])
    }
}
</script>

<style scoped>
.emoji-icon {
    font-style: normal;
}
</style>