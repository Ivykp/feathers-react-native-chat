import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors } from './../../config/baseStyles';

export default class Offline extends React.Component {

  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Icon name="ios-alert" size={80} color={colors.accentColor} />
        <Text style={{ marginTop: 30, fontWeight: '200', fontSize: 20 }}>Please check your connection</Text>
      </View>
    );
  }
}

Offline.propTypes = {
  app: React.PropTypes.object,
};
