import {
    createStore
} from 'redux';
import {
    reduce
} from '../reduce/index'

const store = createStore(reduce)

export default store

