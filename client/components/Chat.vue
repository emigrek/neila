<template>
    <v-sheet elevation="5" class="pa-6">
        <v-sheet class="title pa-3 mb-2 d-flex" color="alien" elevation="1" rounded>
            <div class="title black--text">Czat 💬</div>
            <div class="ml-auto">
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
                    v-if="storage.room == null && storage.searching == false"
                    @click="connect"
                >
                    Połącz się
                </v-btn>
            </div>
        </v-sheet>
        <v-sheet class="box pa-3" rounded>
            <div id="messages" style="height: 500px;overflow-y: scroll;">
                <div class="pa-2" v-for="item in storage.messages" :key="item.id">
                    <div v-if="!item.author">
                        <div class="subtitle-1 text-center grey--text">
                            {{ item.content }}
                        </div>
                    </div>
                    <div v-else :class="{ 'd-flex flex-row-reverse': item.author == socket.id}">
                        <v-tooltip :left="item.author == socket.id" :right="item.author != socket.id">
                            <template v-slot:activator="{ on, attrs }">
                                <v-chip v-bind="attrs" v-on="on" large :color="(item.author == socket.id) ? '' : 'alien'" :class="{ 'black--text': item.author != socket.id }">
                                    {{ item.content }}
                                </v-chip>
                            </template>
                            <span>{{ formatTime(item.created) }}</span>
                        </v-tooltip>
                    </div>
                </div>
            </div>
        </v-sheet>
        <v-sheet class="inputs px-2" rounded>
            <v-text-field
                v-model="message"
                placeholder="Napisz coś..."
                solo
                append-outer-icon="mdi-send"
                @click:append-outer="send"
                clearable
                background-color="grey darken-3"
                v-on:keyup.enter="send"
                color="alien"
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
        async connect() {
            this.$store.commit('storage/CLEAR_MESSAGES');
            this.$store.commit('storage/ADD_MESSAGE', {
                id: nanoid(),
                created: moment().format(),
                content: "Nawiązywanie połączenia 🔭"
            });

            this.socket.emit('queueUp', {});
            this.$store.commit('storage/SET_SEARCHING', true);
        },
        async disconnect() {
            this.socket.emit("leave");
            this.$store.commit('storage/SET_ROOM', null);
            this.$store.commit('storage/CLEAR_MESSAGES');
        },
        scrollToEnd() {
            const element = document.getElementById('messages');
            element.scrollTop = element.scrollHeight;
        },
        formatTime(created) {
            return moment(created).format("HH:mm:ss")
        }
    },
    mounted() {
        this.socket = this.$nuxtSocket({});

        this.socket.on('connection established', (room) => {
            this.$store.commit('storage/CLEAR_MESSAGES');

            this.$store.commit('storage/ADD_MESSAGE', {
                id: nanoid(),
                created: moment().format(),
                content: `Nawiązano łączność, przywitaj się!`
            });

            this.$store.commit('storage/SET_ROOM', room);
            this.$store.commit('storage/SET_SEARCHING', false);
        });

        this.socket.on('connection end', () => {
            this.$store.commit('storage/ADD_MESSAGE', {
                id: nanoid(),
                created: moment().format(),
                content: `Utracono połączenie`
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
