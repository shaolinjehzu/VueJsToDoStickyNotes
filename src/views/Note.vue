<template>
    <div class="note">
        <div class="note--title">
            <h2 v-if="notes[$route.params.note_id]">Edit {{notes[$route.params.note_id].title}}</h2>
            <h2 v-else>New sticky note</h2>
        </div>

        <form class="note--form was-validated">
            <div class="form-group">
                <label for="customControlValidation1">Title</label>
                <input type="text" class="form-control" id="customControlValidation1" placeholder="Enter the title of a note" v-model="stickyNote.title" required>
                <div class="invalid-feedback">
                    Please enter the title of a note
                </div>
                <div class="valid-feedback">
                    Looks good
                </div>
            </div>

            <table class="table" v-if="stickyNote.title">
                <thead>
                <tr>
                    <th scope="col">Completed</th>
                    <th scope="col">todo</th>
                    <th scope="col"><button type="button" class="btn btn-primary btn-sm" @click="editTodo(null)">New</button></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(todo, index) in stickyNote.todos" :key="index">
                    <th>
                        <input type="checkbox" v-model="todo.completed">
                    </th>
                    <th>
                        <div class="form-group" v-if="editTodoIndex == index">
                            <input type="text" class="form-control" id="customControlValidation2" placeholder="Enter todo" v-model="todo.title" required>
                        </div>
                        <span v-else>{{todo.title}}</span>
                    </th>
                    <th>
                        <div  v-if="editTodoIndex == index" class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-success" @click="saveTodo()">Save</button>
                            <button type="button" class="btn btn-danger" @click="confirmDiscard()">Cancel</button>
                        </div>
                        <div  v-else class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-primary" @click="editTodo(index)">Edit</button>
                            <button type="button" class="btn btn-danger" @click="confirmRemove(index)">Remove</button>
                        </div>
                    </th>
                </tr>
                <tr v-if="newTodoElement">
                    <th>
                        <input type="checkbox" v-model="newTodoElement.completed">
                    </th>
                    <th>
                        <div class="form-group">
                            <input type="text" class="form-control" id="customControlValidation3" placeholder="Enter todo" v-model="newTodoElement.title" required>
                            <div class="invalid-feedback">
                                Please enter todo
                            </div>
                            <div class="valid-feedback">
                                Looks good
                            </div>
                        </div>
                    </th>
                    <th>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-success" @click="saveTodo()">Add</button>
                            <button type="button" class="btn btn-danger" @click="cancelTodoChanges()">Cancel</button>
                        </div>
                    </th>
                </tr>
                </tbody>
            </table>
        </form>
        <div class="note--buttons">
            <button type="button" class="btn btn-danger" @click="confirmDiscardNote()">Cancel</button>
            <button v-if="$route.params.note_id != 'new'" class="btn btn-danger" @click="confirmRemoveNote()">Delete</button>
            <button type="button" class="btn btn-primary" @click="saveNote()">Save</button>
        </div>
        <dialog-component v-if="confirmDeleteDialog" :title="'Confirm deletion'" :content="'Are you sure you want to delete the item?'"  :p-confirm-dialog.sync="confirmDeleteDialog" @on-confirm="removeTodo()" @on-cancel="clearTemporaryObjects()"></dialog-component>
        <dialog-component v-if="confirmDeleteNoteDialog" :title="'Confirm deletion'" :content="'Are you sure you want to delete the item?'"  :p-confirm-dialog.sync="confirmDeleteNoteDialog" @on-confirm="removeNote()"></dialog-component>
        <dialog-component v-if="confirmDiscardDialog" :title="'Confirm discard changes'" :content="'Are you sure you want to discard changes of the item?'"  :p-confirm-dialog.sync="confirmDiscardDialog" @on-confirm="cancelTodoChanges()" @on-cancel="clearTemporaryObjects()"></dialog-component>
        <dialog-component v-if="confirmDiscardNoteDialog" :title="'Confirm discard changes'" :content="'Are you sure you want to discard changes of the item?'"  :p-confirm-dialog.sync="confirmDiscardNoteDialog" @on-confirm="cancelNoteChanges()"></dialog-component>
    </div>
</template>

