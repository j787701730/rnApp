import React from 'react';
import { ScrollView, View } from 'react-native';
import { H1 } from 'native-base';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <ScrollView>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        <View>
          <H1>余文杰是个大神</H1>
        </View>
      </ScrollView>
    );
  }
}
