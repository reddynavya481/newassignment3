import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducers from './reducers'

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk))) 
console.log(store.getState())
export default store