<template>
    <div class="px-2 py-1">
        <div :class="{ 'd-flex flex-row-reverse': me, 'd-flex flex-row': !me }">
            <v-tooltip
                :left="me"
                :right="!me"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-sheet class="message rounded-xl px-3 py-3" v-bind="attrs" v-on="on" :color="me ? 'grey darken-3' : 'alien'" :class="{ 'black--text': !me }">
                    {{content}}
                </v-sheet>
            </template>
                <span>{{ formatTime(created) }}</span>
            </v-tooltip>
        </div>
    </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Message",
  props: ["content", "created", "me"],
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
