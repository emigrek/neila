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
            <v-virtual-scroll
                height="500"
                :items="storage.messages"
                :item-height="64"
            >
                <v-list-item v-if="!socket">
                    <v-list-item-content>
                        <v-list-item-title>Łączenie z serwerem...</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <template v-slot:default="{ item }">
                    <v-list-item :key="item.id" dark>
                        <v-list-item-content>
                            <v-list-item-title>{{(item.author) ? ((item.author == socket.id) ? "Ty" : "👽") : ''}}</v-list-item-title>
                            <v-list-item-subtitle>{{item.content}}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-virtual-scroll>
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
    },
    mounted() {
        this.socket = this.$nuxtSocket({});

        this.socket.on('connection established', (room) => {
            this.$store.commit('storage/CLEAR_MESSAGES');

            this.$store.commit('storage/ADD_MESSAGE', {
                id: nanoid(),
                created: moment().format(),
                content: `Nawiązano łączność, przywitaj się! (#${room.name})`
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
