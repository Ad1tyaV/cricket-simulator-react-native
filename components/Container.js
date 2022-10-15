import { SafeAreaView } from "react-native";
import { useSelector } from 'react-redux';
import TeamPicker from './TeamPicker';
import React from 'react';
import TabViewContainer from './TabViewContainer'


export default function Container(){
    const state = useSelector(state => state.manageScores)    
    return(                   
        <SafeAreaView>                                  
            {(state.team1==="" && state.team2==="")?<TeamPicker/>:<TabViewContainer team1={state.team1} team2={state.team2}/>}            
        </SafeAreaView>
    );

}