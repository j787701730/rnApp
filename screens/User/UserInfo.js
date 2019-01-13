import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  // Text,
  // View,
} from 'react-native';
import {
  Container,
  Button,
  Text,
  Drawer,
  Content,
  List,
  ListItem,
  View
} from 'native-base';
import { Constants } from 'expo';


export default class UserInfo extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Container style={{ paddingTop: Constants.statusBarHeight }}>
        <Content>
          <Text>user info</Text>
          <Button onPress={() => {
            this.props.navigation.navigate('Home');
          }}><Text>go Home</Text></Button>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: '#C2185B',
    height: Constants.statusBarHeight,
  },

  // rest of the styles
});
