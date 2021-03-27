import { SafeAreaView,View } from "react-native";
import { useSelector,useDispatch } from 'react-redux';
import React,{useState,useRef,useEffect} from 'react';
import { StyleSheet,Button,Text,Alert,ScrollView  } from "react-native";
import scoreX from '../redux-setup/actions/scoreX';
import completeInnings from '../redux-setup/actions/completeInnings';
import resetState from '../redux-setup/actions/resetState';
import trackAction from '../redux-setup/actions/trackAction';
import { BackHandler } from 'react-native';
import resetTracker from '../redux-setup/actions/resetTracker';
import { AdMobInterstitial } from 'expo-ads-admob';


export default function ScoreScreen(){
    const data=useSelector(state=>state.manageScores)
    const allTeams = useSelector(state=>state.allTeams)
    const tracker = useSelector(state=>state.trackReducer)
    const dispatch = useDispatch()
    const interstitialID = useRef("YOUR_CODE")
    const [message, setMessage] = useState("")
    //const track = useRef({})
    function handleBackButtonClick() {
        // navigation.goBack();
        Alert.alert("Main Menu","Go back to main menu?",[{text:'Cancel',onPress:()=>{}},{text:'Yes',onPress:()=>{dispatch(resetState())}}])        
        return true;
      }
    
      useEffect(() => {  
        //dispatch(resetTracker);
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
      }, []);

    const showAd=async()=>{
        AdMobInterstitial.setAdUnitID(interstitialID.current);
        await AdMobInterstitial.requestAdAsync({servePersonalizedAds:true})  
        await AdMobInterstitial.showAdAsync();
    }  
    useEffect(()=>{
        if(message===""){}
        else{
            showAd()
        }
        //showAd()                
    },[message])  
    useEffect(()=>{        
        console.log(tracker)
        if(data.currentTeamBatting===data.team1){
            dispatch(trackAction(data.onStrike.batterIndex,data.offStrike.batterIndex,data.currentTeamBatting,data.team1))
            //console.log(track.current)
        }
        else{
            //track.current = {...track.current,team2:{...track.current.team1,player_1:data.onStrike.batterIndex,player_2:data.offStrike.batterIndex}}
            dispatch(trackAction(data.onStrike.batterIndex,data.offStrike.batterIndex,data.currentTeamBatting,data.team1))
        }
        if(!data.gameover){
            if(data.team1Wickets===10 || data.team1BallsFaced===300){                                        
                //track.current = {...track.current,team1:{...track.current.team1,player_1:data.onStrike.batterIndex,player_2:data.offStrike.batterIndex}}                
                dispatch(completeInnings('team1'))
            }
        }
        if(data.team1Wickets===10 || data.team1BallsFaced===300){
            if(data.team2Total>data.team1Total){   
                //track.current = {...track.current,team2:{...track.current.team1,player_1:data.onStrike.batterIndex,player_2:data.offStrike.batterIndex}}
                setMessage(`${data.team2} won by ${10-data.team2Wickets} wickets`)
            }
            else if(data.team2Total===data.team1Total && (data.team2Wickets===10 || data.team2BallsFaced===300)){
                //track.current = {...track.current,team2:{...track.current.team1,player_1:data.onStrike.batterIndex,player_2:data.offStrike.batterIndex}}
                setMessage(`Match Tied`)
            }
            else if(data.team2Total<data.team1Total && (data.team2Wickets===10 || data.team2BallsFaced===300)){
                //track.current = {...track.current,team2:{...track.current.team1,player_1:data.onStrike.batterIndex,player_2:data.offStrike.batterIndex}}
                setMessage(`${data.team1} beat ${data.team2} by ${data.team1Total-data.team2Total} runs`)
            }
        }
    },[data])

    return(
        <SafeAreaView  style={styles.score}> 
        <ScrollView>
            <Text style={{fontSize:18}}>{data.team1}:{data.team1Total}/{data.team1Wickets} Overs:{Math.floor(data.team1BallsFaced/6)}.{data.team1BallsFaced%6} RR:{(data.team1Total/((data.team1BallsFaced||1)/6)).toPrecision(3)??0}</Text>                        
            <Text>{`\n`}</Text>
            <Text style={{fontSize:18}}>{data.team2}:{data.team2Total}/{data.team2Wickets} Overs:{Math.floor(data.team2BallsFaced/6)}.{data.team2BallsFaced%6} RR:{(data.team2Total/((data.team2BallsFaced||1)/6)).toPrecision(3)??0}</Text>                        
            <Text>{`\n`}</Text>
                      
            {
                (data.currentTeamBatting===data.team1)?
                <><Text style={{marginLeft:'auto',marginRight:'auto'}}>{allTeams[data.team1][data.onStrike.batterIndex]}👉🏾{data.team1Stats[data.onStrike.batterIndex]??0}</Text><Text style={{marginLeft:'auto',marginRight:'auto'}}>{allTeams[data.team1][data.offStrike.batterIndex]}👉🏾{data.team1Stats[data.offStrike.batterIndex]??0}</Text></>
                :<><Text style={{marginLeft:'auto',marginRight:'auto'}}>{allTeams[data.team2][data.onStrike.batterIndex]}👉🏾{data.team2Stats[data.onStrike.batterIndex]??0}</Text><Text style={{marginLeft:'auto',marginRight:'auto'}}>{allTeams[data.team2][data.offStrike.batterIndex]}👉🏾{data.team2Stats[data.offStrike.batterIndex]??0}</Text></>
            }
            <Text>{`\n`}</Text>
            {
                data.gameover?<Button title="PLAY AGAIN" onPress={()=>{Alert.alert("Game Over","Play Again",[{text:'Cancel',onPress:()=>{}},{text:'Yes',onPress:()=>{dispatch(resetState())}}])}}></Button>:<Button title="NEXT OVER" onPress={()=>{for(let i=0;i<6;i++) dispatch(scoreX())}}></Button>
            }
            <Text>{`\n`}</Text>
            
            {
                
                data.gameover?<View><Text style={styles.dialog}>{message}</Text></View>:<Text></Text>
            }                       
         </ScrollView>        
        </SafeAreaView>        
    );
}
const styles = StyleSheet.create({
    score:{        
        justifyContent:'center',
        alignItems:'center',
        paddingTop:25,                
    },
    dialog:{
        fontSize:18,
        fontWeight:"400",
        marginLeft:'auto',
        marginRight:'auto'
    }
});
