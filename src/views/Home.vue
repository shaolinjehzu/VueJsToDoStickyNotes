<template>
    <div>
        <div class="home" v-if="this.notes.length > 0">
            <div class="card" v-for="(note, noteIndex) in notes" :key="noteIndex">
                <div class="card-body">
                    <h5 class="card-title">{{note.title}}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Todos:</h6>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item" v-for="(todo, todoIndex) in note.todos" :key="-todoIndex">
                        <span v-if="todo.completed"><s>{{todo.title}}</s></span>
                        <span v-else>{{todo.title}}</span>
                    </li>
                </ul>
                <div class="card-body buttons-wrapper">
                    <button class="btn btn-danger" @click="confirmRemoveNote(noteIndex)">Delete</button>
                    <router-link :to="'/note/'+noteIndex" class="btn btn-primary">Edit</router-link>
                </div>
            </div>
            <dialog-component v-if="confirmDeleteNoteDialog" :title="'Confirm deletion'"
                              :content="'Are you sure you want to delete the item?'"
                              :p-confirm-dialog.sync="confirmDeleteNoteDialog"
                              @on-confirm="removeNote()"></dialog-component>
        </div>
        <div class="home" v-else>
            <router-link style="margin-top: 2em;" to="/note/new"><h2>Click here to create your first note!</h2>
            </router-link>
        </div>
    </div>
</template>

<script>

    import DialogComponent from "../components/DialogComponent";

    export default {
        components: {
            DialogComponent
        },
        name: "Home",
        data() {
            return {
                confirmDeleteNoteDialog: false,
                noteToRemove: null,
            }
        },
        computed: {
            notes() {
                return this.$store.getters['notes/notes'];
            }
        },
        methods: {
            //remove note element from array
            removeNote() {
                this.$store.commit('notes/remove', this.noteToRemove)
                this.noteToRemove = null;
            },
            //Confirm Note Deletion
            confirmRemoveNote(index) {
                this.noteToRemove = index;
                this.confirmDeleteNoteDialog = true;
            },
        },
        created() {
            this.$store.dispatch('notes/list');
        }
    }
</script>

<style lang="scss" scoped>
    @import '~bootstrap/scss/bootstrap.scss';

    .home {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;

        & .card {
            display: flex;
            margin: .7rem;
            @media(min-width: 40rem) {
                width: 50%;
            }
            @media(min-width: 56rem) {
                width: 30%
            }
        }

        & .buttons-wrapper {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
        }
    }

</style>
