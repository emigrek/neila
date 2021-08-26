<template>
  <div>
    <span class="author overline" v-if="!lastFromStranger" style="color: rgb(121, 219, 117);" :style="{  
        marginTop: `${(lastFromStranger) ? '0px': '0.8rem'}`
    }">
      Obcy
    </span>
    <v-sheet class="message px-4 py-4 grey--text text--lighten-4" :style="{ 
        borderLeft: `2px solid rgb(121, 219, 117)`,
    }">
        <div class="d-flex align-center">
            <v-skeleton-loader class="type me-1" width="6px" height="6px" type="text"/>
            <v-skeleton-loader class="type me-1" width="6px" height="6px" type="text"/>
            <v-skeleton-loader class="type" width="6px" height="6px" type="text"/>
        </div>
    </v-sheet>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "Typing",
    props: ["lastFromStranger"],
    computed: {
        ...mapState(["app"])
    }
};
</script>

<style scoped>
.message {
    max-width: 30rem;
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
}

.type:nth-child(1) {
    animation-name: typing;
    animation-delay: 0s;
    animation-duration: 2.5s;
    animation-iteration-count: infinite;
}

.type:nth-child(2) {
    animation-name: typing;
    animation-delay: 0.5s;
    animation-duration: 2.5s;
    animation-iteration-count: infinite;
}

.type:nth-child(3) {
    animation-name: typing;
    animation-delay: 1s;
    animation-duration: 2.5s;
    animation-iteration-count: infinite;
}

@keyframes typing {
  0% {
    transform: translateY(0px);
  }
  25% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-2px);
  }
  75% {
    transform: translateY(2px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>