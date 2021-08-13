export const state = () => ({
    user: null,
    stranger: null,
    room: null,
    searching: false,
    overlay: true,
    messages: [],
    strangerTyping: false
})

export const mutations = {
    ADD_MESSAGE(state, payload) {
        state.messages.push(payload);
    },
    SET_SEARCHING(state, payload) {
        state.searching = payload;
    },
    SET_ROOM(state, room) {
        state.room = room;
    },
    SET_USER(state, user) {
        state.user = user;
    },
    SET_STRANGER(state, stranger) {
        state.stranger = stranger;
    },
    SET_OVERLAY(state, overlay) {
        state.overlay = overlay;
    },
    SET_STRANGER_TYPING(state, typing) {
        state.strangerTyping = typing;
    },
    CLEAR_MESSAGES(state) {
        state.messages = [];
    }
};