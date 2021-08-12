<template>
    <v-overlay
        opacity="0.95"
        absolute
        :value="app.overlay"
        dark
        color="alien"
        class="black--text"
    >
        <div class="text-center">
            <p class="display-1 font-weight-bold">Hej, ty! ✋</p>
            <p class="subtitle-1">Zdradź coś o sobię...</p>
        </div>
        <v-row align="center" justify="center">
            <v-col xl="5" md="5" cols="4">
                <v-slide-group
                    v-model="emoji"
                    class="pa-4"
                    active-class="black"
                    show-arrows
                    mandatory
                    light
                    center-active
                >
                    <v-slide-item :value="emoji" v-for="emoji in emojis" :key="emoji" v-slot="{ active, toggle }">
                        <v-card
                            :color="active ? undefined : 'alien'"
                            class="ma-1 px-1 py-2 display-2 elevation-0"
                            @click="toggle"
                        >
                            {{emoji}}
                        </v-card>
                    </v-slide-item>
                </v-slide-group>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col xl="4" md="4" cols="3">
                <v-textarea
                    :rules="mottoRules"
                    filled
                    color="alien"
                    v-model="motto"
                    rounded
                    light
                    rows="1"
                    auto-grow
                    counter
                ></v-textarea>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col xl="4" md="4" cols="3">
                <v-select
                    :items="regions"
                    label="Region wyszukiwania"
                    v-model="region"
                    placeholder="Region"
                    color="alien"
                    light
                    filled
                    rounded
                >
                </v-select>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col cols="5" class="text-center">
                <v-btn depressed x-large rounded no-details @click="apply">
                    Gotowe 👌
                </v-btn>
            </v-col>
        </v-row>
        <v-divider class="my-5" inset light/>
        <div class="text-center grey--text text--darken-2">
            <p class="caption">
                Klikając przycisk potwierdzasz że posiadasz 18 lat, lub 13 za zgodą rodzica.<br/>
                Po wyjściu ze strony, wszystkie twoje informacje zostają usunięte.
            </p>
        </div>
    </v-overlay>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
    name: 'Overlay',
    data() {
        return {
            motto: '',
            mottoRules: [v => (v || '').length <= 50 || 'Maksymalnie 50 znaków'],
            region: 'Polska',
            emoji: '👦',
            emojis: [
                '👦', '🧑', '👱', '👨', '🧔',
                '👨‍🦰', '👨‍🦱', '👨‍🦳',
                '👨‍🦲', '👧', '👩', '👩‍🦰', '👩‍🦱', '👩‍🦳', '👩‍🦲', '👱‍♀️'
            ],
            regions: [
                'Polska', 'poza Polską', 'Dolnośląskie', 
                'Kujawsko-pomorskie', 'Lubelskie', 'Lubuskie', 
                'Łódzkie', 'Małopolskie', 'Mazowieckie',
                'Opolskie', 'Podkarpackie', 'Podlaskie',
                'Pomorskie', 'Śląskie', 'Świętokrzyskie',
                'Warmińsko-mazurskie', 'Wielkopolskie', 'Zachodniopomorskie'
            ],
        };
    },
    methods: {
        apply() {
            if(this.motto.length >= 50) return;
            if(!this.regions.includes(this.region)) return;

            var user = {
                motto: this.motto,
                region: this.region,
                emoji: this.emoji
            };

            this.$store.commit("app/SET_USER", user);
            this.$store.commit("app/SET_OVERLAY", false);
        }
    },
    computed: {
        ...mapState(["app"]),
    },
}
</script>

