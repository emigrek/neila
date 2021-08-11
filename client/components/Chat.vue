<template>
    <v-sheet elevation="10" class="pa-6 rounded-lg">
        <v-sheet class="title pa-3 d-flex justify-center align-center" color="alien" elevation="1" rounded>
            <div class="title black--text font-weight-bold">nelia 👽</div>
            <div class="caption red--text text--darken-2 ms-1">• <span class="font-weight-bold">{{active}}</span></div>
            <div class="ml-auto">
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
                <v-btn text color="black" depressed @click="$store.commit('app/SET_OVERLAY', !app.overlay)">
                    <v-icon class="emoji-icon">
                        ⚙️
                    </v-icon>
                </v-btn>
            </div>
        </v-sheet>
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
        <v-sheet class="box pb-3" rounded>
            <v-banner
                :value="app.stranger && (app.stranger) ? (app.stranger.motto.length > 0) : false"
            > 
                <div class="motto px-3 py-2 rounded-lg grey darken-4 grey--text">
                    {{ (app.stranger) ? app.stranger.motto : ''}}
                </div>
            </v-banner>
            <div id="messages" style="overflow-y: scroll;margin-top: auto; width: 100%;height: 400px;max-height: 400px;">
                <div style="display: flex;flex-flow: column nowrap;padding-top: 10px;">
                    <transition-group name="slide-fade">
                        <div v-for="(item, index) in app.messages" :key="item.id">
                            <div class="my-3" v-if="!item.author">
                                <div class="subtitle-1 text-center grey--text">
                                    {{ item.content }}
                                </div>
                            </div>
                            <Message v-else :last="app.messages[index-1]" :content="item.content" :author="item.author" :me="item.author == socket.id" :created="item.created"/>
                        </div>
                    </transition-group>
                    <transition name="slide-fade">
                        <Typing v-if="typing" :lastFromStranger="app.messages[app.messages.length-1].author != socket.id"/>
                    </transition>
                </div>
            </div>
        </v-sheet>
        <v-sheet class="inputs px-2" rounded>
            <div class="d-flex justify-center align-center">
                <v-text-field
                    v-model="message"
                    placeholder="Napisz coś..."
                    filled
                    rounded
                    background-color="grey darken-3"
                    v-on:keyup.enter="send"
                    color="light-blue lighten-1"
                    @keyup="type"
                    no-details
                    hide-details
                ></v-text-field>
                <v-btn
                    class="ms-3 black--text"
                    color="alien"
                    rounded
                    @click="send"
                    :disabled="!message.length || !app.room"
                    large
                    pill
                >
                    Wyślij 📡
                </v-btn>
            </div>
        </v-sheet>
    </v-sheet>
</template>

<script>
import { mapState } from "vuex";
import { nanoid } from "nanoid";
import moment from "moment";
import notification from "@/assets/sounds/inyourplate.mp3";

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
            typing: false,
            audio: {
                notification: null
            },
            active: 0,
            unseenMessages: 0
        };
    },
    methods: {
        async send() {
            if(this.app.room == null) return;
            if(!this.message.length || !this.message) return;

            var data = {
                id: nanoid(),
                created: moment().format(),
                author: this.socket.id,
                content: this.message
            };

            this.socket.emit('message', data);

            this.$store.commit('app/ADD_MESSAGE', data);

            this.message = '';

            this.type();
        },
        async search() {
            this.$store.commit('app/SET_STRANGER', null);
            this.$store.commit('app/CLEAR_MESSAGES');
            this.$store.commit('app/ADD_MESSAGE', {
                id: nanoid(),
                created: moment().format(),
                content: "Nawiązywanie połączenia... 🔭"
            });

            this.socket.emit('queue up', this.app.user);
            this.$store.commit('app/SET_SEARCHING', true);
        },
        async stopSearching() {
            this.$store.commit('app/SET_STRANGER', null);
            this.$store.commit('app/CLEAR_MESSAGES');

            this.socket.emit('queue down');
            this.$store.commit('app/SET_SEARCHING', false);
        },
        async disconnect() {
            const res = await this.$dialog.confirm({
                text: 'Na pewno chcesz się rozłączyć?',
                title: 'Stój! 😧',
                actions: ['Nie, zostaję', 'Tak']
            })

            if(!res) return;

            this.socket.emit("leave");
            this.$store.commit('app/SET_STRANGER', null);
            this.$store.commit('app/SET_ROOM', null);

            this.$store.commit('app/ADD_MESSAGE', {
                id: nanoid(),
                created: moment().format(),
                content: "Rozłączyłeś się. 🤫"
            });

            this.typing = false;
        },
        async type() {
            if(this.app.room) {
                this.socket.emit('typing', { typing: this.input.length > 0 });
            }
        },
        scrollToEnd() {
            const element = document.getElementById('messages');
            element.scrollTop = element.scrollHeight;
        }
    },
    mounted() {
        moment.locale('pl');
        this.socket = this.$nuxtSocket({});
        this.$store.commit("sound/INITIALIZE");

        this.socket.on('connection established', (room) => {
            this.$store.commit('app/CLEAR_MESSAGES');

            this.$store.commit('app/ADD_MESSAGE', {
                id: nanoid(),
                created: moment().format(),
                content: `Nawiązano łączność, przywitaj się! 👋`
            });
            
            this.$store.commit('app/SET_STRANGER', room.user);
            this.$store.commit('app/SET_ROOM', room);
            this.$store.commit('app/SET_SEARCHING', false);
        });

        this.socket.on('connection end', () => {
            this.$store.commit('app/ADD_MESSAGE', {
                id: nanoid(),
                created: moment().format(),
                content: `Utracono połączenie. 😥`
            });

            this.$store.commit('app/SET_ROOM', null);
            this.$store.commit('app/SET_STRANGER', null);
            this.resetStranger();
        });

        this.socket.on('message', (data) => {
            if(!this.page.visible) {
                this.unseenMessages++;
                this.$store.commit("page/SET_TITLE", `(${this.unseenMessages} ✉️) nelia`);

                if(this.sound.enabled) {
                    this.audio.notification = new Audio(notification);
                    this.audio.notification.play();
                }
            }
            this.$store.commit('app/ADD_MESSAGE', data);
        });

        this.socket.on('typing', ({ typing }) => {
            this.typing = typing;
        });

        this.socket.on("users length update", (active) => {
            this.active = active;
        });
    },
    watch: {
        'app.messages.length': function() {
            setTimeout(() => this.scrollToEnd(), 30);
        },
        'page.visible': function() {
            if(this.page.visible) {
                this.$store.commit("page/SET_TITLE", "nelia");
                this.unseenMessages = 0;
            }
        },
        'typing': function() {
            setTimeout(() => this.scrollToEnd(), 30);
        }
    },
    computed: {
        message: {
            set(val) {
                if(!val || val.length <= 0) return this.input = '';
                this.input = val.trim();
            },
            get() {
                return this.input;
            }
        },
        ...mapState(["app"]),
        ...mapState(["page"]),
        ...mapState(["sound"]),
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
.emoji-icon {
    font-style: normal;
}
.typing {
    opacity: 0.2;
    -webkit-box-shadow: 0px 15px 30px 0px rgba(121,219,117,0.25); 
    box-shadow: 0px 15px 30px 0px rgba(121,219,117,0.25);
}
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .1s ease;
}
.slide-fade-enter {
  transform: translateY(-5px);
}
.slide-fade-leave-to {
    opacity: 0;
}
</style>