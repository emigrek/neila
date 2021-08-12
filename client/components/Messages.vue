<template>
    <v-sheet class="box pa-4 rounded-lg mb-3" elevation="12">
        <v-banner
            light
            rounded
            :value="app.stranger && (app.stranger) ? (app.stranger.motto.length > 0) : false"
        >
            <div class="d-flex justify-center align-center">
                <div class="mb-1 mx-2">
                    <v-avatar
                        color="grey darken-4"
                        class="display-1 elevation-1"
                        size="64"
                    >{{ (app.stranger) ? app.stranger.emoji : ''}}</v-avatar>
                </div>
                <div class="mb-1 mx-2">
                    <div class="text-center grey--text text--darken-3 mb-1">
                        Motto
                    </div>
                    <div class="mx-2 px-3 py-2 elevation-1 rounded-lg grey darken-4 grey--text text--darken-2" style="word-wrap: break-word;word-break: break-word;">
                        {{ (app.stranger) ? app.stranger.motto : ''}}
                    </div> 
                </div>
                <div class="mb-1 mx-2">
                    <div class="text-center grey--text text--darken-3 mb-1">
                        Region
                    </div>
                    <div class="mx-2 px-3 py-2 elevation-1 rounded-lg grey darken-4 grey--text text--darken-2">
                        {{ (app.stranger) ? app.stranger.region : ''}}
                    </div> 
                </div>
            </div>
        </v-banner>
        <div id="messages" style="overflow-y: scroll;margin-top: auto; width: 100%;height: 400px;max-height: 400px;">
            <div style="display: flex;flex-flow: column nowrap;padding-top: 10px;">
                <transition-group name="slide-fade">
                    <div v-for="(item, index) in app.messages" :key="item.id">
                        <div class="my-3" v-if="!item.author">
                            <div class="caption text-center grey--text">
                                {{ item.content }}
                            </div>
                        </div>
                        <Message v-else :last="app.messages[index-1]" :content="item.content" :author="item.author" :me="item.author == $root.socket.id" :created="item.created"/>
                    </div>
                </transition-group>
                <transition name="slide-fade">
                    <Typing v-if="typing" :lastFromStranger="app.messages[app.messages.length-1].author != $root.socket.id"/>
                </transition>
            </div>
        </div>
    </v-sheet>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import { nanoid } from "nanoid";
import notification from "@/assets/sounds/inyourplate.mp3";

export default {
    name: "Messages",
    transition: 'fade',
    components: {
        Message: () => import("~/components/Message"),
        Typing: () => import("~/components/Typing"),
    },
    data() {
        return {
            input: '',
            typing: false,
            audio: {
                notification: null
            },
            unseenMessages: 0
        }
    },
    methods: {
        async type() {
            if(this.app.room) {
                this.$root.socket.emit('typing', { typing: this.input.length > 0 });
            }
        },
        scrollToEnd() {
            const element = document.getElementById('messages');
            element.scrollTop = element.scrollHeight;
        }
    },
    mounted() {
        this.$root.socket.on('connection established', (room) => {
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

        this.$root.socket.on('connection end', () => {
            this.$store.commit('app/ADD_MESSAGE', {
                id: nanoid(),
                created: moment().format(),
                content: `Utracono połączenie. 😥`
            });

            this.$store.commit('app/SET_ROOM', null);
            this.$store.commit('app/SET_STRANGER', null);
        });

        this.$root.socket.on('message', (data) => {
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

        this.$root.socket.on('typing', ({ typing }) => {
            this.typing = typing;
        });
    },
    watch: {
        'app.messages.length': function() {
            setTimeout(() => this.scrollToEnd(), 30);
        },
        'typing': function() {
            setTimeout(() => this.scrollToEnd(), 30);
        },
        'page.visible': function() {
            if(this.page.visible) {
                this.$store.commit("page/SET_TITLE", "nelia");
                this.unseenMessages = 0;
            }
        }
    },
    computed: {
        ...mapState(["app"]),
        ...mapState(["page"]),
        ...mapState(["sound"])
    }
}
</script>

<style>
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