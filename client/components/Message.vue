<template>
    <v-sheet class="message px-4 py-3 grey--text text--lighten-2" :style="{ 
        borderLeft: `5px solid ${(!me) ? 'rgb(121, 219, 117)' : '#28B6F7'}` ,
        marginTop: `${(last && last.author == author) ? '0px': '1rem'}`
    }">
        {{content}}
    </v-sheet>
</template>

<script>
import moment from "moment";

export default {
  name: "Message",
  props: ["last", "content", "created", "me", "author"],
  methods: {
    formatTime(created) {
        return moment(created).fromNow()
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
}
</style>
