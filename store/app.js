export const state = () => ({
    user: {
        emoji: '👦',
        motto: '',
        region: 'Polska'
    },
    stranger: null,
    room: null,
    searching: false,
    overlay: true,
    messages: [],
    strangerTyping: false
})

export const mutations = {
    SET_MESSAGES(state, payload) {
        state.messages = payload;
    },
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
        localStorage.setItem('user', JSON.stringify(state.user));
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
    },
    INITIALIZE(state) {
        var user = JSON.parse(localStorage.getItem('user'));

        if(user == null) user = {
            emoji: '👦',
            motto: '',
            region: 'Polska'
        };

        state.user = user;
    }
};