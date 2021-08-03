export const state = () => ({
    socket: null,
    user: {},
    room: null,
    searching: false,
    messages: []
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
    CLEAR_MESSAGES(state) {
        state.messages = [];
    }
};