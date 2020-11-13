const initSate = {
    value: 0
}
export const reduce = function(state = initSate, action) {
    switch (action.type) {
        case 'ADD':
            return {
                value: state.value + 1
            }    
        case 'SUB':
            return {
                value: state.value - 1
            }
        default:
            return state
    }
}