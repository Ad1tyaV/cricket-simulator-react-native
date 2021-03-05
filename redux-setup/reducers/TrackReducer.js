const initialState={

}
const trackReducer=(state=initialState,action)=>{


    switch(action.type){
        case 'UPDATE_STATE':{
            if(action.payload.currentTeam===action.payload.team1){
                return {...state,team1:{...state.team1,player_1:action.payload.onStrike.batterIndex,player_2:action.payload.offStrike.batterIndex}}
            }
            else{
                return {...state,team2:{...state.team2,player_1:action.payload.onStrike.batterIndex,player_2:action.payload.offStrike.batterIndex}}
            }            
        }
        case 'RESET_TRACKER':{
            return {}
        }
        default:return state;
    }

}

export default trackReducer;