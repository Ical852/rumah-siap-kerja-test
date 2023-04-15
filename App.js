import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import FlashMessage from 'react-native-flash-message'
import { LogBox } from "react-native";

const ignoreWarns = [
  "EventEmitter.removeListener",
  "[fuego-swr-keys-from-collection-path]",
  "Setting a timer for a long period of time",
  "ViewPropTypes will be removed from React Native",
  "AsyncStorage has been extracted from react-native",
  "exported from 'deprecated-react-native-prop-types'.",
  "Non-serializable values were found in the navigation state.",
  "VirtualizedLists should never be nested inside plain ScrollViews",
];

import Router from './src/router'

const App = () => {
  LogBox.ignoreLogs(ignoreWarns);
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage />
    </>
  )
}

export default App