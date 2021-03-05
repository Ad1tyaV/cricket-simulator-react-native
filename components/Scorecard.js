import { View,StyleSheet,Text,Alert } from "react-native";
import React,{useState,useRef,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { BackHandler } from 'react-native';
import resetState from '../redux-setup/actions/resetState';



function ScoreCard(props) {
    const data=useSelector(state=>state.manageScores)
    const allTeams = useSelector(state=>state.allTeams)
    const tracker = useSelector(state=>state.trackReducer)
    const dispatch = useDispatch()
    function handleBackButtonClick() {
        // navigation.goBack();
        Alert.alert("Main Menu","Go back to main menu?",[{text:'Cancel',onPress:()=>{}},{text:'Yes',onPress:()=>{dispatch(resetState())}}])        
        return true;
      }
    
      useEffect(() => {        
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
      }, []);
    const ppl=[-1,0,1,2,3,4,5,6,7,8,9,10];
    return (                        
       <View>  
        <Text>{`\n`}</Text>
        {
            ppl.map((index)=>{
                return(
                    <View style={styles.listWrapper}>                        
                        <Text style={{backgroundColor:'#FFF',flex:1,paddingTop:10,paddingBottom:10,paddingLeft:45,color:(tracker[props.team]?.player_1===index||tracker[props.team]?.player_2===index)?'green':((index>Math.min(tracker[props.team]?.player_1,tracker[props.team]?.player_2) && index < Math.max(tracker[props.team]?.player_2,tracker[props.team]?.player_1)||(index<Math.min(tracker[props.team]?.player_1,tracker[props.team]?.player_2)))?'red':'gray')}}>{allTeams[props.team==="team1"?data.team1:data.team2][index]}</Text>
                        <Text style={styles.row}>{"team1"===props.team?data.team1Stats[index]??0:data.team2Stats[index]??0}</Text>
                    </View>
                )
            })            
        }
        
        <View style={styles.listWrapper}> 
            <Text style={styles.row}>Total</Text>                       
            {props.team==="team1"?<Text style={styles.row}>{data.team1Total}/{data.team1Wickets}</Text>:<Text style={styles.row}>{data.team2Total}/{data.team2Wickets}</Text>}
        </View>
           
        </View>
    )
}

const styles=StyleSheet.create({
    listWrapper:{
        flexDirection:'row',
        flexWrap:'wrap',
        borderBottomWidth:1
    },
    body:{
        backgroundColor:'#FFF',
        flex:1
    },
    row:{
        backgroundColor:'#FFF',
        flex:1,
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:45
    }
})

export default ScoreCard
