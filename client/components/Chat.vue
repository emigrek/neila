<template>
    <v-sheet color="#121212">
        <v-slide-y-transition leave-absolute>
            <Header v-if="page.header"/>
            <Stranger v-else/>
        </v-slide-y-transition>
        <v-slide-y-transition leave-absolute>
            <Navigation/>
        </v-slide-y-transition>
        <v-scale-transition leave-absolute>
            <Messages/>
        </v-scale-transition>
        <v-scale-transition leave-absolute>
            <Input/>
        </v-scale-transition>
    </v-sheet>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";

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
    },
    computed: {
        ...mapState(["page"])
    }
}
</script>