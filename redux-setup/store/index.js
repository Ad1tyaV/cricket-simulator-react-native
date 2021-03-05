import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'
import { createStore } from 'redux'
import manageScores from '../reducers/manageScores'
import pickSquads from '../reducers/pickSquads'
import AllTeams from '../reducers/AllTeams'
import { combineReducers } from 'redux'
import trackReducer from '../reducers/TrackReducer'

const rootReducer=combineReducers({
    manageScores:manageScores,    
    allTeams:AllTeams,
    trackReducer:trackReducer
})


const store = createStore(rootReducer,applyMiddleware(thunk))

export default store;