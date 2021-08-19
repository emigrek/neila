<template>
    <div class="d-flex justify-center mb-2">
        <div class="d-flex justify-center align-center">
            <div class="d-flex justify-center grey darken-4 align-center pa-3 rounded-lg">
                <div class="mb-1 mx-2">
                    <v-avatar
                        class="display-1 elevation-1"
                        size="64"
                    >
                    
                        {{ emoji }}
                    </v-avatar> 
                </div>
                <div class="mb-1 mx-2">
                    <div class="text-center grey--text text--darken-2 mb-1 font-weight-bold">
                        Motto
                    </div>
                    <div class="mx-2 px-3 py-2 elevation-1 rounded-lg grey darken-4 grey--text text--darken-2" style="word-wrap: break-word;word-break: break-word;">
                        {{ (motto) ? motto : 'Brak'}}
                    </div> 
                </div>
                <div class="mb-1 mx-2">
                    <div class="text-center grey--text text--darken-2 mb-1 font-weight-bold">
                        Region
                    </div>
                    <div class="mx-2 px-3 py-2 elevation-1 rounded-lg grey darken-4 grey--text text--darken-2">
                        {{ (region) ? region : ''}}
                    </div> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Stranger",
    props: ["emoji", "motto", "region", "created"]
};
</script>