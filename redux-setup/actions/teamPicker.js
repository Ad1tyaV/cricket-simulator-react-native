const teamPicker=(team1,team2)=>{        
    return(dispatch,getState)=>{
        //console.log(getState())
        dispatch({type:'UPDATE_TEAMS',payload:{team1:team1,team2:team2},state_data:getState()})
    }
}
export default teamPicker;