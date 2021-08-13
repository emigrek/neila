<template>
    <div>
        <span class="author overline" v-if="last && last.author != author" :style="{  
            marginTop: `${(last && last.author == author) ? '0px': '0.4rem'}`,
            color: `${(!me) ? 'rgb(121, 219, 117)' : '#28B6F7'}`
        }">
            {{ (me) ? "Ja" : "Obcy" }}
            {{ (me) ? app.user.emoji : app.stranger.emoji }}
        </span>
        <v-hover v-slot="{ hover }">
            <v-sheet class="message px-4 py-2 grey--text text--lighten-3" :style="{ 
                borderLeft: `2px solid ${(!me) ? 'rgb(121, 219, 117)' : '#28B6F7'}`
            }">
                {{content}}
                <transition name="fade" mode="out-in">
                    <span v-if="hover" class="created grey--text text--darken-2">• {{formatTime(created)}}</span>
                </transition>
            </v-sheet>
        </v-hover>
    </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";

export default {
    name: "Message",
    props: ["last", "content", "created", "me", "author"],
    methods: {
        formatTime(created) {
            return moment(created).format('HH:mm')
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
        ...mapState(["app"])
    },
};
</script>

<style scoped>
.message {
    max-width: 30rem;
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
    transition: background 0.5s ease;
}
.created {
    font-size: 0.65rem;
}
.message:hover {
    background: rgb(66,66,66);
    background: linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%); 
}
</style>
