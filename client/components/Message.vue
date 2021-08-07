<template>
    <v-hover v-slot="{ hover }">
        <v-sheet class="message px-4 py-2 grey--text text--lighten-2" :style="{ 
            borderLeft: `2px solid ${(!me) ? 'rgb(121, 219, 117)' : '#28B6F7'}` ,
            marginTop: `${(last && last.author == author) ? '0px': '0.8rem'}`
        }">
            {{content}}
            <transition name="fade" mode="out-in">
                <span v-if="hover" class="created grey--text text--darken-2">• {{formatTime(created)}}</span>
            </transition>
        </v-sheet>
    </v-hover>
</template>

<script>
import moment from "moment";

export default {
  name: "Message",
  props: ["last", "content", "created", "me", "author"],
  methods: {
    formatTime(created) {
        return moment(created).format('HH:mm')
    }
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
