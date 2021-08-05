<template>
    <v-sheet elevation="10" class="pa-6 rounded-lg">
        <v-sheet class="title pa-3 d-flex" color="alien" elevation="1" rounded>
            <div class="title black--text">Czat 💬</div>
            <div class="ml-auto">
                <v-btn color="black" depressed @click="$store.commit('storage/SET_OVERLAY', !storage.overlay)">
                    <v-icon>
                        mdi-cog
                    </v-icon>
                </v-btn>
                <v-btn
                    depressed
                    color="error"
                    v-if="storage.room !== null"
                    @click="disconnect"
                >
                    Rozłącz się
                </v-btn>
                <v-btn
                    depressed
                    color="primary"
                    v-if="storage.searching == true"
                    @click="stopSearching"
                >
                    Przestań szukać
                </v-btn>
                <v-btn
                    depressed
                    color="primary"
                    v-if="storage.room == null && storage.searching == false"
                    @click="search"
                >
                    Szukaj
                </v-btn>
            </div>
        </v-sheet>
        <v-sheet class="box pb-3" rounded>
            <v-banner
                :value="storage.stranger && (storage.stranger) ? storage.stranger.motto.length : false"
            > 
                <div class="motto px-3 py-2 rounded-lg grey darken-4 grey--text">
                    {{ (storage.stranger) ? storage.stranger.motto : ''}}
                </div>
            </v-banner>
            <div id="messages" style="height: 500px;overflow-y: scroll;">
                <div v-for="item in storage.messages" :key="item.id">
                    <div class="my-3" v-if="!item.author">
                        <div class="subtitle-1 text-center grey--text">
                            {{ item.content }}
                        </div>
                    </div>
                    <Message v-else :content="item.content" :me="item.author == socket.id" :created="item.created"/>
                </div>
            </div>
        </v-sheet>
        <v-sheet class="inputs px-2" rounded>
            <v-text-field
                v-model="message"
                placeholder="Napisz coś..."
                filled
                rounded
                append-outer-icon="mdi-send"
                @click:append-outer="send"
                clearable
                background-color="grey darken-3"
                v-on:keyup.enter="send"
                color="alien"
                no-details
                hide-details
            ></v-text-field>
        </v-sheet>
    </v-sheet>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { nanoid } from "nanoid";
import moment from "moment";

export default {
    name: "Chat",
    components: {
        Message: () => import("~/components/Message")
    },
    data() {
        return {
            socket: null,
            input: ''
        };
    },
    methods: {
        async send() {
            if(this.storage.room == null) return;

            var data = {
                id: nanoid(),
                created: moment().format(),
                author: this.socket.id,
                content: this.message
            };

            this.socket.emit('message', data);

            this.$store.commit('storage/ADD_MESSAGE', data);

            this.message = '';
        },
        async search() {
            this.$store.commit('storage/SET_STRANGER', null);
            this.$store.commit('storage/CLEAR_MESSAGES');
            this.$store.commit('storage/ADD_MESSAGE', {
                id: nanoid(),
                created: moment().format(),
                content: "Nawiązywanie połączenia... 🔭"
            });

            this.socket.emit('queue up', this.storage.user);
            this.$store.commit('storage/SET_SEARCHING', true);
        },
        async stopSearching() {
            this.$store.commit('storage/SET_STRANGER', null);
            this.$store.commit('storage/CLEAR_MESSAGES');

            this.socket.emit('queue down');
            this.$store.commit('storage/SET_SEARCHING', false);
        },
        async disconnect() {
            const res = await this.$dialog.confirm({
                text: 'Na pewno chcesz się rozłączyć?',
                title: 'Stój! 😧',
                actions: ['Nie, zostaję', 'Tak']
            })

            if(!res) return;

            this.socket.emit("leave");
            this.$store.commit('storage/SET_ROOM', null);

            this.$store.commit('storage/ADD_MESSAGE', {
                id: nanoid(),
                created: moment().format(),
                content: "Rozłączyłeś się. 🤫"
            });
        },
        scrollToEnd() {
            const element = document.getElementById('messages');
            element.scrollTop = element.scrollHeight;
        },
    },
    mounted() {
        moment.locale('pl');
        this.socket = this.$nuxtSocket({});

        this.socket.on('connection established', (room) => {
            this.$store.commit('storage/CLEAR_MESSAGES');

            this.$store.commit('storage/ADD_MESSAGE', {
                id: nanoid(),
                created: moment().format(),
                content: `Nawiązano łączność, przywitaj się! 👋`
            });
            
            this.$store.commit('storage/SET_STRANGER', room.user);
            this.$store.commit('storage/SET_ROOM', room);
            this.$store.commit('storage/SET_SEARCHING', false);
        });

        this.socket.on('connection end', () => {
            this.$store.commit('storage/ADD_MESSAGE', {
                id: nanoid(),
                created: moment().format(),
                content: `Utracono połączenie. 😥`
            });

            this.$store.commit('storage/SET_ROOM', null);
        });

        this.socket.on('message', (data) => {
            this.$store.commit('storage/ADD_MESSAGE', data);
        });
    },
    watch: {
        'storage.messages.length': function() {
            setTimeout(() => this.scrollToEnd(), 50);
        }
    },
    computed: {
        message: {
            set(val) {
                if(!val) return this.input = '';
                this.input = val.trim();
            },
            get() {
                return this.input;
            }
        },
        ...mapState(["storage"]),
    },
}
</script>

<style scoped>
.message {
    line-height: 1.3333;
    min-width: 0;
    max-width: 36rem;
    word-wrap: break-word;
    word-break: break-word;
    white-space: pre-line;
    overflow-y: hidden;
    overflow-x: hidden;
    padding: .5rem;
}
</style>