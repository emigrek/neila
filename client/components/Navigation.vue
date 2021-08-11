<template>
    <v-sheet color="black" class="navigation d-flex justify-center align-center py-1 my-2 rounded-lg">
        <v-btn
            depressed
            small
            text
            color="error"
            v-if="app.room !== null"
            @click="disconnect"
        >
            Rozłącz się 🤝
        </v-btn>
        <v-btn
            depressed
            small
            text
            color="alien"
            v-if="app.searching == true"
            @click="stopSearching"
        >
            Przestań szukać
        </v-btn>
        <v-btn
            depressed
            small
            text
            color="alien"
            v-if="app.room == null && app.searching == false"
            @click="search"
        >
            Szukaj 🕵️‍♂️
        </v-btn>
    </v-sheet>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import { nanoid } from "nanoid";

export default {
    name: "Navigation",
    methods: {
        async search() {
            this.$store.commit('app/SET_STRANGER', null);
            this.$store.commit('app/CLEAR_MESSAGES');
            this.$store.commit('app/ADD_MESSAGE', {
                id: nanoid(),
                created: moment().format(),
                content: "Nawiązywanie połączenia... 🔭"
            });

            this.$root.socket.emit('queue up', this.app.user);
            this.$store.commit('app/SET_SEARCHING', true);
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

            this.$root.socket.emit("leave");
            this.$store.commit('app/SET_STRANGER', null);
            this.$store.commit('app/SET_ROOM', null);

            this.$store.commit('app/ADD_MESSAGE', {
                id: nanoid(),
                created: moment().format(),
                content: "Rozłączyłeś się. 🤫"
            });
        }
    },
    mounted() {
    },
    computed: {
        ...mapState(["app"])
    }
}
</script>

<style scoped>
.emoji-icon {
    font-style: normal;
}
</style>