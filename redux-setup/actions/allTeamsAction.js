const allTeamsAction = (data) =>{
    return (dispatch,getState)=>{                
        dispatch({ type:data.type, payload: data.payload})
    }
}
export default scoreX;