<template>
    <div id="confirm-dialog" class="modal delete--dialog" tabindex="-1" role="dialog" v-if="confirmDialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{title}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="confirmCancel">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>{{content}}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="confirmCancel">Cancel
                    </button>
                    <button type="button" class="btn btn-primary" @click="confirmAction">Confirm</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            title: String,
            content: String,
            pConfirmDialog: Boolean
        },
        name: "DeleteComponent",

        data() {
            return {}
        },
        computed: {
            confirmDialog: {
                get() {
                    return this.pConfirmDialog;
                },
                set(v) {
                    this.$emit('update:pConfirmDialog', v);
                }
            }
        },
        methods: {
            confirmCancel() {
                this.$emit('on-cancel');
                this.confirmDialog = false;
            },
            confirmAction() {
                this.$emit('on-confirm');
                this.confirmDialog = false;
            },
            checkClose(e) {
                console.log(e);
            }
        },
        mounted() {
            let dialog = document.getElementById('confirm-dialog');
            dialog.addEventListener('keydown', event => {
                if (event.key == 'Escape') {
                    this.confirmCancel();
                }
            })
            dialog.focus();
        },
    }
</script>

<style lang="scss" scoped>
    @import '~bootstrap/scss/bootstrap.scss';

    .modal.delete--dialog {
        display: block;
    }

</style>