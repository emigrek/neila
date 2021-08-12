<template>
    <v-sheet color="#121212">
        <Header/>
        <Navigation/>
        <Messages/>
        <Input/>
    </v-sheet>
</template>

<script>
import moment from "moment";

export default {
    name: "Chat",
    components: {
        Header: () => import("~/components/Header"),
        Navigation: () => import("~/components/Navigation"),
        Messages: () => import("~/components/Messages"),
        Input: () => import("~/components/Input"),
    },
    mounted() {
        moment.locale('pl');
        this.$root.socket = this.$nuxtSocket({});
        this.$store.commit("sound/INITIALIZE");
    }
}
</script>