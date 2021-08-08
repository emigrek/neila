export const state = () => ({
    title: 'nelia',
    socket: null,
    user: null,
    stranger: null,
    room: null,
    searching: false,
    overlay: true,
    messages: [],
    pageVisible: true
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
    CLEAR_MESSAGES(state) {
        state.messages = [];
    },
    SET_PAGE_VISIBLE(state, status) {
        state.pageVisible = status;
    },
    SET_PAGE_TITLE(state, title) {
        state.title = title;
    },
};