<template>
    <div class="px-2 py-1">
        <div class="d-flex flex-row">
            <v-sheet class="message rounded-xl px-3 py-3 black--text" color="alien">
                <v-skeleton-loader type="text" width="50" light></v-skeleton-loader>
            </v-sheet>
        </div>
    </div>
</template>

<script>

export default {
  name: "Typing"
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