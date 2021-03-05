import { SafeAreaView } from "react-native";
import { useSelector } from 'react-redux';
import TeamPicker from './TeamPicker';
import React,{useState} from 'react';
import ScoreScreen from './ScoreScreen';
import TabViewContainer from './TabViewContainer'


export default function Container(){
    const state = useSelector(state => state.manageScores)
    const [isDarkMode, setIsDarkMode] = useState(() => false);
    return(                   
        <SafeAreaView>                                  
            {(state.team1==="" && state.team2==="")?<TeamPicker/>:<TabViewContainer team1={state.team1} team2={state.team2}/>}            
        </SafeAreaView>
    );

}