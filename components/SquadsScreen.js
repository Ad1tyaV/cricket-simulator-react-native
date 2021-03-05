import { SafeAreaView,StyleSheet, TouchableOpacity } from "react-native";
import { useSelector,useDispatch } from 'react-redux';
import React from 'react';
import { Text,ScrollView  } from "react-native";
import {ExpandableListView} from 'react-native-expandable-listview';


export default function SquadsScreen(){
    const state = useSelector(state => state.manageScores)  
    const teams = useSelector(state => state.allTeams)    
    return(
        <ScrollView style={styles.listItemView}>           
            
             <Text>{state.team1}</Text>             
            {
                Object.keys(teams[state.team1]).map((index)=>{
                    return <Text style={styles.listItemView}>{teams[state.team1][index].name}</Text>
                })
            }                
            <Text>{state.team2}</Text>

        </ScrollView>
    );

}

const styles=StyleSheet.create({
    listItemView:{
        padding:15,
        backgroundColor:"#F8F8F8",
        borderColor:"#eee"
    }    
})