const initState = {
    value: '默认值'
}
export const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'send':
            return Object.assign({}, state, action)
        default:
            return state
    }
}