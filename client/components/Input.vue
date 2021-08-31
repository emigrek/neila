<template>
    <v-sheet class="inputs pa-3 rounded" elevation="12">
        <div class="d-flex justify-center align-center">
            <v-text-field
                v-model.trim="message"
                placeholder="Napisz coś..."
                filled
                rounded
                background-color="grey darken-3"
                v-on:keyup.enter="send"
                color="light-blue lighten-1"
                @keyup="type"
                no-details
                class="elevation-1"
                hide-details
            ></v-text-field>
            <v-btn
                class="ms-3 black--text elevation-1"
                color="alien"
                rounded
                @click="send"
                :disabled="!message.length || !app.room"
                large
                pill
            >
                Wyślij
            </v-btn>
        </div>
    </v-sheet>
</template>

<script>
import { mapState } from "vuex";
import { nanoid } from "nanoid";
import moment from "moment";

export default {
    name: "Input",
    transition: 'fade',
    data() {
        return {
            input: '',
            cooldown: false
        };
    },
    methods: {
        async send() {
            if(this.cooldown) return;
            if(this.app.room == null) return;
            if(!this.message.length || !this.message) return;

            this.cooldown = true;
            setTimeout(() => {
                this.cooldown = false;
            }, 500);

            var data = {
                id: nanoid(),
                created: moment().format(),
                author: this.$root.socket.id,
                content: this.message
            };

            this.$root.socket.emit('message', data);
            this.$store.commit('app/ADD_MESSAGE', data);

            this.message = '';
            this.type();

            if(this.app.messages.length == 50) {
                this.$store.commit('app/ADD_MESSAGE', {
                    id: nanoid(),
                    created: moment().format(),
                    content: `Jest to wasza 50 wiadomość, będziecie mogli wrócić do tej rozmowy później!`
                });
            }
        },
        async type() {
            if(this.app.room) {
                this.$root.socket.emit('typing', { typing: this.input.length > 0 });
            }
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
}
</script>