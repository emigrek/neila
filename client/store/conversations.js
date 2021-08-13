export const state = () => ({
    all: []
})

export const mutations = {
    ADD(state, payload) {
        state.all.push(payload);
        localStorage.setItem('conversations', JSON.stringify(state.all));
    },
    INITIALIZE(state) {
        const conversations = JSON.parse(localStorage.getItem('conversations'));
        state.all = conversations || [];
    }
}
