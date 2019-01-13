import React from 'react';
import { Text } from 'native-base';

const Colors = {
  tabIconSelected: 'red',
  tabIconDefault: '#666666'
};

export default function TabBarLabel(props) {
  return (
    <Text
      style={{
        color: props.focused ? Colors.tabIconSelected : Colors.tabIconDefault,
        fontSize: 12,
        textAlign: 'center',
      }}
    >
      {props.title}
    </Text>
  );
}
