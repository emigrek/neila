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
            <div id="messages" style="overflow-y: scroll;margin-top: auto; width: 100%;height: 400px;max-height: 400px;">
                <div style="display: flex;flex-flow: column nowrap;padding-top: 10px;">
                    <div v-for="(item, index) in storage.messages" :key="item.id">
                        <div class="my-3" v-if="!item.author">
                            <div class="subtitle-1 text-center grey--text">
                                {{ item.content }}
                            </div>
                        </div>
                        <Message v-else :last="storage.messages[index-1]" :content="item.content" :author="item.author" :me="item.author == socket.id" :created="item.created"/>
                    </div>
                    <Typing v-if="typing"/>
                </div>
            </div>
        </v-sheet>
        <v-sheet class="inputs px-2" rounded>
            
            <transition name="slide-up" mode="in-out">
                <v-text-field
                    :style="{ opacity: `${typing ? '0.9' : '0.2'}` }"
                    v-model="strangerMessage"
                    class="my-2"
                    filled
                    rounded
                    append-outer-icon=":)"
                    background-color="grey darken-3"
                    readonly="readonly"
                    color="alien"
                    no-details
                    v-if="storage.stranger"
                    hide-details
                ></v-text-field>
            </transition>
            <div class="human">
                <v-text-field
                    v-model="message"
                    placeholder="Napisz coś..."
                    filled
                    rounded
                    append-outer-icon="mdi-send"
                    @click:append-outer="send"
                    background-color="grey darken-3"
                    v-on:keyup.enter="send"
                    color="light-blue lighten-1"
                    @keyup="type"
                    no-details
                    hide-details
                ></v-text-field>
            </div>
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
        Message: () => import("~/components/Message"),
        Typing: () => import("~/components/Typing")
    },
    data() {
        return {
            socket: null,
            input: '',
            strangerMessage: '',
            typing: false,
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

            this.resetStranger();
        },
        async type() {
            if(this.storage.room) {
                this.socket.emit('typing', { input: this.input, typing: this.input.length > 0 });
            }
        },
        scrollToEnd() {
            const element = document.getElementById('messages');
            element.scrollTop = element.scrollHeight;
        },
        resetStranger() {
            this.strangerMessage = '';
            this.typing = false;
        }
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
            this.resetStranger();
        });

        this.socket.on('message', (data) => {
            this.$store.commit('storage/ADD_MESSAGE', data);
        });

        this.socket.on('typing', ({ input, typing }) => {
            this.typing = typing;
            this.strangerMessage = input;
        });
    },
    watch: {
        'storage.messages.length': function() {
            setTimeout(() => this.scrollToEnd(), 50);
        },
        'typing': function() {
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