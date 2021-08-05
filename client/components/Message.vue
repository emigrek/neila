<template>
    <div class="px-2 py-1">
        <div :class="{ 'd-flex flex-row-reverse': me }">
            <v-tooltip
                :left="me"
                :right="!me"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-chip
                    class="message"
                    v-bind="attrs"
                    v-on="on"
                    large
                    :color="me ? '' : 'alien'"
                    :class="{ 'black--text': !me }"
                >
                    {{ content }}
                </v-chip>
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
