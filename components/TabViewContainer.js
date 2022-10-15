import * as React from 'react';
import { View, StyleSheet, Dimensions,ScrollView } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import { TabView, SceneMap } from 'react-native-tab-view';
import ScoreScreen from './ScoreScreen';
import Scorecard from './Scorecard';

 
const FirstRoute = () => (  
  <ScoreScreen/>
);
 
const SecondRoute = () => (
  
  <Scorecard team="team1"/>

);

const ThirdRoute = () => (
  
  <Scorecard team="team2"/>

);

const initialLayout = { width: Dimensions.get('window').width };
 
export default function TabViewExample(props) {
    
  
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Summary' },
    { key: 'second', title: `${props.team1}` },
    { key: 'third', title: `${props.team2}` },
  ]);  
  
  
  const renderScene = SceneMap({
    first: FirstRoute,
    second:SecondRoute,
    third:ThirdRoute
  });

  return (    
    <ScrollView>  
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
    </ScrollView>
  );
}
 
const styles = StyleSheet.create({
  scene: {
    flex: 1,
    height:'100%'
  },
});