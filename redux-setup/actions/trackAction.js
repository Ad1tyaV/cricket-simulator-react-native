const trackAction=(index1,index2,currentTeam,team1)=>{
    return{
        type:'UPDATE_STATE',
        payload:{
            onStrike:{batterIndex:index1},
            offStrike:{batterIndex:index2},
            currentTeam:currentTeam,
            team1:team1
        }
    }
}

export default trackAction;