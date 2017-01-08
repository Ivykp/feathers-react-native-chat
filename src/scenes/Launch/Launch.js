import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';

import baseStyles from './../../config/baseStyles';
import styles from './styles';

export default class Launch extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <View style={baseStyles.container}>
        <View style={styles.topSection}>
          <Image source={{ uri: 'http://feathersjs.com/img/feathers-logo-wide.png' }} style={{ width: 295, height: 50 }} />
          <Text style={styles.tagLine}>CHAT DEMO</Text>
        </View>
        <View style={styles.bottomSection}>
          <TouchableHighlight style={[baseStyles.baseButton, baseStyles.buttonDefault]} onPress={Actions.login} underlayColor="#DDD">
            <Text style={[baseStyles.baseButtonText, baseStyles.buttonDefaultText]}>Login</Text>
          </TouchableHighlight>

          <TouchableHighlight style={[baseStyles.baseButton, baseStyles.buttonPrimary]} onPress={Actions.signup} underlayColor="#31D8A0">
            <Text style={[baseStyles.baseButtonText, baseStyles.buttonPrimaryText]}>Create Account</Text>
          </TouchableHighlight>

        </View>
      </View>
    );
  }
}
