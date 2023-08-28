import { readonly, shallowReactive } from 'vue';

const state = shallowReactive({
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