<template>
    <v-sheet class="message px-4 py-3 grey--text text--lighten-4" :style="{ 
        borderLeft: `5px solid rgb(121, 219, 117)`,
        marginTop: `${(lastFromStranger) ? '0px': '1rem'}`
    }">
        <div class="d-flex">
            <v-skeleton-loader class="me-1" width="6px" height="6px" type="text"/>
            <v-skeleton-loader class="me-1" width="6px" height="6px" type="text"/>
            <v-skeleton-loader width="6px" height="6px" type="text"/>
        </div>
    </v-sheet>
</template>

<script>

export default {
  name: "Typing",
  props: ["lastFromStranger"],
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