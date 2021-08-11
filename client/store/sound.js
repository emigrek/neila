export const state = () => ({
    enabled: true
})

export const mutations = {
    SET(state, sound) {
        state.enabled = sound;
        localStorage.setItem('sounds', state.enabled);
    },
    INITIALIZE(state) {
        const enabled = JSON.parse(localStorage.getItem('sounds'));

        if(!enabled) {
            state.enabled = false;
            localStorage.setItem("sounds", false);
        } else if(enabled) {
            state.enabled = true;
            localStorage.setItem("sounds", true);
        } else {
            state.enabled = true;
            localStorage.setItem("sounds", true);
        }
    },
}
