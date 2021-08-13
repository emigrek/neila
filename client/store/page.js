export const state = () => ({
    title: 'nelia',
    visible: true,
    header: true
})

export const mutations = {
    SET_VISIBLE(state, status) {
        state.visible = status;
    },
    SET_TITLE(state, title) {
        state.title = title;
    },
    SET_HEADER(state, header) {
        state.header = header;
    }
}
