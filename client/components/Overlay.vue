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
                <div style="max-width: 1200px">
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
                                @click="toggle"
                                class="ma-1 px-1 py-2 display-2 rounded-circle"
                            >
                                {{emoji}}
                            </v-card>
                        </v-slide-item>
                    </v-slide-group>
                </div>
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
        <div class="text-center grey--text text--darken-2 mt-5">
            <p class="caption">
                Klikając przycisk potwierdzasz że posiadasz 18 lat, lub 13 za zgodą rodzica.
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
            mottoRules: [v => (v || '').length < 50 || 'Maksymalnie 50 znaków'],
            emojis: [
                '👩', '👨', '🧑', '👧', '👦', '🧒', '👩‍🦰', '👨‍🦰', '👩‍🦱', '👨‍🦱', '👩‍🦲', '👨‍🦲', '👩‍🦳', '👨‍🦳', '👱‍♀️', '👱‍♂️', '👳‍♀️', '👳‍♂️', '🧔',
                '👩🏻', '👨🏻', '🧑🏻', '👧🏻', '👦🏻', '🧒🏻', '👩🏻‍🦰', '👨🏻‍🦰', '👩🏻‍🦱', '👨🏻‍🦱', '👩🏻‍🦲', '👨🏻‍🦲', '👩🏻‍🦳', '👨🏻‍🦳', '👱🏻‍♀️', '👱🏻‍♂️', '👳🏻‍♂️', '👳🏻‍♀️', '🧔🏻',
                '👩🏼', '👨🏼', '🧑🏼', '👧🏼', '👦🏼', '🧒🏼', '👩🏼‍🦰', '👨🏼‍🦰', '👩🏼‍🦱', '👨🏼‍🦱', '👩🏼‍🦲', '👨🏼‍🦲', '👩🏼‍🦳', '👨🏼‍🦳', '👱🏼‍♀️', '👱🏼‍♂️', '👳🏼‍♀️', '👳🏼‍♂️', '🧔🏼',
                '👩🏽', '👨🏽', '🧑🏽', '👧🏽', '👦🏽', '🧒🏽', '👩🏽‍🦰', '👨🏽‍🦰', '👩🏽‍🦱', '👨🏽‍🦱', '👩🏽‍🦲', '👨🏽‍🦲', '👩🏽‍🦳', '👨🏽‍🦳', '👱🏽‍♀️', '👱🏽‍♂️', '👳🏽‍♀️', '👳🏽‍♂️', '🧔🏽',
                '👩🏾', '👨🏾', '🧑🏾', '👧🏾', '👦🏾', '🧒🏾', '👩🏾‍🦰', '👨🏾‍🦰', '👩🏾‍🦱' ,'👨🏾‍🦱' ,'👩🏾‍🦲', '👨🏾‍🦲', '👩🏾‍🦳', '👨🏾‍🦳', '👱🏾‍♀️', '👱🏾‍♂️', '👳🏾‍♀️', '👳🏾‍♂️', '🧔🏾',
                '👩🏿', '👨🏿', '🧑🏿', '👧🏿', '👦🏿', '🧒🏿', '👩🏿‍🦰', '👨🏿‍🦰', '👩🏿‍🦱', '👨🏿‍🦱', '👩🏿‍🦲', '👨🏿‍🦲', '👩🏿‍🦳', '👨🏿‍🦳', '👱🏿‍♀️', '👱🏿‍♂️', '👳🏿‍♀️', '👳🏿‍♂️', '🧔🏿'
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
    mounted() {
        this.$store.commit("app/INITIALIZE");
    },
    methods: {
        apply() {
            this.$store.commit("app/SET_OVERLAY", false);
        }
    },
    computed: {
        emoji: {
            get () {
                return this.app.user.emoji;
            },
            set (val) {
                this.$store.commit("app/SET_USER", {
                    emoji: val,
                    motto: this.motto,
                    region: this.region
                });
            }
        },
        motto: {
            get () {
                return this.app.user.motto;
            },
            set (val) {
                this.$store.commit("app/SET_USER", {
                    emoji: this.emoji,
                    motto: val,
                    region: this.region
                });
            }
        },
        region: {
            get () {
                return this.app.user.region;
            },
            set (val) {
                this.$store.commit("app/SET_USER", {
                    emoji: this.emoji,
                    motto: this.motto,
                    region: val
                });
            }
        },
        ...mapState(["app"]),
    },
}
</script>

