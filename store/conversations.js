export const state = () => ({
    all: [],
    overlay: false
})

export const mutations = {
    ADD(state, payload) {
        state.all.push(payload);
        localStorage.setItem('conversations', JSON.stringify(state.all));
    },
    CLEAR(state) {
        state.all = [];
        localStorage.removeItem('conversations');
    },
    REMOVE(state, selected) {
        state.all = state.all.filter(item => !selected.includes(state.all.indexOf(item)));
        localStorage.setItem('conversations', JSON.stringify(state.all));
    },
    SET_OVERLAY(state, overlay) {
        state.overlay = overlay;
    },
    INITIALIZE(state) {
        var conversations = JSON.parse(localStorage.getItem('conversations'));

        if(conversations == null) conversations = [];

        state.all = conversations.reverse();
    }
}