<script>
    import DialogComponent from "../components/DialogComponent";
    export default {
        name: "Note",

        components: {
            DialogComponent
        },

        data() {
            return {
                confirmDeleteDialog: false,
                confirmDeleteNoteDialog: false,
                confirmDiscardNoteDialog: false,
                confirmDiscardDialog: false,
                editTodoIndex: null,
                itemToDelete: null,
                newTodoElement: null,
                editTodoElement: null,
                stickyNote: null,
            };
        },
        computed:{
            notes(){
                return this.$store.getters["notes/notes"];
            },
        },
        methods: {
            //remove note element from array
            removeNote(){
                this.$store.commit('notes/remove', this.$route.params.note_id);
                this.$router.push('/');
            },
            //Confirm Note Deletion
            confirmRemoveNote(){
                this.confirmDeleteNoteDialog = true;
            },
            //Cancel note editing
            cancelNoteChanges(){
                this.$router.push('/');
            },
            //save new/editable note
            saveNote(){
                if(this.$route.params.note_id == 'new') {
                    this.$store.commit('notes/add', this.stickyNote);
                    this.$router.push('/');
                } else{
                    let data = {
                        id: this.$route.params.note_id,
                        data: this.stickyNote
                    }
                    this.$store.commit('notes/update', data);
                    this.$router.push('/');
                }
            },
            //confirm discard changes of the note element
            confirmDiscardNote(){
                this.confirmDiscardNoteDialog = true;
            },
            //Confirm discard changes of the todo element
            confirmDiscard(){
                this.confirmDiscardDialog = true;
                let dialog = document.getElementById('confirmDialog');
                dialog.addEventListener('keydown', function(e) {
                    console.log(e);
                })
            },
            //clear temporary objects
            clearTemporaryObjects(){
                this.editTodoElement = null
                this.newTodoElement = null;
                this.editTodoIndex = null;
                this.itemToDelete = null;
            },
            //cancel change of the todo element
            cancelTodoChanges(){
                if(this.editTodoElement) {
                    this.stickyNote.todos[this.editTodoIndex] = Object.assign({}, this.editTodoElement);
                    this.clearTemporaryObjects();
                } else{
                    this.clearTemporaryObjects();
                }
            },
            //save todo element
            saveTodo(){
                if(this.newTodoElement && this.newTodoElement.title){
                    this.stickyNote.todos.push(this.newTodoElement);
                    this.clearTemporaryObjects();
                } else if(this.newTodoElement && !this.newTodoElement.title) {
                    return;
                } else{
                    this.clearTemporaryObjects();
                }
            },
            //Confirm todo deletion
            confirmRemove(index){
                this.confirmDeleteDialog = true;
                this.itemToDelete = index;
            },
            //remove todo element from array
            removeTodo(){
                this.stickyNote.todos.splice(this.itemToDelete, 1);
                this.clearTemporaryObjects();
            },
            //edit todo element
            editTodo(id){
                if(this.editTodoElement || this.newTodoElement){
                    return;
                }
                if(id == null){
                    this.newTodoElement = {
                        title: '',
                        completed: false
                    }
                } else{
                    this.editTodoIndex = id;
                    this.editTodoElement = Object.assign({}, this.stickyNote.todos[id]);
                }
            },
        },
        created(){
            if(this.notes.length == 0){
                this.$store.dispatch('notes/list');
            }
            if(this.$route.params.note_id == 'new'){
                this.stickyNote = Object.assign({}, {
                    title: '',
                    todos: []
                })
            } else{
                this.stickyNote = Object.assign({}, this.notes[this.$route.params.note_id]);
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import '../assets/styles/custom.scss';
    @import '~bootstrap/scss/bootstrap.scss';

    .note {
        width: 50%;
        padding: 30px;
        margin: 0 auto;
        display:flex;
        flex-direction: column;
        align-items:center;
        justify-content: center;


        .note--title {
            font-size: 1.8em;
        }

        .note--form {
            margin-top: 1.1em;
            width:100%;
        }

        .note--buttons{
            width:100%;
            margin-top: 1.8em;
            display:flex;
            flex-direction: row;
            justify-content: space-between;
        }
    }
</style>