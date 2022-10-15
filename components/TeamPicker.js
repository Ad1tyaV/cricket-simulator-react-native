import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import teamPicker from '../redux-setup/actions/teamPicker'
import React,{useState,useEffect} from 'react';
import { BackHandler,Alert } from 'react-native';
import resetTracker from '../redux-setup/actions/resetTracker';


export default function TeamPicker() {
    const [teams, setTeams] = useState(["India","Pakistan","England","Australia","NewZealand","SouthAfrica", "WestIndies", "SriLanka"])
    const [team1,setTeam1] = useState("India")
    const [team2,setTeam2] = useState("Pakistan")    
    const dispatch = useDispatch()

    function handleBackButtonClick() {
        // navigation.goBack();
        Alert.alert("Book Cricket Simulator","Exit App ?",[{text:'Cancel',onPress:()=>{}},{text:'Yes',onPress:()=>{BackHandler.exitApp();
        }}])        
        return true;
      }
    
      useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
      }, []);

  return (
    
    <SafeAreaView style={styles.selector}>
        <Picker
            selectedValue={team1}
            style={{height: 50, width: 180}}
            onValueChange={(itemValue, itemIndex) =>
            setTeam1(itemValue)
        }>
            {
                Array.from(new Set(teams)).map((team)=>{
                    return team!=team2?<Picker.Item key={Date.now()}label={team} value={team}/>:[]
                })
            }        
        </Picker>
        <Text>{`\n`}</Text>
        <Button title="SWAP" onPress={
                ()=>{                    
                    setTeam2(team1)
                    setTeam1(team2)
                }
            }
        />
        <Picker
            selectedValue={team2}
            style={{height: 50, width: 180}}
            onValueChange={(itemValue, itemIndex) =>
            setTeam2(itemValue)
        }>
            {
                Array.from(new Set(teams)).map((team)=>{
                    return team!==team1?<Picker.Item key={Date.now()}label={team} value={team}/>:[]
                })
            }        
        </Picker>    
        
        <Text>{`\n`}</Text>
        <Button title="PLAY" onPress={()=>{dispatch(resetTracker());dispatch(teamPicker(team1,team2))}}/>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
    selector:{        
        justifyContent:'center',
        alignItems:'center',
        paddingTop:25
    }
});
