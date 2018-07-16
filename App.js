import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Team from "./components/Team";
import {
  createStackNavigator,
} from 'react-navigation';
const RootStack = createStackNavigator(
  {
    Home: Team
  },
  {
    initialRouteName: 'Home',
  }
);
export default class App extends React.Component {
  render() {
    return (
        <RootStack />

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
