import { readonly, reactive } from 'vue';

const state = reactive({
    solved: false
});

export function useState() {
    function handleSolved(value: boolean) {
        state.solved = value
    }

    return {
        state: readonly(state),
        handleSolved
    }
}