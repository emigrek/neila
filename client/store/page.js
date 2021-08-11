export const state = () => ({
    title: 'nelia',
    visible: true
})

export const mutations = {
    SET_VISIBLE(state, status) {
        state.visible = status;
    },
    SET_TITLE(state, title) {
        state.title = title;
    }
}
