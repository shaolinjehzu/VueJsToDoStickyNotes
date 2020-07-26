export default {
    namespaced: true,
    state: {
        notes: []
    },
    mutations: {
        //list of notes
        notes (state, payload) {
            state.notes = payload;
        },
        //add note
        add (state, payload) {
            let items = state.notes
            items.push(payload)
            localStorage.setItem('notes', JSON.stringify(items));
        },
        //update note
        update (state, payload) {
            console.log(payload);
            let items = state.notes
            console.log('notes',state.notes);
            items[payload.id] = Object.assign({}, payload.data);
            localStorage.setItem('notes', JSON.stringify(items));

        },
        //remove note
        remove (state, payload) {
            let items = state.notes
            items.splice(payload, 1)
            console.log(items);
            localStorage.setItem('notes', JSON.stringify(items));
        }
    },
    actions: {
        //list of notes
        async list({commit}){
            let notes = JSON.parse(localStorage.getItem('notes') || '[]')
            commit('notes', notes);
        }
    },
    getters: {
        notes (state) {
            return state.notes
        }
    }
}
